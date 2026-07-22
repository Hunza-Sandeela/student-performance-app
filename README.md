# Orbit — Student Performance Prediction System

A modern, full-stack redesign of the original Streamlit prototype. The
machine learning models and prediction logic are **byte-for-byte unchanged**
— only the delivery layer moved from Streamlit to a React dashboard backed
by a FastAPI service.

```
student-performance-app/
├── backend/                 FastAPI service that serves the ML models
│   ├── app/
│   │   ├── main.py          API routes (/api/predict, /api/models, /api/health)
│   │   ├── ml.py            Model loading + prediction logic (mirrors original app.py)
│   │   ├── schemas.py       Pydantic request/response models
│   │   └── models/          Your original .pkl files (unchanged)
│   ├── requirements.txt
│   └── run.py                Dev entrypoint
│
└── frontend/                 React + Tailwind CSS dashboard
    ├── src/
    │   ├── pages/             Home, Predict, ModelInfo, About, Contact
    │   ├── components/        Sidebar, Topbar, Footer, GaugeRing, cards, etc.
    │   ├── context/           Dark/light theme provider
    │   └── lib/api.js         Talks to the FastAPI backend
    └── package.json
```

## What changed vs. the original app

- **Nothing about the ML.** `backend/app/ml.py` builds the exact same
  11-feature vector in the same order, applies the same `Low/Medium/High` →
  `0/1/2` encoding, scales with your saved `scaler.pkl`, and runs the same
  four models (`logistic.pkl`, `knn.pkl`, `tree.pkl`, `linear.pkl`).
- **Everything about the UI.** Streamlit's sliders/selectboxes are replaced
  with a 5-page React dashboard: Home, Student Prediction, Model Info,
  About, and Contact — with sidebar navigation, dark/light mode, glass-card
  styling, animated result visuals, and charts.

## Running it locally

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py                   # serves http://localhost:8000
```

Check it's alive: `curl http://localhost:8000/api/health`

### 2. Frontend (React)

In a separate terminal:

```bash
cd frontend
npm install
npm run dev                     # serves http://localhost:5173
```

The dev server proxies `/api/*` requests to `http://localhost:8000`
(configured in `vite.config.js`), so just open http://localhost:5173.

### 3. Production build

```bash
cd frontend
npm run build                   # outputs static files to frontend/dist
```

Serve `frontend/dist` with any static host (Nginx, Vercel, Netlify, etc.),
and point `VITE_API_BASE_URL` (set at build time in a `.env` file) at your
deployed FastAPI URL if the frontend and API aren't on the same origin.

## API reference

| Method | Path            | Description                                  |
|--------|-----------------|-----------------------------------------------|
| GET    | `/api/health`   | Health check                                  |
| GET    | `/api/models`   | Metadata for the 4 models (for Model Info page) |
| POST   | `/api/predict`  | Runs classification + regression, returns pass/fail, predicted score, and confidence |

Example request body for `/api/predict`:

```json
{
  "hours": 6, "attendance": 80, "sleep": 7, "previous": 65,
  "tutoring": 2, "physical": 3,
  "parent": "Medium", "resources": "Medium", "activities": "Yes",
  "motivation": "Medium", "internet": "Yes",
  "model_option": "best"
}
```

## Notes

- The Contact page form is a static demo (no email backend wired up) —
  connect it to a real service (e.g. Formspree, your own SMTP endpoint) to
  go live.
- The "typical accuracy" and "trait comparison" charts on the Model Info
  page are illustrative to explain each model's general character — swap
  in your own evaluation numbers if you want exact figures from your
  training run (see `main.ipynb`).
