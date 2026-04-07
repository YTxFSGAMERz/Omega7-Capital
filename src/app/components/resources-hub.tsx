'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  BookOpen,
  Lightbulb,
  ListChecks,
  Shield,
  Code,
  ArrowRight,
} from 'lucide-react';
import { AnimatedTextReveal } from './animated-text-reveal';

const resources = [
  {
    title: 'Annual Quantitative Finance Report 2024',
    type: 'report',
    typeLabel: 'Research Report',
    description:
      'Comprehensive analysis of quantitative strategies deployed across emerging markets, including backtested performance metrics and risk assessments.',
    icon: FileText,
  },
  {
    title: 'Stochastic Volatility Models: A Practitioner\'s Guide',
    type: 'whitepaper',
    typeLabel: 'Whitepaper',
    description:
      'An accessible introduction to local and stochastic volatility models with Python implementation examples.',
    icon: BookOpen,
  },
  {
    title: 'Machine Learning in Portfolio Construction',
    type: 'note',
    typeLabel: 'Research Note',
    description:
      'Exploring gradient boosting and neural network approaches to portfolio optimization with real market data.',
    icon: Lightbulb,
  },
  {
    title: 'Algorithmic Trading Reading List',
    type: 'list',
    typeLabel: 'Curated List',
    description:
      'Essential texts and papers for aspiring quantitative researchers, from foundational mathematics to cutting-edge applications.',
    icon: ListChecks,
  },
  {
    title: 'Risk Management Framework for VCs',
    type: 'framework',
    typeLabel: 'Framework',
    description:
      'A structured approach to evaluating and monitoring portfolio risk using quantitative heuristics.',
    icon: Shield,
  },
  {
    title: 'Python for Quantitative Finance',
    type: 'tutorial',
    typeLabel: 'Tutorial Series',
    description:
      'Step-by-step guide covering NumPy, Pandas, and SciPy for financial modeling and backtesting.',
    icon: Code,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export function ResourcesHub() {
  return (
    <section className="resources-section" aria-label="Resources">
      <div className="resources-header">
        <AnimatedTextReveal text="Resources" tag="h2" className="resources-heading" />
        <p className="resources-intro">
          Research resources, whitepapers, and curated content for our community — tools and knowledge to deepen your practice.
        </p>
      </div>

      <motion.div
        className="resources-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {resources.map((resource) => (
          <motion.article
            key={resource.title}
            className="resources-card"
            variants={itemVariants}
          >
            <div className="resources-card-icon">
              <resource.icon size={22} strokeWidth={1.5} />
            </div>
            <div className="resources-card-body">
              <span className={`resources-card-type resources-type-${resource.type}`}>
                {resource.typeLabel}
              </span>
              <h3 className="resources-card-title">{resource.title}</h3>
              <p className="resources-card-description">{resource.description}</p>
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="resources-card-arrow" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
