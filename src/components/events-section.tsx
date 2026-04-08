'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './scroll-reveal';
import { AnimatedTextReveal } from './animated-text-reveal';

interface EventItem {
  month: string;
  day: string;
  year: string;
  title: string;
  description: string;
  tag: string;
}

const events: EventItem[] = [
  {
    month: 'Jun',
    day: '15',
    year: '2025',
    title: 'Quantitative Risk Models',
    description:
      'Guest lecture by Dr. Sarah Chen (MIT) on modern approaches to measuring and managing risk in quantitative portfolios.',
    tag: 'Guest Lecture',
  },
  {
    month: 'Jul',
    day: '03',
    year: '2025',
    title: 'Stochastic Calculus Workshop',
    description:
      'Interactive workshop on Ito\'s Lemma applications — from theory to implementation in derivative pricing models.',
    tag: 'Workshop',
  },
  {
    month: 'Jul',
    day: '22',
    year: '2025',
    title: 'Research Symposium: Market Microstructure',
    description:
      'Annual research symposium featuring 4 speakers presenting cutting-edge work on order flow, liquidity, and price discovery.',
    tag: 'Symposium',
  },
  {
    month: 'Aug',
    day: '08',
    year: '2025',
    title: 'Reading Group: Option Pricing Theory',
    description:
      'Weekly deep-dive into Black-Scholes and beyond — exploring extensions, limitations, and modern alternatives.',
    tag: 'Reading Group',
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

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function EventsSection() {
  return (
    <section className="events-section" aria-label="Upcoming events">
      <ScrollReveal>
        <div style={{ marginBottom: '32px' }}>
          <AnimatedTextReveal text="Upcoming events" tag="h2" className="events-section-heading" />
          <p className="events-section-intro">
            Seminars, workshops, and research gatherings — open to all members of the collective.
          </p>
        </div>
      </ScrollReveal>

      <motion.div
        className="events-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {events.map((event, index) => (
          <motion.article
            key={index}
            className="event-item"
            variants={itemVariants}
          >
            <div className="event-date-block">
              <span className="event-date-month">{event.month}</span>
              <span className="event-date-day">{event.day}</span>
              <span className="event-tag">{event.tag}</span>
            </div>
            <div className="event-content">
              <div className="event-content-header">
                <h3 className="event-title">{event.title}</h3>
                <span className="event-year">{event.year}</span>
              </div>
              <p className="event-description">{event.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <ScrollReveal delay={0.3}>
        <button className="event-view-all" type="button">
          View all events
        </button>
      </ScrollReveal>
    </section>
  );
}

export default EventsSection;
