import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'Épargne & Investissement',
  description: 'Tableau de bord de gestion de votre épargne investie',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-gray-50 font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
