import "./ReactSelect.css";
import ReactSelect from "react-select";
import styles from "./MyInput.module.css";

const MyInput = ({
  label = "label",
  description,
  id,
  options,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.form}>
        {options ? (
          <ReactSelect
            onChange={onChange}
            value={value}
            id={id}
            classNamePrefix="react-select"
            className="react-select__container"
            options={options}
          />
        ) : (
          <input
            id={id}
            className={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default MyInput;
