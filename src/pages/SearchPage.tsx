import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import ProductCard from '../components/common/ProductCard';
import { searchProducts } from '../data/products';
import { Product } from '../types';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query) {
      setResults(searchProducts(query));
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2">
            <Search className="text-purple-500" size={24} />
            <h1 className="text-xl font-bold text-gray-800">
              搜索结果: {query}
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            找到 {results.length} 件商品
          </p>
        </motion.div>

        {/* Results */}
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow"
          >
            <Search className="text-gray-300 mx-auto" size={64} />
            <p className="text-gray-500 mt-4">未找到相关商品</p>
            <p className="text-gray-400 text-sm mt-2">试试其他关键词吧</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}