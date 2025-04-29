import { React, useState } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { REGISTRATION_MODAL_ID } from "../../../consts";
import UserService from "../../../services/UserService";
import { useTranslation } from "react-i18next";

const RegistrationModal = () => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { t } = useTranslation();

  return (
    <MyModal
      id={REGISTRATION_MODAL_ID}
      title={t("modals.user.registration.title")}
      description={t("modals.user.registration.description")}
    >
      <div className="inputs">
        <MyInput
          label={t("inputs.login.label")}
          description={t("inputs.login.description")}
          placeholder="Artyom"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <MyInput
          label={t("inputs.password.label")}
          description={t("inputs.password.description")}
          placeholder="123456A!"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <MyInput
          label={t("inputs.repeatPassword.label")}
          placeholder="123456A!"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <MyButton label={t("buttons.cancel.label")} data-close-modal />
        <MyButton
          label={t("buttons.register.label")}
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
