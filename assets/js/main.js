"use strict";
import API from "./api.js";
import Components from "./components.js";
import Scroll from "./components/scroll.js";

const photographerListEl = document.getElementById("photographer-list");
const selectedTags = [];

const toggleSelectedTags = (tagValue) => {
  const index = selectedTags.indexOf(tagValue);
  if (index === -1) selectedTags.push(tagValue);
  else selectedTags.splice(index, 1);
  loadTagList();
  loadPhotographerList();
};

const loadTagList = () => {
  const tagListEl = document.querySelector("nav .tag-list");
  API.getTagList().then((tags) => {
    const tagElementsData = tags.map((tag) => {
      return {
        value: tag,
        isSelected: selectedTags.includes(tag),
        onClick: toggleSelectedTags,
      };
    });

    tagListEl.replaceWith(Components.createTagListEl(tagElementsData));
  });
};

const loadPhotographerList = () => {
  API.getPhotographerListByTags(selectedTags).then((photographers) => {
    photographerListEl.innerHTML = "";
    photographers.forEach((photographer) => {
      const photographerEl = Components.createPhotographerEl(photographer);
      photographerListEl.appendChild(photographerEl);
    });
  });
};

const loadScrollToTopButton = () => Scroll.scrollBtn();

loadTagList();
loadPhotographerList();
loadScrollToTopButton();
