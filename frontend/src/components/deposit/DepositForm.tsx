'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import StepIndicator from './StepIndicator';
import AmountStep from './steps/AmountStep';
import FundSelectionStep from './steps/FundSelectionStep';
import AllocationStep from './steps/AllocationStep';
import ConfirmationStep from './steps/ConfirmationStep';

const STEPS = [AmountStep, FundSelectionStep, AllocationStep, ConfirmationStep];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function DepositForm() {
  const currentStep = useAppSelector((s) => s.deposit.currentStep);
  const StepComponent = STEPS[currentStep];

  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      <StepIndicator currentStep={currentStep} />
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={currentStep}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
