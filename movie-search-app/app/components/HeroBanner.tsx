"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Play, Info } from "lucide-react";
import { Movie, getImageUrl, getGenreNames } from "../services/movieApi";
import { useApp } from "./AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface HeroBannerProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  const { setActiveMovieId } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take the top 5 movies for rotation
  const featuredMovies = movies.slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000); // Rotates every 6 seconds

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  // Reset index if the movie list changes (e.g. server config changes source)
  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  if (featuredMovies.length === 0) {
    return (
      <div className="relative h-[480px] md:h-[600px] w-full bg-zinc-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
        <div className="relative z-10 text-center space-y-4 max-w-md px-6">
          <div className="h-4 w-24 bg-white/20 rounded mx-auto animate-pulse" />
          <div className="h-10 w-64 bg-white/20 rounded mx-auto animate-pulse" />
          <div className="h-6 w-80 bg-white/20 rounded mx-auto animate-pulse" />
        </div>
      </div>
    );
  }

  const movie = featuredMovies[currentIndex];
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const genres = movie.genre_ids ? getGenreNames(movie.genre_ids) : [];
  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[660px] w-full overflow-hidden bg-zinc-950">
      <AnimatePresence>
        <motion.div
          key={`bg-${movie.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            fill
            priority
            className="object-cover object-top opacity-100"
            unoptimized={true}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/10 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-transparent z-10" />

      <div className="absolute inset-0 flex items-end pb-12 z-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${movie.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl space-y-4 text-white"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[var(--color-cinema-red)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[var(--color-cinema-red)]/10">
                  Featured Film
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-current" />
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
                <span className="text-xs font-semibold text-zinc-300 drop-shadow-sm">
                  • {releaseYear}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg text-white leading-[1.1] line-clamp-2 md:line-clamp-none">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm md:text-base font-medium italic text-zinc-300 drop-shadow-md">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-200 line-clamp-3 md:line-clamp-4 drop-shadow-md">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveMovieId(movie.id)}
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-cinema-red)] hover:bg-[var(--color-cinema-red)]/90 px-6 py-3 text-xs sm:text-sm font-bold tracking-wide text-white transition-all shadow-lg shadow-[var(--color-cinema-red)]/25 hover:shadow-[var(--color-cinema-red)]/40 hover:scale-[1.02] active:scale-95"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  Watch Trailer
                </button>
                <button
                  onClick={() => setActiveMovieId(movie.id)}
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 px-6 py-3 text-xs sm:text-sm font-bold tracking-wide text-white backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                >
                  <Info className="h-4 w-4" />
                  More Info
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {featuredMovies.length > 1 && (
        <div className="absolute bottom-6 right-6 sm:right-8 md:right-12 z-30 flex items-center gap-2">
          {featuredMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-[var(--color-cinema-red)] shadow-md shadow-[var(--color-cinema-red)]/25"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
