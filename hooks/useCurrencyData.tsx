import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import axios from "axios";

const API_DOLAR_URL = "https://dolarapi.com/v1/dolares";
const API_REAL_URL = "https://dolarapi.com/v1/cotizaciones/brl";

const useCurrencyData = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState<Moneda[]>([]);
  const ordenMonedas = ["Oficial", "Blue", "Tarjeta", "Cripto"];

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await axios.get<Moneda[]>(API_DOLAR_URL);
        let datosProcesados = response.data
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
      monedas.filter((moneda) =>
        filtro
          ? moneda.casa.toLowerCase() ===
            filtro.replaceAll(" ", "").toLowerCase()
          : true
      )
    );
  };

  return { monedas, handleFilter, resultadosFiltrados };
};

export default useCurrencyData;
