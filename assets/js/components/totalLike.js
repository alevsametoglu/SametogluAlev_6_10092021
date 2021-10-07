export default class TotalLikeComponent {
  static getEl(price, totalLike) {
    const el = document.createElement("div");
    el.classList.add("like-price-wrapper");
    el.setAttribute("aria-label", "price and likes");
    el.setAttribute("role", "textbox");
    el.innerHTML = `
          <div class="like-price">
            <span><span class='like-count'>${totalLike}</span> <i class="fas fa-heart"></i> </span>
            <span>${price}&euro;/jour</span>
          </div>
        `;
    return el;
  }

  static updateTotalLike(totalLike) {
    const el = document.querySelector("div.like-price>span>span.like-count");
    el.textContent = totalLike;
  }
}
