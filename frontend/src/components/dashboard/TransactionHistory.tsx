'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '@/hooks/useTransactions';

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function TransactionHistory() {
  const { transactions, isLoading } = useTransactions();
  const [openId, setOpenId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm animate-pulse h-40" />;
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm text-center text-gray-400 text-sm">
        Aucune transaction pour le moment.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl bg-white shadow-sm overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700">Historique des transactions</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {transactions.map((tx) => {
          const isOpen = openId === tx._id;
          return (
            <li key={tx._id}>
              <button
                onClick={() => setOpenId(isOpen ? null : tx._id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{fmt(tx.amount)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmtDate(tx.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {tx.allocations.length} fonds
                  </span>
                  <span
                    className={`text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 space-y-2">
                      <p className="text-xs text-gray-400 mb-2">
                        RIB : {tx.rib} — BIC : {tx.bic}
                      </p>
                      {tx.allocations.map((alloc) => (
                        <div
                          key={alloc.fundIsin}
                          className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="text-gray-700 font-medium truncate max-w-[55%]">
                            {alloc.fundName}
                          </span>
                          <div className="flex items-center gap-3 text-gray-500">
                            <span>{alloc.allocationPercent}%</span>
                            <span>{fmt((tx.amount * alloc.allocationPercent) / 100)}</span>
                            <span>{alloc.sharesBought.toFixed(4)} parts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
