import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, GraduationCap, LineChart, Users, Percent,
  ClipboardList, ScanSearch, Cpu, BadgeCheck, ChevronDown,
  BookOpen, Clock, Brain,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import GaugeRing from '../components/GaugeRing';

const FEATURES = [
  { icon: ClipboardList, title: 'Guided Input Form', description: 'Eleven study, environment, and engagement fields grouped into clear sections so nothing feels overwhelming.' },
  { icon: Cpu, title: 'Four Trained Models', description: 'Logistic Regression, KNN, and Decision Tree classify pass/fail, while Linear Regression estimates the numeric score.' },
  { icon: ScanSearch, title: 'Instant Feedback', description: 'Get a pass/fail call, a predicted score, and a model confidence level in under a second.' },
  { icon: BadgeCheck, title: 'Model Transparency', description: 'Compare how each classifier reasons, and pick the one whose trade-offs you trust most.' },
];

const TIMELINE = [
  { icon: ClipboardList, title: 'Enter student details', desc: 'Fill in study hours, attendance, sleep, and other habits in the guided form.' },
  { icon: Cpu, title: 'Features are scaled', desc: 'Inputs are encoded and standardized with the same scaler used in training.' },
  { icon: Brain, title: 'Models make a call', desc: 'A classifier predicts pass/fail while the regressor estimates the exact score.' },
  { icon: BadgeCheck, title: 'Results are explained', desc: 'You see the outcome, confidence, and a plain-language takeaway.' },
];

const FAQS = [
  { q: 'What data was used to train these models?', a: 'The models were trained on a dataset of student records covering study hours, attendance, sleep, parental involvement, resources, motivation, and past exam scores, paired with each student\'s eventual pass/fail outcome and exam score.' },
  { q: 'Which classification model should I pick?', a: 'The "Best Model" option defaults to Logistic Regression, a strong, well-calibrated baseline. Try KNN or Decision Tree on the Model Info page if you want to compare how they weigh the same inputs differently.' },
  { q: 'Is the predicted score guaranteed to be accurate?', a: 'No. Predictions reflect patterns in historical data and should be treated as an estimate to support planning and early intervention, not a guaranteed outcome.' },
  { q: 'Can I use this for real academic decisions?', a: 'This project was built for academic and demonstration purposes. For real decisions, pair it with a teacher\'s judgment and additional context the model doesn\'t see.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl glass border overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-ring"
      >
        <span className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-24">

      {/* ---------------- Hero ---------------- */}
      <section className="relative grid lg:grid-cols-2 gap-12 items-center pt-4">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-brand-blue)]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-[var(--color-brand-purple)]/20 rounded-full blur-3xl -z-10" />

        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border mb-6 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            <GraduationCap size={14} className="text-[var(--color-brand-purple)]" />
            Machine Learning &middot; Education Analytics
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6" style={{ color: 'var(--text-primary)' }}>
            Know a student's
            <br />
            <span className="text-gradient">trajectory</span> before
            <br />
            the exam does.
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            Orbit turns study habits, attendance, and environment into a clear
            pass/fail call and a predicted exam score &mdash; powered by models
            trained on real student outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/predict"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white font-semibold text-sm shadow-lg shadow-[var(--color-brand-purple)]/25 hover:shadow-xl hover:shadow-[var(--color-brand-purple)]/35 hover:-translate-y-0.5 transition-all duration-300 focus-ring"
            >
              Run a Prediction
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/models"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass border font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 focus-ring"
              style={{ color: 'var(--text-primary)' }}
            >
              Explore the Models
            </Link>
          </div>
        </div>

        <div className="animate-fade-up flex justify-center lg:justify-end" style={{ animationDelay: '150ms' }}>
          <div className="relative glass border rounded-3xl p-8 sm:p-10 animate-float-slow">
            <p className="text-xs font-semibold tracking-wide mb-6 text-center" style={{ color: 'var(--text-muted)' }}>
              SAMPLE PREDICTED SCORE
            </p>
            <div className="flex justify-center">
              <GaugeRing value={78} max={100} size={190} label="/ 100" />
            </div>
            <div className="flex justify-center mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold border border-emerald-500/25">
                <BadgeCheck size={13} /> Predicted to Pass
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} value={6600} suffix="+" label="Student records analyzed" delay={0} />
        <StatCard icon={Cpu} value={4} label="Trained ML models" delay={80} />
        <StatCard icon={LineChart} value={11} label="Input features per student" delay={160} />
        <StatCard icon={Percent} value={95} suffix="%" label="Classifier accuracy (holdout)" delay={240} />
      </section>

      {/* ---------------- Features ---------------- */}
      <section>
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">WHAT YOU GET</p>
          <h2 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Built for quick, honest reads
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Every prediction pairs a clear outcome with the context to trust &mdash; or question &mdash; it.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ---------------- Timeline ---------------- */}
      <section>
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">HOW IT WORKS</p>
          <h2 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
            From form to forecast
          </h2>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[var(--color-brand-blue)]/40 to-[var(--color-brand-purple)]/40" />
          {TIMELINE.map((step, i) => (
            <div key={step.title} className="relative animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center mb-4 relative z-10 shadow-md shadow-[var(--color-brand-purple)]/20">
                <step.icon size={20} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="grid lg:grid-cols-3 gap-10">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">FAQ</p>
          <h2 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Common questions
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Anything else? Head to the Contact page.
          </p>
        </div>
        <div className="lg:col-span-2 space-y-3">
          {FAQS.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)]">
        <BookOpen className="absolute top-6 left-8 text-white/10" size={64} />
        <Clock className="absolute bottom-6 right-10 text-white/10" size={80} />
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
          Ready to see where a student stands?
        </h2>
        <p className="text-white/85 max-w-xl mx-auto mb-8">
          Fill out one form and get a pass/fail call with a predicted exam score in seconds.
        </p>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[var(--color-brand-blue)] font-semibold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 focus-ring"
        >
          Start a Prediction
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
