import React from "react";
import styles from "./MyBurger.module.css";

const MyBurger = ({ onClick, className = "", ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.burger} ${className}`}
      {...props}
    >
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
    </div>
  );
};

export default MyBurger;
