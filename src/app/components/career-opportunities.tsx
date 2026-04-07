'use client';

import { motion } from 'framer-motion';
import { AnimatedTextReveal } from './animated-text-reveal';

const opportunities = [
  {
    title: 'Quantitative Research Analyst',
    tags: ['Remote', 'Full-time'],
    description:
      'Conduct rigorous quantitative analysis and develop predictive models for financial markets using advanced statistical methods.',
  },
  {
    title: 'Machine Learning Engineer',
    tags: ['Hybrid', 'Full-time'],
    description:
      'Design and implement ML pipelines for alternative data processing, feature engineering, and alpha signal generation.',
  },
  {
    title: 'Research Intern',
    tags: ['Remote', 'Part-time'],
    description:
      'Support ongoing research projects in derivatives pricing, risk modeling, and portfolio optimization during the academic term.',
  },
  {
    title: 'Data Scientist',
    tags: ['Remote', 'Full-time'],
    description:
      'Build and maintain quantitative data infrastructure, develop dashboards, and apply statistical methods to financial datasets.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CareerOpportunities() {
  return (
    <div className="career-section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px 0px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatedTextReveal text="Open positions" tag="h2" className="career-heading" />
        <p className="career-intro">
          We&apos;re actively looking for exceptional individuals to join our
          research collective.
        </p>
      </motion.div>

      <motion.div
        className="career-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px 0px' }}
      >
        {opportunities.map((op) => (
          <motion.div key={op.title} className="career-card" variants={cardVariants}>
            <div className="career-tags">
              {op.tags.map((tag) => (
                <span key={tag} className="career-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="career-title">{op.title}</h3>
            <p className="career-description">{op.description}</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd1mtbzN7T2-OlGWXmWPss4AsIl2jfSq2o9HdXs3qRH9PWRKA/viewform"
              className="career-apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply &rarr;
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
