import Storage from "../utils/storageManagement";
import defaultStyle from "../json/defaultStyle.json";
import { buildStore } from "../incrum/store";

const store = buildStore({
  name: Storage.read("styleName") ?? defaultStyle.name,
  description: Storage.read("styleDescription") ?? defaultStyle.description,
  content: JSON.parse(Storage.read("styleContent")) ?? defaultStyle.content,
  id: Number(Storage.read("styleId")) ?? null,
  popularity: Number(Storage.read("stylePopularity")) ?? null,
  isPublic: (() => {
    const storageValue = Storage.read("styleIsPublic");
    return storageValue !== null ? storageValue.toLowerCase() === "true" : null;
  })(),
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
    if (typeof id !== "number") id = Number(id);
    store.id = id;
    Storage.write("styleId", id);
  },
  setPopularity: (popularity) => {
    if (typeof popularity !== "number") popularity = Number(popularity);
    store.popularity = popularity;
    Storage.write("stylePopularity", popularity);
  },
  setIsPublic: (isPublic) => {
    if (typeof isPublic === "string")
      isPublic = isPublic.toLowerCase() === "true";
    store.isPublic = isPublic;
    Storage.write("styleIsPublic", isPublic);
  },
});

export default { store, services };
export const getStyleStore = () => store;
export const getStyleServices = () => services(store);
