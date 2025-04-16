import React, { useState } from "react";
import styleConfig from "../../../json/styleConfig.json";
import MyInput from "../../ui/input/MyInput";
import styles from "./StyleSettings.module.css";

const StyleSettings = () => {
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(
      Object.keys(styleConfig).map((key) => [key, styleConfig[key].default])
    )
  );
  const handleInputValueChange = (key) => (newInputValue) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: newInputValue,
    }));
  };

  return (
    <div className={styles.container}>
      {Object.keys(styleConfig).map((key) => {
        const params = styleConfig[key];
        return (
          <MyInput
            key={key}
            value={inputValues[key]}
            onChange={handleInputValueChange(key)}
            options={params.options}
            label={params.label}
            description={params.description}
            type={params.type}
            min={params.min}
            max={params.max}
            step={params.step}
            title={key}
            short={params.type !== "select" ? true : false}
          />
        );
      })}
    </div>
  );
};

export default StyleSettings;
