// Thin client for the FastAPI backend. Vite proxies /api -> http://localhost:8000
// in dev; in production, point this at your deployed API host if not served
// from the same origin.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed (${res.status})`);
  }
  return res.json();
}

export function getModels() {
  return request('/api/models');
}

export function predictPerformance(payload) {
  return request('/api/predict', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
