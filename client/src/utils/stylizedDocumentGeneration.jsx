// utils/stylizedDocumentGeneration.js
export default function generateStylizedDocument(content, styles) {
  const container = document.createElement("div");
  container.style.display = "none";
  container.style.position = "absolute";

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "document-content";

  // Используем временный контейнер для корректного парсинга HTML
  const tempParser = new DOMParser();
  const parsedContent = tempParser.parseFromString(
    `<div>${content}</div>`,
    "text/html"
  ).body.firstChild;

  contentWrapper.append(...parsedContent.childNodes);

  const styleTag = document.createElement("style");
  styleTag.textContent = styles;

  container.append(contentWrapper, styleTag);
  return container;
}
