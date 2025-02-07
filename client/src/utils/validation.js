import * as yup from "yup";

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 4;

export const userYup = yup.object().shape({
  userLogin: yup
    .string()
    .min(
      MIN_LOGIN_LENGTH,
      `Минимальная длина логина — ${MIN_LOGIN_LENGTH} символа`
    )
    .required("Логин обязателен"),
  userPassword: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Минимальная длина пароля — ${MIN_PASSWORD_LENGTH} символов`
    )
    .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Пароль должен содержать хотя бы один спецсимвол"
    )
    .required("Пароль обязателен"),
});

export const nameYup = yup.object().shape({
  name: yup
    .string()
    .min(
      MIN_NAME_LENGTH,
      `Минимальная длина имени — ${MIN_NAME_LENGTH} символа`
    )
    .required("Имя обязательно"),
});
