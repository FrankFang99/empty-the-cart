import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useCartStore } from '../stores/useCartStore';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      
      <main className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
            <ShoppingBag className="text-pink-500" size={28} />
            我的购物车
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length}件商品，总计 ¥{getTotal().toLocaleString()}
          </p>
        </motion.div>

        {/* Cart Items */}
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <ShoppingBag className="text-gray-300 mx-auto" size={64} />
              <p className="text-gray-500 mt-4">购物车空空如也</p>
              <p className="text-gray-400 text-sm mt-2">快去添加心仪的商品吧！</p>
              <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg"
              >
                去购物
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg p-4"
                  >
                    <div className="flex gap-4">
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link to={`/product/${item.productId}`}>
                          <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{item.product.name}</h3>
                        </Link>
                        
                        {Object.entries(item.selectedSpec).length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {Object.entries(item.selectedSpec).map(([key, value]) => `${key}: ${value}`).join(', ')}
                          </p>
                        )}
                        
                        <p className="text-pink-500 font-bold mt-2">
                          ¥{item.product.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border-2 border-gray-200 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-100 rounded-l-full"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-center w-8 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-100 rounded-r-full"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  清空购物车
                </button>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-lg p-5"
                    >
                      <div className="flex gap-4">
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-24 rounded-xl object-cover"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <Link to={`/product/${item.productId}`}>
                            <h3 className="font-medium text-gray-800 hover:text-pink-600 transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          
                          {Object.entries(item.selectedSpec).length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              {Object.entries(item.selectedSpec).map(([key, value]) => `${key}: ${value}`).join(', ')}
                            </p>
                          )}
                          
                          <p className="text-pink-500 font-bold mt-2 text-lg">
                            ¥{item.product.price.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center border-2 border-gray-200 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 rounded-l-full"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 text-center w-10">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 rounded-r-full"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => removeItem(item.productId)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    清空购物车
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-32"
                >
                  <h2 className="font-bold text-gray-800 mb-4">订单摘要</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">商品数量</span>
                      <span>{items.reduce((sum, item) => sum + item.quantity, 0)}件</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">商品总价</span>
                      <span className="text-pink-500 font-bold">¥{getTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">运费</span>
                      <span className="text-green-500">免运费</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">优惠</span>
                      <span className="text-orange-500">-¥0</span>
                    </div>
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">应付金额</span>
                      <span className="text-2xl font-bold gradient-text">
                        ¥{getTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    去结算
                    <ArrowRight size={20} />
                  </motion.button>
                  
                  <p className="text-center text-xs text-gray-400 mt-4">
                    💡 提示：结算不会产生实际费用
                  </p>
                </motion.div>
              </div>

              {/* Mobile Bottom Checkout */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs text-gray-500">应付金额</p>
                  <p className="text-lg font-bold gradient-text">¥{getTotal().toLocaleString()}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg flex items-center gap-2"
                >
                  去结算
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
