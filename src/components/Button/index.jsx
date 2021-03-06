import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  className,
  to,
  forIcon,
  children,
  icon,
  textClassName,
  cyan,
  primary,
  white,
  tranparent,
  shadowed,
  xlg,
  lg,
  sm,
  ...rest
}) => {
  const classes = clsx(
    "btn",
    className,
    forIcon && "btn-icon",
    cyan && "btn-cyan",
    primary && "btn-primary",
    white && "btn-white",
    tranparent && "btn-transparent",
    shadowed && "shadowed",
    xlg && "xlg",
    lg && "lg",
    sm && "sm"
  );

  let btnChilren = (
    <>
      {icon && (
        <div className={clsx("btn-icon", icon.rootClassName)}>
          <img
            className={clsx("d-block", icon.className)}
            src={icon.src}
            title={icon.title}
            alt={icon.alt}
          />
        </div>
      )}
      <div className={clsx("btn-text", textClassName)}>{children}</div>
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {btnChilren}
      </Link>
    );
  } else {
    return (
      <button className={classes} {...rest}>
        {btnChilren}
      </button>
    );
  }
};

export default Button;
