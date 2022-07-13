import React from "react";

import Section from "../../../components/Section";
import GridContainer from "../../../components/GridContainer";
import Button from "../../../components/Button";

const Hero = () => {
  return (
    <Section id="landing-hero">
      <img src="/assets/vectors/dots-1.svg" className="dots" alt="dots" />
      <GridContainer>
        <div className="col-lg-6 d-flex align-items-center">
          <div>
            <h1>
              Hire the <span className="text-primary-1">right</span> candidate.
            </h1>
            <p className="mt-20">
              Hireml provides a Jupyter Notebook and the data set interface to
              easily share data with the candidates. The Jupyter Notebook
              provides an interactive environment for writing code, mathematical
              equation and wrangling data.
            </p>

            <div className="d-flex align-items-center mt-50">
              <Button primary shadowed className="me-30">
                Sign Up
              </Button>
              <Button white>Try Now</Button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            className="w-100 d-block"
            src="/assets/imgs/landing-hero.png"
            alt="landing"
          />
        </div>
      </GridContainer>
    </Section>
  );
};

export default Hero;
