export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <div
      className="animate-fade-up group rounded-2xl p-6 glass border hover:-translate-y-1.5 hover:border-[var(--color-brand-blue)]/40 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[var(--color-brand-purple)]/20">
        <Icon size={22} className="text-white" strokeWidth={2} />
      </div>
      <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
    </div>
  );
}
