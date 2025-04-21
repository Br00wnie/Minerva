import React from "react";
import "./MyInput.css";
import ReactSelect from "react-select";
import styles from "./MyInput.module.css";

const MyInput = ({
  label = "label",
  description,
  className = "",
  id,
  options,
  type,
  value,
  onChange,
  short,
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.info}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {options ? (
        <ReactSelect
          onChange={onChange}
          value={value}
          id={id}
          classNamePrefix="react-select"
          className={`select ${short ? styles.short : ""}`}
          options={options}
          {...props}
        />
      ) : (
        <input
          className={`${styles.input} ${short ? styles.short : ""}`}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      )}
    </div>
  );
};

export default MyInput;
