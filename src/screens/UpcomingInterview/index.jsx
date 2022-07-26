import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import InterviewBtns from "../../partials/InterviewBtns";
import Loader from "../../components/Loader";

const UpcomingInterview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interviewsState, setInterviewsState] = useState([]);
  const userState = useSelector((state) => state.user);

  const startNotebookHandler = (interview_id, idx) => {
    axios
      .post("/interviews/start-interviews", {
        email: userState.email,
        interview_id,
      })
      .then((res) => {
        toast.success("Notebook started successfully");
        window.open(res.data.url, "_blank").focus();
      })
      .catch((err) => {
        if (err?.response?.data?.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Uh Oh! Something went wrong");
        }
      });

    setInterviewsState((prevState) => {
      const newState = [...prevState];
      newState[idx].started = true;

      return [...newState];
    });
  };

  const stopNotebookHandler = (interview_id, idx) => {
    axios
      .post("/interviews/stop-interviews", {
        email: userState.email,
        interview_id,
      })
      .then(() => {
        updateList();
        toast.success("Notebook stoped successfully");
      })
      .catch((err) => {
        if (err?.response?.data?.detail) {
          toast.error(err.response.data.detail);
        } else {
          console.log(err);
          toast.error("Uh Oh! Something went wrong");
        }
      });

    setInterviewsState((prevState) => {
      const newState = [...prevState];
      newState[idx].started = false;

      return [...newState];
    });
  };

  const updateList = useCallback(() => {
    setIsLoading(true);

    axios
      .get(`/interviews/upcoming-interviews?email=${userState.email}`)

      .then((res) => {
        setInterviewsState(res.data.interviews);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userState]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  useEffect(() => {}, []);

  return (
    <>
      <DashboardLayout btn1OnComplete={updateList} HeaderBtns={InterviewBtns}>
        <div className="card-lg">
          <h4 className="title d-1100-none">Upcoming Interviews</h4>

          {isLoading ? (
            <div className="text-center">
              <Loader lg />
            </div>
          ) : (
            <div className="custom-table mt-1100-0">
              <div className="table-head">
                <div className="row-item">
                  <div className="cell-item">Notebook</div>
                  <div className="cell-item">Candidate Name</div>
                  <div className="cell-item">Creator</div>
                  <div className="cell-item">Interview Date</div>
                  <div className="cell-item">Created</div>
                </div>
              </div>

              <div className="table-body">
                {interviewsState.map((el, idx) => {
                  const {
                    interview_id,
                    candidate_name,
                    email,
                    interview_timestamp,
                    created_at,
                    started,
                  } = el;

                  return (
                    <div key={"item-" + idx} className="row-item">
                      <div className="cell-item">
                        <div className="left">Notebook</div>
                        <div className="right">
                          <div
                            className="d-flex align-items-center gap-2 c-pointer"
                            onClick={() => {
                              if (started) {
                                stopNotebookHandler(interview_id, idx);
                              } else {
                                startNotebookHandler(interview_id, idx);
                              }
                            }}
                          >
                            <img
                              src={`/assets/vectors/${
                                started ? "stop" : "play"
                              }.svg`}
                              alt="play"
                            />{" "}
                            <span className="text-primary-1">
                              {started ? "Stop" : "Start"} Notebook
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Candidate Name </div>
                        <div className="right">{candidate_name}</div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Creator</div>
                        <div className="right">{email}</div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Interview Date</div>
                        <div className="right">
                          {new Date(interview_timestamp).toLocaleTimeString()}{" "}
                          {new Date(interview_timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Created</div>
                        <div className="right">
                          {new Date(created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default UpcomingInterview;
