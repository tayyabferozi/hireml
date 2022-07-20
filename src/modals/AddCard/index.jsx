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

const AddCard = ({ ...rest }) => {
  const [startDate, setStartDate] = useState();

  return (
    <Modal className="card-modal" {...rest}>
      <h4 className="title">Enter Payment Information</h4>
      <p className="text-light-1 mt-10">Your information is secure with us</p>

      <div className="mt-20">
        <Input
          label="Enter Card Number"
          placeholder="XXXX   XXXX   XXXX   XXXX"
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
              <img className="icon" src="/assets/vectors/card.svg" alt="card" />
            </div>
          </div>
          <div className="col-sm-6">
            <Input
              icon={{ src: "/assets/vectors/card.svg", alt: "card" }}
              label="CVC"
              placeholder="***"
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
            Add Card
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCard;
