import useSWR from "swr";
import axios from "axios";

export { INTERNATIONAL_CURRENCIES } from "@/constants/internationalCurrencies";

interface InternationalRatesResponse {
  rates: Record<string, number>;
}

const fetcher = async (url: string): Promise<InternationalRatesResponse> => {
  const { data } = await axios.get<InternationalRatesResponse>(url);
  if (!data?.rates || typeof data.rates !== "object") {
    throw new Error("Invalid international rates response");
  }
  return data;
};

export function useInternationalRates(baseCurrency: string = "USD") {
  const { data, error, isLoading } = useSWR<InternationalRatesResponse>(
    baseCurrency ? `/api/international-rates?base=${baseCurrency}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  return {
    rates: data?.rates ?? {},
    isLoading,
    error,
  };
}
