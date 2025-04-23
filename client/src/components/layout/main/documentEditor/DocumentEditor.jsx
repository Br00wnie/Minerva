import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./DocumentEditor.module.css";
import editorConfig from "../../../../json/editorConfig.json";
import DocumentStore from "../../../../stores/DocumentStore";
import { useStore } from "../../../../utils/store";
import "./Quill.css";

const DocumentEditor = () => {
  const [documentStore, documentServices] = useStore(
    DocumentStore.store,
    DocumentStore.services
  );

  return (
    <div className={styles.container}>
      <input
        value={documentStore.name}
        onChange={(e) => documentServices.setName(e.target.value)}
        className={styles.name}
        placeholder="Название документа"
      />
      <div className={styles.editor}>
        <ReactQuill
          theme="snow"
          value={documentStore.content}
          onChange={documentServices.setContent}
          modules={editorConfig.modules}
          formats={editorConfig.formats}
          placeholder="Содержимое документа"
          className="quill"
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
