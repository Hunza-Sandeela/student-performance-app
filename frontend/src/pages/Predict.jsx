import { useState } from 'react';
import {
  BookOpenCheck, CalendarCheck2, Moon, TrendingUp, Users2, Dumbbell,
  Home as HomeIcon, Wifi, Heart, Sparkles, PartyPopper, CheckCircle2,
  XCircle, AlertTriangle, Gauge,
} from 'lucide-react';
import { predictPerformance } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Badge, Alert } from '../components/Badge';
import GaugeRing from '../components/GaugeRing';

const DEFAULTS = {
  hours: 6,
  attendance: 80,
  sleep: 7,
  previous: 65,
  tutoring: 2,
  physical: 3,
  parent: 'Medium',
  resources: 'Medium',
  activities: 'Yes',
  motivation: 'Medium',
  internet: 'Yes',
  model_option: 'best',
};

function SliderField({ icon: Icon, label, unit, value, min, max, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          <Icon size={16} className="text-[var(--color-brand-purple)]" />
          {label}
        </label>
        <span className="font-mono text-sm font-semibold px-2 py-0.5 rounded-md" style={{ color: 'var(--color-brand-blue)', background: 'var(--ring-track)' }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--color-brand-purple)]"
        style={{
          background: `linear-gradient(to right, var(--color-brand-blue) ${((value - min) / (max - min)) * 100}%, var(--ring-track) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  );
}

function SelectField({ icon: Icon, label, value, options, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        <Icon size={16} className="text-[var(--color-brand-purple)]" />
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 focus-ring
              ${value === opt
                ? 'bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white border-transparent shadow-md shadow-[var(--color-brand-purple)]/20'
                : 'glass hover:border-[var(--color-brand-blue)]/50'}`}
            style={value === opt ? {} : { color: 'var(--text-secondary)' }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function motivationalMessage(willPass, score) {
  if (willPass && score >= 80) {
    return { icon: PartyPopper, text: 'Outstanding trajectory — keep this routine going.' };
  }
  if (willPass) {
    return { icon: CheckCircle2, text: 'On track to pass — small consistency gains could push this higher.' };
  }
  if (score >= 45) {
    return { icon: AlertTriangle, text: 'Close to the line — a bit more study time or sleep could tip this over.' };
  }
  return { icon: XCircle, text: 'At risk — consider more tutoring support and a steadier study routine.' };
}

export default function Predict() {
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await predictPerformance(form);
      setResult(res);
    } catch (err) {
      setError(err.message || 'Something went wrong while predicting.');
    } finally {
      setLoading(false);
    }
  };

  const msg = result ? motivationalMessage(result.pass_prediction, result.predicted_score) : null;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
      <div className="mb-8 animate-fade-up">
        <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">PREDICTION TOOL</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Enter student details
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Fill in the fields below. All values mirror the exact model inputs from training.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* ---------------- Form ---------------- */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          <section className="rounded-2xl glass border p-6 space-y-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              Study Habits
            </h2>
            <SliderField icon={BookOpenCheck} label="Hours Studied / week" value={form.hours} min={0} max={12} onChange={set('hours')} />
            <SliderField icon={CalendarCheck2} label="Attendance" unit="%" value={form.attendance} min={0} max={100} onChange={set('attendance')} />
            <SliderField icon={Moon} label="Sleep Hours" value={form.sleep} min={0} max={12} onChange={set('sleep')} />
            <SliderField icon={TrendingUp} label="Previous Score" value={form.previous} min={0} max={100} onChange={set('previous')} />
            <SliderField icon={Users2} label="Tutoring Sessions / month" value={form.tutoring} min={0} max={10} onChange={set('tutoring')} />
            <SliderField icon={Dumbbell} label="Physical Activity (hrs/week)" value={form.physical} min={0} max={10} onChange={set('physical')} />
          </section>

          <section className="rounded-2xl glass border p-6 space-y-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              Environment &amp; Engagement
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <SelectField icon={HomeIcon} label="Parental Involvement" value={form.parent} options={['Low', 'Medium', 'High']} onChange={set('parent')} />
              <SelectField icon={Sparkles} label="Access to Resources" value={form.resources} options={['Low', 'Medium', 'High']} onChange={set('resources')} />
              <SelectField icon={Heart} label="Motivation Level" value={form.motivation} options={['Low', 'Medium', 'High']} onChange={set('motivation')} />
              <SelectField icon={Wifi} label="Internet Access" value={form.internet} options={['No', 'Yes']} onChange={set('internet')} />
              <SelectField icon={Users2} label="Extracurricular Activities" value={form.activities} options={['No', 'Yes']} onChange={set('activities')} />
            </div>
          </section>

          <section className="rounded-2xl glass border p-6 space-y-4">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              Classification Model
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'best', label: 'Best Model' },
                { key: 'logistic', label: 'Logistic' },
                { key: 'knn', label: 'KNN' },
                { key: 'tree', label: 'Decision Tree' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => set('model_option')(m.key)}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 focus-ring
                    ${form.model_option === m.key
                      ? 'bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white border-transparent shadow-md shadow-[var(--color-brand-purple)]/20'
                      : 'glass hover:border-[var(--color-brand-blue)]/50'}`}
                  style={form.model_option === m.key ? {} : { color: 'var(--text-secondary)' }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white font-semibold shadow-lg shadow-[var(--color-brand-purple)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 focus-ring"
          >
            {loading ? 'Predicting…' : 'Predict Performance'}
          </button>
        </form>

        {/* ---------------- Result ---------------- */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 space-y-5">
            {!result && !loading && !error && (
              <div className="rounded-2xl glass border p-10 text-center">
                <Gauge size={36} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Your prediction results will appear here once you submit the form.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl glass border p-6">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <Alert variant="danger" icon={XCircle} title="Prediction failed">
                {error}
              </Alert>
            )}

            {result && !loading && (
              <div className="rounded-2xl glass border p-8 text-center animate-fade-up">
                <p className="text-xs font-semibold tracking-wide mb-6" style={{ color: 'var(--text-muted)' }}>
                  PREDICTED EXAM SCORE
                </p>
                <div className="flex justify-center mb-6">
                  <GaugeRing value={result.predicted_score} max={100} size={180} label="/ 100" />
                </div>

                <div className="flex justify-center mb-5">
                  {result.pass_prediction ? (
                    <Badge variant="success" className="text-sm px-4 py-1.5">
                      <CheckCircle2 size={14} /> Predicted to PASS
                    </Badge>
                  ) : (
                    <Badge variant="danger" className="text-sm px-4 py-1.5">
                      <XCircle size={14} /> Predicted to FAIL
                    </Badge>
                  )}
                </div>

                {result.confidence != null && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      <span>Model Confidence</span>
                      <span className="font-mono font-semibold">{Math.round(result.confidence * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--ring-track)' }}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] transition-all duration-1000"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="text-left rounded-xl p-4 flex items-start gap-3" style={{ background: 'var(--ring-track)' }}>
                  <msg.icon size={18} className="mt-0.5 shrink-0 text-[var(--color-brand-purple)]" />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
