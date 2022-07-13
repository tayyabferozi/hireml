import React, { useEffect } from "react";
import $ from "jquery";
import clsx from "clsx";
// import { useNavigate } from "react-router-dom";

const Modal = ({
  noOverlay,
  noClose,
  closeLightDark,
  closeDarkSm,
  lower,
  show,
  crossNavHome,
  toggleShow,
  lgClose,
  greyClose,
  className,
  children,
  onClose,
  ...rest
}) => {
  // const navigate = useNavigate();

  const closeHandler = () => {
    if (onClose) {
      onClose();
    }

    if (crossNavHome) {
      toggleShow();
      window.history.pushState(null, "", "/en/");
      // setTimeout(function () {
      //   navigate("/en");
      // }, 400);
    } else {
      toggleShow();
    }
  };

  useEffect(() => {
    const activeModalsNum = $(".custom-modal.show").length;

    if (activeModalsNum) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  }, [show]);

  return (
    <>
      {!noOverlay && (
        <div
          className={clsx("modal-overlay", { show, lower })}
          onClick={closeHandler}
        />
      )}
      <div
        className={clsx("custom-modal", className, { show, lower })}
        {...rest}
      >
        {!noClose && (
          <div className="close" onClick={closeHandler}>
            {closeDarkSm && (
              <img
                className="d-block d-lg-none"
                alt="close"
                title="close"
                src="/assets/vectors/close-modal-dark.svg"
              />
            )}
            <img
              className={clsx(closeDarkSm && "d-sm-block d-none")}
              src={`/assets/vectors/${
                lgClose
                  ? "close-modal-lg"
                  : greyClose
                  ? "close-modal-grey"
                  : "close-modal"
              }.svg`}
              alt="close"
              title="Close modal"
            />
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default Modal;
