"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  isApiConfigured: boolean;
  checkApiConfig: () => Promise<void>;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  activeMovieId: number | null;
  setActiveMovieId: (id: number | null) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with 'dark' to match server render and prevent hydration mismatch
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const checkApiConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        setIsApiConfigured(data.isConfigured);
      }
    } catch (e) {
      console.error("Failed to fetch API key configuration status from server", e);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Sync React state and DOM with localStorage theme after hydration
      const savedTheme = localStorage.getItem("app_theme");
      if (savedTheme === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }

      const savedFavs = localStorage.getItem("movie_favorites");
      if (savedFavs) {
        try {
          setFavorites(JSON.parse(savedFavs));
        } catch (e) {
          console.error("Failed to parse favorites", e);
        }
      }
    }

    checkApiConfig();
  }, [checkApiConfig]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("app_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(fId => fId !== id) 
        : [...prev, id];
      localStorage.setItem("movie_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isApiConfigured,
        checkApiConfig,
        favorites,
        toggleFavorite,
        activeMovieId,
        setActiveMovieId,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
