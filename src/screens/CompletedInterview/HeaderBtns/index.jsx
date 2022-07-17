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
        Add an interview
      </Button>
      <Button
        tranparent
        textClassName="text-light-1 d-1100-none"
        icon={{
          className: "d-1101-none",
          src: "/assets/vectors/camera.svg",
          title: "meeting",
        }}
      >
        Start an instant interview
      </Button>
    </div>
  );
};

export default HeaderBtns;
