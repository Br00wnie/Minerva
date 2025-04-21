import React from "react";
import ReactDOM from "react-dom";
import { getModalStore } from "../stores/ModalStore";
import RegistrationModal from "../components/modals/user/RegistrationModal";
import LoginModal from "../components/modals/user/LoginModal";
import DeleteUserModal from "../components/modals/user/DeleteUserModal";
import CreateDocumentModal from "../components/modals/document/CreateDocumentModal";
import AboutModal from "../components/modals/user/AboutModal";
import {
  PORTAL_ID,
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  DELETE_USER_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
} from "../consts";

const modalMap = {
  [REGISTRATION_MODAL_ID]: RegistrationModal,
  [LOGIN_MODAL_ID]: LoginModal,
  [DELETE_USER_MODAL_ID]: DeleteUserModal,
  [CREATE_DOCUMENT_MODAL_ID]: CreateDocumentModal,
  [ABOUT_MODAL_ID]: AboutModal,
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
