/**
 * HAN SHINBI Editorial Portfolio
 * main.js
 *
 * 기능
 * - Header Scroll Effect
 * - Active Navigation
 * - Reveal Animation
 * - Smooth Scroll
 * - Image Parallax
 * - Page Loading Animation
 */

(function () {

  "use strict";

  /* ==========================================
     DOM
  ========================================== */

  const header = document.querySelector(".header");

  const navLinks =
    document.querySelectorAll('nav a');

  const sections =
    document.querySelectorAll("section[id]");

  const revealElements =
    document.querySelectorAll(
      ".about,.education-language,.projects,.activities,.contact,.project-card,.activity-item"
    );

  /* ==========================================
     HEADER SCROLL
  ========================================== */

  function handleHeaderScroll() {

    if (window.scrollY > 50) {

      header.style.background =
        "rgba(7,7,7,.95)";

      header.style.borderBottom =
        "1px solid rgba(255,255,255,.08)";

    } else {

      header.style.background =
        "rgba(7,7,7,.75)";

      header.style.borderBottom =
        "1px solid rgba(255,255,255,.04)";
    }
  }

  /* ==========================================
     ACTIVE NAVIGATION
  ========================================== */

  function handleActiveNav() {

    let current = "";

    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop - 200;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
        sectionTop + sectionHeight
      ) {

        current =
          section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {

      link.classList.remove("active-link");

      const href =
        link.getAttribute("href");

      if (href === "#" + current) {

        link.classList.add("active-link");
      }
    });
  }

  /* ==========================================
     REVEAL ANIMATION
  ========================================== */

  function initReveal() {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "active"
              );
            }
          });
        },

        {
          threshold: 0.15
        }
      );

    revealElements.forEach(function (el) {

      el.classList.add("reveal");

      observer.observe(el);
    });
  }

  /* ==========================================
     SMOOTH SCROLL
  ========================================== */

  function initSmoothScroll() {

    navLinks.forEach(function (link) {

      link.addEventListener(
        "click",

        function (event) {

          const targetId =
            this.getAttribute("href");

          if (
            targetId.startsWith("#")
          ) {

            event.preventDefault();

            const target =
              document.querySelector(
                targetId
              );

            if (target) {

              target.scrollIntoView({

                behavior: "smooth",
                block: "start"
              });
            }
          }
        }
      );
    });
  }

  /* ==========================================
     HERO PARALLAX
  ========================================== */

  function handleParallax() {

    const heroImage =
      document.querySelector(
        ".hero-image"
      );

    if (!heroImage) return;

    const scrollY =
      window.scrollY;

    heroImage.style.transform =
      `translateY(${scrollY * 0.15}px) scale(1.05)`;
  }

  /* ==========================================
     PAGE LOADING EFFECT
  ========================================== */

  function pageIntro() {

    const heroTitle =
      document.querySelector(
        ".hero-title"
      );

    const heroDesc =
      document.querySelector(
        ".hero-desc"
      );

    const heroKicker =
      document.querySelector(
        ".hero-kicker"
      );

    if (heroTitle) {

      heroTitle.style.opacity = "0";
      heroTitle.style.transform =
        "translateY(40px)";
    }

    if (heroDesc) {

      heroDesc.style.opacity = "0";
      heroDesc.style.transform =
        "translateY(40px)";
    }

    if (heroKicker) {

      heroKicker.style.opacity = "0";
      heroKicker.style.transform =
        "translateY(40px)";
    }

    setTimeout(function () {

      if (heroKicker) {

        heroKicker.style.transition =
          ".8s ease";

        heroKicker.style.opacity =
          "1";

        heroKicker.style.transform =
          "translateY(0)";
      }

    }, 200);

    setTimeout(function () {

      if (heroTitle) {

        heroTitle.style.transition =
          "1s ease";

        heroTitle.style.opacity =
          "1";

        heroTitle.style.transform =
          "translateY(0)";
      }

    }, 500);

    setTimeout(function () {

      if (heroDesc) {

        heroDesc.style.transition =
          "1s ease";

        heroDesc.style.opacity =
          "1";

        heroDesc.style.transform =
          "translateY(0)";
      }

    }, 900);
  }

  /* ==========================================
     CURSOR EFFECT
  ========================================== */

  function customCursor() {

    const cursor =
      document.createElement("div");

    cursor.className =
      "custom-cursor";

    document.body.appendChild(
      cursor
    );

    document.addEventListener(
      "mousemove",

      function (event) {

        cursor.style.left =
          event.clientX + "px";

        cursor.style.top =
          event.clientY + "px";
      }
    );
  }

  /* ==========================================
     INIT
  ========================================== */

  function init() {

    handleHeaderScroll();

    pageIntro();

    initReveal();

    initSmoothScroll();

    customCursor();

    window.addEventListener(
      "scroll",

      function () {

        handleHeaderScroll();

        handleActiveNav();

        handleParallax();
      },

      {
        passive: true
      }
    );
  }

  /* ==========================================
     START
  ========================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();
  }

})();
