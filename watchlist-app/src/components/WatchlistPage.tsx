import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkCheck, Clock, Eye, Star, Calendar, Trash2, Edit3 } from 'lucide-react';
import { useWatchlistStore } from '../stores/watchlistStore';
import { getImageUrl } from '../services/tmdb';
import type { WatchlistItem } from '../types';

export const WatchlistPage: React.FC = () => {
  const { items, removeFromWatchlist, updateWatchlistItem, markAsWatched } = useWatchlistStore();
  const [activeFilter, setActiveFilter] = useState<WatchlistItem['status'] | 'all'>('all');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');

  const statusFilters = [
    { id: 'all', label: 'All', icon: BookmarkCheck },
    { id: 'want_to_watch', label: 'Want to Watch', icon: Clock },
    { id: 'watching', label: 'Watching', icon: Eye },
    { id: 'watched', label: 'Watched', icon: Star },
  ] as const;

  const filteredItems = items.filter(item => 
    activeFilter === 'all' || item.status === activeFilter
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = [];
    acc[item.status].push(item);
    return acc;
  }, {} as Record<WatchlistItem['status'], WatchlistItem[]>);

  const handleEdit = (item: WatchlistItem) => {
    setEditingItem(item.id);
    setEditRating(item.rating || 0);
    setEditNotes(item.notes || '');
  };

  const handleSaveEdit = (item: WatchlistItem) => {
    updateWatchlistItem(item.id, {
      rating: editRating > 0 ? editRating : undefined,
      notes: editNotes.trim() || undefined,
    });
    setEditingItem(null);
  };

  const handleStatusChange = (item: WatchlistItem, newStatus: WatchlistItem['status']) => {
    updateWatchlistItem(item.id, { status: newStatus });
    if (newStatus === 'watched') {
      markAsWatched(item.id);
    }
  };

  const getStatusColor = (status: WatchlistItem['status']) => {
    switch (status) {
      case 'want_to_watch':
        return 'from-yellow-500 to-orange-500';
      case 'watching':
        return 'from-blue-500 to-purple-500';
      case 'watched':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="glass rounded-3xl p-12 max-w-md mx-auto">
          <BookmarkCheck className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your Watchlist is Empty</h2>
          <p className="text-white/70 mb-6">
            Start discovering movies and TV shows to build your personal collection.
          </p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Content
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">
          My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Watchlist</span>
        </h1>
        <p className="text-white/70 text-lg">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your collection
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="glass rounded-2xl p-2 flex space-x-2">
          {statusFilters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <filter.icon className="w-4 h-4" />
              <span className="font-medium">{filter.label}</span>
              <span className="bg-white/20 text-xs rounded-full px-2 py-1">
                {filter.id === 'all' ? items.length : (groupedItems[filter.id] || []).length}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Watchlist Items */}
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(item.poster_path, 'w300')}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`bg-gradient-to-r ${getStatusColor(item.status)} text-white px-3 py-1 rounded-lg text-sm font-medium`}>
                      {item.status.replace('_', ' ')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <motion.button
                      onClick={() => handleEdit(item)}
                      className="p-2 glass-dark rounded-lg text-white/80 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => removeFromWatchlist(item.id)}
                      className="p-2 glass-dark rounded-lg text-red-400 hover:text-red-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.release_date).getFullYear()}</span>
                      <span>•</span>
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>

                  {/* Status Controls */}
                  {editingItem === item.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-white/70 text-sm">Rating (1-10)</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={editRating}
                          onChange={(e) => setEditRating(Number(e.target.value))}
                          className="w-full mt-1 p-2 glass-dark rounded-lg text-white bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Notes</label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full mt-1 p-2 glass-dark rounded-lg text-white bg-transparent resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleSaveEdit(item)}
                          className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Save
                        </motion.button>
                        <motion.button
                          onClick={() => setEditingItem(null)}
                          className="flex-1 py-2 glass-dark text-white rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Rating */}
                      {item.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{item.rating}/10</span>
                        </div>
                      )}

                      {/* Notes */}
                      {item.notes && (
                        <p className="text-white/70 text-sm">{item.notes}</p>
                      )}

                      {/* Status Change Buttons */}
                      <div className="flex space-x-2">
                        {item.status !== 'watching' && (
                          <motion.button
                            onClick={() => handleStatusChange(item, 'watching')}
                            className="flex-1 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Mark as Watching
                          </motion.button>
                        )}
                        {item.status !== 'watched' && (
                          <motion.button
                            onClick={() => handleStatusChange(item, 'watched')}
                            className="flex-1 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-500/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Mark as Watched
                          </motion.button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60 text-lg">
              No items with status "{activeFilter === 'all' ? 'any' : activeFilter.replace('_', ' ')}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
