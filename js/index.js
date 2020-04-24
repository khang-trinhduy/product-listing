import product from "../data/product.js";

window.$$ = document.querySelectorAll.bind(document);
window.$ = document.querySelector.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

let PRODUCT_SIZE = 18;
let PRODUCTS = [];
let PRODUCT_CONTAINER = null;
let IMAGE_SRC = [
  "assets/images/1PN_1_medium.png",
  "assets/images/1PN+1_1_medium.png",
  "assets/images/1PN+1_2_medium.png",
  "assets/images/2PN_1_medium.png",
  "assets/images/2PN_2_medium.png",
  "assets/images/2PN+0.5_1_medium.png",
  "assets/images/2PN+0.5_2_medium.png",
  "assets/images/2PN+1_1_medium.png",
  "assets/images/2PN+1_2_medium.png",
  "assets/images/2PN+1(2Toilet)_1_medium.png",
  "assets/images/3PN_1_medium.png",
  "assets/images/3PN_2_medium.png",
];

window.addEventListener("load", function (e) {
  this.window.data = product;
  PRODUCT_CONTAINER = document.querySelector(".product-list");
  loadProduct(PRODUCT_SIZE);
});

function loadProduct(size) {
  let products = product.slice(0, size);
  products.forEach((product) => {
    addProductCard(product);
  });
  PRODUCTS.push(products);
}

function addProductCard(product) {
  let card = createProductCard(product);
  PRODUCT_CONTAINER.append(card);
}

function createProductCard(product) {
  let container = document.createElement("div");
  container.classList.add("product-card");

  let topDiv = document.createElement("div");
  topDiv.classList.add("top-picture");
  let src = product.picture;
  topDiv.style.backgroundImage = 'url(' + src + ')'
  container.appendChild(topDiv);
  // let img = document.createElement("img");
  // img.setAttribute("src", src);
  // img.setAttribute("alt", "Hình ảnh minh họa");
  // topDiv.appendChild(img);

  container.addEventListener("mouseenter", () => handleMouseEnter(topDiv));
  container.addEventListener("mouseleave", () => handleMouseLeave(topDiv));
  // after image
  let bottomDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  titleDiv.classList.add("title-content");
  let title = document.createElement("p");
  title.textContent = "Vinhome Grand Park";
  titleDiv.appendChild(title);
  bottomDiv.appendChild(titleDiv);

  let link = document.createElement("a");
  link.setAttribute("href", "/detail.html?room=" + product.code);
  link.textContent = "CĂN HỘ " + product.code + " - TÒA " + product.block;
  bottomDiv.appendChild(link);

  bottomDiv.classList.add("bottom-content");
  container.appendChild(bottomDiv);

  let icons = createIcons(product);
  bottomDiv.appendChild(icons);

  let noteDiv = document.createElement("div");
  noteDiv.classList.add("price-note");
  let priceNote = document.createElement("p");
  priceNote.classList.add("note-line");
  priceNote.textContent = "Giá niêm yết";
  let noteImg = document.createElement("img");
  noteImg.classList.add("note-img");
  noteImg.setAttribute("src", "assets/note.png");
  noteDiv.appendChild(priceNote);
  // noteDiv.appendChild(noteImg);
  bottomDiv.appendChild(noteDiv);

  let priceDiv = document.createElement("div");
  priceDiv.classList.add("price-real");
  let priceText = document.createElement("p");
  priceText.classList.add("price-line");
  priceDiv.appendChild(priceText);
  priceText.textContent = parseInt(product.displayPrice).toLocaleString(
    "it-IT",
    {
      style: "currency",
      currency: "VND",
    }
  );
  bottomDiv.appendChild(priceDiv);

  let buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-holder");
  let button = document.createElement("div");
  button.classList.add("buy-button");
  button.textContent = "Mua ngay";
  button.on("click", (e) => productCardClickHandle(e));
  buttonDiv.appendChild(button);
  container.addEventListener("click", () => productCardClickHandle(product));

  bottomDiv.appendChild(buttonDiv);
  return container;
}

function handleMouseEnter(div) {
  div.classList.add("active");
}
function handleMouseLeave(div) {
  div.classList.remove("active");
}

function getRandomImage(array) {
  let random = getRandomInt(array.length);
  return array[random];
}

function productCardClickHandle(product) {
  window.location.href = `/detail.html?room=${product.code}`;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createIcons(product) {
  let ROOM_ICON = document.createElement("img");
  ROOM_ICON.setAttribute("src", "assets/room.png");
  ROOM_ICON.setAttribute("alt", "room icon");

  let AREA_ICON = document.createElement("img");
  AREA_ICON.setAttribute("src", "assets/area.png");
  AREA_ICON.setAttribute("alt", "area icon");

  let TOILET_ICON = document.createElement("img");
  TOILET_ICON.setAttribute("src", "assets/toilet.png");
  TOILET_ICON.setAttribute("alt", "toilet icon");

  let COMPASS = document.createElement("img");
  COMPASS.setAttribute("src", "assets/compass.jpg");
  COMPASS.setAttribute("alt", "compass icon");

  let iconDiv = document.createElement("div");
  iconDiv.classList.add("icon-content");

  iconDiv.appendChild(ROOM_ICON);
  let room = document.createElement("p");
  room.classList.add("room-text");
  room.textContent = product.bedroom;
  iconDiv.appendChild(room);

  iconDiv.appendChild(AREA_ICON);
  let area = document.createElement("p");
  area.classList.add("area-text");
  area.textContent = product.area2 + "m2";
  iconDiv.appendChild(area);

  iconDiv.appendChild(TOILET_ICON);
  let toilet = document.createElement("p");
  toilet.classList.add("toilet-text");
  toilet.textContent = getToiletNumber(product.bedroom);
  iconDiv.appendChild(toilet);

  iconDiv.appendChild(COMPASS);
  let view = document.createElement("p");
  view.classList.add("view-text");
  view.textContent = product.vDirection;
  iconDiv.appendChild(view);
  return iconDiv;
}

function getToiletNumber(room) {
  switch (room.toLowerCase()) {
    case "studio":
    case "1pn":
    case "2pn1wc":
      return 1;
    case "2pn2wc":
    case "3pn":
      return 2;
    default:
      return "unknown";
  }
}
