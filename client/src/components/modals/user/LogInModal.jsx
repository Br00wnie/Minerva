import { useState } from "react";
import MyModal from "@ui/modal/MyModal";
import MyButton from "@ui/button/MyButton";
import MyInput from "@ui/input/MyInput";
import { LOG_IN_MODAL_ID } from "@src/consts";
import UserService from "@services/UserService";
import { useTranslation } from "react-i18next";

const LogInModal = () => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { t } = useTranslation();

  return (
    <MyModal id={LOG_IN_MODAL_ID} title={t("modals.user.logIn.title")}>
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
          label={t("buttons.logIn.label")}
          onClick={() =>
            UserService.logIn({
              userLogin,
              userPassword,
            })
          }
        />
      </div>
    </MyModal>
  );
};

export default LogInModal;
