'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgressNav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-nav" aria-hidden="true">
      <div
        className="scroll-progress-nav-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
