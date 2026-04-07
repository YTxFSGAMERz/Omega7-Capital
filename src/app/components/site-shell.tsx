'use client';

import { useState, useEffect } from 'react';
import MobileMenu, { HamburgerButton } from '@/components/mobile-menu';
import ScrollToTop from '@/components/scroll-to-top';
import CookieConsent from '@/components/cookie-consent';
import CommandPalette from '@/components/command-palette';
import ScrollProgressNav from '@/components/scroll-progress-nav';
import ReadingProgressBar from '@/components/reading-progress-bar';
import ThemeToggle from '@/components/theme-toggle';

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'faq', label: 'FAQ' },
  { id: 'join', label: 'Join us' },
];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  // Intersection observer for active nav highlighting
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Nav shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgressNav />
      <ReadingProgressBar />

      <nav
        className={`site-nav ${navScrolled ? 'site-nav-scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="/" className="site-nav-logo" aria-label="Omega7 Capital — Home">
          Omega7 Capital
          <kbd className="nav-cmd-k">⌘K</kbd>
        </a>
        <ul className="site-nav-links">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={activeSection === section.id ? 'active' : ''}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-right">
          <ThemeToggle />
          <HamburgerButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            isOpen={mobileMenuOpen}
          />
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CommandPalette />

      {children}

      <ScrollToTop />
      <CookieConsent />
    </>
  );
}
