import React, { useState, useEffect } from "react";
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

  const openFile = (interview_id) => {
    axios
      .get(
        `/recording/{filename}?email=${userState.email}&interview_id=${interview_id}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (typeof err?.response?.data?.detail === "string") {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Uh Oh! Something went wrong.");
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`/interviews/completed-interviews?email=${userState.email}`)

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
  return (
    <DashboardLayout HeaderBtns={InterviewBtns}>
      <div className="card-lg">
        <h4 className="title d-1100-none">Completed Interviews</h4>

        {isLoading ? (
          <div className="text-center">
            <Loader lg />
          </div>
        ) : (
          <div className="custom-table mt-1100-0">
            <div className="table-head">
              <div className="row-item">
                <div className="cell-item">Name</div>
                <div className="cell-item">Candidate Name</div>
                <div className="cell-item">Creator</div>
                <div className="cell-item">Interview Date</div>
              </div>
            </div>

            <div className="table-body">
              {interviewsState.map((el, idx) => {
                const {
                  interview_id,
                  candidate_name,
                  email,

                  interview_date,
                  start_time,
                  start_period,
                } = el;

                return (
                  <div key={"item-" + idx} className="row-item">
                    <div className="cell-item">
                      <div className="left">Notebook</div>
                      <div className="right">
                        <div
                          className="d-flex align-items-center gap-2 c-pointer"
                          onClick={(e) => openFile(interview_id)}
                        >
                          <img src="/assets/vectors/play.svg" alt="play" />{" "}
                          <span className="text-primary-1">View Notebook</span>
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
                        {interview_date} {start_time + start_period}
                        {/* {new Date(interview_timestamp).toLocaleTimeString()}{" "}
                        {new Date(interview_timestamp).toLocaleDateString()} */}
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
  );
};

export default UpcomingInterview;
