import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Home, Receipt, PartyPopper } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { Order } from '../types';

// 烟花粒子动画组件
function Fireworks() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#C9B1FF', '#FF9F43', '#6C5CE7'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: '50%',
            y: '50%'
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: `${p.x}%`,
            y: `${p.y}%`
          }}
          transition={{ 
            duration: 3,
            delay: p.delay,
            ease: 'easeOut'
          }}
          className="absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Navbar />
      <Fireworks />
      
      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-20"
              />
              <div className="relative p-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500">
                <CheckCircle className="text-white" size={48} />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mt-6"
          >
            <PartyPopper className="inline-block mr-2" size={32} />
            支付成功！
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mt-4 text-lg"
          >
            🎉 恭喜你清空了购物车！
            <br />
            <span className="text-purple-500 font-medium">
              体验到了满满的购物快感，却没有花一分钱！
            </span>
          </motion.p>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-lg bg-gray-50"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Receipt size={20} />
              <span>订单号: {order.id}</span>
            </div>
            <p className="text-red-500 font-bold mt-2">
              订单金额: ¥{order.totalPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {order.items.length}件商品
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { label: '购物快感', value: '100%', icon: '😊' },
              { label: '实际花费', value: '¥0', icon: '💰' },
              { label: '钱包保护', value: '完美', icon: '🛡️' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                <p className="font-bold text-purple-600">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Link
              to="/orders"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium flex items-center gap-2 transition-colors"
            >
              <ShoppingBag size={20} />
              查看订单
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium flex items-center gap-2"
            >
              <Home size={20} />
              继续购物
            </Link>
          </motion.div>

          {/* Tip */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-400 mt-8"
          >
            💡 多巴胺购物平台 - 让你体验购物快感，保护你的钱包
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}