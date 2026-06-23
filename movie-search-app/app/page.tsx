"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Film, Heart, Sparkles, AlertCircle, Settings, HelpCircle, Eye } from "lucide-react";
import { movieApi, Movie, SearchFilters } from "./services/movieApi";
import { useApp } from "./components/AppContext";
import HeroBanner from "./components/HeroBanner";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import SettingsModal from "./components/SettingsModal";
import MovieDetailsModal from "./components/MovieDetailsModal";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const { isApiConfigured, favorites, setIsSettingsOpen } = useApp();

  const [movies, setMovies] = useState<Movie[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [activeTab, setActiveTab] = useState<"explore" | "favorites">("explore");

  const isSearching = !!(query.trim() || Object.values(filters).some(Boolean));

  const fetchMoviesList = useCallback(
    async (pageNum: number, isAppend: boolean, activeQuery: string, activeFilters: SearchFilters) => {
      setLoading(true);
      setError(null);
      try {
        let results: Movie[] = [];
        let total = 1;

        if (activeQuery.trim() || Object.values(activeFilters).some(Boolean)) {
          const data = await movieApi.searchMovies(activeQuery, pageNum, activeFilters);
          results = data.results;
          total = data.total_pages;
        } else {
          const data = await movieApi.getTrending(pageNum);
          results = data.results;
          total = data.total_pages;
        }

        if (isAppend) {
          setMovies(prev => {
            // Deduplicate movies by ID
            const existingIds = new Set(prev.map(m => m.id));
            const newMovies = results.filter(m => !existingIds.has(m.id));
            return [...prev, ...newMovies];
          });
        } else {
          setMovies(results);
        }

        setTotalPages(total);
      } catch (err: any) {
        setError(err.message || "Failed to load titles from source.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadFavoritesList = useCallback(async () => {
    if (favorites.length === 0) {
      setMovies([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Resolve details for all favorite IDs in parallel
      const resolved = await Promise.all(
        favorites.map(async id => {
          try {
            return await movieApi.getMovieDetails(id);
          } catch (e) {
            console.warn(`Could not resolve favorite detail for ID ${id}`, e);
            return null;
          }
        })
      );
      setMovies(resolved.filter((m): m is Movie => m !== null));
      setTotalPages(1);
    } catch (err: any) {
      setError("Failed to load your favorite films.");
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (activeTab === "favorites") {
      loadFavoritesList();
    } else {
      setPage(1);
      fetchMoviesList(1, false, query, filters);
    }
  }, [isApiConfigured, activeTab, fetchMoviesList, loadFavoritesList]);

  const handleSearch = (newQuery: string, newFilters: SearchFilters) => {
    setQuery(newQuery);
    setFilters(newFilters);
    setPage(1);
    setActiveTab("explore"); // Switch to explore tab if someone starts searching
    fetchMoviesList(1, false, newQuery, newFilters);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMoviesList(nextPage, true, query, filters);
    }
  };

  const handleRetry = () => {
    if (activeTab === "favorites") {
      loadFavoritesList();
    } else {
      setQuery("");
      setFilters({});
      setPage(1);
      fetchMoviesList(1, false, "", {});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-foreground)]/20 bg-[var(--color-background)]/70 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              setActiveTab("explore");
              setQuery("");
              setFilters({});
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cinema-red)] rounded-xl"
            aria-label="CineStream Home"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[var(--color-cinema-red)] text-white shadow-lg shadow-[var(--color-cinema-red)]/25 shrink-0">
              <Film className="h-4 w-4" />
            </div>
            <span className="text-xl font-extrabold tracking-wider uppercase bg-gradient-to-r from-[var(--color-cinema-red)] to-amber-500 bg-clip-text text-transparent hidden sm:inline-block">
              CineStream
            </span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("explore")}
              className={`rounded-lg px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "explore"
                  ? "bg-[var(--color-cinema-red)]/10 text-[var(--color-cinema-red)]"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/10"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`rounded-lg px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "favorites"
                  ? "bg-[var(--color-cinema-red)]/10 text-[var(--color-cinema-red)]"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/10"
              }`}
            >
              <Heart className="h-3.5 w-3.5 fill-current shrink-0" />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-cinema-red)] text-[10px] font-extrabold text-white shrink-0">
                  {favorites.length}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--color-foreground)]/20 bg-[var(--color-background)]/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/10 shrink-0"
              title="Settings & About"
            >
              <Settings className="h-5 w-5" />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {activeTab === "explore" && !isSearching && (
        <HeroBanner movies={movies} />
      )}

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {(activeTab === "explore" || isSearching) && (
          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        <section className="pt-2">
          {activeTab === "favorites" ? (
            <MovieGrid
              movies={movies}
              loading={loading}
              error={error}
              title="My Film Favorites"
              hasMore={false}
              onLoadMore={() => {}}
              onRetry={handleRetry}
              isSearching={false}
            />
          ) : (
            <MovieGrid
              movies={movies}
              loading={loading}
              error={error}
              title={isSearching ? "Search Results" : "Trending Blockbusters"}
              hasMore={page < totalPages}
              onLoadMore={handleLoadMore}
              onRetry={handleRetry}
              isSearching={isSearching}
            />
          )}
        </section>
      </main>

      <Footer />

      <SettingsModal />
      <MovieDetailsModal />
    </div>
  );
}
