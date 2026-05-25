'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Wrench, MessageSquare, Info, TrendingUp, Mail } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  menuCount: number;
  serviceCount: number;
  messageCount: number;
  unreadCount: number;
  aboutCount: number;
}

const statCards = (stats: Stats) => [
  {
    label: 'Total Menu',
    value: stats.menuCount,
    icon: UtensilsCrossed,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    href: '/admin/menu',
  },
  {
    label: 'Total Layanan',
    value: stats.serviceCount,
    icon: Wrench,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    href: '/admin/service',
  },
  {
    label: 'Pesan Masuk',
    value: stats.messageCount,
    icon: MessageSquare,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    href: '/admin/messages',
  },
  {
    label: 'Pesan Belum Dibaca',
    value: stats.unreadCount,
    icon: Mail,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
    href: '/admin/messages',
  },
];

const quickActions = [
  { label: 'Tambah Menu Baru', href: '/admin/menu', icon: UtensilsCrossed, desc: 'Tambahkan produk kopi baru' },
  { label: 'Tambah Layanan', href: '/admin/service', icon: Wrench, desc: 'Tambahkan layanan baru' },
  { label: 'Edit Konten About', href: '/admin/about', icon: Info, desc: 'Perbarui info tentang kami' },
  { label: 'Lihat Pesan', href: '/admin/messages', icon: MessageSquare, desc: 'Kelola pesan dari pelanggan' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ menuCount: 0, serviceCount: 0, messageCount: 0, unreadCount: 0, aboutCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => { if (data.success) setStats(data.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-cream-50">Dashboard</h1>
        <p className="text-cream-400 text-sm mt-1 font-body">
          Selamat datang di panel admin Kopi Gayo Derah.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div key={i} className="glass border border-coffee-800/30 rounded-sm p-6">
                <div className="skeleton h-10 w-10 rounded-full mb-4" />
                <div className="skeleton h-8 w-16 mb-2" />
                <div className="skeleton h-3 w-24" />
              </div>
            ))
          : statCards(stats).map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={card.href}
                  className={`block glass border ${card.border} rounded-sm p-6 hover:scale-[1.02] transition-transform`}
                >
                  <div className={`w-11 h-11 ${card.bg} border ${card.border} rounded-full flex items-center justify-center mb-4`}>
                    <card.icon size={20} className={card.color} />
                  </div>
                  <p className={`font-display text-3xl ${card.color} mb-1`}>{card.value}</p>
                  <p className="text-cream-400 text-xs uppercase tracking-widest font-body">{card.label}</p>
                </Link>
              </motion.div>
            ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-xl text-cream-100 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-coffee-400" />
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <Link
                href={action.href}
                className="flex items-start gap-4 glass border border-coffee-800/30 rounded-sm p-5 hover:border-coffee-600/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-coffee-800/50 flex items-center justify-center shrink-0 group-hover:bg-coffee-700/50 transition-colors">
                  <action.icon size={16} className="text-coffee-300" />
                </div>
                <div>
                  <p className="text-cream-200 text-sm font-medium font-body">{action.label}</p>
                  <p className="text-cream-500 text-xs mt-0.5">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass border border-coffee-700/20 rounded-sm p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-coffee-800/60 flex items-center justify-center shrink-0">
            <Info size={18} className="text-coffee-300" />
          </div>
          <div>
            <h3 className="font-display text-cream-100 text-lg mb-2">Panduan Admin</h3>
            <ul className="text-cream-400 text-sm space-y-1 font-body">
              <li>• Gunakan menu <strong className="text-cream-300">Menu Kopi</strong> untuk mengelola daftar produk.</li>
              <li>• Gunakan menu <strong className="text-cream-300">Layanan</strong> untuk menambah/edit layanan yang ditawarkan.</li>
              <li>• Perbarui konten halaman <strong className="text-cream-300">Tentang</strong> secara berkala.</li>
              <li>• Periksa <strong className="text-cream-300">Pesan Masuk</strong> dari pelanggan setiap hari.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
