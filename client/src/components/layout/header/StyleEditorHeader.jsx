import React, { useContext } from "react";
import { Context } from "../../../index.jsx";
import MyDropdown from "../ui/dropdown/MyDropdown.jsx";

const StyleEditorHeader = () => {
  const { modal } = useContext(Context);

  return (
    <>
      <MyDropdown label="Настройки" />
      <MyDropdown label="Поиск" />
    </>
  );
};

export default StyleEditorHeader;
