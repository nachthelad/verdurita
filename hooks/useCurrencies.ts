import useSWR from 'swr';
import axios from 'axios';
import { Moneda } from '@/types/moneda';
import { defaultResults } from '@/constants/defaultResults';

const fetcher = (url: string) => axios.get(url).then(res => {
  const data = res.data;
  return Array.isArray(data) ? data : defaultResults;
});

export function useCurrencies() {
  const { data, error, isLoading, mutate } = useSWR<Moneda[]>('/api/currencies', fetcher, {
    fallbackData: defaultResults, // Ensure we always have data
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000, // Dedupe requests for 5 seconds
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    onErrorRetry: (_err, _key, _config, revalidate, { retryCount }) => {
      // Exponential backoff
      const timeout = Math.pow(2, retryCount) * 1000;
      setTimeout(() => revalidate({ retryCount }), timeout);
    }
  });

  return {
    currencies: data,
    isLoading,
    error,
    refresh: mutate
  };
}