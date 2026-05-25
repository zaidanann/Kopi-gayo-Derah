import Link from 'next/link';
import { Coffee, Instagram, Youtube, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-espresso border-t border-coffee-800/30">
      {/* Gold divider */}
      <div className="gold-line" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-700 flex items-center justify-center">
                <Coffee size={20} className="text-cream-50" />
              </div>
              <div>
                <span className="font-display text-xl text-cream-100 block leading-none">Kopi Gayo Derah</span>
                <span className="font-accent text-xs text-coffee-300 tracking-widest uppercase">Aceh Gayo, Indonesia</span>
              </div>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed max-w-xs mb-6">
              Menghadirkan kopi Arabika premium dari dataran tinggi Gayo, Aceh. Setiap cangkir adalah cerita tentang tanah, iklim, dan tangan petani yang penuh dedikasi.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/kopigayoderah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-coffee-700 flex items-center justify-center text-coffee-300 hover:border-coffee-400 hover:text-coffee-300 transition-all hover:scale-110"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://tiktok.com/@kopigayoderah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-coffee-700 flex items-center justify-center text-coffee-300 hover:border-coffee-400 transition-all hover:scale-110"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.84a8.16 8.16 0 0 0 4.78 1.52V6.93a4.85 4.85 0 0 1-1.01-.24z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-coffee-700 flex items-center justify-center text-coffee-300 hover:border-green-500 hover:text-green-400 transition-all hover:scale-110"
              >
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm text-cream-100 mb-6 tracking-wide">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'Tentang Kami' },
                { href: '/menu', label: 'Menu Kopi' },
                { href: '/service', label: 'Layanan' },
                { href: '/contact', label: 'Kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream-400 text-sm hover:text-coffee-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm text-cream-100 mb-6 tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-coffee-400 mt-0.5 shrink-0" />
                <span className="text-cream-400 text-sm">Dataran Tinggi Gayo, Aceh Tengah, Aceh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-coffee-400 shrink-0" />
                <a href="tel:+6281234567890" className="text-cream-400 text-sm hover:text-coffee-300 transition-colors">
                  0812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-coffee-400 shrink-0" />
                <a href="mailto:hello@kopigayoderah.com" className="text-cream-400 text-sm hover:text-coffee-300 transition-colors">
                  hello@kopigayoderah.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={15} className="text-coffee-400 shrink-0" />
                <span className="text-cream-400 text-sm">@kopigayoderah</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-coffee-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-500 text-xs">
            © {new Date().getFullYear()} Kopi Gayo Derah. Semua hak dilindungi.
          </p>
          <p className="text-cream-500 text-xs flex items-center gap-1">
            Dibuat dengan <Heart size={10} className="text-coffee-400 fill-coffee-400" /> dari Aceh Gayo
          </p>
        </div>
      </div>
    </footer>
  );
}
