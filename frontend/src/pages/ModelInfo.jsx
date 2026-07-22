import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Cpu, GitBranch, Users, LineChart as LineChartIcon, Layers } from 'lucide-react';
import { getModels } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Badge } from '../components/Badge';

const ICONS = {
  logistic: Cpu,
  knn: Users,
  tree: GitBranch,
  linear: LineChartIcon,
};

// Illustrative comparison metrics for the write-up (qualitative traits, not
// live benchmark numbers — actual accuracy depends on your training run).
const TRAIT_DATA = [
  { trait: 'Interpretability', logistic: 90, knn: 40, tree: 85 },
  { trait: 'Speed', logistic: 95, knn: 55, tree: 90 },
  { trait: 'Handles Non-linearity', logistic: 30, knn: 80, tree: 85 },
  { trait: 'Robust to Outliers', logistic: 60, knn: 45, tree: 70 },
  { trait: 'Low Overfitting Risk', logistic: 80, knn: 60, tree: 45 },
];

const BAR_DATA = [
  { name: 'Logistic', typical: 85 },
  { name: 'KNN', typical: 82 },
  { name: 'Decision Tree', typical: 88 },
];

export default function ModelInfo() {
  const [models, setModels] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getModels()
      .then((res) => setModels(res.models))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
      <div className="mb-10 animate-fade-up">
        <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">UNDER THE HOOD</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
          The models behind the prediction
        </h1>
        <p className="max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Three classifiers vote on pass/fail, and one regressor estimates the
          numeric score. Here's how each one thinks.
        </p>
      </div>

      {error && (
        <div className="mb-8">
          <p className="text-sm text-red-500">Couldn't load model info: {error}. Is the backend running?</p>
        </div>
      )}

      {!models && !error && <LoadingSpinner label="Loading model catalog…" />}

      {models && (
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {models.map((m, i) => {
            const Icon = ICONS[m.key] || Layers;
            return (
              <div key={m.key} className="animate-fade-up rounded-2xl glass border p-6" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>{m.name}</h3>
                    <Badge variant={m.type === 'Regression' ? 'brand' : 'neutral'}>{m.type}</Badge>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="rounded-2xl glass border p-6">
          <h2 className="font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Classifier trait comparison
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            Qualitative comparison of general model characteristics (0–100 scale)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={TRAIT_DATA} outerRadius="75%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="trait" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="Logistic" dataKey="logistic" stroke="#4F6EF7" fill="#4F6EF7" fillOpacity={0.25} />
              <Radar name="KNN" dataKey="knn" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
              <Radar name="Decision Tree" dataKey="tree" stroke="#10B981" fill="#10B981" fillOpacity={0.15} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </section>

        <section className="rounded-2xl glass border p-6">
          <h2 className="font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Typical accuracy range
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            Illustrative holdout accuracy (%) — re-run evaluation on your own split for exact figures
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={BAR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="typical" radius={[8, 8, 0, 0]} fill="url(#barGradient)" />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F6EF7" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      <section className="mt-8 rounded-2xl glass border p-6">
        <h2 className="font-display font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          Input features (in model order)
        </h2>
        <div className="flex flex-wrap gap-2">
          {['Hours Studied', 'Attendance', 'Parental Involvement', 'Access to Resources',
            'Extracurricular Activities', 'Sleep Hours', 'Previous Scores', 'Motivation Level',
            'Internet Access', 'Tutoring Sessions', 'Physical Activity'].map((f) => (
            <Badge key={f} variant="neutral">{f}</Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
