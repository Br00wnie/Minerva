import { useState, useEffect, useCallback } from "react";
import Storage from "../utils/storageManagement.js";
import defaultDocument from "../json/defaultDocument.json";

const isDocumentContentValid = (content) => {
  return Array.isArray(content) && content.length > 0;
};

const useDocument = () => {
  const [documentName, setDocumentName] = useState(() => {
    return Storage.read("documentName") || defaultDocument.name;
  });
  const [documentContent, setDocumentContent] = useState(() => {
    let content = Storage.read("documentContent");
    if (!content) return defaultDocument.content;
    content = JSON.parse(content);
    return isDocumentContentValid(content) ? content : defaultDocument.content;
  });
  const [isSaving, setIsSaving] = useState(false);
  const saveDocument = useCallback(() => {
    Storage.write("documentName", documentName);
    Storage.write("documentContent", documentContent);
    setIsSaving(false);
  }, [documentName, documentContent]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSaving) {
        setIsSaving(true);
        saveDocument();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [documentName, documentContent, saveDocument, isSaving]);
  return { documentName, setDocumentName, documentContent, setDocumentContent };
};

export default useDocument;
