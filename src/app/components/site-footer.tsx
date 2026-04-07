'use client';

import { Mail, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import CopyEmail from './copy-email';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-grid">
        {/* Column 1: Brand */}
        <div className="site-footer-col">
          <div className="site-footer-brand">Omega7 Capital</div>
          <p className="site-footer-tagline">
            Quantitative finance research collective. Rigour, precision, and intellectual curiosity.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="site-footer-col">
          <h4 className="site-footer-heading">Navigation</h4>
          <ul className="site-footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#join">Join us</a></li>
            <li>
              <button
                className="footer-back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
              >
                <ArrowUp size={12} strokeWidth={1.5} />
                <span>Back to top</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="site-footer-col">
          <h4 className="site-footer-heading">Contact</h4>
          <ul className="site-footer-links">
            <li>
              <a href="mailto:adanegarab@gmail.com" className="footer-contact-link">
                <Mail size={14} strokeWidth={1.5} />
                <span>adanegarab@gmail.com</span>
              </a>
              <CopyEmail email="adanegarab@gmail.com" className="footer-copy-inline" as="button" />
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <Linkedin size={14} strokeWidth={1.5} />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <Twitter size={14} strokeWidth={1.5} />
                <span>Twitter / X</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer-bottom">
        <p>
          &copy; {currentYear} Omega7 Capital. All rights reserved.
        </p>
        <p>
          Designed for clarity and purpose.
        </p>
      </div>
    </footer>
  );
}
