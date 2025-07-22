export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface WatchlistItem {
  id: string;
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  status: 'want_to_watch' | 'watching' | 'watched';
  rating?: number;
  notes?: string;
  addedAt: Date;
  watchedAt?: Date;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  query?: string;
  genre?: number;
  year?: number;
  sortBy?: 'popularity' | 'vote_average' | 'release_date';
  type?: 'movie' | 'tv' | 'all';
}
