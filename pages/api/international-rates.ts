import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { INTERNATIONAL_CURRENCIES } from "@/constants/internationalCurrencies";
import { rateLimit } from "@/utils/rateLimit";

interface FrankfurterRate {
  base: string;
  quote: string;
  rate: number;
}

const currencyCodes = new Set(INTERNATIONAL_CURRENCIES.map(({ code }) => code));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const base = req.query.base;
  if (typeof base !== "string" || !currencyCodes.has(base)) {
    return res.status(400).json({ error: "Invalid base currency" });
  }

  if (!rateLimit(req, res)) return;

  try {
    const { data } = await axios.get<unknown>(
      `https://api.frankfurter.dev/v2/rates?base=${base}`,
      { timeout: 8000 }
    );
    if (!Array.isArray(data)) {
      throw new Error("Invalid international rates response");
    }

    const rates: Record<string, number> = {};
    for (const item of data) {
      if (!item || typeof item !== "object") continue;
      const {
        base: responseBase,
        quote,
        rate,
      } = item as Partial<FrankfurterRate>;
      if (
        responseBase === base &&
        typeof quote === "string" &&
        currencyCodes.has(quote) &&
        typeof rate === "number" &&
        Number.isFinite(rate) &&
        rate > 0
      ) {
        rates[quote] = rate;
      }
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600"
    );
    return res.status(200).json({ rates });
  } catch (error) {
    console.error(
      "No se pudieron cargar las cotizaciones internacionales",
      error
    );
    return res.status(502).json({ error: "International rates unavailable" });
  }
}
