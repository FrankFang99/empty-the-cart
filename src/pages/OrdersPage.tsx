import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useUserStore } from '../stores/useUserStore';

export default function OrdersPage() {
  const { orders, isLoggedIn } = useUserStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'delivered':
        return <Package className="text-purple-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待发货';
      case 'shipped':
        return '已发货';
      case 'delivered':
        return '已送达';
      case 'completed':
        return '已完成';
      default:
        return '未知状态';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-purple-500" size={28} />
            我的订单
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length}个订单
          </p>
        </motion.div>

        {/* Not Logged In */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow"
          >
            <ShoppingBag className="text-gray-300 mx-auto" size={64} />
            <p className="text-gray-500 mt-4">请登录查看订单</p>
            <Link
              to="/login"
              className="mt-6 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium"
            >
              去登录
            </Link>
          </motion.div>
        )}

        {/* Orders List */}
        {isLoggedIn && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow"
          >
            <Package className="text-gray-300 mx-auto" size={64} />
            <p className="text-gray-500 mt-4">暂无订单</p>
            <p className="text-gray-400 text-sm mt-2">快去购物体验吧！</p>
            <Link
              to="/"
              className="mt-6 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium"
            >
              去购物
            </Link>
          </motion.div>
        )}

        {isLoggedIn && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{getStatusText(order.status)}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.productName}</p>
                        <p className="text-xs text-gray-500">数量: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-red-500">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">订单号: {order.id}</span>
                  <span className="font-bold text-red-500">
                    ¥{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}