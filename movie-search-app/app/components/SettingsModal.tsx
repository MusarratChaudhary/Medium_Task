"use client";

import React, { useEffect, useState } from "react";
import { X, Info, Settings, Heart, Tag, Palette } from "lucide-react";
import { useApp } from "./AppContext";
import { AnimatePresence, motion } from "framer-motion";

export default function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, theme, toggleTheme, favorites } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isSettingsOpen && mounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSettingsOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] p-6 shadow-2xl text-[var(--color-foreground)]"
        >
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="absolute top-4 right-4 text-[var(--color-foreground)] hover:text-[var(--color-cinema-red)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-foreground)]/10 text-[var(--color-foreground)]">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">App Settings</h2>
              <p className="text-xs text-[var(--color-foreground)]/70">Preferences & Info</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--color-foreground)]/10 bg-[var(--color-foreground)]/5 p-4 space-y-3">
              <div className="flex gap-2 font-bold items-center text-[var(--color-foreground)]">
                <Palette className="h-4 w-4 text-[var(--color-cinema-red)]" />
                <span className="text-sm">Theme</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => theme === "dark" && toggleTheme()}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    theme === "light"
                      ? "bg-[var(--color-cinema-red)] border-[var(--color-cinema-red)] text-white shadow-md"
                      : "border-[var(--color-foreground)]/20 bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/5"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => theme === "light" && toggleTheme()}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    theme === "dark"
                      ? "bg-[var(--color-cinema-red)] border-[var(--color-cinema-red)] text-white shadow-md"
                      : "border-[var(--color-foreground)]/20 bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/5"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-foreground)]/10 bg-[var(--color-foreground)]/5 p-4 flex items-center justify-between">
              <div className="flex gap-2 font-bold items-center text-[var(--color-foreground)]">
                <Heart className="h-4 w-4 text-[var(--color-cinema-red)]" />
                <span className="text-sm">Favorites</span>
              </div>
              <span className="text-xs font-extrabold bg-[var(--color-foreground)]/10 px-3 py-1 rounded-full text-[var(--color-foreground)]">
                {favorites.length} saved
              </span>
            </div>

            <div className="rounded-xl border border-[var(--color-foreground)]/10 bg-[var(--color-foreground)]/5 p-4 space-y-2">
              <div className="flex gap-2 font-bold items-center text-[var(--color-foreground)]">
                <Info className="h-4 w-4 text-[var(--color-cinema-red)]" />
                <span className="text-sm">About CineStream</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-foreground)]/80">
                A premium catalog of global cinema offering a beautiful, immersive experience for discovering your next favorite movie.
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-3 text-[var(--color-foreground)]/60">
              <Tag className="h-3 w-3" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">Version 1.0.0</span>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
