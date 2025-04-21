import React from "react";
import StyleSettingsPanel from "./StyleSettingsPanel";
import StyleSearchPanel from "./StyleSearchPanel";

const StyleEditorSidebar = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "config" && <p>Hi</p>}
      {selectedTab === "search" && <StyleSearchPanel />}
    </div>
  );
};

export default StyleEditorSidebar;
