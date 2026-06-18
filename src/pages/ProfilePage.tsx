import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit2, ShoppingBag, Heart, Settings, LogOut, Upload, X, ArrowLeft, Trash2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import ProductCard from '../components/common/ProductCard';
import { useUserStore } from '../stores/useUserStore';
import { useFavoriteStore } from '../stores/useFavoriteStore';
import { useCommentStore } from '../stores/useCommentStore';
import { useAchievementStore } from '../stores/useAchievementStore';

type ViewMode = 'profile' | 'favorites';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, updateUsername, updateAvatar, orders } = useUserStore();
  const { favorites, removeFavorite, isFavorite, getFavoriteCount } = useFavoriteStore();
  const { getCommentCountByUser } = useCommentStore();
  const { stats } = useAchievementStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const orderCount = orders.length;
  const favoriteCount = getFavoriteCount();
  const commentCount = getCommentCountByUser(user?.id || '');

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      updateUsername(newUsername.trim());
      setIsEditing(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (previewAvatar) {
      updateAvatar(previewAvatar);
      setShowAvatarUpload(false);
      setPreviewAvatar('');
    }
  };

  const handleGenerateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substr(2, 9);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    updateAvatar(newAvatar);
    setShowAvatarUpload(false);
    setPreviewAvatar('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative cursor-pointer"
              onClick={() => setShowAvatarUpload(true)}
            >
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <Upload size={16} className="text-white" />
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={user?.username}
                    className="px-3 py-2 rounded-lg border-2 border-purple-500 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveUsername}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white"
                  >
                    保存
                  </motion.button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Edit2 size={16} className="text-gray-400" />
                  </motion.button>
                </div>
              )}
              <p className="text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: '订单数', value: orderCount, icon: ShoppingBag, color: 'purple' },
            { label: '收藏数', value: favoriteCount, icon: Heart, color: 'pink' },
            { label: '评论数', value: commentCount, icon: User, color: 'blue' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl shadow p-4 text-center"
            >
              <stat.icon className={`text-${stat.color}-500 mx-auto`} size={24} />
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow"
        >
          {[
            { icon: ShoppingBag, label: '我的订单', action: () => navigate('/orders') },
            { icon: Heart, label: '我的收藏', action: () => setViewMode('favorites') },
            { icon: Settings, label: '账号设置', action: () => {} }
          ].map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              <item.icon className="text-gray-500" size={20} />
              <span className="text-gray-800">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={logout}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <LogOut size={20} />
          退出登录
        </motion.button>
      </main>

      {/* Avatar Upload Modal */}
      <AnimatePresence mode="wait">
        {viewMode === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setViewMode('profile')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={20} />
                <span>返回</span>
              </button>
              <h3 className="text-lg font-bold text-gray-800">我的收藏 ({favoriteCount})</h3>
              <div className="w-16" />
            </div>

            {favorites.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                <p>还没有收藏任何商品</p>
                <button
                  onClick={() => {
                    setViewMode('profile');
                    navigate('/');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white"
                >
                  去逛逛
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <ProductCard product={fav.product} />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(fav.productId)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showAvatarUpload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowAvatarUpload(false);
            setPreviewAvatar('');
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">更换头像</h3>
              <button
                onClick={() => {
                  setShowAvatarUpload(false);
                  setPreviewAvatar('');
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Preview */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={previewAvatar || user?.avatar}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-100"
                />
              </div>
            </div>

            {/* Upload Button */}
            <div className="mb-4">
              <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 cursor-pointer transition-colors">
                <Upload size={20} className="text-gray-500" />
                <span className="text-gray-600">上传头像图片</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Generate Random Avatar */}
            <button
              onClick={handleGenerateRandomAvatar}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <User size={20} />
              <span>随机生成头像</span>
            </button>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowAvatarUpload(false);
                  setPreviewAvatar('');
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                取消
              </button>
              <button
                onClick={handleSaveAvatar}
                disabled={!previewAvatar}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white disabled:opacity-50"
              >
                保存头像
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}