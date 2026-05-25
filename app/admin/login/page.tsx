'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Coffee, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Login berhasil! Selamat datang, Admin.');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.error || 'Email atau password salah.');
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-espresso/90" />
      </div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-coffee-800/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-coffee-700/15" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass border border-coffee-700/30 rounded-sm p-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-800 flex items-center justify-center mx-auto mb-4">
            <Coffee size={26} className="text-cream-50" />
          </div>
          <h1 className="font-display text-2xl text-cream-50">Kopi Gayo Derah</h1>
          <p className="text-coffee-300 text-sm mt-1 font-accent italic">Admin Dashboard</p>
        </div>

        <div className="gold-line mb-8" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Email Admin</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                placeholder="admin@kopigayoderah.com"
                className="input-coffee pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                required
                placeholder="••••••••"
                className="input-coffee pl-9 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-cream-300"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-coffee-900/40 border-t-coffee-900 rounded-full animate-spin" />
                Masuk...
              </>
            ) : (
              'Masuk ke Dashboard'
            )}
          </button>
        </form>

        <p className="text-center text-cream-500 text-xs mt-8">
          Default: admin@kopigayoderah.com / admin123
        </p>
      </motion.div>
    </div>
  );
}
