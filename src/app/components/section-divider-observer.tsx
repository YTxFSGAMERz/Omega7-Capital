'use client';

import { useEffect } from 'react';

/**
 * SectionDividerObserver
 *
 * Uses IntersectionObserver to detect when `.section-divider` elements
 * scroll into view, then adds the `.section-divider-visible` class to
 * trigger the CSS width-transition animation defined in globals.css.
 *
 * Renders null — place once in the page layout (inside <SiteShell>).
 */
export function SectionDividerObserver() {
  useEffect(() => {
    const dividers = document.querySelectorAll('.section-divider');

    if (dividers.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-divider-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    dividers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
