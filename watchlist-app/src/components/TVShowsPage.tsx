import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MediaCard } from './MediaCard';
import { LoadingSpinner } from './LoadingSpinner';
import { SearchBar } from './SearchBar';
import { tmdbApi } from '../services/tmdb';
import type { TVShow } from '../types';

export const TVShowsPage: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [searchResults, setSearchResults] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'popular' | 'top_rated'>('popular');

  const categories = [
    { id: 'popular', label: '🔥 Popular', api: tmdbApi.getPopularTVShows },
    { id: 'top_rated', label: '⭐ Top Rated', api: tmdbApi.getTopRatedTVShows },
  ] as const;

  useEffect(() => {
    loadTVShows();
  }, [activeCategory]);

  const loadTVShows = async () => {
    setIsLoading(true);
    try {
      const category = categories.find(c => c.id === activeCategory);
      if (category) {
        const response = await category.api();
        setTVShows(response.data.results);
      }
    } catch (error) {
      console.error('Error loading TV shows:', error);
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
      const response = await tmdbApi.searchTVShows(query);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching TV shows:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const displayTVShows = searchQuery ? searchResults : tvShows;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-white">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            TV Shows
          </span>
        </h1>
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for TV shows..."
          />
        </div>
      </motion.div>

      {/* Category Filters */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="glass rounded-2xl p-2 flex space-x-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {(isLoading || searchLoading) && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {/* TV Shows Grid */}
      {!isLoading && !searchLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {searchQuery && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Search Results for "{searchQuery}"
              </h2>
              <span className="text-white/60">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          )}

          {displayTVShows.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {displayTVShows.map((show) => (
                <motion.div
                  key={show.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                >
                  <MediaCard item={show} type="tv" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">
                {searchQuery 
                  ? `No TV shows found for "${searchQuery}"`
                  : 'No TV shows available'
                }
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
