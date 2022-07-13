import React from "react";
import clsx from "clsx";

import Modal from "..";

const AuthModal = ({ className, children, ...rest }) => {
  return (
    <Modal crossNavHome className={clsx("auth-modal", className)} {...rest}>
      {children}
    </Modal>
  );
};

export default AuthModal;
