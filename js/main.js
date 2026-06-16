/**
 * [초보자용 주석] 메인 페이지 동작 스크립트
 * 1) 헤더/스크롤 효과
 * 2) 모바일 메뉴
 * 3) 카드 상세 모달
 * 4) 등장 애니메이션
 */
(function () {
  "use strict";

  // [초보자용 주석] 자주 쓰는 요소를 먼저 변수로 저장
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section[id]");
  const backToTop = document.querySelector(".back-to-top");
  const openModalButtons = document.querySelectorAll(".open-modal-btn");
  const detailModal = document.querySelector("#detailModal");
  const modalClose = document.querySelector("#modalClose");
  const modalTitle = document.querySelector("#modalTitle");
  const modalMeta = document.querySelector("#modalMeta");
  const modalBody = document.querySelector("#modalBody");
  const modalLink = document.querySelector("#modalLink");

  // [초보자용 주석] 스크롤 시 나타날 요소 목록
  const revealElements = document.querySelectorAll(
    ".about, .education-full, .projects, .essay-preview, .activities, .contact, .project-card, .activity-icon-item"
  );

  // [초보자용 주석] 모달에 넣을 데이터
  // 키 값(intern/shanghai/ngo/essay)은 HTML 버튼의 data-project 값과 맞춰주세요.
  const modalData = {
    intern: {
      title: "전략/기획 인턴십",
      meta: "2024",
      body: "자료 리서치, 보고서 구조화, 실행 보조를 담당하며 실무의 속도와 정확도를 학습했습니다. 문제를 빠르게 구조화하고 팀 커뮤니케이션을 정리하는 역할을 수행했습니다.",
      link: "./details.html?type=intern"
    },
    shanghai: {
      title: "상해 교환학생",
      meta: "2024",
      body: "현지 수업과 프로젝트를 통해 다문화 환경의 협업 방식, 언어 사용 맥락, 국제 이슈에 대한 관점을 확장했습니다. 학업과 생활 모두에서 적응력과 실행력을 강화했습니다.",
      link: "./details.html?type=shanghai"
    },
    ngo: {
      title: "NGO · 인권 활동",
      meta: "2023 ~ Present",
      body: "캠페인/행사 보조, 자료 정리, 참여자 소통 등 현장 중심 활동을 경험했습니다. 인권 이슈를 사람 중심의 언어로 전달하고 행동으로 연결하는 과정에 집중했습니다.",
      link: "./details.html?type=ngo"
    },
    essay: {
      title: "자기소개서 요약",
      meta: "Autobiography Based",
      body: "북한에서의 유년 경험은 자유와 인권의 가치를 삶으로 체득하게 했고, 현재의 전공/활동 선택에도 깊게 연결되어 있습니다. 이 경험은 사회 문제를 개인의 존엄 관점에서 바라보는 저의 핵심 동기입니다.",
      link: "./details.html?type=essay"
    }
  };

  // [초보자용 주석] 스크롤 위치에 따라 헤더 톤 변경 + TOP 버튼 표시
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.06)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.7)";
      header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.04)";
    }
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 600);
  }

  // [초보자용 주석] 현재 보고 있는 섹션 메뉴를 하이라이트 처리
  function handleActiveNav() {
    let current = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active-link");
    });
  }

  // [초보자용 주석] 모바일 햄버거 메뉴 열고 닫기
  function initMobileMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // [초보자용 주석] TOP 버튼 동작
  function initBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // [초보자용 주석] 섹션 등장 애니메이션
  function initReveal() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  // [초보자용 주석] 상단 메뉴 클릭 시 부드럽게 이동
  function initSmoothScroll() {
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        if (!targetId || !targetId.startsWith("#")) return;
        event.preventDefault();
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // [초보자용 주석] 메인 사진 패럴랙스
  function handleParallax() {
    const heroImage = document.querySelector(".hero-image");
    if (!heroImage) return;
    heroImage.style.transform = "translateY(" + (window.scrollY * 0.12) + "px)";
  }

  // [초보자용 주석] 첫 로딩 시 문구 순차 등장
  function pageIntro() {
    const elements = [
      document.querySelector(".hero-kicker"),
      document.querySelector(".hero-title"),
      document.querySelector(".hero-desc")
    ];
    elements.forEach(function (el, index) {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(function () {
        el.style.transition = "0.9s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 + index * 300);
    });
  }

  // [초보자용 주석] 카드 상세 모달
  function initModal() {
    if (!detailModal || !modalClose) return;
    openModalButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const key = button.dataset.project;
        const item = modalData[key];
        if (!item) return;
        modalTitle.textContent = item.title;
        modalMeta.textContent = item.meta;
        modalBody.textContent = item.body;
        modalLink.setAttribute("href", item.link);
        detailModal.classList.add("open");
        detailModal.setAttribute("aria-hidden", "false");
      });
    });

    modalClose.addEventListener("click", closeModal);
    detailModal.addEventListener("click", function (event) {
      if (event.target === detailModal) closeModal();
    });
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
  }

  function closeModal() {
    detailModal.classList.remove("open");
    detailModal.setAttribute("aria-hidden", "true");
  }

  // [초보자용 주석] 데스크톱에서만 커서 장식 표시
  function customCursor() {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    document.addEventListener("mousemove", function (event) {
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
    });
  }

  // [초보자용 주석] 시작 함수
  function init() {
    handleHeaderScroll();
    pageIntro();
    initReveal();
    initSmoothScroll();
    initMobileMenu();
    initBackToTop();
    initModal();
    customCursor();

    window.addEventListener("scroll", function () {
      handleHeaderScroll();
      handleActiveNav();
      handleParallax();
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
