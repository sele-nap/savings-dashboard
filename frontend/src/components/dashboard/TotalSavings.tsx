'use client';

import { motion } from 'framer-motion';
import { usePortfolioSummary } from '@/hooks/usePortfolio';

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

export default function TotalSavings() {
  const { summary, isLoading } = usePortfolioSummary();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm animate-pulse h-36" />
    );
  }

  const isPositive = (summary?.performancePercent ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm"
    >
      <p className="text-sm font-medium text-indigo-200">Épargne actuelle</p>
      <p className="mt-1 text-4xl font-bold tracking-tight">
        {fmt(summary?.totalCurrentValue ?? 0)}
      </p>
      <div className="mt-3 flex items-center gap-4 text-sm">
        <span className="text-indigo-200">
          Investi : {fmt(summary?.totalInvested ?? 0)}
        </span>
        <span
          className={`font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}
        >
          {isPositive ? '+' : ''}
          {(summary?.performancePercent ?? 0).toFixed(2)} %
        </span>
      </div>
    </motion.div>
  );
}
