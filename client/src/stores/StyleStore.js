import Storage from "../utils/storageManagement";
import defaultStyle from "../json/defaultStyle.json";
import { buildStore } from "../utils/store";

const store = buildStore({
  name: Storage.read("styleName") || defaultStyle.name,
  description: Storage.read("styleDescription") || defaultStyle.description,
  content: JSON.parse(Storage.read("styleContent")) || defaultStyle.content,
  id: Storage.read("styleId") || null,
  popularity: Storage.read("stylePopularity") || null,
  isPublic: Storage.read("styleIsPublic") || null,
});

const services = (store) => ({
  setName: (name) => {
    store.name = name;
    Storage.write("styleName", name);
  },
  setDescription: (description) => {
    store.description = description;
    Storage.write("styleDescription", description);
  },
  setContent: (content) => {
    if (typeof content === "string") content = JSON.parse(content);
    store.content = content;
    Storage.write("styleContent", content);
  },
  setId: (id) => {
    store.id = id;
    Storage.write("styleId", id);
  },
  setPopularity: (popularity) => {
    store.popularity = popularity;
    Storage.write("stylePopularity", popularity);
  },
  setIsPublic: (isPublic) => {
    store.isPublic = isPublic;
    Storage.write("styleIsPublic", isPublic);
  },
});

export default { store, services };
export const getStyleStore = () => store;
export const getStyleServices = () => services(store);
