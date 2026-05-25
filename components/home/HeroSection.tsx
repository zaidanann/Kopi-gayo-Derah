'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/60 to-espresso" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-transparent to-espresso/40" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-coffee-700/20 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full border border-coffee-600/15" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coffee-600/40 bg-coffee-900/30 mb-8"
          >
            <Star size={12} className="text-coffee-300 fill-coffee-300" />
            <span className="text-coffee-300 text-xs tracking-widest uppercase font-body font-medium">
              Kopi Premium Aceh Gayo
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="section-title text-cream-50 mb-6 leading-tight"
          >
            Kopi Gayo
            <br />
            <span className="text-coffee-300 font-accent italic">Derah</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-accent text-xl md:text-2xl text-cream-200 mb-4 italic"
          >
            Cita Rasa Kopi Nusantara Asli Aceh Gayo
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-cream-300 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Dari dataran tinggi Gayo di ketinggian 1.200–1.700 mdpl, kami menghadirkan biji kopi Arabika terbaik dengan aroma khas dan rasa yang tak terlupakan.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/menu" className="btn-primary">
              Lihat Menu
            </Link>
            <Link href="/about" className="btn-outline">
              Tentang Kami
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-10 mt-16"
          >
            {[
              { value: '6+', label: 'Tahun Berdiri' },
              { value: '10K+', label: 'Pelanggan Setia' },
              { value: '15+', label: 'Kota di Indonesia' },
              { value: '100%', label: 'Kopi Asli Gayo' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-3xl text-coffee-300">{stat.value}</p>
                <p className="font-body text-xs text-cream-400 mt-1 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cream-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} className="text-coffee-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
