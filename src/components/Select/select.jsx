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
      onSelectChange,
      errMsg,
      ...rest
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const [selectedOption2, setSelectedOption2] = useState(defaultValue2 || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [keyPressState, setKeyPressState] = useState({ key: "", times: 0 });

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
      if (selectElRef) {
        const input = selectElRef.current;
        const descriptor = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(input),
          "value"
        );

        Object.defineProperty(input, "value", {
          configurable: true,
          set: function (t) {
            let anotherThis = { ...this };
            anotherThis.name = rest.name;
            anotherThis.value = arguments[0];
            if (rest.name !== "undefined" && arguments[0] !== undefined) {
              onSelectChange({ target: anotherThis });
            }
            return descriptor.set.apply(this, arguments);
          },
          get: function () {
            return descriptor.get.apply(this);
          },
        });
      }
      selectElRef.current.value = val;
    };

    useEffect(() => {
      setSelectedOption(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
      selectElRef.current.value = selectedOption;
    }, [selectedOption, selectElRef]);

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

    useEffect(() => {
      if (
        typeof listRef.current === "object" &&
        Object.keys(listRef).length !== 0
      ) {
        const ev = document.addEventListener("keypress", function (e) {
          // console.log(listRef.current);
          let offset = 0;
          let elIdx = 0;

          listRef.current.childNodes.forEach((el) => {
            if (typeof el.innerHTML === "string")
              if (el.innerHTML.trim().toLowerCase().startsWith(e.key)) {
                // if (!offset) {
                //   offset = el.offsetTop;
                // }
                // console.log(elIdx, keyPressState.times);
                if (elIdx === keyPressState.times) {
                  offset = el.offsetTop;
                }

                elIdx += 1;
              }
          });
          listRef.current.scrollTo(0, offset);
          setKeyPressState((prevState) => {
            let newTimes = 0;
            if (prevState.key === e.key) {
              // console.log(prevState.key, e.key);
              newTimes = prevState.times + 1;
            }

            return { key: e.key, times: newTimes };
          });
        });

        return document.removeEventListener("keypress", ev);
      }
    }, []);

    // console.log(keyPressState.times);
    useEffect(() => {
      setKeyPressState({ key: "", times: 0 });
    }, [showDropdown]);

    return (
      <SelectContext.Provider
        value={{
          selectedOption,
          changeSelectedOption: updateSelectedOption,
          onChange: onInputChange,
        }}
      >
        <select
          className="d-none my-own-hidden-select"
          ref={selectElRef}
          id={id}
          {...rest}
          onChange={onSelectChange}
        >
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
        <div
          ref={ref}
          className={clsx(rootClassName, "custom-form-control", {
            "has-error": errMsg,
          })}
        >
          {label && <label htmlFor={id}>{label}</label>}
          <div className="custom-select-container" ref={selectContainerRef}>
            <div
              className={clsx(
                "selected-text",
                showDropdown && "active",
                !isEmpty(selectedOption) && "added"
              )}
              onClick={showDropdownHandler}
            >
              {!isEmpty(selectedOption) ? (
                !isEmpty(selectedOption2) > 0 ? (
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
              className={clsx(
                showDropdown
                  ? "select-options show-dropdown-options"
                  : "select-options hide-dropdown-options",
                { "with-search": withSearch }
              )}
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
          {errMsg && <div className="helper-text error">{errMsg}</div>}
        </div>
      </SelectContext.Provider>
    );
  }
);

export default Select;
