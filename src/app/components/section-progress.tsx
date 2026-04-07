'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionDef {
  name: string;
  selector: string;
}

/**
 * Ordered list of all major page sections with their DOM selectors.
 * The index + 1 is displayed as the section number (01, 02, …).
 * Selectors reference section class names / IDs defined by each component.
 */
const SECTIONS: SectionDef[] = [
  { name: 'About', selector: '#about' },
  { name: 'Core Values', selector: '.values-grid' },
  { name: 'Philosophy', selector: '.philosophy-section' },
  { name: 'Statistics', selector: 'section[aria-label="Key statistics"]' },
  { name: 'Methodology', selector: '.methodology-timeline' },
  { name: 'Research Pipeline', selector: '.research-pipeline-section' },
  { name: 'How We Work', selector: '.how-we-work-section' },
  { name: 'Team', selector: '.team-grid' },
  { name: 'Research Areas', selector: '#research' },
  { name: 'Disciplines', selector: '.disciplines-section' },
  { name: 'Funding', selector: '.funding-categories-section' },
  { name: 'Research Insights', selector: '.research-insights-section' },
  { name: 'Resources', selector: '.resources-section' },
  { name: 'Publications', selector: '.publications-intro' },
  { name: 'Network', selector: '.network-map-section' },
  { name: 'Investment Thesis', selector: '.thesis-section' },
  { name: 'Awards', selector: '.awards-section' },
  { name: 'Portfolio', selector: '.portfolio-section' },
  { name: 'Partners', selector: '.partners-section' },
  { name: 'Events', selector: '.events-section' },
  { name: 'Activity', selector: '.activity-feed-section' },
  { name: 'Testimonials', selector: '.testimonial-container' },
  { name: 'Social Proof', selector: '.social-proof-section' },
  { name: 'FAQ', selector: '#faq' },
  { name: 'Newsletter', selector: '.newsletter-form' },
  { name: 'Join', selector: '#join' },
  { name: 'Contact', selector: '.contact-form' },
  { name: 'Careers', selector: '.career-section' },
];

const SCROLL_THRESHOLD = 500;

function subscribeToDesktop(callback: () => void) {
  const mql = window.matchMedia('(hover: hover)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  return window.matchMedia('(hover: hover)').matches;
}

function getServerSnapshot() {
  return false;
}

export function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );
  const observerMapRef = useRef<Map<Element, number>>(new Map());

  // ── Scroll visibility (show after 500 px) ─────────────────────────
  useEffect(() => {
    if (!isDesktop) return;

    function onScroll() {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    onScroll(); // check immediately
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  // ── IntersectionObserver — track which section is in view ──────────
  const setupObserver = useCallback(() => {
    // Disconnect all existing observers
    observerMapRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry most in view (highest intersectionRatio or first intersecting)
        for (const entry of entries) {
          const idx = observerMapRef.current.get(entry.target);
          if (idx !== undefined && entry.isIntersecting) {
            setActiveIndex(idx);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    );

    SECTIONS.forEach((section, idx) => {
      const el = document.querySelector(section.selector);
      if (el) {
        observer.observe(el);
        observerMapRef.current.set(el, idx);
      }
    });

    return observer;
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const observer = setupObserver();
    return () => observer.disconnect();
  }, [isDesktop, setupObserver]);

  // ── Don't render on touch devices ──────────────────────────────────
  if (!isDesktop) return null;

  const total = SECTIONS.length;
  const current = SECTIONS[activeIndex];
  const sectionNumber = String(activeIndex + 1).padStart(2, '0');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="section-progress visible"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`Section ${sectionNumber} of ${total}: ${current.name}`}
        >
          <div className="section-progress-inner">
            <span className="section-progress-number">{sectionNumber}</span>
            <span className="section-progress-divider" aria-hidden="true" />
            <span className="section-progress-name" key={current.name}>
              {current.name}
            </span>
          </div>
          <span className="section-progress-fraction" aria-hidden="true">
            {activeIndex + 1} / {total}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
