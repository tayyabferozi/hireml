import { useEffect, useState } from "react";

const useModal = (isActive) => {
  const [isModalActive, setIsModalActive] = useState();

  const toggleModalActive = (toSet) => {
    if (toSet === "open") {
      setIsModalActive(() => true);
    } else if (toSet === "close") {
      setIsModalActive(() => false);
    } else {
      setIsModalActive((prevState) => !prevState);
    }
  };

  useEffect(() => {
    setIsModalActive(!!isActive);
  }, [isActive]);

  return { show: isModalActive, toggleShow: toggleModalActive };
};

export default useModal;
