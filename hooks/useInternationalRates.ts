import useSWR from "swr";
import axios from "axios";

export const INTERNATIONAL_CURRENCIES = [
  { code: "USD", name: "Dólar Estadounidense" },
  { code: "EUR", name: "Euro" },
  { code: "BRL", name: "Real Brasileño" },
  { code: "GBP", name: "Libra Esterlina" },
  { code: "JPY", name: "Yen Japonés" },
  { code: "CAD", name: "Dólar Canadiense" },
  { code: "AUD", name: "Dólar Australiano" },
  { code: "CHF", name: "Franco Suizo" },
  { code: "CNY", name: "Yuan Chino" },
  { code: "CLP", name: "Peso Chileno" },
  { code: "UYU", name: "Peso Uruguayo" },
  { code: "MXN", name: "Peso Mexicano" },
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useInternationalRates(baseCurrency: string = "USD") {
  const { data, error, isLoading } = useSWR(
    baseCurrency
      ? `https://api.frankfurter.app/latest?from=${baseCurrency}`
      : null,
    fetcher,
    {
      refreshInterval: 0, // Don't auto-refresh international rates constantly
      revalidateOnFocus: false,
    },
  );

  return {
    rates: data?.rates || {},
    date: data?.date,
    isLoading,
    error,
  };
}
