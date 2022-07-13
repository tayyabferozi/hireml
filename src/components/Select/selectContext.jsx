import { createContext, useContext } from "react";

const SelectContext = createContext({
  selectedOption: "",
  selectedOption2: "",
  changeSelectedOption: (option) => {},
  onChange: () => {},
});

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Error in creating the context");
  }
  return context;
};

export { useSelectContext, SelectContext };
