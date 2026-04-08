'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Award } from 'lucide-react';
import ScrollReveal from './scroll-reveal';
import { AnimatedTextReveal } from './animated-text-reveal';

const awards = [
  {
    icon: Trophy,
    title: 'Best Quantitative Research Paper',
    description:
      'Awarded at the International Conference on Computational Finance for our work on Monte Carlo variance reduction.',
    year: '2025',
  },
  {
    icon: Medal,
    title: 'Top 10 Emerging VC Fund',
    description:
      'Recognized by Venture Capital Journal as one of the most promising emerging fund managers globally.',
    year: '2024',
  },
  {
    icon: Star,
    title: 'Research Excellence Award',
    description:
      'University of Lagos Faculty of Science recognition for outstanding cross-disciplinary research contributions.',
    year: '2024',
  },
  {
    icon: Award,
    title: 'Innovation in Financial Modeling',
    description:
      'Honored for developing novel approaches to credit risk assessment using machine learning techniques.',
    year: '2023',
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

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function AwardsRecognition() {
  return (
    <ScrollReveal>
      <section className="awards-section" aria-label="Awards and recognition">
        <div className="awards-header">
          <AnimatedTextReveal text="Awards & Recognition" tag="h2" className="awards-heading" />
          <p className="awards-intro">
            Milestones that reflect our commitment to excellence.
          </p>
        </div>

        <motion.div
          className="awards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {awards.map((award) => {
            const Icon = award.icon;
            return (
              <motion.article
                key={award.title}
                className="award-card"
                variants={itemVariants}
              >
                <div className="award-card-icon">
                  <Icon size={18} />
                </div>
                <div className="award-card-content">
                  <h3 className="award-card-title">{award.title}</h3>
                  <p className="award-card-description">{award.description}</p>
                  <span className="award-card-year">{award.year}</span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
