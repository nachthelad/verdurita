import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_DOLAR_URL = "https://dolarapi.com/v1/dolares";
const API_REAL_URL = "https://dolarapi.com/v1/cotizaciones/brl";
const API_EURO_URL = "https://api.bluelytics.com.ar/v2/latest";

const ordenMonedas = [
  "Dólar Blue",
  "Dólar Oficial",
  "Dólar Tarjeta",
  "Euro Blue",
  "Euro Oficial",
  "Dólar Bolsa",
  "Dólar Cripto",
  "Dólar Contado con liquidación",
  "Dólar Mayorista",
  "Real Brasileño",
];

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [responseDolar, responseReal, responseEuro] = await Promise.all([
      axios.get(API_DOLAR_URL),
      axios.get(API_REAL_URL),
      axios.get(API_EURO_URL),
    ]);

    // Procesamiento de datos
    const datosDolar = responseDolar.data.map((d: any) => ({
      ...d,
      nombre: `Dólar ${d.nombre}`,
    }));
    const datosReal = Array.isArray(responseReal.data)
      ? responseReal.data
      : [responseReal.data];
    const datosEuroOficial = {
      moneda: "EUR",
      compra: responseEuro.data.oficial_euro.value_buy,
      venta: responseEuro.data.oficial_euro.value_sell,
      promedio:
        (responseEuro.data.oficial_euro.value_buy +
          responseEuro.data.oficial_euro.value_sell) /
        2,
      casa: "Euro",
      nombre: "Euro Oficial",
    };
    const datosEuroBlue = {
      moneda: "EUR",
      compra: responseEuro.data.blue_euro.value_buy,
      venta: responseEuro.data.blue_euro.value_sell,
      promedio:
        (responseEuro.data.blue_euro.value_buy +
          responseEuro.data.blue_euro.value_sell) /
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
      .map((moneda) => ({
        ...moneda,
        promedio: (moneda.compra + moneda.venta) / 2,
      }))
      .sort((a, b) => {
        let indexA = ordenMonedas.indexOf(a.nombre);
        let indexB = ordenMonedas.indexOf(b.nombre);
        return (
          (indexA === -1 ? ordenMonedas.length : indexA) -
          (indexB === -1 ? ordenMonedas.length : indexB)
        );
      });

    res.status(200).json(datosProcesados);
  } catch (error) {
    console.error("Hubo un error al cargar los datos", error);
    res.status(500).json({ error: "Hubo un error al cargar los datos" });
  }
}
