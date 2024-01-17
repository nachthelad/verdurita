import React from 'react';
import MenuBar from "@/core/components/MenuBar";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: () => void;
};

const Layout = ({ children, onFilter }: LayoutProps) => {
  return (
    <>
      <MenuBar 
        onFilter={onFilter} 
      />      
      <div>{children}</div>
    </>
  );
};

export default Layout;

