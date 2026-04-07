'use client';

import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';

const areas = [
  {
    title: 'Quantitative Research',
    description:
      'Rigorous mathematical modeling and statistical analysis of financial markets, developing predictive frameworks grounded in theory.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
  },
  {
    title: 'Mathematical Finance',
    description:
      'Stochastic calculus, derivative pricing, and risk theory — bridging pure mathematics with practical financial engineering.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Algorithmic Trading',
    description:
      'Systematic strategy development, backtesting frameworks, and execution systems — combining research with disciplined implementation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Learning',
    description:
      'Seminars, reading groups, and peer-led workshops — an environment where rigorous intellectual exchange drives collective advancement.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ResearchAreas() {
  return (
    <section
      style={{
        marginTop: '64px',
      }}
      aria-label="Research focus areas"
    >
      <ScrollReveal>
        <AnimatedTextReveal text="Research focus areas" tag="h2" className="research-areas-heading" />
      </ScrollReveal>

      <div className="research-grid">
        {areas.map((area, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <TiltCard className="research-card">
              <div className="research-card-icon">{area.icon}</div>
              <h3 className="research-card-title">{area.title}</h3>
              <p className="research-card-description">{area.description}</p>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
