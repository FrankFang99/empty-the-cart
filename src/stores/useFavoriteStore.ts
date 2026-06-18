import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteItem, Product } from '../types';

interface FavoriteState {
  favorites: FavoriteItem[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (product) => {
        const favorites = get().favorites;
        const exists = favorites.some(f => f.productId === product.id);
        if (exists) return;
        
        set({
          favorites: [...favorites, {
            id: `fav-${Date.now()}`,
            productId: product.id,
            product,
            addedAt: new Date()
          }]
        });
      },
      
      removeFavorite: (productId) => {
        set({
          favorites: get().favorites.filter(f => f.productId !== productId)
        });
      },
      
      isFavorite: (productId) => {
        return get().favorites.some(f => f.productId === productId);
      },
      
      getFavoriteCount: () => {
        return get().favorites.length;
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      }
    }),
    {
      name: 'dopamine-favorites-storage',
      version: 1
    }
  )
);