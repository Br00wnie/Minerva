import React from "react";
import styleMeta from "../../../json/styleMeta.json";
import MyInput from "../../ui/input/MyInput";
import { useStore } from "../../../utils/store";
import StyleStore from "../../../stores/StyleStore";
import MySpoiler from "../../ui/spoiler/MySpoiler";

const StyleSettingsPanel = () => {
  const [styleStore, styleServices] = useStore(
    StyleStore.store,
    StyleStore.services
  );
  const handleSettingsChange = (key, type) => (newValue) => {
    newValue = type === "select" ? newValue.value : newValue.target.value;
    newValue = type === "number" ? Number(newValue) : newValue;
    const newStyleContent = { ...styleStore.content };
    newStyleContent[key] = newValue;
    styleServices.setContent(newStyleContent);
  };
  const groups = Object.keys(styleMeta).reduce((acc, key) => {
    const groupName = styleMeta[key].group;
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({ key, ...styleMeta[key] });
    return acc;
  }, {});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      {Object.entries(groups).map(([groupName, elements]) => (
        <MySpoiler key={groupName} label={groupName} open={true}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {elements.map(({ key, ...params }) => {
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
        </MySpoiler>
      ))}
    </div>
  );
};

export default StyleSettingsPanel;
