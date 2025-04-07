import { useEffect } from "react";
import Storage from "../utils/storageManagement";
import checkToken from "../utils/tokenChecking";
import toast from "../utils/toast";
import UserStore from "../stores/UserStore";

const useAuthCheck = () => {
  useEffect(() => {
    if (checkToken()) {
      const userLogin = Storage.read("userLogin");
      UserStore.setLogin(userLogin);
      toast(`С возвращением, ${userLogin}`);
    } else {
      toast("Вы вошли как гость");
    }
  }, []);
};

export default useAuthCheck;
