import DocumentEditorPage from "./components/pages/DocumentEditorPage";
import StyleEditorPage from "./components/pages/StyleEditorPage";
import { DOCUMENT_EDITOR_ROUTE, STYLE_EDITOR_ROUTE } from "./consts";

export const privateRoutes = [];

export const publicRoutes = [
  {
    path: DOCUMENT_EDITOR_ROUTE,
    Component: DocumentEditorPage,
  },
  {
    path: STYLE_EDITOR_ROUTE,
    Component: StyleEditorPage,
  },
  {
    path: "*",
    Component: DocumentEditorPage,
  },
];
