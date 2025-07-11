import ReactDOM from "react-dom";
import { getModalStore } from "@stores/ModalStore";
import RegistrationModal from "@modals/user/RegistrationModal";
import LogInModal from "@modals/user/LogInModal";
import ResetDocumentModal from "@modals/document/ResetDocumentModal";
import ResetStyleModal from "@modals/style/ResetStyleModal";
import AboutModal from "@modals/app/AboutModal";
import {
  PORTAL_ID,
  REGISTRATION_MODAL_ID,
  LOG_IN_MODAL_ID,
  RESET_DOCUMENT_MODAL_ID,
  RESET_STYLE_MODAL_ID,
  ABOUT_MODAL_ID,
} from "@src/consts";

const modalMap = {
  [REGISTRATION_MODAL_ID]: RegistrationModal,
  [LOG_IN_MODAL_ID]: LogInModal,
  [RESET_DOCUMENT_MODAL_ID]: ResetDocumentModal,
  [RESET_STYLE_MODAL_ID]: ResetStyleModal,
  [ABOUT_MODAL_ID]: AboutModal,
};
import { useStore } from "@incrum/store";

const renderModal = (ModalComponent) =>
  ReactDOM.createPortal(<ModalComponent />, document.getElementById(PORTAL_ID));

const ModalManager = () => {
  const [modalStore] = useStore(getModalStore());
  const ModalComponent = modalMap[modalStore.openModalId];
  if (!ModalComponent) return null;
  return renderModal(ModalComponent);
};

export default ModalManager;
