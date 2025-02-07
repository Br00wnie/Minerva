import React, { useState } from "react";
import styles from "./MyDropdown.module.css";

const MyDropdown = ({
  label = "label",
  children,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child && child.type === "hr") {
        return <div>{React.cloneElement(child, { className: styles.hr })}</div>;
      }
      return child;
    });
  };

  return (
    <div
      className={`${styles.container} ${className} ${
        React.Children.count(children) > 0 ? styles.dropdown : ""
      }`}
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
      {...props}
    >
      <div className={styles.label}>{label}</div>
      {isOpen && <div className={styles.select}>{renderChildren()}</div>}
    </div>
  );
};

export default MyDropdown;
