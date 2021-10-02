export default class Validation {
  static isRequired = (text) => text !== "";
  static minLength = (text, length) => text.trim().length >= length;
  static checkEmail = (email) => {
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailRegex.test(email);
  };
}
