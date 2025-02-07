import DocumentEditor from "./components/pages/DocumentEditor";
import StyleEditor from "./components/pages/StyleEditor";
import { DOCUMENT_EDITOR_ROUTE, STYLE_EDITOR_ROUTE } from "./consts";

export const privateRoutes = [];

export const publicRoutes = [
  {
    path: DOCUMENT_EDITOR_ROUTE,
    Component: DocumentEditor,
  },
  {
    path: STYLE_EDITOR_ROUTE,
    Component: StyleEditor,
  },
  {
    path: "*",
    Component: DocumentEditor,
  },
];
