import { useEffect, useRef } from "react";
import { Previewer } from "pagedjs";
import DocumentStore from "@stores/DocumentStore";
import { useStore } from "@incrum/store";
import useDocumentStyle from "@hooks/useDocumentStyle";
import generateStylizedDocument from "@utils/stylizedDocumentGeneration";
import "./PagedJS.css";

const StylePreview = () => {
  const [documentStore] = useStore(DocumentStore.store);
  const documentStyle = useDocumentStyle();
  const previewContainerRef = useRef(null);
  const previewerRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());
  useEffect(() => {
    const updatePreview = async () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      const previewer = new Previewer();
      previewerRef.current = previewer;
      const previewContainer = previewContainerRef.current;
      if (!previewContainer) return;
      try {
        previewContainer.innerHTML = "";
        const stylizedDocument = generateStylizedDocument(
          documentStore.content,
          documentStyle
        );
        await previewer.preview(stylizedDocument, [], previewContainer, {
          signal: abortControllerRef.current.signal,
        });
      } catch (error) {
        console.error(error);
      }
    };
    const debounceTimer = setTimeout(updatePreview, 100);
    return () => {
      clearTimeout(debounceTimer);
      abortControllerRef.current.abort();
      previewerRef.current = null;
    };
  }, [documentStyle, documentStore.content]);

  return (
    <div
      className="style-preview"
      ref={previewContainerRef}
      style={{ cursor: "default" }}
    ></div>
  );
};

export default StylePreview;
