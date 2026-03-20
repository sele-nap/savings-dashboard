import useSWR from 'swr';
import api from '@/lib/axios';

export interface Fund {
  _id: string;
  isin: string;
  fundName: string;
  valorisations: { date: string; value: number }[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useFunds = () => {
  const { data, error, isLoading } = useSWR<Fund[]>('/funds', fetcher);
  return { funds: data ?? [], error, isLoading };
};
