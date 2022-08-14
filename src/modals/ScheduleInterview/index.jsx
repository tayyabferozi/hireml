import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import $ from "jquery";
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
import isEmpty from "../../utils/is-empty";

const timeData = [
  "12:00am",
  "12:30am",
  "01:00am",
  "01:30am",
  "02:00am",
  "02:30am",
  "03:00am",
  "03:30am",
  "04:00am",
  "04:30am",
  "05:00am",
  "05:30am",
  "06:00am",
  "06:30am",
  "07:00am",
  "07:30am",
  "08:00am",
  "08:30am",
  "09:00am",
  "09:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "01:00pm",
  "01:30pm",
  "02:00pm",
  "02:30pm",
  "03:00pm",
  "03:30pm",
  "04:00pm",
  "04:30pm",
  "05:00pm",
  "05:30pm",
  "06:00pm",
  "06:30pm",
  "07:00pm",
  "07:30pm",
  "08:00pm",
  "08:30pm",
  "09:00pm",
  "09:30pm",
  "10:00pm",
  "10:30pm",
  "11:00pm",
  "11:30pm",
];

// const timeData = [
//   "12:00am",
//   "12:15am",
//   "12:30am",
//   "12:45am",
//   "01:00am",
//   "01:15am",
//   "01:30am",
//   "01:45am",
//   "02:00am",
//   "02:15am",
//   "02:30am",
//   "2:45am",
//   "03:00am",
//   "03:15am",
//   "03:30am",
//   "03:45am",
//   "04:00am",
//   "04:15am",
//   "04:30am",
//   "04:45am",
//   "05:00am",
//   "05:15am",
//   "05:30am",
//   "05:45am",
//   "06:00am",
//   "06:15am",
//   "06:30am",
//   "06:45am",
//   "07:00am",
//   "07:15am",
//   "07:30am",
//   "07:45am",
//   "08:00am",
//   "08:15am",
//   "08:30am",
//   "08:45am",
//   "09:00am",
//   "09:15am",
//   "09:30am",
//   "09:45am",
//   "10:00am",
//   "10:15am",
//   "10:30am",
//   "10:45am",
//   "11:00am",
//   "11:15am",
//   "11:30am",
//   "11:45am",
//   "12:00pm",
//   "12:15pm",
//   "12:30pm",
//   "12:45pm",
//   "01:00pm",
//   "01:15pm",
//   "01:30pm",
//   "01:45pm",
//   "02:00pm",
//   "02:15pm",
//   "02:30pm",
//   "02:45pm",
//   "03:00pm",
//   "03:15pm",
//   "03:30pm",
//   "03:45pm",
//   "04:00pm",
//   "04:15pm",
//   "04:30pm",
//   "04:45pm",
//   "05:00pm",
//   "05:15pm",
//   "05:30pm",
//   "05:45pm",
//   "06:00pm",
//   "06:15pm",
//   "06:30pm",
//   "06:45pm",
//   "07:00pm",
//   "07:15pm",
//   "07:30pm",
//   "07:45pm",
//   "08:00pm",
//   "08:15pm",
//   "08:30pm",
//   "08:45pm",
//   "09:00pm",
//   "09:15pm",
//   "09:30pm",
//   "09:45pm",
//   "10:00pm",
//   "10:15pm",
//   "10:30pm",
//   "10:45pm",
//   "11:00pm",
//   "11:15pm",
//   "11:30pm",
//   "11:45pm",
// ];

const intialFormState = {
  email: "",
  candidate_email: "",
  status: 1,
  candidate_name: "",
  interview_date: "",
  start_time: "",
  end_time: "",
  start_period: "",
  end_period: "",
  date: new Date(),
};

const ScheduleInterview = ({ onComplete, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(intialFormState);
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    // const d2 = new Date();

    // setFormState((prev) => {
    //   let selectedDate;
    //   for (const item of timeData) {
    //     const startTimeBroken = item.split(":");

    //     let startTimeH = +startTimeBroken[0];
    //     const startTimeM = +startTimeBroken[1].substring(0, 2);
    //     const startTimePeriod = startTimeBroken[1].substring(2, 4);
    //     if (startTimeH === 12 && startTimePeriod === "am") {
    //       startTimeH = 0;
    //     } else if (startTimeH !== 12 && startTimePeriod === "pm") {
    //       startTimeH += 12;
    //     }
    //     const d1 = new Date();
    //     d1.setHours(startTimeH);
    //     d1.setMinutes(startTimeM);
    //     d1.setSeconds(0);

    //     if (d2.getTime() > d1.getTime()) {
    //       selectedDate = item;
    //       break;
    //     }
    //   }

    //   return { ...prev, start_time: selectedDate };
    // });
    $(".react-calendar__tile.react-calendar__tile--now").click();
  }, []);

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

  console.log(formState);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (formState.start_time && formState.end_period) {
      const startDateArr = formState.interview_date.split("-");
      const startTimeArr = formState.start_time.split(":");
      const endTimeArr = formState.end_time.split(":");
      if (+startTimeArr[0] === 12 && formState.start_period === "am") {
        startTimeArr[0] = 0;
      } else if (+startTimeArr[0] !== 12 && formState.start_period === "pm") {
        startTimeArr[0] = +startTimeArr[0] + 12;
      }
      if (+endTimeArr[0] === 12 && formState.end_period === "am") {
        endTimeArr[0] = 0;
      } else if (+endTimeArr[0] !== 12 && formState.end_period === "pm") {
        endTimeArr[0] = +endTimeArr[0] + 12;
      }
      // console.log(startDateArr);
      // console.log("------------");
      // console.log(startTimeArr);
      // console.log(formState.start_period);
      // console.log("------------");
      // console.log(endTimeArr);
      // console.log(formState.end_period);

      const startTime = new Date(
        startDateArr[0],
        startDateArr[1] - 1,
        startDateArr[2],
        startTimeArr[0],
        startTimeArr[1]
      );
      const endTime = new Date(
        startDateArr[0],
        startDateArr[1],
        startDateArr[2],
        endTimeArr[0],
        endTimeArr[1]
      );

      if (startTime.getTime() < Date.now() || endTime.getTime() < Date.now()) {
        console.log(startTime, startTime.getTime());
        console.log(endTime, endTime.getTime());
        console.log(new Date(Date.now()).toLocaleString(), Date.now());
        toast.error("You cannot enter a past time");
        return;
      }
    }

    if (isEmpty(formState.candidate_name)) {
      toast.error("Please enter a name");
      return;
    }

    if (isEmpty(formState.candidate_email)) {
      toast.error("Please enter an email");
      return;
    }
    formState.offset = new Date().getTimezoneOffset();

    axios
      .post("/interviews", formState)
      .then((res) => {
        onComplete();
        // setFormState(intialFormState);
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
            toast.error(
              "Uh Oh! Something went wrong while adding the schedule"
            );
          }
        } catch (err) {
          console.log(err);
          toast.error("Uh Oh! Something went wrong while adding the schedule");
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
          <GridContainer className="mt-20 mt-767-0">
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
                      {timeData
                        // .filter((el) => {
                        //   const startTimeBroken = el.split(":");

                        //   let startTimeH = +startTimeBroken[0];
                        //   const startTimeM = +startTimeBroken[1].substring(
                        //     0,
                        //     2
                        //   );
                        //   const startTimePeriod = startTimeBroken[1].substring(
                        //     2,
                        //     4
                        //   );
                        //   if (startTimeH === 12 && startTimePeriod === "am") {
                        //     startTimeH = 0;
                        //   } else if (
                        //     startTimeH !== 12 &&
                        //     startTimePeriod === "pm"
                        //   ) {
                        //     startTimeH += 12;
                        //   }
                        //   const d1 = new Date();
                        //   d1.setHours(startTimeH);
                        //   d1.setMinutes(startTimeM);
                        //   d1.setSeconds(0);

                        //   const d2 = new Date();

                        //   if (d1.getTime() < d2.getTime()) return false;

                        //   // console.log(d1);

                        //   return true;
                        // })
                        .map((el, idx) => {
                          return (
                            <Option key={"start_time" + idx} value={el}>
                              {el}
                            </Option>
                          );
                        })}
                    </Select>
                  </div>
                  <div className="col-6">
                    <Select
                      withSearch
                      name="end_time"
                      placeholder="To"
                      onSelectChange={inputChangeHandler}
                    >
                      {timeData
                        .filter((el, idx) => {
                          const startTimeBroken =
                            formState.start_time.split(":");
                          const endTimeBroken = el.split(":");

                          let startTimeH = +startTimeBroken[0];
                          if (
                            startTimeH === 12 &&
                            formState.start_period === "am"
                          ) {
                            startTimeH = 0;
                          } else if (
                            startTimeH !== 12 &&
                            formState.start_period === "pm"
                          ) {
                            startTimeH += 12;
                          }
                          const startTimeM = startTimeBroken[1];

                          let endTimePeriod = endTimeBroken[1].substring(2, 4);

                          let endTimeH = +el.split(":")[0];
                          if (endTimeH === 12 && endTimePeriod === "am") {
                            endTimeH = 0;
                          } else if (
                            endTimeH !== 12 &&
                            endTimePeriod === "pm"
                          ) {
                            endTimeH += 12;
                          }
                          // console.log(endTimeH);
                          const endTimeM = endTimeBroken[1].substring(0, 2);

                          // console.log(startTimeH, endTimeH);

                          const d1 = new Date(
                            2022,
                            1,
                            1,
                            startTimeH,
                            startTimeM
                          );

                          const d2 = new Date(2022, 1, 1, endTimeH, endTimeM);

                          // console.log(d1, d2);
                          // console.log(d1, d2);

                          // console.log(+endTimeBroken[0], +startTimeBroken[0]);
                          if (d1.getTime() < d2.getTime()) return true;

                          return false;
                        })
                        .map((el, idx) => {
                          // if(formState )
                          return (
                            <Option key={"end_time" + idx} value={el}>
                              {el}
                            </Option>
                          );
                        })}
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
                defaultValue={new Date()}
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
