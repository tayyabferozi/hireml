import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import $ from "jquery";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { SelectContext } from "./selectContext";
import Input from "../Input";
import isEmpty from "../../utils/is-empty";

const Select = React.forwardRef(
  (
    {
      id,
      withSearch,
      label,
      rootClassName,
      children,
      defaultValue,
      defaultValue2,
      placeholder,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const [selectedOption2, setSelectedOption2] = useState(defaultValue2 || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchState, setSearchState] = useState("");

    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || "Choose an option";
    const selectContainerRef = useRef(null);
    const selectElRef = useRef(null);
    const listRef = useRef();

    const clickOutsideHandler = () => setShowDropdown(false);

    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const updateSelectedOption = (option, option2 = "") => {
      setSelectedOption(option);
      setSelectedOption2(option2);
      setShowDropdown(false);
    };

    const onInputChange = (val) => {
      if (onChange) {
        onChange();
      }
      selectElRef.current.value = val;
    };

    useEffect(() => {
      const $list = $(listRef.current);

      const $listMain = $list.children("li");

      $listMain.each((idx, el) => {
        const $el = $(el);
        const text = $el.text();

        if (!text.toLowerCase().includes(searchState.toLocaleLowerCase())) {
          $(el).css("display", "none");
        } else {
          $(el).css("display", "block");
        }
      });
    }, [searchState, listRef]);

    return (
      <SelectContext.Provider
        value={{
          selectedOption,
          changeSelectedOption: updateSelectedOption,
          onChange: onInputChange,
        }}
      >
        <select className="d-none" ref={selectElRef} id={id} {...rest}>
          <option value="">Choose</option>
          {!isEmpty(children) &&
            children.length > 0 &&
            children.map((el, idx) => {
              return (
                <option
                  value={el.props.optVal}
                  key={"select-" + rest.name + el.value + idx}
                >
                  {el.props.children}
                </option>
              );
            })}
        </select>
        <div ref={ref} className={clsx(rootClassName, "custom-form-control")}>
          {label && <label htmlFor={id}>{label}</label>}
          <div className="custom-select-container" ref={selectContainerRef}>
            <div
              className={clsx(
                "selected-text",
                showDropdown && "active",
                selectedOption.length > 0 && "added"
              )}
              onClick={showDropdownHandler}
            >
              {selectedOption.length > 0 ? (
                selectedOption2.length > 0 ? (
                  <div className="dual-valued">
                    <div>{selectedOption}</div>
                    <div>{selectedOption2}</div>
                  </div>
                ) : (
                  <>{selectedOption}</>
                )
              ) : (
                selectPlaceholder
              )}
            </div>
            <ul
              className={
                showDropdown
                  ? "select-options show-dropdown-options"
                  : "select-options hide-dropdown-options"
              }
              ref={listRef}
            >
              {withSearch && (
                <Input
                  className="mb-0"
                  type="text"
                  onChange={(e) => setSearchState(e.target.value)}
                  value={searchState}
                  placeholder="Search"
                />
              )}
              {children}
            </ul>
          </div>
        </div>
      </SelectContext.Provider>
    );
  }
);

export default Select;
