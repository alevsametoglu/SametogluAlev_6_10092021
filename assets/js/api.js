"use strict";
const PATH = "./assets/data/photographer.json";
const getData = () => fetch(PATH).then((response) => response.json());

export default class API {
  static getPhotographerList() {
    return getData().then((data) => data.photographers);
  }

  static getPhotographerMedia(photographerId) {
    return getData().then((data) =>
      data.media.filter((photo) => photo.photographerId === photographerId)
    );
  }
}
