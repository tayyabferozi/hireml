import React, { useEffect } from "react";
import $ from "jquery";
import clsx from "clsx";

const Modal = ({
  noOverlay,
  show,
  toggleShow,
  className,
  children,
  onClose,
  ...rest
}) => {
  const closeHandler = () => {
    if (onClose) {
      onClose();
    }

    toggleShow();
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
          className={clsx("modal-overlay", { show })}
          onClick={closeHandler}
        />
      )}
      <div className={clsx("custom-modal-wrap", className, { show })} {...rest}>
        <div className={clsx("custom-modal")}>
          <div className="close" onClick={closeHandler}>
            <img src="/assets/vectors/modal-close.svg" alt="close" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
