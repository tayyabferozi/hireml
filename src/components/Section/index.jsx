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
          <img
            className="oval-1 d-xl-block d-none"
            src="/assets/vectors/oval-1.svg"
            alt="oval"
          />
          <img
            className="oval-2 d-xl-block d-none"
            src="/assets/vectors/oval-2.svg"
            alt="oval"
          />
          <img
            className="oval-1 d-none d-md-block d-xl-none"
            src="/assets/vectors/oval-1-md.svg"
            alt="oval"
          />
          <img
            className="oval-2 d-none d-md-block d-xl-none"
            src="/assets/vectors/oval-2-md.svg"
            alt="oval"
          />
          <img
            className="oval-1 d-block d-md-none"
            src="/assets/vectors/oval-1-sm.svg"
            alt="oval"
          />
          <img
            className="oval-2 d-block d-md-none"
            src="/assets/vectors/oval-2-sm.svg"
            alt="oval"
          />
          <img
            src="/assets/vectors/bg-fancy-wave.svg"
            alt="wave"
            className="wave d-none d-xxl-block"
          />
          <img
            src="/assets/vectors/bg-fancy-wave.svg"
            alt="wave"
            className="wave d-none d-md-block d-xxl-none"
          />
          <img
            src="/assets/vectors/bg-fancy-wave.svg"
            alt="wave"
            className="wave d-md-none d-block"
          />
        </div>
      )}
      <div className={clsx(!noContainer && "page-container")}>{children}</div>
    </div>
  );
};

export default Section;
