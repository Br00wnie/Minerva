import UserApi from "@http/UserApi";
import { getModalServices } from "@stores/ModalStore";
import { getUserServices } from "@stores/UserStore";
import { userYup } from "@utils/validation";
import toast from "@utils/toast";
import i18n from "@src/i18n";

class UserService {
  /* 
    External
  */

  static async register({ userLogin, userPassword, repeatPassword }) {
    if (userPassword !== repeatPassword) {
      toast(i18n.t("services.user.passwordsDoNotMatch"));
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

  static async logIn({ userLogin, userPassword }) {
    try {
      await userYup.validate({
        userLogin,
        userPassword,
      });
    } catch (error) {
      toast(error.message);
      return;
    }
    const result = await UserApi.logIn({ userLogin, userPassword });
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
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast(i18n.t("services.user.logoutDone"));
  }
}

export default UserService;
