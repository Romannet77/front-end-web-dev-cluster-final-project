const logo = document.querySelector(".logo-image");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const main = document.querySelector("main");

const inputCity = document.querySelector(".form-input-city");
const buttonSubmitCity = document.querySelector(".city-btn ");

//menu button events:

menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("hide");
  this.classList.toggle("rotate");
});

main.addEventListener("click", function () {
  navbar.classList.add("hide");
  menuBtn.classList.remove("rotate");
});

//page navigation (optional code):

// document.querySelectorAll(".nav-links").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//SLIDER FOR HISTORY SECTION:

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider-btn-left");
  const btnRight = document.querySelector(".slider-btn-right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  createDots();

  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot-active"));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
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
    if (e.target.classList.contains("dots-dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

slider();

// Compare cities REST API

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
            <h3 class="city-name">${data[0]["name"]}</h3>
            <h4 class="city-country">${data[0].country}</h4>
          </div>
          <p class="city-row"><span><img src="/images/population.png" alt="population image"></span>${+(
            data[0].population / 1000000
          ).toFixed(3)} mil</p>
          <p class="city-row"><span><img src="/images/latitude.svg" alt="latitude image"></span>${+data[0].latitude.toFixed(
            4
          )}</p>
          <p class="city-row"><span><img src="/images/longitude.svg" alt="longitude image"></span>${+data[0].longitude.toFixed(
            4
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
      console.log(result);
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
