import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'Épargne & Investissement',
  description: 'Tableau de bord de gestion de votre épargne investie',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-gray-50 font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar />
            <main>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
