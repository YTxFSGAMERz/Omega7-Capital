'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';

const principles = [
  {
    number: 'I',
    title: 'Depth over breadth',
    description:
      'We believe in going deep rather than wide. A single well-executed research project is worth more than a dozen superficial explorations. Our members commit to understanding the foundations before reaching for applications.',
  },
  {
    number: 'II',
    title: 'Open inquiry',
    description:
      'Knowledge grows through honest exchange. We encourage questioning assumptions, challenging ideas constructively, and engaging with perspectives that push our thinking forward.',
  },
  {
    number: 'III',
    title: 'Collective rigour',
    description:
      'Every piece of work produced under the Omega7 name is held to the highest standards. Peer review, replication, and accountability are not afterthoughts — they are the process.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PhilosophySection() {
  return (
    <ScrollReveal>
      <section id="philosophy" className="philosophy-section" aria-label="Our philosophy">
        <div className="philosophy-header">
          <AnimatedTextReveal text="Our philosophy" tag="h2" className="philosophy-heading" />
          <p className="philosophy-intro">
            Three principles that shape everything we do.
          </p>
        </div>

        <motion.div
          className="philosophy-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {principles.map((principle) => (
            <motion.article
              key={principle.number}
              className="philosophy-card"
              variants={itemVariants}
            >
              <TiltCard>
                <span className="philosophy-number">{principle.number}</span>
                <h3 className="philosophy-title">{principle.title}</h3>
                <p className="philosophy-description">{principle.description}</p>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
