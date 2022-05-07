const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links");
const main = document.querySelector("main");

const inputCity = document.querySelector(".form-input-city");
const buttonSubmitCity = document.querySelector(".city-btn ");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");

const images = document.querySelectorAll("img");

//menu button events:

menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("hide");
  this.classList.toggle("rotate");
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbar.classList.add("hide");
    menuBtn.classList.remove("rotate");
  });
});

// manipulating navbar by click on main section (optional code):

/*main.addEventListener("click", function () {
  navbar.classList.add("hide");
  menuBtn.classList.remove("rotate");
});*/

//page navigation (optional code):

/*document.querySelectorAll(".nav-links").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});*/

// Compare cities REST API (Section About)

const cityContainer = document.querySelector(".compare-cities");

const renderError = function (msg, className = "") {
  const html = `
      <div class="city-error-message ${className}">
        <p>${msg}</p>
      </div> `;

  cityContainer.insertAdjacentHTML("beforeend", html);
};

const renderCity = function (data, className = "") {
  const html = `
    <article class="city ${className}">
      <div class="city-data">
          <div class="city-data-header">
            <h3 class// articleContent.classList.toggle("article-open");="city-name">${
              data[0]["name"]
            }</h3>
            <h4 class="city-country">${data[0].country}</h4>
          </div>
          <p class="city-row"><span><img src="images/population.png" alt="population image" class="compare-city"></span>${+(
            data[0].population / 1000000
          ).toFixed(3)} mil</p>
          <p class="city-row"><span><img src="images/latitude.svg" alt="latitude image" class="compare-city"></span>${+data[0].latitude.toFixed(
            2
          )}</p>
          <p class="city-row"><span><img src="images/longitude.svg" alt="longitude image" class="compare-city"></span>${+data[0].longitude.toFixed(
            2
          )}</p>
      </div>
    </article>`;
  cityContainer.insertAdjacentHTML("beforeend", html);
};

const getCountryData = function () {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/city?name=ivano-frankivsk",
    headers: { "X-Api-Key": "J9s0PqEQ7OEn1qkKJfMKfA==bnKY5kXvCdcXResC" },
    contentType: "application/json",
    success: function (result) {
      renderCity(result);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);

      renderError(
        `Something went wrong! "Error: ", ${jqXHR.responseText} Try again!`
      );
    },
  });

  inputCity.value = "";
};

getCountryData();

buttonSubmitCity.addEventListener("click", function (e) {
  e.preventDefault();
  const city = inputCity.value;

  const cityAfterChoice = document.querySelector(".afterChoice");

  const cityErrorMassage = document.querySelector(".city-error-message");

  if (cityAfterChoice) {
    cityAfterChoice.remove();
  }

  if (cityErrorMassage) {
    cityErrorMassage.remove();
  }

  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/city?name=" + city,
    headers: { "X-Api-Key": "J9s0PqEQ7OEn1qkKJfMKfA==bnKY5kXvCdcXResC" },
    contentType: "application/json",
    success: function (result) {
      if (result.length === 0) {
        renderError(
          `Something went wrong! The city doesn't exist! Try again!`,
          "city-error-message"
        );
      } else {
        renderCity(result, "afterChoice");
      }
    },
    error: function ajaxError(jqXHR) {
      renderError(
        `Something went wrong! "Error: ". ${jqXHR.responseText} Try again!`,
        "city-error-message"
      );
    },
  });

  inputCity.value = "";
});

// Implementing Map leaflet (div map)

let map = L.map("map").setView([48.92, 24.71], 13);

L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([48.92, 24.71])
  .addTo(map)
  .bindPopup("Ivano-Frankivsk is the<br>best place to visit !!!");

//slider for gallery section

const sliderGallery = function () {
  const slides = document.querySelectorAll(".gallery-slide");
  const slider = document.querySelector(".gallery-slider");
  const btnLeft = document.querySelector(".gallery-slider-btn-left");
  const btnRight = document.querySelector(".gallery-slider-btn-right");
  const dotContainer = document.querySelector(".gallery-dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="gallery-dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  createDots();

  const activateDots = function (slide) {
    document
      .querySelectorAll(".gallery-dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot-active"));

    document
      .querySelector(`.gallery-dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot-active");
  };

  activateDots(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(0);

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  btnRight.addEventListener("click", function () {
    nextSlide();
  });

  btnLeft.addEventListener("click", function () {
    prevSlide();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-dots-dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

sliderGallery();

// article section: display article event

const viewArticle = document.querySelectorAll(".open-article");
const closeArticle = document.querySelectorAll(".close-article");
const articleHeader = document.querySelectorAll(".article-header span");
const articleContent = document.querySelector(".article-content");

viewArticle.forEach(function (article) {
  article.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("article-open");
  });
});

closeArticle.forEach(function (article) {
  article.addEventListener("click", function () {
    this.closest("div.article-content").classList.toggle("article-open");
  });
});

articleHeader.forEach(function (header) {
  header.addEventListener("click", function () {
    this.closest("div.article-content-container")
      .querySelector("div.article-content")
      .classList.toggle("article-open");
  });
});

// modal window for images

const removeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.removeChild(modal.lastElementChild);
};

images.forEach(function (img) {
  img.addEventListener("click", function (e) {
    if (!e.target.classList.contains("stable")) {
      const imageModal = `<img src=${img.src} alt=${img.alt}">`;
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      modal.insertAdjacentHTML("beforeend", imageModal);
    }
  });
});

btnCloseModal.addEventListener("click", function () {
  removeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    removeModal();
  }
});

overlay.addEventListener("click", function () {
  removeModal();
});
