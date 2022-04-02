const logo = document.querySelector(".logo-image");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const main = document.querySelector("main");

//menu button events:

menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("hide");
  this.classList.toggle("rotate");
});

main.addEventListener("click", function () {
  navbar.classList.add("hide");
  menuBtn.classList.remove("rotate");
});

//page navigation:

document.querySelectorAll(".nav-links").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
