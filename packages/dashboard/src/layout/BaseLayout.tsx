import React from "react";
import Header from "./Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-4 my-6">{children}</main>
    </div>
  );
};

export default BaseLayout;
