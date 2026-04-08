'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import ScrollReveal from './scroll-reveal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact?XTransformPort=3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || 'Message sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Message sent', {
          description: 'We will get back to you shortly.',
        });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Something went wrong.');
        toast.error('Failed to send', {
          description: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  return (
    <section
      style={{
        marginTop: '64px',
        borderTop: '1px solid var(--border)',
        paddingTop: '40px',
        paddingBottom: '8px',
      }}
      aria-label="Contact form"
    >
      <ScrollReveal>
        <h2 style={{ fontSize: '19px', fontWeight: 400, color: 'var(--text)', marginBottom: '12px' }}>
          <em>Get in touch</em>
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
          For general inquiries, partnership opportunities, or membership questions, send us a message.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-row">
            <div className="contact-form-field">
              <label htmlFor="contact-name" className="contact-form-label">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                className="contact-form-input"
                placeholder="Your name"
              />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-email" className="contact-form-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                className="contact-form-input"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-subject" className="contact-form-label">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="contact-form-input"
              placeholder="What is this about?"
            />
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-message" className="contact-form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              rows={5}
              className="contact-form-input contact-form-textarea"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="contact-form-submit"
          >
            {status === 'loading' ? (
              <span className="newsletter-spinner" />
            ) : (
              'Send message'
            )}
          </button>

          {feedback && (
            <p
              className={`newsletter-message ${
                status === 'success' ? 'newsletter-success' : 'newsletter-error'
              }`}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </p>
          )}
        </form>
      </ScrollReveal>
    </section>
  );
}
