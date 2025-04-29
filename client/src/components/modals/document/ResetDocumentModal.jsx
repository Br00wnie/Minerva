import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { RESET_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentService from "../../../services/DocumentService";
import { useTranslation } from "react-i18next";

const ResetDocumentModal = () => {
  const { t } = useTranslation();

  return (
    <MyModal
      id={RESET_DOCUMENT_MODAL_ID}
      title={t("modals.document.reset.title")}
      description={t("modals.document.reset.description")}
    >
      <div className="buttons">
        <MyButton label={t("buttons.cancel.label")} data-close-modal />
        <MyButton
          className="danger"
          label={t("buttons.reset.label")}
          onClick={() => DocumentService.reset()}
        />
      </div>
    </MyModal>
  );
};

export default ResetDocumentModal;
