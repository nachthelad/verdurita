export type QuoteLayout = {
  order: string[];
  hidden: string[];
};

export const QUOTE_LAYOUT_STORAGE_KEY = "verdurita.quoteLayout.v1";

export const emptyQuoteLayout: QuoteLayout = { order: [], hidden: [] };

const uniqueNames = (names: string[]): string[] =>
  Array.from(new Set(names.filter((name) => typeof name === "string" && name)));

export const parseQuoteLayout = (value: string | null): QuoteLayout => {
  if (!value) return emptyQuoteLayout;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return emptyQuoteLayout;

    const layout = parsed as Partial<QuoteLayout>;
    return {
      order: uniqueNames(Array.isArray(layout.order) ? layout.order : []),
      hidden: uniqueNames(Array.isArray(layout.hidden) ? layout.hidden : []),
    };
  } catch {
    return emptyQuoteLayout;
  }
};

export const arrangeQuotes = (names: string[], layout: QuoteLayout) => {
  const available = uniqueNames(names);
  const availableSet = new Set(available);
  const ordered = [
    ...layout.order.filter((name) => availableSet.has(name)),
    ...available.filter((name) => !layout.order.includes(name)),
  ];
  const hiddenSet = new Set(layout.hidden);

  return {
    visible: ordered.filter((name) => !hiddenSet.has(name)),
    hidden: ordered.filter((name) => hiddenSet.has(name)),
  };
};

const withUnavailable = (
  visible: string[],
  hidden: string[],
  layout: QuoteLayout,
  available: string[],
): string[] => {
  const availableSet = new Set(available);
  return [
    ...visible,
    ...hidden,
    ...layout.order.filter((name) => !availableSet.has(name)),
  ];
};

export const reorderVisibleQuote = (
  layout: QuoteLayout,
  names: string[],
  active: string,
  target: string,
): QuoteLayout => {
  const { visible, hidden } = arrangeQuotes(names, layout);
  const from = visible.indexOf(active);
  const to = visible.indexOf(target);
  if (from < 0 || to < 0 || from === to) return layout;

  const reordered = [...visible];
  reordered.splice(from, 1);
  reordered.splice(to, 0, active);

  return {
    ...layout,
    order: withUnavailable(reordered, hidden, layout, names),
  };
};

export const setQuoteHidden = (
  layout: QuoteLayout,
  names: string[],
  name: string,
  shouldHide: boolean,
): QuoteLayout => {
  const { visible, hidden } = arrangeQuotes(names, layout);
  if (shouldHide && !visible.includes(name)) return layout;
  if (!shouldHide && !hidden.includes(name)) return layout;

  const nextVisible = shouldHide
    ? visible.filter((item) => item !== name)
    : [...visible, name];
  const nextHidden = shouldHide
    ? [...hidden, name]
    : hidden.filter((item) => item !== name);

  return {
    order: withUnavailable(nextVisible, nextHidden, layout, names),
    hidden: shouldHide
      ? uniqueNames([...layout.hidden, name])
      : layout.hidden.filter((item) => item !== name),
  };
};
