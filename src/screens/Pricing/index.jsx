import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import axios from "axios";

import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/Loader";
import isEmpty from "../../utils/is-empty";

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plansState, setPlansState] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("/price")
      .then((res) => {
        setPlansState(res.data.price);
      })
      .catch((err) => {
        toast.error("Uh Oh! Something went wrong while fetching the prices");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MainLayout>
      <Section id="pricing" withBottomGrad>
        <h3 className="text-center main-title">
          Choose the plan that’s right for you
        </h3>

        <GridContainer
          className="mt-60 cards"
          rowClassName="main-row flex-xl-row flex-column align-items-center"
        >
          {isLoading ? (
            <Loader lg />
          ) : (
            !isEmpty(plansState) &&
            plansState.map((el, idx) => {
              const {
                price,
                duration,
                price_type,
                number_of_interviews,
                number_of_users,
              } = el;

              let interviewLine = number_of_interviews;
              let usersLine = number_of_users;

              if (!interviewLine.toLowerCase().includes("interview")) {
                interviewLine = interviewLine + " Interviews";
              }

              if (!usersLine.toLowerCase().includes("users")) {
                usersLine = usersLine + " Users";
              }
              return (
                <div key={"card-" + idx} className="col-xl-4">
                  <div className={clsx("card", idx === 1 && "active")}>
                    <div>
                      <div className="title">
                        <span className="price">${price}</span> /{duration}
                        <h4 className="mt-15">{price_type}</h4>
                      </div>

                      <hr className="my-15" />

                      <ul className="features">
                        <li>{interviewLine}</li>
                        <li>{usersLine}</li>
                        {/* {features.map((el, idx) => {
                          return <li key={el + idx}>{el}</li>;
                        })} */}
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
            })
          )}
        </GridContainer>
      </Section>
    </MainLayout>
  );
};

export default Pricing;
