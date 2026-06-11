from fastapi import APIRouter, HTTPException, Query
from database import supabase

router = APIRouter()


@router.get("/datasets/{dataset_id}/data")
def get_dataset_data(
    dataset_id: str,
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=200),
    search: str = Query(""),
    sort_by: str = Query(""),
    sort_dir: str = Query("asc"),
):
    ds = supabase.table("datasets").select("*").eq("id", dataset_id).execute()
    if not ds.data:
        raise HTTPException(404, "Dataset not found")

    record = ds.data[0]
    preview = record.get("preview_data", {})
    all_rows = preview.get("rows", []) if isinstance(preview, dict) else []
    meta = record.get("columns_meta", {})

    if isinstance(meta, dict):
        cols_list = meta.get("columns", [])
        col_names = [c["name"] for c in cols_list if isinstance(c, dict)]
    elif isinstance(meta, list):
        col_names = [c["name"] for c in meta if isinstance(c, dict)]
    else:
        col_names = []

    if search:
        q = search.lower()
        all_rows = [r for r in all_rows if any(
            str(v).lower().find(q) >= 0 for v in r.values() if v is not None
        )]

    sf = sort_by if sort_by in col_names else (col_names[0] if col_names else "")
    reverse = sort_dir.lower() == "desc"

    def sort_key(r):
        v = r.get(sf) if sf else None
        if v is None:
            return ("", 0)
        if isinstance(v, (int, float)):
            return ("", v)
        return (str(v).lower(), 0)

    all_rows.sort(key=sort_key, reverse=reverse)

    total = len(all_rows)
    offset = (page - 1) * per_page
    rows = all_rows[offset:offset + per_page]

    return {
        "data": rows,
        "columns": col_names,
        "total": total,
        "page": page,
        "per_page": per_page,
    }
