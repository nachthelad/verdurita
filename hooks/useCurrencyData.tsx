import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import axios from "axios";

const API_DOLAR_URL = "https://dolarapi.com/v1/dolares";
const API_REAL_URL = "https://dolarapi.com/v1/cotizaciones/brl";
const API_EURO_URL = "https://api.bluelytics.com.ar/v2/latest";
const ordenMonedas = [
  "Dólar Blue",
  "Dólar Oficial",
  "Euro Blue",
  "Euro Oficial",
  "Dólar Bolsa",
  "Dólar Tarjeta",
  "Dólar Cripto",
  "Dólar Contado con liquidación",
  "Dólar Mayorista",
  "Real Brasileño",
];

const useCurrencyData = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState<Moneda[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [responseDolar, responseReal, responseEuro] = await Promise.all([
          axios.get<Moneda[]>(API_DOLAR_URL),
          axios.get<Moneda[]>(API_REAL_URL),
          axios.get(API_EURO_URL),
        ]);

        const datosDolar = responseDolar.data.map((d) => ({
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

        setMonedas(datosProcesados);
        setResultadosFiltrados(datosProcesados);
      } catch (error) {
        console.error("Hubo un error al cargar los datos", error);
      }
    };

    cargarDatos();
  }, []);

  const handleFilter = (filtro?: string) => {
    setResultadosFiltrados(
      monedas.filter((moneda) => (filtro ? moneda.casa.toLowerCase() : true))
    );
  };

  console.log(monedas);

  return { monedas, handleFilter, resultadosFiltrados };
};

export default useCurrencyData;
