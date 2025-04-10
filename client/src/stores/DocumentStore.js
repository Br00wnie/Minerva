import { makeAutoObservable } from "mobx";
import Storage from "../utils/storageManagement";
import defrost from "../utils/defrosting";
import defaultDocument from "../json/defaultDocument.json";

export default class DocumentStore {
  name;
  content;
  id;
  constructor() {
    this.name = Storage.read("documentName") || defrost(defaultDocument.name);
    this.content =
      Storage.read("documentContent") || defrost(defaultDocument.content);
    this.id = Storage.read("documentId") || null;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get() {
    return {
      name: this.getName(),
      content: this.getContent(),
      id: this.getId(),
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
    Storage.write("documentName", name);
  }

  getContent() {
    return this.content;
  }
  setContent(content) {
    this.content = defrost(content);
    Storage.write("documentContent", this.content);
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
    Storage.write("documentId", id);
  }
}
