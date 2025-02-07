import { makeAutoObservable } from "mobx";

export default class DocumentStore {
  name = null;
  content = null;
  constructor() {
    makeAutoObservable(this);
  }

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  setContent(content) {
    this.content = content;
  }
  getContent() {
    return this.content;
  }
}
