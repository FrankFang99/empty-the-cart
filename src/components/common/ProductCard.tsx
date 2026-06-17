import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';

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
      whileHover={{ y: -4, boxShadow: '0 4px 12px rgba(255, 80, 0, 0.15)' }}
      className="bg-white border border-gray-200 rounded overflow-hidden cursor-pointer hover:border-orange-500 transition-all"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // 如果图片加载失败，显示占位图
              (e.target as HTMLImageElement).src = `https://placehold.co/400x400/f5f5f5/666666?text=${encodeURIComponent(product.name.substring(0, 6))}`;
            }}
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Name */}
          <h3 className="text-sm text-gray-800 line-clamp-2 leading-tight hover:text-orange-500 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-bold text-orange-500">¥{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>销量 <span className="text-orange-500">{product.salesCount.toLocaleString()}</span></span>
            <span>评价 {product.reviews}</span>
          </div>

          {/* Shop */}
          <div className="mt-1 text-xs text-gray-500 truncate">
            {product.subCategory}旗舰店
          </div>
        </div>
      </Link>
    </motion.div>
  );
}