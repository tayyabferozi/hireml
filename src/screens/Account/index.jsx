import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Input from "../../components/Input";

import DashboardLayout from "../../layouts/DashboardLayout";
import InterviewBtns from "../../partials/InterviewBtns";

import useModal from "../../hooks/useModal";
import AddCard from "../../modals/AddCard";
import axios from "axios";
// import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import isEmpty from "../../utils/is-empty";
import { toast } from "react-toastify";

// const data = [
//   {
//     card: "/assets/vectors/visa.svg",
//     cardName: "Visa",
//     subTitle: "Visa card ending in 2369",
//     tagText: "Primary",
//   },
//   {
//     card: "/assets/vectors/mastercard.svg",
//     cardName: "MasterCard",
//     subTitle: "MasterCard ending in 2369",
//     tagText: "Primary",
//   },
//   {
//     card: "/assets/vectors/visa.svg",
//     cardName: "Visa",
//     subTitle: "Visa card ending in 2369",
//     tagText: "Primary",
//   },
//   {
//     card: "/assets/vectors/mastercard.svg",
//     cardName: "MasterCard",
//     subTitle: "MasterCard ending in 2369",
//     tagText: "Secondary",
//   },
//   {
//     card: "/assets/vectors/mastercard.svg",
//     cardName: "MasterCard",
//     subTitle: "MasterCard ending in 2369",
//     tagText: "Primary",
//   },
//   {
//     card: "/assets/vectors/mastercard.svg",
//     cardName: "MasterCard",
//     subTitle: "MasterCard ending in 2369",
//     tagText: "Primary",
//   },
//   {
//     card: "/assets/vectors/mastercard.svg",
//     cardName: "MasterCard",
//     subTitle: "MasterCard ending in 2369",
//     tagText: "Primary",
//   },
// ];

const initialFormState = {
  company_name: "",
  email: "",
  name: "",
  phone_number: "",
};

const initialErrorState = {
  email: "",
  phone_number: "",
  company_name: "",
  name: "",
};

const UpcomingInterview = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errState, setErrState] = useState(initialErrorState);
  const [isCardListLoading, setIsCardListLoading] = useState(false);
  const [cardList, setCardList] = useState([]);
  const cardModalUtils = useModal(false);
  const userState = useSelector((state) => state.user);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const addCardCompleteHandler = useCallback(() => {
    setIsCardListLoading(true);

    axios
      .get(`/cards/get-user-cards?email=${userState.email}`)
      .then((res) => {
        setCardList(res.data.cards);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong while fetching cards");
      })
      .finally(() => setIsCardListLoading(false));
  }, [userState]);

  const deleteCardHandler = (id) => {
    setIsCardListLoading(true);

    axios
      .post(`/cards/delete-card-info?email=${userState.email}&card_id=${id}`)
      .then((res) => {
        toast.success("Card deleted successfully");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Uh Oh! Something went wrong while deleting the card");
      })
      .finally(() => {
        addCardCompleteHandler();
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setErrState(initialErrorState);

    if (isEmpty(formState.company_name)) {
      setErrState((prevState) => {
        return { ...prevState, company_name: "The field can not be blank." };
      });

      return;
    }

    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        formState.phone_number
      )
    ) {
      setErrState((prevState) => {
        return {
          ...prevState,
          phone_number: (
            <>
              Invalid Phone number <br /> Valid Formats: (123) 456-7890;
              (123)456-7890; 123-456-7890; 123.456.7890; 1234567890;
              +31636363634; 075-63546725;
            </>
          ),
        };
      });

      return;
    }

    setIsFormLoading(true);

    axios
      .post("/users/edit-user", formState)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.user) {
          setFormState(res.data.user);
        }
        toast.success("Info updated successfully!");
      })
      .catch((err) => {
        console.log(err.response);
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
            if (err?.response?.data?.detail.includes("password")) {
              setErrState({ confirm_password: err?.response?.data?.detail });
            } else {
              setErrState({ email: err?.response?.data?.detail });
            }
          }
        } else {
          toast.error("Uh Oh! Something went wrong updating your info");
        }
      })
      .finally(() => setIsFormLoading(false));
  };

  useEffect(() => {
    setIsFormLoading(true);

    axios
      .get(`/users/{username}?email=${userState.email}`)
      .then((res) => {
        setFormState(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(
        //   "Uh Oh! Something went wrong while fetching your information"
        // );
      })
      .finally(() => setIsFormLoading(false));
  }, [userState]);

  useEffect(() => {
    addCardCompleteHandler();
  }, [addCardCompleteHandler]);

  return (
    <>
      <AddCard onComplete={addCardCompleteHandler} {...cardModalUtils} />
      <DashboardLayout HeaderBtns={InterviewBtns}>
        <form onSubmit={formSubmitHandler} action="">
          <GridContainer>
            <div className="col-xl-5">
              <div className="card-lg">
                <h4 className="title">Edit General Information</h4>

                {isFormLoading ? (
                  <div className="text-center">
                    <Loader lg />
                  </div>
                ) : (
                  <div className="mt-40" action="">
                    <GridContainer>
                      <div className="col-xl-12 col-lg-6">
                        <Input
                          name="name"
                          onChange={inputChangeHandler}
                          value={formState.name}
                          label="Full Name"
                          placeholder="John Doe"
                          type="text"
                          errMsg={errState.name}
                        />
                      </div>
                      <div className="col-xl-12 col-lg-6">
                        <Input
                          name="email"
                          onChange={inputChangeHandler}
                          value={formState.email}
                          label="Email"
                          placeholder="johndoe@gmail.com"
                          type="email"
                          errMsg={errState.email}
                        />
                      </div>
                      <div className="col-xl-12 col-lg-6">
                        <Input
                          name="phone_number"
                          onChange={inputChangeHandler}
                          value={formState.phone_number}
                          label="Phone Number"
                          placeholder="042-214-1214"
                          type="tel"
                          errMsg={errState.phone_number}
                        />
                      </div>
                      <div className="col-xl-12 col-lg-6">
                        <Input
                          name="company_name"
                          onChange={inputChangeHandler}
                          value={formState.company_name}
                          label="Company Name"
                          placeholder="Federal Express"
                          type="text"
                          errMsg={errState.company_name}
                        />
                      </div>
                    </GridContainer>
                  </div>
                )}
              </div>
              <div className="card-lg retain mt-70 mt-767-40 mt-575-30">
                <h4 className="title">Change Password</h4>

                <div className="mt-30 mt-575-10">
                  <div className="fw-600 text-dark-1 fs-1600-16 fs-575-10">
                    Do you want to change your password?{" "}
                    <Link to="/change-password" className="highlight">
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
                    onClick={(e) => {
                      e.preventDefault();
                      cardModalUtils.toggleShow();
                    }}
                  >
                    Add a Card
                  </Button>
                </div>

                {isCardListLoading ? (
                  <div className="text-center">
                    <Loader lg />
                  </div>
                ) : (
                  <div className="mt-50">
                    {cardList.map((el, idx) => {
                      const { card_id, last_digit, tagText = "Primary" } = el;

                      return (
                        <div className="payment-item" key={"item" + idx}>
                          <div className="left d-flex align-items-center gap-4">
                            <img
                              src={"/assets/vectors/mastercard.svg"}
                              alt={"MasterCard"}
                            />
                            <div className="text">
                              <div className="fs-20 fs-1600-18 fs-767-14 fw-600 text-dark-1">
                                MasterCard
                              </div>
                              <div className="text-primary-1 fs-1600-14 fs-767-10">
                                card ending in {last_digit}
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
                              {/* <img
                                src="/assets/vectors/pencil.svg"
                                alt="edit"
                              /> */}
                              <img
                                onClick={() => deleteCardHandler(card_id)}
                                className="c-pointer"
                                src="/assets/vectors/bin.svg"
                                alt="delete"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* 
              <div className="mt-50">
                {data.map((el, idx) => {
                  const { card, cardName, subTitle, tagText } = el;

                  return (
                    <div className="payment-item" key={"item" + idx}>
                      <div className="left d-flex align-items-center gap-4">
                        <img src={card} alt={cardName} />
                        <div className="text">
                          <div className="fs-20 fs-1600-18 fs-767-14 fw-600 text-dark-1">
                            {cardName}
                          </div>
                          <div className="text-primary-1 fs-1600-14 fs-767-10">
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
              </div> */}
              </div>

              <div className="d-flex justify-content-end mt-50">
                <Button primary xlg>
                  Save Changes
                </Button>
              </div>
            </div>
          </GridContainer>
        </form>
      </DashboardLayout>
    </>
  );
};

export default UpcomingInterview;
