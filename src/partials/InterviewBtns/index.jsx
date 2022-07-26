import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ScheduleInterview from "../../modals/ScheduleInterview";
import Button from "../../components/Button";

import useModal from "../../hooks/useModal";
import SavedInterview from "../../modals/SavedInterview";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const HeaderBtns = ({ btn1OnComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const scheduleModalUtils = useModal(false);
  const savedModalUtils = useModal(false);
  const userState = useSelector((state) => state.user);

  const startInstantInterviewHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post(`/interviews/start-instant-interviews?email=${userState.email}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Interview started successfully!");
        window.open(res.data.url, "_blank").focus();
      })
      .catch((err) => {
        toast.error("Uh Oh! Something went wrong while starting your meeting");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <ScheduleInterview
        onComplete={() => {
          scheduleModalUtils.toggleShow();
          savedModalUtils.toggleShow();
          btn1OnComplete();
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
          onClick={startInstantInterviewHandler}
          icon={{
            className: "d-1101-none",
            src: "/assets/vectors/camera.svg",
            title: "meeting",
          }}
        >
          {isLoading ? <Loader /> : "Start an instant interview"}
        </Button>
      </div>
    </>
  );
};

export default HeaderBtns;
