"use client";

import React from "react";
import { Film, Heart, Settings, RefreshCw } from "lucide-react";
import { useApp } from "./AppContext";

export default function Footer() {
  const { setIsSettingsOpen, favorites, isApiConfigured } = useApp();

  return (
    <footer className="w-full border-t border-[var(--color-foreground)]/15 bg-[var(--color-background)] py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="max-w-xs space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-cinema-red)] text-white shadow-md shadow-[var(--color-cinema-red)]/20">
              <Film className="h-4 w-4" />
            </div>
            <span className="text-lg font-black tracking-wider uppercase bg-gradient-to-r from-[var(--color-cinema-red)] to-[var(--color-cinema-red)] bg-clip-text text-transparent">
              CineStream
            </span>
          </div>
          <p className="text-xs text-[var(--color-foreground)] leading-relaxed">
            A premium, high-performance catalog of global cinema. Experience movies in crystal clear details.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold text-[var(--color-foreground)]">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-[10px] font-bold text-[var(--color-foreground)] uppercase tracking-widest mb-1">Preferences</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1 hover:text-[var(--color-cinema-red)] transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              App Settings
            </button>
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-[10px] font-bold text-[var(--color-foreground)] uppercase tracking-widest mb-1">Community</span>
            <a 
              href="https://github.com/MusarratChaudhary" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-[var(--color-cinema-red)] transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Source Code
            </a>
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-[10px] font-bold text-[var(--color-foreground)] uppercase tracking-widest mb-1">Your Space</span>
            <span className="flex items-center gap-1 [color:var(--color-foreground)]">
              <Heart className="h-3.5 w-3.5 text-[var(--color-cinema-red)] fill-[var(--color-cinema-red)]/20" />
              {favorites.length} Favorites
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[var(--color-foreground)]/15 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[var(--color-foreground)]">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} CineStream Catalog. Built with Next.js & Tailwind CSS.
        </p>
        <p className="max-w-md text-center sm:text-right leading-normal">
          This product uses the TMDB API but is not endorsed or certified by TMDB. 
          All posters and metadata are served directly from their public APIs.
        </p>
      </div>
    </footer>
  );
}
