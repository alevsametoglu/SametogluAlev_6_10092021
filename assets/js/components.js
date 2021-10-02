export default class ComponentFactory {
  static createPhotographerEl(photographer) {
    const photographerEl = document.createElement("article");
    photographerEl.classList.add("photographer-thumb");
    photographerEl.innerHTML = `
            <a href="./photographers.html?id=${photographer.id}" title="${photographer.name}">
            <img
            class="user-image"
            src="./assets/images/Photographers ID Photos/${photographer.portrait}"
            alt="${photographer.name}"
            />
            <h2>${photographer.name}</h2>
        </a>
        <p class="location">${photographer.city}, ${photographer.country}</p>
        <p class="interest">${photographer.tagline}</p>
        <p class="price">${photographer.price}&euro;/jour</p>       
    `;

    const tagElementsData = photographer.tags.map((tag) => {
      return { value: tag };
    });
    const tagListEl = this.createTagListEl(tagElementsData);
    photographerEl.appendChild(tagListEl);
    return photographerEl;
  }

  static createTagListEl(tagElementsData) {
    const tagListEl = document.createElement("ul");
    tagListEl.classList.add("tag-list");

    tagElementsData.forEach((datum) => {
      const tagEl = document.createElement("li");
      tagEl.addEventListener("click", () =>
        datum.toggleSelectedTags(datum.value)
      );
      tagEl.innerHTML = `<a><span class="tag ${
        datum.isSelected ? "selected" : ""
      }">#${datum.value}</span></a>`;

      tagListEl.appendChild(tagEl);
    });

    return tagListEl;
  }

  static createPhotoGallerySortEl(onChange) {
    const sortEl = document.createElement("article");
    sortEl.classList.add("trier-par");
    sortEl.innerHTML = `    
        <span id="trier">Trier par</span>
        <div class="selectdiv">
          <label for=""></label>
        </div>
    `;

    const selectEl = document.createElement("select");
    selectEl.addEventListener("change", (e) => onChange(e.target.value));
    selectEl.classList.add("menu-dropdownn");
    selectEl.innerHTML = `
        <option value="Popularite">Popularite</option>
        <option value="Date">Date</option>
        <option value="Titre">Titre</option>
      `;

    sortEl.querySelector(".selectdiv label").appendChild(selectEl);

    return sortEl;
  }
}
