'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

function useIsMounted() {
  const mountedRef = require('react').useRef(false);
  require('react').useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);
  return mountedRef;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const [tick, setTick] = useState(0);
  const prevThemeRef = require('react').useRef(resolvedTheme);

  require('react').useEffect(() => {
    if (prevThemeRef.current !== resolvedTheme) {
      prevThemeRef.current = resolvedTheme;
      requestAnimationFrame(() => setTick((t: number) => t + 1));
    }
  }, [resolvedTheme]);

  const _ = tick;
  void _;

  const toggleTheme = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = resolvedTheme === 'dark';
    const x = e.clientX;
    const y = e.clientY;

    if (document.startViewTransition) {
      document.documentElement.style.setProperty('--theme-x', `${x}px`);
      document.documentElement.style.setProperty('--theme-y', `${y}px`);
      document.documentElement.style.setProperty('--theme-radius', '120%');
      
      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark', !isDark);
      });
      
      transition.finished.then(() => {
        document.documentElement.style.removeProperty('--theme-x');
        document.documentElement.style.removeProperty('--theme-y');
        document.documentElement.style.removeProperty('--theme-radius');
      });
    } else {
      setTheme(isDark ? 'light' : 'dark');
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted.current) {
    return (
      <button className="theme-toggle-btn" aria-label="Toggle theme" style={{ opacity: 0 }}>
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
