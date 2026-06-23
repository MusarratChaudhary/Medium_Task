import { Movie, Genre } from "./movieApi";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const MOCK_MOVIES: Movie[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    poster_path: "/czembie72231n7iclwhqoiq4wh1.jpg",
    backdrop_path: "/xOMo8BRK7evjp8w2u06R9L6Rbi7.jpg",
    release_date: "2024-02-27",
    vote_average: 8.2,
    vote_count: 5340,
    popularity: 980.5,
    genre_ids: [878, 12],
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
    runtime: 166,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh", "Javier Bardem"],
    tagline: "Long live the fighters.",
    trailer_url: "https://www.youtube.com/embed/Way9Dexny3w"
  },
  {
    id: 872585,
    title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, tracking his journey from brilliant physicist to conflicted designer, and the subsequent political fallout that questioned his loyalty to the nation.",
    poster_path: "/8Gxv8gS051g76a0j05i2K5jFBio.jpg",
    backdrop_path: "/m8tSb6tXMwUIAdbb06rmbui03IC.jpg",
    release_date: "2023-07-19",
    vote_average: 8.1,
    vote_count: 8900,
    popularity: 742.1,
    genre_ids: [18, 36],
    genres: [{ id: 18, name: "Drama" }, { id: 36, name: "History" }],
    runtime: 180,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh", "Josh Hartnett"],
    tagline: "The world forever changes.",
    trailer_url: "https://www.youtube.com/embed/uYPbbksJxIg"
  },
  {
    id: 157336,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage in a desperate bid to save humanity.",
    poster_path: "/gEU2QniE6E7vNIvN8pEZwNae3R7.jpg",
    backdrop_path: "/xJHokZbljvjCzoRL0crD45NBQfB.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    vote_count: 34500,
    popularity: 580.4,
    genre_ids: [12, 878, 18],
    genres: [{ id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }, { id: 18, name: "Drama" }],
    runtime: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Casey Affleck"],
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    trailer_url: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    overview: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    poster_path: "/iiZrdo6PISuEQSuJysI65dcrFvx.jpg",
    backdrop_path: "/7d5oZ017v50n395d98y1E0Tz96R.jpg",
    release_date: "2018-12-07",
    vote_average: 8.4,
    vote_count: 15400,
    popularity: 420.2,
    genre_ids: [16, 28, 12, 878],
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }],
    runtime: 117,
    director: "Bob Persichetti",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali", "Brian Tyree Henry"],
    tagline: "More than one wears the mask.",
    trailer_url: "https://www.youtube.com/embed/g4Hbz2jWDvQ"
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "/qJ2t58wGc2Xm77vVeUEjEw71glb.jpg",
    backdrop_path: "/nMKdUUepdz8gflSq0T4t58nIzC1.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    vote_count: 32000,
    popularity: 610.9,
    genre_ids: [18, 28, 80, 53],
    genres: [{ id: 18, name: "Drama" }, { id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 53, name: "Thriller" }],
    runtime: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal", "Gary Oldman", "Michael Caine"],
    tagline: "Why So Serious?",
    trailer_url: "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
    id: 27205,
    title: "Inception",
    overview: "Cobb, a skilled thief who is the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception.",
    poster_path: "/ljsQgJ241tMz536P7yx1wBjpfKM.jpg",
    backdrop_path: "/s3Tzczdf33XGKviACyvmk7Vw5ph.jpg",
    release_date: "2010-07-14",
    vote_average: 8.4,
    vote_count: 35900,
    popularity: 512.3,
    genre_ids: [28, 878, 12],
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
    runtime: 148,
    director: "Leonardo DiCaprio",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Ken Watanabe", "Cillian Murphy"],
    tagline: "Your mind is the scene of the crime.",
    trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 335984,
    title: "Blade Runner 2049",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
    poster_path: "/gajk12LwPM5Z27KVHg2CYUIu97m.jpg",
    backdrop_path: "/ilRyJSsswHO6BE3XjAhZ1MOTvbg.jpg",
    release_date: "2017-10-04",
    vote_average: 7.5,
    vote_count: 12800,
    popularity: 380.1,
    genre_ids: [878, 18],
    genres: [{ id: 878, name: "Science Fiction" }, { id: 18, name: "Drama" }],
    runtime: 164,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks", "Robin Wright", "Jared Leto"],
    tagline: "There's still a page left.",
    trailer_url: "https://www.youtube.com/embed/gCcx85zLyLI"
  },
  {
    id: 545611,
    title: "Everything Everywhere All at Once",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, in which she alone can save the world by exploring other universes connecting with the lives she could have led.",
    poster_path: "/w35xp15C655q1VqEq6n463m5w7d.jpg",
    backdrop_path: "/707Rz55UsoP56eA56oh56Ovl8y9.jpg",
    release_date: "2022-03-24",
    vote_average: 7.8,
    vote_count: 6500,
    popularity: 320.6,
    genre_ids: [28, 12, 878, 35],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }, { id: 35, name: "Comedy" }],
    runtime: 139,
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis", "James Hong"],
    tagline: "The universe is so much bigger than you realize.",
    trailer_url: "https://www.youtube.com/embed/wxN1T1uxQ2g"
  },
  {
    id: 129,
    title: "Spirited Away",
    overview: "A young girl, Chihiro, becomes trapped in a mysterious and strange world of spirits. When her parents are undergo a mysterious transformation, she must summon the courage to live and work amongst the spirits, under the rule of the cruel sorceress Yubaba, in a quest to free herself and her parents.",
    poster_path: "/39wmItIWsg5sclg2LqQvclGjVn.jpg",
    backdrop_path: "/Ab8Zb7feOKECBUL991b146E4Zff.jpg",
    release_date: "2001-07-20",
    vote_average: 8.5,
    vote_count: 16500,
    popularity: 290.4,
    genre_ids: [16, 14, 10751],
    genres: [{ id: 16, name: "Animation" }, { id: 14, name: "Fantasy" }, { id: 10751, name: "Family" }],
    runtime: 125,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naito", "Yasuko Sawaguchi"],
    tagline: "Nothing that happens is ever forgotten, even if you can't remember it.",
    trailer_url: "https://www.youtube.com/embed/ByXuk9QqQkk"
  },
  {
    id: 496243,
    title: "Parasite",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    poster_path: "/7IiCmwNT89ZzcxSUqjZBKrtu3nK.jpg",
    backdrop_path: "/TU952jzM7i0O4w8Al55167m4PZO.jpg",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 18200,
    popularity: 310.8,
    genre_ids: [35, 53, 18],
    genres: [{ id: 35, name: "Comedy" }, { id: 53, name: "Thriller" }, { id: 18, name: "Drama" }],
    runtime: 132,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
    tagline: "Act like you own the place.",
    trailer_url: "https://www.youtube.com/embed/5xH0HfJHsaY"
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    overview: "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider-Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders.",
    poster_path: "/8vt4IKIL9B8Ar2vqhJu26vjQDm6.jpg",
    backdrop_path: "/45mG3cITvB9212c4p7vTT1qp92C.jpg",
    release_date: "2023-05-31",
    vote_average: 8.4,
    vote_count: 6800,
    popularity: 654.5,
    genre_ids: [16, 28, 12, 878],
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }],
    runtime: 140,
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Jake Johnson", "Issa Rae", "Jason Schwartzman"],
    tagline: "It's how you wear the mask.",
    trailer_url: "https://www.youtube.com/embed/oqxAJKy0R4A"
  },
  {
    id: 603,
    title: "The Matrix",
    overview: "Set in the 22nd century, a computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3wz6oo2eKVnEBnRUXB5YvUI.jpg",
    backdrop_path: "/7u3U981Z3xZ70G7uFYHOf0mTEJu.jpg",
    release_date: "1999-03-30",
    vote_average: 8.2,
    vote_count: 24900,
    popularity: 280.2,
    genre_ids: [28, 878],
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }],
    runtime: 136,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    tagline: "Free your mind.",
    trailer_url: "https://www.youtube.com/embed/vKQi3bBA1y8"
  },
  {
    id: 244786,
    title: "Whiplash",
    overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
    poster_path: "/7th699c2G7L6WwVz3Jb1b6E02eF.jpg",
    backdrop_path: "/6bbZ62kygflX523R6i2fkIXLpqO.jpg",
    release_date: "2014-10-10",
    vote_average: 8.4,
    vote_count: 14800,
    popularity: 260.1,
    genre_ids: [18, 10402],
    genres: [{ id: 18, name: "Drama" }, { id: 10402, name: "Music" }],
    runtime: 107,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist", "Austin Stowell"],
    tagline: "Not quite my tempo.",
    trailer_url: "https://www.youtube.com/embed/7d_jQyGldCw"
  },
  {
    id: 372058,
    title: "Your Name.",
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This bizarre occurrence happens randomly, and they must adjust their lives around each other.",
    poster_path: "/q719jXXEz5gt20mQCGS8PI2fwZ5.jpg",
    backdrop_path: "/dIWwZWj3jI9OyKW04eydyUF7e6t.jpg",
    release_date: "2016-08-26",
    vote_average: 8.5,
    vote_count: 11000,
    popularity: 240.7,
    genre_ids: [16, 18, 10749, 14],
    genres: [{ id: 16, name: "Animation" }, { id: 18, name: "Drama" }, { id: 10749, name: "Romance" }, { id: 14, name: "Fantasy" }],
    runtime: 106,
    director: "Makoto Shinkai",
    cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi", "Ryo Narita", "Aoi Yuki", "Nobunaga Shimazaki"],
    tagline: "Once in a while, when I wake up. I find myself crying.",
    trailer_url: "https://www.youtube.com/embed/hRfHcp2G654"
  },
  {
    id: 76600,
    title: "Avatar: The Way of Water",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    poster_path: "/t6TL7Vhn7FrZ7t7n7iCgVMU8W5y.jpg",
    backdrop_path: "/ovmZ211t66l1DqlFHtzI07CcN7q.jpg",
    release_date: "2022-12-14",
    vote_average: 7.6,
    vote_count: 10900,
    popularity: 590.2,
    genre_ids: [878, 12, 28],
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }, { id: 28, name: "Action" }],
    runtime: 192,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Kate Winslet", "Stephen Lang"],
    tagline: "Return to Pandora.",
    trailer_url: "https://www.youtube.com/embed/d9MyW72ELq0"
  }
];

// Helper to check if server-side key is valid
export const getApiKey = (): string | null => {
  const key = process.env.TMDB_API_KEY;
  if (!key || key.trim() === "" || key.includes("YOUR_TMDB_API_KEY_HERE")) {
    return null;
  }
  return key;
};

// Generic fetch handler with 1-hour cache revalidation for high performance
export const fetchTMDBServer = async <T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("TMDB API key not configured");
  }

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
    ...Object.entries(params).reduce((acc, [k, v]) => {
      acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    next: {
      revalidate: 3600 // Cache requests for 1 hour
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid TMDB API Key. Please verify .env.local configuration.");
    }
    throw new Error(`TMDB HTTP Error: ${response.statusText} (${response.status})`);
  }

  return response.json();
};
