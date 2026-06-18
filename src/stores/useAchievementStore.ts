import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, ShoppingStats } from '../types';

interface AchievementState {
  achievements: Achievement[];
  stats: ShoppingStats;
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (achievementId: string, progress: number) => void;
  incrementCartCleared: () => void;
  incrementItemsAdded: () => void;
  incrementProductsViewed: () => void;
  incrementCommentsPosted: () => void;
  incrementFavoritesAdded: () => void;
  addSavedAmount: (amount: number) => void;
  addCategoryExplored: (category: string) => void;
  checkAndUnlockAchievements: () => void;
  resetStats: () => void;
}

const initialAchievements: Achievement[] = [
  { id: 'first-checkout', name: '初次体验', description: '完成首次清空购物车', icon: '🎉', unlocked: false, progress: 0, target: 1 },
  { id: 'shopping-maniac', name: '购物狂', description: '清空购物车10次', icon: '🛒', unlocked: false, progress: 0, target: 10 },
  { id: 'super-shopper', name: '超级买家', description: '清空购物车50次', icon: '🏆', unlocked: false, progress: 0, target: 50 },
  { id: 'saver-rookie', name: '省钱新手', description: '累计节省100元', icon: '💰', unlocked: false, progress: 0, target: 100 },
  { id: 'saver-master', name: '省钱达人', description: '累计节省1000元', icon: '💎', unlocked: false, progress: 0, target: 1000 },
  { id: 'saver-legend', name: '省钱传奇', description: '累计节省10000元', icon: '👑', unlocked: false, progress: 0, target: 10000 },
  { id: 'curious-cat', name: '好奇宝宝', description: '浏览10个商品', icon: '👀', unlocked: false, progress: 0, target: 10 },
  { id: 'shopper-expert', name: '购物专家', description: '浏览50个商品', icon: '📚', unlocked: false, progress: 0, target: 50 },
  { id: 'collector', name: '收藏家', description: '收藏5个商品', icon: '⭐', unlocked: false, progress: 0, target: 5 },
  { id: 'commenter', name: '评论家', description: '发表3条评论', icon: '💬', unlocked: false, progress: 0, target: 3 },
  { id: 'addict', name: '购物成瘾', description: '累计添加50件商品', icon: '🛍️', unlocked: false, progress: 0, target: 50 }
];

const initialStats: ShoppingStats = {
  totalSaved: 0,
  cartsCleared: 0,
  itemsAdded: 0,
  productsViewed: 0,
  commentsPosted: 0,
  favoritesAdded: 0,
  categoriesExplored: [],
  consecutiveDays: 0,
  lastVisitDate: new Date().toISOString().split('T')[0]
};

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,
      stats: initialStats,
      
      unlockAchievement: (achievementId) => {
        set({
          achievements: get().achievements.map(a =>
            a.id === achievementId ? { ...a, unlocked: true, unlockedAt: new Date() } : a
          )
        });
      },
      
      updateProgress: (achievementId, progress) => {
        const achievement = get().achievements.find(a => a.id === achievementId);
        if (!achievement || achievement.unlocked) return;
        
        const newProgress = Math.min(progress, achievement.target);
        set({
          achievements: get().achievements.map(a =>
            a.id === achievementId ? { ...a, progress: newProgress } : a
          )
        });
        
        if (newProgress >= achievement.target) {
          get().unlockAchievement(achievementId);
        }
      },
      
      incrementCartCleared: () => {
        const newCount = get().stats.cartsCleared + 1;
        set({ stats: { ...get().stats, cartsCleared: newCount } });
        get().checkAndUnlockAchievements();
      },
      
      incrementItemsAdded: () => {
        const newCount = get().stats.itemsAdded + 1;
        set({ stats: { ...get().stats, itemsAdded: newCount } });
        get().checkAndUnlockAchievements();
      },
      
      incrementProductsViewed: () => {
        const newCount = get().stats.productsViewed + 1;
        set({ stats: { ...get().stats, productsViewed: newCount } });
        get().checkAndUnlockAchievements();
      },
      
      incrementCommentsPosted: () => {
        const newCount = get().stats.commentsPosted + 1;
        set({ stats: { ...get().stats, commentsPosted: newCount } });
        get().checkAndUnlockAchievements();
      },
      
      incrementFavoritesAdded: () => {
        const newCount = get().stats.favoritesAdded + 1;
        set({ stats: { ...get().stats, favoritesAdded: newCount } });
        get().checkAndUnlockAchievements();
      },
      
      addSavedAmount: (amount) => {
        const newTotal = get().stats.totalSaved + amount;
        set({ stats: { ...get().stats, totalSaved: newTotal } });
        get().checkAndUnlockAchievements();
      },
      
      addCategoryExplored: (category) => {
        const categories = get().stats.categoriesExplored;
        if (!categories.includes(category)) {
          set({ stats: { ...get().stats, categoriesExplored: [...categories, category] } });
        }
      },
      
      checkAndUnlockAchievements: () => {
        const { stats } = get();
        get().updateProgress('first-checkout', stats.cartsCleared);
        get().updateProgress('shopping-maniac', stats.cartsCleared);
        get().updateProgress('super-shopper', stats.cartsCleared);
        get().updateProgress('saver-rookie', stats.totalSaved);
        get().updateProgress('saver-master', stats.totalSaved);
        get().updateProgress('saver-legend', stats.totalSaved);
        get().updateProgress('curious-cat', stats.productsViewed);
        get().updateProgress('shopper-expert', stats.productsViewed);
        get().updateProgress('collector', stats.favoritesAdded);
        get().updateProgress('commenter', stats.commentsPosted);
        get().updateProgress('addict', stats.itemsAdded);
      },
      
      resetStats: () => {
        set({ achievements: initialAchievements, stats: initialStats });
      }
    }),
    {
      name: 'dopamine-achievements-storage',
      version: 1
    }
  )
);