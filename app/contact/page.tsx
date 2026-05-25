import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ContactContent from '@/components/sections/ContactContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Kopi Gayo Derah — kirim pesan, hubungi via WhatsApp, atau kunjungi kami di Aceh Gayo.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}
