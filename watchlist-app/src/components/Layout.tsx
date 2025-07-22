import React from 'react';
import { motion } from 'framer-motion';
import { Search, Film, Tv, BookmarkCheck } from 'lucide-react';
import { useWatchlistStore } from '../stores/watchlistStore';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const watchlistItems = useWatchlistStore((state) => state.items);
  
  const navigationItems = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'watchlist', label: 'Watchlist', icon: BookmarkCheck, count: watchlistItems.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl">Watchlist</span>
              </motion.div>

              <div className="flex items-center space-x-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                      currentView === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                      {item.count && item.count > 0 && (
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>
    </div>
  );
};
