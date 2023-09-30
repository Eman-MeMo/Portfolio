// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
});
//-----------------------Scroll NavBar -----------------------------
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-item");
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 50 && rect.bottom >= 50) {
      navItems.forEach(navItem => navItem.classList.remove("active"));
      navItems[index].classList.add("active");
      test()
    }
  });
});
//-----------------------typing animation --------------------------
var typed = new Typed(".typing", {
  strings: [
    "",
    "Full Stack Developer",
    "FrontEnd Developer",
    "BackEnd Developer",
    "Web Developer",
  ],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});
//------------------- Download PDF ---------------------------

const downloadButton = document.getElementById("downloadButton");

downloadButton.addEventListener("click", function () {
  // Replace "path_to_your_pdf.pdf" with the actual path to your PDF file
  const pdfPath = "assets/Eman-Ramadan-CV.pdf";

  // Create a link element
  const link = document.createElement("a");
  link.href = pdfPath;
  link.download = "Eman-Ramadan-CV.pdf"; // Set the desired file name

  // Programmatically click the link to initiate the download
  link.click();
});
//--------------------------- Skills click refresh ---------------------------
const skillsLink = document.querySelector('.nav-link[href="#skills"]');
const skillsSection = document.getElementById("skills");
const skillBars = skillsSection.querySelectorAll(".skills-bar .bar span");

// Add click event listener to the "Skills" link
skillsLink.addEventListener("click", function (event) {
  // Reset animations by removing and re-adding the class
  skillBars.forEach((bar) => {
    const skillName = bar.classList[0]; // Get the skill name class (e.g., 'html', 'css', etc.)
    bar.style.animation = "none"; // Reset animation
    void bar.offsetWidth; // Force a reflow (critical step)
    bar.style.animation = skillName + " 5s"; // Apply the animation
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const skillsNavItem = document.querySelector(".nav-link.refresh");
  skillsNavItem.addEventListener("click", handleSkillsClick);
});
function handleSkillsClick(event) {
  event.preventDefault(); // Prevent default link behavior

  // Scroll to the skills section
  const skillsSection = document.getElementById("skills");
  skillsSection.scrollIntoView({ behavior: "smooth" });

  // Trigger the skills animation
  const circles = document.querySelectorAll(".circle");
  circles.forEach((elem) => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor((dots * marked) / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
      points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll(".points");
    for (let i = 0; i < percent; i++) {
      pointsMarked[i].classList.add("marked");
    }
  });
}

//------------------------- Circle Skills ------------------------------
const circles = document.querySelectorAll(".circle");
circles.forEach((elem) => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});
