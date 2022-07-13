import clsx from "clsx";
import React from "react";

const Card = ({ bordered, className, children, ...rest }) => {
  return (
    <div className={clsx("custom-card", className, { bordered })} {...rest}>
      {children}
    </div>
  );
};

export default Card;
