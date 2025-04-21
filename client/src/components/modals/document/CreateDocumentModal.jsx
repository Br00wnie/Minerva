import { React, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { CREATE_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentService from "../../../services/DocumentService";

const CreateDocumentModal = () => {
  const [documentName, setDocumentName] = useState("");
  const handleDocumentNameChange = (value) => {
    setDocumentName(value);
  };

  return (
    <MyModal
      id={CREATE_DOCUMENT_MODAL_ID}
      title="Создать документ"
      desc="Перед созданием нового документа, экспортируйте или сохраните на аккаунт 
      активный документ, чтобы не потерять прогресс."
    >
      <div className="inputs">
        <MyInput
          label="Название"
          desc="Названия должны быть уникальными в рамках одного аккаунта."
          placeholder="ПЗ к ВКР"
          value={documentName}
          onChange={handleDocumentNameChange}
        />
      </div>
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          className="danger"
          label="Создать"
          onClick={() => DocumentService.create({ documentName })}
        />
      </div>
    </MyModal>
  );
};

export default CreateDocumentModal;
