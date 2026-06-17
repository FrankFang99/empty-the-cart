import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, PartyPopper, Sparkles } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { useUserStore } from '../../stores/useUserStore';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { getItemCount } = useCartStore();
  const { user, isLoggedIn, logout } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Navigation Bar - Carnival Style */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-8 text-xs">
            {/* Left Links */}
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="twinkle" />
                多巴胺购物狂欢节
              </span>
              <span className="text-white/60">|</span>
              {isLoggedIn ? (
                <>
                  <span className="font-bold">{user?.username}</span>
                  <button onClick={logout} className="hover:text-yellow-300 transition-colors">退出</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-yellow-300 transition-colors">登录</Link>
                  <Link to="/login" className="hover:text-yellow-300 transition-colors">注册</Link>
                </>
              )}
            </div>
            
            {/* Right Links */}
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-yellow-300 transition-colors flex items-center gap-1">
                <User size={12} />
                我的
              </Link>
              <Link to="/cart" className="hover:text-yellow-300 transition-colors flex items-center">
                <ShoppingCart size={12} className="mr-1" />
                购物车
                {getItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1 bg-yellow-400 text-pink-600 px-1.5 py-0.5 rounded-full text-xs font-bold"
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </Link>
              <Link to="/orders" className="hover:text-yellow-300 transition-colors">订单</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Area - Carnival Style */}
      <div className="bg-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            {/* Logo - Carnival Style */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-shadow">
                  <PartyPopper size={24} className="text-white" />
                </div>
                <motion.div
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles size={10} className="text-pink-600" />
                </motion.div>
              </motion.div>
              <span className="text-2xl font-bold gradient-text">清空购物车</span>
            </Link>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex bg-gradient-to-r from-pink-50 to-purple-50 rounded-full border-2 border-transparent hover:border-pink-300 transition-all shadow-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索商品，体验购物快感..."
                  className="flex-1 px-6 py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  搜索
                </motion.button>
              </div>
            </form>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Category Navigation - Carnival Style */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center py-3 space-x-6 text-sm overflow-x-auto">
            <span className="font-bold text-pink-600 flex items-center gap-1 shrink-0">
              <Sparkles size={14} />
              狂欢专区
            </span>
            <Link to="/category/digital" className="text-gray-600 hover:text-pink-600 font-medium shrink-0 transition-colors">数码电器</Link>
            <Link to="/category/clothing" className="text-gray-600 hover:text-pink-600 font-medium shrink-0 transition-colors">服装鞋包</Link>
            <Link to="/category/food" className="text-gray-600 hover:text-pink-600 font-medium shrink-0 transition-colors">食品生鲜</Link>
            <Link to="/category/beauty" className="text-gray-600 hover:text-pink-600 font-medium shrink-0 transition-colors">美妆护肤</Link>
            <Link to="/category/all" className="text-gray-600 hover:text-pink-600 font-medium shrink-0 transition-colors">全部商品</Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-pink-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索商品..."
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:border-pink-400 outline-none transition-colors"
                />
              </form>
              
              {/* Mobile Links */}
              <div className="space-y-2">
                <Link
                  to="/category/digital"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-3 px-4 text-gray-600 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  数码电器
                </Link>
                <Link
                  to="/category/clothing"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-3 px-4 text-gray-600 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  服装鞋包
                </Link>
                <Link
                  to="/category/food"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-3 px-4 text-gray-600 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  食品生鲜
                </Link>
                <Link
                  to="/category/beauty"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-3 px-4 text-gray-600 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  美妆护肤
                </Link>
              </div>
              
              {/* User */}
              {isLoggedIn ? (
                <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                  <div className="flex items-center gap-2">
                    <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full border-2 border-pink-300" />
                    <span className="text-pink-600 font-medium">{user?.username}</span>
                  </div>
                  <button onClick={logout} className="text-pink-500 hover:text-pink-600 transition-colors">退出</button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block text-center py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg"
                >
                  登录/注册
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
