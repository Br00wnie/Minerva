import React, { useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Slate, Editable } from "slate-react";
import MyLeaf from "../../../ui/leaf/MyLeaf.jsx";
import styles from "./DocumentEditor.module.css";
import useDocument from "../../../../hooks/useDocument.js";
import setUpEditor from "../../../../utils/editorSetUp.js";

const DocumentEditor = observer(() => {
  const { documentName, setDocumentName, documentContent, setDocumentContent } =
    useDocument();
  const renderLeaf = useCallback((props) => <MyLeaf {...props} />, []);
  const editor = useMemo(() => setUpEditor(), []);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Название документа"
        className={styles.name}
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      />
      <Slate
        editor={editor}
        initialValue={documentContent}
        onChange={setDocumentContent}
      >
        <Editable
          renderLeaf={renderLeaf}
          placeholder="Содержимое документа"
          className={styles.editor}
        />
      </Slate>
    </div>
  );
});

export default DocumentEditor;
