import { useEffect, useRef, useState } from 'react';

export default function StatCard({ icon: Icon, value, suffix = '', label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="animate-fade-up rounded-2xl p-6 glass border hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-brand-purple)]/10 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)]/15 to-[var(--color-brand-purple)]/15 flex items-center justify-center mb-4">
        <Icon size={20} className="text-[var(--color-brand-purple)]" strokeWidth={2.1} />
      </div>
      <p className="font-display font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
        {count}
        {suffix}
      </p>
      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
}
