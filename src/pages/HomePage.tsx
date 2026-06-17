import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      
      <main className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroBanner />
        </motion.div>
        
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategorySection />
        </motion.div>
        
        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturedProducts />
        </motion.div>
        
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-pink-200 shadow-xl">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-pink-400 rounded-tl-2xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-purple-400 rounded-br-2xl opacity-50"></div>
            
            <div className="text-center relative z-10">
              <h3 className="text-lg font-bold gradient-text mb-2 flex items-center justify-center gap-2">
                🎉 什么是多巴胺购物？
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                这是一个模拟购物体验的平台，让你在不花钱的情况下，体验"清空购物车"的快感。
                灵感来自韩国流行的"dopamine shopping"网站，帮助冲动消费的年轻人获得购物的满足感，同时保护钱包。
                加入我们，享受纯粹的购物乐趣！
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🛒</span>
              </div>
              <span className="font-bold text-lg">清空购物车</span>
            </div>
            <p className="text-sm opacity-80">
              © 2024 多巴胺购物狂欢节 - 仅供娱乐，不会产生任何实际费用
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <span>✨</span>
              <span>保护钱包，享受购物</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
