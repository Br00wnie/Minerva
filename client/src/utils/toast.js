let displayToastFunction = null;

export const setDisplayToastFunction = (f) => {
  displayToastFunction = f;
};

export const toast = (message) => {
  if (typeof displayToastFunction === "function") {
    displayToastFunction(message);
  } else {
    console.warn("ToastManager не инициализирован");
  }
};

export default toast;
