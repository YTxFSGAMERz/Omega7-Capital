'use client';

import AnimatedCounter from './animated-counter';
import ScrollReveal from './scroll-reveal';

const stats = [
  { value: 2024, label: 'Founded', prefix: '', suffix: '' },
  { value: 5, label: 'Core Services', prefix: '', suffix: '' },
  { value: 'Global', label: 'Research Network', prefix: '', suffix: '' },
];

export default function StatsCounter() {
  return (
    <ScrollReveal>
      <section
        id="stats"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
          padding: '40px 0',
        }}
        aria-label="Key statistics"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
