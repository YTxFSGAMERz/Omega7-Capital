'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Clock } from 'lucide-react';

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyable?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ContactInfoCards() {
  const [copied, setCopied] = useState(false);
  const email = 'adanegarab@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cards: ContactCard[] = [
    {
      icon: <Mail size={20} aria-hidden="true" />,
      label: 'Email',
      value: email,
      copyable: true,
    },
    {
      icon: <Globe size={20} aria-hidden="true" />,
      label: 'Location',
      value: 'Global \u2014 Remote First',
    },
    {
      icon: <Clock size={20} aria-hidden="true" />,
      label: 'Hours',
      value: 'Mon\u2013Fri 9:00 \u2013 18:00 CET',
    },
  ];

  return (
    <motion.section
      className="contact-info-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label="Contact information"
    >
      {cards.map((card) => (
        <motion.article
          key={card.label}
          className="contact-info-card"
          variants={cardVariants}
        >
          <div className="contact-info-icon" aria-hidden="true">
            {card.icon}
          </div>

          <span className="contact-info-label">{card.label}</span>

          {card.copyable ? (
            <button
              type="button"
              className="contact-info-copy"
              onClick={handleCopy}
              aria-label={
                copied
                  ? `Copied ${card.value} to clipboard`
                  : `Copy ${card.value} to clipboard`
              }
            >
              <span className="contact-info-value">{card.value}</span>
              <span className="contact-info-copy-hint" aria-live="polite">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          ) : (
            <span className="contact-info-value">{card.value}</span>
          )}
        </motion.article>
      ))}
    </motion.section>
  );
}
