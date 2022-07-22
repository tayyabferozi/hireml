import React, { useState, useEffect } from "react";
import clsx from "clsx";

import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Select from "../../components/Select/select";
import Option from "../../components/Select/option";

import DashboardLayout from "../../layouts/DashboardLayout";
import InterviewBtns from "../../partials/InterviewBtns";
import Loader from "../../components/Loader";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialFormState = {
  user_email: "",
  invited_user_email: "",
  role: "",
};

const UpcomingInterview = () => {
  const [isListLoading, setIsListLoading] = useState(false);
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [errState, setErrState] = useState("");
  const [formState, setFormState] = useState(initialFormState);
  const [teamState, setTeamState] = useState([]);
  const userState = useSelector((state) => state.user);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setIsInviteLoading(true);

    axios
      .post("/team", formState)
      .then((res) => {
        setFormState({ invited_user_email: "", role: "" });
        toast.success("Invitation sent successfully");
      })
      .catch((err) => {
        console.log(err);
        if (typeof err?.response?.data?.detail === "object") {
          setErrState(err?.response?.data?.detail[0].msg);
        } else {
          toast.error("Uh Oh! Something went wrong.");
        }
      })
      .finally(() => setIsInviteLoading(false));
  };

  useEffect(() => {
    axios
      .get(`/team?email=${userState.email}`)
      .then((res) => {
        console.log(res.data.teams);
        setTeamState(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong");
      })
      .finally(() => setIsListLoading(false));
  }, [userState.email]);

  useEffect(() => {
    setFormState((prevState) => {
      return { ...prevState, user_email: userState.email };
    });
  }, [userState]);

  return (
    <DashboardLayout HeaderBtns={InterviewBtns}>
      <div className="card-lg">
        <h4 className="title">Invite your team members</h4>

        <form onSubmit={formSubmitHandler} action="">
          <GridContainer className="mt-50">
            <div className="col-lg-5 col-md-8">
              <Input
                name="invited_user_email"
                onChange={inputChangeHandler}
                value={formState.invited_user_email}
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
              />
            </div>
            <div className="col-lg-3 col-md-4">
              <Select
                name="role"
                onSelectChange={inputChangeHandler}
                value={formState.role}
                label="Role"
                placeholder="Select Role"
                errMsg={errState}
              >
                <Option value="Admin">Admin</Option>
                <Option value="Member">Member</Option>
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
                {isInviteLoading ? <Loader /> : "Send Invite"}
              </Button>
            </div>
          </GridContainer>
        </form>
      </div>

      {isListLoading ? (
        <div className="text-center">
          <Loader lg />
        </div>
      ) : (
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
              {teamState.map((el, idx) => {
                const { user_email, role, invite_status, created_at } = el;

                return (
                  <div key={"item-" + idx} className="row-item">
                    <div className="cell-item">
                      <div className="left">Email</div>
                      <div className="right">{user_email}</div>
                    </div>
                    <div className="cell-item">
                      <div className="left">Role</div>
                      <div className="right">{role}</div>
                    </div>
                    <div className="cell-item">
                      <div className="left">Status</div>
                      <div
                        className={clsx(
                          invite_status === "Completed" && "text-red",
                          invite_status === "Pending" && "text-green",
                          "right"
                        )}
                      >
                        {invite_status}
                      </div>
                    </div>
                    <div className="cell-item">
                      <div className="left">Created</div>
                      <div className="right">
                        {new Date(created_at).toLocaleTimeString()}{" "}
                        {new Date(created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UpcomingInterview;
