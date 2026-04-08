'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  ArrowUpRight,
  Layers,
  BarChart3,
  Database,
  FlaskConical,
} from 'lucide-react';
import { TiltCard } from './tilt-card';

const companies = [
  {
    name: 'QuantEdge Analytics',
    stage: 'Seed Stage',
    stageClass: 'portfolio-stage-seed',
    sector: 'Fintech',
    description:
      'AI-powered quantitative trading platform that uses proprietary algorithms to identify market inefficiencies across global equity markets.',
    Icon: TrendingUp,
  },
  {
    name: 'NeuralRisk Solutions',
    stage: 'Series A',
    stageClass: 'portfolio-stage-series-a',
    sector: 'AI/ML',
    description:
      'Deep learning models for real-time credit risk assessment, serving 3 of the top 10 global banks.',
    Icon: ArrowUpRight,
  },
  {
    name: 'DerivativeHub',
    stage: 'Growth Stage',
    stageClass: 'portfolio-stage-growth',
    sector: 'Deep Tech',
    description:
      'Institutional-grade derivatives pricing engine with 10x faster computation than legacy systems.',
    Icon: Layers,
  },
  {
    name: 'DataForge Labs',
    stage: 'Seed Stage',
    stageClass: 'portfolio-stage-seed',
    sector: 'Data',
    description:
      'Alternative data infrastructure platform aggregating satellite, IoT, and social signals for alpha generation.',
    Icon: BarChart3,
  },
  {
    name: 'StatVenture Capital',
    stage: 'Series A',
    stageClass: 'portfolio-stage-series-a',
    sector: 'Fintech',
    description:
      'Systematic venture fund applying quantitative strategies to private market investments.',
    Icon: Database,
  },
  {
    name: 'BioQuant Therapeutics',
    stage: 'Series B',
    stageClass: 'portfolio-stage-series-b',
    sector: 'BioTech',
    description:
      'Computational drug discovery platform combining quantitative finance models with pharmaceutical R&D.',
    Icon: FlaskConical,
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

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
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

const stages = ['All Stages', ...Array.from(new Set(companies.map((c) => c.stage)))];
const sectors = ['All Sectors', ...Array.from(new Set(companies.map((c) => c.sector)))];

export function PortfolioShowcase() {
  const [activeStage, setActiveStage] = useState<string>('All Stages');
  const [activeSector, setActiveSector] = useState<string>('All Sectors');

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesStage = activeStage === 'All Stages' || company.stage === activeStage;
      const matchesSector = activeSector === 'All Sectors' || company.sector === activeSector;
      return matchesStage && matchesSector;
    });
  }, [activeStage, activeSector]);

  return (
    <motion.section
      className="portfolio-section"
      aria-label="Portfolio companies"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      <motion.div variants={headerVariants}>
        <h2 className="portfolio-heading">
          <em>Portfolio</em>
        </h2>
        <p className="portfolio-intro">
          A curated selection of ventures where quantitative rigour meets
          transformative potential — spanning fintech, deep tech, biotech, and
          data infrastructure.
        </p>
      </motion.div>

      <motion.div className="portfolio-filters" variants={headerVariants}>
        <div className="portfolio-filter-row" role="tablist" aria-label="Filter by stage">
          <span className="portfolio-filter-label">Stage:</span>
          {stages.map((stage) => (
            <button
              key={stage}
              role="tab"
              aria-selected={activeStage === stage}
              className={`portfolio-filter-btn${activeStage === stage ? ' active' : ''}`}
              onClick={() => setActiveStage(stage)}
            >
              {stage}
            </button>
          ))}
        </div>
        <div className="portfolio-filter-row" role="tablist" aria-label="Filter by sector">
          <span className="portfolio-filter-label">Sector:</span>
          {sectors.map((sector) => (
            <button
              key={sector}
              role="tab"
              aria-selected={activeSector === sector}
              className={`portfolio-filter-btn${activeSector === sector ? ' active' : ''}`}
              onClick={() => setActiveSector(sector)}
            >
              {sector}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div className="portfolio-grid" variants={containerVariants}>
        <AnimatePresence mode="popLayout">
          {filteredCompanies.map(({ name, stage, stageClass, sector, description, Icon }) => (
            <motion.div
              key={name}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <TiltCard className="portfolio-card">
                <div className="portfolio-card-header">
                  <div className="portfolio-card-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className={`portfolio-stage ${stageClass}`}>{stage}</span>
                </div>
                <h3 className="portfolio-name">{name}</h3>
                <span className="portfolio-sector">{sector}</span>
                <p className="portfolio-description">{description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

export default PortfolioShowcase;
