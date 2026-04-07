'use client';

import { useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, BookOpen, BarChart3, Users, FileCheck, type LucideIcon } from 'lucide-react';

interface Stage {
  label: string;
  icon: LucideIcon;
  description: string;
}

const stages: Stage[] = [
  { label: 'Ideation', icon: Lightbulb, description: 'Generating novel research hypotheses' },
  { label: 'Literature Review', icon: BookOpen, description: 'Comprehensive literature survey' },
  { label: 'Analysis', icon: BarChart3, description: 'Quantitative modeling & testing' },
  { label: 'Peer Review', icon: Users, description: 'Internal peer review process' },
  { label: 'Publication', icon: FileCheck, description: 'Conference & journal publication' },
];

const ACTIVE_COUNT = 3;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const stageVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function StageCircle({ stage, index }: { stage: Stage; index: number }) {
  const isActive = index < ACTIVE_COUNT;
  const [hovered, setHovered] = useState(false);
  const Icon = stage.icon;

  return (
    <div
      className="research-pipeline-stage"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`research-pipeline-stage-circle${isActive ? ' active' : ''}`}
        aria-label={`${stage.label}: ${stage.description}`}
      >
        <Icon className="research-pipeline-stage-icon" size={20} />
      </div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          className="research-pipeline-stage-desc"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {stage.description}
        </motion.div>
      )}

      <span className="research-pipeline-stage-label">{stage.label}</span>
    </div>
  );
}

function Connector({ index }: { index: number }) {
  const isActive = index < ACTIVE_COUNT - 1;

  return (
    <div className="research-pipeline-connector">
      <svg
        className="research-pipeline-connector-line"
        viewBox="0 0 80 2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="1"
          x2="80"
          y2="1"
          stroke={isActive ? 'var(--text)' : 'var(--border)'}
          strokeWidth="1"
          strokeDasharray="4 3"
          style={{
            opacity: isActive ? 0.4 : 0.3,
          }}
        />
      </svg>
    </div>
  );
}

export function ResearchPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section className="research-pipeline-section" aria-label="Research pipeline">
      <h2 className="research-pipeline-heading">
        <em>Research pipeline</em>
      </h2>
      <p className="research-pipeline-intro">
        From initial hypothesis to published findings — our rigorous, step-by-step approach to producing high-quality quantitative research.
      </p>

      <motion.div
        ref={ref}
        className="research-pipeline-track"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stages.map((stage, index) => (
          <div key={stage.label} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={stageVariants}>
              <StageCircle stage={stage} index={index} />
            </motion.div>
            {index < stages.length - 1 && (
              <motion.div variants={stageVariants}>
                <Connector index={index} />
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
