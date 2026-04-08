'use client';

import { motion } from 'framer-motion';

const partners = [
  {
    name: 'MIT',
    fullName: 'Massachusetts Institute of Technology',
  },
  {
    name: 'ETH Zurich',
    fullName: 'ETH Zürich',
  },
  {
    name: 'Imperial College London',
    fullName: 'Imperial College London',
  },
  {
    name: 'University of Lagos',
    fullName: 'University of Lagos',
  },
  {
    name: 'Tsinghua University',
    fullName: 'Tsinghua University',
  },
  {
    name: 'University of Cape Town',
    fullName: 'University of Cape Town',
  },
  {
    name: 'IIT Bombay',
    fullName: 'Indian Institute of Technology Bombay',
  },
  {
    name: 'Sorbonne University',
    fullName: 'Sorbonne University',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
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

export function PartnersSection() {
  return (
    <motion.section
      className="partners-section"
      aria-label="Academic partners"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      <motion.div variants={headerVariants}>
        <h2 className="partners-heading">
          <em>Academic partners</em>
        </h2>
        <p className="partners-intro">
          Our research network spans leading institutions across four continents,
          fostering cross-disciplinary collaboration and advancing the frontiers
          of quantitative finance through rigorous academic inquiry.
        </p>
      </motion.div>

      <motion.div className="partners-grid" variants={containerVariants}>
        {partners.map((partner) => (
          <motion.article
            key={partner.name}
            className="partner-card"
            variants={cardVariants}
          >
            <h3 className="partner-name">{partner.name}</h3>
            <p className="partner-full-name">{partner.fullName}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default PartnersSection;
