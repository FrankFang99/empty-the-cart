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

// 基于 email 生成稳定的用户 id（同一邮箱多次登录不会改变）
const generateUserId = (email: string) => {
  let hash = 0;
  const str = email.toLowerCase().trim();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `user-${Math.abs(hash).toString(36)}`;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      orders: [],

      login: (email, username) => {
        const existing = get().user;
        const id = existing?.id || generateUserId(email);
        const user = {
          id,
          email,
          username,
          avatar: generateAvatar(username)
        };
        // 关键：保留之前的 orders，不要丢失
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        // 退出登录时清空 user 和 isLoggedIn，但保留 orders（避免数据丢失）
        set({ user: null, isLoggedIn: false });
      },

      addOrder: (order) => {
        set({ orders: [...get().orders, order] });
      },

      updateUsername: (username) => {
        if (get().user) {
          const currentAvatar = get().user!.avatar;
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
      name: 'dopamine-user',
      version: 1,
      // partialize：只持久化数据字段，不持久化函数
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        orders: state.orders
      })
    }
  )
);
