'use client';

import ScrollReveal from './scroll-reveal';
import { TiltCard } from './tilt-card';
import { AnimatedTextReveal } from './animated-text-reveal';

const members = [
  {
    initials: 'AN',
    name: 'Adane Garab',
    role: 'Founder & Lead Researcher',
    focus: 'Quantitative Portfolio Theory',
  },
  {
    initials: 'MK',
    name: 'Mohammed Khan',
    role: 'Core Contributor',
    focus: 'Stochastic Calculus & Derivatives',
  },
  {
    initials: 'SL',
    name: 'Sophie Laurent',
    role: 'Research Lead — Europe',
    focus: 'Algorithmic Trading Systems',
  },
  {
    initials: 'OO',
    name: 'Olumide Ogundimu',
    role: 'Research Lead — Africa',
    focus: 'Statistical Arbitrage',
  },
];

export default function TeamSection() {
  return (
    <section
      style={{ marginTop: '64px' }}
      aria-label="Our team"
    >
      <ScrollReveal>
        <AnimatedTextReveal text="The collective" tag="h2" className="team-heading" />
        <p className="team-intro">
          A distributed network of exceptional researchers, united by intellectual ambition and a commitment to rigour.
        </p>
      </ScrollReveal>

      <div className="team-grid">
        {members.map((member, index) => (
          <ScrollReveal key={index} delay={index * 0.08}>
            <article className="team-card">
              <TiltCard>
                <div className="team-avatar">
                  <span className="team-initials">{member.initials}</span>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-focus">{member.focus}</p>
                </div>
              </TiltCard>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
