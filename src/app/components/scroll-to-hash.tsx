'use client';

import { useEffect } from 'react';

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const delay = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(delay);
    }
  }, []);

  return null;
}
