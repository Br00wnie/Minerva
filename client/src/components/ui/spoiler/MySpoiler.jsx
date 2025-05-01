import { useState } from "react";
import styles from "./MySpoiler.module.css";

const MySpoiler = ({ label = "label", children, open }) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}></span>
        <span className={styles.label}>{label}</span>{" "}
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default MySpoiler;
