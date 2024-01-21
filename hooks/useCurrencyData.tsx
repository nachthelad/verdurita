import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import axios from "axios";

const API_DOLAR_URL = "https://dolarapi.com/v1/dolares";
const API_REAL_URL = "https://dolarapi.com/v1/cotizaciones/brl";
const ordenMonedas = ["Oficial", "Blue", "Tarjeta", "Cripto", "Real Brasileño"];

const useCurrencyData = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState<Moneda[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [responseDolar, responseReal] = await Promise.all([
          axios.get<Moneda[]>(API_DOLAR_URL),
          axios.get<Moneda[]>(API_REAL_URL),
        ]);
  
        const datosDolar = responseDolar.data;
        const datosReal = Array.isArray(responseReal.data) ? responseReal.data : [responseReal.data];
  
        const datosProcesados = [...datosDolar, ...datosReal]
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
          ? moneda.casa.toLowerCase()
          : true
      )
    );
  };

  return { monedas, handleFilter, resultadosFiltrados };
};

export default useCurrencyData;
