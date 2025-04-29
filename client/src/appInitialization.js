import { getUserStore } from "./stores/UserStore.js";
import toast from "./utils/toast.js";
import i18n from "./i18n.js";
const initializeApp = () => {
  const login = getUserStore().login;
  if (login) toast(i18n.t("welcome.regularUser", { login }));
  else toast(i18n.t("welcome.guest"));
};

export default initializeApp;
