import DocumentEditorPage from "./components/pages/DocumentEditorPage";
import StyleEditorPage from "./components/pages/StyleEditorPage";
import { DOCUMENT_EDITOR_ROUTE, STYLE_EDITOR_ROUTE } from "./consts";
import { Navigate } from "react-router-dom";

const RedirectToDocumentEditor = () => {
  return <Navigate to={DOCUMENT_EDITOR_ROUTE} replace />;
};

export const privateRoutes = [];

export const publicRoutes = [
  {
    path: "/",
    Component: RedirectToDocumentEditor,
  },
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
    Component: RedirectToDocumentEditor,
  },
];
