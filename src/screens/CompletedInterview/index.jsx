import React from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import InterviewBtns from "../../partials/InterviewBtns";

const data = [
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
  {
    name: "Jerome Bell",
    creator: "Cameron Williamson",
    date: "2021-12-31",
  },
];

const UpcomingInterview = () => {
  return (
    <DashboardLayout HeaderBtns={InterviewBtns}>
      <div className="card-lg">
        <h4 className="title d-1100-none">Dataset</h4>

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
            {data.map((el, idx) => {
              const { name, creator, date } = el;

              return (
                <div key={"item-" + idx} className="row-item">
                  <div className="cell-item">
                    <div className="left">Notebook</div>
                    <div className="right">
                      <div className="d-flex align-items-center gap-2">
                        <img src="/assets/vectors/play.svg" alt="play" />{" "}
                        <span className="text-primary-1">Start Notebook</span>
                      </div>
                    </div>
                  </div>
                  <div className="cell-item">
                    <div className="left">Candidate Name </div>
                    <div className="right">{name}</div>
                  </div>
                  <div className="cell-item">
                    <div className="left">Creator</div>
                    <div className="right">{creator}</div>
                  </div>
                  <div className="cell-item">
                    <div className="left">Interview Date</div>
                    <div className="right">{date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpcomingInterview;
