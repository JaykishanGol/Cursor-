import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { MediaCard } from './MediaCard';
import { LoadingSpinner } from './LoadingSpinner';
import { tmdbApi } from '../services/tmdb';
import type { Movie, TVShow } from '../types';

export const DiscoverPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTrendingContent();
  }, []);

  const loadTrendingContent = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([
        tmdbApi.getTrendingMovies(),
        tmdbApi.getTrendingTVShows(),
      ]);

      setTrendingMovies(moviesResponse.data.results.slice(0, 8));
      setTrendingTVShows(tvResponse.data.results.slice(0, 8));
    } catch (error) {
      console.error('Error loading trending content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await tmdbApi.searchMulti(query);
      setSearchResults(response.data.results.slice(0, 20));
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section with Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Discover Your Next
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Obsession
            </span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Find and track movies and TV shows you love. Your personal entertainment universe awaits.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </motion.div>

      {/* Search Results */}
      {searchQuery && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Search Results for "{searchQuery}"
            </h2>
            {searchLoading && <LoadingSpinner size="sm" />}
          </div>

          {searchResults.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {searchResults.map((item) => {
                const type = 'title' in item ? 'movie' : 'tv';
                return (
                  <motion.div key={`${type}-${item.id}`} variants={itemVariants}>
                    <MediaCard item={item} type={type} />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : !searchLoading && searchQuery && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No results found for "{searchQuery}"</p>
            </div>
          )}
        </motion.section>
      )}

      {/* Trending Content */}
      {!searchQuery && (
        <>
          {/* Trending Movies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white flex items-center">
              🔥 Trending Movies
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
            >
              {trendingMovies.map((movie) => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MediaCard item={movie} type="movie" />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Trending TV Shows */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white flex items-center">
              📺 Trending TV Shows
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
            >
              {trendingTVShows.map((show) => (
                <motion.div key={show.id} variants={itemVariants}>
                  <MediaCard item={show} type="tv" />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </>
      )}
    </div>
  );
};
