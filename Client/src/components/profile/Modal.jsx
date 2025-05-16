import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{content.title}</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        <div className="mt-4">{content.body}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
