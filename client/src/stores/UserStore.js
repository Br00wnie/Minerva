import { makeAutoObservable } from "mobx";

export default class UserStore {
  login = null;
  constructor() {
    makeAutoObservable(this);
  }

  setLogin(login) {
    this.login = login;
  }
  getLogin() {
    return this.login;
  }
}
