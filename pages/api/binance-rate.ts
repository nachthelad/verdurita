import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { rateLimit } from "@/utils/rateLimit";
import { API_URLS } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!rateLimit(req, res)) {
    return;
  }

  try {
    const prices = await fetchBinancePrices();
    if (!prices.compra && !prices.venta) {
      return res.status(502).json({ error: "No data" });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600",
    );
    res.status(200).json({ ...prices, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Error fetching Binance P2P rate", error);
    res.status(502).json({ error: "Failed" });
  }
}

async function fetchBinanceAdPrice(
  tradeType: "SELL" | "BUY",
): Promise<number | null> {
  const response = await axios.post(
    API_URLS.BINANCE_P2P,
    {
      fiat: "ARS",
      page: 1,
      rows: 10,
      tradeType,
      asset: "USDT",
      countries: [],
      additionalKycVerifyFilter: 0,
      classifies: ["mass", "profession", "fiat_trade"],
      filterType: "all",
      followed: false,
      payTypes: [],
      periods: [],
      proMerchantAds: false,
      publisherType: "merchant",
      shieldMerchantAds: false,
      tradedWith: false,
    },
    { headers: { "Content-Type": "application/json" } },
  );

  const ads: any[] = response.data?.data ?? [];
  const ad = ads.find((item) => !item.privilegeDesc);
  const price = parseFloat(ad?.adv?.price ?? "0");
  return price || null;
}

export async function fetchBinancePrices(): Promise<{
  compra: number | null;
  venta: number | null;
}> {
  const [compra, venta] = await Promise.all([
    fetchBinanceAdPrice("BUY").catch(() => null),
    fetchBinanceAdPrice("SELL").catch(() => null),
  ]);
  return { compra, venta };
}
