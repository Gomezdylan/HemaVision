from fastapi import APIRouter, HTTPException
from typing import Literal
from pydantic import BaseModel
from backend.app.database.queries import get_runs, update_review

router = APIRouter()

class ReviewRequest(BaseModel):
    review: Literal["accept", "reject"]
    comments:str | None = None

@router.get("")
def list_runs():
    return get_runs()

@router.patch("/{run_id}/review")
def review_run(run_id: int, data: ReviewRequest):
    updated = update_review(
        run_id = run_id,
        review = data.review,
        comments = data.comments
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Run not found"
        )
    return{
        "run_id": run_id,
        "review": data.review,
        "comments": data.comments,
        "message": "Review Saved Successfully"

    }