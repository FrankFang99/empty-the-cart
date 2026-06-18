export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  subCategory: string;
  salesCount: number;
  specs: SpecOption[];
  rating: number;
  reviews: number;
  skuImages?: SkuImageMap;
  skuPrices?: SkuPriceMap;
}

export interface SpecOption {
  name: string;
  values: string[];
}

export interface SkuImageMap {
  [skuKey: string]: string;
}

export interface SkuPriceMap {
  [skuKey: string]: number;
}

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likesCount: number;
  createdAt: Date;
  isLiked?: boolean;
  replyTo?: string;
  replies?: Comment[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSpec: Record<string, string>;
  price?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'completed';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subCategories: string[];
  bgImage?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  avatarFile?: string;
}

// 收藏商品
export interface FavoriteItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

// 成就系统
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  target: number;
}

// 购物统计
export interface ShoppingStats {
  totalSaved: number;
  cartsCleared: number;
  itemsAdded: number;
  productsViewed: number;
  commentsPosted: number;
  favoritesAdded: number;
  categoriesExplored: string[];
  consecutiveDays: number;
  lastVisitDate: string;
}