import React from "react";
import styles from "./MyToggle.module.css";

const MyToggle = ({
  className = "",
  name,
  value, // Текущее выбранное значение
  onChange, // Обработчик изменений
  children,
}) => {
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

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
        htmlFor: child.props.htmlFor || child.props.for,
        className: `${styles.label} ${child.props.className || ""}`.trim(),
      });
    }

    return child;
  });

  return (
    <form className={`${styles.container} ${className}`}>
      {processedChildren}
    </form>
  );
};

export default MyToggle;
