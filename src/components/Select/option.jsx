import React from "react";
import { useSelectContext } from "./selectContext";

const Option = ({ children, value, value2, optVal }) => {
  const { changeSelectedOption, onChange } = useSelectContext();

  return (
    <li
      className="select-option"
      onClick={() => {
        changeSelectedOption(value, value2);
        onChange(optVal);
      }}
    >
      {children}
    </li>
  );
};

export default Option;
