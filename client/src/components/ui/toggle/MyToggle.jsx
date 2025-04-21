import React from "react";
import styles from "./MyToggle.module.css";

const MyToggle = ({ className = "", name, value, onChange, children }) => {
  const renderChildren = React.Children.map(children, (child) => {
    if (child.type === "input") {
      return React.cloneElement(child, {
        type: "radio",
        name: name,
        id: child.props.id,
        checked: child.props.id === value,
        onChange: () => onChange(child.props.id),
        className: `${styles.input} ${child.props.className || ""}`.trim(),
      });
    }
    if (child.type === "label") {
      return React.cloneElement(child, {
        htmlFor: child.props.htmlFor,
        className: `${styles.label} ${child.props.className || ""}`.trim(),
      });
    }
  });

  return (
    <form className={`${styles.container} ${className}`}>{renderChildren}</form>
  );
};

export default MyToggle;
