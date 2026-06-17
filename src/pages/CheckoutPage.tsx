import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { Order } from '../types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isLoggedIn, addOrder } = useUserStore();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePayment = () => {
    // 创建订单
    const order: Order = {
      id: `order-${Date.now()}`,
      userId: user?.id || 'guest',
      items: items.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalPrice: getTotal(),
      status: 'pending',
      createdAt: new Date()
    };
    
    if (isLoggedIn) {
      addOrder(order);
    }
    
    // 清空购物车并跳转到成功页面
    clearCart();
    navigate('/success', { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"
            >
              <CreditCard className="text-white" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">模拟结算</h1>
            <p className="text-gray-500 mt-2">
              💡 这只是模拟结算，不会产生任何实际费用
            </p>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingBag size={20} />
              订单商品 ({items.length}件)
            </h2>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{item.product.name}</p>
                    <p className="text-xs text-gray-500">数量: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-red-500">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-800 mb-4">支付方式</h2>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'alipay', name: '支付宝', icon: '💳', color: 'blue' },
                { id: 'wechat', name: '微信支付', icon: '💚', color: 'green' },
                { id: 'card', name: '银行卡', icon: '💰', color: 'purple' }
              ].map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50 text-center"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <p className="text-sm font-medium mt-2">{method.name}</p>
                </motion.button>
              ))}
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              选择任意支付方式，都不会产生实际扣款
            </p>
          </div>

          {/* Summary */}
          <div className="border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">应付金额</span>
              <span className="text-2xl font-bold text-red-500">
                ¥{getTotal().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bonus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-6 text-center"
          >
            <Gift className="text-orange-500 mx-auto" size={24} />
            <p className="text-orange-600 font-medium mt-2">
              🎉 清空购物车后，你将获得满满的成就感！
            </p>
          </motion.div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            确认支付（模拟）
            <ArrowRight size={24} />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}