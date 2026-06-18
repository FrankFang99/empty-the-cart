import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { getProductById, getProductComments } from '../data/products';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { useCommentStore } from '../stores/useCommentStore';
import { useFavoriteStore } from '../stores/useFavoriteStore';
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  const { addItem } = useCartStore();
  const { isLoggedIn, user } = useUserStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Navbar />
        <main className="pt-32 text-center px-4">
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

  useEffect(() => {
    if (product) {
      setIsFavorited(isFavorite(product.id));
    }
  }, [product, isFavorite]);

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

  const handleFavorite = () => {
    if (!isLoggedIn) {
      alert('请先登录！');
      return;
    }
    if (isFavorited) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/#/product/${product.id}`;
    const shareText = `快来看看这款${product.name}！`;
    
    if (platform === 'wechat') {
      alert(`已复制链接到剪贴板！\n\n链接: ${shareUrl}\n\n请在微信中粘贴分享给好友`);
      navigator.clipboard.writeText(shareUrl);
    } else if (platform === 'qq') {
      const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
      window.open(qqUrl, '_blank');
    } else if (platform === 'weibo') {
      const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
      window.open(weiboUrl, '_blank');
    }
    
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareOptions(false);
    }, 1500);
  };

  const discount = Math.round((1 - currentPrice / product.originalPrice) * 100);

  const displayImage = currentSkuImage || product.images[currentImage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      
      <main className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        {/* Mobile View */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative mb-6"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <motion.img
                key={displayImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fef3f8/9d4edd?text=${encodeURIComponent(product.name.substring(0, 6))}`;
                }}
              />
              
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                  -{discount}% OFF
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${
                      index === currentImage ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-5 mb-4"
          >
            <h1 className="text-lg font-bold text-gray-800 leading-tight">{product.name}</h1>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-2xl font-bold gradient-text">¥{currentPrice.toLocaleString()}</span>
              {product.originalPrice > currentPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-yellow-500" size={14} />
                {product.rating}
              </span>
              <span>{product.reviews}评价</span>
              <span>已售{product.salesCount.toLocaleString()}</span>
            </div>
          </motion.div>

          {product.specs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-5 mb-4"
            >
              {product.specs.map((spec) => (
                <div key={spec.name} className="mb-4 last:mb-0">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">{spec.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {spec.values.map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSpecSelect(spec.name, value)}
                        className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                          selectedSpecs[spec.name] === value
                            ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-5 mb-4"
          >
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">数量</label>
              <div className="flex items-center border-2 border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-center w-10 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 flex gap-3 shadow-lg z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavorite}
              className={`flex-1 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
                isFavorited 
                  ? 'bg-red-50 text-red-500' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Heart size={18} className={isFavorited ? 'fill-red-500' : ''} />
            </motion.button>
            
            <div className="relative flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="w-full py-3 rounded-full bg-gray-100 text-gray-600 font-medium flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
              </motion.button>
              
              <AnimatePresence>
                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg p-3"
                  >
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handleShare('wechat')}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          微
                        </div>
                        <span className="text-xs text-gray-600">微信</span>
                      </button>
                      <button
                        onClick={() => handleShare('qq')}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          QQ
                        </div>
                        <span className="text-xs text-gray-600">QQ</span>
                      </button>
                      <button
                        onClick={() => handleShare('weibo')}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          微
                        </div>
                        <span className="text-xs text-gray-600">微博</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg"
            >
              加入购物车
            </motion.button>
          </motion.div>

          {showAddedToCart && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-32 left-1/2 -translate-x-1/2 z-50 p-4 rounded-full bg-green-500 text-white font-medium shadow-lg"
            >
              ✅ 已加入购物车！
            </motion.div>
          )}

          {shareSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-32 left-1/2 -translate-x-1/2 z-50 p-4 rounded-full bg-blue-500 text-white font-medium shadow-lg"
            >
              ✅ 分享成功！
            </motion.div>
          )}

          <div className="pt-24 pb-8">
            <CommentSection productId={id || ''} />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
                <motion.img
                  key={displayImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fef3f8/9d4edd?text=${encodeURIComponent(product.name.substring(0, 6))}`;
                  }}
                />
                
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                    -{discount}% OFF
                  </div>
                )}
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage(prev => Math.max(0, prev - 1))}
                      disabled={currentImage === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-lg disabled:opacity-50 hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setCurrentImage(prev => Math.min(product.images.length - 1, prev + 1))}
                      disabled={currentImage === product.images.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-lg disabled:opacity-50 hover:bg-white transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImage ? 'border-pink-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
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
                <span className="text-3xl font-bold gradient-text">¥{currentPrice.toLocaleString()}</span>
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
                            className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                              selectedSpecs[spec.name] === value
                                ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm'
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
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2 hover:bg-gray-100 rounded-l-full"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 text-center w-12 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-full"
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
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  加入购物车
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFavorite}
                  className={`p-3 rounded-xl transition-colors ${
                    isFavorited 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Heart size={20} className={isFavorited ? 'fill-red-500' : ''} />
                </motion.button>
                
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showShareOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-lg p-3"
                      >
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleShare('wechat')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              微
                            </div>
                            <span className="text-sm text-gray-600">微信</span>
                          </button>
                          <button
                            onClick={() => handleShare('qq')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              QQ
                            </div>
                            <span className="text-sm text-gray-600">QQ</span>
                          </button>
                          <button
                            onClick={() => handleShare('weibo')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              微
                            </div>
                            <span className="text-sm text-gray-600">微博</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {showAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-green-100 text-green-600 text-center"
                >
                  ✅ 已加入购物车！
                </motion.div>
              )}
            </motion.div>
          </div>

          <CommentSection productId={id || ''} />
        </div>
      </main>
    </div>
  );
}
