'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-[52px] h-[28px] rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 rounded-full ${isLight ? 'mode-light' : 'mode-dark'}`}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      id="theme-toggle-btn"
    >
      <div className={`theme-pill ${isLight ? 'mode-light' : 'mode-dark'}`}>
        {/* Stars decoration (visible in dark mode) */}
        <div className="theme-pill-bg-icon theme-pill-stars" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="2" cy="2" r="1" fill="white" opacity="0.8" />
            <circle cx="7" cy="5" r="0.7" fill="white" opacity="0.6" />
            <circle cx="4" cy="8" r="0.5" fill="white" opacity="0.5" />
          </svg>
        </div>

        {/* Sun rays decoration (visible in light mode) */}
        <div className="theme-pill-bg-icon theme-pill-sun" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="2" fill="#b45309" />
            <line x1="5" y1="1" x2="5" y2="3" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="5" y1="7" x2="5" y2="9" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="1" y1="5" x2="3" y2="5" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Sliding thumb */}
        <div className={`theme-thumb ${isLight ? 'mode-light' : 'mode-dark'}`} aria-hidden="true">
          {isLight ? (
            /* Sun icon inside thumb */
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
              <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          ) : (
            /* Moon icon inside thumb */
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
