import { fireEvent, render, screen } from "@testing-library/react";
import InternationalCalculator from "../index";

jest.mock("@/hooks/useCurrencies", () => ({
  useCurrencies: () => ({
    currencies: [
      {
        nombre: "Dólar Blue",
        moneda: "USD",
        casa: "blue",
        compra: 1540,
        venta: 1560,
        promedio: 1550,
      },
    ],
  }),
}));

jest.mock("@/hooks/useInternationalRates", () => ({
  useInternationalRates: () => ({ rates: {} }),
  INTERNATIONAL_CURRENCIES: [],
}));

describe("calculator with the mobile keyboard", () => {
  it("scrolls the conversion result above the visible viewport", () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 844,
    });
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: {
        height: 450,
        offsetTop: 0,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    });
    const scrollBy = jest.fn();
    Object.defineProperty(window, "scrollBy", {
      configurable: true,
      value: scrollBy,
    });
    Object.defineProperty(window, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    });

    render(<InternationalCalculator initialLocalSource="Dólar Blue" />);
    const resultSection = screen.getByText("Es igual a").parentElement;
    expect(resultSection).not.toBeNull();
    jest.spyOn(resultSection!, "getBoundingClientRect").mockReturnValue({
      bottom: 650,
    } as DOMRect);

    fireEvent.focus(screen.getByRole("textbox", { name: "Monto a convertir" }));

    expect(scrollBy).toHaveBeenCalledWith({ top: 216, behavior: "auto" });
  });

  it("also adapts when the layout viewport shrinks", () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 844,
    });
    const viewport = {
      height: 844,
      offsetTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: viewport,
    });
    const scrollBy = jest.fn();
    Object.defineProperty(window, "scrollBy", {
      configurable: true,
      value: scrollBy,
    });
    Object.defineProperty(window, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    });

    render(<InternationalCalculator initialLocalSource="Dólar Blue" />);
    const resultSection = screen.getByText("Es igual a").parentElement;
    expect(resultSection).not.toBeNull();
    jest.spyOn(resultSection!, "getBoundingClientRect").mockReturnValue({
      bottom: 650,
    } as DOMRect);
    fireEvent.focus(screen.getByRole("textbox", { name: "Monto a convertir" }));
    expect(scrollBy).not.toHaveBeenCalled();

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 450,
    });
    viewport.height = 450;
    fireEvent.resize(window);

    expect(scrollBy).toHaveBeenCalledWith({ top: 216, behavior: "auto" });
  });
});
