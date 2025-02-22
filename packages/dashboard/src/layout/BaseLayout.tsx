import React from "react";
import Header from "./Header";

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-4 my-6">{children}</main>
    </div>
  );
};

export default BaseLayout;
