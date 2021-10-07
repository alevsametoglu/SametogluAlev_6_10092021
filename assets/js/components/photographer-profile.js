import ContactForm from "./contact-form.js";

export default class PhotographerProfileComponent {
  static getEl(photographer) {
    const photographerProfileEl = document.createElement("section");
    photographerProfileEl.setAttribute("aria-label", "photographer profils");
    photographerProfileEl.innerHTML = `
          <div  role="article" class="profil-photographers">
            <div>
              <div class="photographer-thumb">
                <a href="" title="${photographer.name}">
                  <h2>${photographer.name}</h2>
                </a>
                <p class="location">${photographer.city}, 
                ${photographer.country}</p>
                <p class="interest">${photographer.tagline}</p>
                <ul class="tag-list">
                  ${photographer.tags
                    .map(
                      (tag) =>
                        `<li  ><a><span class="tag">#${tag}</span> </a></li>`
                    )
                    .join("")}
                </ul>
              </div>
              <button type="submit" class="btn" aria-label="contact button">Contactez-moi</button>
            </div>
            <img
              class="user-image"
              src="./assets/images/Photographers ID Photos/${
                photographer.portrait
              }" alt="${photographer.name}"
            />            
          </div>         
    `;

    const contactFormInnerHTML = `
      <!-- modal formulaire -->
      <div class="form-dialog" role="dialog" aria-label="contact form">
        <form action="photographer-page.html" method="POST" id="contact-form">
          <header aria-label="contact form header">
            <h1 id="form-title">
              <span>Contactez-moi</span>
              <span id="pohotographer-name">${photographer.name}</span>
            </h1>
          </header>
          <button id="close-btn" title="Close form" type="button" aria-label="close button">
            <i class="fas fa-times close-form-icon" aria-hidden="true"></i>
          </button>
          <!--first name -->
          <div class="form-input">
            <label for="first-name" id="label-firstname">Prénom</label>
            <input
              name="first-name"
              id="first-name"
              aria-labelledby="label-firstname"
            />
            <span id="first-name-error" class="error-message"></span>
          </div>
          <!-- last name -->
          <div class="form-input">
            <label for="last-name" id="label-lastname">Nom</label>
            <input
              name="last-name"
              id="last-name"
              aria-labelledby="label-lastname"
            />
            <span id="last-name-error" class="error-message"></span>
            </div>
          <!-- email -->
          <div class="form-input">
            <label for="email" id="label-email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              aria-labelledby="label-email"
            />
            <span id="mail-error" class="error-message"></span>
          </div>
          <!-- message -->
          <div class="form-input">
            <label for="message" id="label-message">Votre message</label>
            <textarea
              name="message"
              id="message"
              cols="20"
              rows="4"
              aria-labelledby="label-message"
            ></textarea>
            <span id="message-error" class="error-message"></span>
          </div>
          <!-- submit -->
          <input
            type="button"
            value="Envoyer"
            class="form-submit-btn"
            title="Send"
          />
        </form>
      </div>
    `;
    photographerProfileEl.innerHTML += contactFormInnerHTML;

    const contactButton =
      photographerProfileEl.querySelector("div > div > button");

    const contactForm = new ContactForm(photographerProfileEl);
    contactButton.addEventListener("click", contactForm.openContactForm);
    return photographerProfileEl;
  }
}
