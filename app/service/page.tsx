import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ServiceContent from '@/components/sections/ServiceContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Layanan lengkap Kopi Gayo Derah — mulai penjualan kopi, roasting custom, coffee catering, hingga pengiriman luar kota.',
};

export default function ServicePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ServiceContent />
      <Footer />
    </main>
  );
}
