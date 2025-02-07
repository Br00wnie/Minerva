import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import RegistrationModal from "./user/RegistrationModal";
import LoginModal from "./user/LoginModal";
import { Context } from "../../../index";
import {
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  DELETE_USER_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  DELETE_DOCUMENT_MODAL_ID,
  LOAD_DOCUMENT_MODAL_ID,
  PORTAL_ID,
} from "../../consts";
import DeleteUserModal from "./user/DeleteUserModal";
import CreateDocumentModal from "./document/CreateDocumentModal";
import DeleteDocumentModal from "./document/DeleteDocumentModal";
import LoadDocumentModal from "./document/LoadDocumentModal";

const ModalManager = observer(() => {
  const { ModalStore } = React.useContext(Context);

  if (!ModalStore.getOpenModalId()) return null;

  switch (ModalStore.getOpenModalId()) {
    case REGISTRATION_MODAL_ID:
      return ReactDOM.createPortal(
        <RegistrationModal />,
        document.getElementById(PORTAL_ID)
      );
    case LOGIN_MODAL_ID:
      return ReactDOM.createPortal(
        <LoginModal />,
        document.getElementById(PORTAL_ID)
      );
    case DELETE_USER_MODAL_ID:
      return ReactDOM.createPortal(
        <DeleteUserModal />,
        document.getElementById(PORTAL_ID)
      );
    case CREATE_DOCUMENT_MODAL_ID:
      return ReactDOM.createPortal(
        <CreateDocumentModal />,
        document.getElementById(PORTAL_ID)
      );
    case DELETE_DOCUMENT_MODAL_ID:
      return ReactDOM.createPortal(
        <DeleteDocumentModal />,
        document.getElementById(PORTAL_ID)
      );
    case LOAD_DOCUMENT_MODAL_ID:
      return ReactDOM.createPortal(
        <LoadDocumentModal />,
        document.getElementById(PORTAL_ID)
      );
    default:
      return null;
  }
});

export default ModalManager;
