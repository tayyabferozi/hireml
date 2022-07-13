import React from "react";
import clsx from "clsx";

import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = ({ withPadding, children }) => {
  return (
    <div className="main-layout">
      <div id="header">
        <Navbar />
      </div>

      <div
        className={clsx("main-layout-content", withPadding && "with-padding")}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
