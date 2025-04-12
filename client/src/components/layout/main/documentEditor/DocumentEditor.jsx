import React from "react";
import { observer } from "mobx-react-lite";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./DocumentEditor.module.css";
import useDocument from "../../../../hooks/useDocument";
import editorConfig from "../../../../json/editorConfig.json";
import DocumentStore from "../../../../stores/DocumentStore";

const DocumentEditor = observer(() => {
  // const { name, setName, content, setContent } = useDocument();

  return (
    <div className={styles.container}>
      <input
        value={DocumentStore.name}
        onChange={(e) => DocumentStore.setName(e.target.value)}
        className={styles.name}
        placeholder="Название документа"
      />
      <div className={styles.editor}>
        <ReactQuill
          theme="snow"
          value={DocumentStore.content}
          onChange={DocumentStore.setContent}
          modules={editorConfig.modules}
          formats={editorConfig.formats}
          placeholder="Содержимое документа"
          className={styles.quill}
        />
      </div>
    </div>
  );
});

export default DocumentEditor;
