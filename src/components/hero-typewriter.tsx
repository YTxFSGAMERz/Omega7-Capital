'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const taglines = [
  'Quantitative Finance Research Collective',
  'Rigour. Precision. Curiosity.',
  'Advancing Knowledge Through Inquiry',
  'Where Mathematics Meets Finance',
];

const TYPING_SPEED = 45;
const DELETING_SPEED = 28;
const PAUSE_AFTER_TYPING = 2200;
const PAUSE_AFTER_DELETING = 400;

export default function HeroTypewriter() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentFull = taglines[taglineIndex];

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentFull.length) {
        setDisplayText(currentFull.slice(0, displayText.length + 1));
      } else {
        // Pause then start deleting
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
        return;
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(currentFull.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      }
    }
  }, [displayText, taglineIndex, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <div className="hero-typewriter" aria-label={taglines[taglineIndex]}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayText}
          className="hero-typewriter-text"
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      <span className="hero-typewriter-cursor" aria-hidden="true">
        |
      </span>
    </div>
  );
}
