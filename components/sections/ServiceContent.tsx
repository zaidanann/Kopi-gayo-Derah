'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, Package, Flame, MessageCircle, Users, ShoppingCart, Truck, CheckCircle } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string;
  available: boolean;
}

const iconMap: Record<string, any> = {
  Coffee, Package, Flame, MessageCircle, Users, ShoppingCart, Truck, CheckCircle
};

export default function ServiceContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/service')
      .then((r) => r.json())
      .then((data) => { if (data.success) setServices(data.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={ref} className="pt-24 min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=600&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-espresso/85" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-accent text-coffee-300 italic text-lg">Yang Kami Tawarkan</span>
          <h1 className="section-title text-cream-50 mt-2 mb-4">
            Layanan <span className="text-coffee-300">Terbaik</span>
          </h1>
          <p className="text-cream-300 max-w-xl mx-auto">
            Dari secangkir kopi siap minum hingga pengiriman ke seluruh Indonesia, kami hadir untuk melayani kebutuhan kopi Anda.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : services.length === 0 ? (
            <EmptyState title="Layanan belum tersedia" description="Layanan akan ditampilkan di sini." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] || Coffee;
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="glass border border-coffee-800/30 rounded-sm overflow-hidden card-hover group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/90 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-full bg-coffee-700/80 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={18} className="text-coffee-200" />
                        </div>
                      </div>
                      {!service.available && (
                        <span className="absolute top-3 right-3 badge badge-unavailable">Tidak tersedia</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-cream-100 text-xl mb-3">{service.title}</h3>
                      <p className="text-cream-400 text-sm leading-relaxed mb-4">{service.description}</p>
                      {service.price && (
                        <div className="pt-4 border-t border-coffee-800/30">
                          <span className="font-accent text-coffee-300 text-sm italic">{service.price}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center glass border border-coffee-700/20 p-12 rounded-sm">
          <h2 className="font-display text-3xl text-cream-50 mb-4">Tertarik dengan Layanan Kami?</h2>
          <p className="text-cream-300 mb-8">Hubungi kami melalui WhatsApp untuk diskusi lebih lanjut atau pesan langsung sekarang.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Hubungi via WhatsApp
            </a>
            <a href="/contact" className="btn-outline">
              Form Kontak
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
