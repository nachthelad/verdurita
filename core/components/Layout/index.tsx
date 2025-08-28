import React from "react";
import NavigationBar from "@/core/components/NavigationBar";
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: (moneda?: string | null) => void;
  refreshData: () => void;
};

const Layout = ({ children, onFilter, refreshData }: LayoutProps) => {

  return (
    <>
      <NavigationBar
        refreshData={refreshData}
        onFilter={onFilter}
      />
      {children}
      <Analytics />
    </>
  );
};

export default Layout;
