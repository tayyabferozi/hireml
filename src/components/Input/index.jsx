import React, { useEffect, useState } from "react";
import clsx from "clsx";

const Input = ({
  textarea,
  id,
  inputClassName,
  className,
  labelClassName,
  type = "text",
  label,
  placeholder,
  ...rest
}) => {
  const [showPwd, setShowPwd] = useState(false);
  const [typeState, setTypeState] = useState();

  useEffect(() => {
    setTypeState(type);
  }, [type]);

  useEffect(() => {
    if (type === "password") {
      if (showPwd) {
        setTypeState("text");
      } else {
        setTypeState("password");
      }
    } else {
      setTypeState("text");
    }
  }, [type, setTypeState, showPwd]);

  return (
    <div className={clsx("custom-form-control", className)}>
      {label && (
        <label className={clsx(labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input">
        {type === "password" && (
          <img
            onClick={() => setShowPwd((prevState) => !prevState)}
            className="icon"
            src="/assets/vectors/pwd-show.svg"
            alt="pwd-show"
            title="Show password"
          />
        )}
        {textarea ? (
          <textarea className={clsx(inputClassName)} {...rest}></textarea>
        ) : (
          <input
            className={clsx(inputClassName)}
            id={id}
            type={typeState}
            placeholder={placeholder}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
