/**
* Template Name: Platia
* Template URL: https://bootstrapmade.com/platia-bootstrap-restaurant-template/
* Updated: Aug 11 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const loader = document.getElementById("preloader");
  if (loader) {
    loader.style.display = "none";
  }
});




  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  const text = "Chan Squad";
  const el = document.getElementById("typing-text");

  let index = 0;
  let isDeleting = false;
  let speed = 120;

  function typeLoop() {
    if (!isDeleting) {
      el.textContent = text.substring(0, index + 1);
      index++;

      if (index === text.length) {
        setTimeout(() => isDeleting = true, 1500);
      }
    } else {
      el.textContent = text.substring(0, index - 1);
      index--;

      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(typeLoop, isDeleting ? 70 : speed);
  }

  typeLoop();


document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("#orbitGallery .orbit-item");
  const wrapper = document.querySelector(".orbit-wrapper");

  if (!items.length || !wrapper) return;

  /* ===============================
     ORBIT CONFIG
  ================================ */
  const total = items.length;
  const radius = 260;
  const depth = 220;

  let angle = 0;
  let velocity = 0;
  let isDragging = false;
  let lastX = 0;

  const friction = 0.95;      // makin besar → makin lama berhenti
  const autoSpeed = 0.05;     // auto-rotate ringan saat idle
  const minVelocity = 0.001;  // ambang berhenti

  /* ===============================
     RENDER ORBIT
  ================================ */
  function renderOrbit() {
    items.forEach((item, i) => {
      const a = angle + i * (360 / total);
      const rad = a * Math.PI / 180;

      const x = Math.sin(rad) * radius;
      const z = Math.cos(rad) * depth;
      const scale = (z + depth) / (2 * depth) + 0.45;

      item.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        translateZ(${z}px)
        scale(${scale})
      `;

      item.style.opacity = scale;
      item.style.zIndex = Math.floor(scale * 100);
      item.style.filter = z < 0 ? "blur(2px)" : "none";
    });
  }

  /* ===============================
     MAIN LOOP (INERSIA)
  ================================ */
  function animate() {
    if (!isDragging) {
      if (Math.abs(velocity) > minVelocity) {
        angle += velocity;
        velocity *= friction; // gesekan alami
      } else {
        velocity = 0;
        angle += autoSpeed;   // balik ke idle motion
      }
    }

    renderOrbit();
    requestAnimationFrame(animate);
  }

  /* ===============================
     POINTER EVENTS (HP + DESKTOP)
  ================================ */
  wrapper.addEventListener("pointerdown", e => {
    isDragging = true;
    lastX = e.clientX;
    velocity = 0;
    wrapper.setPointerCapture(e.pointerId);
  });

  wrapper.addEventListener("pointermove", e => {
    if (!isDragging) return;

    const delta = e.clientX - lastX;
    lastX = e.clientX;

    velocity = delta * 0.18; // kekuatan dorongan
    angle += velocity;
  });

  wrapper.addEventListener("pointerup", e => {
    isDragging = false;
    wrapper.releasePointerCapture(e.pointerId);
  });

  wrapper.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  /* ===============================
     START
  ================================ */
  renderOrbit();
  animate();
});








  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();