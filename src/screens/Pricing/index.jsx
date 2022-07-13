import React from "react";
import clsx from "clsx";

import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";

const plansData = [
  {
    price: "$5",
    per: "interview",
    plan: "Pay as you go",
    features: ["$5 per interviews", "3 Users"],
  },
  {
    active: true,
    price: "$50",
    per: "month",
    plan: "Premium",
    features: ["50 Interviews", "10 Users"],
  },
  {
    price: "$150",
    per: "month",
    plan: "Enterprise",
    features: ["Unlimited Users", "Unlimited Interviews"],
  },
];

const Pricing = () => {
  return (
    <MainLayout>
      <Section id="pricing" withBottomGrad>
        <h3 className="text-center">Choose the plan that’s right for you</h3>

        <GridContainer className="mt-60 cards" rowClassName="main-row">
          {plansData.map((el, idx) => {
            const { active, price, per, plan, features } = el;

            return (
              <div key={"card-" + idx} className="col-lg-4">
                <div className={clsx("card", { active })}>
                  <div>
                    <div className="title">
                      <span className="price">{price}</span> /{per}
                      <h4 className="mt-15">{plan}</h4>
                    </div>

                    <hr className="my-15" />

                    <ul className="features">
                      {features.map((el, idx) => {
                        return <li key={el + idx}>{el}</li>;
                      })}
                    </ul>
                  </div>

                  <Button
                    className="rev justify-content-between"
                    tranparent
                    icon={{
                      src: "/assets/vectors/arrow-right.svg",
                      alt: "arrow",
                    }}
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            );
          })}
        </GridContainer>
      </Section>
    </MainLayout>
  );
};

export default Pricing;
