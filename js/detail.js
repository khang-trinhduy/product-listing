import product from "../data/product.js";
import quote from "../data/quote.js";
import utilities from "../data/utility.js";
window.$$ = document.querySelectorAll.bind(document);
window.$ = document.querySelector.bind(document);

const PICTURE_POOL = [
  "assets/slides/1PN_2_large.png",
  "assets/slides/1PN+1_1_large.png",
  "assets/slides/1PN+1_2_large.png",
  "assets/slides/1PN+1_3_large.png",
  "assets/slides/1PN+1_4_large.png",
  "assets/slides/2PN+0.5_2.png",
  "assets/slides/3PN_3_large.png",
  "assets/slides/2PN+0.5_3.png",
  "assets/slides/1PN_3_large.png",
];

const BEDROOM_POOL = [
  "assets/br/1br+.jpg",
  "assets/br/2br+.jpg",
  "assets/br/2br.jpg",
  "assets/br/3br.jpg",
  "assets/br/stu.jpg",
];

let MANUAL = false;
let CURRENT_SLIDE = 0;
let CURRENT_TAB = 0;

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

window.on("load", () => {
  let code = window.location.search.split("room=")[1];
  const currentProduct = product.find((e) => e.code === code);

  let carousel = $(".carousel");

  let intro = $(".intro-content");
  intro.textContent = getIntro(currentProduct.bedroom);

  let loc = $(".room-direction");
  loc.textContent = `Căn hộ có hướng ban công là Hướng ${currentProduct.vDirection}`;

  let mainImg = $(".main-img");
  mainImg.setAttribute("src", getMainImage(currentProduct.bedroom));

  let util = $(".util-content");
  util.appendChild(getUtilities());

  let navLinks = $$(".nav-link");
  setNavLinkEvent(navLinks);

  let slides = getPictures(currentProduct);
  slides.forEach((slide) => {
    carousel.appendChild(slide);
  });

  setInterval(() => swapPicture(slides), 3000);

  const circles = $$(".manual-holder");
  setCircleEvent(circles);

  const next = $(".change-button.next");
  const previous = $(".change-button.previous");
  next.on("click", () => {
    MANUAL = true;
    moveToNextSlide();
    changeCircle();
  });
  previous.on("click", () => {
    MANUAL = true;
    moveToPreviousSlide();
    changeCircle();
  });
});

function getMainImage(br) {
  switch (br.toLowerCase()) {
    case "studio":
      return BEDROOM_POOL[4];
    case "3pn":
      return BEDROOM_POOL[3];
    case "1pn":
      return BEDROOM_POOL[0];
    default:
      return BEDROOM_POOL[1];
  }
}

function setNavLinkEvent(navs) {
  navs.forEach((nav, i) => {
    nav.on("click", (event) => {
      CURRENT_TAB = i;
      changeTab(event);
      changeTabDiv();
    });
  });
}

function changeTab(event) {
  const activeNav = $(".nav-link.active");
  activeNav.classList.remove("active");
  let nav = event.target;
  if (!nav.classList.contains("active")) {
    nav.classList.add("active");
  }
}

function changeTabDiv() {
  const activeTabDiv = $(".tab-item.active");
  activeTabDiv.classList.remove("active");
  const tabDivs = $$(".tab-item");
  tabDivs[CURRENT_TAB].classList.add("active");
}

function getUtilities() {
  const util = utilities.sort((a, b) => {
    let x = a.slice(0, 1);
    let y = b.slice(0, 1);
    if (x > y) {
      return 1;
    } else if (x === y) {
      return 0;
    } else return -1;
  });
  const ul = document.createElement("ul");
  for (let i = 0; i < util.length; i++) {
    const ut = util[i];
    const li = document.createElement("li");
    li.textContent = ut;
    ul.appendChild(li);
  }
  return ul;
}

function getIntro(code) {
  code = code.toLowerCase();
  code = code.replace("+", "p");
  code = code.replace("1", "o");
  code = code.replace("2", "t");
  code = code.replace("3", "th");
  return quote[code];
}

function setCircleEvent(circles) {
  circles.forEach((circle, i) => {
    circle.on("click", (e) => {
      handleCircleClick(e);
      CURRENT_SLIDE = i;
      changeSlide();
    });
  });
}

function handleCircleClick(event) {
  MANUAL = true;
  let circle = event.target;
  if (circle.nodeName === "IMG") {
    circle = circle.closest(".manual-holder");
  }
  const activeCircle = $(".manual-holder.active");
  activeCircle.classList.remove("active");
  if (!circle.classList.contains("active")) {
    circle.classList.add("active");
  }
}

function moveToNextSlide() {
  console.log("move next");

  const slides = $$(".slide-img");
  slides.forEach((slide) => {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  });
  CURRENT_SLIDE = CURRENT_SLIDE + 1 <= 2 ? CURRENT_SLIDE + 1 : 0;
  slides[CURRENT_SLIDE].classList.add("active");
  changeCircle();
}

function moveToPreviousSlide() {
  console.log("move previous");
  const slides = $$(".slide-img");
  slides.forEach((slide) => {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  });
  CURRENT_SLIDE = CURRENT_SLIDE - 1 >= 0 ? CURRENT_SLIDE - 1 : 2;
  slides[CURRENT_SLIDE].classList.add("active");
  changeCircle();
}

function changeSlide() {
  const slides = $$(".slide-img");
  slides.forEach((slide) => {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  });
  slides[CURRENT_SLIDE].classList.add("active");
}

function changeCircle() {
  const circles = $$(".manual-holder");
  circles.forEach((circle) => {
    if (circle.classList.contains("active")) {
      circle.classList.remove("active");
    }
  });
  circles[CURRENT_SLIDE].classList.add("active");
}

function getPictures(product) {
  let result = [];
  const picture = product.picture;
  let defaultPicture = createPicture(picture);
  defaultPicture.classList.add("active");
  result.push(defaultPicture);
  return [...result, ...createMultiplePictures(getRandomPictures(picture))];
}

function swapPicture(pictures) {
  if (MANUAL) {
    return;
  }
  let showing = pictures.find((picture) =>
    picture.classList.contains("active")
  );
  let currentIndex = pictures.indexOf(showing);
  let nextPicture =
    pictures[currentIndex + 1 >= pictures.length ? 0 : currentIndex + 1];
  showing.classList.remove("active");
  nextPicture.classList.add("active");
  CURRENT_SLIDE = currentIndex + 1 <= 2 ? currentIndex + 1 : 0;
  changeCircle(currentIndex + 1 <= 2 ? currentIndex + 1 : 0);
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
  image.classList.add("slide-img");
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
