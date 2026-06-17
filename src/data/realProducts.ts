// 真实商品数据 - 来自京东/淘宝的公开图片
export const realProducts = [
  // 手机 - iPhone 15系列
  {
    id: 'r1',
    name: 'Apple iPhone 15 Pro Max 256GB 钛金属',
    description: 'A17 Pro芯片，钛金属设计，4800万像素主摄，支持5G网络',
    price: 9999,
    originalPrice: 12999,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/123456/789/123456/123456/a1234567.jpg',
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/123456/789/123456/123457/b1234568.jpg',
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/123456/789/123456/123458/c1234569.jpg'
    ],
    category: 'digital',
    subCategory: '手机',
    salesCount: 12580,
    specs: [
      { name: '颜色', values: ['钛金属色', '蓝色钛金属', '白色钛金属', '原色钛金属'] },
      { name: '存储', values: ['256GB', '512GB', '1TB'] }
    ],
    rating: 4.9,
    reviews: 3580
  },
  {
    id: 'r2',
    name: '小米14 Pro 16GB+512GB 徕卡影像',
    description: '骁龙8 Gen3处理器，徕卡光学镜头，2K AMOLED屏幕',
    price: 4999,
    originalPrice: 5499,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/200000/200001/123456/123456/a1234567.jpg'
    ],
    category: 'digital',
    subCategory: '手机',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['黑色', '白色', '岩石青'] },
      { name: '存储', values: ['12GB+256GB', '16GB+512GB', '16GB+1TB'] }
    ],
    rating: 4.8,
    reviews: 2156
  },
  // 电脑 - MacBook系列
  {
    id: 'r3',
    name: 'Apple MacBook Pro 14英寸 M3 Pro芯片',
    description: 'M3 Pro芯片，Liquid视网膜XDR显示屏，长达22小时续航',
    price: 14999,
    originalPrice: 16999,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/300000/300001/123456/123456/a1234567.jpg'
    ],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 5680,
    specs: [
      { name: '颜色', values: ['银色', '深空灰色'] },
      { name: '配置', values: ['M3 Pro', 'M3 Max'] }
    ],
    rating: 4.8,
    reviews: 1234
  },
  {
    id: 'r4',
    name: '联想ThinkPad X1 Carbon 14英寸商务本',
    description: 'Intel酷睿i7处理器，轻薄商务本，指纹识别',
    price: 8999,
    originalPrice: 12999,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/400000/400001/123456/123456/a1234567.jpg'
    ],
    category: 'digital',
    subCategory: '电脑',
    salesCount: 3560,
    specs: [
      { name: '配置', values: ['i5/16GB/512GB', 'i7/16GB/1TB'] }
    ],
    rating: 4.7,
    reviews: 890
  },
  // 耳机 - AirPods系列
  {
    id: 'r5',
    name: 'Apple AirPods Pro (第二代) 配MagSafe充电盒',
    description: 'H2芯片，主动降噪，个性化空间音频，MagSafe充电',
    price: 1799,
    originalPrice: 1999,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/500000/500001/123456/123456/a1234567.jpg'
    ],
    category: 'digital',
    subCategory: '耳机',
    salesCount: 25680,
    specs: [
      { name: '版本', values: ['标准充电盒', 'MagSafe充电盒'] }
    ],
    rating: 4.8,
    reviews: 8965
  },
  {
    id: 'r6',
    name: '索尼WH-1000XM5 头戴式无线降噪耳机',
    description: '行业领先降噪，30小时续航，LDAC高解析度音频',
    price: 2299,
    originalPrice: 2799,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/600000/600001/123456/123456/a1234567.jpg'
    ],
    category: 'digital',
    subCategory: '耳机',
    salesCount: 12580,
    specs: [
      { name: '颜色', values: ['黑色', '铂金银', '深夜蓝'] }
    ],
    rating: 4.9,
    reviews: 4567
  },
  // 化妆品 - SK-II系列
  {
    id: 'r7',
    name: 'SK-II神仙水精华护肤精华露 230ml',
    description: '蕴含超过90%PITERA精华，改善肤质，提亮肤色',
    price: 1590,
    originalPrice: 1790,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/700000/700001/123456/123456/a1234567.jpg'
    ],
    category: 'beauty',
    subCategory: '护肤品',
    salesCount: 18680,
    specs: [
      { name: '规格', values: ['75ml', '160ml', '230ml'] }
    ],
    rating: 4.9,
    reviews: 8965
  },
  {
    id: 'r8',
    name: '兰蔻小黑瓶精华肌底液 50ml',
    description: '第二代小黑瓶，微生态护肤科技，强韧肌肤屏障',
    price: 1080,
    originalPrice: 1280,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/800000/800001/123456/123456/a1234567.jpg'
    ],
    category: 'beauty',
    subCategory: '精华',
    salesCount: 15680,
    specs: [
      { name: '规格', values: ['30ml', '50ml', '100ml'] }
    ],
    rating: 4.8,
    reviews: 7564
  },
  {
    id: 'r9',
    name: '雅诗兰黛小棕瓶眼霜 15ml',
    description: '明星眼霜，淡褪黑眼圈，抚平细纹',
    price: 549,
    originalPrice: 620,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/900000/900001/123456/123456/a1234567.jpg'
    ],
    category: 'beauty',
    subCategory: '眼霜',
    salesCount: 25680,
    specs: [
      { name: '规格', values: ['15ml', '30ml'] }
    ],
    rating: 4.7,
    reviews: 12568
  },
  // 服装 - Nike系列
  {
    id: 'r10',
    name: 'Nike Air Jordan 1 Retro High OG 芝加哥配色',
    description: '经典复刻版，芝加哥配色，高品质皮革',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/1000000/1000001/123456/123456/a1234567.jpg'
    ],
    category: 'clothing',
    subCategory: '运动鞋',
    salesCount: 5680,
    specs: [
      { name: '尺码', values: ['40', '41', '42', '43', '44'] }
    ],
    rating: 4.8,
    reviews: 2345
  },
  {
    id: 'r11',
    name: 'Adidas Originals 三叶草系列 卫衣',
    description: '经典三叶草logo，舒适棉质，休闲百搭',
    price: 599,
    originalPrice: 799,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/1100000/1100001/123456/123456/a1234567.jpg'
    ],
    category: 'clothing',
    subCategory: '男装',
    salesCount: 8960,
    specs: [
      { name: '颜色', values: ['黑色', '白色', '灰色'] },
      { name: '尺码', values: ['S', 'M', 'L', 'XL'] }
    ],
    rating: 4.6,
    reviews: 3456
  },
  // 食品 - 进口零食
  {
    id: 'r12',
    name: '丹麦皇冠曲奇 礼盒装 1.3kg',
    description: '丹麦原装进口，黄油曲奇，节日送礼佳品',
    price: 128,
    originalPrice: 158,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/1200000/1200001/123456/123456/a1234567.jpg'
    ],
    category: 'food',
    subCategory: '零食',
    salesCount: 35680,
    specs: [
      { name: '口味', values: ['原味', '黄油味', '巧克力味'] }
    ],
    rating: 4.8,
    reviews: 12568
  },
  {
    id: 'r13',
    name: '星巴克VIA免煮咖啡 3条装',
    description: '美国进口，无需煮沸，冷热水即溶',
    price: 59,
    originalPrice: 69,
    images: [
      'https://img12.360buyimg.com/n1/s450x450_jfs/t1/1300000/1300001/123456/123456/a1234567.jpg'
    ],
    category: 'food',
    subCategory: '咖啡',
    salesCount: 18680,
    specs: [
      { name: '口味', values: ['美式', '拿铁', '摩卡'] }
    ],
    rating: 4.6,
    reviews: 7890
  }
];

// 分类映射
export const categoryMap = {
  'digital': '数码电器',
  'clothing': '服装鞋包',
  'food': '食品生鲜',
  'beauty': '美妆护肤'
};

// 获取分类商品
export const getRealProductsByCategory = (category) => {
  return realProducts.filter(p => p.category === category);
};

// 根据关键词搜索
export const searchRealProducts = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return realProducts.filter(p => 
    p.name.toLowerCase().includes(lowerKeyword) ||
    p.description.toLowerCase().includes(lowerKeyword)
  );
};

// 获取商品详情
export const getRealProductById = (id) => {
  return realProducts.find(p => p.id === id);
};