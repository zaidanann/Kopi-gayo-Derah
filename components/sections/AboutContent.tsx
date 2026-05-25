'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mountain, Eye, Target, Clock } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AboutData {
  title: string;
  subtitle: string;
  story: string;
  origin: string;
  vision: string;
  mission: string;
  products: { name: string; description: string }[];
  composition: { beans: string; roasting: string; acidity: string; aroma: string; taste: string };
  timeline: { year: string; event: string }[];
}

export default function AboutContent() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/about')
      .then((r) => r.json())
      .then((data) => { if (data.success) setAbout(data.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-24"><LoadingSpinner size="lg" /></div>;

  if (!about) return (
    <div className="pt-24 text-center text-cream-400 py-16">Konten belum tersedia.</div>
  );

  return (
    <div ref={ref} className="pt-24">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1442550528054-b88e81ee5e36?w=1920&h=1080&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/90 via-espresso/70 to-espresso" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            className="font-accent text-coffee-300 text-xl italic"
          >
            Tentang Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="section-title text-cream-50 mt-3 mb-6"
          >
            {about.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
            className="font-accent italic text-cream-200 text-xl"
          >
            {about.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
          >
            <span className="font-accent text-coffee-300 italic text-lg">Sejarah Kami</span>
            <h2 className="font-display text-3xl text-cream-50 mt-2 mb-6">Kisah di Balik Secangkir Kopi</h2>
            <p className="text-cream-300 leading-relaxed mb-4">{about.story}</p>
            <p className="text-cream-300 leading-relaxed">{about.origin}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&h=500&fit=crop"
              alt="Kopi Gayo"
              className="w-full h-80 object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 border border-coffee-600/40 rounded-sm" />
            <div className="absolute -top-6 -right-6 glass p-4 rounded-sm">
              <Mountain size={20} className="text-coffee-300 mb-1" />
              <p className="text-xs text-cream-300">1.200–1.700 mdpl</p>
              <p className="text-xs text-cream-400">Dataran Tinggi Gayo</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6 bg-coffee-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="glass border border-coffee-700/20 p-8 rounded-sm"
          >
            <div className="w-12 h-12 rounded-full bg-coffee-800/50 border border-coffee-600/30 flex items-center justify-center mb-6">
              <Eye size={20} className="text-coffee-300" />
            </div>
            <h3 className="font-display text-xl text-cream-100 mb-4">Visi</h3>
            <p className="text-cream-300 leading-relaxed">{about.vision}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            className="glass border border-coffee-700/20 p-8 rounded-sm"
          >
            <div className="w-12 h-12 rounded-full bg-coffee-800/50 border border-coffee-600/30 flex items-center justify-center mb-6">
              <Target size={20} className="text-coffee-300" />
            </div>
            <h3 className="font-display text-xl text-cream-100 mb-4">Misi</h3>
            <p className="text-cream-300 leading-relaxed">{about.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-accent text-coffee-300 italic text-lg">Produk Kami</span>
            <h2 className="font-display text-3xl text-cream-50 mt-2">Pilihan Produk Utama</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.products?.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass border border-coffee-800/30 p-6 rounded-sm text-center"
              >
                <div className="w-12 h-12 rounded-full bg-coffee-800/50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-coffee-300 text-lg font-display">{i + 1}</span>
                </div>
                <h3 className="font-display text-cream-100 mb-2">{product.name}</h3>
                <p className="text-cream-400 text-xs leading-relaxed">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      {about.composition && (
        <section className="py-20 px-6 bg-coffee-950/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-accent text-coffee-300 italic text-lg">Komposisi</span>
              <h2 className="font-display text-3xl text-cream-50 mt-2">Komposisi Kopi Gayo Derah</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {Object.entries(about.composition).map(([key, value], i) => {
                const labels: Record<string, string> = {
                  beans: 'Biji Kopi', roasting: 'Roasting', acidity: 'Keasaman', aroma: 'Aroma', taste: 'Rasa'
                };
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass border border-coffee-800/30 p-5 rounded-sm text-center"
                  >
                    <p className="text-coffee-300 text-xs uppercase tracking-widest mb-2 font-body">{labels[key] || key}</p>
                    <p className="text-cream-300 text-xs leading-relaxed">{value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {about.timeline && about.timeline.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Clock size={24} className="text-coffee-400 mx-auto mb-3" />
              <span className="font-accent text-coffee-300 italic text-lg">Perjalanan Kami</span>
              <h2 className="font-display text-3xl text-cream-50 mt-2">Timeline Kopi Gayo Derah</h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-coffee-800/50" />
              <div className="space-y-10">
                {about.timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="glass border border-coffee-700/20 p-5 rounded-sm inline-block max-w-xs">
                        <p className="font-display text-coffee-300 text-xl mb-2">{item.year}</p>
                        <p className="text-cream-300 text-sm">{item.event}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-coffee-500 border-2 border-coffee-300 shrink-0 z-10" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
