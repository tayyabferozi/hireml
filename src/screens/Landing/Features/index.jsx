import React from "react";
import Section from "../../../components/Section";

const Features = () => {
  return (
    <Section id="landing-features">
      <img
        className="bg-feature-1"
        src="/assets/vectors/bg-feature-1.svg"
        alt="bg"
      />
      <img
        className="bg-feature-2"
        src="/assets/vectors/bg-feature-2.svg"
        alt="bg"
      />
      <img
        className="bg-feature-3"
        src="/assets/vectors/bg-feature-3.svg"
        alt="bg"
      />
      <img
        className="bg-feature-4"
        src="/assets/vectors/bg-feature-4.svg"
        alt="bg"
      />
      <img
        className="bg-feature-5"
        src="/assets/vectors/bg-feature-5.svg"
        alt="bg"
      />
      <img
        className="bg-feature-6"
        src="/assets/vectors/bg-feature-6.svg"
        alt="bg"
      />
      <div className="page-container px-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h3>Easy To Collaborate</h3>
                <p>
                  The platform allows easy management, recording, and sharing of
                  the candidate response among the team members. The team
                  members can go through the notebook and discuss the
                  candidate's skills.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <div className="img-container">
                <img
                  className="d-lg-block d-md-none"
                  src="/assets/imgs/feature-1.png"
                  alt="feature"
                />
                <img
                  className="d-lg-none d-md-block d-none"
                  src="/assets/imgs/feature-1-sm.png"
                  alt="feature"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h3>Notebook Based Interface</h3>
                <p>
                  Use the Jupyter notebook to assess candidate coding, data
                  wrangling and machine learning skills.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <div className="img-container">
                <img
                  className="d-lg-block d-md-none"
                  src="/assets/imgs/feature-2.jpeg"
                  alt="feature"
                />
                <img
                  className="d-lg-none d-md-block d-none"
                  src="/assets/imgs/feature-2-sm.png"
                  alt="feature"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h3>Dataset Interface</h3>
                <p>
                  The platform provides the interface to upload data that can be
                  accessed from the notebook. The data can be prepared
                  beforehand so that the necessary dataset is available during
                  the interview.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <div className="img-container">
                <img
                  className="d-lg-block d-md-none"
                  src="/assets/imgs/feature-3.jpeg"
                  alt="feature"
                />
                <img
                  className="d-lg-none d-md-block d-none"
                  src="/assets/imgs/feature-3-sm.png"
                  alt="feature"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h3>Install Any Pyhton Packages</h3>
                <p>
                  The notebook based platform allows any packages to be
                  installed. Install popular Machine Learning packages such as
                  Sckit-Learn, Tensorflow, Pytorch in the notebook.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <div className="img-container">
                <img
                  className="d-lg-block d-md-none"
                  src="/assets/imgs/feature-4.jpeg"
                  alt="feature"
                />
                <img
                  className="d-lg-none d-md-block d-none"
                  src="/assets/imgs/feature-4-sm.png"
                  alt="feature"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
