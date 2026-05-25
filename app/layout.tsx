import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Kopi Gayo Derah | Cita Rasa Kopi Nusantara Asli Aceh Gayo',
    template: '%s | Kopi Gayo Derah',
  },
  description:
    'Kopi Gayo Derah menghadirkan kopi Arabika premium dari dataran tinggi Gayo, Aceh. Rasakan keaslian cita rasa kopi nusantara terbaik.',
  keywords: ['kopi gayo', 'kopi aceh', 'arabika gayo', 'kopi premium', 'kopi nusantara'],
  authors: [{ name: 'Kopi Gayo Derah' }],
  openGraph: {
    title: 'Kopi Gayo Derah',
    description: 'Cita Rasa Kopi Nusantara Asli Aceh Gayo',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="grain antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a0a00',
              color: '#f5f0e8',
              border: '1px solid rgba(200, 169, 122, 0.3)',
              fontFamily: "'DM Sans', sans-serif",
            },
            success: {
              iconTheme: {
                primary: '#d4a843',
                secondary: '#1a0a00',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1a0a00',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
