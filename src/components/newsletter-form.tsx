'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import ScrollReveal from './scroll-reveal';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter?XTransformPort=3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing.');
        setEmail('');
        toast.success('Subscribed!', {
          description: 'You will receive our latest updates.',
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        toast.error('Subscription failed', {
          description: data.error || 'Please try again.',
        });
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section
      style={{
        marginTop: '64px',
        borderTop: '1px solid var(--border)',
        paddingTop: '40px',
        paddingBottom: '8px',
      }}
      aria-label="Newsletter subscription"
    >
      <ScrollReveal>
        <h2 style={{ fontSize: '19px', fontWeight: 400, color: 'var(--text)', marginBottom: '12px' }}>
          <em>Stay informed</em>
        </h2>
        <p
          style={{
            fontSize: '19px',
            fontWeight: 300,
            color: 'var(--text)',
            lineHeight: 1.65,
            marginBottom: '24px',
            maxWidth: '520px',
          }}
        >
          Subscribe to receive updates on our research publications, upcoming seminars, and membership opportunities.
        </p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="newsletter-input-wrapper">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="newsletter-input"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="newsletter-button"
            >
              {status === 'loading' ? (
                <span className="newsletter-spinner" />
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {message && (
            <p
              className={`newsletter-message ${
                status === 'success' ? 'newsletter-success' : 'newsletter-error'
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </ScrollReveal>
    </section>
  );
}
