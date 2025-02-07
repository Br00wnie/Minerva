import React from "react";
import styles from "./MyButton.module.css";

const MyButton = ({
  type = "button",
  className = "",
  label = "label",
  ...props
}) => {
  return (
    <button type={type} className={`${styles.button} ${className}`} {...props}>
      {label}
    </button>
  );
};

export default MyButton;
