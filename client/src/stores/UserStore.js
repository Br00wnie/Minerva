import { makeAutoObservable } from "mobx";

export default class UserStore {
  login = null;
  constructor() {
    makeAutoObservable(this);
  }

  getLogin() {
    return this.login;
  }
  setLogin(login) {
    this.login = login;
  }
}
