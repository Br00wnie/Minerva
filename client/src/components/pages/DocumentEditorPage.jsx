import React from "react";
import DocumentEditorHeader from "../headers/DocumentEditorHeader.jsx";
import Editor from "../editor/Editor.jsx";

const DocumentEditor = () => {
  return (
    <>
      <div id="sidebar">
        <div id="header">
          <DocumentEditorHeader />
        </div>
        <div id="document-structure"></div>
      </div>
      <div id="body">{/* <Editor /> */}</div>
    </>
  );
};

export default DocumentEditor;
