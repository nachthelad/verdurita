import React from 'react';
import SearchAppBar from "@/core/components/MenuBar";

type LayoutProps = {
  children: React.ReactNode;
  busqueda: string; 
  setBusqueda: React.Dispatch<React.SetStateAction<string>>; 
  onFilter: () => void;
};

const Layout = ({ children, busqueda, setBusqueda, onFilter }: LayoutProps) => {
  return (
    <>
      <SearchAppBar 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} 
        onFilter={onFilter} // Pasar esto a SearchAppBar
      />      
      <div>{children}</div>
    </>
  );
};

export default Layout;

