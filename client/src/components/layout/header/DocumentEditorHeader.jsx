import ModalStore from "@stores/ModalStore";
import { useStore } from "@incrum/store.jsx";
import {
  REGISTRATION_MODAL_ID,
  LOG_IN_MODAL_ID,
  RESET_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
} from "@src/consts";
import MyDropdown from "@ui/dropdown/MyDropdown.jsx";
import DocumentService from "@services/DocumentService";
import generatePdf from "@utils/pdfGeneration";
import useDocumentStyle from "@hooks/useDocumentStyle";
import { useTranslation } from "react-i18next";

const DocumentEditorHeader = () => {
  const [, modalServices] = useStore(ModalStore.store, ModalStore.services);
  const documentStyle = useDocumentStyle();
  const { t } = useTranslation();

  return (
    <>
      <MyDropdown label={t("buttons.document.label")}>
        <MyDropdown
          label={t("buttons.import.label")}
          onClick={() => DocumentService.import()}
        />
        <MyDropdown
          label={t("buttons.export.label")}
          onClick={() => DocumentService.export()}
        />
        <hr />
        <MyDropdown
          label={t("buttons.reset.label")}
          onClick={() => modalServices.openModal(RESET_DOCUMENT_MODAL_ID)}
        />
        <hr />
        <MyDropdown
          label={t("buttons.stylize.label")}
          onClick={() => generatePdf(documentStyle)}
        />
      </MyDropdown>
      <MyDropdown label={t("buttons.user.label")}>
        <>
          <MyDropdown
            label={t("buttons.logIn.label")}
            onClick={() => modalServices.openModal(LOG_IN_MODAL_ID)}
          />
          <MyDropdown
            label={t("buttons.register.label")}
            onClick={() => modalServices.openModal(REGISTRATION_MODAL_ID)}
          />
        </>
      </MyDropdown>
      <MyDropdown label={t("buttons.app.label")}>
        <MyDropdown
          label={t("buttons.about.label")}
          onClick={() => modalServices.openModal(ABOUT_MODAL_ID)}
        />
      </MyDropdown>
    </>
  );
};

export default DocumentEditorHeader;
