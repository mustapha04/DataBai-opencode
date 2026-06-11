from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Optional
from database import supabase
from services.ai_provider import generate_insights
from datetime import datetime, timezone
import uuid

router = APIRouter()


class InsightsRequest(BaseModel):
    analysis_type: str = "full"
    local_rows: list[dict] = []
    local_meta: list[dict] = []


def _normalize_meta(meta):
    if isinstance(meta, dict):
        meta_list = meta.get("columns", [])
        type_map = meta.get("types", {})
        for c in meta_list:
            raw_type = c.get("type") or type_map.get(c["name"], "text")
            c["type"] = "numeric" if raw_type == "numerical" else raw_type
        return meta_list
    elif isinstance(meta, list):
        return meta
    return []


def _build_context(dataset_id: str, local_rows: list = None, local_meta: list = None) -> dict:
    if dataset_id.startswith("local-"):
        meta_list = local_meta or []
        rows = local_rows or []
        file_name = "local dataset"
        row_count = len(rows)
        column_count = len(meta_list)
    else:
        try:
            ds = supabase.table("datasets").select("*").eq("id", dataset_id).execute()
            ds_data = ds.data[0] if ds.data else None
        except Exception:
            ds_data = None
        if not ds_data:
            raise HTTPException(404, "Dataset not found")
        file_name = ds_data.get("file_name", "dataset")
        row_count = ds_data.get("row_count", 0)
        column_count = ds_data.get("column_count", 0)
        meta = ds_data.get("columns_meta", [])
        rows = (ds_data.get("preview_data", {}) or {}).get("rows", [])
        meta_list = _normalize_meta(meta)

    col_lines_parts = []
    for c in meta_list[:20]:
        name = c["name"]
        ctype = c.get("type", "unknown")
        if ctype == "numeric":
            stats = f"min={c.get('min','?')}, max={c.get('max','?')}, mean={c.get('mean','?')}, sum={c.get('sum','?')}, nulls={c.get('nulls',0)}"
        else:
            stats = f"unique={c.get('unique','?')}, top='{c.get('top_value','?')}' ({c.get('top_count',0)}), nulls={c.get('nulls',0)}"
        col_lines_parts.append(f"  - {name} ({ctype}) \u2014 {stats}")

    sample_rows = rows[:10]
    headers = list(sample_rows[0].keys()) if sample_rows else []
    sample_lines = "\n".join(
        [" | ".join([str(r.get(h, ""))[:20] for h in headers[:8]]) for r in sample_rows]
    )

    return {
        "file_name": file_name,
        "row_count": row_count,
        "column_count": column_count,
        "col_lines": "\n".join(col_lines_parts),
        "sample_lines": sample_lines,
        "headers": headers,
        "rows": rows,
        "meta_list": meta_list,
    }


@router.post("/datasets/{dataset_id}/insights")
async def create_insights(dataset_id: str, req: InsightsRequest):
    ctx = _build_context(dataset_id, local_rows=req.local_rows, local_meta=req.local_meta)

    prompt = f"""Dataset: {ctx['file_name']}
Rows: {ctx['row_count']} | Columns: {ctx['column_count']}

Analysis type: {req.analysis_type}

Column profiles:
{ctx['col_lines']}

Sample data (first {min(10, ctx['row_count'])} rows):
Headers: {' | '.join(ctx['headers'][:8]) if ctx['headers'] else 'N/A'}
{ctx['sample_lines']}

Provide business intelligence analysis with specific numbers and actionable recommendations."""

    result = await generate_insights(prompt)

    analysis_id = str(uuid.uuid4())
    payload = {
        "id": analysis_id,
        "dataset_id": dataset_id,
        "analysis_type": req.analysis_type,
        "prompt": prompt[:500],
        "response": result.get("content", {}),
        "model_used": result.get("model", "unknown"),
        "tokens_used": result.get("tokens", 0),
    }

    try:
        supabase.table("ai_analyses").insert(payload).execute()
    except Exception:
        pass

    return {
        "id": analysis_id,
        "analysis_type": req.analysis_type,
        "content": result.get("content", {}),
        "model_used": result.get("model", "unknown"),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/datasets/{dataset_id}/insights")
def get_insights(dataset_id: str):
    try:
        result = supabase.table("ai_analyses").select("*").eq("dataset_id", dataset_id).order("created_at", desc=True).execute()
        items = []
        for r in result.data or []:
            items.append({
                "id": r["id"],
                "analysis_type": r["analysis_type"],
                "content": r.get("response", {}),
                "model_used": r.get("model_used", ""),
                "created_at": r.get("created_at", ""),
            })
        return {"insights": items}
    except Exception:
        return {"insights": []}
