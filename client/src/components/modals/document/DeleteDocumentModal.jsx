import { React, useContext, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { DELETE_DOCUMENT_MODAL_ID } from "../../../consts";
import { Context } from "../../../../index";
import toast from "../../ui/toast/MyToast";
import { logAction } from "../../../utils/logging";
import DocumentService from "../../../services/DocumentService";
import { read } from "../../../utils/storageManagement";

const DeleteDocumentModal = () => {
  const { DocumentStore, ModalStore } = useContext(Context);
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
          className="dangerous"
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
