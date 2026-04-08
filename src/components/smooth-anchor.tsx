'use client';

import { type ReactNode, useCallback } from 'react';

interface SmoothAnchorProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function SmoothAnchor({ href, children, className }: SmoothAnchorProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        window.location.hash = href;
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    [href],
  );

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
