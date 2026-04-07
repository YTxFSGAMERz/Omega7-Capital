'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './scroll-reveal';
import { ExternalLink } from 'lucide-react';

const publications = [
  {
    tag: 'Working Paper',
    title: 'Mean-Reversion Strategies in Emerging Market Equities',
    description: 'An empirical analysis of mean-reversion signals across 14 emerging market indices using stationarity tests and cointegration frameworks.',
    year: '2025',
  },
  {
    tag: 'Research Note',
    title: 'Volatility Surface Calibration Under Heston Model',
    description: 'Practical implementation of Heston stochastic volatility calibration using deep learning-based parameter estimation.',
    year: '2025',
  },
  {
    tag: 'Seminar',
    title: 'Foundations of Statistical Arbitrage',
    description: 'A three-part seminar series covering pairs trading, factor models, and high-frequency execution strategies.',
    year: '2024',
  },
];

export default function PublicationsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      style={{ marginTop: '64px' }}
      aria-label="Research highlights"
    >
      <ScrollReveal>
        <h2 style={{ fontSize: '19px', fontWeight: 400, color: 'var(--text)', marginBottom: '12px' }}>
          <em>Research highlights</em>
        </h2>
        <p className="publications-intro">
          Selected outputs from our research programme — working papers, seminar series, and collaborative investigations.
        </p>
      </ScrollReveal>

      <div className="publications-list">
        {publications.map((pub, index) => (
          <ScrollReveal key={index} delay={index * 0.08}>
            <article
              className={`publication-item ${expandedIndex === index ? 'publication-item-expanded' : ''}`}
            >
              <button
                onClick={() => toggle(index)}
                className="publication-header"
                aria-expanded={expandedIndex === index}
              >
                <div className="publication-meta">
                  <span className="publication-tag">{pub.tag}</span>
                  <span className="publication-year">{pub.year}</span>
                </div>
                <div className="publication-title-row">
                  <h3 className="publication-title">{pub.title}</h3>
                  <ExternalLink
                    size={14}
                    strokeWidth={1.5}
                    className="publication-toggle-icon"
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="publication-description">{pub.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
