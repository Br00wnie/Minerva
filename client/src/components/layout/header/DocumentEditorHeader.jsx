import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../script.jsx";
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

const DocumentEditorHeader = observer(() => {
  const { ModalStore, UserStore, DocumentStore } = useContext(Context);

  return (
    <>
      <MyDropdown label="Документ">
        {UserStore.getLogin() ? (
          <>
            <MyDropdown
              label="Создать"
              onClick={() => ModalStore.openModal(CREATE_DOCUMENT_MODAL_ID)}
            />
            {DocumentStore.getId() !== null ? (
              <MyDropdown
                label="Удалить"
                onClick={() => ModalStore.openModal(DELETE_DOCUMENT_MODAL_ID)}
              />
            ) : null}

            <hr />
            <MyDropdown
              label="Загрузить"
              onClick={() => ModalStore.openModal(LOAD_DOCUMENT_MODAL_ID)}
            />
            {DocumentStore.getId() !== null ? (
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
        {UserStore.getLogin() ? (
          <>
            <MyDropdown label="Выйти" onClick={() => UserService.logout()} />
            <MyDropdown
              label="Удалить аккаунт"
              onClick={() => ModalStore.openModal(DELETE_USER_MODAL_ID)}
            />
          </>
        ) : (
          <>
            <MyDropdown
              label="Войти"
              onClick={() => ModalStore.openModal(LOGIN_MODAL_ID)}
            />
            <MyDropdown
              label="Зарегистрироваться"
              onClick={() => ModalStore.openModal(REGISTRATION_MODAL_ID)}
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
});

export default DocumentEditorHeader;
