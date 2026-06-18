import { Product, Category, Comment } from '../types';

export const categories: Category[] = [
  {
    id: 'digital',
    name: '数码电器',
    icon: '',
    color: '#FF6B6B',
    subCategories: ['手机', '电脑', '耳机', '相机', '智能手表', '平板'],
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20digital%20electronics%20store%20banner%20with%20smartphones%20laptops%20headphones%20elegant%20display&image_size=landscape_16_9'
  },
  {
    id: 'clothing',
    name: '服装鞋包',
    icon: '',
    color: '#4ECDC4',
    subCategories: ['男装', '女装', '运动鞋', '包包', '配饰', '内衣'],
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20clothing%20shoes%20bags%20luxury%20store%20display%20elegant%20showcase&image_size=landscape_16_9'
  },
  {
    id: 'food',
    name: '食品生鲜',
    icon: '',
    color: '#FFE66D',
    subCategories: ['零食', '饮料', '生鲜水果', '特产', '咖啡', '茶叶'],
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20food%20fruits%20groceries%20market%20display%20colorful%20appetizing&image_size=landscape_16_9'
  },
  {
    id: 'beauty',
    name: '美妆护肤',
    icon: '',
    color: '#C9B1FF',
    subCategories: ['护肤品', '彩妆', '香水', '洗护用品', '面膜', '精华'],
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20cosmetics%20skincare%20products%20elegant%20display%20beauty%20store&image_size=landscape_16_9'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Apple iPhone 15 Pro Max',
    description: '全新A17 Pro芯片，钛金属设计，超强性能体验。',
    price: 9999,
    originalPrice: 12999,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20iPhone%2015%20Pro%20Max%20smartphone%20titanium%20color%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '手机',
    salesCount: 12580,
    specs: [
      { name: '颜色', values: ['钛金属色', '蓝色钛金属', '白色钛金属', '原色钛金属'] },
      { name: '存储', values: ['256GB', '512GB', '1TB'] }
    ],
    rating: 4.9,
    reviews: 3580,
    skuImages: {
      '钛金属色-256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20iPhone%2015%20Pro%20Max%20titanium%20gray%20color%20smartphone%20product%20photo%20white%20background&image_size=square',
      '蓝色钛金属-256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20iPhone%2015%20Pro%20Max%20blue%20titanium%20color%20smartphone%20product%20photo%20white%20background&image_size=square',
      '白色钛金属-256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20iPhone%2015%20Pro%20Max%20white%20titanium%20color%20smartphone%20product%20photo%20white%20background&image_size=square',
      '原色钛金属-256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20iPhone%2015%20Pro%20Max%20natural%20titanium%20silver%20smartphone%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: {
      '钛金属色-256GB': 9999, '钛金属色-512GB': 11999, '钛金属色-1TB': 13999,
      '蓝色钛金属-256GB': 9999, '蓝色钛金属-512GB': 11999, '蓝色钛金属-1TB': 13999,
      '白色钛金属-256GB': 9999, '白色钛金属-512GB': 11999, '白色钛金属-1TB': 13999,
      '原色钛金属-256GB': 9999, '原色钛金属-512GB': 11999, '原色钛金属-1TB': 13999
    }
  },
  {
    id: 'p2',
    name: '小米14 Pro',
    description: '骁龙8 Gen3处理器，徕卡光学镜头，2K AMOLED屏幕。',
    price: 4999,
    originalPrice: 5499,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%2014%20Pro%20smartphone%20black%20color%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '手机',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['黑色', '白色', '岩石青'] },
      { name: '存储', values: ['12GB+256GB', '16GB+512GB', '16GB+1TB'] }
    ],
    rating: 4.8,
    reviews: 2156,
    skuImages: {
      '黑色-12GB+256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%2014%20Pro%20smartphone%20black%20color%20professional%20product%20photo%20white%20background&image_size=square',
      '白色-12GB+256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%2014%20Pro%20smartphone%20white%20color%20professional%20product%20photo%20white%20background&image_size=square',
      '岩石青-12GB+256GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%2014%20Pro%20smartphone%20rock%20green%20color%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: {
      '黑色-12GB+256GB': 4299, '黑色-16GB+512GB': 4999, '黑色-16GB+1TB': 5999,
      '白色-12GB+256GB': 4299, '白色-16GB+512GB': 4999, '白色-16GB+1TB': 5999,
      '岩石青-12GB+256GB': 4499, '岩石青-16GB+512GB': 5199, '岩石青-16GB+1TB': 6199
    }
  },
  {
    id: 'p3',
    name: 'Apple MacBook Pro 14英寸',
    description: 'M3 Pro芯片带来惊人性能，Liquid视网膜XDR显示屏。',
    price: 14999,
    originalPrice: 16999,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20MacBook%20Pro%2014%20inch%20laptop%20silver%20color%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 5680,
    specs: [
      { name: '颜色', values: ['银色', '深空灰色'] },
      { name: '配置', values: ['M3 Pro 18GB+512GB', 'M3 Pro 36GB+512GB', 'M3 Max 40GB+1TB'] }
    ],
    rating: 4.8,
    reviews: 1234,
    skuImages: {
      '银色-M3 Pro 18GB+512GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20MacBook%20Pro%2014%20inch%20laptop%20silver%20color%20professional%20product%20photo%20white%20background&image_size=square',
      '深空灰色-M3 Pro 18GB+512GB': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20MacBook%20Pro%2014%20inch%20laptop%20space%20gray%20color%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: {
      '银色-M3 Pro 18GB+512GB': 14999, '银色-M3 Pro 36GB+512GB': 17999, '银色-M3 Max 40GB+1TB': 24999,
      '深空灰色-M3 Pro 18GB+512GB': 14999, '深空灰色-M3 Pro 36GB+512GB': 17999, '深空灰色-M3 Max 40GB+1TB': 24999
    }
  },
  {
    id: 'p4',
    name: 'Apple AirPods Pro 第二代',
    description: 'H2芯片带来卓越音质，主动降噪效果提升2倍。',
    price: 1799,
    originalPrice: 1999,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20AirPods%20Pro%202nd%20generation%20wireless%20earbuds%20white%20case%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '耳机',
    salesCount: 25680,
    specs: [{ name: '充电盒', values: ['MagSafe充电盒', '标准充电盒'] }],
    rating: 4.8,
    reviews: 8965,
    skuPrices: { 'MagSafe充电盒': 1799, '标准充电盒': 1699 }
  },
  {
    id: 'p5',
    name: '索尼WH-1000XM5',
    description: '行业领先降噪技术，30小时超长续航。',
    price: 2299,
    originalPrice: 2799,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20WH-1000XM5%20wireless%20headphones%20black%20color%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '耳机',
    salesCount: 12580,
    specs: [{ name: '颜色', values: ['黑色', '铂金银', '深夜蓝'] }],
    rating: 4.9,
    reviews: 4567,
    skuImages: {
      '黑色': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20WH-1000XM5%20wireless%20headphones%20black%20color%20professional%20product%20photo%20white%20background&image_size=square',
      '铂金银': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20WH-1000XM5%20wireless%20headphones%20platinum%20silver%20color%20professional%20product%20photo%20white%20background&image_size=square',
      '深夜蓝': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20WH-1000XM5%20wireless%20headphones%20midnight%20blue%20color%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: { '黑色': 2299, '铂金银': 2299, '深夜蓝': 2499 }
  },
  {
    id: 'p6',
    name: 'Apple Watch Series 9',
    description: 'S9芯片，亮度提升2000尼特，全新双击手势操作。',
    price: 3199,
    originalPrice: 3599,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Watch%20Series%209%20smartwatch%20midnight%20color%20sport%20band%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'digital',
    subCategory: '智能手表',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['午夜色', '星光色', '银色', '红色'] },
      { name: '表带', values: ['运动型表带', '回环式运动表带', '皮革表带'] }
    ],
    rating: 4.7,
    reviews: 2345,
    skuImages: {
      '午夜色-运动型表带': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Watch%20Series%209%20smartwatch%20midnight%20black%20sport%20band%20professional%20product%20photo%20white%20background&image_size=square',
      '星光色-运动型表带': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Watch%20Series%209%20smartwatch%20starlight%20white%20sport%20band%20professional%20product%20photo%20white%20background&image_size=square',
      '银色-运动型表带': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Watch%20Series%209%20smartwatch%20silver%20color%20sport%20band%20professional%20product%20photo%20white%20background&image_size=square',
      '红色-运动型表带': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Watch%20Series%209%20smartwatch%20product%20red%20color%20sport%20band%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: {
      '午夜色-运动型表带': 3199, '午夜色-回环式运动表带': 3399, '午夜色-皮革表带': 3599,
      '星光色-运动型表带': 3199, '星光色-回环式运动表带': 3399, '星光色-皮革表带': 3599,
      '银色-运动型表带': 3199, '银色-回环式运动表带': 3399, '银色-皮革表带': 3599,
      '红色-运动型表带': 3199, '红色-回环式运动表带': 3399, '红色-皮革表带': 3599
    }
  },
  {
    id: 'p7',
    name: 'SK-II神仙水精华露',
    description: '蕴含超过90% PITERA精华，改善肤质。',
    price: 1590,
    originalPrice: 1790,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SK-II%20Facial%20Treatment%20Essence%20bottle%20skincare%20product%20professional%20photo%20white%20background&image_size=square'],
    category: 'beauty',
    subCategory: '护肤品',
    salesCount: 18680,
    specs: [{ name: '规格', values: ['75ml', '160ml', '230ml'] }],
    rating: 4.9,
    reviews: 8965,
    skuPrices: { '75ml': 790, '160ml': 1290, '230ml': 1590 }
  },
  {
    id: 'p8',
    name: '兰蔻小黑瓶精华肌底液',
    description: '第二代小黑瓶，微生态护肤科技。',
    price: 1080,
    originalPrice: 1280,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lancome%20Advanced%20Genifique%20Youth%20Activating%20Serum%20black%20bottle%20skincare%20product%20professional%20photo%20white%20background&image_size=square'],
    category: 'beauty',
    subCategory: '精华',
    salesCount: 15680,
    specs: [{ name: '规格', values: ['30ml', '50ml', '100ml'] }],
    rating: 4.8,
    reviews: 7564,
    skuPrices: { '30ml': 780, '50ml': 1080, '100ml': 1680 }
  },
  {
    id: 'p9',
    name: '雅诗兰黛小棕瓶眼霜',
    description: '明星眼霜，淡褪黑眼圈，抚平细纹。',
    price: 549,
    originalPrice: 620,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Estee%20Lauder%20Advanced%20Night%20Repair%20Eye%20Cream%20jar%20brown%20skincare%20product%20professional%20photo%20white%20background&image_size=square'],
    category: 'beauty',
    subCategory: '眼霜',
    salesCount: 25680,
    specs: [{ name: '规格', values: ['15ml', '30ml'] }],
    rating: 4.7,
    reviews: 12568,
    skuPrices: { '15ml': 549, '30ml': 890 }
  },
  {
    id: 'p10',
    name: '迪奥999口红',
    description: '经典999色号，丝绒质地，显色持久。',
    price: 370,
    originalPrice: 420,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dior%20Rouge%20999%20lipstick%20red%20color%20matte%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'beauty',
    subCategory: '彩妆',
    salesCount: 89680,
    specs: [{ name: '质地', values: ['哑光', '缎光', '丝绒'] }],
    rating: 4.8,
    reviews: 35689,
    skuImages: {
      '哑光': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dior%20Rouge%20999%20lipstick%20red%20matte%20finish%20professional%20product%20photo%20white%20background&image_size=square',
      '缎光': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dior%20Rouge%20999%20lipstick%20red%20satin%20finish%20professional%20product%20photo%20white%20background&image_size=square',
      '丝绒': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dior%20Rouge%20999%20lipstick%20red%20velvet%20finish%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: { '哑光': 370, '缎光': 370, '丝绒': 390 }
  },
  {
    id: 'p11',
    name: '香奈儿5号香水',
    description: '传奇经典5号香水，融合了五月玫瑰、茉莉等花香。',
    price: 1190,
    originalPrice: 1390,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chanel%20No%205%20perfume%20bottle%20classic%20elegant%20golden%20cap%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'beauty',
    subCategory: '香水',
    salesCount: 12580,
    specs: [{ name: '规格', values: ['50ml', '100ml', '150ml'] }],
    rating: 4.9,
    reviews: 6895,
    skuPrices: { '50ml': 1190, '100ml': 1590, '150ml': 2090 }
  },
  {
    id: 'p12',
    name: 'Nike Air Jordan 1',
    description: '经典复刻版，原汁原味芝加哥配色。',
    price: 1299,
    originalPrice: 1599,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Nike%20Air%20Jordan%201%20sneakers%20red%20black%20white%20chicago%20colorway%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'clothing',
    subCategory: '运动鞋',
    salesCount: 5680,
    specs: [{ name: '尺码', values: ['40', '41', '42', '43', '44', '45'] }],
    rating: 4.8,
    reviews: 2345
  },
  {
    id: 'p13',
    name: 'Adidas三叶草经典卫衣',
    description: '经典三叶草logo，舒适棉质面料。',
    price: 599,
    originalPrice: 799,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Adidas%20Originals%20Trefoil%20hoodie%20black%20color%20sweatshirt%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'clothing',
    subCategory: '男装',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['黑色', '白色', '灰色'] },
      { name: '尺码', values: ['S', 'M', 'L', 'XL', 'XXL'] }
    ],
    rating: 4.6,
    reviews: 3456,
    skuImages: {
      '黑色-S': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Adidas%20Originals%20Trefoil%20hoodie%20black%20color%20sweatshirt%20professional%20product%20photo%20white%20background&image_size=square',
      '白色-S': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Adidas%20Originals%20Trefoil%20hoodie%20white%20color%20sweatshirt%20professional%20product%20photo%20white%20background&image_size=square',
      '灰色-S': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Adidas%20Originals%20Trefoil%20hoodie%20gray%20color%20sweatshirt%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: {
      '黑色-S': 599, '黑色-M': 599, '黑色-L': 599,
      '白色-S': 599, '白色-M': 599, '白色-L': 599,
      '灰色-S': 599, '灰色-M': 599, '灰色-L': 599
    }
  },
  {
    id: 'p14',
    name: 'Coach经典波士顿包',
    description: '经典C签名图案，高品质PVC配皮材质。',
    price: 2699,
    originalPrice: 3299,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Coach%20Boston%20bag%20brown%20signature%20canvas%20handbag%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'clothing',
    subCategory: '包包',
    salesCount: 4560,
    specs: [{ name: '颜色', values: ['经典棕色', '黑色', '米白色'] }],
    rating: 4.7,
    reviews: 1896,
    skuImages: {
      '经典棕色': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Coach%20Boston%20bag%20brown%20signature%20canvas%20handbag%20professional%20product%20photo%20white%20background&image_size=square',
      '黑色': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Coach%20Boston%20bag%20black%20signature%20canvas%20handbag%20professional%20product%20photo%20white%20background&image_size=square',
      '米白色': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Coach%20Boston%20bag%20cream%20white%20signature%20canvas%20handbag%20professional%20product%20photo%20white%20background&image_size=square'
    },
    skuPrices: { '经典棕色': 2699, '黑色': 2699, '米白色': 2899 }
  },
  {
    id: 'p15',
    name: '丹麦皇冠曲奇礼盒',
    description: '丹麦原装进口，精选黄油烘焙。',
    price: 128,
    originalPrice: 158,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Danish%20butter%20cookies%20gift%20tin%20box%20Royal%20Dansk%20style%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'food',
    subCategory: '零食',
    salesCount: 35680,
    specs: [{ name: '规格', values: ['908g', '1.3kg', '1.8kg'] }],
    rating: 4.8,
    reviews: 12568,
    skuPrices: { '908g': 88, '1.3kg': 128, '1.8kg': 168 }
  },
  {
    id: 'p16',
    name: '星巴克VIA免煮咖啡',
    description: '美国进口，无需煮沸，冷热水即溶。',
    price: 59,
    originalPrice: 69,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20VIA%20instant%20coffee%20packets%20box%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'food',
    subCategory: '咖啡',
    salesCount: 18680,
    specs: [{ name: '口味', values: ['美式深度烘焙', '拿铁风味', '摩卡风味'] }],
    rating: 4.6,
    reviews: 7890,
    skuPrices: { '美式深度烘焙': 59, '拿铁风味': 65, '摩卡风味': 65 }
  },
  {
    id: 'p17',
    name: '三只松鼠坚果礼盒',
    description: '精选多种坚果，每日坚果组合。',
    price: 128,
    originalPrice: 158,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20nuts%20gift%20box%20almonds%20cashews%20walnuts%20hazelnuts%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'food',
    subCategory: '零食',
    salesCount: 125680,
    specs: [{ name: '规格', values: ['500g', '1kg', '1.5kg', '2kg'] }],
    rating: 4.7,
    reviews: 25689,
    skuPrices: { '500g': 68, '1kg': 98, '1.5kg': 128, '2kg': 168 }
  },
  {
    id: 'p18',
    name: '智利进口车厘子',
    description: '智利进口新鲜车厘子，JJ级大果，果肉饱满。',
    price: 168,
    originalPrice: 199,
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20Chilean%20cherries%20red%20ripe%20in%20clear%20box%20professional%20product%20photo%20white%20background&image_size=square'],
    category: 'food',
    subCategory: '生鲜水果',
    salesCount: 25680,
    specs: [{ name: '规格', values: ['2斤装', '3斤装', '5斤装'] }],
    rating: 4.8,
    reviews: 8569,
    skuPrices: { '2斤装': 168, '3斤装': 238, '5斤装': 368 }
  },
  {
    id: 'p19',
    name: '华为Mate 60 Pro',
    description: '麒麟9000S芯片，超高速通信，玄武架构。',
    price: 6999,
    originalPrice: 7999,
    images: ['https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/images/mate60-pro-black.png'],
    category: 'digital',
    subCategory: '手机',
    salesCount: 25680,
    specs: [
      { name: '颜色', values: ['雅川青', '白沙银', '南糯紫', '雅丹黑'] },
      { name: '存储', values: ['12GB+256GB', '12GB+512GB', '12GB+1TB'] }
    ],
    rating: 4.9,
    reviews: 15680,
    skuImages: {
      '雅川青-12GB+256GB': 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/images/mate60-pro-green.png',
      '白沙银-12GB+256GB': 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/images/mate60-pro-white.png',
      '南糯紫-12GB+256GB': 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/images/mate60-pro-purple.png',
      '雅丹黑-12GB+256GB': 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/images/mate60-pro-black.png'
    },
    skuPrices: {
      '雅川青-12GB+256GB': 6999, '雅川青-12GB+512GB': 7999, '雅川青-12GB+1TB': 8999,
      '白沙银-12GB+256GB': 6999, '白沙银-12GB+512GB': 7999, '白沙银-12GB+1TB': 8999,
      '南糯紫-12GB+256GB': 7199, '南糯紫-12GB+512GB': 8199, '南糯紫-12GB+1TB': 9199,
      '雅丹黑-12GB+256GB': 6999, '雅丹黑-12GB+512GB': 7999, '雅丹黑-12GB+1TB': 8999
    }
  },
  {
    id: 'p20',
    name: '任天堂Switch OLED版',
    description: '掌上游戏机，OLED屏幕，随时随地享受游戏乐趣。',
    price: 2599,
    originalPrice: 2999,
    images: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/switch/switch-oled-model/switch-oled-model-hero'],
    category: 'digital',
    subCategory: '游戏机',
    salesCount: 15680,
    specs: [{ name: '版本', values: ['OLED版', '续航增强版'] }],
    rating: 4.8,
    reviews: 8960,
    skuPrices: { 'OLED版': 2599, '续航增强版': 2099 }
  },
  {
    id: 'p21',
    name: '索尼PS5',
    description: '次世代游戏主机，4K游戏体验。',
    price: 4299,
    originalPrice: 4999,
    images: ['https://www.sony.com/image/playstation-5-dualsense-4k-gaming-console-white'],
    category: 'digital',
    subCategory: '游戏机',
    salesCount: 8960,
    specs: [{ name: '版本', values: ['光驱版', '数字版'] }],
    rating: 4.9,
    reviews: 5680,
    skuPrices: { '光驱版': 4299, '数字版': 3899 }
  },
  {
    id: 'p22',
    name: '戴森V15吸尘器',
    description: '激光探测灰尘，智能感应技术。',
    price: 4599,
    originalPrice: 5499,
    images: ['https://www.dyson.com/content/dam/dyson/products/cordless-vacuum-cleaners/v15-detect/v15-detect-absolute-black-nickel.png'],
    category: 'home',
    subCategory: '清洁用品',
    salesCount: 8960,
    specs: [{ name: '型号', values: ['V15 Detect Absolute', 'V15 Detect Complete'] }],
    rating: 4.8,
    reviews: 3456,
    skuPrices: { 'V15 Detect Absolute': 4599, 'V15 Detect Complete': 5499 }
  },
  {
    id: 'p23',
    name: '戴森Supersonic吹风机',
    description: '智能温控，快速干发。',
    price: 2990,
    originalPrice: 3490,
    images: ['https://www.dyson.com/content/dam/dyson/products/haircare/hair-dryers/supersonic/hairdryer-white.png'],
    category: 'home',
    subCategory: '美发用品',
    salesCount: 15680,
    specs: [{ name: '颜色', values: ['白色', '紫红色', '镍色'] }],
    rating: 4.8,
    reviews: 6789,
    skuPrices: { '白色': 2990, '紫红色': 2990, '镍色': 3190 }
  },
  {
    id: 'p24',
    name: 'Apple Watch Ultra 2',
    description: '极致冒险，极限运动手表。',
    price: 6499,
    originalPrice: 6999,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-watch-ultra-2-select-202309?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1693903842024'],
    category: 'digital',
    subCategory: '智能手表',
    salesCount: 6780,
    specs: [{ name: '表带', values: ['高山橙', '午夜黑', '海洋蓝'] }],
    rating: 4.9,
    reviews: 1234,
    skuPrices: { '高山橙': 6499, '午夜黑': 6499, '海洋蓝': 6499 }
  },
  {
    id: 'p25',
    name: '索尼WH-1000XM5',
    description: '行业领先降噪技术，30小时超长续航。',
    price: 2699,
    originalPrice: 3299,
    images: ['https://www.sony.com/image/wh1000xm5-wireless-headphones-black'],
    category: 'digital',
    subCategory: '耳机',
    salesCount: 12580,
    specs: [{ name: '颜色', values: ['黑色', '铂金银', '深夜蓝'] }],
    rating: 4.9,
    reviews: 4567,
    skuPrices: { '黑色': 2699, '铂金银': 2699, '深夜蓝': 2899 }
  },
  {
    id: 'p26',
    name: 'iPad Air M3',
    description: '11英寸Liquid视网膜显示屏，M3芯片。',
    price: 5499,
    originalPrice: 5999,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-wifi-select-202405?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1714665836118'],
    category: 'digital',
    subCategory: '平板',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['深空灰色', '星光色', '粉色', '紫色', '蓝色'] },
      { name: '存储', values: ['256GB', '512GB'] }
    ],
    rating: 4.8,
    reviews: 3456,
    skuPrices: { '深空灰色-256GB': 5499, '深空灰色-512GB': 6499 }
  },
  {
    id: 'p27',
    name: '索尼A7M4全画幅微单',
    description: '3300万像素，10fps连拍，专业摄影。',
    price: 16999,
    originalPrice: 18999,
    images: ['https://www.sony.com/image/sony-alpha-7-iv-full-frame-mirrorless-camera-black'],
    category: 'digital',
    subCategory: '相机',
    salesCount: 3450,
    specs: [{ name: '套装', values: ['单机身', '24-70mm套机', '24-105mm套机'] }],
    rating: 4.9,
    reviews: 896,
    skuPrices: { '单机身': 16999, '24-70mm套机': 23999, '24-105mm套机': 21999 }
  },
  {
    id: 'p28',
    name: 'MacBook Pro 16英寸 M3 Max',
    description: 'M3 Max芯片，12核CPU，40核GPU。',
    price: 34999,
    originalPrice: 39999,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-pro-16-m3-max-select-202311?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1699864473548'],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 1890,
    specs: [{ name: '配置', values: ['M3 Max 36GB+512GB', 'M3 Max 40GB+1TB', 'M3 Max 40GB+2TB'] }],
    rating: 4.9,
    reviews: 456,
    skuPrices: { 'M3 Max 36GB+512GB': 34999, 'M3 Max 40GB+1TB': 41999, 'M3 Max 40GB+2TB': 48999 }
  },
  {
    id: 'p29',
    name: '戴森Airwrap美发造型器',
    description: '自动卷发，负离子护发。',
    price: 3690,
    originalPrice: 4290,
    images: ['https://www.dyson.com/content/dam/dyson/products/haircare/stylers/airwrap/airwrap-styler-white-pink.png'],
    category: 'home',
    subCategory: '美发用品',
    salesCount: 5680,
    specs: [{ name: '版本', values: ['标准版', '豪华版'] }],
    rating: 4.8,
    reviews: 2345,
    skuPrices: { '标准版': 3690, '豪华版': 4290 }
  },
  {
    id: 'p30',
    name: 'Apple HomePod mini',
    description: '智能音箱，Siri助手，完美音质。',
    price: 749,
    originalPrice: 799,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-202010?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1602274841784'],
    category: 'digital',
    subCategory: '智能设备',
    salesCount: 12340,
    specs: [{ name: '颜色', values: ['深空灰色', '白色', '橙色', '黄色', '蓝色'] }],
    rating: 4.7,
    reviews: 5678,
    skuPrices: { '深空灰色': 749, '白色': 749, '橙色': 749, '黄色': 749, '蓝色': 749 }
  },
  {
    id: 'p31',
    name: 'Apple MacBook Air M3',
    description: 'M3芯片，13.6英寸Liquid视网膜显示屏，超轻薄设计。',
    price: 9499,
    originalPrice: 10499,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m3-space-gray-select-202405?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1714665836086'],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['午夜色', '星光色', '银色', '深空灰色'] },
      { name: '配置', values: ['M3 8GB+256GB', 'M3 8GB+512GB', 'M3 16GB+512GB'] }
    ],
    rating: 4.8,
    reviews: 3456,
    skuPrices: { '午夜色-M3 8GB+256GB': 9499, '午夜色-M3 8GB+512GB': 11499, '午夜色-M3 16GB+512GB': 13499 }
  },
  {
    id: 'p32',
    name: 'Mac Studio M3 Max',
    description: 'M3 Max芯片，超强性能工作站，专业级创意工具。',
    price: 25999,
    originalPrice: 29999,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-studio-m3-max-select-202311?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1699864473548'],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 2340,
    specs: [{ name: '配置', values: ['M3 Max 30核+36GB+512GB', 'M3 Max 40核+64GB+1TB', 'M3 Max 40核+96GB+2TB'] }],
    rating: 4.9,
    reviews: 896,
    skuPrices: { 'M3 Max 30核+36GB+512GB': 25999, 'M3 Max 40核+64GB+1TB': 34999, 'M3 Max 40核+96GB+2TB': 44999 }
  },
  {
    id: 'p33',
    name: 'Apple iPad Pro 12.9英寸',
    description: 'M4芯片，Liquid视网膜XDR显示屏，专业创作利器。',
    price: 9299,
    originalPrice: 10299,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-9-wifi-select-202405?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1714665836118'],
    category: 'digital',
    subCategory: '平板',
    salesCount: 5680,
    specs: [
      { name: '存储', values: ['256GB', '512GB', '1TB'] },
      { name: '版本', values: ['WiFi版', '蜂窝网络版'] }
    ],
    rating: 4.8,
    reviews: 2345,
    skuPrices: { '256GB-WiFi版': 9299, '256GB-蜂窝网络版': 10999, '512GB-WiFi版': 11299 }
  },
  {
    id: 'p34',
    name: 'Apple Vision Pro',
    description: '空间计算时代开启，革命性的AR/VR体验。',
    price: 29999,
    originalPrice: 34999,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/vision-pro-select-202401?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1704378476978'],
    category: 'digital',
    subCategory: '智能设备',
    salesCount: 1280,
    specs: [{ name: '存储', values: ['256GB', '512GB'] }],
    rating: 4.7,
    reviews: 456,
    skuPrices: { '256GB': 29999, '512GB': 34999 }
  },
  {
    id: 'p35',
    name: '劳力士潜航者型',
    description: '经典潜水腕表，蚝式钢表壳，陶瓷表圈。',
    price: 78000,
    originalPrice: 85000,
    images: ['https://www.rolex.com/content/dam/rolex/catalog/watches/submariner/models/m126610ln-0001/m126610ln-0001_01.jpg'],
    category: 'luxury',
    subCategory: '腕表',
    salesCount: 890,
    specs: [{ name: '款式', values: ['黑水鬼', '绿水鬼', '蓝水鬼'] }],
    rating: 4.9,
    reviews: 234,
    skuPrices: { '黑水鬼': 78000, '绿水鬼': 98000, '蓝水鬼': 88000 }
  },
  {
    id: 'p36',
    name: '爱马仕Birkin包',
    description: '经典铂金包，Togo小牛皮，手工缝制。',
    price: 180000,
    originalPrice: 220000,
    images: ['https://www.hermes.com/content/dam/hermes-product/r/h081157ckab/h081157ckab_02.jpg/_jcr_content/renditions/cq5dam.web.1200.1200.jpeg'],
    category: 'luxury',
    subCategory: '包包',
    salesCount: 234,
    specs: [
      { name: '尺寸', values: ['25cm', '30cm', '35cm'] },
      { name: '颜色', values: ['黑色', '金棕色', '爱马仕橙'] }
    ],
    rating: 4.9,
    reviews: 89,
    skuPrices: { '25cm-黑色': 180000, '30cm-黑色': 220000, '35cm-黑色': 260000 }
  },
  {
    id: 'p37',
    name: '香奈儿Classic Flap',
    description: '经典口盖包，小羊皮，金色金属链。',
    price: 68000,
    originalPrice: 78000,
    images: ['https://www.chanel.com/images//t_20240708_h350_w350_center_crop_q90/80cf4226-7223-43b4-9a6c-952810e56556/p11120-y01295-c3906.jpg'],
    category: 'luxury',
    subCategory: '包包',
    salesCount: 567,
    specs: [
      { name: '尺寸', values: ['小号', '中号', '大号'] },
      { name: '材质', values: ['小羊皮', '鱼子酱牛皮'] }
    ],
    rating: 4.8,
    reviews: 156,
    skuPrices: { '小号-小羊皮': 68000, '中号-小羊皮': 78000, '小号-鱼子酱牛皮': 72000 }
  },
  {
    id: 'p38',
    name: 'LV Speedy 30',
    description: '经典老花图案，Monogram帆布，百搭款式。',
    price: 15800,
    originalPrice: 17800,
    images: ['https://www.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-speedy-30-bag-monogram-canvas--M41108_PM2_Front view.jpg'],
    category: 'luxury',
    subCategory: '包包',
    salesCount: 1234,
    specs: [{ name: '尺寸', values: ['25cm', '30cm', '35cm'] }],
    rating: 4.7,
    reviews: 456,
    skuPrices: { '25cm': 13800, '30cm': 15800, '35cm': 17800 }
  },
  {
    id: 'p39',
    name: '茅台飞天53度',
    description: '贵州茅台酒，53度酱香型白酒，经典飞天包装。',
    price: 14999,
    originalPrice: 16999,
    images: ['https://img14.360buyimg.com/n1/jfs/t1/208018/33/25333/34985/647d2236F801c383a/8c2997d7f280c872.jpg'],
    category: 'food',
    subCategory: '白酒',
    salesCount: 3456,
    specs: [{ name: '规格', values: ['500ml', '1L', '1.5L'] }],
    rating: 4.9,
    reviews: 1234,
    skuPrices: { '500ml': 14999, '1L': 29999, '1.5L': 44999 }
  },
  {
    id: 'p40',
    name: '轩尼诗XO',
    description: '法国干邑白兰地，百年传承，顶级品质。',
    price: 3999,
    originalPrice: 4599,
    images: ['https://img10.360buyimg.com/n1/jfs/t1/197950/36/26390/34985/647d2236F7a7d486c/8e2997d7f280c872.jpg'],
    category: 'food',
    subCategory: '洋酒',
    salesCount: 2345,
    specs: [{ name: '规格', values: ['350ml', '700ml', '1.5L'] }],
    rating: 4.8,
    reviews: 890,
    skuPrices: { '350ml': 2299, '700ml': 3999, '1.5L': 7999 }
  }
];

export const mockComments: Comment[] = [
  { id: 'c1', productId: 'p1', userId: 'u1', userName: '数码发烧友', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=digital', content: '手机手感超级好，拍照效果一流！', likesCount: 128, createdAt: new Date('2024-01-15') },
  { id: 'c2', productId: 'p1', userId: 'u2', userName: '科技达人', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', content: '系统流畅，电池续航也很给力。', likesCount: 56, createdAt: new Date('2024-01-20') },
  { id: 'c3', productId: 'p7', userId: 'u3', userName: '护肤小能手', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beauty', content: '神仙水真的很好用！皮肤明显变好了。', likesCount: 256, createdAt: new Date('2024-02-10') },
  { id: 'c4', productId: 'p12', userId: 'u4', userName: '潮流玩家', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fashion', content: '经典配色永远不会过时！', likesCount: 89, createdAt: new Date('2024-02-01') },
  { id: 'c5', productId: 'p15', userId: 'u5', userName: '吃货一枚', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food', content: '曲奇很香很好吃！', likesCount: 45, createdAt: new Date('2024-02-15') }
];

export const getProducts = (category?: string): Product[] => {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const searchProducts = (keyword: string): Product[] => {
  const lowerKeyword = keyword.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerKeyword) ||
    p.description.toLowerCase().includes(lowerKeyword) ||
    p.category.toLowerCase().includes(lowerKeyword)
  );
};

export const getProductComments = (productId: string): Comment[] => {
  return mockComments.filter(c => c.productId === productId);
};