import React, { useState } from "react";
import CustomHead from "@/core/components/CustomHead";
import styles from "@/styles/Home.module.css";
import MenuBar from "@/core/components/MenuBar";
import { inter } from "@/fonts/fonts";
import MainContainer from "@/core/components/MainContainer";
import Layout from "./layout";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");

  const handleFilter = (filtro?: string) => {
    if (!filtro) {
      setBusqueda("");
    } else {
      setBusqueda(filtro);
    }
  };

  return (
    <Layout onFilter={handleFilter}>
      <CustomHead />
      <main
        className={`${styles.main} ${inter.className}`}
        style={{
          height: "calc(100vh - 64px)",
          overflow: "auto",
          paddingTop: "32px",
        }}
      >
        <MainContainer busqueda={busqueda} />
        {/* <Footer /> */}
      </main>
    </Layout>
  );
}
