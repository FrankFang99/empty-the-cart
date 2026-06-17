import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useUserStore } from '../stores/useUserStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useUserStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // 如果已登录，跳转到首页
  if (isLoggedIn) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !username.trim()) return;
    
    login(email.trim(), username.trim());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"
            >
              <User className="text-white" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              {isRegister ? '注册账号' : '登录账号'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isRegister ? '创建账号，开始购物之旅' : '欢迎回来，继续购物'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">用户名</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="输入用户名"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">邮箱</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入邮箱"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password (optional for demo) */}
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-gray-700">密码（可选）</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="输入密码"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg"
            >
              {isRegister ? '注册' : '登录'}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-purple-600 hover:text-purple-700"
            >
              {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
            </button>
          </div>

          {/* Guest */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-600 text-sm"
            >
              以游客身份继续购物
            </Link>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 text-center mt-6">
            💡 本平台仅供娱乐体验，账号数据存储在本地
          </p>
        </motion.div>
      </main>
    </div>
  );
}