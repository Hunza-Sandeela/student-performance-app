"""
Student Performance Prediction API
-----------------------------------
FastAPI backend that serves the exact same ML models and prediction logic
that previously powered the Streamlit app, now exposed as a REST API for
the new React frontend.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import ml
from .schemas import (
    ModelInfo,
    ModelsInfoResponse,
    PredictionRequest,
    PredictionResponse,
)

app = FastAPI(
    title="Student Performance Prediction API",
    description="Serves predictions from the trained Logistic Regression, "
    "KNN, Decision Tree, and Linear Regression models.",
    version="1.0.0",
)

# Allow the React dev server / static build to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_CATALOG = [
    ModelInfo(
        key="logistic",
        name="Logistic Regression",
        type="Classification",
        description="A linear model that estimates the probability a "
        "student passes based on a weighted combination of their inputs. "
        "Fast, interpretable, and a strong baseline.",
    ),
    ModelInfo(
        key="knn",
        name="K-Nearest Neighbors",
        type="Classification",
        description="Classifies a student by comparing them to the most "
        "similar students in the training data and taking a majority vote.",
    ),
    ModelInfo(
        key="tree",
        name="Decision Tree",
        type="Classification",
        description="Splits students into groups using a sequence of "
        "yes/no questions on their study habits and background.",
    ),
    ModelInfo(
        key="linear",
        name="Linear Regression",
        type="Regression",
        description="Predicts the student's expected numeric exam score "
        "based on a weighted combination of all input features.",
    ),
]


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/models", response_model=ModelsInfoResponse)
def list_models():
    return ModelsInfoResponse(models=MODEL_CATALOG)


@app.post("/api/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest):
    try:
        result = ml.predict(payload.model_dump(), payload.model_option)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return PredictionResponse(**result)
