import React from "react";
import MenuBar from "@/core/components/MenuBar";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: () => void;
  refreshData: () => void;
};

const Layout = ({ children, onFilter, refreshData }: LayoutProps) => {
  return (
    <>
      {/* <MenuBar refreshData={refreshData} onFilter={onFilter} /> */}
      {children}
    </>
  );
};

export default Layout;
