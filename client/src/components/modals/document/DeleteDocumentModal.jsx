import { React, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { DELETE_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentStore from "../../../stores/DocumentStore";
import ModalStore from "../../../stores/ModalStore";
import DocumentService from "../../../services/DocumentService";

const DeleteDocumentModal = () => {
  const [documentName, setDocumentName] = useState("");

  return (
    <MyModal
      id={DELETE_DOCUMENT_MODAL_ID}
      title="Удалить документ"
      desc="Вы уверены, что хотите безвозвратно удалить документ?"
    >
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Удалить"
          className="danger"
          onClick={() =>
            DocumentService.delete(
              { documentId: read("documentId") },
              { DocumentStore, ModalStore }
            )
          }
        />
      </div>
    </MyModal>
  );
};

export default DeleteDocumentModal;
