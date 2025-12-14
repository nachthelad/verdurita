import React from "react";
// NavigationBar removed as per new UI ease-of-use requirements
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: (moneda?: string | null) => void;
  refreshData: () => void;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};

export default Layout;
