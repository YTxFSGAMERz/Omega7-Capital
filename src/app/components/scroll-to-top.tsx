'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setVisible(scrollTop > 400);
      setProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle parameters
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Scroll to top"
          className="scroll-to-top-btn"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="scroll-to-top-svg"
          >
            {/* Background circle */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            {/* Progress circle */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="var(--text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 20 20)"
              className="scroll-to-top-progress"
              style={{ transition: 'stroke-dashoffset 0.15s ease' }}
            />
          </svg>
          {/* Arrow icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-to-top-arrow"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
