import { configureStore } from '@reduxjs/toolkit';
import depositReducer from './slices/depositSlice';

export const store = configureStore({
  reducer: {
    deposit: depositReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
