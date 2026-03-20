import useSWR from 'swr';
import api from '@/lib/axios';

export interface Allocation {
  fundIsin: string;
  fundName: string;
  allocationPercent: number;
  sharesBought: number;
  pricePerShareAtDate: number;
}

export interface Transaction {
  _id: string;
  amount: number;
  rib: string;
  bic: string;
  date: string;
  allocations: Allocation[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useTransactions = () => {
  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    '/transactions',
    fetcher
  );
  return { transactions: data ?? [], error, isLoading, mutate };
};
