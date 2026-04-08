'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Join us', href: '#join' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = (href: string) => {
    onClose();
    // Small delay to let menu close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="mobile-menu-backdrop"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="mobile-menu-panel"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="mobile-menu-close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Logo */}
            <div className="mobile-menu-logo">
              Omega7 Capital
            </div>

            {/* Navigation Links */}
            <nav className="mobile-menu-nav">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="mobile-menu-link"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Email at bottom */}
            <div className="mobile-menu-email">
              <a href="mailto:adanegarab@gmail.com">adanegarab@gmail.com</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Hamburger trigger button with animated X transformation */
export function HamburgerButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="mobile-hamburger-btn"
    >
      <span className={`hamburger-line ${isOpen ? 'hamburger-line-1-active' : ''}`} />
      <span className={`hamburger-line ${isOpen ? 'hamburger-line-2-active' : ''}`} />
      <span className={`hamburger-line ${isOpen ? 'hamburger-line-3-active' : ''}`} />
    </button>
  );
}
