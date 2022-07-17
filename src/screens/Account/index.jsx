import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";

import DashboardLayout from "../../layouts/DashboardLayout";
import HeaderBtns from "./HeaderBtns";

const data = [
  {
    card: "/assets/vectors/visa.svg",
    cardName: "Visa",
    subTitle: "Visa card ending in 2369",
    tagText: "Primary",
  },
  {
    card: "/assets/vectors/mastercard.svg",
    cardName: "MasterCard",
    subTitle: "MasterCard ending in 2369",
    tagText: "Primary",
  },
  {
    card: "/assets/vectors/visa.svg",
    cardName: "Visa",
    subTitle: "Visa card ending in 2369",
    tagText: "Primary",
  },
  {
    card: "/assets/vectors/mastercard.svg",
    cardName: "MasterCard",
    subTitle: "MasterCard ending in 2369",
    tagText: "Secondary",
  },
  {
    card: "/assets/vectors/mastercard.svg",
    cardName: "MasterCard",
    subTitle: "MasterCard ending in 2369",
    tagText: "Primary",
  },
  {
    card: "/assets/vectors/mastercard.svg",
    cardName: "MasterCard",
    subTitle: "MasterCard ending in 2369",
    tagText: "Primary",
  },
  {
    card: "/assets/vectors/mastercard.svg",
    cardName: "MasterCard",
    subTitle: "MasterCard ending in 2369",
    tagText: "Primary",
  },
];

const UpcomingInterview = () => {
  return (
    <DashboardLayout HeaderBtns={HeaderBtns}>
      <GridContainer>
        <div className="col-xl-5">
          <div className="card-lg">
            <h4 className="title">Edit General Information</h4>

            <form className="mt-40" action="">
              <GridContainer>
                <div className="col-xl-12 col-lg-6">
                  <Input label="Full Name" placeholder="John Doe" type="text" />
                </div>
                <div className="col-xl-12 col-lg-6">
                  <Input
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    type="email"
                  />
                </div>
                <div className="col-xl-12 col-lg-6">
                  <Input
                    label="Phone Number"
                    placeholder="042-214-1214"
                    type="tel"
                  />
                </div>
                <div className="col-xl-12 col-lg-6">
                  <Input
                    label="Company Name"
                    placeholder="Federal Express"
                    type="text"
                  />
                </div>
              </GridContainer>
            </form>
          </div>
          <div className="card-lg mt-70">
            <h4 className="title">Edit General Information</h4>

            <div className="mt-30">
              <div className="fw-600 text-dark-1">
                Do you want to change your password?{" "}
                <Link to="#0" className="highlight">
                  Click Here
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-7">
          <div className="card-lg">
            <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
              <h4 className="title">Payment Information</h4>
              <Button
                xlg
                cyan
                icon={{ src: "/assets/vectors/add.svg", title: "add" }}
              >
                Add a Card
              </Button>
            </div>

            <div className="mt-50">
              {data.map((el, idx) => {
                const { card, cardName, subTitle, tagText } = el;

                return (
                  <div className="payment-item" key={"item" + idx}>
                    <div className="left d-flex align-items-center gap-4">
                      <img src={card} alt={cardName} />
                      <div className="text">
                        <div className="fs-20 fs-767-14 fw-600 text-dark-1">
                          {cardName}
                        </div>
                        <div className="text-primary-1 fs-767-10">
                          {subTitle}
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <div
                        className={clsx(
                          "tag",
                          tagText === "Primary" ? "blue" : "green"
                        )}
                      >
                        {tagText}
                      </div>

                      <div className="btns">
                        <img src="/assets/vectors/pencil.svg" alt="edit" />
                        <img src="/assets/vectors/bin.svg" alt="delete" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d-flex justify-content-end mt-50">
            <Button primary xlg>
              Save Changes
            </Button>
          </div>
        </div>
      </GridContainer>
    </DashboardLayout>
  );
};

export default UpcomingInterview;
