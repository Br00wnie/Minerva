import React, { useState } from "react";
import styles from "./MyDropdown.module.css";

const MyDropdown = ({ label = "label", children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child && child.type === "hr")
        return <div>{React.cloneElement(child, { className: styles.hr })}</div>;
      return child;
    });
  };

  return (
    <div className={styles.container} onClick={toggleIsOpen} {...props}>
      <div className={styles.label}>{label}</div>
      {isOpen && <div className={styles.select}>{renderChildren()}</div>}
    </div>
  );
};

export default MyDropdown;
