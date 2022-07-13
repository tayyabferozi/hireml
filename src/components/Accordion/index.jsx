import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import $ from "jquery";

import Select from "../Select/select";
import Option from "../Select/option";

const Accordion = ({
  ver2,
  img,
  title,
  className,
  headClassName,
  bodyClassName,
  rightTextBold,
  rightTextLight,
  children,
  withDropdown,
}) => {
  const selectRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = (e) => {
    if (
      $($(e.target).parents(".custom-form-control")[0]).is($(selectRef.current))
    ) {
      return;
    }

    setIsActive((prevState) => !prevState);
  };

  return (
    <div
      className={clsx(
        isActive && "active",
        ver2 && "ver-2",
        "accordion-wrap",
        className
      )}
    >
      <div
        className={clsx("accordion-head", headClassName)}
        onClick={toggleActive}
      >
        <div className="head-left">
          {img && <img src={img} alt={title} title={title} />}
          <h6>{title}</h6>
        </div>
        <div className="head-right d-flex gap-10">
          {rightTextBold && (
            <h6 className="d-flex align-items-center flex-column flex-sm-row">
              {rightTextBold}{" "}
              <span className="fw-400 fs-16 ms-1 fs-575-13">
                {rightTextLight}
              </span>
            </h6>
          )}
          <img
            className="chevron"
            src="/assets/vectors/chevron.svg"
            alt="chevron"
            title="Chevron"
          />
          {withDropdown && (
            <Select label="Filter By:" defaultValue="All" ref={selectRef}>
              <Option value="All">All</Option>
              <Option value="Not All">Not All</Option>
            </Select>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={clsx("accordion-body-wrap")}>
              <div className={clsx("accordion-body", bodyClassName)}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
