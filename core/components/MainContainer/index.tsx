import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import useCurrencyData from "@/hooks/useCurrencyData";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import PullToRefresh from "pulltorefreshjs";
import { Moneda } from "@/types/moneda";

type MainContainerProps = {
  busqueda: string;
};

export default function MainContainer({
  busqueda,
}: MainContainerProps): React.ReactElement {
  const { resultadosFiltrados } = useCurrencyData();

  const standalone =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;

  if (standalone) {
    PullToRefresh.init({
      onRefresh() {
        window.location.reload();
      },
    });
  }

  return (
    <div>
      <Box
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100vh - 60px)",
          width: "100vw",
        }}>
        {resultadosFiltrados
          .filter((moneda) =>
            moneda.nombre.toLowerCase().includes(busqueda.toLowerCase())
          )
          .map((moneda: Moneda, index: number) => (
            <React.Fragment key={index}>
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    marginTop: "0.9%",
                  }}>
                  <Grid item xs={16}>
                    <TitleItem titulo={moneda.nombre} />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem
                      texto={"Vendé a:"}
                      precio={moneda.compra}
                      esRealBrasileño={moneda.nombre === "Real Brasileño"}
                      EsEuroO={moneda.nombre === "Euro Oficial"}
                      EsEuroB={moneda.nombre === "Euro Blue"}
                    />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem
                      texto={"Comprá a:"}
                      precio={moneda.venta}
                      esRealBrasileño={moneda.nombre === "Real Brasileño"}
                      EsEuroO={moneda.nombre === "Euro Oficial"}
                      EsEuroB={moneda.nombre === "Euro Blue"}
                    />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem
                      texto={"Promedio:"}
                      precio={moneda.promedio}
                      esRealBrasileño={moneda.nombre === "Real Brasileño"}
                      EsEuroO={moneda.nombre === "Euro Oficial"}
                      EsEuroB={moneda.nombre === "Euro Blue"}
                    />
                  </Grid>
                </Grid>
              </Container>
            </React.Fragment>
          ))}
      </Box>
    </div>
  );
}
