import React from "react";
import MenuBar from "@/core/components/MenuBar";
import { useMediaQuery, Theme } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: () => void;
  refreshData: () => void;
};

const Layout = ({ children, onFilter, refreshData }: LayoutProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <>
      <MenuBar
        isMobile={isMobile}
        refreshData={refreshData}
        onFilter={onFilter}
      />
      {children}
    </>
  );
};

export default Layout;
