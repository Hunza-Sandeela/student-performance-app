import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const TITLES = {
  '/': 'Dashboard',
  '/predict': 'Student Prediction',
  '/models': 'Model Information',
  '/about': 'About the Project',
  '/contact': 'Contact & Developer',
};

export default function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const title = TITLES[location.pathname] || 'Orbit';

  return (
    <header className="sticky top-0 z-30 h-20 flex items-center justify-between px-5 sm:px-8 glass border-b">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 focus-ring"
          aria-label="Open navigation"
        >
          <Menu size={22} style={{ color: 'var(--text-primary)' }} />
        </button>
        <div>
          <h1 className="font-display font-semibold text-lg sm:text-xl" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 focus-ring"
        style={{ background: theme === 'dark' ? 'var(--surface)' : 'var(--ring-track)' }}
        aria-label="Toggle dark mode"
      >
        <span
          className={`absolute w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)]
            flex items-center justify-center shadow-md transition-transform duration-300
            ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
        >
          {theme === 'dark' ? (
            <Moon size={13} className="text-white" />
          ) : (
            <Sun size={13} className="text-white" />
          )}
        </span>
      </button>
    </header>
  );
}
