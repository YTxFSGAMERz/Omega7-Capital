'use client';

import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Brain, Globe } from 'lucide-react';
import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';

const pillars = [
  {
    number: '01',
    title: 'Quantitative Rigour',
    description:
      'We apply mathematical precision to every investment decision, leveraging data science and statistical modeling to identify asymmetric opportunities.',
    Icon: Calculator,
  },
  {
    number: '02',
    title: 'Long-Term Value Creation',
    description:
      'Our investment horizon extends beyond quarterly returns. We partner with founders building enduring businesses that redefine industries.',
    Icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Cross-Disciplinary Expertise',
    description:
      'Our team combines deep knowledge of quantitative finance, technology, and operations to provide more than just capital.',
    Icon: Brain,
  },
  {
    number: '04',
    title: 'Global Network',
    description:
      'Access to our collective of 50+ researchers across 10+ universities provides unparalleled market intelligence.',
    Icon: Globe,
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function InvestmentThesis() {
  return (
    <ScrollReveal>
      <section className="thesis-section" aria-label="Investment thesis">
        <div className="thesis-header">
          <AnimatedTextReveal text="Investment Thesis" tag="h2" className="thesis-heading" />
          <p className="thesis-intro">
            Four pillars that define how we identify, evaluate, and support the
            next generation of exceptional ventures.
          </p>
        </div>

        <motion.div
          className="thesis-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {pillars.map(({ number, title, description, Icon }) => (
            <motion.div
              key={number}
              variants={itemVariants}
            >
              <TiltCard className="thesis-card">
                <div className="thesis-card-accent" aria-hidden="true" />
                <span className="thesis-number">{number}</span>
                <div className="thesis-icon">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="thesis-title">{title}</h3>
                <p className="thesis-description">{description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
