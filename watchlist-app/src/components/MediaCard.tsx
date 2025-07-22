import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Check, Calendar, Bookmark } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { useWatchlistStore } from '../stores/watchlistStore';
import type { Movie, TVShow } from '../types';

interface MediaCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
  onClick?: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, type, onClick }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, getWatchlistItem } = useWatchlistStore();
  
  const isMovie = type === 'movie';
  const title = isMovie ? (item as Movie).title : (item as TVShow).name;
  const releaseDate = isMovie ? (item as Movie).release_date : (item as TVShow).first_air_date;
  const inWatchlist = isInWatchlist(item.id, type);
  const watchlistItem = getWatchlistItem(item.id, type);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (inWatchlist && watchlistItem) {
      removeFromWatchlist(watchlistItem.id);
    } else {
      addToWatchlist({
        tmdbId: item.id,
        type,
        title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        release_date: releaseDate,
        vote_average: item.vote_average,
        overview: item.overview,
        status: 'want_to_watch',
      });
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl glass backdrop-blur-lg">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(item.poster_path)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Rating badge */}
          <div className="absolute top-3 left-3">
            <div className="glass-dark rounded-lg px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">
                {item.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Watchlist button */}
          <motion.button
            onClick={handleWatchlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-300 ${
              inWatchlist 
                ? 'bg-green-500/90 text-white' 
                : 'glass-dark text-white/70 hover:text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {inWatchlist ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </motion.button>

          {/* Watchlist status indicator */}
          {inWatchlist && watchlistItem && (
            <div className="absolute bottom-3 left-3">
              <div className={`glass-dark rounded-lg px-2 py-1 flex items-center space-x-1 ${
                watchlistItem.status === 'watched' ? 'bg-green-500/20' :
                watchlistItem.status === 'watching' ? 'bg-blue-500/20' :
                'bg-yellow-500/20'
              }`}>
                <Bookmark className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-medium capitalize">
                  {watchlistItem.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-white/60 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(releaseDate).getFullYear()}</span>
            </div>
            <span className="capitalize text-purple-300">{type}</span>
          </div>

          {item.overview && (
            <p className="text-white/70 text-sm mt-2 line-clamp-3 leading-relaxed">
              {item.overview}
            </p>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 -z-10 blur-xl" />
    </motion.div>
  );
};
