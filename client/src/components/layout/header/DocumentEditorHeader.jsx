import React from "react";
import ModalStore from "../../../stores/ModalStore.js";
import { useStore } from "../../../incrum/store.jsx";
import {
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  RESET_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
  IMPORT_DOCUMENT_MODAL_ID,
} from "../../../consts.js";
import MyDropdown from "../../ui/dropdown/MyDropdown.jsx";
import DocumentService from "../../../services/DocumentService.js";
import generatePdf from "../../../utils/pdfGeneration.js";
import useDocumentStyle from "../../../hooks/useDocumentStyle.js";

const DocumentEditorHeader = () => {
  const [modalStore, modalServices] = useStore(
    ModalStore.store,
    ModalStore.services
  );
  const documentStyle = useDocumentStyle();

  return (
    <>
      <MyDropdown label="Документ">
        <MyDropdown
          label="Импортировать"
          onClick={() => modalServices.openModal(IMPORT_DOCUMENT_MODAL_ID)}
        />
        <MyDropdown
          label="Экспортировать"
          onClick={() => DocumentService.export()}
        />
        <hr />
        <MyDropdown
          label="Сбросить"
          onClick={() => modalServices.openModal(RESET_DOCUMENT_MODAL_ID)}
        />
        <hr />
        <MyDropdown
          label="Оформить"
          onClick={() => generatePdf(documentStyle)}
        />
      </MyDropdown>
      <MyDropdown label="Пользователь">
        <>
          <MyDropdown
            label="Войти"
            onClick={() => modalServices.openModal(LOGIN_MODAL_ID)}
          />
          <MyDropdown
            label="Зарегистрироваться"
            onClick={() => modalServices.openModal(REGISTRATION_MODAL_ID)}
          />
        </>
      </MyDropdown>
      <MyDropdown label="Приложение">
        <MyDropdown
          label="О приложении"
          onClick={() => modalServices.openModal(ABOUT_MODAL_ID)}
        />
      </MyDropdown>
    </>
  );
};

export default DocumentEditorHeader;
