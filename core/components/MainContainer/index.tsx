import React from "react";
import { Box, Grid } from "@mui/material";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import { Moneda } from "@/types/moneda";

type MainContainerProps = {
  resultadosFiltrados: Moneda[];
  loadingData: boolean;
};

export default function MainContainer({
  resultadosFiltrados,
  loadingData,
}: MainContainerProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 4,
      }}>
      {resultadosFiltrados.map((moneda: Moneda, index: number) => (
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
          }}>
          <Grid
            item
            xs={12}
            sx={{ marginTop: index === 0 ? "5rem" : undefined }}>
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
            }}>
            <CardItem
              loadingData={loadingData}
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
            }}>
            <CardItem
              loadingData={loadingData}
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
            }}>
            <CardItem
              loadingData={loadingData}
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
