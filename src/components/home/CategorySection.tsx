import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/products';

export default function CategorySection() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">热门类目</h2>
        <Link
          to="/category/all"
          className="text-sm text-orange-500 hover:text-orange-600"
        >
          查看全部 &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Link
              to={`/category/${category.id}`}
              className="block p-4 rounded-lg text-white shadow-md hover:shadow-lg transition-all relative overflow-hidden"
            >
              {category.bgImage && (
                <img
                  src={category.bgImage}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color}88 backdrop-blur-sm`} />
              <div className="relative text-center">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-xs opacity-80 mt-1">精选好物</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}