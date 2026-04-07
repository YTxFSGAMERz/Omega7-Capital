'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Milestone {
  date: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    date: 'Q1 2024',
    title: 'Founding',
    description: 'Omega7 Capital established as a research collective',
  },
  {
    date: 'Summer 2024',
    title: 'First Cohort',
    description: 'Initial team of researchers selected across 5 universities',
  },
  {
    date: 'Fall 2024',
    title: 'Research Launch',
    description: 'First working papers published in quantitative finance',
  },
  {
    date: 'Q1 2025',
    title: 'Expansion',
    description: 'Network grows to 12 partner institutions worldwide',
  },
  {
    date: 'Summer 2025',
    title: 'Seminar Series',
    description: 'Weekly research seminars and reading groups established',
  },
  {
    date: 'Fall 2025',
    title: 'Collaboration',
    description: 'Cross-institutional research projects initiated',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProgramsTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 260;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="programs-timeline-section" aria-label="Programs and Milestones">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <div className="programs-timeline-scroll" ref={scrollRef}>
          <div className="programs-timeline-track">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.date}
                className="programs-milestone"
                variants={itemVariants}
              >
                <div className="programs-milestone-dot" />
                <div className="programs-milestone-line" />
                <div className="programs-milestone-date">{milestone.date}</div>
                <div className="programs-milestone-title">{milestone.title}</div>
                <div className="programs-milestone-desc">{milestone.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="programs-timeline-nav">
          <button
            className="programs-timeline-arrow"
            onClick={() => scroll('left')}
            aria-label="Scroll milestones left"
            type="button"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="programs-timeline-arrow"
            onClick={() => scroll('right')}
            aria-label="Scroll milestones right"
            type="button"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
