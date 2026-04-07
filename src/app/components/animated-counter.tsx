'use client';

import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | string;
  label: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function useCounterAnimation(
  shouldStart: boolean,
  targetValue: number,
  duration: number,
  prefix: string,
  suffix: string
): string {
  const counterRef = useRef<HTMLDivElement>(null);
  const displayValueRef = useRef(prefix + '0' + suffix);

  // Track the current display value via an external store
  const getSnapshot = useCallback(() => displayValueRef.current, []);
  const getServerSnapshot = useCallback(() => prefix + '0' + suffix, [prefix, suffix]);
  const subscribe = useCallback((callback: () => void) => {
    // Return an unsubscribe function
    const originalRef = displayValueRef;
    return () => {
      // No-op: the subscription is driven by the animation loop
      void originalRef;
      void callback;
    };
  }, []);

  const displayValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    if (isNaN(targetValue)) {
      displayValueRef.current = String(targetValue);
      return;
    }

    const startTime = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * targetValue);

      displayValueRef.current = prefix + currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [shouldStart, targetValue, duration, prefix, suffix]);

  return displayValue;
}

export default function AnimatedCounter({
  value,
  label,
  duration = 1800,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const targetNum = typeof value === 'number' ? value : parseInt(value, 10);
  const displayValue = useCounterAnimation(isInView, targetNum, duration, prefix, suffix);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span
        style={{
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--text)',
          letterSpacing: '0.02em',
          fontFamily: 'var(--font-crimson-pro)',
          transition: 'color 0.3s ease',
          minWidth: '60px',
          textAlign: 'center',
        }}
      >
        {displayValue}
      </span>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}
