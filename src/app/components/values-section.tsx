'use client';

import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';

const values = [
  {
    number: '01',
    title: 'Rigour',
    description:
      'We hold ourselves to the highest standards of intellectual honesty. Every claim is tested, every assumption questioned.',
  },
  {
    number: '02',
    title: 'Precision',
    description:
      'In quantitative finance, approximation is the enemy. We pursue exactness in our models, our code, and our communication.',
  },
  {
    number: '03',
    title: 'Curiosity',
    description:
      'The best research begins with genuine wonder. We cultivate the habit of asking why — and following the answer wherever it leads.',
  },
];

export default function ValuesSection() {
  return (
    <section id="values" aria-label="Core values" style={{ marginTop: '64px' }}>
      <ScrollReveal>
        <AnimatedTextReveal text="Core values" tag="h2" className="values-heading" />
      </ScrollReveal>

      <div className="values-grid">
        {values.map((value, index) => (
          <ScrollReveal key={value.number} delay={index * 0.12}>
            <div className="values-card">
              <TiltCard>
                <span className="values-number">{value.number}</span>
                <h3 className="values-title">{value.title}</h3>
                <p className="values-description">{value.description}</p>
              </TiltCard>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
