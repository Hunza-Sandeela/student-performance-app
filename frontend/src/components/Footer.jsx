import { Orbit, Code2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t glass">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center">
              <Orbit size={16} className="text-white" />
            </div>
            <span className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>Orbit</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A machine-learning dashboard that predicts student exam outcomes
            from study habits, environment, and engagement data.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
            PROJECT
          </p>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <li>Logistic Regression &middot; KNN &middot; Decision Tree</li>
            <li>Linear Regression score estimator</li>
            <li>scikit-learn &middot; FastAPI &middot; React</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
            GET IN TOUCH
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:developer@example.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center glass border hover:border-[var(--color-brand-blue)] transition-colors focus-ring"
              aria-label="Email"
            >
              <Mail size={16} style={{ color: 'var(--text-secondary)' }} />
            </a>
            <a
              href="https://github.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center glass border hover:border-[var(--color-brand-blue)] transition-colors focus-ring"
              aria-label="GitHub"
            >
              <Code2 size={16} style={{ color: 'var(--text-secondary)' }} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Orbit Student Performance Prediction System. Built for academic purposes.
      </div>
    </footer>
  );
}
