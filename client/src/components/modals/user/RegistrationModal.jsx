import { React, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { REGISTRATION_MODAL_ID } from "../../../consts";
import UserService from "../../../services/UserService";

const RegistrationModal = () => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <MyModal
      id={REGISTRATION_MODAL_ID}
      title="Зарегистрироваться"
      description="Мы не собираем статистику и не передаем данные третьим лицам."
    >
      <div className="inputs">
        <MyInput
          label="Логин"
          description="Ваш уникальный неизменяемый идентификатор. 
          Он будет виден другим пользователям под вашими публичными стилями."
          placeholder="Artyom"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <MyInput
          label="Пароль"
          description="Восстановление пароля не предусмотрено."
          placeholder="123456A!"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <MyInput
          label="Повторите пароль"
          placeholder="123456A!"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Зарегистрироваться"
          onClick={() => {
            UserService.register({
              userLogin,
              userPassword,
              repeatPassword,
            });
          }}
        />
      </div>
    </MyModal>
  );
};

export default RegistrationModal;
