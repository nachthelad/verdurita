import React from "react";
import MenuBar from "@/core/components/MenuBar";
import { useMediaQuery, Theme } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: (moneda?: string | null) => void;
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
      <Analytics />
    </>
  );
};

export default Layout;
