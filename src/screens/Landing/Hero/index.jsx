import React from "react";

import Section from "../../../components/Section";
import GridContainer from "../../../components/GridContainer";
import Button from "../../../components/Button";

const Hero = () => {
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
              <Button lg primary shadowed className="me-30">
                Sign Up
              </Button>
              <Button lg white to="/upcoming-interview">
                Try Now
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
