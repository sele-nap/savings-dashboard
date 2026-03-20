'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetDeposit, setStep } from '@/store/slices/depositSlice';
import { mutate } from 'swr';
import api from '@/lib/axios';

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

export default function ConfirmationStep() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { amount, rib, bic, allocations } = useAppSelector((s) => s.deposit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/transactions', {
        amount,
        rib,
        bic,
        allocations: allocations.map((a) => ({
          fundIsin: a.fundIsin,
          allocationPercent: a.allocationPercent,
        })),
      });
      await mutate('/transactions');
      await mutate('/portfolio/summary');
      await mutate('/portfolio/history');
      dispatch(resetDeposit());
      router.push('/');
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-gray-50 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Montant</span>
          <span className="font-semibold text-gray-900">{fmt(amount ?? 0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">RIB</span>
          <span className="font-mono text-gray-700 text-xs">{rib}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">BIC</span>
          <span className="font-mono text-gray-700 text-xs">{bic}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Répartition
        </p>
        {allocations.map((alloc) => (
          <div
            key={alloc.fundIsin}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm"
          >
            <span className="text-gray-700 truncate max-w-[55%]">{alloc.fundName}</span>
            <div className="flex items-center gap-3 text-gray-500 text-xs">
              <span className="font-medium text-indigo-600">{alloc.allocationPercent}%</span>
              <span>{fmt((amount ?? 0) * alloc.allocationPercent / 100)}</span>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => dispatch(setStep(2))}
          disabled={loading}
          className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {loading ? 'Traitement…' : 'Confirmer le dépôt'}
        </button>
      </div>
    </div>
  );
}
