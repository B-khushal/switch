import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { loginAdmin, isAuthenticated } from '../../../services/authService';
import { useNavigate } from '../../../router/router';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect immediately
  if (isAuthenticated()) {
    setTimeout(() => navigate('/admin'), 0);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await loginAdmin(email, password);
    setIsLoading(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 600);
    } else {
      setErrorMsg(res.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white flex items-center justify-center p-6 relative overflow-hidden font-body selection:bg-brand selection:text-white">
      {/* Ambient Gradient Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand opacity-20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600 opacity-15 blur-[150px] rounded-full pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[32px] shadow-2xl relative z-10 space-y-8"
      >
        {/* Top Brand Banner */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/20 shadow-inner">
            <img src="/image_copy.png" alt="Switch Logo" className="h-9 w-auto mix-blend-screen" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Administrator Portal</h2>
            <p className="text-xs text-white/50 mt-1">Sign in to manage your Switch It scheduling platform.</p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500/40 p-3.5 rounded-2xl text-xs text-red-200 font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello.switchit@gmail.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand text-sm font-medium text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand text-sm font-medium text-white outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-brand"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Please contact system administrator.')}
              className="text-white/40 hover:text-brand transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full py-4 rounded-2xl bg-brand hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : success ? (
              <span className="flex items-center gap-2">
                <CheckCircle size={18} /> Authenticated
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Sign In to Admin Portal</span>
                <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
