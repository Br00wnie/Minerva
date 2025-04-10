import toast from "./toast";
import stores from "../stores/index";

const initializeApp = () => {
  const userLogin = stores.UserStore.getLogin();
  if (userLogin) toast(`С возвращением, ${userLogin}`);
  else toast("Вы вошли как гость");
};

export default initializeApp;
