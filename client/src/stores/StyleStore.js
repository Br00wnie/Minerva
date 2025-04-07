import { makeAutoObservable } from "mobx";

export default class StyleStore {
  name = null;
  content = null;
  description = null;
  isPublic = null;
  popularity = null;
  id = null;
  constructor() {
    makeAutoObservable(this);
  }

  get() {
    return {
      styleName: this.getName(),
      styleContent: this.getContent(),
      styleId: this.getId(),
      styleDescription: this.getDescription(),
      stylePopularity: this.getPopularity(),
      styleIsPublic: this.getIsPublic(),
    };
  }
  set({
    styleName: name,
    styleContent: content,
    styleId: id,
    styleDescription: description,
    stylePopularity: popularity,
    styleIsPublic: isPublic,
  }) {
    this.setName(name);
    this.setContent(content);
    this.setId(id);
    this.setDescription(description);
    this.setPopularity(popularity);
    this.setIsPublic(isPublic);
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

  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
  }

  getIsPublic() {
    return this.isPublic;
  }
  setIsPublic(isPublic) {
    this.isPublic = isPublic;
  }

  getPopularity() {
    return this.popularity;
  }
  setPopularity(popularity) {
    this.popularity = popularity;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}
