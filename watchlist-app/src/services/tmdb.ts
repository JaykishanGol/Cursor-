import axios from 'axios';
import type { Movie, TVShow, Genre, TMDBResponse } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbApi = {
  // Movies
  getTrendingMovies: () => 
    tmdbClient.get<TMDBResponse<Movie>>('/trending/movie/week'),
  
  getPopularMovies: () => 
    tmdbClient.get<TMDBResponse<Movie>>('/movie/popular'),
  
  getTopRatedMovies: () => 
    tmdbClient.get<TMDBResponse<Movie>>('/movie/top_rated'),
  
  getUpcomingMovies: () => 
    tmdbClient.get<TMDBResponse<Movie>>('/movie/upcoming'),
  
  getMovieDetails: (id: number) => 
    tmdbClient.get<Movie>(`/movie/${id}`),
  
  // TV Shows
  getTrendingTVShows: () => 
    tmdbClient.get<TMDBResponse<TVShow>>('/trending/tv/week'),
  
  getPopularTVShows: () => 
    tmdbClient.get<TMDBResponse<TVShow>>('/tv/popular'),
  
  getTopRatedTVShows: () => 
    tmdbClient.get<TMDBResponse<TVShow>>('/tv/top_rated'),
  
  getTVShowDetails: (id: number) => 
    tmdbClient.get<TVShow>(`/tv/${id}`),
  
  // Search
  searchMulti: (query: string, page = 1) => 
    tmdbClient.get<TMDBResponse<Movie | TVShow>>('/search/multi', {
      params: { query, page }
    }),
  
  searchMovies: (query: string, page = 1) => 
    tmdbClient.get<TMDBResponse<Movie>>('/search/movie', {
      params: { query, page }
    }),
  
  searchTVShows: (query: string, page = 1) => 
    tmdbClient.get<TMDBResponse<TVShow>>('/search/tv', {
      params: { query, page }
    }),
  
  // Genres
  getMovieGenres: () => 
    tmdbClient.get<{ genres: Genre[] }>('/genre/movie/list'),
  
  getTVGenres: () => 
    tmdbClient.get<{ genres: Genre[] }>('/genre/tv/list'),
  
  // Discover
  discoverMovies: (params: Record<string, any> = {}) => 
    tmdbClient.get<TMDBResponse<Movie>>('/discover/movie', { params }),
  
  discoverTVShows: (params: Record<string, any> = {}) => 
    tmdbClient.get<TMDBResponse<TVShow>>('/discover/tv', { params }),
};

export const getImageUrl = (path: string | null, size = 'w500') => {
  if (!path) return '/placeholder-poster.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size = 'w1280') => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
