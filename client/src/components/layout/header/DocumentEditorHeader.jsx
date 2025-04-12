import React from "react";
import ModalStore from "../../../stores/ModalStore.js";
import UserStore from "../../../stores/UserStore.js";
import DocumentStore from "../../../stores/DocumentStore.js";
import { useStore } from "../../../utils/store.jsx";
import {
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  DELETE_USER_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  DELETE_DOCUMENT_MODAL_ID,
  LOAD_DOCUMENT_MODAL_ID,
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
        {userStore.login ? (
          <>
            <MyDropdown
              label="Создать"
              onClick={() => modalServices.openModal(CREATE_DOCUMENT_MODAL_ID)}
            />
            {documentStore.id !== null ? (
              <MyDropdown
                label="Удалить"
                onClick={() =>
                  modalServices.openModal(DELETE_DOCUMENT_MODAL_ID)
                }
              />
            ) : null}

            <hr />
            <MyDropdown
              label="Загрузить"
              onClick={() => modalServices.openModal(LOAD_DOCUMENT_MODAL_ID)}
            />
            {documentStore.id !== null ? (
              <MyDropdown
                label="Сохранить"
                onClick={() => DocumentService.save()}
              />
            ) : null}
            <hr />
          </>
        ) : null}
        <MyDropdown
          label="Импортировать"
          onClick={() => DocumentService.import()}
        />
        <MyDropdown
          label="Экспортировать"
          onClick={() => DocumentService.export()}
        />
        <hr />
        <MyDropdown label="Настроить" />
        <MyDropdown label="Оформить" />
      </MyDropdown>
      <MyDropdown label="Стиль"></MyDropdown>
      <MyDropdown label="Пользователь">
        {userStore.login ? (
          <>
            <MyDropdown label="Выйти" onClick={() => UserService.logout()} />
            <MyDropdown
              label="Удалить аккаунт"
              onClick={() => modalServices.openModal(DELETE_USER_MODAL_ID)}
            />
          </>
        ) : (
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
        )}
        <hr />
        <MyDropdown label="Помощь" />
        <MyDropdown label="Пользовательское соглашение" />
        <hr />
        <MyDropdown label="О приложении" />
        <MyDropdown label="Репозиторий" />
      </MyDropdown>
    </>
  );
};

export default DocumentEditorHeader;
