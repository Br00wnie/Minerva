import React, { useEffect } from "react";
import styles from "./MyToast.module.css";

const MyToast = ({ message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className={styles.container}>
      <p>{message}</p>
    </div>
  );
};

export default MyToast;
