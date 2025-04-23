import React from "react";
import ReactDOM from "react-dom";
import { getModalStore } from "../stores/ModalStore";
import RegistrationModal from "../components/modals/user/RegistrationModal";
import LoginModal from "../components/modals/user/LoginModal";
import CreateDocumentModal from "../components/modals/document/CreateDocumentModal";
import AboutModal from "../components/modals/app/AboutModal";
import ImportDocumentModal from "../components/modals/document/ImportDocumentModal";
import {
  PORTAL_ID,
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  IMPORT_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
} from "../consts";

const modalMap = {
  [REGISTRATION_MODAL_ID]: RegistrationModal,
  [LOGIN_MODAL_ID]: LoginModal,
  [CREATE_DOCUMENT_MODAL_ID]: CreateDocumentModal,
  [ABOUT_MODAL_ID]: AboutModal,
  [IMPORT_DOCUMENT_MODAL_ID]: ImportDocumentModal,
};
import { useStore } from "../utils/store";

const renderModal = (ModalComponent) =>
  ReactDOM.createPortal(<ModalComponent />, document.getElementById(PORTAL_ID));

const ModalManager = () => {
  const [modalStore] = useStore(getModalStore());
  const ModalComponent = modalMap[modalStore.openModalId];
  if (!ModalComponent) return null;
  return renderModal(ModalComponent);
};

export default ModalManager;
