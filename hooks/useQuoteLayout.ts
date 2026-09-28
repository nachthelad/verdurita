import { useCallback, useEffect, useMemo, useState } from "react";
import {
  arrangeQuotes,
  emptyQuoteLayout,
  parseQuoteLayout,
  QUOTE_LAYOUT_STORAGE_KEY,
  QuoteLayout,
  reorderVisibleQuote,
  setQuoteHidden,
} from "@/utils/quoteLayout";

export function useQuoteLayout(names: string[]) {
  const [layout, setLayout] = useState<QuoteLayout>(emptyQuoteLayout);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setLayout(
        parseQuoteLayout(localStorage.getItem(QUOTE_LAYOUT_STORAGE_KEY)),
      );
    } catch {
      // Browser storage can be unavailable; keep preferences for this visit.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(QUOTE_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    } catch {
      // The in-memory layout still works when storage is unavailable.
    }
  }, [layout, loaded]);

  const { visible, hidden } = useMemo(
    () => arrangeQuotes(names, layout),
    [names, layout],
  );

  const reorder = useCallback(
    (active: string, target: string) => {
      setLayout((current) =>
        reorderVisibleQuote(current, names, active, target),
      );
    },
    [names],
  );

  const hide = useCallback(
    (name: string) => {
      setLayout((current) => setQuoteHidden(current, names, name, true));
    },
    [names],
  );

  const show = useCallback(
    (name: string) => {
      setLayout((current) => setQuoteHidden(current, names, name, false));
    },
    [names],
  );

  const reset = useCallback(() => setLayout(emptyQuoteLayout), []);

  return { visible, hidden, reorder, hide, show, reset };
}
