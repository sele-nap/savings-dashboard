'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/login') return null;

  const handleLogout = async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-base font-semibold text-gray-900">
          Mon Épargne
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
