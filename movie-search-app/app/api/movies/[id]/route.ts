import { NextRequest, NextResponse } from "next/server";
import { fetchTMDBServer, getApiKey, MOCK_MOVIES } from "../../../services/tmdbServer";
import { Movie } from "../../../services/movieApi";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      // Fetch details, videos, and credits in parallel to optimize response latency
      const [detailsPromise, videosPromise, creditsPromise] = await Promise.allSettled([
        fetchTMDBServer<Movie>(`/movie/${id}`),
        fetchTMDBServer<{ results: { key: string; site: string; type: string }[] }>(`/movie/${id}/videos`),
        fetchTMDBServer<{ cast: { name: string }[]; crew: { name: string; job: string }[] }>(`/movie/${id}/credits`)
      ]);

      if (detailsPromise.status === "rejected") {
        throw new Error(`Failed to load details: ${detailsPromise.reason}`);
      }

      const movieDetails = detailsPromise.value;

      // Parse trailer URL
      if (videosPromise.status === "fulfilled") {
        const videos = videosPromise.value.results;
        const trailer = videos.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
        if (trailer) {
          movieDetails.trailer_url = `https://www.youtube.com/embed/${trailer.key}`;
        }
      }

      // Parse cast & director
      if (creditsPromise.status === "fulfilled") {
        const credits = creditsPromise.value;
        movieDetails.cast = credits.cast.slice(0, 6).map(c => c.name);
        const director = credits.crew.find(c => c.job === "Director");
        if (director) {
          movieDetails.director = director.name;
        }
      }

      return NextResponse.json({
        ...movieDetails,
        source: "tmdb"
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to fetch movie details from TMDB" },
        { status: 500 }
      );
    }
  }

  // Fallback to offline mock details
  await new Promise(r => setTimeout(r, 200));
  const mockMovie = MOCK_MOVIES.find(m => m.id === id);

  if (!mockMovie) {
    return NextResponse.json({ error: "Movie not found in catalog" }, { status: 404 });
  }

  return NextResponse.json({
    ...mockMovie,
    source: "mock"
  });
}
