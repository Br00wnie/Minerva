import React, { useEffect } from "react";
import styles from "./MyToast.module.css";

const MyToast = ({ message, removeToastFunction }) => {
  useEffect(() => {
    const lifeTimer = setTimeout(removeToastFunction, 3000);
    return () => clearTimeout(lifeTimer);
  }, []);

  return (
    <div className={styles.container}>
      <p>{message}</p>
    </div>
  );
};

export default MyToast;
