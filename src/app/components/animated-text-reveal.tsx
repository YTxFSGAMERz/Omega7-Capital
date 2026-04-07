'use client';

import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  splitBy?: 'word' | 'char';
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.06,
      delayChildren: delay,
    },
  }),
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const MotionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

export function AnimatedTextReveal({
  text,
  className,
  tag: Tag = 'h2',
  delay = 0,
  splitBy = 'word',
}: AnimatedTextRevealProps) {
  const MotionTag = MotionTags[Tag];

  const segments = useMemo(() => {
    if (splitBy === 'char') {
      return text.split('');
    }
    return text.split(/(\s+)/);
  }, [text, splitBy]);

  const itemClass =
    splitBy === 'char'
      ? 'animated-text-reveal-char'
      : 'animated-text-reveal-word';

  return (
    <MotionTag
      className={`animated-text-reveal${className ? ` ${className}` : ''}`}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px' }}
      aria-label={text}
    >
      {segments.map((segment, i) => {
        if (splitBy === 'word' && /^\s+$/.test(segment)) {
          return (
            <span key={`space-${i}`} style={{ display: 'inline' }}>
              &nbsp;
            </span>
          );
        }

        return (
          <motion.span
            key={`${segment}-${i}`}
            className={itemClass}
            variants={itemVariants}
            style={{ display: 'inline-block' }}
          >
            {segment}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
