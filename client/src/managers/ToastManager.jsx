import React, { useState } from "react";
import ReactDOM from "react-dom";
import MyToast from "./MyToast";
import { PORTAL_ID } from "../../../consts";

export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const displayToast = (message) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);
  };
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {toasts.map(({ id, message }) =>
        ReactDOM.createPortal(
          <MyToast
            key={id}
            message={message}
            onRemove={() => removeToast(id)}
          />,
          document.getElementById(PORTAL_ID)
        )
      )}
    </>
  );
};

export const toast = (message) => {
  if (typeof displayToast === "function") {
    displayToast(message);
  } else {
    console.warn("ToastManager не инициализирован!");
  }
};
