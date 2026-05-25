'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Tentang' },
  { href: '/menu', label: 'Menu' },
  { href: '/service', label: 'Layanan' },
  { href: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass-dark py-3' : 'bg-transparent py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Coffee size={18} className="text-cream-50" />
          </div>
          <div>
            <span className="font-display text-lg text-cream-100 leading-none block">Kopi Gayo</span>
            <span className="font-accent text-xs text-coffee-300 tracking-widest uppercase leading-none">Derah</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'font-body text-sm tracking-wide transition-colors relative group',
                  pathname === link.href ? 'text-coffee-300' : 'text-cream-200 hover:text-coffee-300'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-coffee-400 transition-all duration-300',
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/menu" className="btn-primary text-sm py-2 px-5">
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream-200 hover:text-cream-50 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-coffee-800/30"
          >
            <ul className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block font-body text-base py-1',
                      pathname === link.href ? 'text-coffee-300' : 'text-cream-200'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/menu" onClick={() => setIsOpen(false)} className="btn-primary block text-center mt-4">
                  Pesan Sekarang
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
