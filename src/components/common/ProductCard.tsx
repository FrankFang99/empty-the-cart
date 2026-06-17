import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-300 shadow-md hover:shadow-xl transition-all"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fef3f8/9d4edd?text=${encodeURIComponent(product.name.substring(0, 6))}`;
            }}
          />
          
          {/* Discount Badge - Smaller on mobile */}
          {discount > 0 && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute top-1 left-1 md:top-2 md:left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}
          
          {/* Sparkle Effect - Hidden on mobile */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden md:block absolute top-2 right-2 text-yellow-400"
          >
            <Sparkles size={16} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-2.5 md:p-3">
          {/* Name */}
          <h3 className="text-xs md:text-sm text-gray-800 line-clamp-2 leading-tight hover:text-pink-600 transition-colors min-h-[2rem] md:min-h-[2.5rem] font-medium">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-1.5 md:mt-2 flex items-baseline gap-1">
            <span className="text-base md:text-lg font-bold gradient-text">¥{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] md:text-xs text-gray-400 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stats - Hidden on mobile */}
          <div className="hidden md:flex mt-2 items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
              销量 {product.salesCount.toLocaleString()}
            </span>
            <span>⭐ {product.rating}</span>
          </div>

          {/* Shop - Hidden on mobile */}
          <div className="hidden md:block mt-1 text-xs text-pink-500 truncate font-medium">
            {product.subCategory}专区
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
