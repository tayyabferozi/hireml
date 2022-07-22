import React, { useEffect, useState } from "react";
import clsx from "clsx";

const Input = ({
  errMsg,
  textarea,
  id,
  inputClassName,
  className,
  labelClassName,
  type = "text",
  label,
  placeholder,
  icon,
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
      setTypeState(type);
    }
  }, [type, setTypeState, showPwd]);

  return (
    <div
      className={clsx("custom-form-control", className, {
        "has-error": errMsg,
      })}
    >
      {label && (
        <label className={clsx(labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input">
        {icon && <img className="icon" src={icon.src} alt={icon.alt} />}
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
        {errMsg && <div className="helper-text error">{errMsg}</div>}
      </div>
    </div>
  );
};

export default Input;
