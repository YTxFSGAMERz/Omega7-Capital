'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './scroll-reveal';

const testimonials = [
  {
    quote:
      'Omega7 fundamentally changed how I think about finance. The rigour of the research environment and the quality of intellectual discourse here are unlike anything I\'ve experienced in a student organisation.',
    author: 'Research Member',
    location: 'Mathematics, University of Edinburgh',
  },
  {
    quote:
      'What sets Omega7 apart is the uncompromising standard. Every piece of work is held to the same benchmark of precision and clarity. That culture of excellence shapes everything we do.',
    author: 'Core Contributor',
    location: 'Quantitative Finance, ETH Zürich',
  },
  {
    quote:
      'The collaborative seminars and reading groups created a space where I could challenge my assumptions and develop a deeper understanding of mathematical finance. It was genuinely transformative.',
    author: 'Research Member',
    location: 'Statistics, University of Lagos',
  },
];

const AUTO_ROTATE_INTERVAL = 6000;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((prev) => {
      const next = ((index % testimonials.length) + testimonials.length) % testimonials.length;
      return next;
    });
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goNext();
        setIsPaused(true);
      } else if (e.key === 'ArrowLeft') {
        goPrev();
        setIsPaused(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      style={{ marginTop: '64px' }}
      aria-label="Member testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollReveal>
        <h2 style={{ fontSize: '19px', fontWeight: 400, color: 'var(--text)', marginBottom: '32px' }}>
          <em>From our members</em>
        </h2>
      </ScrollReveal>

      <div className="testimonial-container">
        {/* Quote navigation dots + progress bar */}
        <div className="testimonial-nav">
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => { goTo(index); setIsPaused(true); }}
                className={`testimonial-dot ${activeIndex === index ? 'active' : ''}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="testimonial-progress">
            <motion.div
              className="testimonial-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPaused ? 0 : 1 }}
              transition={
                isPaused
                  ? { duration: 0.2 }
                  : { duration: AUTO_ROTATE_INTERVAL / 1000, ease: 'linear' }
              }
              key={`${activeIndex}-${isPaused}`}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="testimonial-quote"
          >
            <div className="testimonial-mark">&ldquo;</div>
            <p className="testimonial-text">{testimonials[activeIndex].quote}</p>
            <footer className="testimonial-author">
              <span className="testimonial-name">{testimonials[activeIndex].author}</span>
              <span className="testimonial-location">{testimonials[activeIndex].location}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {/* Arrow buttons */}
        <div className="testimonial-arrows">
          <button
            onClick={() => { goPrev(); setIsPaused(true); }}
            className="testimonial-arrow-btn"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => { goNext(); setIsPaused(true); }}
            className="testimonial-arrow-btn"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
