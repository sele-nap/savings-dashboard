'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-base font-semibold text-gray-900">
          Mon Épargne
        </Link>
        <Link
          href="/deposit"
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            pathname === '/deposit'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
          }`}
        >
          + Déposer
        </Link>
      </div>
    </nav>
  );
}
