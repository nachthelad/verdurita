import CustomHead from "@/core/components/CustomHead";
import { inter } from "@/fonts/fonts";
import MainContainer from "@/core/components/MainContainer";
import Layout from "./layout";
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
  "Dólar Tarjeta",
  "Dólar Bolsa",
  "Dólar Cripto",
  "Dólar Contado con liquidación",
  "Dólar Mayorista",
  "Real Brasileño",
];

const defaultResults = [
  {
    moneda: "USD",
    casa: "blue",
    nombre: "Dólar Blue",
  },
  {
    moneda: "USD",
    casa: "oficial",
    nombre: "Dólar Oficial",
  },
  {
    moneda: "EUR",

    casa: "Euro",
    nombre: "Euro Blue",
  },
  {
    moneda: "EUR",

    casa: "Euro",
    nombre: "Euro Oficial",
  },
  {
    moneda: "USD",
    casa: "tarjeta",
    nombre: "Dólar Tarjeta",
  },
  {
    moneda: "USD",
    casa: "bolsa",
    nombre: "Dólar Bolsa",
  },
  {
    moneda: "USD",
    casa: "cripto",
    nombre: "Dólar Cripto",
  },
  {
    moneda: "USD",
    casa: "contadoconliqui",
    nombre: "Dólar Contado con liquidación",
  },
  {
    moneda: "USD",
    casa: "mayorista",
    nombre: "Dólar Mayorista",
  },
  {
    moneda: "BRL",
    casa: "oficial",
    nombre: "Real Brasileño",
  },
];

export default function Home() {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [resultadosFiltrados, setResultadosFiltrados] =
    useState<Moneda[]>(defaultResults);
  const [loadingData, setLoadingData] = useState(true);

  const cargarDatos = async () => {
    try {
      setLoadingData(true);
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
      setLoadingData(false);
    } catch (error) {
      console.error("Hubo un error al cargar los datos", error);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleFilter = (filtro?: string) => {
    console.log(filtro);
    if (!filtro) {
      setResultadosFiltrados(monedas);
    } else {
      const monedasFiltradas = monedas.filter((moneda) =>
        moneda.nombre.toLowerCase().includes(filtro.toLowerCase())
      );

      setResultadosFiltrados(monedasFiltradas);
    }
  };

  console.log(resultadosFiltrados);

  return (
    <Layout onFilter={handleFilter} refreshData={cargarDatos}>
      <CustomHead />
      <main
        className={`${inter.className}`}
        style={{
          marginTop: "98px",
        }}>
        <MainContainer
          loadingData={loadingData}
          resultadosFiltrados={resultadosFiltrados}
        />
      </main>
    </Layout>
  );
}
