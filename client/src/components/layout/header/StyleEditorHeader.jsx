import React from "react";
import MyToggle from "../../ui/toggle/MyToggle";
import { useTranslation } from "react-i18next";

const StyleEditorHeader = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <MyToggle name="style-editor" value={value} onChange={onChange}>
      <input id="settings" />
      <label htmlFor="settings">{t("buttons.settings.label")}</label>

      <input id="search" />
      <label htmlFor="search">{t("buttons.search.label")}</label>
    </MyToggle>
  );
};

export default StyleEditorHeader;
