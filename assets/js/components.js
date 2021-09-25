export default class ComponentFactory {
  static createPhotographerEl(photographer) {
    console.log(photographer);
    const el = document.createElement("article");
    el.classList.add("photographer-thumb");
    el.innerHTML = `
            <a href="./pages/photographers.html" title="${photographer.name}">
            <img
            class="user-image"
            src="./assets/images//Photographers ID Photos/${
              photographer.portrait
            }"
            alt="${photographer.name}"
            />
            <h2>${photographer.name}</h2>
        </a>
        <p class="location">${photographer.city}, ${photographer.country}</p>
        <p class="interest">${photographer.tagline}</p>
        <p class="price">${photographer.price}&euro;/jour</p>
        ${this.createTagList(photographer.tags)}
    `;
    return el;
  }

  static createTagList(tags) {
    return ` <ul class="tag-list">
              ${tags
                .map(
                  (tag) => ` <li><a><span class="tag">#${tag}</span></a></li>`
                )
                .join("")}
          </ul>`;
  }
}
