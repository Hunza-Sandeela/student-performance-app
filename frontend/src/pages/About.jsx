import { Target, Database, Wrench, Layers3, ShieldCheck } from 'lucide-react';

const STACK = [
  { group: 'Frontend', items: ['React', 'Tailwind CSS', 'React Router', 'Recharts', 'Lucide Icons'] },
  { group: 'Backend', items: ['FastAPI', 'Uvicorn', 'Pydantic'] },
  { group: 'Machine Learning', items: ['scikit-learn', 'NumPy', 'StandardScaler'] },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 space-y-14">
      <div className="animate-fade-up">
        <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">ABOUT THE PROJECT</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
          Predicting outcomes to help students earlier
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Orbit is a student performance prediction system that estimates
          whether a student will pass and what score they're likely to earn,
          based on measurable study habits and environment factors. It began
          as a classic Streamlit prototype and has since been rebuilt as a
          full dashboard experience without changing a single line of the
          underlying prediction logic.
        </p>
      </div>

      <section className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl glass border p-6">
          <Target size={22} className="text-[var(--color-brand-purple)] mb-3" />
          <h3 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Goal</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Give educators and students an early, data-informed signal about
            exam outcomes so support can happen before results are final.
          </p>
        </div>
        <div className="rounded-2xl glass border p-6">
          <Database size={22} className="text-[var(--color-brand-purple)] mb-3" />
          <h3 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Data</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Models were trained on a dataset of student records spanning
            study habits, attendance, environment, and past performance.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display font-semibold text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Wrench size={20} className="text-[var(--color-brand-purple)]" />
          Technology stack
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {STACK.map((s) => (
            <div key={s.group} className="rounded-2xl glass border p-5">
              <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>{s.group.toUpperCase()}</p>
              <ul className="space-y-1.5">
                {s.items.map((i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl glass border p-6 flex items-start gap-4">
        <ShieldCheck size={24} className="text-[var(--color-brand-purple)] shrink-0 mt-1" />
        <div>
          <h3 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>A note on scope</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This is an academic / portfolio project, not a validated educational
            assessment tool. Predictions are estimates based on historical
            patterns and should support, not replace, a teacher's judgment.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display font-semibold text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Layers3 size={20} className="text-[var(--color-brand-purple)]" />
          Architecture
        </h2>
        <div className="rounded-2xl glass border p-6 text-sm leading-relaxed font-mono" style={{ color: 'var(--text-secondary)' }}>
          React (Vite + Tailwind) &rarr; REST calls (/api/predict, /api/models) &rarr; FastAPI &rarr; scikit-learn models (.pkl)
        </div>
      </section>
    </div>
  );
}
