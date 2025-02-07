import UserApi from "../http/UserApi.js";
import toast from "../components/ui/toast/MyToast.jsx";
import { logAction } from "../utils/logging.js";
import Cookies from "js-cookie";
import { userYup } from "../utils/validation";
import { checkToken } from "../utils/tokenChecking.js";
import { write } from "../utils/storageManagement.js";

class UserService {
  // Зарегистрировать нового пользователя
  static async register({
    userLogin,
    userPassword,
    repeatPassword,
    ModalStore,
  }) {
    if (userPassword !== repeatPassword) {
      toast("Пароли не совпадают");
      return;
    }
    try {
      userYup.validate({
        userLogin,
        userPassword,
      });
    } catch (error) {
      toast(error.message);
      return;
    }
    const result = await UserApi.create({
      userLogin,
      userPassword,
    });
    if (result.success) ModalStore.openModal(null);
    toast(result.message);
  }

  // Войти в аккаунт
  static async login({ userLogin, userPassword, ModalStore }) {
    try {
      await userYup.validate({
        userLogin,
        userPassword,
      });
    } catch (error) {
      toast(error.message);
      return;
    }
    const result = await UserApi.login({ userLogin, userPassword });
    if (result.success) ModalStore.openModal(null);
    toast(result.message);
  }

  // Выйти из аккаунта
  static async logout() {
    if (!checkToken()) {
      toast("Вы и так не авторизованы");
      return;
    }
    Cookies.remove("token");
    toast("Выход выполнен");
  }
}

export default UserService;
