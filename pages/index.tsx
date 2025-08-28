import CustomHead from "@/core/components/CustomHead";
import MainContainer from "@/core/components/MainContainer";
import Layout from "@/core/components/Layout";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Moneda } from "@/types/moneda";
import { inter } from "@/fonts/fonts";
import { Box } from "@mui/material";
import { defaultResults } from "@/constants/defaultResults";
import { theme } from "@/theme/theme";
import { useCurrencies } from "@/hooks/useCurrencies";

export default function Home() {
  const { currencies, isLoading, refresh } = useCurrencies();
  const [resultadosFiltrados, setResultadosFiltrados] = useState<Moneda[]>(defaultResults);
  const [filterApplied, setFilterApplied] = useState(false);

  // Update filtered results when currencies data changes
  const monedas = useMemo(() => currencies || defaultResults, [currencies]);
  
  useEffect(() => {
    if (!filterApplied && Array.isArray(monedas)) {
      setResultadosFiltrados(monedas);
    }
  }, [monedas, filterApplied]);

  const handleFilter = useCallback((filtro?: string | null) => {
    if (!filtro) {
      setFilterApplied(false);
      if (Array.isArray(monedas)) {
        setResultadosFiltrados(monedas);
      }
      refresh();
    } else {
      setFilterApplied(true);
      if (Array.isArray(monedas)) {
        const monedasFiltradas = monedas.filter((moneda: { nombre: string }) =>
          moneda.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        setResultadosFiltrados(monedasFiltradas);
      }
    }
  }, [monedas, refresh]);

  return (
    <Layout onFilter={handleFilter} refreshData={refresh}>
      <CustomHead />
      <Box
        component="main"
        className={`${inter.className}`}
        sx={{
          marginTop: { xs: "56px", sm: "56px", md: "64px" },
          backgroundColor: theme.palette.primary.contrastText,
          minHeight: "100vh",
        }}
      >
        <MainContainer
          filterApplied={filterApplied}
          loadingData={isLoading}
          resultadosFiltrados={resultadosFiltrados}
          onFilter={handleFilter}
          refreshData={refresh}
        />
      </Box>
    </Layout>
  );
}
