/**
 * HAN SINBI — Personal Branding Website
 * 순수 Vanilla JavaScript (빌드/npm 불필요)
 *
 * 기능:
 * - 다크/라이트 모드 토글
 * - 모바일 메뉴
 * - 스크롤 헤더 스타일
 * - 스크롤 등장 애니메이션 (Intersection Observer)
 * - Hero 타이핑 효과
 * - 부드러운 앵커 스크롤
 * - 현재 섹션 내비게이션 하이라이트
 */

(function () {
  "use strict";

  /* ============================================================
     DOM 요소 참조
     ============================================================ */
  const header = document.getElementById("header");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const typingElement = document.getElementById("typing-text");
  const currentYearElement = document.getElementById("current-year");
  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav__link, .mobile-menu__link");
  const sections = document.querySelectorAll("section[id]");

  /* Hero 타이핑에 사용할 문장 */
  const TYPING_TEXT =
    "기술과 비즈니스를 연결하며\n실제 문제를 해결하는 사람";

  /* localStorage 키 — 테마 저장 */
  const THEME_STORAGE_KEY = "sinbi-brand-theme";

  /* ============================================================
     1. 테마 (다크/라이트 모드)
     ============================================================ */

  /**
   * 저장된 테마 또는 시스템 설정을 읽어 적용
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");

    applyTheme(theme);
  }

  /**
   * html 요소에 data-theme 속성 적용
   * @param {string} theme - "light" | "dark"
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  /**
   * 테마 토글 버튼 클릭 핸들러
   */
  function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }

  /* ============================================================
     2. 모바일 메뉴
     ============================================================ */

  /**
   * 모바일 메뉴 열기/닫기
   */
  function toggleMobileMenu() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
    mobileMenu.hidden = isOpen;
  }

  /**
   * 모바일 메뉴 닫기
   */
  function closeMobileMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    mobileMenu.hidden = true;
  }

  /* ============================================================
     3. 스크롤 헤더
     ============================================================ */

  /**
   * 스크롤 위치에 따라 헤더에 scrolled 클래스 추가
   */
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  /* ============================================================
     4. 스크롤 등장 애니메이션 (Intersection Observer)
     ============================================================ */

  /**
   * 요소가 뷰포트에 들어오면 is-visible 클래스 추가
   */
  function initScrollReveal() {
    // reduced motion 설정 시 즉시 표시
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     5. Hero 타이핑 효과
     ============================================================ */

  /**
   * 한 글자씩 타이핑하는 효과
   * @param {string} text - 출력할 텍스트 (\n으로 줄바꿈)
     */
  function startTypingEffect(text) {
    if (!typingElement) return;

    // reduced motion이면 즉시 전체 텍스트 표시
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typingElement.innerHTML =
        formatTypingHTML(text) + buildCursorHTML();
      return;
    }

    var charIndex = 0;

    /** 다음 글자 출력 */
    function typeNextChar() {
      if (charIndex <= text.length) {
        var currentText = text.slice(0, charIndex);
        typingElement.innerHTML = formatTypingHTML(currentText) + buildCursorHTML();
        charIndex++;
        setTimeout(typeNextChar, 45);
      }
    }

    typeNextChar();
  }

  /** 타이핑 커서 HTML 생성 */
  function buildCursorHTML() {
    return '<span class="hero__typing-cursor" aria-hidden="true">|</span>';
  }

  /**
   * 타이핑 텍스트를 HTML로 변환 (줄바꿈 처리)
   * @param {string} text
   * @returns {string}
   */
  function formatTypingHTML(text) {
    return text
      .split("\n")
      .map(function (line) {
        return line;
      })
      .join("<br>");
  }

  /* ============================================================
     6. 내비게이션 활성 섹션 하이라이트
     ============================================================ */

  /**
   * 현재 보이는 섹션에 해당하는 nav 링크에 active 클래스 추가
     */
  function initActiveNav() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var sectionId = entry.target.getAttribute("id");

            navLinks.forEach(function (link) {
              link.classList.remove("nav__link--active");

              if (link.getAttribute("href") === "#" + sectionId) {
                link.classList.add("nav__link--active");
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -50% 0px",
      },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ============================================================
     7. 앵커 링크 부드러운 스크롤 + 모바일 메뉴 닫기
     ============================================================ */

  /**
   * 모든 앵커 링크에 클릭 이벤트 연결
     */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        var targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMobileMenu();
        }
      });
    });
  }

  /* ============================================================
     8. 푸터 연도 자동 업데이트
     ============================================================ */

  function updateCurrentYear() {
    if (currentYearElement) {
      currentYearElement.textContent = String(new Date().getFullYear());
    }
  }

  /* ============================================================
     초기화
     ============================================================ */

  function init() {
    initTheme();
    initScrollReveal();
    initActiveNav();
    initSmoothScroll();
    updateCurrentYear();
    handleHeaderScroll();
    startTypingEffect(TYPING_TEXT);

    /* 이벤트 리스너 등록 */
    if (themeToggle) {
      themeToggle.addEventListener("click", handleThemeToggle);
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMobileMenu);
    }

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });

    /* 시스템 테마 변경 감지 (저장된 테마 없을 때만) */
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (event) {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
  }

  /* DOM 로드 완료 후 실행 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
