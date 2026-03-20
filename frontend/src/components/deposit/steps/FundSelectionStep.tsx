'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedFunds, setStep } from '@/store/slices/depositSlice';
import { useFunds } from '@/hooks/useFunds';

export default function FundSelectionStep() {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.deposit.selectedFunds);
  const { funds, isLoading } = useFunds();

  const [selected, setSelected] = useState<Set<string>>(
    new Set(saved.map((f) => f.isin))
  );
  const [error, setError] = useState('');

  const toggle = (isin: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(isin) ? next.delete(isin) : next.add(isin);
      return next;
    });
  };

  const handleNext = () => {
    if (selected.size === 0) {
      setError('Sélectionnez au moins un fonds.');
      return;
    }
    const selectedFunds = funds
      .filter((f) => selected.has(f.isin))
      .map((f) => ({ isin: f.isin, fundName: f.fundName }));
    dispatch(setSelectedFunds(selectedFunds));
    dispatch(setStep(2));
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">{selected.size} fonds sélectionné(s)</p>
      {error && <p className="text-xs text-red-500">{error}</p>}

      <ul className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {funds.map((fund) => {
          const lastVal = fund.valorisations.at(-1);
          const isChecked = selected.has(fund.isin);
          return (
            <li key={fund.isin}>
              <button
                onClick={() => toggle(fund.isin)}
                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                  isChecked
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                    }`}
                  >
                    {isChecked && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{fund.fundName}</p>
                    <p className="text-xs text-gray-400">{fund.isin}</p>
                  </div>
                </div>
                {lastVal && (
                  <span className="text-sm font-semibold text-gray-700">
                    {lastVal.value.toFixed(2)} €
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => dispatch(setStep(0))}
          className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Retour
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
