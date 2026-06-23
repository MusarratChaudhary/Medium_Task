"use client";

import React from "react";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import { Movie } from "../services/movieApi";
import { Film, AlertCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  title: string;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry?: () => void;
  isSearching: boolean;
}

export default function MovieGrid({
  movies,
  loading,
  error,
  title,
  hasMore,
  onLoadMore,
  onRetry,
  isSearching
}: MovieGridProps) {
  
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-baseline justify-between border-b border-[var(--color-foreground)]/20 pb-3 dark:border-[var(--color-foreground)]/10">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-foreground)] dark:text-white">
          {title}
        </h2>
        {movies.length > 0 && (
          <span className="text-xs font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">
            Showing {movies.length} title{movies.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {error ? (
        /* Error State */
        <div className="flex flex-col items-center justify-center py-16 text-center px-4 rounded-2xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] backdrop-blur dark:border-[var(--color-foreground)]/10 dark:bg-[var(--color-background)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cinema-red)]/10 text-[var(--color-cinema-red)]">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">Database connection interrupted</h3>
          <p className="mt-2 text-sm text-[var(--color-foreground)] dark:text-[var(--color-foreground)] max-w-sm">
            {error || "An unexpected error occurred while fetching titles. Please check your connection."}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-6 flex items-center gap-2 rounded-xl bg-[var(--color-foreground)] px-5 py-2.5 text-xs font-bold text-[var(--color-background)] hover:bg-[var(--color-foreground)]/90 dark:bg-[var(--color-foreground)]/20 dark:hover:bg-[var(--color-foreground)]/30 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </button>
          )}
        </div>
      ) : movies.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 rounded-2xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] backdrop-blur dark:border-[var(--color-foreground)]/10 dark:bg-[var(--color-background)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-foreground)]/10 text-[var(--color-foreground)] dark:bg-[var(--color-foreground)]/10 dark:text-[var(--color-foreground)]">
            <Film className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">No movies found</h3>
          <p className="mt-2 text-sm text-[var(--color-foreground)] dark:text-[var(--color-foreground)] max-w-sm">
            We couldn&apos;t find any titles matching your current filter choices or search term. Try adjusting your settings.
          </p>
          {isSearching && onRetry && (
            <button
              onClick={onRetry}
              className="mt-6 rounded-xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] px-5 py-2.5 text-xs font-bold text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/5 dark:border-[var(--color-foreground)]/10 dark:bg-[var(--color-background)] dark:text-[var(--color-foreground)] dark:hover:bg-[var(--color-foreground)]/10 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </AnimatePresence>

            {loading && skeletonArray.map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </motion.div>

          {hasMore && !loading && (
            <div className="flex justify-center pt-4">
              <button
                onClick={onLoadMore}
                className="flex items-center justify-center rounded-xl border border-[var(--color-cinema-red)]/20 bg-[var(--color-background)] px-8 py-3 text-xs font-bold tracking-wide uppercase text-[var(--color-cinema-red)] hover:bg-[var(--color-cinema-red)]/5 hover:border-[var(--color-cinema-red)] dark:bg-transparent dark:hover:bg-[var(--color-cinema-red)]/10 transition-all shadow-md shadow-[var(--color-cinema-red)]/5 active:scale-95 duration-200"
              >
                Load More Titles
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
