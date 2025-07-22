import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchlistItem } from '../types';

interface WatchlistStore {
  items: WatchlistItem[];
  addToWatchlist: (item: Omit<WatchlistItem, 'id' | 'addedAt'>) => void;
  removeFromWatchlist: (id: string) => void;
  updateWatchlistItem: (id: string, updates: Partial<WatchlistItem>) => void;
  getWatchlistItem: (tmdbId: number, type: 'movie' | 'tv') => WatchlistItem | undefined;
  isInWatchlist: (tmdbId: number, type: 'movie' | 'tv') => boolean;
  getFilteredItems: (status?: WatchlistItem['status']) => WatchlistItem[];
  markAsWatched: (id: string, rating?: number) => void;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWatchlist: (item) => {
        const newItem: WatchlistItem = {
          ...item,
          id: `${item.type}_${item.tmdbId}_${Date.now()}`,
          addedAt: new Date(),
        };
        
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      
      removeFromWatchlist: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateWatchlistItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      
      getWatchlistItem: (tmdbId, type) => {
        return get().items.find((item) => item.tmdbId === tmdbId && item.type === type);
      },
      
      isInWatchlist: (tmdbId, type) => {
        return get().items.some((item) => item.tmdbId === tmdbId && item.type === type);
      },
      
      getFilteredItems: (status) => {
        const items = get().items;
        if (!status) return items;
        return items.filter((item) => item.status === status);
      },
      
      markAsWatched: (id, rating) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: 'watched' as const,
                  watchedAt: new Date(),
                  ...(rating && { rating }),
                }
              : item
          ),
        }));
      },
      
      clearWatchlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'watchlist-storage',
    }
  )
);
