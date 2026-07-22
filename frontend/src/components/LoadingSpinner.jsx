export default function LoadingSpinner({ label = 'Running prediction models…', size = 40 }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full border-4 border-[var(--ring-track)]"
        />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-brand-blue)] border-r-[var(--color-brand-purple)] animate-spin"
        />
      </div>
      <p className="text-sm font-medium animate-pulse-glow" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  );
}
