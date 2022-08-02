import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Modal from "../../components/Modal";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Select from "../../components/Select/select";
import Option from "../../components/Select/option";

const intialFormState = {
  email: "",
  candidate_email: "",
  status: 1,
  candidate_name: "",
  interview_date: "",
  start_time: "12:00:00",
  end_time: "01:00:00",
  start_period: "am",
  end_period: "am",
  date: new Date(),
};

const ScheduleInterview = ({ onComplete, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(intialFormState);
  const { email } = useSelector((state) => state.user);

  // function formateDateTime(d, t) {
  //   const d2 = new Date(d);
  //   const year = d2.getFullYear();
  //   const month = (d2.getMonth() + 1).toLocaleString("en-US", {
  //     minimumIntegerDigits: 2,
  //     useGrouping: false,
  //   });
  //   const date = d2.getDate().toLocaleString("en-US", {
  //     minimumIntegerDigits: 2,
  //     useGrouping: false,
  //   });
  //   const str = year + "-" + month + "-" + date + "T" + t + ":00Z";

  //   return str;
  // }
  function formateDate(d) {
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
    const str = year + "-" + month + "-" + date;

    return str;
  }

  const inputChangeHandler = (e, meta) => {
    let name, value;

    if (meta === "date") {
      setFormState((prevState) => {
        return {
          ...prevState,
          date: e,
          interview_date: formateDate(e),
        };
      });
      return;
    }

    ({ name, value } = e.target);

    if (name === "start_time" || name === "end_time") {
      const time = value.slice(0, 5) + ":00";
      const period = value.slice(5, 8);

      if (name === "start_time") {
        setFormState((prevState) => {
          return { ...prevState, start_time: time, start_period: period };
        });

        return;
      } else {
        setFormState((prevState) => {
          return { ...prevState, end_time: time, end_period: period };
        });

        return;
      }
    }

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    formState.offset = new Date().getTimezoneOffset();

    axios
      .post("/interviews", formState)
      .then((res) => {
        onComplete();
        setFormState(intialFormState);
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
                <GridContainer>
                  <div className="col-6">
                    <Select
                      withSearch
                      name="start_time"
                      onSelectChange={inputChangeHandler}
                      placeholder="From"
                    >
                      <Option value="12:00am">12:00am</Option>
                      <Option value="12:15am">12:15am</Option>
                      <Option value="12:30am">12:30am</Option>
                      <Option value="12:45am">12:45am</Option>
                      <Option value="01:00am">01:00am</Option>
                      <Option value="01:15am">01:15am</Option>
                      <Option value="01:30am">01:30am</Option>
                      <Option value="01:45am">01:45am</Option>
                      <Option value="02:00am">02:00am</Option>
                      <Option value="02:15am">02:15am</Option>
                      <Option value="02:30am">02:30am</Option>
                      <Option value="02:45am">2:45am</Option>
                      <Option value="03:00am">03:00am</Option>
                      <Option value="03:15am">03:15am</Option>
                      <Option value="03:30am">03:30am</Option>
                      <Option value="03:45am">03:45am</Option>
                      <Option value="04:00am">04:00am</Option>
                      <Option value="04:15am">04:15am</Option>
                      <Option value="04:30am">04:30am</Option>
                      <Option value="04:45am">04:45am</Option>
                      <Option value="05:00am">05:00am</Option>
                      <Option value="05:15am">05:15am</Option>
                      <Option value="05:30am">05:30am</Option>
                      <Option value="05:45am">05:45am</Option>
                      <Option value="06:00am">06:00am</Option>
                      <Option value="06:15am">06:15am</Option>
                      <Option value="06:30am">06:30am</Option>
                      <Option value="06:45am">06:45am</Option>
                      <Option value="07:00am">07:00am</Option>
                      <Option value="07:15am">07:15am</Option>
                      <Option value="07:30am">07:30am</Option>
                      <Option value="07:45am">07:45am</Option>
                      <Option value="08:00am">08:00am</Option>
                      <Option value="08:15am">08:15am</Option>
                      <Option value="08:30am">08:30am</Option>
                      <Option value="08:45am">08:45am</Option>
                      <Option value="09:00am">09:00am</Option>
                      <Option value="09:15am">09:15am</Option>
                      <Option value="09:30am">09:30am</Option>
                      <Option value="09:45am">09:45am</Option>
                      <Option value="10:00am">10:00am</Option>
                      <Option value="10:15am">10:15am</Option>
                      <Option value="10:30am">10:30am</Option>
                      <Option value="10:45am">10:45am</Option>
                      <Option value="11:00am">11:00am</Option>
                      <Option value="11:15am">11:15am</Option>
                      <Option value="11:30am">11:30am</Option>
                      <Option value="11:45am">11:45am</Option>
                      <Option value="12:00pm">12:00pm</Option>
                      <Option value="12:15pm">12:15pm</Option>
                      <Option value="12:30pm">12:30pm</Option>
                      <Option value="12:45pm">12:45pm</Option>
                      <Option value="01:00pm">01:00pm</Option>
                      <Option value="01:15pm">01:15pm</Option>
                      <Option value="01:30pm">01:30pm</Option>
                      <Option value="01:45pm">01:45pm</Option>
                      <Option value="02:00pm">02:00pm</Option>
                      <Option value="02:15pm">02:15pm</Option>
                      <Option value="02:30pm">02:30pm</Option>
                      <Option value="02:45pm">02:45pm</Option>
                      <Option value="03:00pm">03:00pm</Option>
                      <Option value="03:15pm">03:15pm</Option>
                      <Option value="03:30pm">03:30pm</Option>
                      <Option value="03:45pm">03:45pm</Option>
                      <Option value="04:00pm">04:00pm</Option>
                      <Option value="04:15pm">04:15pm</Option>
                      <Option value="04:30pm">04:30pm</Option>
                      <Option value="04:45pm">04:45pm</Option>
                      <Option value="05:00pm">05:00pm</Option>
                      <Option value="05:15pm">05:15pm</Option>
                      <Option value="05:30pm">05:30pm</Option>
                      <Option value="05:45pm">05:45pm</Option>
                      <Option value="06:00pm">06:00pm</Option>
                      <Option value="06:15pm">06:15pm</Option>
                      <Option value="06:30pm">06:30pm</Option>
                      <Option value="06:45pm">06:45pm</Option>
                      <Option value="07:00pm">07:00pm</Option>
                      <Option value="07:15pm">07:15pm</Option>
                      <Option value="07:30pm">07:30pm</Option>
                      <Option value="07:45pm">07:45pm</Option>
                      <Option value="08:00pm">08:00pm</Option>
                      <Option value="08:15pm">08:15pm</Option>
                      <Option value="08:30pm">08:30pm</Option>
                      <Option value="08:45pm">08:45pm</Option>
                      <Option value="09:00pm">09:00pm</Option>
                      <Option value="09:15pm">09:15pm</Option>
                      <Option value="09:30pm">09:30pm</Option>
                      <Option value="09:45pm">09:45pm</Option>
                      <Option value="10:00pm">10:00pm</Option>
                      <Option value="10:15pm">10:15pm</Option>
                      <Option value="10:30pm">10:30pm</Option>
                      <Option value="10:45pm">10:45pm</Option>
                      <Option value="11:00pm">11:00pm</Option>
                      <Option value="11:15pm">11:15pm</Option>
                      <Option value="11:30pm">11:30pm</Option>
                      <Option value="11:45pm">11:45pm</Option>
                    </Select>
                  </div>
                  <div className="col-6">
                    <Select
                      withSearch
                      name="end_time"
                      placeholder="To"
                      onSelectChange={inputChangeHandler}
                    >
                      <Option value="12:00am">12:00am</Option>
                      <Option value="12:15am">12:15am</Option>
                      <Option value="12:30am">12:30am</Option>
                      <Option value="12:45am">12:45am</Option>
                      <Option value="01:00am">01:00am</Option>
                      <Option value="01:15am">01:15am</Option>
                      <Option value="01:30am">01:30am</Option>
                      <Option value="01:45am">01:45am</Option>
                      <Option value="02:00am">02:00am</Option>
                      <Option value="02:15am">02:15am</Option>
                      <Option value="02:30am">02:30am</Option>
                      <Option value="02:45am">2:45am</Option>
                      <Option value="03:00am">03:00am</Option>
                      <Option value="03:15am">03:15am</Option>
                      <Option value="03:30am">03:30am</Option>
                      <Option value="03:45am">03:45am</Option>
                      <Option value="04:00am">04:00am</Option>
                      <Option value="04:15am">04:15am</Option>
                      <Option value="04:30am">04:30am</Option>
                      <Option value="04:45am">04:45am</Option>
                      <Option value="05:00am">05:00am</Option>
                      <Option value="05:15am">05:15am</Option>
                      <Option value="05:30am">05:30am</Option>
                      <Option value="05:45am">05:45am</Option>
                      <Option value="06:00am">06:00am</Option>
                      <Option value="06:15am">06:15am</Option>
                      <Option value="06:30am">06:30am</Option>
                      <Option value="06:45am">06:45am</Option>
                      <Option value="07:00am">07:00am</Option>
                      <Option value="07:15am">07:15am</Option>
                      <Option value="07:30am">07:30am</Option>
                      <Option value="07:45am">07:45am</Option>
                      <Option value="08:00am">08:00am</Option>
                      <Option value="08:15am">08:15am</Option>
                      <Option value="08:30am">08:30am</Option>
                      <Option value="08:45am">08:45am</Option>
                      <Option value="09:00am">09:00am</Option>
                      <Option value="09:15am">09:15am</Option>
                      <Option value="09:30am">09:30am</Option>
                      <Option value="09:45am">09:45am</Option>
                      <Option value="10:00am">10:00am</Option>
                      <Option value="10:15am">10:15am</Option>
                      <Option value="10:30am">10:30am</Option>
                      <Option value="10:45am">10:45am</Option>
                      <Option value="11:00am">11:00am</Option>
                      <Option value="11:15am">11:15am</Option>
                      <Option value="11:30am">11:30am</Option>
                      <Option value="11:45am">11:45am</Option>
                      <Option value="12:00pm">12:00pm</Option>
                      <Option value="12:15pm">12:15pm</Option>
                      <Option value="12:30pm">12:30pm</Option>
                      <Option value="12:45pm">12:45pm</Option>
                      <Option value="01:00pm">01:00pm</Option>
                      <Option value="01:15pm">01:15pm</Option>
                      <Option value="01:30pm">01:30pm</Option>
                      <Option value="01:45pm">01:45pm</Option>
                      <Option value="02:00pm">02:00pm</Option>
                      <Option value="02:15pm">02:15pm</Option>
                      <Option value="02:30pm">02:30pm</Option>
                      <Option value="02:45pm">02:45pm</Option>
                      <Option value="03:00pm">03:00pm</Option>
                      <Option value="03:15pm">03:15pm</Option>
                      <Option value="03:30pm">03:30pm</Option>
                      <Option value="03:45pm">03:45pm</Option>
                      <Option value="04:00pm">04:00pm</Option>
                      <Option value="04:15pm">04:15pm</Option>
                      <Option value="04:30pm">04:30pm</Option>
                      <Option value="04:45pm">04:45pm</Option>
                      <Option value="05:00pm">05:00pm</Option>
                      <Option value="05:15pm">05:15pm</Option>
                      <Option value="05:30pm">05:30pm</Option>
                      <Option value="05:45pm">05:45pm</Option>
                      <Option value="06:00pm">06:00pm</Option>
                      <Option value="06:15pm">06:15pm</Option>
                      <Option value="06:30pm">06:30pm</Option>
                      <Option value="06:45pm">06:45pm</Option>
                      <Option value="07:00pm">07:00pm</Option>
                      <Option value="07:15pm">07:15pm</Option>
                      <Option value="07:30pm">07:30pm</Option>
                      <Option value="07:45pm">07:45pm</Option>
                      <Option value="08:00pm">08:00pm</Option>
                      <Option value="08:15pm">08:15pm</Option>
                      <Option value="08:30pm">08:30pm</Option>
                      <Option value="08:45pm">08:45pm</Option>
                      <Option value="09:00pm">09:00pm</Option>
                      <Option value="09:15pm">09:15pm</Option>
                      <Option value="09:30pm">09:30pm</Option>
                      <Option value="09:45pm">09:45pm</Option>
                      <Option value="10:00pm">10:00pm</Option>
                      <Option value="10:15pm">10:15pm</Option>
                      <Option value="10:30pm">10:30pm</Option>
                      <Option value="10:45pm">10:45pm</Option>
                      <Option value="11:00pm">11:00pm</Option>
                      <Option value="11:15pm">11:15pm</Option>
                      <Option value="11:30pm">11:30pm</Option>
                      <Option value="11:45pm">11:45pm</Option>
                    </Select>
                  </div>
                </GridContainer>
              </div>
            </div>

            <div className="col-lg-6">
              <Calendar
                minDate={new Date()}
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
