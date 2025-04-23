import UserApi from "../http/UserApi.js";
import { getModalServices } from "../stores/ModalStore.js";
import { getUserServices } from "../stores/UserStore.js";
import { userYup } from "../utils/validation";
import toast from "../utils/toast.js";

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
      await userYup.validate({
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
      const tokenCookie = result.data?.["set-cookie"]?.find((c) =>
        c.startsWith("token=")
      );
      const tokenValue = tokenCookie.split(";")[0].split("=")[1];
      document.cookie = `token=${tokenValue}; ${tokenCookie
        .split(";")
        .slice(1)
        .join(";")}`;
    }
    toast(result.message);
  }

  static logout() {
    getUserServices().setLogin(null);
    toast("Выход выполнен");
  }
}

export default UserService;
