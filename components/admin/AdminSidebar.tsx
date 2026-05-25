'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Coffee, LayoutDashboard, UtensilsCrossed, Wrench, Info, MessageSquare, LogOut, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/menu', label: 'Menu Kopi', icon: UtensilsCrossed },
  { href: '/admin/service', label: 'Layanan', icon: Wrench },
  { href: '/admin/about', label: 'Tentang', icon: Info },
  { href: '/admin/messages', label: 'Pesan Masuk', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    toast.success('Berhasil logout.');
    router.push('/admin/login');
  };

  return (
    <aside className="admin-sidebar fixed left-0 top-0 bottom-0 w-64 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-coffee-800/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-700 flex items-center justify-center shrink-0">
            <Coffee size={16} className="text-cream-50" />
          </div>
          <div>
            <p className="font-display text-cream-100 text-sm leading-none">Kopi Gayo Derah</p>
            <p className="font-body text-coffee-400 text-xs mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all font-body',
                active
                  ? 'bg-coffee-800/60 text-cream-100 border border-coffee-700/40'
                  : 'text-cream-400 hover:text-cream-200 hover:bg-coffee-900/40'
              )}
            >
              <item.icon size={16} className={active ? 'text-coffee-300' : 'text-cream-500'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-coffee-800/30 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm text-cream-400 hover:text-cream-200 hover:bg-coffee-900/40 transition-all"
        >
          <ExternalLink size={15} className="text-cream-500" />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
