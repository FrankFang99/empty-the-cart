import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SortAsc } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import ProductCard from '../components/common/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types';

export default function CategoryPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'price' | 'sales'>('default');
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find(c => c.id === id);

  useEffect(() => {
    let result = id === 'all' ? products : products.filter(p => p.category === id);
    
    if (sortBy === 'price') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'sales') {
      result = [...result].sort((a, b) => b.salesCount - a.salesCount);
    }
    
    setFilteredProducts(result);
  }, [id, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      
      <main className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl font-bold gradient-text">
            {category?.name || '全部商品'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            共 {filteredProducts.length} 件商品
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <Filter size={18} />
            筛选
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">排序:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-full bg-white shadow-md text-sm outline-none border-none"
            >
              <option value="default">默认</option>
              <option value="price">价格升序</option>
              <option value="sales">销量优先</option>
            </select>
          </div>
        </div>

        {/* Sub Categories */}
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {category.subCategories.map((sub) => (
              <button
                key={sub}
                className="px-4 py-2 rounded-full bg-white text-sm text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all shadow-sm"
              >
                {sub}
              </button>
            ))}
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无商品</p>
          </div>
        )}
      </main>
    </div>
  );
}
