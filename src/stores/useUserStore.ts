import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '../types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  orders: Order[];
  login: (email: string, username: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateUsername: (username: string) => void;
  updateAvatar: (avatar: string) => void;
}

// 生成随机头像
const generateAvatar = (username: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      orders: [],
      
      login: (email, username) => {
        const user = {
          id: `user-${Date.now()}`,
          email,
          username,
          avatar: generateAvatar(username)
        };
        set({ user, isLoggedIn: true });
      },
      
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      
      addOrder: (order) => {
        set({ orders: [...get().orders, order] });
      },
      
      updateUsername: (username) => {
        if (get().user) {
          const currentAvatar = get().user.avatar;
          const isCustomAvatar = !currentAvatar.includes('dicebear');
          set({
            user: {
              ...get().user!,
              username,
              avatar: isCustomAvatar ? currentAvatar : generateAvatar(username)
            }
          });
        }
      },
      
      updateAvatar: (avatar) => {
        if (get().user) {
          set({
            user: {
              ...get().user!,
              avatar
            }
          });
        }
      }
    }),
    {
      name: 'dopamine-user'
    }
  )
);