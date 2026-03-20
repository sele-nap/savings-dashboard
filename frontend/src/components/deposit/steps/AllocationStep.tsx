'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAllocations, setStep } from '@/store/slices/depositSlice';

export default function AllocationStep() {
  const dispatch = useAppDispatch();
  const { allocations, amount } = useAppSelector((s) => s.deposit);

  const [values, setValues] = useState<number[]>(
    allocations.map((a) => a.allocationPercent)
  );

  const total = values.reduce((sum, v) => sum + v, 0);
  const isValid = Math.round(total) === 100;

  const handleChange = (index: number, val: string) => {
    const next = [...values];
    next[index] = parseFloat(val) || 0;
    setValues(next);
  };

  const autoBalance = () => {
    const base = Math.floor(100 / values.length);
    const remainder = 100 - base * values.length;
    setValues(values.map((_, i) => (i === 0 ? base + remainder : base)));
  };

  const handleNext = () => {
    if (!isValid) return;
    dispatch(
      setAllocations(
        allocations.map((a, i) => ({ ...a, allocationPercent: values[i] }))
      )
    );
    dispatch(setStep(3));
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-semibold ${isValid ? 'text-green-600' : 'text-red-500'}`}>
            Total : {total.toFixed(0)}%
          </span>
          {!isValid && (
            <span className="text-xs text-red-400 ml-2">
              (doit être égal à 100%)
            </span>
          )}
        </div>
        <button
          onClick={autoBalance}
          className="text-xs text-indigo-600 font-medium hover:underline"
        >
          Équilibrer
        </button>
      </div>

      <ul className="space-y-3">
        {allocations.map((alloc, i) => (
          <li key={alloc.fundIsin} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900 truncate max-w-[65%]">
                {alloc.fundName}
              </p>
              <span className="text-xs text-gray-400">
                {amount ? fmt((amount * (values[i] ?? 0)) / 100) : '—'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={values[i] ?? 0}
                onChange={(e) => handleChange(i, e.target.value)}
                className="flex-1 accent-indigo-600"
              />
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={values[i] ?? 0}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-sm text-center outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => dispatch(setStep(1))}
          className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Retour
        </button>
        <button
          onClick={handleNext}
          disabled={!isValid}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
