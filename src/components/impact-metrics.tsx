'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Globe, Users, FileText, type LucideIcon } from 'lucide-react';

interface Metric {
  icon: LucideIcon;
  value: string;
  numericValue: number;
  label: string;
  fillPercent: number;
}

const metrics: Metric[] = [
  {
    icon: GraduationCap,
    value: '8',
    numericValue: 8,
    label: 'University Partners',
    fillPercent: 0.8,
  },
  {
    icon: Globe,
    value: '4',
    numericValue: 4,
    label: 'Continents',
    fillPercent: 0.67,
  },
  {
    icon: Users,
    value: '15+',
    numericValue: 15,
    label: 'Active Researchers',
    fillPercent: 0.75,
  },
  {
    icon: FileText,
    value: '6',
    numericValue: 6,
    label: 'Research Papers',
    fillPercent: 0.6,
  },
];

const RING_RADIUS = 48;
const RING_STROKE = 3;
const RING_SIZE = (RING_RADIUS + RING_STROKE) * 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

function useCounter(target: number, shouldStart: boolean): string {
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const duration = 1800;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);

      setDisplay(current.toLocaleString());

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [shouldStart, target]);

  return display;
}


function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const counterValue = useCounter(metric.numericValue, isInView);
  const Icon = metric.icon;

  const dashOffset = RING_CIRCUMFERENCE * (1 - metric.fillPercent);

  return (
    <motion.div
      ref={ref}
      className="impact-metric-card"
      variants={cardVariants}
    >
      <div className="impact-metric-ring">
        <svg
          className="impact-metric-ring-svg"
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          aria-hidden="true"
        >
          <circle
            className="impact-metric-ring-bg"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            strokeWidth={RING_STROKE}
          />
          <motion.circle
            className="impact-metric-ring-fill"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
            animate={isInView ? { strokeDashoffset: dashOffset } : { strokeDashoffset: RING_CIRCUMFERENCE }}
            transition={{
              duration: 1.4,
              delay: index * 0.15 + 0.2,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>
        <div className="impact-metric-value-wrapper">
          <span className="impact-metric-value">
            {counterValue}
            {metric.value.includes('+') ? '+' : ''}
          </span>
          <Icon className="impact-metric-icon" size={16} />
        </div>
      </div>
      <span className="impact-metric-label">{metric.label}</span>
    </motion.div>
  );
}

export function ImpactMetrics() {
  return (
    <section className="impact-metrics-section" aria-label="Impact metrics">
      <div className="impact-metrics-header">
        <h2 className="impact-metrics-heading">
          <em>Our impact</em>
        </h2>
        <p className="impact-metrics-intro">
          Measurable contributions across borders and disciplines.
        </p>
      </div>

      <motion.div
        className="impact-metrics-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
