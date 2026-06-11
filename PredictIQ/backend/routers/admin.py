from fastapi import APIRouter, HTTPException, Depends
from core.dependencies import get_current_user
from database import supabase

router = APIRouter()


@router.get("/admin/stats")
async def admin_stats(user: dict = Depends(get_current_user)):
    datasets = supabase.table("datasets").select("id").execute()
    users = supabase.table("users").select("id").execute()
    ds_count = len(datasets.data)
    user_count = len(users.data)
    return {
        "users": user_count,
        "datasets": ds_count,
        "products": 0,
        "analyses": 0,
    }


@router.get("/admin/users")
async def admin_users(user: dict = Depends(get_current_user)):
    resp = supabase.table("users").select("*").order("created_at", desc=True).limit(100).execute()
    return {"users": resp.data}


@router.get("/admin/datasets")
async def admin_datasets(user: dict = Depends(get_current_user)):
    resp = supabase.table("datasets").select("*").order("created_at", desc=True).limit(100).execute()
    return {"datasets": resp.data}


@router.delete("/admin/users/{user_id}")
async def admin_delete_user(user_id: str, user: dict = Depends(get_current_user)):
    supabase.table("users").delete().eq("id", user_id).execute()
    return {"ok": True}


@router.delete("/admin/datasets/{dataset_id}")
async def admin_delete_dataset(dataset_id: str, user: dict = Depends(get_current_user)):
    supabase.table("preview_data").delete().eq("dataset_id", dataset_id).execute()
    supabase.table("datasets").delete().eq("id", dataset_id).execute()
    return {"ok": True}
