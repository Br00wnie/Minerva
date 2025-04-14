import React from "react";
import MyToggle from "../../ui/toggle/MyToggle";
import { useStore, buildStore } from "../../../utils/store";

const StyleEditorHeader = ({ value, onChange }) => {
  return (
    <MyToggle name="style-editor" value={value} onChange={onChange}>
      <input id="config" />
      <label htmlFor="config">Настройка</label>

      <input id="search" />
      <label htmlFor="search">Поиск</label>
    </MyToggle>
  );
};

export default StyleEditorHeader;
