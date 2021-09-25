"use strict";
import API from "./api.js";
import Components from "./components.js";

const photographerListEl = document.getElementById("photographer-list");

const loadPhotographerList = () => {
  API.getPhotographerList().then((photographers) => {
    photographers.forEach((photographer) => {
      const photographerEl = Components.createPhotographerEl(photographer);
      photographerListEl.appendChild(photographerEl);
    });
  });
};

loadPhotographerList();
