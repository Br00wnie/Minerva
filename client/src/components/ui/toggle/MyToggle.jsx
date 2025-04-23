import React from "react";
import styles from "./MyToggle.module.css";

const MyToggle = ({ name, value, onChange, children }) => {
  const renderChildren = React.Children.map(children, (child) => {
    if (child.type === "input") {
      return React.cloneElement(child, {
        type: "radio",
        name: name,
        id: child.props.id,
        checked: child.props.id === value,
        onChange: () => onChange(child.props.id),
        className: styles.input,
      });
    }
    if (child.type === "label") {
      return React.cloneElement(child, {
        htmlFor: child.props.htmlFor,
        className: styles.label,
      });
    }
  });

  return <div className={styles.container}>{renderChildren}</div>;
};

export default MyToggle;
