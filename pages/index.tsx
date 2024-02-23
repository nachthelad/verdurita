import React, { useState } from "react";
import CustomHead from "@/core/components/CustomHead";
import styles from "@/styles/Home.module.css";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import MenuBar from "@/core/components/MenuBar";
import Footer from "@/core/components/Footer";
import useCurrencyData from "@/hooks/useCurrencyData";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Moneda } from "@/types/moneda";
import { inter } from "@/fonts/fonts";
import PullToRefresh from "pulltorefreshjs";
import MainContainer from "@/core/components/MainContainer";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  // const { resultadosFiltrados } = useCurrencyData();

  const handleFilter = (filtro?: string) => {
    if (!filtro) {
      setBusqueda("");
    } else {
      setBusqueda(filtro);
    }
  };

  // const standalone =
  //   typeof window !== "undefined" &&
  //   window.matchMedia("(display-mode: standalone)").matches;

  // if (standalone) {
  //   PullToRefresh.init({
  //     onRefresh() {
  //       window.location.reload();
  //     },
  //   });
  // }

  return (
    <>
      <CustomHead />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          height: "100vh",
        }}>
        <main
          style={{ flex: 1, padding: 1 }}
          className={`${styles.main} ${inter.className}`}>
          <MenuBar onFilter={handleFilter} />
          <MainContainer busqueda={busqueda} />
          {/* <Box
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
          </Box> */}
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
}
