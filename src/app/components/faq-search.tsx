'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSearchProps {
  items: FaqItem[];
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="faq-search-highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function FaqSearch({ items }: FaqSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce input by 300ms
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  // Filter FAQ items based on debounced query
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;

    const lowerQuery = debouncedQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery)
    );
  }, [items, debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="faq-search">
      {/* Search Bar */}
      <motion.div
        className="faq-search-input-wrapper"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Search size={16} strokeWidth={1.5} className="faq-search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="faq-search-input"
          placeholder="Search frequently asked questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search frequently asked questions"
        />
        <AnimatePresence>
          {query.length > 0 && (
            <motion.button
              className="faq-search-clear"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <AnimatePresence>
        {debouncedQuery.trim().length > 0 && (
          <motion.p
            className="faq-search-count"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
          </motion.p>
        )}
      </AnimatePresence>

      {/* Filtered Results */}
      {debouncedQuery.trim().length > 0 && (
        <div className="faq-search-results">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                className="faq-search-empty"
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                No matching questions found. Try a different search term.
              </motion.div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  className="faq-search-result-item"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                >
                  <p className="faq-search-result-question">
                    {highlightMatch(item.question, debouncedQuery)}
                  </p>
                  <p className="faq-search-result-answer">
                    {highlightMatch(item.answer, debouncedQuery)}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
