export default function generateStylizedDocument(content, style) {
  const documentRoot = document.createElement("div");
  documentRoot.className = "document-root";
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, "text/html").body
    .children;
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";
  contentContainer.append(...parsedContent);
  const styleContainer = document.createElement("style");
  styleContainer.textContent = style;
  documentRoot.append(contentContainer, styleContainer);
  return documentRoot;
}
