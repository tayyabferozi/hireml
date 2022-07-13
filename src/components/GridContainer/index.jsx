import React from "react";
import clsx from "clsx";

const GridContainer = ({ className, rowClassName, children }) => {
  return (
    <div className={clsx("container-fluid px-0", className)}>
      <div className={clsx("row g-4", rowClassName)}>{children}</div>
    </div>
  );
};

export default GridContainer;
