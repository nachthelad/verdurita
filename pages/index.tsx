import React, { useState } from "react";
import CustomHead from "@/core/components/CustomHead";
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
        className={`${inter.className}`}
        style={{
          marginTop: "98px",
        }}
      >
        <MainContainer busqueda={busqueda} />
        {/* <Footer /> */}
      </main>
    </Layout>
  );
}
