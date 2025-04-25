import { buildStore } from "../incrum/store";

const store = buildStore({
  openModalId: null,
});

const services = (store) => ({
  openModal: (openModalId) => {
    store.openModalId = openModalId;
  },
  closeModal: () => {
    store.openModalId = null;
  },
});

export default { store, services };
export const getModalStore = () => store;
export const getModalServices = () => services(store);
