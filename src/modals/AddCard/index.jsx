import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import GridContainer from "../../components/GridContainer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Select from "../../components/Select/select";
import Option from "../../components/Select/option";

import countryNames, { states } from "../../constants/country-names";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import isEmpty from "../../utils/is-empty";

const initialFormState = {
  email: "",
  card_id: "",
  last_digit: "",
  country: "",
};

const validateCardNumber = (number) => {
  //Check if the number contains only numeric value
  //and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(number)) {
    return false;
  }

  return luhnCheck(number);
};

const luhnCheck = (val) => {
  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return checksum % 10 == 0;
};

const AddCard = ({ onComplete, ...rest }) => {
  const [startDate, setStartDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errState, setErrState] = useState({
    username: "",
    password: "",
  });
  const userState = useSelector((state) => state.user);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  console.log(formState);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrState({});

    if (isEmpty(formState.last_digit)) {
      setErrState({ last_digit: "field required" });
      setIsLoading(false);
      return;
    }

    if (isEmpty(formState.card_id)) {
      setErrState({ card_id: "field required" });
      setIsLoading(false);
      return;
    }

    if (!validateCardNumber(formState.card_id)) {
      setErrState({ card_id: "Please enter a valid card number" });
      setIsLoading(false);
      return;
    }

    console.log(formState);

    axios
      .post(
        // `/cards/add-card-info`
        `/cards/add-card-info?email=${userState.email}&card_id=${formState.card_id}&last_digit=${formState.last_digit}`
      )
      .then((res) => {
        setFormState(initialFormState);
        toast.success("Card added successfully!");
        onComplete();
      })
      .catch((err) => {
        console.log(err.response.data);
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
            if (err?.response?.data?.detail) {
              toast.error(err?.response?.data?.detail);
            }
          }
        } else {
          toast.error("Uh Oh! Something went wrong while adding the card");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal className="card-modal" {...rest}>
      <h4 className="title">Enter Payment Information</h4>
      <p className="text-light-1 mt-10">Your information is secure with us</p>

      <div className="mt-20">
        <form onSubmit={formSubmitHandler} action="">
          <Input
            name="card_id"
            onChange={inputChangeHandler}
            value={formState.card_id}
            label="Enter Card Number"
            placeholder="XXXX   XXXX   XXXX   XXXX"
            errMsg={errState.card_id}
          />
          <GridContainer>
            <div className="col-sm-6">
              {/* <Input
              type="date"
              label="Expiration Date"
              placeholder="XXXX   XXXX   XXXX   XXXX"
            />{" "} */}
              <label htmlFor="">Expiration Date</label>
              <div className="input">
                <DatePicker
                  placeholderText="_ _ / _ _"
                  dateFormat="MM/yy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <img
                  className="icon"
                  src="/assets/vectors/card.svg"
                  alt="card"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <Input
                name="last_digit"
                onChange={inputChangeHandler}
                value={formState.last_digit}
                icon={{ src: "/assets/vectors/card.svg", alt: "card" }}
                label="CVC"
                placeholder="***"
                errMsg={errState.last_digit}
              />
            </div>
          </GridContainer>
          <div className="custom-form-control">
            <label>Billing Information</label>
            <div className="input">
              <GridContainer rowClassName="gy-0">
                <div className="col-12">
                  <input type="text" placeholder="Address" />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc. (optional)"
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <Select
                    name="country"
                    rootClassName="mb-0 country-selector"
                    placeholder="Country"
                    onSelectChange={inputChangeHandler}
                  >
                    {countryNames.map((el, idx) => {
                      return (
                        <Option value={el} key={"state-" + idx}>
                          {el}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-sm-6 col-12">
                  <Select
                    name="state"
                    onSelectChange={inputChangeHandler}
                    rootClassName="mb-0"
                    placeholder="State"
                  >
                    {states[
                      countryNames.findIndex((el) => el === formState.country)
                    ]
                      .split("|")
                      .map((el, idx) => {
                        return (
                          <Option value={el} key={"state-" + idx}>
                            {el}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
                <div className="col-6">
                  <input type="text" placeholder="City" />
                </div>
                {/* <div className="col-sm-4 col-6">
                </div> */}
                <div className="col-6">
                  <input type="text" placeholder="Zip Code" />
                </div>
              </GridContainer>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button xlg primary>
              {isLoading ? <Loader /> : "Add Card"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCard;
