import { makeAutoObservable } from "mobx";
import Storage from "../utils/storageManagement";

class UserStore {
  login;
  constructor() {
    this.login = Storage.read("userLogin") || null;
    makeAutoObservable(this);
  }

  getLogin() {
    return this.login;
  }
  setLogin = (login) => {
    this.login = login;
    Storage.write("userLogin", login);
  };
}

export default new UserStore();
