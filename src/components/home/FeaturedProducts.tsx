import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../common/ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = products
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <Flame className="text-orange-500" size={18} />
          热门推荐
        </h2>
        <Link
          to="/category/all"
          className="text-sm text-orange-500 hover:text-orange-600"
        >
          查看全部 &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}