import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { rateLimit } from "@/utils/rateLimit";

import { API_URLS } from "@/constants";

const {
  DOLAR: API_DOLAR_URL,
  REAL: API_REAL_URL,
  EURO: API_EURO_URL,
} = API_URLS;

const ordenMonedas = [
  "Dólar Blue",
  "Dólar Oficial",
  "Dólar Tarjeta",
  "Dólar Bolsa",
  "Dólar Cripto",
  "Dólar Contado con liquidación",
  "Dólar Mayorista",
  "Euro Blue",
  "Euro Oficial",
  "Real Brasileño",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Apply rate limiting
  if (!rateLimit(req, res)) {
    return;
  }

  try {
    const [responseDolar, responseReal, responseEuro] = await Promise.all([
      axios.get(API_DOLAR_URL),
      axios.get(API_REAL_URL),
      axios.get(API_EURO_URL),
    ]);

    // Procesamiento de datos con validación
    const datosDolar = responseDolar.data
      .filter(
        (d: any) =>
          d &&
          typeof d === "object" &&
          d.nombre &&
          typeof d.compra === "number" &&
          typeof d.venta === "number"
      )
      .map((d: any) => ({
        moneda: "USD",
        nombre: `Dólar ${String(d.nombre).replace(/[<>\"'&]/g, "")}`,
        casa: String(d.casa || "").replace(/[<>\"'&]/g, ""),
        compra: Number(d.compra) || 0,
        venta: Number(d.venta) || 0,
        promedio: (Number(d.compra) + Number(d.venta)) / 2 || 0,
      }));
    const datosReal = (
      Array.isArray(responseReal.data) ? responseReal.data : [responseReal.data]
    )
      .filter(
        (d: any) =>
          d &&
          typeof d === "object" &&
          typeof d.compra === "number" &&
          typeof d.venta === "number"
      )
      .map((d: any) => ({
        moneda: "BRL",
        nombre: "Real Brasileño",
        casa: String(d.casa || "").replace(/[<>\"'&]/g, ""),
        compra: Number(d.compra) || 0,
        venta: Number(d.venta) || 0,
        promedio: (Number(d.compra) + Number(d.venta)) / 2 || 0,
      }));

    // Validate Euro data before processing
    const euroData = responseEuro.data;
    if (!euroData?.oficial_euro || !euroData?.blue_euro) {
      throw new Error("Invalid Euro data received");
    }

    const datosEuroOficial = {
      moneda: "EUR",
      compra: Number(euroData.oficial_euro.value_buy) || 0,
      venta: Number(euroData.oficial_euro.value_sell) || 0,
      promedio:
        ((Number(euroData.oficial_euro.value_buy) || 0) +
          (Number(euroData.oficial_euro.value_sell) || 0)) /
        2,
      casa: "Euro",
      nombre: "Euro Oficial",
    };
    const datosEuroBlue = {
      moneda: "EUR",
      compra: Number(euroData.blue_euro.value_buy) || 0,
      venta: Number(euroData.blue_euro.value_sell) || 0,
      promedio:
        ((Number(euroData.blue_euro.value_buy) || 0) +
          (Number(euroData.blue_euro.value_sell) || 0)) /
        2,
      casa: "Euro",
      nombre: "Euro Blue",
    };

    const datosProcesados = [
      ...datosDolar,
      ...datosReal,
      datosEuroOficial,
      datosEuroBlue,
    ]
      .filter(
        (moneda) =>
          moneda &&
          typeof moneda.compra === "number" &&
          typeof moneda.venta === "number"
      )
      .map((moneda) => ({
        ...moneda,
        promedio: Number(((moneda.compra + moneda.venta) / 2).toFixed(2)),
        compra: Number(moneda.compra.toFixed(2)),
        venta: Number(moneda.venta.toFixed(2)),
      }))
      .sort((a, b) => {
        const indexA = ordenMonedas.indexOf(a.nombre);
        const indexB = ordenMonedas.indexOf(b.nombre);
        return (
          (indexA === -1 ? ordenMonedas.length : indexA) -
          (indexB === -1 ? ordenMonedas.length : indexB)
        );
      });

    // Set cache headers
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );
    res.status(200).json(datosProcesados);
  } catch (error) {
    console.error("Hubo un error al cargar los datos", error);
    res.status(500).json({ error: "Hubo un error al cargar los datos" });
  }
}
