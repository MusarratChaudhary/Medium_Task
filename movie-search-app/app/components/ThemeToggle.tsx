"use client";

import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useApp } from "./AppContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-foreground)]/20 bg-[var(--color-background)]/10 backdrop-blur-md transition-all"
        aria-label="Toggle Theme"
      >
        <div className="relative h-5 w-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-foreground)]/20 bg-[var(--color-background)]/10 text-[var(--color-foreground)] backdrop-blur-md transition-all hover:bg-[var(--color-foreground)]/10 hover:scale-105 active:scale-95"
      aria-label="Toggle Theme"
    >
      <div className="relative h-5 w-5">
        <span
          className={`absolute inset-0 transform transition-all duration-500 ease-out ${
            theme === "dark" 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <Sun className="h-5 w-5 text-amber-500 fill-amber-500/20" />
        </span>

        <span
          className={`absolute inset-0 transform transition-all duration-500 ease-out ${
            theme === "dark" 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <Moon className="h-5 w-5 text-indigo-400 fill-indigo-400/20" />
        </span>
      </div>
    </button>
  );
}
