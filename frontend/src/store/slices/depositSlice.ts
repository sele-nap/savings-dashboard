import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedFund {
  isin: string;
  fundName: string;
}

interface Allocation {
  fundIsin: string;
  fundName: string;
  allocationPercent: number;
}

interface DepositState {
  currentStep: number;
  amount: number | null;
  rib: string;
  bic: string;
  selectedFunds: SelectedFund[];
  allocations: Allocation[];
}

const initialState: DepositState = {
  currentStep: 0,
  amount: null,
  rib: '',
  bic: '',
  selectedFunds: [],
  allocations: [],
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setAmountAndBankDetails: (
      state,
      action: PayloadAction<{ amount: number; rib: string; bic: string }>
    ) => {
      state.amount = action.payload.amount;
      state.rib = action.payload.rib;
      state.bic = action.payload.bic;
    },
    setSelectedFunds: (state, action: PayloadAction<SelectedFund[]>) => {
      state.selectedFunds = action.payload;
      const count = action.payload.length;
      const base = count > 0 ? Math.floor(100 / count) : 0;
      const remainder = count > 0 ? 100 - base * count : 0;
      state.allocations = action.payload.map((f, i) => ({
        fundIsin: f.isin,
        fundName: f.fundName,
        allocationPercent: i === 0 ? base + remainder : base,
      }));
    },
    setAllocations: (state, action: PayloadAction<Allocation[]>) => {
      state.allocations = action.payload;
    },
    resetDeposit: () => initialState,
  },
});

export const {
  setStep,
  setAmountAndBankDetails,
  setSelectedFunds,
  setAllocations,
  resetDeposit,
} = depositSlice.actions;

export default depositSlice.reducer;
