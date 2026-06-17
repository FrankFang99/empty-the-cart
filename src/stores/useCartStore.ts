import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedSpec?: Record<string, string>, price?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, selectedSpec = {}, price) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.productId === product.id && 
          JSON.stringify(item.selectedSpec) === JSON.stringify(selectedSpec)
        );
        
        const itemPrice = price || product.price;
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id && 
              JSON.stringify(item.selectedSpec) === JSON.stringify(selectedSpec)
                ? { ...item, quantity: item.quantity + quantity, price: itemPrice }
                : item
            )
          });
        } else {
          set({
            items: [...items, {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              selectedSpec,
              price: itemPrice
            }]
          });
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.price || item.product.price) * item.quantity,
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'dopamine-cart'
    }
  )
);