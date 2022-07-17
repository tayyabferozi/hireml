import React from "react";

import Button from "../../../components/Button";

const HeaderBtns = () => {
  return (
    <div className="btns">
      <Button
        textClassName="d-1100-none"
        icon={{ src: "/assets/vectors/add.svg", title: "add" }}
        primary
      >
        Add Dataset
      </Button>
    </div>
  );
};

export default HeaderBtns;
