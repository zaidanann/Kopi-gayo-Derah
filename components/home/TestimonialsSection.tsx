'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmad Fauzi',
    role: 'Coffee Enthusiast, Jakarta',
    text: 'Kopi Gayo Derah adalah yang terbaik yang pernah saya coba. Aromanya benar-benar berbeda, ada nuansa floral dan fruity yang sangat khas. Wajib coba!',
    rating: 5,
    avatar: 'AF',
  },
  {
    name: 'Rina Kusuma',
    role: 'Barista Profesional, Bandung',
    text: 'Sebagai barista, saya sangat selektif dalam memilih biji kopi. Biji kopi Arabika Gayo Derah memiliki konsistensi yang luar biasa dan karakter rasa yang kompleks.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Dedi Setiawan',
    role: 'Pemilik Coffee Shop, Medan',
    text: 'Sudah 2 tahun saya menggunakan kopi dari Gayo Derah untuk kedai saya. Pelanggan selalu puas dan banyak yang balik lagi karena kopi Gayo-nya.',
    rating: 5,
    avatar: 'DS',
  },
  {
    name: 'Maya Putri',
    role: 'Penggemar Kopi, Surabaya',
    text: 'Cold brew dari Gayo Derah adalah minuman favorit saya setiap hari. Rasanya halus, tidak pahit berlebihan, dan ada manisnya natural. Sangat recommended!',
    rating: 5,
    avatar: 'MP',
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1920&h=1080&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-coffee-950/90" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-coffee-300 text-lg italic">Testimoni Pelanggan</span>
          <h2 className="section-title text-cream-50 mt-2">
            Kata Mereka Tentang
            <br />
            <span className="text-coffee-300">Kopi Gayo Derah</span>
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-6" />
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass border border-coffee-700/20 p-6 rounded-sm relative"
            >
              <Quote size={24} className="text-coffee-700 mb-4" />
              <p className="text-cream-300 text-sm leading-relaxed mb-6 font-body">{t.text}</p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-coffee-300 fill-coffee-300" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coffee-500 to-coffee-800 flex items-center justify-center text-xs font-display text-cream-100">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-cream-100 text-sm font-body font-medium">{t.name}</p>
                  <p className="text-cream-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
