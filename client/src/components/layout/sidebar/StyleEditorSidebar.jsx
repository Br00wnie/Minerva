import React from "react";
import StyleSettingsPanel from "./StyleSettingsPanel";
import StyleSearchPanel from "./StyleSearchPanel";

const StyleEditorSidebar = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "settings" && <StyleSettingsPanel />}
      {selectedTab === "search" && <StyleSearchPanel />}
    </div>
  );
};

export default StyleEditorSidebar;
