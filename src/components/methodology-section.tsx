'use client';

import ScrollReveal from './scroll-reveal';
import { AnimatedTextReveal } from './animated-text-reveal';

const steps = [
  {
    number: '01',
    title: 'Rigorous Selection',
    description:
      'Members are selected on demonstrated technical ability, intellectual curiosity, and a genuine willingness to contribute — not pedigree or connections.',
  },
  {
    number: '02',
    title: 'Foundational Study',
    description:
      'We study the foundational texts of quantitative finance — from stochastic calculus to modern portfolio theory — building deep, durable understanding.',
  },
  {
    number: '03',
    title: 'Collaborative Research',
    description:
      'Seminars, reading groups, and working sessions form the backbone of our intellectual life. Every output is held to the highest standards of precision.',
  },
  {
    number: '04',
    title: 'Rigorous Output',
    description:
      'Results are documented with academic thoroughness and shared within the collective. Quality is never compromised for speed or appearance.',
  },
];

export default function MethodologySection() {
  return (
    <section
      id="methodology"
      style={{ marginTop: '64px' }}
      aria-label="Our methodology"
    >
      <ScrollReveal>
        <AnimatedTextReveal text="Our methodology" tag="h2" className="methodology-heading" />
      </ScrollReveal>

      <div className="methodology-timeline">
        {steps.map((step, index) => (
          <ScrollReveal key={index} delay={index * 0.12}>
            <div className="methodology-step">
              <div className="methodology-line-container">
                <div className="methodology-dot" />
                {index < steps.length - 1 && <div className="methodology-line" />}
              </div>
              <div className="methodology-content">
                <span className="methodology-number">{step.number}</span>
                <h3 className="methodology-title">{step.title}</h3>
                <p className="methodology-description">{step.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
