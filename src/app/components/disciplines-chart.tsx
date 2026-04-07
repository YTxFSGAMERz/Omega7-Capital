'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { AnimatedTextReveal } from './animated-text-reveal';

const disciplines = [
  { name: 'Quantitative Finance', percent: 35 },
  { name: 'Mathematics', percent: 20 },
  { name: 'Statistics & Data Science', percent: 18 },
  { name: 'Computer Science', percent: 12 },
  { name: 'Economics', percent: 10 },
  { name: 'Physics', percent: 5 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {},
  visible: {},
};

export function DisciplinesChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section className="disciplines-section" aria-label="Academic Disciplines">
      <AnimatedTextReveal text="Our Disciplines" tag="h2" className="disciplines-heading" />
      <p className="disciplines-intro">
        Our collective draws on a diverse range of quantitative and mathematical
        disciplines, united by a commitment to rigour and scientific inquiry.
      </p>
      <motion.div
        ref={ref}
        className="disciplines-list"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {disciplines.map((discipline) => (
          <motion.div
            key={discipline.name}
            className="discipline-item"
            variants={itemVariants}
          >
            <div className="discipline-header">
              <span className="discipline-label">{discipline.name}</span>
              <span className="discipline-percent">{discipline.percent}%</span>
            </div>
            <div className="discipline-bar">
              <div className="discipline-bar-track">
                <motion.div
                  className="discipline-bar-fill"
                  initial={{ width: 0 }}
                  animate={
                    isInView ? { width: `${discipline.percent}%` } : { width: 0 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
