import React from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DOCUMENT_EDITOR_ROUTE,
  STYLE_EDITOR_ROUTE,
  PORTAL_ID,
} from "../consts";

const renderToggle = (src, alt, clickHandler, title) =>
  ReactDOM.createPortal(
    <div id="editor-toggle" onClick={clickHandler} title={title}>
      <img src={src} alt={alt} />
    </div>,
    document.getElementById(PORTAL_ID)
  );

const EditorToggleManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleClick = () => {
    if (location.pathname === STYLE_EDITOR_ROUTE)
      navigate(DOCUMENT_EDITOR_ROUTE);
    else navigate(STYLE_EDITOR_ROUTE);
  };

  if (location.pathname === STYLE_EDITOR_ROUTE)
    return renderToggle(
      "/icons/document.svg",
      "Иконка документа",
      handleToggleClick
    );
  else
    return renderToggle("/icons/style.svg", "Иконка стиля", handleToggleClick);
};

export default EditorToggleManager;
