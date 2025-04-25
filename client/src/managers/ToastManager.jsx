import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MyToast from "../components/ui/toast/MyToast";
import { PORTAL_ID } from "../consts";
import { setDisplayToastFunction } from "../utils/toast";

const ToastManager = () => {
  const [toasts, updateToasts] = useState([]);
  const displayToast = (message) => {
    const id = Date.now();
    updateToasts((prev) => [...prev, { id, message }]);
  };
  const removeToast = (id) => {
    updateToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    setDisplayToastFunction(displayToast);
  }, []);

  return (
    <>
      {toasts.map(({ id, message }) =>
        ReactDOM.createPortal(
          <MyToast
            key={id}
            message={message}
            removeToastFunction={() => removeToast(id)}
          />,
          document.getElementById(PORTAL_ID)
        )
      )}
    </>
  );
};

export default ToastManager;
