'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  available: boolean;
}

export default function FeaturedMenuSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/menu?featured=true&limit=4')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setItems(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-coffee-950/30 to-espresso">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="font-accent text-coffee-300 text-lg italic">Menu Favorit</span>
            <h2 className="section-title text-cream-50 mt-2">
              Pilihan Terbaik
              <br />
              <span className="text-coffee-300">Kopi Gayo</span>
            </h2>
          </div>
          <Link href="/menu" className="flex items-center gap-2 text-coffee-300 text-sm hover:text-coffee-200 transition-colors group">
            Lihat Semua Menu
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Menu grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass rounded-sm overflow-hidden">
                <div className="skeleton h-52" />
                <div className="p-5 space-y-2">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass border border-coffee-800/30 rounded-sm overflow-hidden card-hover group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 badge badge-available text-xs">
                    {item.available ? 'Tersedia' : 'Habis'}
                  </span>
                  <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs text-coffee-300 font-body">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-cream-100 text-base mb-1">{item.name}</h3>
                  <p className="text-cream-400 text-xs mb-3 leading-relaxed line-clamp-2">{item.description}</p>
                  <p className="font-display text-coffee-300 text-lg">{formatCurrency(item.price)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
