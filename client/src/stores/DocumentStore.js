import Storage from "../utils/storageManagement";
import defaultDocument from "../json/defaultDocument.json";
import { buildStore } from "../utils/store";

const store = buildStore({
  name: Storage.read("documentName") ?? defaultDocument.name,
  content: Storage.read("documentContent") ?? defaultDocument.content,
  id: Number(Storage.read("documentId")) ?? null,
});

const services = (store) => ({
  setName: (name) => {
    store.name = name;
    Storage.write("documentName", name);
  },
  setContent: (content) => {
    store.content = content;
    Storage.write("documentContent", content);
  },
  setId: (id) => {
    if (typeof id !== "number") id = Number(id);
    store.id = id;
    Storage.write("documentId", id);
  },
});

export default { store, services };
export const getDocumentStore = () => store;
export const getDocumentServices = () => services(store);
