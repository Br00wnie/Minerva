import toast from "./toast";
import { getUserStore } from "../stores/UserStore.js";

const initializeApp = () => {
  const userLogin = getUserStore().login;
  if (userLogin) toast(`С возвращением, ${userLogin}`);
  else toast("Вы вошли как гость");
};

export default initializeApp;
