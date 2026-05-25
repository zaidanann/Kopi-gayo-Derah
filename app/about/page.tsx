import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AboutContent from '@/components/sections/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Sejarah dan cerita di balik Kopi Gayo Derah - brand kopi premium asal dataran tinggi Gayo, Aceh.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  );
}
