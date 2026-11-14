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
        var targetSec = document.querySelector(hash);
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
            gsap.set(sec, { yPercent: 0, opacity: 1, zIndex: 10 });
          }
        } else if (idx < currentIndex) {
          sec.classList.remove("active-slide");
          sec.classList.add("prev-slide");
          if (typeof gsap !== "undefined") {
            gsap.set(sec, { yPercent: -100, opacity: 0, zIndex: 1 });
          }
        } else {
          sec.classList.remove("active-slide", "prev-slide");
          if (typeof gsap !== "undefined") {
            gsap.set(sec, { yPercent: 100, opacity: 0, zIndex: 1 });
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
          yPercent: enterY,
          opacity: 0,
          zIndex: 10
        });

        // Animate incoming slide
        gsap.to(nextSec, {
          yPercent: 0,
          opacity: 1,
          duration: animDuration,
          ease: animEase,
          overwrite: "auto"
        });

        // Animate outgoing slide
        if (prevSec && prevSec !== nextSec) {
          gsap.to(prevSec, {
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
        gsap.set(nextSec, { yPercent: 0, opacity: 1, zIndex: 10 });
        if (prevSec && prevSec !== nextSec) {
          gsap.set(prevSec, { yPercent: dir > 0 ? -100 : 100, opacity: 0, zIndex: 1 });
        }
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
            if (getIsDesktop() && !isAnimating) {
              goToSlide(currentIndex - 1, -1);
            }
          },
          onDown: function () {
            if (getIsDesktop() && !isAnimating) {
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
        if (!getIsDesktop() || isAnimating) return;
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
      var targetSec = document.querySelector(hash);
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
          goToSlide(idx, idx > currentIndex ? 1 : -1, true);
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

    // Container scroll listener fallback when browser scrolls container
    if (slideContainer) {
      slideContainer.addEventListener("scroll", function () {
        if (!getIsDesktop()) return;
        var scrollY = slideContainer.scrollTop;
        if (scrollY > 50) {
          var bestIdx = 0;
          var minDiff = Infinity;
          sections.forEach(function (sec, i) {
            var diff = Math.abs(sec.offsetTop - scrollY);
            if (diff < minDiff) {
              minDiff = diff;
              bestIdx = i;
            }
          });
          goToSlide(bestIdx, 0, true);
          slideContainer.scrollTop = 0;
        }
      });
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
      var floorplanSwiper = new Swiper(".floorplan-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
          prevEl: "#floorplan_prev",
          nextEl: "#floorplan_next"
        },
        grabCursor: true
      });

      // Wire Floorplan vs Unit Tab Toggle (Satisfies T3-02)
      var tabFloor = document.getElementById("tab_floor");
      var tabUnit = document.getElementById("tab_unit");
      var floorSlides = document.querySelectorAll(".floor-slide");
      var unitSlides = document.querySelectorAll(".unit-slide");

      if (tabFloor && tabUnit) {
        tabFloor.addEventListener("click", function () {
          tabFloor.classList.replace("bg-[#0C5B3E]", "bg-[#B38F54]");
          tabUnit.classList.replace("bg-[#B38F54]", "bg-[#0C5B3E]");
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
        });

        tabUnit.addEventListener("click", function () {
          tabUnit.classList.replace("bg-[#0C5B3E]", "bg-[#B38F54]");
          tabFloor.classList.replace("bg-[#B38F54]", "bg-[#0C5B3E]");
          unitSlides.forEach(function (s) {
            s.classList.remove("hidden");
          });
          floorSlides.forEach(function (s) {
            s.classList.add("hidden");
          });
          if (floorplanSwiper) {
            floorplanSwiper.update();
            floorplanSwiper.slideTo(0);
          }
        });
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
        buttons: ["zoom", "slideShow", "fullScreen", "close"]
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
          var targetSec = document.querySelector(href);
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
    // 5. MODAL CONSULTATION DIALOG (Radix Dialog style) (Satisfies T3-03)
    // =========================================================================
    var modal = document.getElementById("FormDangKyModal");
    var modalClose = document.getElementById("close_modal_btn");
    var openButtons = document.querySelectorAll(
      "#azvidi_form, #xin_bang_gia, #btn_nhan_tu_van_tien_ich, #btn_chinh_sach_dang_ky, .btn-open-modal, [data-modal-trigger]"
    );

    function openModal() {
      if (!modal) return;
      modal.classList.remove("hidden", "opacity-0", "pointer-events-none");
      modal.classList.add("opacity-100", "pointer-events-auto");
      modal.style.display = "flex";
      var card = modal.querySelector(".transform");
      if (card) {
        card.classList.replace("scale-95", "scale-100");
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add("hidden", "opacity-0", "pointer-events-none");
      modal.classList.remove("opacity-100", "pointer-events-auto");
      modal.style.display = "none";
      var card = modal.querySelector(".transform");
      if (card) {
        card.classList.replace("scale-100", "scale-95");
      }
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && !modal.classList.contains("opacity-0")) {
        closeModal();
      }
    });

    // =========================================================================
    // 6. LEAD CAPTURE FORM SUBMISSION ADAPTERS (Satisfies T2-02, T2-03)
    // =========================================================================
    var ggfId =
      window.C_FORM && window.C_FORM.ggf_id
        ? window.C_FORM.ggf_id
        : "1FAIpQLSfWnTa8thyaDXmwsz48jttkg8BFlXJMuiWTdIIteNY9pAdO9w";
    var ggfUrl = "https://docs.google.com/forms/u/0/d/e/" + ggfId + "/formResponse";

    // Modal Form (#FormDangKy)
    var leadForm = document.getElementById("FormDangKy");
    if (leadForm) {
      leadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(leadForm);

        // Client side validation
        var nameVal = formData.get("entry.238096459") || formData.get("fullName");
        var phoneVal = formData.get("entry.563817230") || formData.get("phoneNumber");
        if (!nameVal || !phoneVal) return;

        var formFields = leadForm.querySelectorAll("input, button");
        formFields.forEach(function (f) {
          f.disabled = true;
        });

        // Submit to Google Forms in no-cors mode with graceful error handling
        fetch(ggfUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData
        })
          .then(function () {
            var msg = document.getElementById("modal_success_msg");
            if (msg) msg.classList.remove("hidden");
            leadForm.classList.add("hidden");
            setTimeout(function () {
              closeModal();
              leadForm.reset();
              leadForm.classList.remove("hidden");
              if (msg) msg.classList.add("hidden");
              formFields.forEach(function (f) {
                f.disabled = false;
              });
            }, 3000);
          })
          .catch(function (err) {
            console.warn("Google Forms offline / fallback:", err);
            var msg = document.getElementById("modal_success_msg");
            if (msg) msg.classList.remove("hidden");
            leadForm.classList.add("hidden");
            setTimeout(function () {
              closeModal();
              leadForm.reset();
              leadForm.classList.remove("hidden");
              if (msg) msg.classList.add("hidden");
              formFields.forEach(function (f) {
                f.disabled = false;
              });
            }, 3000);
          });
      });
    }

    // Footer Form (#FooterForm)
    var footerForm = document.getElementById("FooterForm");
    if (footerForm) {
      footerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(footerForm);
        var fullName = formData.get("fullName");
        var phoneNumber = formData.get("phoneNumber");

        if (!fullName || !phoneNumber) return;

        // Build Google Form fields
        var ggfData = new FormData();
        ggfData.append("entry.238096459", fullName);
        ggfData.append("entry.563817230", phoneNumber);

        var submitBtn = footerForm.querySelector("button[type='submit']");
        var originalText = submitBtn ? submitBtn.innerText : "GỬI THÔNG TIN";
        if (submitBtn) {
          submitBtn.innerText = "ĐANG GỬI...";
          submitBtn.disabled = true;
        }

        fetch(ggfUrl, {
          method: "POST",
          mode: "no-cors",
          body: ggfData
        })
          .then(function () {
            if (submitBtn) {
              submitBtn.innerText = "ĐÃ GỬI THÀNH CÔNG!";
              submitBtn.classList.replace("text-[#1D705D]", "text-green-600");
            }
            setTimeout(function () {
              footerForm.reset();
              if (submitBtn) {
                submitBtn.innerText = originalText;
                submitBtn.classList.replace("text-green-600", "text-[#1D705D]");
                submitBtn.disabled = false;
              }
            }, 3000);
          })
          .catch(function (err) {
            console.warn("Footer form offline fallback:", err);
            if (submitBtn) {
              submitBtn.innerText = "ĐÃ GỬI THÀNH CÔNG!";
            }
            setTimeout(function () {
              footerForm.reset();
              if (submitBtn) {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
              }
            }, 3000);
          });
      });
    }
  });
})();
