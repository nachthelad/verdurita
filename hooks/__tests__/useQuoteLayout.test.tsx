import { act, renderHook } from "@testing-library/react";
import { useQuoteLayout } from "../useQuoteLayout";
import { QUOTE_LAYOUT_STORAGE_KEY } from "@/utils/quoteLayout";

const quotes = ["Dólar Blue", "Dólar Oficial", "Euro Blue"];

describe("useQuoteLayout", () => {
  beforeEach(() => localStorage.clear());

  it("persists order and visibility across a remount and restores defaults", () => {
    const { result, unmount } = renderHook(() => useQuoteLayout(quotes));

    act(() => {
      result.current.reorder("Euro Blue", "Dólar Blue");
      result.current.hide("Dólar Oficial");
    });

    expect(result.current.visible).toEqual(["Euro Blue", "Dólar Blue"]);
    expect(result.current.hidden).toEqual(["Dólar Oficial"]);
    expect(localStorage.getItem(QUOTE_LAYOUT_STORAGE_KEY)).toContain("Euro Blue");

    unmount();
    const restored = renderHook(() => useQuoteLayout(quotes));
    expect(restored.result.current.visible).toEqual(["Euro Blue", "Dólar Blue"]);
    expect(restored.result.current.hidden).toEqual(["Dólar Oficial"]);

    act(() => restored.result.current.reset());
    expect(restored.result.current.visible).toEqual(quotes);
    expect(restored.result.current.hidden).toEqual([]);
  });
});
