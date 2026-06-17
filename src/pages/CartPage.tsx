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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-purple-500" size={28} />
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
              className="text-center py-16 bg-white rounded-xl shadow"
            >
              <ShoppingBag className="text-gray-300 mx-auto" size={64} />
              <p className="text-gray-500 mt-4">购物车空空如也</p>
              <p className="text-gray-400 text-sm mt-2">快去添加心仪的商品吧！</p>
              <Link
                to="/"
                className="mt-6 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium"
              >
                去购物
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow p-4"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </Link>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <Link to={`/product/${item.productId}`}>
                          <h3 className="font-medium text-gray-800 hover:text-purple-600">
                            {item.product.name}
                          </h3>
                        </Link>
                        
                        {/* Specs */}
                        {Object.entries(item.selectedSpec).length > 0 && (
                          <p className="text-sm text-gray-500 mt-1">
                            {Object.entries(item.selectedSpec).map(([key, value]) => `${key}: ${value}`).join(', ')}
                          </p>
                        )}
                        
                        {/* Price */}
                        <p className="text-red-500 font-bold mt-2">
                          ¥{item.product.price.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end gap-2">
                        {/* Quantity */}
                        <div className="flex items-center border-2 border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-center w-8">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        {/* Delete */}
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
                
                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  清空购物车
                </button>
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="font-bold text-gray-800 mb-4">订单摘要</h2>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">商品数量</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)}件</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">商品总价</span>
                    <span className="text-red-500 font-bold">¥{getTotal().toLocaleString()}</span>
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
                    <span className="text-2xl font-bold text-red-500">
                      ¥{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  去结算
                  <ArrowRight size={20} />
                </motion.button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  💡 提示：结算不会产生实际费用
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}