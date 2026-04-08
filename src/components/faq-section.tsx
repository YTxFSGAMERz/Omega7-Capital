'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: 'What is Omega7 Capital?',
    answer:
      'Omega7 Capital is an international quantitative finance research collective that brings together exceptional students from universities across Europe, Africa, Asia, and beyond. We are united by a shared commitment to advancing knowledge in quantitative and mathematical finance through rigorous scientific inquiry.',
  },
  {
    question: 'Who can apply for membership?',
    answer:
      'We welcome applications from students who demonstrate strong technical ability in mathematics, statistics, or related quantitative disciplines. Candidates are selected on the basis of demonstrated technical competence, intellectual curiosity, and a genuine willingness to contribute to the collective\'s research mission.',
  },
  {
    question: 'What does membership involve?',
    answer:
      'Members participate in regular seminars, reading groups, and collaborative working sessions that form the backbone of our intellectual life. We study foundational texts of quantitative finance, engage with current literature, and translate theory into practice through rigorous, well-documented research projects.',
  },
  {
    question: 'How is Omega7 Capital different from other VC firms?',
    answer:
      'Unlike traditional venture capital firms, Omega7 Capital is fundamentally a research collective with deep roots in academic rigor and quantitative methodology. Our primary focus is on producing high-quality research that meets the standards of the broader academic and scientific community, rather than on commercial deal-making.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        marginTop: '64px',
      }}
      aria-label="Frequently asked questions"
    >
      <h2
        style={{
          fontSize: '19px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '28px',
        }}
      >
        <em>Frequently asked questions</em>
      </h2>

      <div
        style={{
          borderTop: '1px solid var(--border)',
        }}
      >
        {faqs.map((faq, index) => (
          <div key={index}>
            {/* Question Button */}
            <button
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                padding: '18px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  fontFamily: 'var(--font-crimson-pro)',
                  lineHeight: 1.4,
                }}
              >
                {faq.question}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--muted)',
                  flexShrink: 0,
                  transition: 'transform 0.25s ease',
                  transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                  marginTop: '-2px',
                }}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontSize: '17px',
                      fontWeight: 300,
                      color: 'var(--text)',
                      lineHeight: 1.65,
                      padding: '0 0 18px 0',
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
