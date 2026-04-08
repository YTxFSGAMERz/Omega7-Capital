'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import ScrollReveal from './scroll-reveal';
import { AnimatedTextReveal } from './animated-text-reveal';

const insights = [
  {
    category: 'MARKET ANALYSIS',
    title: 'Quantitative Approaches to Emerging Market Volatility',
    excerpt:
      'Exploring how stochastic volatility models can be adapted for frontier market dynamics and structural breaks.',
    date: 'Mar 2025',
    readTime: '8 min',
  },
  {
    category: 'RESEARCH',
    title: 'Monte Carlo Methods in Derivative Pricing: A Comparative Study',
    excerpt:
      'A systematic comparison of variance reduction techniques applied to exotic option pricing on Asian markets.',
    date: 'Feb 2025',
    readTime: '12 min',
  },
  {
    category: 'TECHNIQUE',
    title: 'Machine Learning for Credit Risk Assessment in Microfinance',
    excerpt:
      'Leveraging gradient boosting and neural networks to improve default prediction accuracy by 23% over traditional scoring.',
    date: 'Jan 2025',
    readTime: '10 min',
  },
  {
    category: 'POLICY',
    title: 'Regulatory Implications of Algorithmic Trading in African Markets',
    excerpt:
      'An analysis of how emerging regulatory frameworks are shaping the adoption of systematic trading strategies across Africa.',
    date: 'Dec 2024',
    readTime: '6 min',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const categories = ['All', ...Array.from(new Set(insights.map((i) => i.category)))];

export function ResearchInsights() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredInsights =
    activeFilter === 'All'
      ? insights
      : insights.filter((i) => i.category === activeFilter);

  return (
    <ScrollReveal>
      <section className="research-insights-section" aria-label="Research insights">
        <div className="research-insights-heading-wrapper">
          <AnimatedTextReveal text="Research Insights" tag="h2" className="research-insights-heading" />
          <p className="research-insights-intro">
            Latest thinking from our research collective.
          </p>
        </div>

        <div className="research-insights-filters" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`research-insights-filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className="research-insights-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight) => (
              <motion.article
                key={insight.title}
                layout
                className="research-insight-card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }}
              >
                <span className="research-insight-tag">{insight.category}</span>
                <h3 className="research-insight-title">{insight.title}</h3>
                <p className="research-insight-excerpt">{insight.excerpt}</p>
                <div className="research-insight-footer">
                  <span className="research-insight-meta">{insight.date}</span>
                  <span className="research-insight-read-time">
                    <Clock size={14} aria-hidden="true" />
                    {insight.readTime}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
