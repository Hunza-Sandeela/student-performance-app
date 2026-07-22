from typing import Literal, Optional

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    hours: float = Field(..., ge=0, le=12, description="Hours studied per week")
    attendance: float = Field(..., ge=0, le=100, description="Attendance percentage")
    sleep: float = Field(..., ge=0, le=12, description="Average sleep hours")
    previous: float = Field(..., ge=0, le=100, description="Previous exam score")
    tutoring: float = Field(..., ge=0, le=10, description="Tutoring sessions per month")
    physical: float = Field(..., ge=0, le=10, description="Physical activity (hrs/week)")

    parent: Literal["Low", "Medium", "High"] = "Medium"
    resources: Literal["Low", "Medium", "High"] = "Medium"
    activities: Literal["Yes", "No"] = "Yes"
    motivation: Literal["Low", "Medium", "High"] = "Medium"
    internet: Literal["Yes", "No"] = "Yes"

    model_option: Literal["best", "logistic", "knn", "tree"] = "best"


class PredictionResponse(BaseModel):
    pass_prediction: bool
    predicted_score: float
    confidence: Optional[float] = None
    model_used: str


class ModelInfo(BaseModel):
    key: str
    name: str
    type: str
    description: str


class ModelsInfoResponse(BaseModel):
    models: list[ModelInfo]
