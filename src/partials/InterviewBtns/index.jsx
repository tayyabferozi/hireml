import React from "react";

import ScheduleInterview from "../../modals/ScheduleInterview";
import Button from "../../components/Button";

import useModal from "../../hooks/useModal";
import SavedInterview from "../../modals/SavedInterview";

const HeaderBtns = (props) => {
  const scheduleModalUtils = useModal(false);
  const savedModalUtils = useModal(false);

  return (
    <>
      <ScheduleInterview
        onComplete={() => {
          scheduleModalUtils.toggleShow();
          savedModalUtils.toggleShow();
        }}
        {...scheduleModalUtils}
      />
      <SavedInterview {...savedModalUtils} />
      <div className="btns">
        <Button
          textClassName="d-1100-none"
          icon={{ src: "/assets/vectors/add.svg", title: "add" }}
          primary
          onClick={scheduleModalUtils.toggleShow}
        >
          Add an interview
        </Button>
        <Button
          tranparent
          textClassName="text-light-1 d-1100-none"
          onClick={props.btn2OnClick}
          icon={{
            className: "d-1101-none",
            src: "/assets/vectors/camera.svg",
            title: "meeting",
          }}
        >
          Start an instant interview
        </Button>
      </div>
    </>
  );
};

export default HeaderBtns;
