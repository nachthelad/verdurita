import { fireEvent, render, screen } from "@testing-library/react";
import InternationalCalculator from "../index";

let mockRatesByBase: Record<string, Record<string, number>> = {};
let mockLoading = false;
let mockError: Error | undefined;

jest.mock("@/hooks/useCurrencies", () => ({
  useCurrencies: () => ({ currencies: [] }),
}));

jest.mock("@/hooks/useInternationalRates", () => ({
  useInternationalRates: (base: string) => ({
    rates: mockRatesByBase[base] ?? {},
    isLoading: mockLoading,
    error: mockError,
  }),
  INTERNATIONAL_CURRENCIES: [
    { code: "USD" },
    { code: "EUR" },
    { code: "CLP" },
    { code: "UYU" },
  ],
}));

const enterInternationalAmount = () => {
  render(<InternationalCalculator initialLocalSource="Peso Argentino" />);
  fireEvent.click(screen.getByRole("tab", { name: "Internacional" }));
  fireEvent.change(screen.getByRole("textbox", { name: "Monto a convertir" }), {
    target: { value: "100" },
  });
};

const selectCurrency = (index: number, code: string) => {
  fireEvent.mouseDown(screen.getAllByRole("combobox")[index]);
  fireEvent.click(screen.getByRole("option", { name: code }));
};

beforeEach(() => {
  mockRatesByBase = {
    USD: { EUR: 0.87716, CLP: 963.89, UYU: 40.265 },
    EUR: { USD: 1.14 },
    UYU: { USD: 0.02484 },
  };
  mockLoading = false;
  mockError = undefined;
});

it("converts USD to EUR and CLP when the target changes", () => {
  enterInternationalAmount();
  expect(screen.getByText("87,72")).toBeInTheDocument();

  selectCurrency(1, "CLP");
  expect(screen.getByText("96.389,00")).toBeInTheDocument();
});

it("converts UYU to USD and recalculates after swapping", () => {
  enterInternationalAmount();
  selectCurrency(0, "UYU");
  selectCurrency(1, "USD");
  expect(screen.getByText("2,48")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Intercambiar monedas" }));
  expect(screen.getByText("4.026,50")).toBeInTheDocument();
});

it("shows loading, failure, and missing-rate states without a zero result", () => {
  mockLoading = true;
  const { rerender } = render(
    <InternationalCalculator initialLocalSource="Peso Argentino" />,
  );
  fireEvent.click(screen.getByRole("tab", { name: "Internacional" }));
  fireEvent.change(screen.getByRole("textbox", { name: "Monto a convertir" }), {
    target: { value: "100" },
  });
  expect(screen.getByRole("status")).toHaveTextContent("Cargando cotización");
  expect(screen.queryByText("0,00")).not.toBeInTheDocument();

  mockLoading = false;
  mockError = new Error("Network unavailable");
  rerender(<InternationalCalculator initialLocalSource="Peso Argentino" />);
  expect(screen.getByRole("status")).toHaveTextContent("No se pudo cargar");
  expect(screen.queryByText("0,00")).not.toBeInTheDocument();

  mockError = undefined;
  mockRatesByBase = { USD: {} };
  rerender(<InternationalCalculator initialLocalSource="Peso Argentino" />);
  expect(screen.getByRole("status")).toHaveTextContent("no disponible");
  expect(screen.queryByText("0,00")).not.toBeInTheDocument();
});

it("converts a currency to itself even when the provider fails", () => {
  mockError = new Error("Network unavailable");
  enterInternationalAmount();
  selectCurrency(1, "USD");

  expect(screen.getByText("100,00")).toBeInTheDocument();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
