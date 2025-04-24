import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { IMPORT_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentService from "../../../services/DocumentService";

const ResetDocumentModal = () => {
  return (
    <MyModal
      id={IMPORT_DOCUMENT_MODAL_ID}
      title="Импортировать документ"
      description="Перед импортом документа, экспортируйте или сохраните на аккаунт 
      текущий документ, чтобы не потерять прогресс."
    >
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          className="danger"
          label="Импортировать"
          onClick={() => DocumentService.import()}
        />
      </div>
    </MyModal>
  );
};

export default ResetDocumentModal;
