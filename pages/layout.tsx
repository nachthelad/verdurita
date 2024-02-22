import React from "react";
import MenuBar from "@/core/components/MenuBar";
import Footer from "@/core/components/Footer";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: () => void;
};

const Layout = ({ children, onFilter }: LayoutProps) => {
  return (
    <>
      <MenuBar onFilter={onFilter} />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
