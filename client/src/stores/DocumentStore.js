import { makeAutoObservable } from "mobx";

export default class DocumentStore {
  name = null;
  content = null;
  id = null;
  constructor() {
    makeAutoObservable(this);
  }

  get() {
    return {
      documentName: this.getName(),
      documentContent: this.getContent(),
      documentId: this.getId(),
    };
  }
  set({ documentName: name, documentContent: content, documentId: id }) {
    this.setName(name);
    this.setContent(content);
    this.setId(id);
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getContent() {
    return this.content;
  }
  setContent(content) {
    this.content = content;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}
