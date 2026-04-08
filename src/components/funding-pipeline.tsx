'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { AnimatedTextReveal } from './animated-text-reveal';
import { Sprout, TrendingUp, Building2, Rocket, LogOut } from 'lucide-react';

interface Stage {
  name: string;
  description: string;
  amount: string;
  icon: typeof Sprout;
  color: string;
}

const stages: Stage[] = [
  {
    name: 'Seed',
    description: 'Early-stage validation, product-market fit, and founding team assembly.',
    amount: '$250K – $1M',
    icon: Sprout,
    color: '#8B7355',
  },
  {
    name: 'Series A',
    description: 'Scaling operations, expanding market reach, and building organisational infrastructure.',
    amount: '$2M – $8M',
    icon: TrendingUp,
    color: '#785C33',
  },
  {
    name: 'Series B',
    description: 'Accelerating growth, deepening moats, and preparing for market leadership.',
    amount: '$10M – $30M',
    icon: Building2,
    color: '#5C4630',
  },
  {
    name: 'Growth',
    description: 'Late-stage expansion, international scaling, and strategic acquisitions.',
    amount: '$30M – $100M',
    icon: Rocket,
    color: '#4A3926',
  },
  {
    name: 'Exit',
    description: 'IPO, strategic sale, or secondary offering — realising value for all stakeholders.',
    amount: '$100M+',
    icon: LogOut,
    color: '#3A2D1E',
  },
];

const ACTIVE_INDEX = 1;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const stageVariants: Variants = {
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

const connectorVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function FlowingDots({ isActive }: { isActive: boolean }) {
  return (
    <div className="funding-pipeline-dot-track" aria-hidden="true">
      <span className={`funding-pipeline-dot funding-pipeline-dot-1${isActive ? ' active' : ''}`} />
      <span className={`funding-pipeline-dot funding-pipeline-dot-2${isActive ? ' active' : ''}`} />
      <span className={`funding-pipeline-dot funding-pipeline-dot-3${isActive ? ' active' : ''}`} />
    </div>
  );
}

export function FundingPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section className="funding-pipeline-section" aria-label="Funding pipeline">
      <AnimatedTextReveal text="Funding pipeline" tag="h2" className="funding-pipeline-heading" />
      <p className="funding-pipeline-intro">
        Our staged investment approach spans the full venture lifecycle — from seed validation through to exit, with structured capital deployment at every phase.
      </p>

      <motion.div
        ref={ref}
        className="funding-pipeline-stages"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stages.map((stage, index) => (
          <div key={stage.name} className="funding-pipeline-stage-row">
            <motion.div
              className={`funding-pipeline-stage${index === ACTIVE_INDEX ? ' active' : ''}`}
              variants={stageVariants}
            >
              <div
                className="funding-pipeline-stage-indicator"
                aria-hidden="true"
              >
                <stage.icon className="funding-pipeline-stage-icon" size={18} />
              </div>
              <span className="funding-pipeline-stage-name">{stage.name}</span>
              <p className="funding-pipeline-stage-desc">{stage.description}</p>
              <span className="funding-pipeline-amount">{stage.amount}</span>
            </motion.div>

            {index < stages.length - 1 && (
              <motion.div
                className="funding-pipeline-connector"
                variants={connectorVariants}
                aria-hidden="true"
              >
                <FlowingDots isActive={index < ACTIVE_INDEX} />
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
