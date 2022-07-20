import clsx from "clsx";
import React from "react";

import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Select from "../../components/Select/select";
import Option from "../../components/Select/option";

import DashboardLayout from "../../layouts/DashboardLayout";
import InterviewBtns from "../../partials/InterviewBtns";

const data = [
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Invited",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Accepted",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Invited",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Accepted",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Invited",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Accepted",
    created: "2021-12-31",
  },
  {
    email: "jerome@ xyz.com",
    role: "Admin",
    status: "Invited",
    created: "2021-12-31",
  },
];

const UpcomingInterview = () => {
  return (
    <DashboardLayout HeaderBtns={InterviewBtns}>
      <div className="card-lg">
        <h4 className="title">Invite your team members</h4>

        <GridContainer className="mt-50">
          <div className="col-lg-5 col-md-8">
            <Input label="Email" placeholder="johndoe@gmail.com" type="email" />
          </div>
          <div className="col-lg-3 col-md-4">
            <Select label="Role" placeholder="Select Role">
              <Option value="Developer">Developer</Option>
              <Option value="Designer">Designer</Option>
            </Select>
          </div>
          <div className="col d-flex align-items-end">
            <Button
              style={{ minHeight: 50 }}
              className="px-30"
              lg
              primary
              icon={{ src: "/assets/vectors/invite.svg", title: "invite" }}
            >
              Send Invite
            </Button>
          </div>
        </GridContainer>
      </div>

      <div className="card-lg mt-70">
        <h4 className="title d-1100-none">Team Members</h4>

        <div className="custom-table mt-1100-0">
          <div className="table-head">
            <div className="row-item">
              <div className="cell-item">Emails</div>
              <div className="cell-item">Roles</div>
              <div className="cell-item">Status</div>
              <div className="cell-item">Created</div>
            </div>
          </div>

          <div className="table-body">
            {data.map((el, idx) => {
              const { email, role, status, created } = el;

              return (
                <div key={"item-" + idx} className="row-item">
                  <div className="cell-item">
                    <div className="left">Email</div>
                    <div className="right">{email}</div>
                  </div>
                  <div className="cell-item">
                    <div className="left">Role</div>
                    <div className="right">{role}</div>
                  </div>
                  <div className="cell-item">
                    <div className="left">Status</div>
                    <div
                      className={clsx(
                        status === "Invited" && "text-red",
                        status === "Accepted" && "text-green",
                        "right"
                      )}
                    >
                      {status}
                    </div>
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
