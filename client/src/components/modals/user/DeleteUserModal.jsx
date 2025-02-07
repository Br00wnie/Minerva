import React, { useContext } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { DELETE_USER_MODAL_ID } from "../../../consts";
import { observer } from "mobx-react-lite";
import { logAction } from "../../../utils/logging";
import toast from "../../ui/toast/MyToast";
import { Context } from "../../../../index";
import UserService from "../../../services/UserService";

const DeleteUserModal = observer(() => {
  const { UserStore, ModalStore } = useContext(Context);

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
          className="dangerous"
          onClick={() => UserService.delete({}, { UserStore, ModalStore })}
        />
      </div>
    </MyModal>
  );
});

export default DeleteUserModal;
