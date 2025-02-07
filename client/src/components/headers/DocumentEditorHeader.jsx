import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../index.jsx";
import {
  REGISTRATION_MODAL_ID,
  LOGIN_MODAL_ID,
  DELETE_USER_MODAL_ID,
  CREATE_DOCUMENT_MODAL_ID,
  DELETE_DOCUMENT_MODAL_ID,
  LOAD_DOCUMENT_MODAL_ID,
} from "../../consts.js";
import MyDropdown from "../ui/dropdown/MyDropdown.jsx";
import { observer } from "mobx-react-lite";
import UserService from "../../services/UserService.js";
import DocumentService from "../../services/DocumentService.js";
import { read } from "../../utils/storageManagement.js";

const DocumentEditorHeader = observer(() => {
  const { ModalStore, UserStore, DocumentStore } = useContext(Context);
  const [documentId, setDocumentId] = useState(
    localStorage.getItem("documentId")
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setDocumentId(localStorage.getItem("documentId"));
    };
    window.addEventListener("localStorageUpdate", handleStorageChange);
    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, []);

  return (
    <>
      <MyDropdown label="Документ">
        {UserStore.getIsAuthenticated() ? (
          <>
            <MyDropdown
              label="Создать"
              onClick={() => ModalStore.openModal(CREATE_DOCUMENT_MODAL_ID)}
            />
            {documentId !== null ? (
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
            {documentId !== null ? (
              <MyDropdown
                label="Сохранить"
                onClick={() =>
                  DocumentService.save(
                    { documentId: read("documentId") },
                    { DocumentStore }
                  )
                }
              />
            ) : null}
            <hr />
          </>
        ) : null}
        <MyDropdown
          label="Импортировать"
          onClick={() => DocumentService.import({}, { DocumentStore })}
        />
        <MyDropdown
          label="Экспортировать"
          onClick={() => DocumentService.export()}
        />
        <hr />
        <MyDropdown label="Настроить" />
        <MyDropdown label="Оформить" />
      </MyDropdown>
      <MyDropdown label="Пользователь">
        {UserStore.getIsAuthenticated() ? (
          <>
            <MyDropdown
              label="Выйти"
              onClick={() => UserService.logout({}, { UserStore })}
            />
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
      </MyDropdown>
      <MyDropdown label="Приложение">
        <MyDropdown label="Помощь" />
        <MyDropdown label="О приложении" />
        <MyDropdown label="Пользовательское соглашение" />
        <MyDropdown label="Репозиторий" />
      </MyDropdown>
    </>
  );
});

export default DocumentEditorHeader;
