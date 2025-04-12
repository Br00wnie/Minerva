import Cookies from "js-cookie";
import UserApi from "../http/UserApi.js";
import toast from "../utils/toast.js";
import { userYup } from "../utils/validation";
import ModalStore from "../stores/ModalStore.js";

class UserService {
  /* 
    External
  */

  static async register({ userLogin, userPassword, repeatPassword }) {
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

  static async login({ userLogin, userPassword }) {
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

  static logout() {
    Cookies.remove("token");
    toast("Выход выполнен");
  }
}

export default UserService;
