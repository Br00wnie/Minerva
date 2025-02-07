import { makeAutoObservable } from "mobx";

export default class ModalStore {
  openModalId = null;
  constructor() {
    makeAutoObservable(this);
  }

  getOpenModalId() {
    return this.openModalId;
  }

  openModal(modalId) {
    this.openModalId = modalId;
  }
  closeModal() {
    this.openModalId = null;
  }
}
