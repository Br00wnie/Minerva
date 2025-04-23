import React from "react";
import MyToggle from "../../ui/toggle/MyToggle";

const StyleEditorHeader = ({ value, onChange }) => {
  return (
    <MyToggle name="style-editor" value={value} onChange={onChange}>
      <input id="settings" />
      <label htmlFor="settings">Настройка</label>

      <input id="search" />
      <label htmlFor="search">Поиск</label>
    </MyToggle>
  );
};

export default StyleEditorHeader;
