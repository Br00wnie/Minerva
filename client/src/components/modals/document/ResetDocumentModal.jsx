import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { RESET_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentService from "../../../services/DocumentService";

const ResetDocumentModal = () => {
  return (
    <MyModal
      id={RESET_DOCUMENT_MODAL_ID}
      title="Сбросить документ"
      description="Перед сбросом документа, экспортируйте или сохраните на аккаунт 
      текущий документ, чтобы не потерять прогресс."
    >
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          className="danger"
          label="Сбросить"
          onClick={() => DocumentService.reset()}
        />
      </div>
    </MyModal>
  );
};

export default ResetDocumentModal;
