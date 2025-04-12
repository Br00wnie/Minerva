import UserApi from "../http/UserApi.js";
import toast from "../utils/toast.js";
import { userYup } from "../utils/validation";
import { getModalServices, getModalStore } from "../stores/ModalStore.js";
import { getUserServices } from "../stores/UserStore.js";

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
    if (result.success) getModalServices().closeModal();
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
    if (result.success) {
      getModalServices().closeModal();
      getUserServices().setLogin(userLogin);
    }
    toast(result.message);
  }

  static logout() {
    getUserServices().setLogin(null);
    toast("Выход выполнен");
  }
}

export default UserService;
