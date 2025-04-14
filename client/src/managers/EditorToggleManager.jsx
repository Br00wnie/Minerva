import React from "react";
import ReactDOM from "react-dom";
import {
  DOCUMENT_EDITOR_ROUTE,
  STYLE_EDITOR_ROUTE,
  PORTAL_ID,
} from "../consts";
import { useLocation, useNavigate } from "react-router-dom";

const renderToggle = (src, alt, onClick, title) =>
  ReactDOM.createPortal(
    <div id="editor-toggle" onClick={onClick} title={title}>
      <img src={src} alt={alt} />
    </div>,
    document.getElementById(PORTAL_ID)
  );

const EditorToggleManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleClick = () => {
    if (location.pathname === DOCUMENT_EDITOR_ROUTE)
      navigate(STYLE_EDITOR_ROUTE);
    else if (location.pathname === STYLE_EDITOR_ROUTE)
      navigate(DOCUMENT_EDITOR_ROUTE);
  };

  if (location.pathname === DOCUMENT_EDITOR_ROUTE)
    return renderToggle(
      "/icons/style.svg",
      "Иконка стиля",
      handleToggleClick,
      "Открыть редактор стиля"
    );
  if (location.pathname === STYLE_EDITOR_ROUTE)
    return renderToggle(
      "/icons/document.svg",
      "Иконка документа",
      handleToggleClick,
      "Открыть редактор документа"
    );
  return null;
};

export default EditorToggleManager;
