import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import GridContainer from "../../components/GridContainer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Select from "../../components/Select/select";
import Option from "../../components/Select/option";

import countryNames from "../../constants/country-names";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import isEmpty from "../../utils/is-empty";

const initialFormState = {
  email: "",
  card_id: "",
  last_digit: "",
};

const AddCard = ({ ...rest }) => {
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

    axios
      .post(
        // `/cards/add-card-info`
        `/cards/add-card-info?email=${userState.email}&card_id=${userState.card_id}&last_digit=${formState.last_digit}`
      )
      .then((res) => {
        console.log(res.data);
        setFormState(initialFormState);
        toast.success("Card added successfully!");
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
          toast.error("Uh Oh! Something went wrong.");
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
                <div className="col-sm-12 col-6">
                  <input type="text" placeholder="City" />
                </div>
                <div className="col-sm-4 col-6">
                  <Select rootClassName="mb-0" placeholder="Country">
                    {countryNames.map((el, idx) => {
                      return <Option key={"country-" + idx}>{el}</Option>;
                    })}
                  </Select>
                </div>
                <div className="col-sm-4 col-6">
                  <Select rootClassName="mb-0" placeholder="State">
                    {/* {countryNames.map((el, idx) => {
                    return <Option key={"state-" + idx}>{el}</Option>;
                  })} */}
                  </Select>
                </div>
                <div className="col-sm-4 col-6">
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
