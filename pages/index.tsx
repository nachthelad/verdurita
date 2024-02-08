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
    setBusqueda(filtro ?? "");
  };

  return (
    <>
      <CustomHead 
        title="verdurita" 
        description="Cotizaciones en tiempo real" 
        metaTags={[
          { name: 'robots', content: 'index,follow' },
          { name: 'keywords', content: 'currency, exchange, rates, Argentina, USD, Real, inflacion, finanzas, economia, verdurita, tipo de cambio' },
          { name: 'geo.region', content: 'AR' },
          { name: 'geo.placename', content: 'Argentina' },
          { name: 'language', content: 'ES' }, 
          { property: 'og:type', content: 'website' },
          { property: 'og:site_name', content: 'verdurita' }, 
          { property: 'og:title', content: 'verdurita' },
          { property: 'og:description', content: 'Cotizaciones en tiempo real, tipo de cambio, verdurita, usd, real' }, 
          { property: 'og:image', content: '@/public/logo.png' },
          { property: 'og:url', content: 'https://verdurita.com.ar/' },
          { property: 'og:locale', content: 'es_AR' }, 
        ]}
      />
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
                      paddingLeft: "5%",
                      paddingRight: "5%",
                      width: "auto",
                      margin: "0 auto",
                    }}>
                    <Grid item xs={16}>
                      <TitleItem titulo={moneda.nombre} />
                    </Grid>
                    <Grid item xs={16} sm={7} md={4} lg={4}>
                      <CardItem texto={"Vendé a:"} precio={moneda.compra}  esRealBrasileño={moneda.nombre === "Real Brasileño"}/>
                    </Grid>
                    <Grid item xs={16} sm={7} md={4} lg={4}>
                      <CardItem texto={"Comprá a:"} precio={moneda.venta}  esRealBrasileño={moneda.nombre === "Real Brasileño"}/>
                    </Grid>
                    <Grid item xs={16} sm={7} md={4} lg={4}>
                      <CardItem texto={"Promedio:"} precio={moneda.promedio}  esRealBrasileño={moneda.nombre === "Real Brasileño"}/>
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
