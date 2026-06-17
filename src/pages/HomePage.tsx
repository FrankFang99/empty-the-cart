import Navbar from '../components/common/Navbar';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="pt-28 pb-8 px-4 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Categories */}
        <CategorySection />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Info Banner */}
        <div className="mt-6 p-4 bg-white rounded border border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-bold text-orange-600 mb-1">
              什么是多巴胺购物？
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              这是一个模拟购物体验的平台，让你在不花钱的情况下，体验"清空购物车"的快感。
              灵感来自韩国流行的"dopamine shopping"网站，帮助冲动消费的年轻人获得购物的满足感，同时保护钱包。
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            © 2024 多巴胺购物平台 - 仅供娱乐，不会产生任何实际费用
          </p>
        </div>
      </footer>
    </div>
  );
}