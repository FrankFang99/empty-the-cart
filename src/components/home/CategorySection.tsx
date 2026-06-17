import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/products';
import { Sparkles } from 'lucide-react';

export default function CategorySection() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold gradient-text flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          狂欢专区
        </h2>
        <Link
          to="/category/all"
          className="text-sm text-pink-500 hover:text-purple-500 font-medium transition-colors"
        >
          查看全部 &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="group"
          >
            <Link
              to={`/category/${category.id}`}
              className="block h-28 md:h-36 rounded-xl text-white shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
            >
              {/* Background Image */}
              {category.bgImage && (
                <img
                  src={category.bgImage}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              
              {/* Color Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t" style={{
                background: `linear-gradient(to top, ${category.color}dd 0%, ${category.color}44 50%, transparent 100%)`
              }} />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-3 md:p-4">
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="font-bold text-base md:text-lg drop-shadow-lg"
                >
                  {category.name}
                </motion.h3>
                <p className="text-[10px] md:text-xs opacity-80 mt-0.5">精选好物</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
