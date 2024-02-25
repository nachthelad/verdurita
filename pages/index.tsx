import CustomHead from "@/core/components/CustomHead";
import { inter } from "@/fonts/fonts";
import MainContainer from "@/core/components/MainContainer";
import Layout from "./layout";
import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import axios from "axios";

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
  const [monedas, setMonedas] = useState<Moneda[]>(defaultResults);
  const [resultadosFiltrados, setResultadosFiltrados] =
    useState<Moneda[]>(defaultResults);
  const [loadingData, setLoadingData] = useState(true);

  const cargarDatos = async () => {
    try {
      setLoadingData(true);
      const response = await axios.get("/api/currencies");
      setMonedas(response.data);
      setResultadosFiltrados(response.data);
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
    if (!filtro) {
      setResultadosFiltrados(monedas);
    } else {
      const monedasFiltradas = monedas.filter((moneda: { nombre: string }) =>
        moneda.nombre.toLowerCase().includes(filtro.toLowerCase())
      );

      setResultadosFiltrados(monedasFiltradas);
    }
  };

  return (
    <Layout onFilter={handleFilter} refreshData={cargarDatos}>
      <CustomHead />
      <main
        className={`${inter.className}`}
        style={{
          marginTop: "75px",
        }}>
        <MainContainer
          loadingData={loadingData}
          resultadosFiltrados={resultadosFiltrados}
        />
      </main>
    </Layout>
  );
}
