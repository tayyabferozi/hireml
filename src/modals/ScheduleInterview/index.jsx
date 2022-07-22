import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";

import Modal from "../../components/Modal";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
// import Select from "../../components/Select/select";
// import Option from "../../components/Select/option";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ScheduleInterview = ({ onComplete, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    candidate_email: "",
    status: 2,
    candidate_name: "",
    interview_timestamp: "",
    date: new Date(),
    time: "12:00",
  });
  const { email } = useSelector((state) => state.user);

  function formateDateTime(d, t) {
    const d2 = new Date(d);
    const year = d2.getFullYear();
    const month = (d2.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const date = d2.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const str = year + "-" + month + "-" + date + "T" + t + ":00Z";

    return str;
  }

  const inputChangeHandler = (e, meta) => {
    let name, value;

    if (meta === "date") {
      setFormState((prevState) => {
        return {
          ...prevState,
          date: e,
          interview_timestamp: formateDateTime(e, prevState.time),
        };
      });
      return;
    } else if (meta === "time") {
      setFormState((prevState) => {
        return {
          ...prevState,
          time: e,
          interview_timestamp: formateDateTime(prevState.date, e),
        };
      });
      return;
    }
    ({ name, value } = e.target);

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    formState.interview_timestamp = formateDateTime(
      formState.date,
      formState.time
    );

    axios
      .post("/interviews", formState)
      .then((res) => {
        onComplete();
      })
      .catch((err) => {
        try {
          if (
            typeof err?.response?.data?.detail === "object" &&
            err?.response?.data?.detail.length > 0
          ) {
            err?.response?.data?.detail?.forEach((el) => {
              toast.error(el.loc[1] + " " + el.msg);
            });
          } else {
            toast.error("Uh Oh! Something went wrong.");
          }
        } catch (err) {
          console.log(err);
          toast.error("Uh Oh! Something went wrong.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setFormState((prevState) => {
      return { ...prevState, email };
    });
  }, [email]);

  return (
    <Modal className="interview-modal" {...rest}>
      <div className="modal-head">
        <h4 className="title">Schedule an interview</h4>
        <form onSubmit={formSubmitHandler} action="">
          <GridContainer className="mt-50 mt-767-30">
            <div className="col-lg-6">
              <Input
                name="candidate_name"
                onChange={inputChangeHandler}
                value={formState.candidate_name}
                label="Candidate Name"
                placeholder="Enter Candidate's Name"
              />
              <Input
                name="candidate_email"
                onChange={inputChangeHandler}
                value={formState.candidate_email}
                label="Candidate Email"
                placeholder="Enter Candidate's Email"
              />

              <label htmlFor="">Time</label>
              <div>
                <TimePicker
                  onChange={(e) => inputChangeHandler(e, "time")}
                  value={formState.time}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <Calendar
                onChange={(e) => inputChangeHandler(e, "date")}
                value={formState.date}
              />
            </div>
          </GridContainer>

          <div className="d-flex justify-content-end mt-40">
            <Button xlg primary>
              {isLoading ? <Loader /> : "Save Interview"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ScheduleInterview;
