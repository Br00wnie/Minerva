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
  const selectOptions = options
    ? options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option
      )
    : [];

  // Обработка для числовых инпутов
  const handleInputChange = (e) => {
    if (type === "number") {
      const numValue = e.target.value === "" ? "" : Number(e.target.value);
      onChange(numValue);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.info}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {options ? (
        <ReactSelect
          onChange={(selectedOption) => onChange(selectedOption.value)}
          value={selectOptions.find((opt) => opt.value === value)}
          id={id}
          classNamePrefix="react-select"
          className={`select ${short ? styles.short : ""}`}
          options={selectOptions}
          {...props}
        />
      ) : (
        <input
          className={`${styles.input} ${short ? styles.short : ""}`}
          id={id}
          type={type}
          value={type === "number" ? value.toString() : value}
          onChange={handleInputChange}
          {...props}
        />
      )}
    </div>
  );
};

export default MyInput;
