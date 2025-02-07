import { makeAutoObservable } from "mobx";

export default class StyleStore {
  name = null;
  content = null;
  description = null;
  isPublic = null;
  popularity = null;
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

  setDescription(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }

  setIsPublic(isPublic) {
    this.isPublic = isPublic;
  }
  getIsPublic() {
    return this.isPublic;
  }

  setPopularity(popularity) {
    this.popularity = popularity;
  }
  getPopularity() {
    return this.popularity;
  }
}
