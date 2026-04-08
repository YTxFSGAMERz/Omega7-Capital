'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useIsMounted() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

// startViewTransition is now standard in modern browser types, 
// if not, we cast to any at point of use to avoid conflicting declarations.

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const [tick, setTick] = useState(0);
  const prevThemeRef = useRef(resolvedTheme);

  useEffect(() => {
    if (prevThemeRef.current !== resolvedTheme) {
      prevThemeRef.current = resolvedTheme;
      requestAnimationFrame(() => setTick((t) => t + 1));
    }
  }, [resolvedTheme]);

  // Suppress hydration warning by using the tick to force re-render
  const _ = tick;
  void _;

  const toggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const isDark = resolvedTheme === 'dark';
      const newTheme = isDark ? 'light' : 'dark';

      // Calculate click position relative to viewport for the circle origin
      const x = e.clientX;
      const y = e.clientY;

      // Calculate max distance from click to any corner (to ensure circle covers entire viewport)
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Use View Transitions API if available
      if (document.startViewTransition) {
        // Set CSS custom properties for the circle origin
        document.documentElement.style.setProperty('--theme-x', `${x}px`);
        document.documentElement.style.setProperty('--theme-y', `${y}px`);
        document.documentElement.style.setProperty('--theme-radius', `${maxRadius}px`);

        const transition = document.startViewTransition(() => {
          document.documentElement.classList.toggle('dark', !isDark);
        });

        // Clean up custom properties after transition
        transition.finished.then(() => {
          document.documentElement.style.removeProperty('--theme-x');
          document.documentElement.style.removeProperty('--theme-y');
          document.documentElement.style.removeProperty('--theme-radius');
        });
      } else {
        // Fallback: instant toggle without animation
        setTheme(newTheme);
      }
    },
    [resolvedTheme, setTheme]
  );

  if (!mounted.current) {
    return (
      <button
        className="theme-toggle-btn"
        aria-label="Toggle theme"
        style={{ opacity: 0 }}
      >
        <span className="theme-toggle-icon">☾</span>
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="theme-toggle-icon"
        >
          {isDark ? '☀' : '☾'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
