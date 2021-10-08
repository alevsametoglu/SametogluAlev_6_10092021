const getMediaListElements = (mediaList, onClickFav, onClickMedia) => {
  const mediaListElements = mediaList.map((media, index) => {
    const mediaEl = document.createElement("article");
    mediaEl.classList.add("media");

    const figureContent = !!media.image
      ? `<img src="./assets/images/${media.source}" alt="${media.title}" />`
      : `<video src="./assets/images/${media.source}" alt="${media.title}" controls="controls"   aria-label="${media.title}"/>`;

    mediaEl.innerHTML += `
          <figure tabindex="0">${figureContent}</figure>
          <figcaption>
              <p>${media.title}</p>
              <div  tabindex="0"    class="likes">
                  <span aria-label="${media.likes}like" >${media.likes}</span>                 
              </div>
          </figcaption>
     `;

    const figure = mediaEl.querySelector("figure");
    figure.addEventListener("click", () => onClickMedia(index));

    const likeDiv = mediaEl.querySelector("div.likes");
    const icon = document.createElement("i");
    icon.classList.add("fa-heart");
    icon.classList.add("far");
    let isLiked = false;
    icon.addEventListener("click", () => {
      isLiked = !isLiked;
      onClickFav(media.id);
      icon.classList.toggle("fas");
      const likeCountEl = likeDiv.querySelector("span");
      likeCountEl.innerHTML = isLiked ? media.likes + 1 : media.likes;
    });
    likeDiv.appendChild(icon);
    return mediaEl;
  });

  return mediaListElements;
};

export default class PhotoGalleryComponent {
  static getEl(mediaList, onClickFav, onClickMedia) {
    const galleryEl = document.createElement("section");
    galleryEl.classList.add("photo-galeri");
    galleryEl.setAttribute("aria-label", "photograps galeri");

    const mediaElements = getMediaListElements(
      mediaList,
      onClickFav,
      onClickMedia
    );
    mediaElements.forEach((mediaEl) => galleryEl.appendChild(mediaEl));

    return galleryEl;
  }

  static updateMediaList(mediaList, onClickFav, onClickMedia) {
    const galleryEl = document.querySelector("section.photo-galeri");
    galleryEl.innerHTML = ``;
    const mediaElements = getMediaListElements(
      mediaList,
      onClickFav,
      onClickMedia
    );
    mediaElements.forEach((mediaEl) => galleryEl.appendChild(mediaEl));
  }
}
