import { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import axios from "axios";
import { useInternationalRates } from "../useInternationalRates";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig
    value={{ provider: () => new Map(), dedupingInterval: 0, errorRetryCount: 0 }}
  >
    {children}
  </SWRConfig>
);

beforeEach(() => {
  mockedAxios.get.mockReset();
});

it("loads USD rates, including CLP and UYU, from the local API", async () => {
  mockedAxios.get.mockResolvedValue({
    data: { rates: { EUR: 0.87716, CLP: 963.89, UYU: 40.265 } },
  });

  const { result } = renderHook(() => useInternationalRates("USD"), { wrapper });

  await waitFor(() => expect(result.current.rates.EUR).toBe(0.87716));
  expect(result.current.rates).toEqual({
    EUR: 0.87716,
    CLP: 963.89,
    UYU: 40.265,
  });
  expect(mockedAxios.get).toHaveBeenCalledWith(
    "/api/international-rates?base=USD",
  );
});

it("requests rates for UYU as the source", async () => {
  mockedAxios.get.mockResolvedValue({
    data: { rates: { USD: 0.02484 } },
  });

  const { result } = renderHook(() => useInternationalRates("UYU"), { wrapper });

  await waitFor(() => expect(result.current.rates.USD).toBe(0.02484));
  expect(mockedAxios.get).toHaveBeenCalledWith(
    "/api/international-rates?base=UYU",
  );
});

it("exposes a malformed response as an error", async () => {
  mockedAxios.get.mockResolvedValue({ data: {} });

  const { result } = renderHook(() => useInternationalRates("USD"), { wrapper });

  await waitFor(() => expect(result.current.error).toBeTruthy());
  expect(result.current.rates).toEqual({});
});

it("exposes a failed request as an error", async () => {
  mockedAxios.get.mockRejectedValue(new Error("Network unavailable"));

  const { result } = renderHook(() => useInternationalRates("USD"), { wrapper });

  await waitFor(() => expect(result.current.error).toBeTruthy());
  expect(result.current.rates).toEqual({});
});
