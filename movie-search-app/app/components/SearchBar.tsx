"use client";

import React, { useState } from "react";
import { Search, X, SlidersHorizontal, Sliders, ChevronDown } from "lucide-react";
import { GENRES, SearchFilters } from "../services/movieApi";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, {
      genreId: selectedGenre || undefined,
      year: selectedYear || undefined,
      rating: selectedRating || undefined,
      sortBy: sortBy || undefined
    });
  };

  const handleClear = () => {
    setQuery("");
    onSearch("", {
      genreId: selectedGenre || undefined,
      year: selectedYear || undefined,
      rating: selectedRating || undefined,
      sortBy: sortBy || undefined
    });
  };

  const handleResetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
    setSortBy("popularity.desc");
    onSearch(query, {
      sortBy: "popularity.desc"
    });
  };

  const activeFiltersCount = [
    selectedGenre,
    selectedYear,
    selectedRating,
    sortBy !== "popularity.desc" ? sortBy : ""
  ].filter(Boolean).length;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-foreground)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, directors, characters..."
            className="w-full rounded-xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] py-3.5 pl-12 pr-10 text-sm shadow-sm transition-all placeholder:text-[var(--color-foreground)]/50 focus:border-[var(--color-cinema-red)] focus:outline-none focus:ring-1 focus:ring-[var(--color-cinema-red)]"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex h-[46px] items-center justify-center gap-2 rounded-xl px-3 sm:px-4 text-sm font-semibold transition-all border ${
            showFilters || activeFiltersCount > 0
              ? "bg-[var(--color-cinema-red)] text-white border-[var(--color-cinema-red)] shadow-md shadow-[var(--color-cinema-red)]/10"
              : "bg-[var(--color-background)] text-[var(--color-foreground)] border-[var(--color-foreground)]/20 hover:bg-[var(--color-foreground)]/5 hover:border-[var(--color-foreground)]/30"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              showFilters ? "bg-[var(--color-background)] text-[var(--color-cinema-red)]" : "bg-[var(--color-cinema-red)] text-white"
            }`}>
              {activeFiltersCount}
            </span>
          )}
        </button>

        <button
          type="submit"
          className="flex h-[46px] items-center justify-center rounded-xl bg-[var(--color-cinema-red)] px-4 sm:px-6 text-sm font-bold tracking-wide text-white hover:bg-[var(--color-cinema-red)]/90 transition-all shadow-md shadow-[var(--color-cinema-red)]/10 active:scale-95"
          aria-label="Search"
        >
          <span className="hidden sm:inline">Search</span>
          <Search className="h-4 w-4 sm:hidden" />
        </button>
      </form>

      {showFilters && (
        <div className="rounded-xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[var(--color-foreground)]/20 pb-3 mb-4">
            <h3 className="text-sm font-bold tracking-wide uppercase text-[var(--color-foreground)]">
              Advanced Search Filters
            </h3>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[var(--color-cinema-red)] hover:text-[var(--color-cinema-red)]/90 dark:hover:text-[var(--color-cinema-red)]/80"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)] uppercase tracking-wider">
                Genre
              </label>
              <div className="relative">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--color-foreground)]/20 bg-[var(--color-foreground)]/5 px-3 py-2 text-xs text-[var(--color-foreground)] focus:border-[var(--color-cinema-red)] focus:outline-none"
                >
                  <option value="">All Genres</option>
                  {GENRES.map((g) => (
                    <option key={g.id} value={String(g.id)}>
                      {g.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-[var(--color-foreground)]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)] uppercase tracking-wider">
                Release Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--color-foreground)]/20 bg-[var(--color-foreground)]/5 px-3 py-2 text-xs text-[var(--color-foreground)] focus:border-[var(--color-cinema-red)] focus:outline-none"
                >
                  <option value="">Any Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-[var(--color-foreground)]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)] uppercase tracking-wider">
                Min Rating
              </label>
              <div className="relative">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--color-foreground)]/20 bg-[var(--color-foreground)]/5 px-3 py-2 text-xs text-[var(--color-foreground)] focus:border-[var(--color-cinema-red)] focus:outline-none"
                >
                  <option value="">Any Rating</option>
                  <option value="8.5">8.5+ (Masterpieces)</option>
                  <option value="8.0">8.0+ (Highly Acclaimed)</option>
                  <option value="7.0">7.0+ (Good Quality)</option>
                  <option value="6.0">6.0+ (Above Average)</option>
                  <option value="5.0">5.0+ (Average)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-[var(--color-foreground)]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)] uppercase tracking-wider">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--color-foreground)]/20 bg-[var(--color-foreground)]/5 px-3 py-2 text-xs text-[var(--color-foreground)] focus:border-[var(--color-cinema-red)] focus:outline-none"
                >
                  <option value="popularity.desc">Popularity (High)</option>
                  <option value="vote_average.desc">Rating (High)</option>
                  <option value="release_date.desc">Release Date (Newest)</option>
                  <option value="release_date.asc">Release Date (Oldest)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-[var(--color-foreground)]" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="rounded-lg bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[var(--color-foreground)]/90 px-4 py-2 text-xs font-bold transition-all"
            >
              Apply Filter Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
