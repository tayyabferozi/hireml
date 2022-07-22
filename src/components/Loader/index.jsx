import clsx from "clsx";
import React from "react";

const Loader = ({ lg }) => {
  return <div className={clsx({ lg }, "lds-hourglass")}></div>;
};

export default Loader;
