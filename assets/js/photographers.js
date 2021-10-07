import API from "./api.js";
import ComponentFactory from "./components.js";
import PhotoGalleryComponent from "./components/photoGallery.js";
import TotalLikeComponent from "./components/totalLike.js";
import LightBoxComponent from "./components/lightBox.js";
import Helper from "./helper.js";
import PhotographerProfileComponent from "./components/photographer-profile.js";

const searchParameters = Helper.getSearchParams();
const photographerId = searchParameters.id;
let photographer;
let mediaList;
let sliderLightBoxActiveIndex = 0;

const likedPhotoIds = [];

const loadData = async () => {
  if (!photographerId) {
    window.location.href = "./index.html";
    return;
  }

  photographer = await API.getPhotographerById(photographerId);
  if (!photographer) {
    window.location.href = "./index.html";
    return;
  }
  mediaList = await API.getPhotographerMedia(photographerId).then((list) =>
    list.sort((media1, media2) => (media1.likes > media2.likes ? -1 : 1))
  );
};

const updateSliderMedia = () => {
  const media = mediaList[sliderLightBoxActiveIndex];
  LightBoxComponent.updateCurrentMedia(
    media.source,
    media.title,
    !!media.image ? "image" : "video"
  );
};

const getTotalLike = () => {
  let totalLike = 0;
  mediaList.forEach((media) => (totalLike += media.likes));
  totalLike += likedPhotoIds.length;

  return totalLike;
};

const togglePhotoLiked = (photoId) => {
  const index = likedPhotoIds.indexOf(photoId);
  if (index === -1) likedPhotoIds.push(photoId);
  else likedPhotoIds.splice(index, 1);

  const totalLike = getTotalLike();
  TotalLikeComponent.updateTotalLike(totalLike);
};

const loadPhotographerProfile = () => {
  const mainEl = document.querySelector("main");
  const photographerProfileEl =
    PhotographerProfileComponent.getEl(photographer);
  mainEl.appendChild(photographerProfileEl);
};

const addGallerySortEl = () => {
  const mainEl = document.querySelector("main");
  const sortEl = ComponentFactory.createPhotoGallerySortEl((value) => {
    switch (value) {
      case "Titre":
        mediaList.sort((media1, media2) =>
          media1.title > media2.title ? 1 : -1
        );
        break;
      case "Popularite":
        mediaList.sort((media1, media2) =>
          media1.likes > media2.likes ? -1 : 1
        );
        break;
      case "Date":
        mediaList.sort((media1, media2) =>
          media1.date > media2.date ? -1 : 1
        );
        break;

      default:
        break;
    }

    PhotoGalleryComponent.updateMediaList(
      mediaList,
      togglePhotoLiked,
      clickMedia
    );
  });
  mainEl.appendChild(sortEl);
};

const clickMedia = (index) => {
  sliderLightBoxActiveIndex = index;
  updateSliderMedia();
  LightBoxComponent.show();
};

const loadPhotoGallery = () => {
  const mainEl = document.querySelector("main");

  const composedMediaList = mediaList.map((media) => {
    const isLikedByUser = likedPhotoIds.includes(media.id);
    return {
      ...media,
      isLikedByUser,
      likes: isLikedByUser ? media.likes + 1 : media.likes,
    };
  });

  const galleryEl = PhotoGalleryComponent.getEl(
    composedMediaList,
    togglePhotoLiked,
    clickMedia
  );

  mainEl.appendChild(galleryEl);
};

const loadTotalLike = () => {
  const mainEl = document.querySelector("main");
  const totalLike = getTotalLike();

  const totalLikeEl = TotalLikeComponent.getEl(photographer.price, totalLike);
  mainEl.appendChild(totalLikeEl);
};

const sliderNextImage = () => {
  if (mediaList.length > sliderLightBoxActiveIndex) {
    sliderLightBoxActiveIndex++;
    updateSliderMedia();
  }
};

const sliderPreviousImage = () => {
  console.log(sliderLightBoxActiveIndex);
  if (sliderLightBoxActiveIndex > 0) {
    sliderLightBoxActiveIndex--;
    updateSliderMedia();
  }
};

const loadPhotoSliderLightbox = () => {
  const mainEl = document.querySelector("main");
  const media = mediaList[sliderLightBoxActiveIndex];
  console.log({ media });

  const lightBox = LightBoxComponent.getEl(
    media.source,
    media.title,
    media.image ? "image" : "video",
    sliderNextImage,
    sliderPreviousImage
  );

  mainEl.appendChild(lightBox);
  loadKeyboardNavigation();
};

const loadKeyboardNavigation = () => {
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") sliderNextImage();
    if (e.code === "ArrowLeft") sliderPreviousImage();
  });
};

const loadPage = async () => {
  await loadData();
  loadPhotographerProfile();
  addGallerySortEl();
  loadPhotoGallery();
  loadTotalLike();
  loadPhotoSliderLightbox();
};

loadPage();
