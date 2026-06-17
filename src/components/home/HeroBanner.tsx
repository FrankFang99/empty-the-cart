import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PartyPopper, Smartphone, Sparkles, Gift, ShoppingBag, Star } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: '购物狂欢节',
    subtitle: '清空购物车，不花一分钱！',
    gradient: 'from-pink-500 via-purple-500 to-blue-500',
    icon: PartyPopper
  },
  {
    id: 2,
    title: '数码狂欢',
    subtitle: '手机电脑限时狂欢价',
    gradient: 'from-cyan-500 via-blue-500 to-purple-500',
    icon: Smartphone
  },
  {
    id: 3,
    title: '美妆盛宴',
    subtitle: '大牌护肤品超值优惠',
    gradient: 'from-pink-500 via-rose-500 to-red-400',
    icon: Sparkles
  },
  {
    id: 4,
    title: '美食狂欢',
    subtitle: '进口零食新鲜直达',
    gradient: 'from-amber-500 via-orange-500 to-red-400',
    icon: Gift
  },
  {
    id: 5,
    title: '清空购物车',
    subtitle: '体验消费快感，保护钱包健康',
    gradient: 'from-yellow-400 via-pink-500 to-purple-600',
    icon: ShoppingBag
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              x: [0, Math.sin(i) * 50],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              backgroundColor: ['#FF2D92', '#9D4EDD', '#00D4FF', '#FFD60A'][i % 4]
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${banners[current].gradient} flex items-center justify-center`}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          <div className="relative text-center text-white px-8 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="mb-4"
            >
              <div className="relative inline-block">
                {(() => {
                  const IconComponent = banners[current].icon;
                  return (
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-white/20">
                      <IconComponent size={48} className="md:size-56" />
                    </div>
                  );
                })()}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-1 -right-1"
                >
                  <Star size={20} className="text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black mb-2 drop-shadow-lg"
            >
              {banners[current].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl opacity-95 font-medium"
            >
              {banners[current].subtitle}
            </motion.p>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              立即体验
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all backdrop-blur-sm shadow-lg hover:shadow-xl"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all backdrop-blur-sm shadow-lg hover:shadow-xl"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-white shadow-lg shadow-white/50' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
