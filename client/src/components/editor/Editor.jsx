import Prism from "prismjs"; // Не удалять
import "prismjs/components/prism-markdown";
import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useContext,
  useState,
} from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import Leaf from "./Leaf";
import styles from "./Editor.module.css";
import { logAction } from "../../utils/logging";
import { Context } from "../../../index.jsx";
import initialDocument from "./initialDocument.js";
import DocumentService from "../../services/DocumentService.js";
import { write } from "../../utils/storageManagement.js";
import { observer } from "mobx-react-lite";
import { read } from "../../utils/storageManagement.js";

const Editor = observer(() => {
  const { DocumentStore } = useContext(Context);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const documentData = read("document") ? JSON.parse(read("document")) : null;
  const [name, setName] = useState(
    documentData ? documentData.name : initialDocument.name
  );
  const [content, setContent] = useState(
    documentData ? JSON.parse(documentData.content) : initialDocument.content
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorKey, setEditorKey] = useState(0);
  const saveDocument = () => {
    const document = JSON.stringify({
      name: name,
      content: JSON.stringify(content),
    });
    write("document", document);
    // logAction("Автосохранение документа в Local Storage", document);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveDocument();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [name, content]);
  useEffect(() => {
    if (DocumentStore.getDocument()) {
      setName(DocumentStore.getDocument().name);
      setContent(DocumentStore.getDocument().content);
      setEditorKey((prevKey) => prevKey + 1);
    }
  }, [DocumentStore.document]);

  return (
    <Slate
      key={editorKey}
      editor={editor}
      initialValue={content}
      onChange={() => {
        setContent(editor.children);
      }}
    >
      <input
        id="documentName"
        type="text"
        placeholder="Название документа"
        className={styles.name}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Editable
        renderLeaf={renderLeaf}
        placeholder="Содержимое документа"
        className={styles.editor}
      />
    </Slate>
  );
});

export default Editor;
