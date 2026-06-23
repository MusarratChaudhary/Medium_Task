export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  director?: string;
  cast?: string[];
  tagline?: string;
  trailer_url?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchFilters {
  genreId?: string;
  year?: string;
  rating?: string;
  sortBy?: string;
}

export const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

// Helper to get genre names from ids
export const getGenreNames = (ids: number[]): string[] => {
  return ids
    .map(id => GENRES.find(g => g.id === id)?.name)
    .filter((name): name is string => !!name);
};

// Image utility
export const getImageUrl = (path: string | null, size: "w500" | "original" = "w500"): string => {
  if (!path) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800"; // fallback cinematic visual
  if (path.startsWith("http")) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const movieApi = {
  // Get trending/popular movies from server route proxy
  getTrending: async (page = 1): Promise<{ results: Movie[]; total_pages: number; source: "tmdb" | "mock" }> => {
    const response = await fetch(`/api/movies/trending?page=${page}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error ${response.status}: Failed to fetch trending movies`);
    }
    return response.json();
  },

  // Search movies with advanced filtering from server route proxy
  searchMovies: async (
    query: string,
    page = 1,
    filters: SearchFilters = {}
  ): Promise<{ results: Movie[]; total_pages: number; source: "tmdb" | "mock" }> => {
    const params = new URLSearchParams({
      query: query.trim(),
      page: String(page),
      genreId: filters.genreId || "",
      year: filters.year || "",
      rating: filters.rating || "",
      sortBy: filters.sortBy || ""
    });

    const response = await fetch(`/api/movies/search?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error ${response.status}: Failed to execute search query`);
    }
    return response.json();
  },

  // Get specific movie details from server route proxy
  getMovieDetails: async (id: number): Promise<Movie> => {
    const response = await fetch(`/api/movies/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error ${response.status}: Failed to load details for movie ${id}`);
    }
    return response.json();
  }
};
