import React from 'react';
import SearchAppBar from "@/core/components/MenuBar";

type LayoutProps = {
  children: React.ReactNode;
  onFilter: () => void;
};

const Layout = ({ children, onFilter }: LayoutProps) => {
  return (
    <>
      <SearchAppBar 
        onFilter={onFilter} 
      />      
      <div>{children}</div>
    </>
  );
};

export default Layout;

