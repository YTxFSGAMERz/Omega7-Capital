'use client';

import { motion } from 'framer-motion';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';
import { Search, Calculator, TrendingUp, Rocket, Target } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We identify promising ventures through deep quantitative analysis and network-driven deal sourcing.',
    Icon: Search,
  },
  {
    number: '02',
    title: 'Due Diligence',
    description:
      'Every opportunity undergoes rigorous mathematical and financial assessment using proprietary models.',
    Icon: Calculator,
  },
  {
    number: '03',
    title: 'Investment',
    description:
      'We deploy capital with precision, structuring deals that align incentives for long-term value creation.',
    Icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Growth',
    description:
      'Active portfolio support through research insights, network connections, and strategic guidance.',
    Icon: Rocket,
  },
  {
    number: '05',
    title: 'Exit',
    description:
      'Disciplined exit strategies informed by quantitative valuation models and market timing analysis.',
    Icon: Target,
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

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HowWeWork() {
  return (
    <section className="how-we-work-section" aria-label="How we work">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        <motion.div className="how-we-work-header" variants={headerVariants}>
          <AnimatedTextReveal text="How We Work" tag="h2" className="how-we-work-heading" />
          <p className="how-we-work-intro">
            Our approach combines rigorous analysis with collaborative innovation.
          </p>
        </motion.div>

        <div className="how-we-work-steps">
          {steps.map((step, index) => {
            const isReversed = index % 2 === 1;
            return (
              <TiltCard
                key={step.number}
                className={
                  isReversed
                    ? 'how-we-work-step how-we-work-step--reversed'
                    : 'how-we-work-step'
                }
              >
                <div className="how-we-work-step-visual">
                  <span className="how-we-work-step-number">
                    {step.number}
                  </span>
                  <div className="how-we-work-step-icon">
                    <step.Icon aria-hidden="true" />
                  </div>
                </div>
                <div className="how-we-work-step-content">
                  <h3 className="how-we-work-step-title">{step.title}</h3>
                  <p className="how-we-work-step-description">
                    {step.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
