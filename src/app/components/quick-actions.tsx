'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Bell } from 'lucide-react';

const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd1mtbzN7T2-OlGWXmWPss4AsIl2jfSq2o9HdXs3qRH9PWRKA/viewform';

export function QuickActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToJoin = useCallback(() => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToNewsletter = useCallback(() => {
    document.querySelector('.newsletter-form')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="quick-actions visible"
          role="toolbar"
          aria-label="Quick actions"
        >
          <div className="quick-actions-inner">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-btn"
              aria-label="Apply Now"
            >
              <UserPlus className="quick-action-btn-icon" />
              <span className="quick-action-btn-label" data-label="Apply Now" />
            </a>

            <button
              onClick={scrollToJoin}
              className="quick-action-btn"
              aria-label="Contact Us"
              type="button"
            >
              <Mail className="quick-action-btn-icon" />
              <span className="quick-action-btn-label" data-label="Contact Us" />
            </button>

            <button
              onClick={scrollToNewsletter}
              className="quick-action-btn"
              aria-label="Newsletter"
              type="button"
            >
              <Bell className="quick-action-btn-icon" />
              <span className="quick-action-btn-label" data-label="Newsletter" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuickActions;
