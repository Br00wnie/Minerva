import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MyToast from "../components/ui/toast/MyToast";
import { PORTAL_ID } from "../consts";
import { setToastHandler } from "../utils/toast";

export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);
  const displayToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    setToastHandler(displayToast);
  }, []);
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

export default ToastManager;
