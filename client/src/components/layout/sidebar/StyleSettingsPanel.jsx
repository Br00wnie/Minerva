import React, { useState } from "react";
import styleSettings from "../../../json/styleSettings.json";
import defaultStyle from "../../../json/defaultStyle.json";
import MyInput from "../../ui/input/MyInput";
import styles from "./StyleSettings.module.css";

const StyleSettingsPanel = () => {
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(
      Object.keys(defaultStyle.content).map((key) => [
        key,
        defaultStyle.content[key],
      ])
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
      {Object.keys(styleSettings).map((key) => {
        const params = styleSettings[key];
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

export default StyleSettingsPanel;
