'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Globe2,
  Users,
  FileText,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatMetric {
  icon: LucideIcon;
  value: number;
  displayPrefix: string;
  displaySuffix: string;
  label: string;
}

const metrics: StatMetric[] = [
  { icon: GraduationCap, value: 8, displayPrefix: '', displaySuffix: '', label: 'University Partners' },
  { icon: Globe2, value: 4, displayPrefix: '', displaySuffix: '', label: 'Continents Covered' },
  { icon: Users, value: 15, displayPrefix: '', displaySuffix: '+', label: 'Active Researchers' },
  { icon: FileText, value: 25, displayPrefix: '', displaySuffix: '+', label: 'Research Papers Published' },
  { icon: TrendingUp, value: 2, displayPrefix: '$', displaySuffix: 'M+', label: 'Capital Deployed' },
  { icon: BarChart3, value: 3, displayPrefix: '', displaySuffix: '', label: 'Active Funds' },
];

function useCountUp(
  target: number,
  shouldStart: boolean,
  duration: number,
): string {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!shouldStart) return;

    const startTime = performance.now();
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    let frameId: number;

    const step = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);

      setDisplay(String(current));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, shouldStart, duration]);

  return display;
}

interface StatCardProps {
  metric: StatMetric;
  index: number;
}

function StatCard({ metric, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      setIsInView(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const Icon = metric.icon;
  const animatedValue = useCountUp(metric.value, isInView, 1800);
  const displayText = metric.displayPrefix + animatedValue + metric.displaySuffix;

  return (
    <motion.div
      ref={ref}
      className="stat-highlight-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Icon className="stat-highlight-icon" size={20} strokeWidth={1.5} />
      <span className="stat-highlight-value">{displayText}</span>
      <span className="stat-highlight-label">{metric.label}</span>
      <span className="stat-highlight-line" />
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function StatsHighlights() {
  return (
    <section
      className="stats-highlights-section"
      aria-label="Key performance metrics"
    >
      <h2 className="stats-highlights-heading">By the Numbers</h2>
      <motion.div
        className="stats-highlights-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {metrics.map((metric, index) => (
          <StatCard key={metric.label} metric={metric} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
