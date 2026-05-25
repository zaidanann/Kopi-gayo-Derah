import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import MenuContent from '@/components/sections/MenuContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu Kopi',
  description: 'Jelajahi menu kopi premium Gayo Derah — dari espresso, cappuccino, cold brew hingga biji kopi pilihan.',
};

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <MenuContent />
      <Footer />
    </main>
  );
}
