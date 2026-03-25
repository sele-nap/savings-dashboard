'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTranslations } from 'next-intl';
import { usePortfolioHistory } from '@/hooks/usePortfolio';
import { motion } from 'framer-motion';

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });

const formatEur = (v: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);

export default function EvolutionChart() {
  const t = useTranslations('dashboard');
  const { history, isLoading, error } = usePortfolioHistory();

  if (isLoading) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm animate-pulse h-64" />;
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 flex items-center justify-center h-64 text-red-500 text-sm">
        {t('loadingError')}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm flex items-center justify-center h-64 text-gray-400 text-sm">
        {t('noData')}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('evolution')}</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={history} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(v) => `${v}€`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            width={56}
          />
          <Tooltip
            formatter={(value: number) => [formatEur(value), t('value')]}
            labelFormatter={(label) => formatDate(label)}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
