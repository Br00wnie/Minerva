import React from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { DELETE_USER_MODAL_ID } from "../../../consts";
import UserStore from "../../../stores/UserStore";
import ModalStore from "../../../stores/ModalStore";
import UserService from "../../../services/UserService";

const DeleteUserModal = () => {
  return (
    <MyModal
      id={DELETE_USER_MODAL_ID}
      title="Удалить аккаунт"
      desc="Вы уверены, что хотите безвозвратно удалить аккаунт?"
    >
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Удалить"
          className="danger"
          onClick={() => UserService.delete({}, { UserStore, ModalStore })}
        />
      </div>
    </MyModal>
  );
};

export default DeleteUserModal;
