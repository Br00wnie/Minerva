import { React, useContext, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { REGISTRATION_MODAL_ID } from "../../../consts";
import { Context } from "../../../../script";
import UserService from "../../../services/UserService";

const RegistrationModal = () => {
  const { ModalStore } = useContext(Context);
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <MyModal
      id={REGISTRATION_MODAL_ID}
      title="Зарегистрироваться"
      desc={"Мы не собираем статистику и не передаем данные третьим лицам."}
    >
      <div className="inputs">
        <MyInput
          label="Логин"
          desc="Ваш уникальный неизменяемый идентификатор."
          placeholder="artyom"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <MyInput
          label="Пароль"
          desc="Восстановление пароля не предусмотрено."
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
              ModalStore,
            });
          }}
        />
      </div>
    </MyModal>
  );
};

export default RegistrationModal;
