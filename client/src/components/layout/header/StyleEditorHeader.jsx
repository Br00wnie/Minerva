import React from "react";
import MyDropdown from "../ui/dropdown/MyDropdown.jsx";

const StyleEditorHeader = () => {
  return (
    <>
      <MyDropdown label="Настройки" />
      <MyDropdown label="Поиск" />
    </>
  );
};

export default StyleEditorHeader;
