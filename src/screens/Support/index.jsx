import React from "react";
import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";
import Section from "../../components/Section";

import MainLayout from "../../layouts/MainLayout";

const Support = () => {
  return (
    <MainLayout>
      <Section id="support" fancy withBottomGrad>
        <div className="title">
          <h2>Contact Us</h2>
          <div className="fs-20 fs-1600-14 fs-575-10 mt-15">
            information@info.com <br />
            1901 Hardsville Plaza Shilo, Hawaii 12412
          </div>
        </div>

        <div className="form-wrap mt-50">
          <form action="">
            <GridContainer>
              <div className="col-md-6">
                <Input label="First Name" />
              </div>
              <div className="col-md-6">
                <Input label="Last Name" />
              </div>
              <div className="col-md-6">
                <Input label="Email" />
              </div>
              <div className="col-md-6">
                <Input label="Phone" />
              </div>
              <div className="col-12">
                <Input rows={8} textarea label="Your message*" />
              </div>
              <div className="col-12">
                <Button sm primary>
                  Send Message
                </Button>
              </div>
            </GridContainer>
          </form>
        </div>
      </Section>
    </MainLayout>
  );
};

export default Support;
