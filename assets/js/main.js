(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var legend = document.querySelector(".legend");
  if (toggle && legend) {
    toggle.addEventListener("click", function () {
      var open = legend.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* subtle grid drift on scroll — the map that never quite holds still */
  var grid = document.querySelector(".grid-field");
  if (grid && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY * 0.06;
          grid.style.backgroundPosition = "0 " + y + "px";
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* the "scale 1:1" interaction — the page briefly tries to become
     the territory it maps, then gives up and returns to being a map */
  var scaleToggle = document.getElementById("scale-toggle");
  var hero = document.querySelector(".hero");
  if (scaleToggle && hero) {
    var trigger = function () {
      if (reduceMotion) return;
      hero.style.transition = "transform 900ms cubic-bezier(.4,0,.2,1)";
      hero.style.transform = "scale(1.06)";
      window.setTimeout(function () {
        hero.style.transform = "scale(1)";
      }, 420);
    };
    scaleToggle.addEventListener("click", trigger);
    scaleToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  }
})();
