'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  available: boolean;
  featured: boolean;
}

const categories = ['Semua', 'Espresso', 'Milk Coffee', 'Cold Coffee', 'Traditional', 'Manual Brew', 'Beans', 'Other'];

export default function MenuContent() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '9' });
    if (search) params.set('search', search);
    if (category !== 'Semua') params.set('category', category);
    const res = await fetch(`/api/menu?${params}`);
    const data = await res.json();
    if (data.success) {
      setItems(data.data);
      setTotalPages(data.pagination.totalPages);
    }
    setLoading(false);
  }, [page, search, category]);

  useEffect(() => { fetchMenu(); }, [fetchMenu]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [search, category]);

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/60 to-espresso" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-accent text-coffee-300 italic text-lg">Pilihan Terbaik</span>
          <h1 className="section-title text-cream-50 mt-2 mb-4">Menu <span className="text-coffee-300">Kopi Gayo</span></h1>
          <p className="text-cream-300 max-w-xl mx-auto">Setiap menu menggunakan biji kopi Arabika pilihan dari dataran tinggi Gayo, Aceh.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8 sticky top-20 z-30 bg-espresso/95 backdrop-blur-md border-b border-coffee-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 py-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-400" />
              <input
                type="text"
                placeholder="Cari menu kopi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-coffee pl-9 pr-9"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-400 hover:text-cream-200">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all font-body ${
                    category === cat
                      ? 'bg-coffee-600 border-coffee-500 text-cream-100'
                      : 'border-coffee-700/40 text-cream-400 hover:border-coffee-600 hover:text-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : items.length === 0 ? (
            <EmptyState title="Menu tidak ditemukan" description="Coba kata kunci atau kategori lain." />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    onClick={() => setSelected(item)}
                    className="glass border border-coffee-800/30 rounded-sm overflow-hidden card-hover cursor-pointer group"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`badge ${item.available ? 'badge-available' : 'badge-unavailable'}`}>
                          {item.available ? 'Tersedia' : 'Habis'}
                        </span>
                        {item.featured && <span className="badge badge-featured">Favorit</span>}
                      </div>
                      <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs text-coffee-300 font-body">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-cream-100 text-lg mb-2">{item.name}</h3>
                      <p className="text-cream-400 text-xs mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-display text-coffee-300 text-xl">{formatCurrency(item.price)}</p>
                        <span className="text-xs text-cream-400 hover:text-cream-200 transition-colors">Lihat detail →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-full border border-coffee-700/40 flex items-center justify-center text-cream-300 hover:border-coffee-500 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-full border text-sm transition-colors ${
                        page === i + 1
                          ? 'bg-coffee-600 border-coffee-500 text-cream-100'
                          : 'border-coffee-700/40 text-cream-400 hover:border-coffee-500'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-full border border-coffee-700/40 flex items-center justify-center text-cream-300 hover:border-coffee-500 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-espresso/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass border border-coffee-700/30 rounded-sm overflow-hidden max-w-lg w-full"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-coffee-900/80 flex items-center justify-center text-cream-300 hover:text-cream-100">
                <X size={16} />
              </button>
              <div className="h-64 overflow-hidden">
                <img
                  src={selected.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-display text-2xl text-cream-50">{selected.name}</h2>
                  <span className="glass px-2 py-1 rounded-full text-xs text-coffee-300 font-body ml-4 shrink-0">{selected.category}</span>
                </div>
                <p className="text-cream-300 text-sm leading-relaxed mb-4">{selected.description}</p>
                <div className="flex items-center justify-between">
                  <p className="font-display text-coffee-300 text-2xl">{formatCurrency(selected.price)}</p>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${selected.available ? 'badge-available' : 'badge-unavailable'}`}>
                      {selected.available ? 'Tersedia' : 'Habis'}
                    </span>
                  </div>
                </div>
                {selected.available && (
                  <a
                    href={`https://wa.me/6281234567890?text=Halo, saya ingin memesan ${selected.name} seharga ${formatCurrency(selected.price)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block text-center mt-4"
                  >
                    Pesan via WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
