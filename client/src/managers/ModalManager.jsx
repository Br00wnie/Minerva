import React from "react";
import ReactDOM from "react-dom";
import { getModalStore } from "../stores/ModalStore";
import RegistrationModal from "../components/modals/user/RegistrationModal";
import LoginModal from "../components/modals/user/LoginModal";
import DeleteUserModal from "../components/modals/user/DeleteUserModal";
import CreateDocumentModal from "../components/modals/document/CreateDocumentModal";
import LoadDocumentModal from "../components/modals/document/LoadDocumentModal";
import DeleteDocumentModal from "../components/modals/document/DeleteDocumentModal";
import AboutModal from "../components/modals/user/AboutModal";
import {
  PORTAL_ID,
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  DELETE_USER_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  LOAD_DOCUMENT_MODAL_ID,
  DELETE_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
} from "../consts";

const modalMap = {
  [REGISTRATION_MODAL_ID]: RegistrationModal,
  [LOGIN_MODAL_ID]: LoginModal,
  [DELETE_USER_MODAL_ID]: DeleteUserModal,
  [CREATE_DOCUMENT_MODAL_ID]: CreateDocumentModal,
  [LOAD_DOCUMENT_MODAL_ID]: LoadDocumentModal,
  [DELETE_DOCUMENT_MODAL_ID]: DeleteDocumentModal,
  [ABOUT_MODAL_ID]: AboutModal,
};
import { useStore } from "../utils/store";

const renderModal = (ModalComponent) =>
  ReactDOM.createPortal(<ModalComponent />, document.getElementById(PORTAL_ID));

const ModalManager = () => {
  const [store] = useStore(getModalStore());
  const ModalComponent = modalMap[store.openModalId];
  if (!ModalComponent) return null;
  return renderModal(ModalComponent);
};

export default ModalManager;
