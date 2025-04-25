import * as yup from "yup";
import i18n from "./i18n";

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 4;

export const userYup = yup.object().shape({
  userLogin: yup
    .string()
    .min(
      MIN_LOGIN_LENGTH,
      i18n.t("validation.minLoginLength", { minLoginLength: MIN_LOGIN_LENGTH })
    )
    .required(i18n.t("validation.requiredLogin")),
  userPassword: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      i18n.t("validation.minPasswordLength", {
        minPasswordLength: MIN_PASSWORD_LENGTH,
      })
    )
    .matches(/\d/, i18n.t("validation.noNumberInPassword"))
    .matches(/[A-Z]/, i18n.t("validation.noCapitalLetterInPassword"))
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      i18n.t("validation.noSpecialCharacterInPassword")
    )
    .required(i18n.t("validation.requiredPassword")),
});

export const nameYup = yup.object().shape({
  name: yup
    .string()
    .min(
      MIN_NAME_LENGTH,
      i18n.t("validation.minNameLength", { minNameLength: MIN_NAME_LENGTH })
    )
    .required(i18n.t("validation.requiredName")),
});
