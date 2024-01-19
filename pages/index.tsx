import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import Grid from "@mui/material/Grid";
import MenuBar from "@/core/components/MenuBar";
import Footer from "@/core/components/Footer";
import Box from "@mui/material/Box"

const inter = Inter({ subsets: ["latin"] });
const API_URL = "https://dolarapi.com/v1/dolares";
type Moneda = {
  nombre: string;
  casa: string;
  venta: number;
  compra: number;
  promedio: number;
};

export default function Home() {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState<Moneda[]>([]);
  const ordenMonedas = ["Oficial", "Blue", "Tarjeta", "Cripto"];

  useEffect(() => {
    const cargarYFiltrarDatos = async () => {
      try {
        const response = await axios.get<Moneda[]>(API_URL);
        let datosProcesados = response.data
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
    cargarYFiltrarDatos();
  }, [busqueda]);

  const handleFilter = (filtro?: string) => {
    setResultadosFiltrados(
      monedas.filter((moneda) =>
        filtro
          ? moneda.casa.toLowerCase() ===
            filtro.replaceAll(" ", "").toLowerCase()
          : true
      )
    );
  };

  return (
    <>
      <Head>
        <title>verdurita</title>
        <meta name="description" content="Ver el precio del dolar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh", overflow:'hidden' }}
      >
        <main style={{padding: 16}}  className={`${styles.main} ${inter.className}`}>
          <MenuBar onFilter={handleFilter} />
          <Box sx={{overflow:'scroll', width:'100%'}}>

          {resultadosFiltrados
            .filter((moneda) =>
              moneda.casa
                .toLowerCase()
                .includes(busqueda.replaceAll(" ", "").toLowerCase())
            )
            .map((moneda: Moneda, index: number) => (
              <React.Fragment key={index}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={16}>
                    <TitleItem titulo={moneda.nombre} />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem texto={"Vendé a:"} precio={moneda.compra} />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem texto={"Comprá a:"} precio={moneda.venta} />
                  </Grid>
                  <Grid item xs={16} sm={7} md={4} lg={4}>
                    <CardItem texto={"Promedio:"} precio={moneda.promedio} />
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
