import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShoppingBag, Gift, ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { useAchievementStore } from '../stores/useAchievementStore';
import { Order, OrderItem } from '../types';

const PAYMENT_METHODS = [
  { id: 'alipay', name: '支付宝', icon: '💳', borderColor: 'blue' },
  { id: 'wechat', name: '微信支付', icon: '💚', borderColor: 'green' },
  { id: 'card', name: '银行卡', icon: '💰', borderColor: 'purple' }
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isLoggedIn, addOrder } = useUserStore();
  const { incrementCartCleared, addSavedAmount, addCategoryExplored } = useAchievementStore();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // 计算节省金额
  const savedAmount = items.reduce((sum, item) => {
    return sum + (item.product.originalPrice - (item.price || item.product.price)) * item.quantity;
  }, 0);

  const handlePayment = () => {
    setIsProcessing(true);
    setShowAnimation(true);

    // 创建订单
    const orderItems: OrderItem[] = items.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      price: item.price || item.product.price,
      originalPrice: item.product.originalPrice,
      quantity: item.quantity,
      image: item.product.images[0]
    }));

    const order: Order = {
      id: `order-${Date.now()}`,
      userId: user?.id || 'guest',
      items: orderItems,
      totalPrice: getTotal(),
      savedAmount: savedAmount,
      status: 'completed',
      createdAt: new Date()
    };
    
    // 更新成就系统
    incrementCartCleared();
    addSavedAmount(savedAmount);
    
    // 记录浏览过的分类
    const categories = [...new Set(items.map(item => item.product.category))];
    categories.forEach(cat => addCategoryExplored(cat));
    
    // 保存订单
    if (isLoggedIn) {
      addOrder(order);
    }
    
    // 清空购物车
    clearCart();
    
    // 等待动画完成后跳转
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success', { state: { order, savedAmount } });
    }, 2000);
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
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedMethod === method.id;
                const borderColorClass = isSelected
                  ? method.borderColor === 'blue' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : method.borderColor === 'green' ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                  : 'border-purple-500 bg-purple-50 ring-2 ring-purple-500'
                  : 'border-gray-200 bg-white hover:border-gray-300';

                return (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${borderColorClass}`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <p className={`text-sm font-medium mt-2 ${isSelected ? 'font-bold' : ''}`}>{method.name}</p>
                  </motion.button>
                );
              })}
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
            whileHover={!('ontouchstart' in window) ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            确认支付（模拟）
            <ArrowRight size={24} />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}