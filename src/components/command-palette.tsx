'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', description: 'Learn about Omega7 Capital and our mission' },
  { id: 'research', label: 'Research', description: 'Explore our research focus areas' },
  { id: 'faq', label: 'FAQ', description: 'Frequently asked questions' },
  { id: 'join', label: 'Join Us', description: 'Apply for membership' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = NAV_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
        return;
      }

      if (!open) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        setQuery('');
        setSelectedIndex(0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = query
          ? (selectedIndex + 1) % filtered.length
          : (selectedIndex + 1) % NAV_ITEMS.length;
        setSelectedIndex(nextIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = query
          ? (selectedIndex - 1 + filtered.length) % filtered.length
          : (selectedIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
        setSelectedIndex(prevIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const items = query ? filtered : NAV_ITEMS;
        if (items[selectedIndex]) {
          navigate(items[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, query, filtered, selectedIndex, navigate]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="cmd-backdrop"
            onClick={() => {
              setOpen(false);
              setQuery('');
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="cmd-panel"
            role="dialog"
            aria-label="Quick navigation"
            aria-modal="true"
          >
            {/* Search input */}
            <div className="cmd-search-wrapper">
              <Search size={16} strokeWidth={1.5} className="cmd-search-icon" />
              <input
                type="text"
                className="cmd-search-input"
                placeholder="Navigate to..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                aria-label="Search sections"
              />
              <kbd className="cmd-kbd">ESC</kbd>
            </div>

            {/* Results */}
            <div className="cmd-results">
              {filtered.length === 0 ? (
                <div className="cmd-empty">No results found</div>
              ) : (
                filtered.map((item, index) => (
                  <button
                    key={item.id}
                    className={`cmd-result-item ${index === selectedIndex ? 'cmd-result-active' : ''}`}
                    onClick={() => navigate(item.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="cmd-result-label">{item.label}</span>
                    <span className="cmd-result-desc">{item.description}</span>
                    <ArrowRight size={14} strokeWidth={1.5} className="cmd-result-arrow" />
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="cmd-footer">
              <span>
                <kbd className="cmd-kbd-sm">↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="cmd-kbd-sm">↵</kbd> select
              </span>
              <span>
                <kbd className="cmd-kbd-sm">⌘K</kbd> toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
