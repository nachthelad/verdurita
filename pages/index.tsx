import CustomHead from "@/core/components/CustomHead";
import { inter } from "@/fonts/fonts";
import MainContainer from "@/core/components/MainContainer";
import Layout from "./layout";
import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import axios from "axios";
import { Box } from "@mui/material";
import { defaultResults } from "@/constants/defaultResults";
import { theme } from "@/theme/theme";

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
      cargarDatos();
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
      <Box
        component="main"
        className={`${inter.className}`}
        sx={{
          marginTop: "sm: 56px, md: 64px",
          backgroundColor: theme.palette.secondary.main,
          minHeight: "calc(100vh - 60px)",
        }}>
        <MainContainer
          loadingData={loadingData}
          resultadosFiltrados={resultadosFiltrados}
          onFilter={handleFilter}
          refreshData={cargarDatos}
        />
      </Box>
    </Layout>
  );
}
