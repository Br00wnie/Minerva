import Cookies from "js-cookie";
import Storage from "../utils/storageManagement";
import checkToken from "../utils/tokenChecking";
import { buildStore } from "../utils/store";

const store = buildStore({
  login: checkToken() ? Storage.read("userLogin") : null,
});

const services = (store) => ({
  setLogin: (login) => {
    store.login = login;
    Storage.write("userLogin", login);
    if (login === null) Cookies.remove("token");
  },
});

export default { store, services };
export const getUserStore = () => store;
export const getUserServices = () => services(store);
