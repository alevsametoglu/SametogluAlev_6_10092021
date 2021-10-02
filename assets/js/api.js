"use strict";
const PATH = "./assets/data/photographer.json";
const getData = () => fetch(PATH).then((response) => response.json());

export default class API {
  static getPhotographerList() {
    return getData().then((data) => data.photographers);
  }

  static getPhotographerById(id) {
    return this.getPhotographerList().then((photographers) =>
      photographers.find((photographer) => photographer.id == id)
    );
  }

  static getPhotographerListByTags(tags) {
    return this.getPhotographerList().then((photographers) => {
      if (tags.length === 0) return photographers;

      return photographers.filter((photographer) =>
        tags.some((tag) => photographer.tags.includes(tag))
      );
    });
  }

  static getTagList() {
    return this.getPhotographerList().then((photographers) => {
      const tags = [];
      photographers.forEach((photographer) => {
        photographer.tags.forEach((tag) => {
          if (!tags.includes(tag)) tags.push(tag);
        });
      });

      return tags;
    });
  }

  static getPhotographerMedia(photographerId) {
    return getData().then((data) => {
      const photographer = data.photographers.find(
        (x) => x.id == photographerId
      );
      const firstName = photographer.name.split(" ")[0];
      console.log({ firstName });

      return data.media
        .filter((photo) => photo.photographerId == photographerId)
        .map((photo) => {
          return {
            ...photo,
            source: `${firstName}/${photo.image || photo.video}`,
          };
        });
    });
  }
}
