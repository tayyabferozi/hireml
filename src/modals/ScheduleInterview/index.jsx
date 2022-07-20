import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Modal from "../../components/Modal";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ScheduleInterview = ({ onComplete, ...rest }) => {
  const [value, onChange] = useState(new Date());

  return (
    <Modal className="interview-modal" {...rest}>
      <div className="modal-head">
        <h4 className="title">Schedule an interview</h4>

        <GridContainer className="mt-50 mt-767-30">
          <div className="col-lg-6">
            <Input
              label="Candidate Name"
              placeholder="Enter Candidate's Name"
            />
            <Input
              label="Candidate Email"
              placeholder="Enter Candidate's Email"
            />
            <Input
              label="Candidate Name"
              placeholder="Enter Candidate's Name"
            />
          </div>

          <div className="col-lg-6">
            <Calendar onChange={onChange} value={value} />
          </div>
        </GridContainer>

        <div className="d-flex justify-content-end mt-40">
          <Button onClick={onComplete} xlg primary>
            Save Interview
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleInterview;
