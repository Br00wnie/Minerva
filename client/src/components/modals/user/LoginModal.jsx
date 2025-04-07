import React, { useContext, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { LOGIN_MODAL_ID } from "../../../consts";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../script";
import UserService from "../../../services/UserService";

const LoginModal = observer(() => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { UserStore, ModalStore } = useContext(Context);

  return (
    <MyModal id={LOGIN_MODAL_ID} title="Войти">
      <div className="inputs">
        <MyInput
          label="Логин"
          placeholder="artyom"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <MyInput
          label="Пароль"
          placeholder="123456A!"
          value={userPassword}
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Войти"
          onClick={() =>
            UserService.login({
              userLogin,
              userPassword,
              ModalStore,
            })
          }
        />
      </div>
    </MyModal>
  );
});

export default LoginModal;
