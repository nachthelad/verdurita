import {
  arrangeQuotes,
  emptyQuoteLayout,
  parseQuoteLayout,
  reorderVisibleQuote,
  setQuoteHidden,
} from "../quoteLayout";

const names = ["Dólar Blue", "Dólar Oficial", "Euro Blue"];

describe("quote layout preferences", () => {
  it("reorders visible quotes and appends newly available quotes", () => {
    const reordered = reorderVisibleQuote(
      emptyQuoteLayout,
      names,
      "Euro Blue",
      "Dólar Blue",
    );

    expect(arrangeQuotes(names, reordered).visible).toEqual([
      "Euro Blue",
      "Dólar Blue",
      "Dólar Oficial",
    ]);
    expect(arrangeQuotes([...names, "Real Brasileño"], reordered).visible).toEqual([
      "Euro Blue",
      "Dólar Blue",
      "Dólar Oficial",
      "Real Brasileño",
    ]);
  });

  it("hides and restores a quote without losing its preference during a data refresh", () => {
    const hidden = setQuoteHidden(
      emptyQuoteLayout,
      names,
      "Dólar Oficial",
      true,
    );

    expect(arrangeQuotes(names, hidden).hidden).toEqual(["Dólar Oficial"]);
    expect(arrangeQuotes(["Dólar Blue", "Euro Blue"], hidden).hidden).toEqual([]);
    expect(arrangeQuotes(names, hidden).hidden).toEqual(["Dólar Oficial"]);

    const restored = setQuoteHidden(hidden, names, "Dólar Oficial", false);
    expect(arrangeQuotes(names, restored).visible).toEqual([
      "Dólar Blue",
      "Euro Blue",
      "Dólar Oficial",
    ]);
  });

  it("ignores corrupt browser data and duplicate or invalid names", () => {
    expect(parseQuoteLayout("not json")).toEqual(emptyQuoteLayout);
    expect(
      parseQuoteLayout(
        JSON.stringify({ order: ["Euro Blue", "Euro Blue", 5], hidden: [null, "Dólar Blue"] }),
      ),
    ).toEqual({ order: ["Euro Blue"], hidden: ["Dólar Blue"] });
  });
});
