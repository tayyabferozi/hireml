import React from "react";
import Section from "../../../components/Section";

const Features = () => {
  return (
    <Section id="landing-features">
      <div className="page-container px-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
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
            <div className="col-lg-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <img src="/assets/imgs/feature-1.png" alt="feature" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
              <div>
                <h3>Notebook Based Interface</h3>
                <p>
                  Use the Jupyter notebook to assess candidate coding, data
                  wrangling and machine learning skills.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <img src="/assets/imgs/feature-2.png" alt="feature" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
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
            <div className="col-lg-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <img src="/assets/imgs/feature-3.png" alt="feature" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
              <div>
                <h3>Install Any Pyhton Packages</h3>
                <p>
                  The notebook based platform allows any packages to be
                  installed. Install popular Machine Learning packages such as
                  Sckit-Learn, Tensorflow, Pytorch in the notebook.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/assets/vectors/dots-2.svg"
                alt="dots"
                className="dots-img"
              />
              <img src="/assets/imgs/feature-4.png" alt="feature" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
