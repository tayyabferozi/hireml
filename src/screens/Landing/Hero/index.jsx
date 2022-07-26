import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Section from "../../../components/Section";
import GridContainer from "../../../components/GridContainer";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";

const Hero = () => {
  const [isLoadingState, setIsLoadingState] = useState(false);

  const tryItHandler = (e) => {
    e.preventDefault();

    setIsLoadingState(true);

    axios
      .post("/notebook/start")
      .then((res) => {
        window.open(res.data.url, "_blank").focus();
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Uh Oh! Something went wrong.");
      })
      .finally(() => {
        setIsLoadingState(false);
      });
  };

  return (
    <Section id="landing-hero">
      <img
        src="/assets/vectors/dots-1.svg"
        className="dots d-lg-block d-none"
        alt="dots"
      />
      <GridContainer rowClassName="main-row">
        <div className="col-lg-6 d-flex align-items-center">
          <div>
            <h1>
              Hire the <span className="text-primary-1">right</span> <br />
              candidate.
            </h1>
            <p className="mt-20">
              Hireml provides a Jupyter Notebook and the data set interface to
              easily share data with the candidates. The Jupyter Notebook
              provides an interactive environment for writing code, mathematical
              equation and wrangling data.
            </p>

            <div className="d-flex align-items-center mt-50 mt-575-30">
              <Button to="/register" lg primary shadowed className="me-30">
                Sign Up
              </Button>
              {/* <Button lg white to="/upcoming-interview"> */}
              <Button lg white onClick={tryItHandler}>
                {isLoadingState ? <Loader /> : <>Try Now</>}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            className="w-100 d-block right-img"
            src="/assets/imgs/landing-hero.png"
            alt="landing"
          />
        </div>
      </GridContainer>
    </Section>
  );
};

export default Hero;
