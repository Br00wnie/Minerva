import React from "react";
import "./MyInput.css";
import ReactSelect from "react-select";
import styles from "./MyInput.module.css";

const MyInput = ({
  label = "label",
  desc,
  className = "",
  children,
  id,
  options,
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.info}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>

      {options ? (
        <ReactSelect
          id={id}
          classNamePrefix="react-select"
          className="select"
          options={options}
          {...props}
        />
      ) : (
        <input className={styles.input} id={id} {...props} />
      )}
    </div>
  );
};

export default MyInput;
