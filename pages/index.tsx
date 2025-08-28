import CustomHead from "@/core/components/CustomHead";
import MainContainer from "@/core/components/MainContainer";
import Layout from "./layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import { inter } from "@/fonts/fonts";
import { Box } from "@mui/material";
import { defaultResults } from "@/constants/defaultResults";
import { theme } from "@/theme/theme";

export default function Home() {
  const [monedas, setMonedas] = useState<Moneda[]>(defaultResults);
  const [resultadosFiltrados, setResultadosFiltrados] =
    useState<Moneda[]>(defaultResults);
  const [loadingData, setLoadingData] = useState(true);
  const [filterApplied, setFilterApplied] = useState(false);

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

  const handleFilter = (filtro?: string | null) => {
    if (!filtro) {
      setFilterApplied(false);
      setResultadosFiltrados(monedas);
      cargarDatos();
    } else {
      setFilterApplied(true);
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
          backgroundColor: theme.palette.primary.contrastText,
          minHeight: "100vh",
        }}
      >
        <MainContainer
          filterApplied={filterApplied}
          loadingData={loadingData}
          resultadosFiltrados={resultadosFiltrados}
          onFilter={handleFilter}
          refreshData={cargarDatos}
        />
      </Box>
    </Layout>
  );
}
