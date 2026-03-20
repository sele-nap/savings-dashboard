'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { usePortfolioSummary } from '@/hooks/usePortfolio';
import { motion } from 'framer-motion';

const COLORS = [
  '#4f46e5', '#7c3aed', '#0891b2', '#059669', '#d97706',
  '#dc2626', '#db2777', '#65a30d', '#ea580c', '#0284c7',
];

export default function AllocationPieChart() {
  const { summary, isLoading } = usePortfolioSummary();

  if (isLoading) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm animate-pulse h-64" />;
  }

  const breakdown = summary?.fundBreakdown ?? {};
  const data = Object.entries(breakdown).map(([, v]) => ({
    name: v.fundName.replace(' Fund', ''),
    value: parseFloat(v.currentValue.toFixed(2)),
  }));

  if (data.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm flex items-center justify-center h-64 text-gray-400 text-sm">
        Aucun investissement pour le moment.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Répartition des fonds</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
            }
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
