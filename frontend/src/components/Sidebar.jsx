import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  BrainCircuit,
  Info,
  Mail,
  X,
  Orbit,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/predict', label: 'Predict', icon: Sparkles },
  { to: '/models', label: 'Model Info', icon: BrainCircuit },
  { to: '/about', label: 'About Project', icon: Info },
  { to: '/contact', label: 'Contact', icon: Mail },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 lg:z-0 flex flex-col
          glass border-r transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-6 h-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center shadow-lg shadow-[var(--color-brand-purple)]/20">
              <Orbit size={20} className="text-white" strokeWidth={2.25} />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Orbit</p>
              <p className="text-[11px] tracking-wide" style={{ color: 'var(--text-muted)' }}>PERFORMANCE ENGINE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 focus-ring"
            aria-label="Close navigation"
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus-ring
                ${isActive
                  ? 'bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white shadow-md shadow-[var(--color-brand-purple)]/25'
                  : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'}`
              }
              style={({ isActive }) => (isActive ? {} : { color: 'var(--text-secondary)' })}
            >
              <Icon size={18} strokeWidth={2.1} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <div className="rounded-2xl p-4 glass border">
            {/* <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Final Year Project
            </p> */}
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Predicting student outcomes with classical ML models.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
