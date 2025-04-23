import React from "react";
import AppLayout from "../layout/AppLayout.jsx";
import StyleEditorHeader from "../layout/header/StyleEditorHeader.jsx";
import StylePreview from "../layout/main/stylePreview/StylePreview.jsx";
import StyleEditorSidebar from "../layout/sidebar/StyleEditorSidebar.jsx";
import { useState } from "react";

const StyleEditorPage = () => {
  const [selectedTab, setSelectedTab] = useState("settings");

  return (
    <AppLayout
      header={
        <StyleEditorHeader value={selectedTab} onChange={setSelectedTab} />
      }
      sidebar={<StyleEditorSidebar selectedTab={selectedTab} />}
    >
      <StylePreview />
    </AppLayout>
  );
};

export default StyleEditorPage;
