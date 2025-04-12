import { React, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { CREATE_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentStore from "../../../stores/DocumentStore";
import ModalStore from "../../../stores/ModalStore";
import DocumentService from "../../../services/DocumentService";
import UserStore from "../../../stores/UserStore";

const CreateDocumentModal = () => {
  const [documentStore, documentServices] = useStore(
    DocumentStore.store,
    DocumentStore.services
  );

  return (
    <MyModal id={CREATE_DOCUMENT_MODAL_ID} title="Создать документ">
      <div className="inputs">
        <MyInput
          label="Название"
          desc="Имена ваших документов должны отличаться."
          placeholder="ПЗ к ВКР"
          value={documentStore.name}
          onChange={(e) => documentServices.setName(e.target.value)}
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
