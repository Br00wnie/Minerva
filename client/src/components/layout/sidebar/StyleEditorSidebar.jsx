import React from "react";

const StyleEditorSidebar = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "config" && <ConfigSettings />}
      {selectedTab === "search" && <SearchPanel />}
    </div>
  );
};

// Пример компонентов для вкладок
const ConfigSettings = () => <div>Настройки конфигурации...</div>;
const SearchPanel = () => <div>Панель поиска...</div>;

export default StyleEditorSidebar;
