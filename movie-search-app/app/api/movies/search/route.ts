import { NextRequest, NextResponse } from "next/server";
import { fetchTMDBServer, getApiKey, MOCK_MOVIES } from "../../../services/tmdbServer";
import { Movie } from "../../../services/movieApi";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const genreId = searchParams.get("genreId") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sortBy") || "popularity.desc";

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      if (query.trim()) {
        // Query search endpoint
        const data = await fetchTMDBServer<{ results: Movie[]; total_pages: number }>("/search/movie", {
          query: query.trim(),
          page
        });

        let results = data.results;

        // Apply client filters on the search results since TMDB Search doesn't support them natively
        if (genreId) {
          const gId = parseInt(genreId, 10);
          results = results.filter(m => m.genre_ids?.includes(gId));
        }
        if (year) {
          results = results.filter(m => m.release_date?.startsWith(year));
        }
        if (rating) {
          const minRating = parseFloat(rating);
          results = results.filter(m => m.vote_average >= minRating);
        }

        return NextResponse.json({
          results,
          total_pages: data.total_pages,
          source: "tmdb"
        });
      } else {
        // Discover endpoint for browse-based filtering
        const params: Record<string, string | number> = { page };
        
        if (genreId) params["with_genres"] = genreId;
        if (year) params["primary_release_year"] = year;
        if (rating) params["vote_average.gte"] = rating;
        if (sortBy) params["sort_by"] = sortBy;

        const data = await fetchTMDBServer<{ results: Movie[]; total_pages: number }>("/discover/movie", params);
        
        return NextResponse.json({
          results: data.results,
          total_pages: data.total_pages,
          source: "tmdb"
        });
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to search from TMDB server" },
        { status: 500 }
      );
    }
  }

  // Fallback to offline mock database search
  await new Promise(r => setTimeout(r, 400));

  let filtered = [...MOCK_MOVIES];

  // 1. Text Query Filter
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      m => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
  }

  // 2. Genre Filter
  if (genreId) {
    const gid = parseInt(genreId, 10);
    filtered = filtered.filter(m => m.genre_ids?.includes(gid));
  }

  // 3. Year Filter
  if (year) {
    filtered = filtered.filter(m => m.release_date?.startsWith(year));
  }

  // 4. Rating Filter
  if (rating) {
    const minRating = parseFloat(rating);
    filtered = filtered.filter(m => m.vote_average >= minRating);
  }

  // 5. Sorting
  if (sortBy === "popularity.desc") {
    filtered.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === "vote_average.desc") {
    filtered.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortBy === "release_date.desc") {
    filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  } else if (sortBy === "release_date.asc") {
    filtered.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
  }

  const limit = 8;
  const startIndex = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  return NextResponse.json({
    results: filtered.slice(startIndex, startIndex + limit),
    total_pages: totalPages,
    source: "mock"
  });
}
