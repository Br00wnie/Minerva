import React from "react";
import ReactDOM from "react-dom";
import { getModalStore } from "../stores/ModalStore";
import RegistrationModal from "../components/modals/user/RegistrationModal";
import LoginModal from "../components/modals/user/LoginModal";
import ResetDocumentModal from "../components/modals/document/ResetDocumentModal";
import ResetStyleModal from "../components/modals/style/ResetStyleModal";
import AboutModal from "../components/modals/app/AboutModal";
import ImportDocumentModal from "../components/modals/document/ImportDocumentModal";
import {
  PORTAL_ID,
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  RESET_DOCUMENT_MODAL_ID,
  RESET_STYLE_MODAL_ID,
  IMPORT_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
} from "../consts";

const modalMap = {
  [REGISTRATION_MODAL_ID]: RegistrationModal,
  [LOGIN_MODAL_ID]: LoginModal,
  [RESET_DOCUMENT_MODAL_ID]: ResetDocumentModal,
  [RESET_STYLE_MODAL_ID]: ResetStyleModal,
  [ABOUT_MODAL_ID]: AboutModal,
  [IMPORT_DOCUMENT_MODAL_ID]: ImportDocumentModal,
};
import { useStore } from "../incrum/store";

const renderModal = (ModalComponent) =>
  ReactDOM.createPortal(<ModalComponent />, document.getElementById(PORTAL_ID));

const ModalManager = () => {
  const [modalStore, modalServices] = useStore(getModalStore());
  const ModalComponent = modalMap[modalStore.openModalId];
  if (!ModalComponent) return null;
  return renderModal(ModalComponent);
};

export default ModalManager;
