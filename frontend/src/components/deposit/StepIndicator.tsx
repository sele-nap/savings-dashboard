'use client';

const STEPS = ['Montant', 'Fonds', 'Allocation', 'Confirmation'];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((label, index) => {
        const isDone = index < currentStep;
        const isActive = index === currentStep;
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isDone
                    ? 'bg-indigo-600 text-white'
                    : isActive
                    ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isDone ? '✓' : index + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                  isDone ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
