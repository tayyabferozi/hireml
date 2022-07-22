import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";
import isEmpty from "../../utils/is-empty";
import Loader from "../../components/Loader";

import { setLoggedInUser } from "../../store/actions/userActions";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [errState, setErrState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrState({});

    const formData = new FormData();
    formData.append("username", formState.username);
    formData.append("password", formState.password);

    axios
      .post(
        `/users/authenticate-user?username=${formState.username}&password=${formState.password}`,
        formData
      )
      .then((res) => {
        dispatch(setLoggedInUser(res.data.access_token));
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
            if (err?.response?.data?.detail) {
              toast.error(err?.response?.data?.detail);
            }
          }
        } else {
          toast.error("Uh Oh! Something went wrong.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrState({});

    if (isEmpty(formState.username)) {
      setErrState({ username: "Please enter your email" });
      return;
    }

    axios
      .post(`/users/forget-password?email=${formState.username}`)
      .then((res) => {
        if (res.data.success) {
          toast.success(
            "Please check your e-mail for recovering your account."
          );
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detail) {
          toast.error(err?.response?.data?.detail);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <MainLayout>
      <Section id="auth">
        <div className="auth-card">
          <form onSubmit={formSubmitHandler} action="">
            <h3 className="text-center">Login</h3>
            <div className="mt-26">
              <Input
                name="username"
                onChange={inputChangeHandler}
                value={formState.username}
                label="Your email"
                placeholder="Tonynguyen@example.com"
                errMsg={errState.username}
              />
              <Input
                name="password"
                onChange={inputChangeHandler}
                value={formState.password}
                className="mt-34"
                label="Password"
                type="password"
                errMsg={errState.password}
              />
            </div>

            <Link
              className="d-block text-end highlight fs-12 fs-991-10 mt-26"
              to="/"
              onClick={forgotPasswordHandler}
            >
              Forgot password?
            </Link>

            <Button primary shadowed className="mt-3">
              {isLoading ? <Loader /> : "Login"}
            </Button>
          </form>

          <div className="text-center fs-14 fs-991-12 text-dark-1 mt-40">
            Don’t have an account?{" "}
            <Link className="highlight" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
};

export default Login;
