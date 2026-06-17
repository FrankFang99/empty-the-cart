import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { getProductById, getProductComments } from '../data/products';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import CommentSection from '../components/product/CommentSection';

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id || '');
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [currentSkuImage, setCurrentSkuImage] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);
  
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 text-center">
          <p className="text-gray-500">商品不存在</p>
        </main>
      </div>
    );
  }

  useEffect(() => {
    if (product.skuImages || product.skuPrices) {
      const specOrder = product.specs.map(s => s.name);
      const skuKey = specOrder.map(name => selectedSpecs[name] || product.specs.find(s => s.name === name)?.values[0] || '').join('-');
      
      if (product.skuImages?.[skuKey]) {
        setCurrentSkuImage(product.skuImages[skuKey]);
      } else {
        setCurrentSkuImage(product.images[0]);
      }
      
      if (product.skuPrices?.[skuKey]) {
        setCurrentPrice(product.skuPrices[skuKey]);
      } else {
        setCurrentPrice(product.price);
      }
    } else {
      setCurrentSkuImage(product.images[currentImage]);
      setCurrentPrice(product.price);
    }
  }, [selectedSpecs, product, currentImage]);

  useEffect(() => {
    const defaultSpecs: Record<string, string> = {};
    product.specs.forEach(spec => {
      if (spec.values.length > 0) {
        defaultSpecs[spec.name] = spec.values[0];
      }
    });
    setSelectedSpecs(defaultSpecs);
  }, [product]);

  const handleAddToCart = () => {
    const specs: Record<string, string> = {};
    product.specs.forEach(spec => {
      if (!selectedSpecs[spec.name]) {
        specs[spec.name] = spec.values[0];
      } else {
        specs[spec.name] = selectedSpecs[spec.name];
      }
    });
    
    addItem(product, quantity, specs, currentPrice);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleSpecSelect = (specName: string, value: string) => {
    setSelectedSpecs(prev => ({ ...prev, [specName]: value }));
  };

  const discount = Math.round((1 - currentPrice / product.originalPrice) * 100);

  const displayImage = currentSkuImage || product.images[currentImage];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
              <motion.img
                key={displayImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/400x400/f5f5f5/666666?text=${encodeURIComponent(product.name.substring(0, 6))}`;
                }}
              />
              
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg font-bold px-4 py-2 rounded-lg">
                  -{discount}%
                </div>
              )}
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(prev => Math.max(0, prev - 1))}
                    disabled={currentImage === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow disabled:opacity-50"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentImage(prev => Math.min(product.images.length - 1, prev + 1))}
                    disabled={currentImage === product.images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow disabled:opacity-50"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImage ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-500 mt-2">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-red-500">
                ¥{currentPrice.toLocaleString()}
              </span>
              {product.originalPrice > currentPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                {product.rating}
              </span>
              <span>{product.reviews}评价</span>
              <span>已售{product.salesCount.toLocaleString()}</span>
            </div>

            {product.specs.length > 0 && (
              <div className="space-y-4">
                {product.specs.map((spec) => (
                  <div key={spec.name}>
                    <label className="text-sm font-medium text-gray-700">{spec.name}</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {spec.values.map((value) => (
                        <motion.button
                          key={value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSpecSelect(spec.name, value)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                            selectedSpecs[spec.name] === value
                              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {value}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">数量</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-2 text-center w-12">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                加入购物车
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Heart size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            {showAddedToCart && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-green-100 text-green-600 text-center"
              >
                ✅ 已加入购物车！
              </motion.div>
            )}
          </motion.div>
        </div>

        <CommentSection productId={id || ''} />
      </main>
    </div>
  );
}