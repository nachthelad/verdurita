import React, { useState } from "react";
import CustomHead from "@/core/components/CustomHead";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import MenuBar from "@/core/components/MenuBar";
import Footer from "@/core/components/Footer";
import useCurrencyData from "@/hooks/useCurrencyData";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Moneda } from "@/types/moneda";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const { resultadosFiltrados } = useCurrencyData();

  const handleFilter = (filtro?: string) => {
    if (!filtro) {
      setBusqueda("");
    } else {
      setBusqueda(filtro);
    }
  };

  return (
    <>
      <CustomHead />
      <div
        style={{ display: "flex", flexDirection: "column", alignContent: "center", height: "100vh" }}>
        <main
          style={{ flex: 1, padding: 1 }}
          className={`${styles.main} ${inter.className}`}>
          <MenuBar onFilter={handleFilter} />
          <Box
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
              height: "calc(100vh - 100px)",
              width: "100vw",
            }}>
            {resultadosFiltrados
              .filter((moneda) =>
                moneda.nombre.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((moneda: Moneda, index: number) => (
                <React.Fragment key={index}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      marginTop: "0.1%",
                      width: "100%", // Ancho completo del contenedor
                      marginX: "auto", // Margen automático en los lados para centrarlo horizontalmente
                      paddingLeft: "1%", // Ajuste de margen izquierdo para xs
                      paddingRight: "5%", // Ajuste de margen derecho para xs
                      "@media (min-width: 600px)": { // A partir de este breakpoint, ajustar los márgenes laterales
                        paddingLeft: "5%", // Margen izquierdo para dispositivos más grandes
                        paddingRight: "5%", // Margen derecho para dispositivos más grandes
                      },
                    }}
                  >
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
                </React.Fragment>
              ))}
          </Box>
          <Footer />
        </main>
      </div>
    </>
  );
}
