export default class Scroll {
  static scrollBtn() {
    const button = document.querySelector(".btn-content");

    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    });
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
