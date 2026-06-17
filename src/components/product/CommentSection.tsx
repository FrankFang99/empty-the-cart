import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Reply, UserPlus } from 'lucide-react';
import { useCommentStore } from '../../stores/useCommentStore';
import { useUserStore } from '../../stores/useUserStore';
import { Comment } from '../../types';

interface CommentSectionProps {
  productId: string;
}

function CommentItem({ comment, onLike, onReply }: {
  comment: Comment;
  onLike: (id: string) => void;
  onReply: (comment: Comment) => void;
}) {
  return (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex gap-4">
        <img
          src={comment.userAvatar}
          alt={comment.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">{comment.userName}</span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{comment.content}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-sm ${
                comment.isLiked ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <Heart
                size={16}
                className={comment.isLiked ? 'fill-red-500' : ''}
              />
              <span>{comment.likesCount}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onReply(comment)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-500 transition-colors"
            >
              <Reply size={16} />
              <span>回复</span>
            </motion.button>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex gap-3">
                  <img
                    src={reply.userAvatar}
                    alt={reply.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-800">{reply.userName}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CommentSection({ productId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const { addComment, toggleLike, getProductComments, replyToComment } = useCommentStore();
  const { user, isLoggedIn } = useUserStore();
  
  const productComments = getProductComments(productId);

  const handleAddComment = () => {
    if (!isLoggedIn || !user) return;
    if (!newComment.trim()) return;
    
    if (replyTo) {
      replyToComment(replyTo.id, productId, user.id, user.username, user.avatar, newComment.trim());
    } else {
      addComment(productId, user.id, user.username, user.avatar, newComment.trim());
    }
    setNewComment('');
    setReplyTo(null);
  };

  const handleLike = (commentId: string) => {
    if (!isLoggedIn) return;
    toggleLike(commentId, user?.id || '');
  };

  const handleReply = (comment: Comment) => {
    setReplyTo(comment);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <MessageCircle size={24} className="text-purple-500" />
        用户评论 ({productComments.length})
      </h2>

      {/* Add Comment */}
      {isLoggedIn ? (
        <div className="mb-6">
          <div className="flex gap-4">
            <img
              src={user?.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              {replyTo && (
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                  <Reply size={14} />
                  <span>回复 {replyTo.userName}</span>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    取消
                  </button>
                </div>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyTo ? `回复 ${replyTo.userName}...` : '分享你的购物体验...'}
                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  <Send size={18} />
                  {replyTo ? '回复评论' : '发送评论'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-lg bg-gray-100 text-center text-gray-500 flex items-center justify-center gap-2">
          <UserPlus size={18} />
          请登录后发表评论
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {productComments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            暂无评论，快来抢沙发吧！
          </div>
        ) : (
          productComments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}