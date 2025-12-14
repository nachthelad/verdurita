import { Moneda } from "@/types/moneda";

/**
 * Converts an amount from a source currency to a target currency using international rates.
 * @param amount The amount to convert
 * @param rate The exchange rate from Source to Target (e.g., 1 USD = 0.95 EUR, rate is 0.95)
 */
export const convertInternational = (amount: number, rate: number): number => {
  if (!rate || isNaN(rate)) return 0;
  return amount * rate;
};

/**
 * Converts an amount from a source currency to a target currency using ARS as a pivot.
 * Uses the 'promedio' (average of buy/sell) for the conversion to represent a mid-market rate.
 * Formula: (Amount * Source_ARS_Price) / Target_ARS_Price
 *
 * @param amount The amount to convert
 * @param sourcePriceARS The price of the source currency in ARS
 * @param targetPriceARS The price of the target currency in ARS
 */
export const convertLocalPivot = (
  amount: number,
  sourcePriceARS: number,
  targetPriceARS: number,
): number => {
  if (!targetPriceARS || targetPriceARS === 0) return 0;
  // Step 1: Convert Source to ARS
  const amountInARS = amount * sourcePriceARS;
  // Step 2: Convert ARS to Target
  return amountInARS / targetPriceARS;
};

/**
 * Helper to find a currency object in the local array by name
 */
export const findLocalCurrency = (
  name: string,
  currencies: Moneda[],
): Moneda | undefined => {
  return currencies.find((c) => c.nombre === name);
};
