import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import Button from "../../components/Button";
import isEmpty from "../../utils/is-empty";

const initialFormState = {
  password: "",
  confirm_password: "",
};

const initialErrorState = {
  password: "",
  confirm_password: "",
};

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errState, setErrState] = useState(initialErrorState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isEmpty(formState.password)) {
      setErrState({ password: "Field required" });
      return;
    }

    if (isEmpty(formState.confirm_password)) {
      setErrState({ confirm_password: "Field required" });
      return;
    }

    setErrState(initialErrorState);
    setIsLoading(true);

    axios
      .post(
        `/users/change-password?password=${formState.password}&confirm_password=${formState.confirm_password}`
      )
      .then((res) => {
        console.log(res);
        toast.success("Password changed successfully!");
        setFormState(initialFormState);
      })
      .catch((err) => {
        if (err.response.data) {
          let obj = {};
          if (
            typeof err?.response?.data?.detail === "object" &&
            err?.response?.data?.detail.length > 0
          ) {
            err?.response?.data?.detail?.forEach((el) => {
              obj[el.loc[1]] = el.msg;
            });
            setErrState(obj);
          } else {
            if (err?.response?.data?.detail.includes("password")) {
              setErrState({ confirm_password: err?.response?.data?.detail });
            } else {
              setErrState({ email: err?.response?.data?.detail });
            }
          }
        } else {
          toast.error(
            "Uh Oh! Something went wrong while changing the password"
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <DashboardLayout>
      <div className="card-lg">
        <h4 className="title d-1100-none">Change Password</h4>

        {isLoading ? (
          <div className="text-center">
            <Loader lg />
          </div>
        ) : (
          <form
            className="mx-auto"
            style={{ maxWidth: 400 }}
            onSubmit={formSubmitHandler}
            action=""
          >
            <Input
              name="password"
              onChange={inputChangeHandler}
              value={formState.password}
              className="mt-34"
              label="Password"
              type="password"
              errMsg={errState.password}
            />
            <Input
              name="confirm_password"
              onChange={inputChangeHandler}
              value={formState.confirm_password}
              className="mt-34"
              label="Confirm Password"
              type="password"
              errMsg={errState.confirm_password}
            />

            <Button className={"mt-40"} primary xlg>
              Submit
            </Button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
