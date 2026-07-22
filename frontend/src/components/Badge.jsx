const VARIANTS = {
  success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25',
  warning: 'bg-amber-500/10 text-amber-500 border-amber-500/25',
  danger: 'bg-red-500/10 text-red-500 border-red-500/25',
  brand: 'bg-gradient-to-r from-[var(--color-brand-blue)]/10 to-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)] border-[var(--color-brand-purple)]/25',
  neutral: 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10',
};

export function Badge({ variant = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

const ALERT_VARIANTS = {
  success: {
    wrap: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    wrap: 'bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400',
  },
  danger: {
    wrap: 'bg-red-500/10 border-red-500/25 text-red-600 dark:text-red-400',
  },
  info: {
    wrap: 'bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400',
  },
};

export function Alert({ variant = 'info', icon: Icon, title, children }) {
  const styles = ALERT_VARIANTS[variant];
  return (
    <div className={`rounded-xl border px-4 py-3.5 flex items-start gap-3 animate-fade-up ${styles.wrap}`}>
      {Icon && <Icon size={18} className="mt-0.5 shrink-0" />}
      <div>
        {title && <p className="font-semibold text-sm mb-0.5">{title}</p>}
        {children && <p className="text-sm opacity-90">{children}</p>}
      </div>
    </div>
  );
}
