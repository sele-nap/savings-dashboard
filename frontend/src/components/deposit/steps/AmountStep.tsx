'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAmountAndBankDetails, setStep } from '@/store/slices/depositSlice';

const IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/;
const BIC_REGEX = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

export default function AmountStep() {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.deposit);

  const [amount, setAmount] = useState(saved.amount?.toString() ?? '');
  const [rib, setRib] = useState(saved.rib);
  const [bic, setBic] = useState(saved.bic);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) errs.amount = 'Montant requis et doit être positif.';
    if (!rib.trim()) errs.rib = 'Le RIB est requis.';
    else if (!IBAN_REGEX.test(rib.toUpperCase().replace(/\s/g, '')))
      errs.rib = 'Format RIB invalide (ex: FR7630004000031234567890143).';
    if (!bic.trim()) errs.bic = 'Le BIC est requis.';
    else if (!BIC_REGEX.test(bic.toUpperCase()))
      errs.bic = 'Format BIC invalide (ex: BNPAFRPP).';
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    dispatch(
      setAmountAndBankDetails({
        amount: parseFloat(amount),
        rib: rib.toUpperCase().replace(/\s/g, ''),
        bic: bic.toUpperCase(),
      })
    );
    dispatch(setStep(1));
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Montant (€) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            errors.amount ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          RIB (IBAN) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="FR7630004000031234567890143"
          value={rib}
          onChange={(e) => setRib(e.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition uppercase ${
            errors.rib ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.rib && <p className="mt-1 text-xs text-red-500">{errors.rib}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          BIC <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="BNPAFRPP"
          value={bic}
          onChange={(e) => setBic(e.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition uppercase ${
            errors.bic ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.bic && <p className="mt-1 text-xs text-red-500">{errors.bic}</p>}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 transition-colors"
      >
        Suivant →
      </button>
    </div>
  );
}
