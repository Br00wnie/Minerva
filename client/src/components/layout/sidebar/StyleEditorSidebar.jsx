import React from "react";
import StyleSettingsPanel from "./StyleSettingsPanel";
import StyleSearchPanel from "./StyleSearchPanel";

const StyleEditorSidebar = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "config" && <StyleSettingsPanel />}
      {selectedTab === "search" && <StyleSearchPanel />}
    </div>
  );
};

export default StyleEditorSidebar;
