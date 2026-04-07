'use client';

import { useEffect, useRef } from 'react';

export default function LoadingSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade out and remove after mount
    const el = containerRef.current;
    if (!el) return;

    const fadeOut = () => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        el.remove();
      }, 300);
    };

    // Small delay to ensure hydration is complete
    const timer = setTimeout(fadeOut, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="loading-skeleton-root" aria-hidden="true">
      <div className="skeleton-nav" />
      <div className="skeleton-hero">
        <div className="skeleton-circle" />
        <div className="skeleton-line" style={{ width: '80%' }} />
        <div className="skeleton-line" style={{ width: '60%', animationDelay: '0.15s' }} />
        <div className="skeleton-line" style={{ width: '70%', animationDelay: '0.3s' }} />
        <div className="skeleton-btn" />
      </div>
    </div>
  );
}
