import React from "react";
import AppLayout from "../layout/AppLayout.jsx";
import DocumentEditorHeader from "../layout/header/DocumentEditorHeader.jsx";
import DocumentEditor from "../layout/main/documentEditor/DocumentEditor.jsx";

const DocumentEditorPage = () => {
  return (
    <AppLayout header={<DocumentEditorHeader />}>
      <DocumentEditor />
    </AppLayout>
  );
};

export default DocumentEditorPage;
