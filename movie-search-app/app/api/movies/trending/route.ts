import { NextRequest, NextResponse } from "next/server";
import { fetchTMDBServer, getApiKey, MOCK_MOVIES } from "../../../services/tmdbServer";
import { Movie } from "../../../services/movieApi";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const data = await fetchTMDBServer<{ results: Movie[]; total_pages: number }>("/trending/movie/week", { page });
      return NextResponse.json({
        results: data.results,
        total_pages: Math.min(data.total_pages, 10), // Cap at 10 pages for search optimization/demo sanity
        source: "tmdb"
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to fetch from TMDB server" },
        { status: 500 }
      );
    }
  }

  // Fallback to offline mock data
  // Simulate database latency
  await new Promise(r => setTimeout(r, 600));

  const limit = 8;
  const startIndex = (page - 1) * limit;
  const totalPages = Math.ceil(MOCK_MOVIES.length / limit);
  const sorted = [...MOCK_MOVIES].sort((a, b) => b.popularity - a.popularity);

  return NextResponse.json({
    results: sorted.slice(startIndex, startIndex + limit),
    total_pages: totalPages,
    source: "mock"
  });
}
