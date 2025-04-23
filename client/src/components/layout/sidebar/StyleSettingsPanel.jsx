import React from "react";
import styleMeta from "../../../json/styleMeta.json";
import MyInput from "../../ui/input/MyInput";
import { useStore } from "../../../utils/store";
import StyleStore from "../../../stores/StyleStore";

const StyleSettingsPanel = () => {
  const [styleStore, styleServices] = useStore(
    StyleStore.store,
    StyleStore.services
  );
  const handleSettingsChange = (key, type) => (newValue) => {
    newValue = type === "select" ? newValue : newValue.target.value;
    const newStyleContent = { ...styleStore.content };
    newStyleContent[key] = newValue;
    styleServices.setContent(newStyleContent);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {Object.keys(styleMeta).map((key) => {
        const params = styleMeta[key];
        const selectedOption =
          params.type === "select"
            ? params.options.find(
                (option) => option.value === styleStore.content[key]
              )
            : null;
        return (
          <MyInput
            key={key}
            value={
              selectedOption
                ? {
                    label: selectedOption.label,
                    value: styleStore.content[key],
                  }
                : styleStore.content[key]
            }
            onChange={handleSettingsChange(key, params.type)}
            options={params.options}
            label={params.label}
            description={params.description}
            type={params.type}
            min={params.min}
            max={params.max}
            step={params.step}
          />
        );
      })}
    </div>
  );
};

export default StyleSettingsPanel;
