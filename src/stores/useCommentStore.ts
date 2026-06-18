import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment } from '../types';
import { mockComments } from '../data/products';

interface CommentState {
  userComments: Comment[];
  addComment: (productId: string, userId: string, userName: string, userAvatar: string, content: string) => void;
  toggleLike: (commentId: string, userId: string) => void;
  getProductComments: (productId: string) => Comment[];
  replyToComment: (parentCommentId: string, productId: string, userId: string, userName: string, userAvatar: string, content: string) => void;
  getCommentCountByUser: (userId: string) => number;
}

// 把 mockComments 和 userComments 合并，mock 数据优先用其原始值
const mergeAll = (userComments: Comment[]): Comment[] => {
  // 用 id 去重，防止用户评论和 mock 评论 id 冲突
  const mockIds = new Set(mockComments.map(c => c.id));
  const uniqueUser = userComments.filter(c => !mockIds.has(c.id));
  return [...mockComments, ...uniqueUser];
};

// 反序列化时把字符串转回 Date
const reviveDate = (raw: unknown): Date => {
  if (raw instanceof Date) return raw;
  if (typeof raw === 'string' || typeof raw === 'number') return new Date(raw);
  return new Date();
};

const reviveComment = (c: any): Comment => ({
  ...c,
  createdAt: reviveDate(c.createdAt),
  replies: Array.isArray(c.replies) ? c.replies.map(reviveComment) : []
});

export const useCommentStore = create<CommentState>()(
  persist(
    (set, get) => ({
      userComments: [],

      addComment: (productId, userId, userName, userAvatar, content) => {
        const newComment: Comment = {
          id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          productId,
          userId,
          userName,
          userAvatar,
          content,
          likesCount: 0,
          createdAt: new Date(),
          replies: []
        };
        set({ userComments: [...get().userComments, newComment] });
      },

      toggleLike: (commentId, userId) => {
        const updateLikes = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === commentId) {
              const isLiked = comment.isLiked;
              return {
                ...comment,
                likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
                isLiked: !isLiked
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: updateLikes(comment.replies)
              };
            }
            return comment;
          });
        };
        set({ userComments: updateLikes(get().userComments) });
      },

      replyToComment: (parentCommentId, productId, userId, userName, userAvatar, content) => {
        const newReply: Comment = {
          id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          productId,
          userId,
          userName,
          userAvatar,
          content,
          likesCount: 0,
          createdAt: new Date(),
          replyTo: parentCommentId
        };

        const addReply = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: addReply(comment.replies)
              };
            }
            return comment;
          });
        };

        set({ userComments: addReply(get().userComments) });
      },

      getProductComments: (productId) => {
        return mergeAll(get().userComments)
          .filter(c => c.productId === productId && !c.replyTo)
          .sort((a, b) => b.likesCount - a.likesCount);
      },

      getCommentCountByUser: (userId) => {
        return get().userComments.filter(c => c.userId === userId).length;
      }
    }),
    {
      name: 'dopamine-comments',
      version: 2,
      // 只持久化用户自己添加的评论，mock 数据始终来自代码
      partialize: (state) => ({
        userComments: state.userComments
      }),
      // 加载时把字符串 createdAt 转回 Date
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.userComments = state.userComments.map(reviveComment);
        }
      }
    }
  )
);
