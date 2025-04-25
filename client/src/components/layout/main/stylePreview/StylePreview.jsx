import React, { useEffect, useRef } from "react";
import { Previewer } from "pagedjs";
import DocumentStore from "../../../../stores/DocumentStore";
import { useStore } from "../../../../incrum/store";
import toast from "../../../../utils/toast";
import useDocumentStyle from "../../../../hooks/useDocumentStyle";
import generateStylizedDocument from "../../../../utils/stylizedDocumentGeneration";
import parse from "html-react-parser";
import { createRoot } from "react-dom/client";

const StylePreview = () => {
  const [documentStore, documentServices] = useStore(DocumentStore.store);
  const documentStyle = useDocumentStyle();
  const previewContainerRef = useRef(null);
  const previewerRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());
  const hiddenDocumentRef = useRef(null);
  useEffect(() => {
    if (!hiddenDocumentRef.current) return;
    const contentNode = parse(documentStore.content || "");
    const rootElement = document.createElement("div");
    rootElement.className = "document-content";

    // НОВЫЙ СПОСОБ ДЛЯ REACT 18+
    const root = createRoot(rootElement);
    root.render(contentNode);

    hiddenDocumentRef.current.innerHTML = "";
    hiddenDocumentRef.current.appendChild(rootElement);

    return () => root.unmount(); // Очистка
  }, [documentStore.content]);

  useEffect(() => {
    const updatePreview = async () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      const previewer = new Previewer();
      previewerRef.current = previewer;
      const previewContainer = previewContainerRef.current;

      if (!previewContainer || !hiddenDocumentRef.current) return;

      try {
        previewContainer.innerHTML = "";
        const sourceContent = generateStylizedDocument(
          hiddenDocumentRef.current.innerHTML,
          documentStyle
        );

        const clonedContent = sourceContent.cloneNode(true);
        previewContainer.appendChild(clonedContent);

        await previewer.preview(clonedContent, [], previewContainer, {
          signal: abortControllerRef.current.signal,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          toast("Во время генерации превью возникла непредвиденная ошибка");
          console.error(error);
        }
      }
    };

    const debounceTimer = setTimeout(updatePreview, 41.67);
    return () => {
      clearTimeout(debounceTimer);
      abortControllerRef.current.abort();
      previewerRef.current = null;
    };
  }, [documentStyle, documentStore.content]);

  return (
    <div>
      <div
        ref={hiddenDocumentRef}
        style={{ display: "none", position: "absolute" }}
      />
      <div ref={previewContainerRef} style={{ position: "relative" }} />
    </div>
  );
};

export default StylePreview;
