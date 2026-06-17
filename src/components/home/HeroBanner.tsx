import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Smartphone, Sparkles, Gift } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: '618大促',
    subtitle: '清空购物车，不花一分钱',
    gradient: 'from-orange-500 to-red-500',
    icon: ShoppingCart
  },
  {
    id: 2,
    title: '数码专区',
    subtitle: '手机电脑限时折扣',
    gradient: 'from-blue-500 to-cyan-400',
    icon: Smartphone
  },
  {
    id: 3,
    title: '美妆护肤',
    subtitle: '大牌护肤品超值优惠',
    gradient: 'from-pink-500 to-rose-400',
    icon: Sparkles
  },
  {
    id: 4,
    title: '美食盛宴',
    subtitle: '进口零食新鲜直达',
    gradient: 'from-amber-500 to-yellow-400',
    icon: Gift
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${banners[current].gradient} flex items-center justify-center`}
        >
          <div className="text-center text-white px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="mb-4"
            >
              {(() => {
                const IconComponent = banners[current].icon;
                return <IconComponent size={64} className="mx-auto" />;
              })()}
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold mb-2"
            >
              {banners[current].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl opacity-90"
            >
              {banners[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}