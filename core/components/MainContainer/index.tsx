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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 4,
      }}
    >
      {resultadosFiltrados
        .filter((moneda) =>
          moneda.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map((moneda: Moneda, index: number) => (
          <Grid
            key={`${moneda?.nombre}-${index}`}
            container
            spacing={2}
            sx={{
              maxWidth: 1440,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 5,
            }}
          >
            <Grid
              item
              xs={12}
              sx={
                {
                  // mb: 2,
                }
              }
            >
              <TitleItem titulo={moneda.nombre} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardItem
                texto={"Vendé a:"}
                precio={moneda.compra}
                esRealBrasileño={moneda.nombre === "Real Brasileño"}
                EsEuroO={moneda.nombre === "Euro Oficial"}
                EsEuroB={moneda.nombre === "Euro Blue"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardItem
                texto={"Comprá a:"}
                precio={moneda.venta}
                esRealBrasileño={moneda.nombre === "Real Brasileño"}
                EsEuroO={moneda.nombre === "Euro Oficial"}
                EsEuroB={moneda.nombre === "Euro Blue"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardItem
                texto={"Promedio:"}
                precio={moneda.promedio}
                esRealBrasileño={moneda.nombre === "Real Brasileño"}
                EsEuroO={moneda.nombre === "Euro Oficial"}
                EsEuroB={moneda.nombre === "Euro Blue"}
              />
            </Grid>
          </Grid>
        ))}
    </Box>
  );
}
