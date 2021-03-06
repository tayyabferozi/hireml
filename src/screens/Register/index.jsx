import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/Loader";

const initialFormState = {
  email: "",
  phone_number: "",
  company_name: "",
  name: "",
  password: "",
  confirm_password: "",
};

const initialErrorState = {
  email: "",
  phone_number: "",
  company_name: "",
  name: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
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

    if (!document.querySelector("#policy").checked) {
      toast.error("You must agree the terms of services");
      return;
    }

    setIsLoading(true);
    setErrState(initialErrorState);
    axios
      .post("/users", formState)
      .then((res) => {
        toast.success("Account created successfully");
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
          toast.error("Uh Oh! Something went wrong.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainLayout>
      <Section id="auth">
        <div className="auth-card">
          <form onSubmit={formSubmitHandler} action="">
            <h3 className="text-center">Register</h3>
            <div className="mt-26">
              <Input
                name="name"
                onChange={inputChangeHandler}
                value={formState.name}
                label="Name"
                errMsg={errState.name}
              />
              <Input
                name="email"
                onChange={inputChangeHandler}
                value={formState.email}
                className="mt-34"
                label="Email"
                errMsg={errState.email}
              />
              <Input
                name="phone_number"
                onChange={inputChangeHandler}
                value={formState.phone_number}
                className="mt-34"
                label="Phone Number"
              />
              <Input
                name="company_name"
                onChange={inputChangeHandler}
                value={formState.company_name}
                className="mt-34"
                label="Company Name"
                errMsg={errState.password}
              />
              <Input
                name="password"
                onChange={inputChangeHandler}
                value={formState.password}
                className="mt-34"
                label="Password"
                type="password"
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
            </div>

            <label className="custom-checkbox mt-10">
              I agree with the{" "}
              <Link to="#0" className="highlight">
                terms of services
              </Link>{" "}
              &amp;{" "}
              <Link to="#0" className="highlight">
                privacy policy
              </Link>{" "}
              of the website
              <input
                id="policy"
                type="checkbox"
                name="policy"
                value={formState.policy}
                onChange={inputChangeHandler}
              />
              <span className="checkmark"></span>
            </label>

            <Button primary shadowed className="mt-26">
              {isLoading ? <Loader /> : "Register"}
            </Button>
          </form>

          <div className="text-center fs-14 fs-991-12 text-dark-1 mt-40">
            Already have an account?{" "}
            <Link className="highlight" to="/login">
              Login
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
};

export default Register;
