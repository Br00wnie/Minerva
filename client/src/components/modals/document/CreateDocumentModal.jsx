import { React, useContext, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { CREATE_DOCUMENT_MODAL_ID } from "../../../consts";
import { Context } from "../../../../index";
import toast from "../../ui/toast/MyToast";
import { logAction } from "../../../utils/logging";
import DocumentService from "../../../services/DocumentService";

const CreateDocumentModal = () => {
  const { DocumentStore, ModalStore } = useContext(Context);
  const [documentName, setDocumentName] = useState("");

  return (
    <MyModal id={CREATE_DOCUMENT_MODAL_ID} title="Создать документ">
      <div className="inputs">
        <MyInput
          label="Название"
          desc="Имена ваших документов должны отличаться."
          placeholder="ПЗ к ВКР"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
      </div>
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Создать"
          onClick={() =>
            DocumentService.create(
              { documentName },
              { DocumentStore, ModalStore }
            )
          }
        />
      </div>
    </MyModal>
  );
};

export default CreateDocumentModal;
