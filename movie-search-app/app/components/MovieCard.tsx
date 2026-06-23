"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart, Play, Film } from "lucide-react";
import { Movie, getImageUrl, getGenreNames } from "../services/movieApi";
import { useApp } from "./AppContext";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { setActiveMovieId, favorites, toggleFavorite } = useApp();

  const isFavorite = favorites.includes(movie.id);
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const genres = movie.genre_ids ? getGenreNames(movie.genre_ids).slice(0, 2) : [];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      onClick={() => setActiveMovieId(movie.id)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--color-foreground)]/15 bg-[var(--color-background)] p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[var(--color-cinema-red)]/10"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--color-background)] dark:bg-[var(--color-background)]">
        <Image
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          unoptimized={true} // Unoptimized helps with external URLs like TMDB/Unsplash directly
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3" />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-[var(--color-foreground)]/70 px-2 py-1 text-xs font-semibold text-[var(--color-cinema-red)] backdrop-blur-md">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? "bg-[var(--color-cinema-red)] text-white shadow-md shadow-[var(--color-cinema-red)]/20"
              : "bg-[var(--color-foreground)]/60 text-white/80 hover:bg-[var(--color-foreground)]/80 hover:text-white"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white text-white" : ""}`} />
        </motion.button>

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
          <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            {/* Genre Pills */}
            <div className="flex flex-wrap gap-1 mb-2">
              {genres.map((g, i) => (
                <span
                  key={i}
                  className="rounded bg-[var(--color-cinema-red)]/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-white/70 line-clamp-2 mb-3">
              {movie.overview}
            </p>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider bg-white/20 hover:bg-white/30 px-2.5 py-1.5 rounded-md transition-all">
              <Play className="h-3 w-3 fill-white text-white" />
              Quick View
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 px-1 pb-1">
        <h3 className="truncate text-sm font-semibold tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-cinema-red)] transition-colors">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-[var(--color-foreground)] font-medium">
          <span>{releaseYear}</span>
          <span className="flex items-center gap-1">
            <Film className="h-3 w-3" />
            <span>Movie</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
