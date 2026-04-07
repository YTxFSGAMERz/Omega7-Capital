'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const SESSION_KEY = 'omega7_exit_intent_shown';

export function ExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen) {
        const alreadyShown = sessionStorage.getItem(SESSION_KEY);
        if (!alreadyShown) {
          sessionStorage.setItem(SESSION_KEY, 'true');
          setIsOpen(true);
        }
      }
    },
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

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
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="exit-intent-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter subscription"
        >
          <motion.div
            ref={panelRef}
            className="exit-intent-panel"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="exit-intent-close"
              onClick={close}
              aria-label="Close dialog"
              type="button"
            >
              <X size={18} />
            </button>

            <span className="exit-intent-accent">Stay Connected</span>

            {status === 'success' ? (
              <div className="exit-intent-success">
                <p className="exit-intent-heading">Welcome aboard.</p>
                <p className="exit-intent-subtitle">{message}</p>
              </div>
            ) : (
              <>
                <h2 className="exit-intent-heading">Before you go...</h2>
                <p className="exit-intent-subtitle">
                  Subscribe to stay informed on our latest research, publications, and events. No spam, unsubscribe anytime.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="exit-intent-input-wrapper">
                    <input
                      type="email"
                      className="exit-intent-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === 'loading'}
                      aria-label="Email address"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="exit-intent-button"
                      disabled={status === 'loading' || !email.trim()}
                    >
                      <span>Subscribe</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>

                {status === 'error' && message && (
                  <p className="exit-intent-disclaimer" role="alert" aria-live="polite" style={{ color: 'var(--accent-color)' }}>
                    {message}
                  </p>
                )}

                <p className="exit-intent-disclaimer">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
