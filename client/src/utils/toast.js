let displayToastFunction = null;

export const setDisplayToastFunction = (f) => {
  displayToastFunction = f;
};

export const toast = (message) => {
  if (!message) return;
  if (typeof displayToastFunction === "function") {
    displayToastFunction(message);
  } else {
    console.error("ToastManager is not initialized");
  }
};

export default toast;
