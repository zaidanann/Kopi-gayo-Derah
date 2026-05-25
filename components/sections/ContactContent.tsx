'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
        setForm({ name: '', email: '', whatsapp: '', message: '' });
      } else {
        toast.error('Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="pt-24 min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/60 to-espresso" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-accent text-coffee-300 italic text-lg">Hubungi Kami</span>
          <h1 className="section-title text-cream-50 mt-2 mb-4">
            Kami Senang <span className="text-coffee-300">Mendengar</span>
          </h1>
          <p className="text-cream-300 max-w-xl mx-auto">
            Ada pertanyaan atau ingin memesan? Kirim pesan atau hubungi kami langsung.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-2xl text-cream-50 mb-8">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Nama Anda"
                  className="input-coffee"
                />
              </div>
              <div>
                <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="email@contoh.com"
                  className="input-coffee"
                />
              </div>
              <div>
                <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="08xxxxxxxxxx"
                  className="input-coffee"
                />
              </div>
              <div>
                <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  className="input-coffee resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {submitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="font-display text-2xl text-cream-50 mb-8">Informasi Kontak</h2>

            {/* Social & Contact cards */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: 'WhatsApp', value: '0812-3456-7890', href: 'https://wa.me/6281234567890', color: 'text-green-400' },
                { icon: Instagram, label: 'Instagram', value: '@kopigayoderah', href: 'https://instagram.com/kopigayoderah', color: 'text-pink-400' },
                {
                  icon: () => (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.84a8.16 8.16 0 0 0 4.78 1.52V6.93a4.85 4.85 0 0 1-1.01-.24z"/>
                    </svg>
                  ),
                  label: 'TikTok',
                  value: '@kopigayoderah',
                  href: 'https://tiktok.com/@kopigayoderah',
                  color: 'text-cream-200',
                },
                { icon: Mail, label: 'Email', value: 'hello@kopigayoderah.com', href: 'mailto:hello@kopigayoderah.com', color: 'text-coffee-300' },
                { icon: MapPin, label: 'Lokasi', value: 'Dataran Tinggi Gayo, Aceh Tengah, Aceh', href: '#map', color: 'text-red-400' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 glass border border-coffee-800/30 p-4 rounded-sm hover:border-coffee-600/40 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-full bg-coffee-900/50 flex items-center justify-center ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-cream-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-cream-200 text-sm mt-0.5">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6281234567890?text=Halo Kopi Gayo Derah, saya ingin bertanya..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-700/20 border border-green-600/30 hover:bg-green-700/30 transition-colors p-4 rounded-sm"
            >
              <MessageCircle size={20} className="text-green-400" />
              <div>
                <p className="text-green-300 text-sm font-medium">Chat langsung via WhatsApp</p>
                <p className="text-green-400/70 text-xs">Respon cepat dalam 1 jam</p>
              </div>
            </a>

            {/* Map embed */}
            <div id="map" className="rounded-sm overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127550.02498394866!2d96.7959394!3d4.6286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303085b26e01d0dd%3A0x506e5fa9d0c8e27c!2sGayo%20Lues%20Regency%2C%20Aceh!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kopi Gayo Derah"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
