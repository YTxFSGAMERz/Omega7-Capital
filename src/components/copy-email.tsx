'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface CopyEmailProps {
  email: string;
  className?: string;
  as?: 'button' | 'span';
}

export default function CopyEmail({ email, className = '', as: Tag = 'span' }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Email copied', { description: email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy', { description: 'Please copy manually.' });
    }
  }, [email]);

  if (Tag === 'button') {
    return (
      <button
        type="button"
        className={`copy-email ${className}`}
        onClick={copyEmail}
        title="Click to copy email address"
      >
        <span className="copy-email-text">{email}</span>
        <span className="copy-email-icon">
          {copied ? (
            <Check size={12} strokeWidth={2} />
          ) : (
            <Copy size={12} strokeWidth={1.5} />
          )}
        </span>
      </button>
    );
  }

  return (
    <span
      className={`copy-email ${className}`}
      onClick={copyEmail}
      title="Click to copy email address"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyEmail(); }}
    >
      <span className="copy-email-text">{email}</span>
      <span className="copy-email-icon">
        {copied ? (
          <Check size={12} strokeWidth={2} />
        ) : (
          <Copy size={12} strokeWidth={1.5} />
        )}
      </span>
    </span>
  );
}
