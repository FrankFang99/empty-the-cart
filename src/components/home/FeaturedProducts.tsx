import { Link } from 'react-router-dom';
import { Flame, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../common/ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = products
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold gradient-text flex items-center gap-2">
          <Flame className="text-pink-500" size={22} />
          热门狂欢
          <Sparkles className="text-yellow-500" size={18} />
        </h2>
        <Link
          to="/category/all"
          className="text-sm text-pink-500 hover:text-purple-500 font-medium transition-colors"
        >
          查看全部 &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4 md:gap-5">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
