"use client";

import React, { useState, useEffect } from "react";
import { X, Star, Heart, Play, Clock, Calendar, User, Film, Info, HelpCircle } from "lucide-react";
import { useApp } from "./AppContext";
import { movieApi, Movie, getImageUrl, getGenreNames } from "../services/movieApi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MovieDetailsModal() {
  const { activeMovieId, setActiveMovieId, favorites, toggleFavorite } = useApp();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "trailer">("details");

  useEffect(() => {
    if (!activeMovieId) {
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setMovie(null);
      setLoading(true);
      setError(null);
      try {
        const details = await movieApi.getMovieDetails(activeMovieId);
        setMovie(details);
        setActiveTab("details");
      } catch (err: any) {
        setError(err.message || "Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [activeMovieId]);

  const isFavorite = movie ? favorites.includes(movie.id) : false;
  const releaseYear = movie?.release_date ? movie.release_date.split("-")[0] : "N/A";
  const formattedRuntime = movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

  return (
    <AnimatePresence>
      {activeMovieId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveMovieId(null)}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl min-h-[90vh] sm:min-h-0 sm:rounded-2xl border border-[var(--color-foreground)]/20 bg-[var(--color-background)] text-[var(--color-foreground)] shadow-2xl overflow-hidden focus:outline-none flex flex-col"
        >
          <button
            onClick={() => setActiveMovieId(null)}
            className="absolute top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-background)]/70 border-[var(--color-foreground)]/20 text-[var(--color-foreground)] hover:text-[var(--color-foreground)] backdrop-blur-md transition-colors"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>

          {loading ? (
            <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-cinema-red)] border-t-transparent" />
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Loading film details...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 py-20 text-center px-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cinema-red)]/10 text-[var(--color-cinema-red)]">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-foreground)]">Unable to load details</h3>
              <p className="max-w-md text-sm text-[var(--color-foreground)]">{error}</p>
              <button
                onClick={() => setActiveMovieId(null)}
                className="mt-2 rounded-lg bg-[var(--color-foreground)]/85 px-4 py-2 text-sm font-medium hover:bg-[var(--color-foreground)]/80 border border-[var(--color-foreground)]/60"
              >
                Go Back
              </button>
            </div>
          ) : movie ? (
            <div className="flex flex-col">
              {/* Backdrop image banner */}
              <div className="relative h-[200px] sm:h-[300px] md:h-[380px] w-full overflow-hidden shrink-0 bg-zinc-950">
                <Image
                  src={getImageUrl(movie.backdrop_path, "original")}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
              </div>

              {/* Title & Header Metadata */}
              <div className="px-5 sm:px-6 pt-5 pb-3 space-y-3 bg-[var(--color-background)]">
                <div className="flex flex-wrap gap-1.5">
                  {movie.genre_ids && getGenreNames(movie.genre_ids).map((g, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[var(--color-cinema-red)]/10 dark:bg-[var(--color-cinema-red)]/20 text-[var(--color-cinema-red)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-foreground)] leading-tight">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-xs sm:text-sm font-medium italic text-[var(--color-foreground)]/70">
                      &ldquo;{movie.tagline}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="flex border-b border-[var(--color-foreground)]/20 bg-[var(--color-background)] px-4 sm:px-6 pt-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`border-b-2 px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "details"
                      ? "border-[var(--color-cinema-red)] text-[var(--color-foreground)]"
                      : "border-transparent text-[var(--color-foreground)] hover:text-[var(--color-cinema-red)]"
                  }`}
                >
                  Overview & Info
                </button>
                {movie.trailer_url && (
                  <button
                    onClick={() => setActiveTab("trailer")}
                    className={`border-b-2 px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      activeTab === "trailer"
                        ? "border-[var(--color-cinema-red)] text-[var(--color-foreground)]"
                        : "border-transparent text-[var(--color-foreground)] hover:text-[var(--color-cinema-red)]"
                    }`}
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Watch Trailer
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-6 bg-[var(--color-background)]">
                {activeTab === "details" ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    <div className="md:col-span-8 space-y-5 order-2 md:order-1">
                      <div>
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-foreground)] mb-2">
                          Storyline
                        </h2>
                        <p className="text-sm leading-relaxed text-[var(--color-foreground)]">
                          {movie.overview}
                        </p>
                      </div>

                      {movie.cast && movie.cast.length > 0 && (
                        <div>
                          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-foreground)] mb-3">
                            Key Cast
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {movie.cast.map((actor, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 rounded-lg bg-[var(--color-foreground)]/5 border border-[var(--color-foreground)]/15 p-2"
                              >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-foreground)]/15 text-xs font-bold text-[var(--color-foreground)]">
                                  {actor.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <span className="text-xs font-medium text-[var(--color-foreground)] truncate">{actor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-4 order-1 md:order-2 bg-[var(--color-foreground)]/5 dark:bg-[var(--color-foreground)]/5 rounded-xl border border-[var(--color-foreground)]/15 dark:border-[var(--color-foreground)]/10 p-5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-cinema-red)]/10 text-[var(--color-cinema-red)]">
                          <Star className="h-6 w-6 fill-[var(--color-cinema-red)] text-[var(--color-cinema-red)]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider">Rating</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-[var(--color-foreground)]">
                              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                            </span>
                            <span className="text-xs text-[var(--color-foreground)]">
                              ({movie.vote_count ? movie.vote_count.toLocaleString() : 0} votes)
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="border-[var(--color-foreground)]/20 dark:border-[var(--color-foreground)]/10" />

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs">
                          <Calendar className="h-4 w-4 text-[var(--color-cinema-red)]" />
                          <div>
                            <span className="text-[var(--color-foreground)]">Release Date:</span>{" "}
                            <span className="font-semibold text-[var(--color-foreground)]">{movie.release_date || "N/A"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <Clock className="h-4 w-4 text-[var(--color-cinema-red)]" />
                          <div>
                            <span className="text-[var(--color-foreground)]">Duration:</span>{" "}
                            <span className="font-semibold text-[var(--color-foreground)]">{formattedRuntime}</span>
                          </div>
                        </div>

                        {movie.director && (
                          <div className="flex items-center gap-3 text-xs">
                            <User className="h-4 w-4 text-[var(--color-cinema-red)]" />
                            <div>
                              <span className="text-[var(--color-foreground)]">Director:</span>{" "}
                              <span className="font-semibold text-[var(--color-foreground)]">{movie.director}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <hr className="border-[var(--color-foreground)]/20 dark:border-[var(--color-foreground)]/10" />

                      <button
                        onClick={() => toggleFavorite(movie.id)}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all border ${
                          isFavorite
                            ? "bg-[var(--color-cinema-red)] text-white border-[var(--color-cinema-red)] shadow-lg shadow-[var(--color-cinema-red)]/10 hover:bg-[var(--color-cinema-red)]/90"
                            : "bg-[var(--color-foreground)]/5 text-[var(--color-foreground)] border-[var(--color-foreground)]/20 hover:bg-[var(--color-foreground)]/10"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? "fill-white text-white" : ""}`} />
                        {isFavorite ? "In Favorites" : "Add to Favorites"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-[var(--color-foreground)]/5 dark:bg-[var(--color-foreground)]/5 border border-[var(--color-foreground)]/15 dark:border-[var(--color-foreground)]/10">
                    {movie.trailer_url ? (
                      <iframe
                        src={movie.trailer_url}
                        title={`${movie.title} Official Trailer`}
                        className="h-full w-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-center p-6 text-[var(--color-foreground)]">
                        <Film className="h-10 w-10 text-[var(--color-foreground)]" />
                        <p className="text-sm font-semibold">No official trailer found for this title.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
