import React, { useState } from "react";
import CustomHead from "@/core/components/CustomHead";
import styles from "@/styles/Home.module.css";
import MenuBar from "@/core/components/MenuBar";
import { inter } from "@/fonts/fonts";
import MainContainer from "@/core/components/MainContainer";

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
    <>
      <CustomHead />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          height: "100vh",
        }}>
        <MenuBar onFilter={handleFilter} />
        <main
          style={{ paddingTop: 50 }}
          className={`${styles.main} ${inter.className}`}>
          <MainContainer busqueda={busqueda} />
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
}
