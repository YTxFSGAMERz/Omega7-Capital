'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'omega7_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // Small delay to avoid flash on initial load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="cookie-consent-banner"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="cookie-consent-text">
            We use cookies to improve your experience. By continuing to use this site, you agree to our privacy policy.
          </p>

          <button
            onClick={accept}
            className="cookie-consent-button"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
