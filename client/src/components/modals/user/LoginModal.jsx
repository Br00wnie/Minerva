import React, { useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { LOGIN_MODAL_ID } from "../../../consts";
import UserService from "../../../services/UserService";

const LoginModal = () => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <MyModal id={LOGIN_MODAL_ID} title="Войти">
      <div className="inputs">
        <MyInput
          label="Логин"
          placeholder="Artyom"
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
            })
          }
        />
      </div>
    </MyModal>
  );
};

export default LoginModal;
