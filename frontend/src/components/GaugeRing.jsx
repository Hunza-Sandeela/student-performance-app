import { useEffect, useState } from 'react';

/**
 * Signature visual motif of the app: a radial gradient progress ring.
 * Used for exam-score predictions, confidence levels, and homepage stats
 * so the same visual language ties every page together.
 */
export default function GaugeRing({
  value = 0,
  max = 100,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  gradientId = 'gaugeGradient',
  valueFormatter,
}) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(value / max, 0), 1);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  const offset = circumference - animated * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-blue)" />
            <stop offset="100%" stopColor="var(--color-brand-purple)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--ring-track)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold" style={{ fontSize: size * 0.22, color: 'var(--text-primary)' }}>
          {valueFormatter ? valueFormatter(value) : Math.round(value)}
        </span>
        {label && (
          <span className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {label}
          </span>
        )}
      </div>
      {sublabel && (
        <span className="absolute -bottom-6 text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}
