import Storage from "@utils/storageManagement";
import checkToken from "@utils/tokenChecking";
import { buildStore } from "@incrum/store";

const store = buildStore({
  login:
    checkToken() && Storage.has("userLogin") ? Storage.read("userLogin") : null,
});

const services = (store) => ({
  setLogin: (login) => {
    store.login = login;
    Storage.write("userLogin", login);
  },
});

export default { store, services };
export const getUserStore = () => store;
export const getUserServices = () => services(store);
