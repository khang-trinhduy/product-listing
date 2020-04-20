import product from "../data/product.js";
window.$$ = document.querySelectorAll.bind(document);
window.$ = document.querySelector.bind(document);

const PICTURE_POOL = [
  "assets/slides/1PN_2_large.png",
  "assets/slides/1PN+1_1_large.png",
  "assets/slides/1PN+1_2_large.png",
  "assets/slides/1PN+1_3_large.png",
  "assets/slides/1PN+1_4_large.png",
  "assets/slides/2PN+0.5_2.png",
  "assets/slides/3PN_2_large.png",
  "assets/slides/3PN_3_large.png",
  "assets/slides/2PN+0.5_3.png",
  "assets/slides/1PN_3_large.png",
];

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

window.on("load", () => {
  let code = window.location.search.split("room=")[1];
  const currentProduct = product.find((e) => e.code === code);

  let carousel = $(".carousel");

  let slides = getPictures(currentProduct);
  slides.forEach((slide) => {
    carousel.appendChild(slide);
  });
  setInterval(() => swapPicture(slides), 3000);
});

function getPictures(product) {
  let result = [];
  const picture = product.picture;
  let defaultPicture = createPicture(picture);
  defaultPicture.classList.add("active");
  result.push(defaultPicture);
  return [...result, ...createMultiplePictures(getRandomPictures(picture))];
}

function swapPicture(pictures) {
  let showing = pictures.find((picture) =>
    picture.classList.contains("active")
  );
  let currentIndex = pictures.indexOf(showing);
  let nextPicture =
    pictures[currentIndex + 1 >= pictures.length ? 0 : currentIndex + 1];
  showing.classList.remove("active");
  nextPicture.classList.add("active");
}

function getRandomPictures(except) {
  let random = getRandomInt(PICTURE_POOL.length);
  let picture = PICTURE_POOL[random];
  let result = [];
  while (result.length < 2) {
    while (picture === except || result.indexOf(picture) > -1) {
      random = getRandomInt(PICTURE_POOL.length);
      picture = PICTURE_POOL[random];
    }
    result.push(picture);
  }
  return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createPicture(picture) {
  let image = document.createElement("img");
  image.setAttribute("src", picture);
  return image;
}

function createMultiplePictures(pictures) {
  let result = [];
  pictures.forEach((picture) => {
    const image = createPicture(picture);
    result.push(image);
  });
  return result;
}
