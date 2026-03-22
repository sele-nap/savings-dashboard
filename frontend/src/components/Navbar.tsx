'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import api from '@/lib/axios';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const locale = useLocale();

  if (pathname === '/login') return null;

  const handleLogout = async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
    router.push('/login');
  };

  const switchLocale = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="mx-auto max-w-4xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-gray-900 tracking-tight">
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
          {t('title')}
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            ↪ {t('logout')}
          </button>
          <button
            onClick={switchLocale}
            className="w-10 h-7 flex items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
          >
            {t('lang')}
          </button>
        </div>
      </div>
    </nav>
  );
}
