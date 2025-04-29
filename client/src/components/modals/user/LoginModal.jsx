import React, { useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { LOGIN_MODAL_ID } from "../../../consts";
import UserService from "../../../services/UserService";
import { useTranslation } from "react-i18next";

const LoginModal = () => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { t } = useTranslation();

  return (
    <MyModal id={LOGIN_MODAL_ID} title={t("modals.user.login.title")}>
      <div className="inputs">
        <MyInput
          label={t("inputs.login.label")}
          placeholder="Artyom"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <MyInput
          label={t("inputs.password.label")}
          placeholder="123456A!"
          value={userPassword}
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <MyButton label={t("buttons.cancel.label")} data-close-modal />
        <MyButton
          label={t("buttons.login.label")}
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
