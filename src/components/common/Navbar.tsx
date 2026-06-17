import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
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
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-8 text-xs text-gray-500">
            {/* Left Links */}
            <div className="flex items-center space-x-4">
              <span>中国大陆</span>
              <span className="text-gray-300">|</span>
              {isLoggedIn ? (
                <>
                  <span className="text-orange-500">{user?.username}</span>
                  <button onClick={logout} className="hover:text-orange-500">退出</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-orange-500">亲，请登录</Link>
                  <Link to="/login" className="hover:text-orange-500">免费注册</Link>
                </>
              )}
            </div>
            
            {/* Right Links */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-orange-500">我的淘宝</Link>
              <Link to="/cart" className="hover:text-orange-500 flex items-center">
                <ShoppingCart size={14} className="mr-1" />
                购物车
                {getItemCount() > 0 && (
                  <span className="ml-1 bg-orange-500 text-white px-1.5 py-0.5 rounded text-xs">
                    {getItemCount()}
                  </span>
                )}
              </Link>
              <Link to="/orders" className="hover:text-orange-500">我的订单</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Area */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-orange-500">
              淘
            </Link>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex border-2 border-orange-500 rounded overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索商品，体验购物快感..."
                  className="flex-1 px-4 py-2.5 outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-2.5 font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  搜索
                </button>
              </div>
            </form>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center py-2.5 space-x-6 text-sm">
            <span className="font-bold text-gray-800">主题市场</span>
            <Link to="/category/digital" className="text-gray-600 hover:text-orange-500 font-medium">数码电器</Link>
            <Link to="/category/clothing" className="text-gray-600 hover:text-orange-500 font-medium">服装鞋包</Link>
            <Link to="/category/food" className="text-gray-600 hover:text-orange-500 font-medium">食品生鲜</Link>
            <Link to="/category/beauty" className="text-gray-600 hover:text-orange-500 font-medium">美妆护肤</Link>
            <Link to="/category/all" className="text-gray-600 hover:text-orange-500 font-medium">全部商品</Link>
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
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索商品..."
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </form>
              
              {/* Mobile Links */}
              <div className="space-y-2">
                <Link
                  to="/category/digital"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-2 text-gray-600"
                >
                  数码电器
                </Link>
                <Link
                  to="/category/clothing"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-2 text-gray-600"
                >
                  服装鞋包
                </Link>
                <Link
                  to="/category/food"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-2 text-gray-600"
                >
                  食品生鲜
                </Link>
                <Link
                  to="/category/beauty"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-2 text-gray-600"
                >
                  美妆护肤
                </Link>
              </div>
              
              {/* User */}
              {isLoggedIn ? (
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <span>{user?.username}</span>
                  </div>
                  <button onClick={logout} className="text-orange-500">退出</button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block text-center py-2 bg-orange-500 text-white rounded"
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