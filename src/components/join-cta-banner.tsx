'use client';

import { motion } from 'framer-motion';

export function JoinCTABanner() {
  return (
    <motion.section
      className="join-cta-banner"
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="join-cta-banner-bg" aria-hidden="true" />
      <div className="join-cta-banner-content">
        <div className="join-cta-banner-heading">
          <span className="join-cta-banner-quote-left" aria-hidden="true">—</span>
          <em>Ready to contribute?</em>
          <span className="join-cta-banner-quote-right" aria-hidden="true">—</span>
        </div>
        <p className="join-cta-banner-text">
          Join a growing collective of researchers pushing the boundaries of quantitative finance.
        </p>
        <div className="join-cta-banner-buttons">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd1mtbzN7T2-OlGWXmWPss4AsIl2jfSq2o9HdXs3qRH9PWRKA/viewform"
            className="join-cta-banner-btn join-cta-banner-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now &rarr;
          </a>
          <a href="#about" className="join-cta-banner-btn join-cta-banner-btn-secondary">
            Learn More
          </a>
        </div>
      </div>
    </motion.section>
  );
}
