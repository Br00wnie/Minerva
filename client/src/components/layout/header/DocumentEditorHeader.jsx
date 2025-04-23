import React from "react";
import ModalStore from "../../../stores/ModalStore.js";
import UserStore from "../../../stores/UserStore.js";
import DocumentStore from "../../../stores/DocumentStore.js";
import { useStore } from "../../../utils/store.jsx";
import {
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  ABOUT_MODAL_ID,
  IMPORT_DOCUMENT_MODAL_ID,
} from "../../../consts.js";
import MyDropdown from "../../ui/dropdown/MyDropdown.jsx";
import UserService from "../../../services/UserService.js";
import DocumentService from "../../../services/DocumentService.js";

const DocumentEditorHeader = () => {
  const [documentStore, documentServices] = useStore(
    DocumentStore.store,
    DocumentStore.services
  );
  const [userStore, userServices] = useStore(
    UserStore.store,
    UserStore.services
  );
  const [modalStore, modalServices] = useStore(
    ModalStore.store,
    ModalStore.services
  );

  return (
    <>
      <MyDropdown label="Документ">
        <MyDropdown
          label="Создать"
          onClick={() => modalServices.openModal(CREATE_DOCUMENT_MODAL_ID)}
        />
        <hr />
        <MyDropdown
          label="Импортировать"
          onClick={() => modalServices.openModal(IMPORT_DOCUMENT_MODAL_ID)}
        />
        <MyDropdown
          label="Экспортировать"
          onClick={() => DocumentService.export()}
        />
        <hr />
        <MyDropdown label="Оформить" />
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
