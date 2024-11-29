import React, { useEffect, useRef } from "react";

function Dropdown({ children, className, onClose }) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full bg-white rounded-md min-h-[40px] min-w-[80px] w-fit h-fit max-w-[250px] max-h-[390px] overflow-y-auto z-10 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export default Dropdown;
