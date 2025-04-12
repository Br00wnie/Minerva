import toast from "./toast";
import UserStore from "../stores/UserStore";

const initializeApp = () => {
  const userLogin = UserStore.getLogin();
  if (userLogin) toast(`С возвращением, ${userLogin}`);
  else toast("Вы вошли как гость");
};

export default initializeApp;
