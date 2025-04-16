import React from "react";
import StyleSettings from "./StyleSettings";
import StyleSearchPanel from "./StyleSearchPanel";

const StyleEditorSidebar = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "config" && <StyleSettings />}
      {selectedTab === "search" && <StyleSearchPanel />}
    </div>
  );
};

export default StyleEditorSidebar;
