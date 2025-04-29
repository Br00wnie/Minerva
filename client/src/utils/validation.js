import * as yup from "yup";
import i18n from "../i18n";

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 4;

export const userYup = yup.object().shape({
  userLogin: yup
    .string()
    .min(
      MIN_LOGIN_LENGTH,
      i18n.t("validation.login.tooShort", { minLoginLength: MIN_LOGIN_LENGTH })
    )
    .required(i18n.t("validation.login.required")),
  userPassword: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      i18n.t("validation.password.tooShort", {
        minPasswordLength: MIN_PASSWORD_LENGTH,
      })
    )
    .matches(/\d/, i18n.t("validation.password.noNumbers"))
    .matches(/[A-Z]/, i18n.t("validation.password.noCapitalLetters"))
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      i18n.t("validation.password.noSpecialCharacters")
    )
    .required(i18n.t("validation.password.required")),
});

export const nameYup = yup.object().shape({
  name: yup
    .string()
    .min(
      MIN_NAME_LENGTH,
      i18n.t("validation.name.tooShort", { minNameLength: MIN_NAME_LENGTH })
    )
    .required(i18n.t("validation.name.required")),
});
