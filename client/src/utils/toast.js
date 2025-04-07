let toastHandler = null;

export const setToastHandler = (handler) => {
  toastHandler = handler;
};

export const toast = (message) => {
  if (typeof toastHandler === "function") {
    toastHandler(message);
  } else {
    console.warn("ToastManager не инициализирован!");
  }
};

export default toast;
