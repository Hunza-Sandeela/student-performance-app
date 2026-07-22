import { useState } from 'react';
import { Mail, Code2, Link2, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import { Alert } from '../components/Badge';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Note: this is a static demo form (no email backend wired up).
    // Wire this to a real endpoint or mailto link for production use.
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10">
      <div className="mb-10 animate-fade-up">
        <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-purple)] mb-2">GET IN TOUCH</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
          Contact the developer
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Questions, feedback, or ideas for the next iteration — reach out.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl glass border p-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] flex items-center justify-center mb-4 text-white font-display font-bold text-xl">
              DV
            </div>
            <h3 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
              Project Developer
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Machine Learning &amp; Full-Stack Development
            </p>
            <div className="space-y-3">
              <a href="mailto:developer@example.com" className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={16} /> developer@example.com
              </a>
              <a href="https://github.com" className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <Code2 size={16} /> github.com/yourhandle
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <Link2 size={16} /> linkedin.com/in/yourhandle
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {sent ? (
            <Alert variant="success" icon={CheckCircle2} title="Message noted">
              This is a static demo form, so nothing was actually sent — wire it
              up to your email service or a form backend to go live.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl glass border p-6 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <User size={15} className="text-[var(--color-brand-purple)]" /> Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl glass border text-sm focus-ring outline-none"
                  style={{ color: 'var(--text-primary)' }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <Mail size={15} className="text-[var(--color-brand-purple)]" /> Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl glass border text-sm focus-ring outline-none"
                  style={{ color: 'var(--text-primary)' }}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <MessageSquare size={15} className="text-[var(--color-brand-purple)]" /> Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl glass border text-sm focus-ring outline-none resize-none"
                  style={{ color: 'var(--text-primary)' }}
                  placeholder="Tell me what's on your mind…"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white font-semibold text-sm shadow-lg shadow-[var(--color-brand-purple)]/25 hover:-translate-y-0.5 transition-all duration-300 focus-ring"
              >
                <Send size={15} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
