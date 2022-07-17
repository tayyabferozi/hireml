import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const UpcomingInterview = () => {
  return (
    <DashboardLayout>
      <div className="card-lg">
        <h4 className="title">Upcoming Interviews</h4>

        <div className="custom-table">
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
            {[
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
              {
                name: "Jerome Bell",
                creator: "Cameron Williamson",
                date: "2021-12-31",
                created: "An hour ago",
              },
            ].map((el, idx) => {
              const { name, creator, date, created } = el;

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
                  <div className="cell-item">
                    <div className="left">Created</div>
                    <div className="right">{created}</div>
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
