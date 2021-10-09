export default class LightBoxComponent {
  static getEl(source, title, type, onClickNext, onClickPrevious) {
    const lightBoxEl = document.createElement("div");
    lightBoxEl.classList.add("lightbox");
    lightBoxEl.setAttribute("role", "dialog");
    lightBoxEl.addEventListener("keydown", (e) => console.log(e.code));

    const closeButton = document.createElement("i");
    closeButton.className = "fas fa-times close-lightbox-icon";
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("title", '"Close dialog');
    closeButton.addEventListener("click", this.hide);
    lightBoxEl.appendChild(closeButton);

    const photoContainer = document.createElement("div");
    photoContainer.className = "lightbox-photo";

    const previousButton = document.createElement("span");
    previousButton.addEventListener("click", onClickPrevious);
    previousButton.innerHTML = `<i
            class="fas fa-chevron-left left-arrow-lightbox"
            role="button"
            title="Previous image"
        ></i>`;
    photoContainer.appendChild(previousButton);

    const mediaEl = document.createElement("span");
    mediaEl.className = "media";

    const figureContent =
      type === "image"
        ? `<img src="./assets/images/${source}" alt="${title}" />`
        : `<video src="./assets/images/${source}" alt="${title}" controls="controls"  />`;

    mediaEl.innerHTML = `
            <figure>
               ${figureContent}
            </figure>
            <figcaption>${title}</figcaption>
          `;
    photoContainer.appendChild(mediaEl);

    const nextButton = document.createElement("span");
    nextButton.addEventListener("click", onClickNext);
    nextButton.innerHTML = `<i
            class="fas fa-chevron-right right-arrow-lightbox"
            role="button"
            title="Next image"
        ></i>`;
    photoContainer.appendChild(nextButton);

    lightBoxEl.appendChild(photoContainer);
    return lightBoxEl;
  }

  static updateCurrentMedia(source, title, type) {
    console.log({ type });
    const mediaEl = document.querySelector("div.lightbox-photo > span.media");
    const figureContent =
      type === "image"
        ? `<img src="./assets/images/${source}" alt="${title}" />`
        : `<video src="./assets/images/${source}" alt="${title}" controls="controls" />`;

    mediaEl.innerHTML = `
    <figure>
      ${figureContent}
    </figure>
    <figcaption>${title}</figcaption>`;
  }

  static show() {
    const el = document.querySelector("div.lightbox");
    el.style.display = "flex";
  }

  static hide() {
    const el = document.querySelector("div.lightbox");
    el.style.display = "none";
  }
}
