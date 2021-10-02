import Validation from "../validation.js";

export default class ContactForm {
  containerElement;
  contactFormContainer;
  contactForm;

  constructor(containerElement) {
    this.containerElement = containerElement;
    this.contactFormContainer = containerElement.querySelector(".form-dialog");
    this.contactForm = containerElement.querySelector("#contact-form");
    const submitBtn = containerElement.querySelector(".form-submit-btn");
    submitBtn.addEventListener("click", this.validateForm);
    const closeButton = this.containerElement.querySelector("#close-btn");
    closeButton.addEventListener("click", this.closeContactForm);
  }

  openContactForm = () => {
    this.contactFormContainer.style.display = "flex";
  };

  closeContactForm = () => {
    this.contactFormContainer.style.display = "none";
    this.contactForm.reset();
  };
  validateForm = () => {
    console.log({ containerElement: this.containerElement });
    const firstNameEl = this.containerElement.querySelector("#first-name");
    const errorMessageFirstName =
      this.containerElement.querySelector("#first-name-error");
    const lastNameEl = this.containerElement.querySelector("#last-name");
    const errorMessageLastName =
      this.containerElement.querySelector("#last-name-error");
    const adressMailEl = this.containerElement.querySelector("#email");
    const errorMessageMail = this.containerElement.querySelector("#mail-error");
    const textMessageEl = this.containerElement.querySelector("#message");
    const textMessageError =
      this.containerElement.querySelector("#message-error");
    let isFormValid = true;
    const firstName = firstNameEl.value;
    const isFistNameValid =
      Validation.minLength(firstName, 2) && Validation.isRequired(firstName);
    isFormValid = isFormValid && isFistNameValid;
    console.log(errorMessageFirstName);
    if (!Validation.isRequired(firstName)) {
      errorMessageFirstName.innerHTML =
        "Cette case ne peut pas être laissée vide.";
    } else if (!Validation.minLength(firstName, 2)) {
      errorMessageFirstName.innerHTML =
        "Veuillez entrer 2 caractères ou plus pour le champ du prenom.";
    } else {
      errorMessageFirstName.innerHTML = "";
    }

    const lastName = lastNameEl.value;
    const isLastNameValid =
      Validation.minLength(lastName, 2) && Validation.isRequired(lastName);
    isFormValid = isFormValid && isLastNameValid;
    if (!Validation.isRequired(lastName)) {
      errorMessageLastName.innerHTML =
        "Cette case ne peut pas être laissée vide.";
    } else if (!Validation.minLength(lastName, 2)) {
      errorMessageLastName.innerHTML =
        "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    } else {
      errorMessageLastName.innerHTML = "";
    }

    const adressMail = adressMailEl.value;
    const isEmailValid =
      Validation.isRequired(adressMail) && Validation.checkEmail(adressMail);
    isFormValid = isFormValid && isEmailValid;

    if (!Validation.isRequired(adressMail)) {
      errorMessageMail.innerHTML = "Cette case ne peut pas être laissée vide.";
    } else if (!Validation.checkEmail(adressMail)) {
      errorMessageMail.innerHTML = "Adresse e-mail invalide";
    } else {
      errorMessageMail.innerHTML = "";
    }
    const textMessage = textMessageEl.value;
    const isTextMessage = Validation.isRequired(textMessage);
    isFormValid = isFormValid && isTextMessage;
    if (!Validation.isRequired(textMessage)) {
      textMessageError.innerHTML = "Cette case ne peut pas être laissée vide.";
    } else {
      textMessageError.innerHTML = "";
    }
    if (isFormValid) {
      console.log({ firstName, lastName, adressMail, textMessage });
      this.closeContactForm();
    }
  };
}
