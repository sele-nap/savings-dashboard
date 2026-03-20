import useSWR from 'swr';
import api from '@/lib/axios';

export interface PortfolioSummary {
  totalInvested: number;
  totalCurrentValue: number;
  performancePercent: number;
  fundBreakdown: Record<string, { fundName: string; currentValue: number }>;
}

export interface HistoryPoint {
  date: string;
  value: number;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const usePortfolioSummary = () => {
  const { data, error, isLoading, mutate } = useSWR<PortfolioSummary>(
    '/portfolio/summary',
    fetcher
  );
  return { summary: data, error, isLoading, mutate };
};

export const usePortfolioHistory = () => {
  const { data, error, isLoading } = useSWR<HistoryPoint[]>(
    '/portfolio/history',
    fetcher
  );
  return { history: data ?? [], error, isLoading };
};
