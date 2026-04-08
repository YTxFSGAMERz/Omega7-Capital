'use client';

import { motion } from 'framer-motion';

const logos = ['Goldman Sachs', 'JP Morgan', 'Bloomberg', 'McKinsey'];

const stats = [
  { value: '2+', label: 'Years of Research' },
  { value: '50+', label: 'Members Worldwide' },
  { value: '10+', label: 'Universities Represented' },
];

export function SocialProofSection() {
  return (
    <div className="social-proof-section">
      {/* Trust Indicators */}
      <motion.div
        className="social-proof-logos"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="social-proof-logos-label">
          <em>Trusted by researchers from</em>
        </p>
        <div className="social-proof-logos-row">
          {logos.map((logo) => (
            <span key={logo} className="social-proof-logo">
              {logo}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Key Stats Bar */}
      <motion.div
        className="social-proof-stats"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="social-proof-stat">
            {index > 0 && <span className="social-proof-divider" aria-hidden="true" />}
            <span className="social-proof-stat-value">{stat.value}</span>
            <span className="social-proof-stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
