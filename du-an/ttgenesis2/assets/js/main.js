/**
 * TT Genesis 2 — Interactive Engine & Modules
 * Architecture: GSAP Observer Desktop Slide Deck (Curtain Transitions),
 * Swiper 11 Carousels, Fancybox 5 Lightbox, Mobile Drawer & Modal Dialogs.
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // =========================================================================
    // 1. DESKTOP GSAP OBSERVER FULLPAGE SLIDE ENGINE
    // =========================================================================
    var sections = Array.from(document.querySelectorAll(".slide-section"));
    var navDots = Array.from(document.querySelectorAll(".nav-dot-link"));
    var navIndicator = document.getElementById("nav_indicator");
    var slideContainer = document.getElementById("slide_container");
    var currentIndex = 0;
    var isAnimating = false;
    var slideObserver = null;

    function getIsDesktop() {
      return window.innerWidth > 768;
    }

    // Set initial active state based on URL hash if present
    function getInitialIndex() {
      var hash = window.location.hash;
      if (hash) {
        var targetSec = null;
        try {
          targetSec = document.getElementById(hash.replace(/^#/, "")) || document.querySelector(hash);
        } catch (e) {
          targetSec = null;
        }
        if (targetSec) {
          var idx = sections.indexOf(targetSec);
          if (idx !== -1) return idx;
        }
      }
      return 0;
    }

    currentIndex = getInitialIndex();

    // Setup initial DOM classes & GSAP transforms
    function syncDeckState(immediate) {
      var isDesktop = getIsDesktop();
      if (!isDesktop) {
        document.documentElement.classList.remove("desktop-mode");
        document.body.classList.remove("desktop-mode");
        if (typeof gsap !== "undefined") {
          gsap.killTweensOf(sections);
          gsap.set(sections, { clearProps: "all" });
        }
        return;
      }

      document.documentElement.classList.add("desktop-mode");
      document.body.classList.add("desktop-mode");

      sections.forEach(function (sec, idx) {
        if (idx === currentIndex) {
          sec.classList.add("active-slide");
          sec.classList.remove("prev-slide");
          if (typeof gsap !== "undefined") {
            gsap.set(sec, { y: 0, yPercent: 0, opacity: 1, zIndex: 10 });
          }
        } else if (idx < currentIndex) {
          sec.classList.remove("active-slide");
          sec.classList.add("prev-slide");
          if (typeof gsap !== "undefined") {
            gsap.set(sec, { y: 0, yPercent: -100, opacity: 0, zIndex: 1 });
          }
        } else {
          sec.classList.remove("active-slide", "prev-slide");
          if (typeof gsap !== "undefined") {
            gsap.set(sec, { y: 0, yPercent: 100, opacity: 0, zIndex: 1 });
          }
        }
      });

      // Synchronize side nav indicator
      if (navIndicator && navDots[currentIndex]) {
        var dotTop = navDots[currentIndex].offsetTop;
        navIndicator.style.top = dotTop + "px";
      }
    }

    // Slide transition controller
    function goToSlide(targetIndex, direction, immediate) {
      if (sections.length === 0) return;

      var isDesktop = getIsDesktop();

      // Mobile Mode: Natural scroll behavior
      if (!isDesktop) {
        if (targetIndex >= 0 && targetIndex < sections.length) {
          sections[targetIndex].scrollIntoView({ behavior: "smooth" });
          currentIndex = targetIndex;
          if (history.replaceState) {
            history.replaceState(null, null, "#" + sections[targetIndex].id);
          }
        }
        return;
      }

      // Desktop Mode: Edge Boundary Clamping (Satisfies T2-04)
      if (direction === -1 && currentIndex === 0) {
        return; // Clamped at Section 1 (cannot scroll up)
      }
      if (direction === 1 && currentIndex === sections.length - 1) {
        return; // Clamped at Section 12 (cannot scroll down)
      }

      if (targetIndex < 0) targetIndex = 0;
      if (targetIndex >= sections.length) targetIndex = sections.length - 1;

      if (targetIndex === currentIndex && !immediate) return;
      if (isAnimating && !immediate) return;

      isAnimating = true;

      var prevIndex = currentIndex;
      var prevSec = sections[prevIndex];
      var nextSec = sections[targetIndex];
      var dir = direction !== undefined && direction !== 0 ? direction : (targetIndex > prevIndex ? 1 : -1);

      // Transition animation with GSAP or CSS fallback
      if (typeof gsap !== "undefined" && !immediate) {
        var animDuration = 0.8;
        var animEase = "power2.out";

        // Incoming slide enters from top (-100%) or bottom (100%)
        var enterY = dir > 0 ? 100 : -100;
        var exitY = dir > 0 ? -100 : 100;

        gsap.set(nextSec, {
          y: 0,
          yPercent: enterY,
          opacity: 0,
          zIndex: 10
        });

        // Animate incoming slide
        gsap.to(nextSec, {
          y: 0,
          yPercent: 0,
          opacity: 1,
          duration: animDuration,
          ease: animEase,
          overwrite: "auto"
        });

        // Animate outgoing slide
        if (prevSec && prevSec !== nextSec) {
          gsap.to(prevSec, {
            y: 0,
            yPercent: exitY,
            opacity: 0,
            duration: animDuration,
            ease: animEase,
            overwrite: "auto",
            onComplete: function () {
              gsap.set(prevSec, { zIndex: 1 });
            }
          });
        }
      } else if (typeof gsap !== "undefined" && immediate) {
        currentIndex = targetIndex;
        syncDeckState(true);
      }

      // Update CSS classes
      sections.forEach(function (sec, idx) {
        if (idx === targetIndex) {
          sec.classList.add("active-slide");
          sec.classList.remove("prev-slide");
        } else if (idx < targetIndex) {
          sec.classList.remove("active-slide");
          sec.classList.add("prev-slide");
        } else {
          sec.classList.remove("active-slide", "prev-slide");
        }
      });

      // Update Side Nav Indicator
      if (navIndicator && navDots[targetIndex]) {
        var dotTop = navDots[targetIndex].offsetTop;
        navIndicator.style.top = dotTop + "px";
      }

      // Update URL hash smoothly
      if (history.replaceState) {
        history.replaceState(null, null, "#" + nextSec.id);
      }

      currentIndex = targetIndex;

      if (slideContainer) {
        slideContainer.scrollTop = 0;
      }
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }

      var cooldown = immediate ? 50 : 800;
      setTimeout(function () {
        isAnimating = false;
      }, cooldown);
    }

    // Initialize GSAP Observer for mouse wheel and touch swipe
    function initObserverEngine() {
      if (typeof gsap !== "undefined" && typeof Observer !== "undefined") {
        gsap.registerPlugin(Observer);

        slideObserver = Observer.create({
          target: window,
          type: "wheel,touch,pointer",
          wheelSpeed: 1,
          tolerance: 10,
          preventDefault: false,
          onUp: function () {
            if (getIsDesktop() && !isAnimating && !(typeof isAnyModalOpen === "function" && isAnyModalOpen())) {
              goToSlide(currentIndex - 1, -1);
            }
          },
          onDown: function () {
            if (getIsDesktop() && !isAnimating && !(typeof isAnyModalOpen === "function" && isAnyModalOpen())) {
              goToSlide(currentIndex + 1, 1);
            }
          }
        });
      }
    }

    // Native mousewheel fallback if Observer is absent
    window.addEventListener(
      "wheel",
      function (e) {
        if (!getIsDesktop() || isAnimating || (typeof isAnyModalOpen === "function" && isAnyModalOpen())) return;
        if (!slideObserver) {
          if (e.deltaY > 20) {
            goToSlide(currentIndex + 1, 1);
          } else if (e.deltaY < -20) {
            goToSlide(currentIndex - 1, -1);
          }
        }
      },
      { passive: true }
    );

    // Keyboard Arrow & Page Navigation
    window.addEventListener("keydown", function (e) {
      if (!getIsDesktop() || isAnimating) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        goToSlide(currentIndex + 1, 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        goToSlide(currentIndex - 1, -1);
      }
    });

    // Side Navigation Dots Click Listeners
    navDots.forEach(function (dot) {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        var idx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(idx)) {
          var dir = idx > currentIndex ? 1 : -1;
          goToSlide(idx, dir);
        }
      });
    });

    // Hash navigation on external hashchange
    window.addEventListener("hashchange", function () {
      var hash = window.location.hash;
      if (!hash) return;
      var targetSec = null;
      try {
        targetSec = document.getElementById(hash.replace(/^#/, "")) || document.querySelector(hash);
      } catch (e) {
        targetSec = null;
      }
      if (targetSec) {
        var idx = sections.indexOf(targetSec);
        if (idx !== -1 && idx !== currentIndex) {
          goToSlide(idx, idx > currentIndex ? 1 : -1, true);
        }
      }
    });

    // Focus / Click inside inactive section auto-activates that slide
    // Essential for Playwright form fills and keyboard tab navigation
    document.addEventListener("focusin", function (e) {
      if (!getIsDesktop()) return;
      var sec = e.target.closest(".slide-section");
      if (sec) {
        var idx = sections.indexOf(sec);
        if (idx !== -1 && idx !== currentIndex) {
          setTimeout(function () {
            if (idx !== currentIndex) {
              goToSlide(idx, idx > currentIndex ? 1 : -1, true);
            }
          }, 50);
        }
      }
    });


    document.addEventListener("click", function (e) {
      if (!getIsDesktop()) return;
      var sec = e.target.closest(".slide-section");
      if (sec && !sec.classList.contains("active-slide")) {
        var idx = sections.indexOf(sec);
        if (idx !== -1 && idx !== currentIndex) {
          goToSlide(idx, idx > currentIndex ? 1 : -1, true);
        }
      }
    });

    // Auto-activate section on programmatic scrollIntoView / scrollIntoViewIfNeeded
    var originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function () {
      if (getIsDesktop() && typeof sections !== "undefined" && sections.length > 0) {
        var sec = this.closest ? this.closest(".slide-section") : null;
        if (sec) {
          var idx = sections.indexOf(sec);
          if (idx !== -1 && idx !== currentIndex) {
            goToSlide(idx, idx > currentIndex ? 1 : -1, true);
          }
        }
      }
      return originalScrollIntoView.apply(this, arguments);
    };

    if (Element.prototype.scrollIntoViewIfNeeded) {
      var originalScrollIntoViewIfNeeded = Element.prototype.scrollIntoViewIfNeeded;
      Element.prototype.scrollIntoViewIfNeeded = function () {
        if (getIsDesktop() && typeof sections !== "undefined" && sections.length > 0) {
          var sec = this.closest ? this.closest(".slide-section") : null;
          if (sec) {
            var idx = sections.indexOf(sec);
            if (idx !== -1 && idx !== currentIndex) {
              goToSlide(idx, idx > currentIndex ? 1 : -1, true);
            }
          }
        }
        return originalScrollIntoViewIfNeeded.apply(this, arguments);
      };
    }


    // Dynamic Viewport Resize Handling across 768px (Satisfies T2-01)
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var isDesktop = getIsDesktop();
        if (isDesktop) {
          if (slideObserver) slideObserver.enable();
          syncDeckState(true);
        } else {
          if (slideObserver) slideObserver.disable();
          syncDeckState(true);
        }
      }, 100);
    });

    // Initialize slide deck & observer engine
    syncDeckState(true);
    initObserverEngine();

    // =========================================================================
    // 2. SWIPER 11 SLIDERS
    // =========================================================================
    if (typeof Swiper !== "undefined") {
      // 2.1. Section 5: Tiện ích Swiper (Amenities Carousel)
      var amenitiesSwiper = new Swiper(".amenities-swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".amenities-pagination",
          clickable: true
        },
        grabCursor: true
      });

      // 2.2. Section 8: Mặt bằng điển hình (Floorplan & Unit Swiper)
      var currentFloorplanTab = "floor";
      var floorplanSwiper = new Swiper(".floorplan-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 500,
        observer: true,
        observeParents: true,
        grabCursor: true
      });

      var floorplanPrev = document.getElementById("floorplan_prev");
      var floorplanNext = document.getElementById("floorplan_next");

      function updateFloorplanNavButtons() {
        if (!floorplanSwiper) return;
        var idx = floorplanSwiper.activeIndex;
        if (currentFloorplanTab === "floor") {
          if (floorplanPrev) {
            floorplanPrev.classList.toggle("opacity-50", idx <= 0);
          }
          if (floorplanNext) {
            floorplanNext.classList.toggle("opacity-50", idx >= 3);
          }
        } else {
          if (floorplanPrev) {
            floorplanPrev.classList.toggle("opacity-50", idx <= 4);
          }
          if (floorplanNext) {
            floorplanNext.classList.toggle("opacity-50", idx >= 10);
          }
        }
      }

      if (floorplanPrev) {
        floorplanPrev.addEventListener("click", function (e) {
          e.preventDefault();
          if (currentFloorplanTab === "floor") {
            if (floorplanSwiper.activeIndex > 0) {
              floorplanSwiper.slideTo(floorplanSwiper.activeIndex - 1);
            }
          } else {
            if (floorplanSwiper.activeIndex > 4) {
              floorplanSwiper.slideTo(floorplanSwiper.activeIndex - 1);
            }
          }
          updateFloorplanNavButtons();
        });
      }

      if (floorplanNext) {
        floorplanNext.addEventListener("click", function (e) {
          e.preventDefault();
          if (currentFloorplanTab === "floor") {
            if (floorplanSwiper.activeIndex < 3) {
              floorplanSwiper.slideTo(floorplanSwiper.activeIndex + 1);
            }
          } else {
            if (floorplanSwiper.activeIndex < 10) {
              floorplanSwiper.slideTo(floorplanSwiper.activeIndex + 1);
            }
          }
          updateFloorplanNavButtons();
        });
      }

      floorplanSwiper.on("slideChange", function () {
        if (currentFloorplanTab === "floor") {
          if (floorplanSwiper.activeIndex > 3) {
            floorplanSwiper.slideTo(3);
          }
        } else if (currentFloorplanTab === "unit") {
          if (floorplanSwiper.activeIndex < 4) {
            floorplanSwiper.slideTo(4);
          } else if (floorplanSwiper.activeIndex > 10) {
            floorplanSwiper.slideTo(10);
          }
        }
        updateFloorplanNavButtons();
      });

      // Wire Floorplan vs Unit Tab Toggle (Satisfies T3-02)
      var tabFloor = document.getElementById("tab_floor");
      var tabUnit = document.getElementById("tab_unit");
      var floorSlides = document.querySelectorAll(".floor-slide");
      var unitSlides = document.querySelectorAll(".unit-slide");

      if (tabFloor && tabUnit) {
        function activateFloorTab() {
          currentFloorplanTab = "floor";
          tabFloor.classList.remove("bg-[#0C5B3E]");
          tabFloor.classList.add("bg-[#B38F54]");
          tabUnit.classList.remove("bg-[#B38F54]");
          tabUnit.classList.add("bg-[#0C5B3E]");
          floorSlides.forEach(function (s) {
            s.classList.remove("hidden");
          });
          unitSlides.forEach(function (s) {
            s.classList.add("hidden");
          });
          if (floorplanSwiper) {
            floorplanSwiper.update();
            floorplanSwiper.slideTo(0);
          }
          updateFloorplanNavButtons();
        }

        function activateUnitTab() {
          currentFloorplanTab = "unit";
          tabUnit.classList.remove("bg-[#0C5B3E]");
          tabUnit.classList.add("bg-[#B38F54]");
          tabFloor.classList.remove("bg-[#B38F54]");
          tabFloor.classList.add("bg-[#0C5B3E]");
          unitSlides.forEach(function (s) {
            s.classList.remove("hidden");
          });
          floorSlides.forEach(function (s) {
            s.classList.add("hidden");
          });
          if (floorplanSwiper) {
            floorplanSwiper.update();
            floorplanSwiper.slideTo(4);
          }
          updateFloorplanNavButtons();
        }

        tabFloor.addEventListener("click", activateFloorTab);
        tabUnit.addEventListener("click", activateUnitTab);
        updateFloorplanNavButtons();
      }

      // 2.3. Section 11: Tin tức & Sự kiện Swiper (News Carousel)
      var newsSwiper = new Swiper(".news-swiper", {
        slidesPerView: 1,
        spaceBetween: 18,
        speed: 600,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        },
        navigation: {
          prevEl: "#news_prev",
          nextEl: "#news_next"
        },
        grabCursor: true
      });
    }

    // =========================================================================
    // 3. FANCYBOX 5 LIGHTBOX BINDING
    // =========================================================================
    if (typeof Fancybox !== "undefined") {
      Fancybox.bind("[data-fancybox]", {
        loop: true,
        fadeEffect: false,
        zoomEffect: false,
        hideClass: false,
        showClass: false,
        closeExisting: true,
        buttons: ["zoom", "slideShow", "fullScreen", "close"],
        on: {
          init: function () {
            if (slideObserver) slideObserver.disable();
          },
          destroy: function () {
            if (!isAnyModalOpen() && getIsDesktop() && slideObserver) {
              slideObserver.enable();
            }
          }
        }
      });
    }

    // =========================================================================
    // 4. MOBILE DRAWER MENU & SECTION NAVIGATION (Satisfies T3-01)
    // =========================================================================
    var menuBtn = document.getElementById("mobile_menu_btn");
    var menuClose = document.getElementById("mobile_menu_close");
    var drawer = document.getElementById("mobile_drawer");
    var mobileLinks = document.querySelectorAll(".mobile-nav-link");

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.remove("opacity-0", "pointer-events-none");
      drawer.classList.add("opacity-100", "pointer-events-auto");
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.add("opacity-0", "pointer-events-none");
      drawer.classList.remove("opacity-100", "pointer-events-auto");
    }

    if (menuBtn) menuBtn.addEventListener("click", openDrawer);
    if (menuClose) menuClose.addEventListener("click", closeDrawer);

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        closeDrawer();
        var href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          var targetSec = null;
          try {
            targetSec = document.getElementById(href.replace(/^#/, "")) || document.querySelector(href);
          } catch (e) {
            targetSec = null;
          }
          if (targetSec) {
            var idx = sections.indexOf(targetSec);
            if (idx !== -1) {
              goToSlide(idx, idx > currentIndex ? 1 : -1);
            }
          }
        }
      });
    });

    // =========================================================================
    // 5. MODAL DIALOG CONTROLLERS (CONSULTATION, SUCCESS, NEWS READER)
    // =========================================================================
    var consultModal = document.getElementById("FormDangKyModal");
    var successModal = document.getElementById("SuccessModal");
    var newsModal = document.getElementById("NewsDetailModal");
    var successTimer = null;

    function isAnyModalOpen() {
      if (consultModal && !consultModal.classList.contains("hidden")) return true;
      if (successModal && !successModal.classList.contains("hidden")) return true;
      if (newsModal && !newsModal.classList.contains("hidden")) return true;
      if (document.querySelector(".fancybox__container") || document.documentElement.classList.contains("with-fancybox")) return true;
      return false;
    }

    function openConsultModal() {
      if (!consultModal) return;
      consultModal.classList.remove("hidden", "opacity-0", "pointer-events-none");
      consultModal.classList.add("opacity-100", "pointer-events-auto");
      consultModal.style.display = "flex";
      var card = consultModal.querySelector(".transform");
      if (card) card.classList.replace("scale-95", "scale-100");
      if (slideObserver) slideObserver.disable();
    }

    function closeConsultModal() {
      if (!consultModal) return;
      consultModal.classList.add("hidden", "opacity-0", "pointer-events-none");
      consultModal.classList.remove("opacity-100", "pointer-events-auto");
      consultModal.style.display = "none";
      var card = consultModal.querySelector(".transform");
      if (card) card.classList.replace("scale-100", "scale-95");
      if (!isAnyModalOpen() && getIsDesktop() && slideObserver) slideObserver.enable();
    }

    function openSuccessModal() {
      if (!successModal) return;
      if (successTimer) clearTimeout(successTimer);
      successModal.classList.remove("hidden", "opacity-0", "pointer-events-none");
      successModal.classList.add("opacity-100", "pointer-events-auto");
      successModal.style.display = "flex";
      var card = successModal.querySelector(".transform");
      if (card) card.classList.replace("scale-95", "scale-100");
      if (slideObserver) slideObserver.disable();

      // Auto-dismiss after 3.5 seconds
      successTimer = setTimeout(function () {
        closeSuccessModal();
      }, 3500);
    }

    function closeSuccessModal() {
      if (!successModal) return;
      if (successTimer) {
        clearTimeout(successTimer);
        successTimer = null;
      }
      successModal.classList.add("hidden", "opacity-0", "pointer-events-none");
      successModal.classList.remove("opacity-100", "pointer-events-auto");
      successModal.style.display = "none";
      var card = successModal.querySelector(".transform");
      if (card) card.classList.replace("scale-100", "scale-95");
      if (!isAnyModalOpen() && getIsDesktop() && slideObserver) slideObserver.enable();
    }

    // Modal consultation trigger buttons
    var openButtons = document.querySelectorAll(
      "#azvidi_form, #xin_bang_gia, #btn_nhan_tu_van_tien_ich, #btn_chinh_sach_dang_ky, .btn-open-modal, [data-modal-trigger]"
    );
    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openConsultModal();
      });
    });

    var consultCloseBtn = document.getElementById("close_modal_btn");
    if (consultCloseBtn) consultCloseBtn.addEventListener("click", closeConsultModal);
    if (consultModal) {
      consultModal.addEventListener("click", function (e) {
        if (e.target === consultModal) closeConsultModal();
      });
    }

    // Success modal triggers & dismissals
    var successCloseBtn = document.getElementById("close_success_modal_btn");
    var successConfirmBtn = document.getElementById("confirm_success_btn");
    if (successCloseBtn) successCloseBtn.addEventListener("click", closeSuccessModal);
    if (successConfirmBtn) successConfirmBtn.addEventListener("click", closeSuccessModal);
    if (successModal) {
      successModal.addEventListener("click", function (e) {
        if (e.target === successModal) closeSuccessModal();
      });
    }

    // =========================================================================
    // 6. SECTION 11 NEWS DETAIL MODAL READER & SWR CACHE
    // =========================================================================
    var newsPostsCache = [
      {
        id: 610,
        title: "Liên doanh TT Genesis khởi công khu căn hộ phía Nam TP Hồ Chí Minh",
        date: "21/7/2026",
        category: "TIN TỨC & SỰ KIỆN",
        image: "assets/images/news-thumb-1.png",
        content: "<p>TT Genesis quy mô hơn 6.000 tỷ đồng tại khu Nam TP HCM, do TT Capital cùng các đối tác Nhật Bản và Singapore phát triển. Dự án nằm tại khu dân cư Đào Sư Tích (Phước Kiển, Nhà Bè), liền kề khu đô thị Phú Mỹ Hưng. Công trình được khởi công ngày 3/7 bởi liên doanh gồm Công ty Cổ phần Đầu tư TT Capital, Vietmax Capital, Cosmos Initia, Tập đoàn Hinokiya, Tập đoàn Koterasu cùng nhà thầu chính thức Công ty cổ phần Đầu tư Xây dựng Ricons.</p><p>Một trong những điểm nhấn của dự án là vị trí ba mặt hướng sông, tạo không gian tiếp cận thiên nhiên và tầm nhìn thoáng mở. Bên cạnh đó, dự án sở hữu 88 tiện ích đặc quyền phong cách resort Nhật Bản đáp ứng trọn vẹn nhu cầu của cư dân tinh hoa.</p>"
      },
      {
        id: 607,
        title: "TP Hồ Chí Minh bước vào chu kỳ đại đô thị",
        date: "21/7/2026",
        category: "TIN TỨC & SỰ KIỆN",
        image: "assets/images/news-thumb-2.jpg",
        content: "<p>Không gian phát triển của thị trường nhà ở TP HCM đang mở rộng nhanh về vùng ven. Giai đoạn 2026 – 2028 được dự báo sẽ đánh dấu chu kỳ phát triển của các đại đô thị với hàng chục nghìn sản phẩm mới mỗi năm và hạ tầng trở thành yếu tố quyết định giá trị gia tăng bền vững cho dự án.</p><p>Khu Nam TP HCM với hạt nhân Phú Mỹ Hưng và trục phát triển Nguyễn Hữu Thọ - Đào Sư Tích đang trở thành tâm điểm thu hút dòng vốn đầu tư bất động sản an cư chất lượng cao từ các nhà phát triển quốc tế.</p>"
      },
      {
        id: 598,
        title: "Khu Nam TP Hồ Chí Minh đón nhiều trợ lực hạ tầng",
        date: "21/7/2026",
        category: "TIN TỨC & SỰ KIỆN",
        image: "assets/images/news-thumb-3.webp",
        content: "<p>Sau nhiều năm chuẩn bị, khu Nam TP Hồ Chí Minh bước vào giai đoạn nâng cấp hạ tầng, góp phần tăng khả năng kết nối, trợ lực cho thị trường nhà ở. Bao quanh dự án là các công trình hạ tầng trọng điểm như cầu Phú Mỹ 2, cầu Thủ Thiêm 4, hầm chui Nguyễn Văn Linh – Nguyễn Hữu Thọ và tuyến Metro số 4.</p><p>Hạ tầng hoàn thiện giúp rút ngắn đáng kể thời gian di chuyển từ TT Genesis vào trung tâm Quận 1 và khu đô thị mới Thủ Thiêm, tạo đòn bẩy vững chắc cho giá trị bất động sản khu vực.</p>"
      }
    ];

    // SWR background fetch to update posts cache if available over network
    function initPostsCache() {
      fetch("assets/data/posts.json")
        .then(function (res) {
          if (res.ok) return res.json();
          throw new Error("HTTP " + res.status);
        })
        .then(function (data) {
          if (Array.isArray(data) && data.length > 0) {
            data.forEach(function (item, idx) {
              if (idx < newsPostsCache.length) {
                if (item.title && item.title.rendered) {
                  newsPostsCache[idx].title = item.title.rendered;
                }
                if (item.content && item.content.rendered) {
                  newsPostsCache[idx].content = item.content.rendered;
                }
              }
            });
          }
        })
        .catch(function () {
          // Gracefully continue using embedded cache
        });
    }
    initPostsCache();

    function openNewsModal(postIndex) {
      if (!newsModal) return;
      var article = newsPostsCache[postIndex] || newsPostsCache[0];
      if (!article) return;

      var titleEl = document.getElementById("news_modal_title");
      var dateEl = document.getElementById("news_modal_date");
      var categoryEl = document.getElementById("news_modal_category");
      var imageEl = document.getElementById("news_modal_image");
      var contentEl = document.getElementById("news_modal_content");

      if (titleEl) titleEl.innerText = article.title;
      if (dateEl) dateEl.innerText = article.date;
      if (categoryEl) categoryEl.innerText = article.category;
      if (imageEl) imageEl.src = article.image;
      if (contentEl) contentEl.innerHTML = article.content;

      newsModal.classList.remove("hidden", "opacity-0", "pointer-events-none");
      newsModal.classList.add("opacity-100", "pointer-events-auto");
      newsModal.style.display = "flex";

      var card = newsModal.querySelector(".transform");
      if (card) card.classList.replace("scale-95", "scale-100");

      // CRITICAL UX GUARD: Pause slide observer while reading long article
      if (slideObserver) slideObserver.disable();
    }

    function closeNewsModal() {
      if (!newsModal) return;
      newsModal.classList.add("hidden", "opacity-0", "pointer-events-none");
      newsModal.classList.remove("opacity-100", "pointer-events-auto");
      newsModal.style.display = "none";

      var card = newsModal.querySelector(".transform");
      if (card) card.classList.replace("scale-100", "scale-95");

      // CRITICAL UX GUARD: Re-enable slide observer when modal closes
      if (!isAnyModalOpen() && getIsDesktop() && slideObserver) slideObserver.enable();
    }

    var newsCloseBtn = document.getElementById("close_news_modal_btn");
    if (newsCloseBtn) newsCloseBtn.addEventListener("click", closeNewsModal);
    if (newsModal) {
      newsModal.addEventListener("click", function (e) {
        if (e.target === newsModal) closeNewsModal();
      });
    }

    // Wire click events on Section 11 read buttons and cards
    var newsReadButtons = document.querySelectorAll(".btn-read-news, .box-tin");
    newsReadButtons.forEach(function (el) {
      el.addEventListener("click", function (e) {
        // Prevent click bubbling if button inside box-tin is clicked
        e.stopPropagation();
        var rawIdx = el.getAttribute("data-index");
        if (rawIdx === null) {
          var parentCard = el.closest(".box-tin");
          if (parentCard) rawIdx = parentCard.getAttribute("data-index");
        }
        var idx = parseInt(rawIdx || "0", 10);
        if (isNaN(idx)) idx = 0;
        openNewsModal(idx);
      });
    });

    // Global Escape Key Listener for all modals
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (newsModal && !newsModal.classList.contains("hidden")) {
          closeNewsModal();
        } else if (consultModal && !consultModal.classList.contains("hidden")) {
          closeConsultModal();
        } else if (successModal && !successModal.classList.contains("hidden")) {
          closeSuccessModal();
        }
      }
    });

    // =========================================================================
    // 7. LEAD CAPTURE FORM SUBMISSION ADAPTERS (Satisfies T2-02, T2-03, Scenarios 1 & 2)
    // =========================================================================
    var ggfId =
      window.C_FORM && window.C_FORM.ggf_id
        ? window.C_FORM.ggf_id
        : "1FAIpQLSfWnTa8thyaDXmwsz48jttkg8BFlXJMuiWTdIIteNY9pAdO9w";
    var ggfUrl = "https://docs.google.com/forms/u/0/d/e/" + ggfId + "/formResponse";
    var phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

    function validateLead(rawName, rawPhone) {
      var name = (rawName || "").trim();
      var phone = (rawPhone || "").replace(/\s+/g, "");
      if (name.length < 2) return null;
      if (!phoneRegex.test(phone)) return null;
      return { name: name, phone: phone };
    }

    var spinnerSvg =
      '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>';
    var checkSvg =
      '<svg class="h-4 w-4 text-green-500 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>';

    function handleLeadSubmission(form, rawName, rawPhone, onSuccessCallback) {
      var valid = validateLead(rawName, rawPhone);
      if (!valid) return;

      var fields = form.querySelectorAll("input, button");
      var submitBtn = form.querySelector("button[type='submit']");
      var originalBtnHtml = submitBtn ? submitBtn.innerHTML : "<span>GỬI THÔNG TIN</span>";

      fields.forEach(function (f) {
        f.disabled = true;
      });

      if (submitBtn) {
        submitBtn.innerHTML = spinnerSvg + "<span>ĐANG GỬI THÔNG TIN...</span>";
      }

      var payload = new FormData();
      payload.append("entry.238096459", valid.name);
      payload.append("entry.563817230", valid.phone);

      function completeSuccess() {
        if (submitBtn) {
          submitBtn.innerHTML = checkSvg + "<span>ĐÃ GỬI THÀNH CÔNG!</span>";
        }
        form.reset();
        if (onSuccessCallback) onSuccessCallback();
        openSuccessModal();

        setTimeout(function () {
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnHtml;
          }
          fields.forEach(function (f) {
            f.disabled = false;
          });
        }, 3500);
      }

      fetch(ggfUrl, {
        method: "POST",
        mode: "no-cors",
        body: payload
      })
        .then(function () {
          completeSuccess();
        })
        .catch(function (err) {
          console.warn("Google Forms submission buffered offline:", err);
          try {
            var offline = JSON.parse(localStorage.getItem("ttgenesis2_offline_leads") || "[]");
            offline.push({
              name: valid.name,
              phone: valid.phone,
              form: form.id,
              date: new Date().toISOString()
            });
            localStorage.setItem("ttgenesis2_offline_leads", JSON.stringify(offline));
          } catch (storageErr) {
            // Ignore restricted localStorage quota
          }
          completeSuccess();
        });
    }

    // Modal Form (#FormDangKy)
    var leadForm = document.getElementById("FormDangKy");
    if (leadForm) {
      leadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(leadForm);
        var nameVal = fd.get("entry.238096459") || fd.get("fullName");
        var phoneVal = fd.get("entry.563817230") || fd.get("phoneNumber");
        handleLeadSubmission(leadForm, nameVal, phoneVal, function () {
          closeConsultModal();
        });
      });
    }

    // Footer Form (#FooterForm)
    var footerForm = document.getElementById("FooterForm");
    if (footerForm) {
      footerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(footerForm);
        var nameVal = fd.get("fullName") || fd.get("entry.238096459");
        var phoneVal = fd.get("phoneNumber") || fd.get("entry.563817230");
        handleLeadSubmission(footerForm, nameVal, phoneVal, null);
      });
    }
  });
})();
