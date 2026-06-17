import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Star, PartyPopper } from 'lucide-react';

interface CheckoutSuccessProps {
  totalAmount: number;
  itemCount: number;
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ totalAmount, itemCount }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * 100 - 50,
                  opacity: 1 
                }}
                animate={{ 
                  y: 400, 
                  x: Math.random() * 100 - 50,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut'
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#C9B1FF', '#FF8E72'][i % 5]
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="relative z-10 mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Package className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          下单成功！
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-gray-500 mb-6"
        >
          <PartyPopper className="w-5 h-5 text-yellow-500" />
          <span>恭喜您成功清空购物车，消费体验+100</span>
          <PartyPopper className="w-5 h-5 text-yellow-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">商品数量</span>
            <span className="font-semibold text-gray-800">{itemCount} 件</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-orange-200">
            <span className="text-gray-600">应付金额</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-red-500">¥</span>
              <span className="text-3xl font-bold text-red-500">{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-1 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            继续购物
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            返回首页
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-xs text-gray-400"
        >
          订单号：DD{Date.now()} | 感谢您的体验，这是一次模拟购物，不会产生真实费用
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;