import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search movies and TV shows...",
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative glass rounded-2xl transition-all duration-300 ${
        isFocused ? 'ring-2 ring-purple-500/50 scale-105' : ''
      }`}>
        <div className="flex items-center p-4">
          <Search className="w-5 h-5 text-white/60 mr-3" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
          />

          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors duration-200 ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-white/60" />
            </motion.button>
          )}

          <motion.button
            type="submit"
            className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </div>

        {/* Search suggestions/recent searches could go here */}
        {isFocused && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-2 z-50"
          >
            <div className="text-white/60 text-sm p-2">
              Press Enter to search for "{query}"
            </div>
          </motion.div>
        )}
      </div>

      {/* Animated background glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 transition-all duration-500 -z-10 blur-xl ${
        isFocused ? 'from-purple-500/30 to-pink-500/30' : ''
      }`} />
    </motion.form>
  );
};
