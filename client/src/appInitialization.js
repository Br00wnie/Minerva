import { getUserStore } from "./stores/UserStore.js";
import toast from "./utils/toast.js";
import i18n from "./i18n.js";

const initializeApp = () => {
  const login = getUserStore().login;
  if (login) toast(i18n.t("welcome.regularUser", { login }));
  else toast(i18n.t("welcome.guest"));
  const smallWindowMessage = document.getElementById("small-window-message");
  if (smallWindowMessage) {
    const h2 = smallWindowMessage.querySelector("h2");
    const p = smallWindowMessage.querySelector("p");
    if (h2) h2.textContent = i18n.t("smallWindowMessage.h2");
    if (p) p.textContent = i18n.t("smallWindowMessage.p");
  }
};

export default initializeApp;
