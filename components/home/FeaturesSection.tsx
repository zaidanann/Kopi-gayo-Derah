'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Leaf, Flame, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Biji Kopi Premium',
    description: 'Dipilih secara selektif dari pohon kopi Arabika terbaik di dataran tinggi Gayo yang telah berumur lebih dari 5 tahun.',
  },
  {
    icon: Leaf,
    title: 'Aroma Khas',
    description: 'Aroma floral yang khas dengan sentuhan buah tropis, cokelat, dan rempah — hasil dari iklim unik Gayo Aceh.',
  },
  {
    icon: Flame,
    title: 'Proses Roasting Terbaik',
    description: 'Roasting dilakukan dengan metode tradisional yang dikombinasikan dengan teknologi modern untuk hasil yang konsisten.',
  },
  {
    icon: Shield,
    title: '100% Kopi Asli Gayo',
    description: 'Langsung dari petani Gayo tanpa campuran apapun. Keaslian dan kualitas dijamin dari kebun hingga cangkir Anda.',
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso to-coffee-950/50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-coffee-300 text-lg italic">Kenapa Memilih Kami</span>
          <h2 className="section-title text-cream-50 mt-2">
            Keunggulan Kopi
            <span className="text-coffee-300"> Gayo Derah</span>
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-6" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass border border-coffee-800/30 rounded-sm p-8 card-hover group"
            >
              <div className="w-12 h-12 rounded-full bg-coffee-800/50 border border-coffee-700/40 flex items-center justify-center mb-6 group-hover:border-coffee-500/60 transition-colors">
                <feature.icon size={22} className="text-coffee-300" />
              </div>
              <h3 className="font-display text-lg text-cream-100 mb-3">{feature.title}</h3>
              <p className="font-body text-cream-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom image strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.9 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-3 rounded-sm overflow-hidden h-48"
        >
          {[
            'https://images.unsplash.com/photo-1442550528054-b88e81ee5e36?w=600&h=300&fit=crop',
            'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&h=300&fit=crop',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=300&fit=crop',
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={src} alt="Kopi Gayo" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-coffee-950/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
