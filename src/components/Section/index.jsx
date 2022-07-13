import React from "react";
import clsx from "clsx";

const Section = ({
  firstSection,
  noContainer,
  className,
  fancy,
  withBottomGrad,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "section",
        className,
        firstSection && "first-section",
        withBottomGrad && "with-bottom-grad",
        {
          fancy,
        }
      )}
      {...rest}
    >
      {fancy && (
        <div className="bg-fancy">
          <img src="/assets/vectors/oval.svg" alt="oval" className="oval-1" />
          <img src="/assets/vectors/oval.svg" alt="oval" className="oval-2" />
          <img
            src="/assets/vectors/bg-fancy-wave.svg"
            alt="wave"
            className="wave"
          />
        </div>
      )}
      <div className={clsx(!noContainer && "page-container")}>{children}</div>
    </div>
  );
};

export default Section;
