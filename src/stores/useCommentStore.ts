import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment } from '../types';
import { mockComments } from '../data/products';

interface CommentState {
  comments: Comment[];
  addComment: (productId: string, userId: string, userName: string, userAvatar: string, content: string) => void;
  toggleLike: (commentId: string, userId: string) => void;
  getProductComments: (productId: string) => Comment[];
  replyToComment: (parentCommentId: string, productId: string, userId: string, userName: string, userAvatar: string, content: string) => void;
}

export const useCommentStore = create<CommentState>()(
  persist(
    (set, get) => ({
      comments: mockComments,
      
      addComment: (productId, userId, userName, userAvatar, content) => {
        const newComment: Comment = {
          id: `c-${Date.now()}`,
          productId,
          userId,
          userName,
          userAvatar,
          content,
          likesCount: 0,
          createdAt: new Date(),
          replies: []
        };
        set({ comments: [...get().comments, newComment] });
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
        set({ comments: updateLikes(get().comments) });
      },
      
      replyToComment: (parentCommentId, productId, userId, userName, userAvatar, content) => {
        const newReply: Comment = {
          id: `c-${Date.now()}`,
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
        
        set({ comments: addReply(get().comments) });
      },
      
      getProductComments: (productId) => {
        return get().comments
          .filter(c => c.productId === productId && !c.replyTo)
          .sort((a, b) => b.likesCount - a.likesCount);
      }
    }),
    {
      name: 'dopamine-comments'
    }
  )
);