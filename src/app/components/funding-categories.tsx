'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { Sprout, TrendingUp, BarChart3, Cpu, Layers, GraduationCap } from 'lucide-react';

const categories = [
  {
    icon: Sprout,
    title: 'Seed Stage',
    description:
      'Early-stage ventures with transformative potential in quantitative finance and fintech.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Equity',
    description:
      'Scaling proven business models with strong unit economics and defensible moats.',
  },
  {
    icon: BarChart3,
    title: 'Quantitative Strategies',
    description:
      'Systematic trading and risk management approaches backed by rigorous research.',
  },
  {
    icon: Cpu,
    title: 'Deep Tech',
    description:
      'AI/ML-driven financial technology, computational tools, and data infrastructure.',
  },
  {
    icon: Layers,
    title: 'Fintech Infrastructure',
    description:
      'Payment rails, compliance tools, and market structure innovation.',
  },
  {
    icon: GraduationCap,
    title: 'Academic Research',
    description:
      'Supporting scholarly work that advances the theoretical foundations of finance.',
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

const itemVariants = {
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

export default function FundingCategories() {
  return (
    <ScrollReveal>
      <section className="funding-categories-section" aria-label="Funding focus areas">
        <div className="funding-categories-header">
          <h2 className="funding-categories-heading">
            <em>Funding focus areas</em>
          </h2>
          <p className="funding-categories-intro">
            We deploy capital across six core areas where quantitative rigour meets transformative opportunity.
          </p>
        </div>

        <motion.div
          className="funding-categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {categories.map((category) => (
            <TiltCard key={category.title} className="funding-category-card">
              <div className="funding-category-icon">
                <category.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="funding-category-title">{category.title}</h3>
              <p className="funding-category-description">{category.description}</p>
            </TiltCard>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
