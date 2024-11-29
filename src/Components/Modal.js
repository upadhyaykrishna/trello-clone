import React from "react";

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20"
      onClick={() => onClose && onClose()}
    >
      <div
        className="bg-white rounded-md shadow-lg max-h-[95vh] overflow-y-auto custom-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
