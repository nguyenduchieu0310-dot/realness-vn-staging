var App = {
  preloader: function () {
    var mask = document.getElementById('preloader');
    if (!mask) return;

    var logo = mask.querySelector('.logo_preloader');
    var headerLogo = document.querySelector('#header_site .logo_site .logo');
    var mobile = window.matchMedia('(max-width: 991px)').matches;

    // Preloader chỉ là hiệu ứng mở màn, KHÔNG gánh việc chờ tài nguyên: vẽ xong
    // outline là bay luôn, trang còn đang tải ảnh cũng kệ. Thời lượng do đúng
    // một thứ quyết định - animation preloaderDraw trong main.scss.
    var DRAW_TIME = mobile ? 700 : 900; // dự phòng khi lỡ mất animationend
    var FLY_TIME = mobile ? 700 : 900; // khớp transition .logo_preloader trong main.scss

    var hidden = false;

    function elapsed() {
      return window.performance && performance.now ? performance.now() : DRAW_TIME;
    }

    // Đưa logo preloader về nằm khít lên logo header: cùng tâm, cùng bề ngang.
    // Đo ngay lúc bay chứ không đo sẵn từ đầu, vì trước đó ảnh logo header có
    // thể chưa tải xong nên chưa có kích thước thật.
    function flyToHeaderLogo() {
      if (!logo || !headerLogo) return false;

      var from = logo.getBoundingClientRect();
      var to = headerLogo.getBoundingClientRect();
      if (!from.width || !to.width) return false;

      var scale = to.width / from.width;
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      var dy = (to.top + to.height / 2) - (from.top + from.height / 2);

      logo.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
      return true;
    }

    function hide() {
      if (hidden) return;
      hidden = true;

      // Nền overlay mờ đi và logo bắt đầu bay. Nội dung section đầu chạy
      // hiệu ứng ngay từ nhịp này, không đợi logo hạ cánh xong.
      mask.classList.add('is-leaving');
      // .logo-flying giữ logo header ẩn tiếp sau khi bỏ .preloading. Phải mở
      // khoá cuộn TRƯỚC khi đo: bỏ overflow:hidden làm thanh cuộn hiện lại và
      // header xê dịch, đo trước thì logo hạ cánh lệch đúng bề rộng thanh cuộn.
      document.body.classList.add('logo-flying');
      document.body.classList.remove('preloading');

      var flying = flyToHeaderLogo();
      if (flying) mask.classList.add('is-flying');
      App.playFirstSection();

      setTimeout(function () {
        // Logo preloader đang nằm khít lên logo header: cho logo header hiện
        // lên, đồng thời mờ logo preloader đi -> nhìn như vẫn là một logo
        document.body.classList.remove('logo-flying');
        mask.classList.add('hide');

        // Gỡ hẳn overlay sau khi fade-out kết thúc
        setTimeout(function () {
          if (mask.parentNode) mask.parentNode.removeChild(mask);
        }, 600);
      }, flying ? FLY_TIME : 0);
    }

    // Vẽ xong outline (animation preloaderDraw) là bay luôn; màu đổ vào trong
    // lúc đang bay bằng transition trên .draw_line, xem main.scss. Bắt đúng sự
    // kiện thay vì hẹn giờ, vì CSS chạy từ khung hình đầu tiên còn JS thì không
    // biết mốc đó rơi vào lúc nào.
    mask.addEventListener('animationend', function (e) {
      if (e.animationName === 'preloaderDraw') hide();
    });

    // Dự phòng cho trường hợp animationend không bao giờ tới: main.js chạy sau
    // khi vẽ đã xong (mobile tải script chậm), hoặc trình duyệt không chạy CSS
    // animation. Còn nét đang vẽ dở thì để animationend chốt - hẹn giờ theo
    // đồng hồ trang sẽ cắt ngang nét vẽ, vì CSS bắt đầu chạy từ khung hình đầu
    // tiên chứ không phải từ lúc mở trang.
    function drawFallbackDelay() {
      var line = logo && logo.querySelector('.draw_line');
      if (!line || !line.getAnimations) return Math.max(0, DRAW_TIME - elapsed());

      var pending = line.getAnimations().filter(function (a) {
        return a.playState !== 'finished';
      });
      return pending.length ? DRAW_TIME : 0;
    }

    setTimeout(hide, drawFallbackDelay());
  },
  scrollHeader: function () {
    var lastScrollTop = 0;

    function toggleHeaderScrolled() {
      var st = jQuery(window).scrollTop();

      // Thêm / xoá class scrolled
      if (st > 0) {
        jQuery('#header_site').addClass('scrolled');
      } else {
        jQuery('#header_site')
          .removeClass('scrolled scrolldown scrollup');
      }

      // Xác định hướng scroll (chỉ khi > 100)
      if (st > 0) {
        if (st > lastScrollTop) {
          // Scroll xuống
          jQuery('#header_site')
            .addClass('scrolldown')
            .removeClass('scrollup');
        } else {
          // Scroll lên
          jQuery('#header_site')
            .addClass('scrollup')
            .removeClass('scrolldown');
        }
      }

      lastScrollTop = st <= 0 ? 0 : st; // tránh giá trị âm
    }

    // Khi load trang
    toggleHeaderScrolled();

    // Khi scroll
    jQuery(window).on('scroll', function () {
      toggleHeaderScrolled();
    });

  },
  ttSlider: function () {
    var el = document.querySelector('.slider_exercise');
    if (!el || typeof Swiper === 'undefined') return;

    var wrapper = el.querySelector('.swiper-wrapper');
    var slides = el.querySelectorAll('.swiper-slide');
    var total = slides.length;
    if (!total) return;
    jQuery('.tt_exercise .total_slider').text(total);

    // Swiper 11 chạy loop + slidesPerView:'auto' phải có đủ slide để lấp hai bên
    // slide giữa; ít hơn MIN_SLIDES là hụt, để lộ khoảng trắng (4 tiện ích là
    // dính). Nhân bản cho đủ, số đếm bên dưới vẫn quy về total gốc.
    var MIN_SLIDES = 8;
    if (total > 1 && total < MIN_SLIDES) {
      for (var i = 1, copies = Math.ceil(MIN_SLIDES / total); i < copies; i++) {
        for (var j = 0; j < total; j++) {
          wrapper.appendChild(slides[j].cloneNode(true));
        }
      }
    }

    function updateControls(sw) {
      var index = sw.realIndex % total;
      jQuery('.tt_exercise .current_slider').text(index + 1);
      jQuery('.tt_exercise .progress_slider span').css('width', ((index + 1) / total * 100) + '%');
    }

    new Swiper(el, {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: total > 1,
      loopAdditionalSlides: 2,
      // Slide 800px + scale(0.49) cho slide phụ: bù khoảng cách bằng space âm
      // để ảnh bên cách ảnh giữa đúng 16px như thiết kế
      spaceBetween: -100,
      speed: 700,
      grabCursor: true,
      breakpoints: {
        0: {
          spaceBetween: 16
        },

        // Tablet nhỏ
        768: {
          spaceBetween: -50
        },

        // iPad Pro 11 / tablet ngang 1024px
        1024: {
          spaceBetween: -70
        },

        // Desktop
        1200: {
          spaceBetween: -100
        }
      },
      navigation: {
        nextEl: '.tt_exercise .next_slider',
        prevEl: '.tt_exercise .prev_slider'
      },
      on: {
        afterInit: updateControls,
        slideChange: updateControls
      }
    });
  },
  // ---------------------------------------------------------------------------
  // Hiệu ứng nội dung hiện ra khi tới section.
  //
  // Khai báo bằng attribute ngay trong markup, KHÔNG viết timeline riêng cho
  // từng section nữa (cách cũ: mỗi section một khối gsap.fromTo chép đi chép
  // lại, đổi giao diện là phải sửa JS):
  //
  //   data-reveal="up"            biến thể, xem App.revealVariants bên dưới
  //   data-reveal-delay="0.35"    dời điểm bắt đầu (giây) trong section
  //   data-reveal-stagger="0.12"  chạy lần lượt CÁC CON TRỰC TIẾP thay vì chính
  //                               nó; con không cần khai báo gì thêm
  //   data-reveal-clear           chạy xong thì xoá transform gsap để lại
  //                               (xem lý do ngay tại chỗ dùng, trong addReveal)
  //
  // Hai chế độ chạy dùng chung một bộ khai báo:
  //   - Desktop: fullpage đang bật nên không có scroll thật, ScrollTrigger vô
  //     dụng -> gom thành timeline tạm dừng, phát khi section trượt vào màn
  //     hình (App.playSectionEffect gọi từ fullPageScroll).
  //   - Mobile: scroll thường -> mỗi phần tử một ScrollTrigger chạy một lần khi
  //     vào tầm nhìn. Không dùng chung timeline của cả section vì section trên
  //     mobile dài hơn màn hình, nội dung cuối sẽ chạy xong từ lúc chưa ai thấy.
  // ---------------------------------------------------------------------------
  //
  // Khoá "fade" trong mỗi biến thể dưới đây: false = không đụng tới opacity,
  // còn số = opacity lúc bắt đầu, tính theo tỉ lệ của opacity gốc trong CSS
  // (mặc định 0, tức hiện dần từ trong suốt).
  revealVariants: {
    // Chỉ mờ dần, không đụng transform - dùng cho khối đã có transform trong
    // CSS (.scroll_general, .moon-png... đang căn giữa bằng translate)
    fade: { from: {}, duration: 1.2 },
    up: { from: { y: 56 } },
    down: { from: { y: -56 } },
    left: { from: { x: -64 } },
    right: { from: { x: 64 } },
    scale: { from: { scale: 0.92 }, duration: 1.3 },
    blur: { from: { filter: 'blur(14px)' }, to: { filter: 'blur(0px)' }, duration: 1.5 },
    // Vén ảnh từ dưới lên, kèm nhích scale cho đỡ khô
    mask: {
      from: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 },
      to: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
      duration: 1.5,
      ease: 'power3.inOut',
      fade: false
    },
    // Ảnh nền nhả zoom chậm - chất liệu quen thuộc của web bất động sản
    zoom: { from: { scale: 1.14 }, duration: 2.4, ease: 'power2.out', fade: 0.4 }
  },
  initSectionEffects: function () {
    // Trước khi JS chạy, nội dung được ẩn bằng CSS (.has-reveal trong
    // _var.scss). Gỡ class ngay khi gsap đã ghi xong trạng thái ẩn bằng inline
    // style, hoặc khi không chạy hiệu ứng nữa - chạy ở MỌI nhánh thoát, không
    // thì nội dung nằm ẩn vĩnh viễn.
    var cssHandoff = function () {
      document.documentElement.classList.remove('has-reveal');
    };

    // Nhánh bỏ hiệu ứng: CSS gỡ ra là chữ hiện, nhưng số đếm thì markup in sẵn
    // "0" và chỉ timeline mới ghi số thật vào — bỏ timeline mà không ghi hộ
    // thì .number_static đứng im ở 0 vĩnh viễn.
    var skipEffects = function () {
      jQuery('[data-reveal="count"]').each(function () {
        var count = App.countParse(this);
        if (count) this.innerHTML = count.format(count.value);
      });
      cssHandoff();
    };

    if (typeof gsap === 'undefined') return skipEffects();

    // Tôn trọng thiết lập giảm chuyển động của hệ điều hành: bỏ hẳn hiệu ứng,
    // nội dung hiện sẵn ngay từ đầu. Nhánh này gặp nhiều hơn tưởng: Windows tắt
    // "Animation effects" (hay tắt trên máy văn phòng, máy yếu, Remote Desktop)
    // hoặc macOS / iOS bật "Reduce motion" là Chrome, Edge, Safari đều báo reduce.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return skipEffects();

    var useTimeline = window.matchMedia('(min-width: 992px)').matches;
    var hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

    jQuery('body > section, section, .tt_floorplan_master_wrapper, .tt_utility_master_wrapper, footer').each(function () {
      var section = this;
      if (jQuery(section).data('revealTl')) return;
      var items = App.revealItems(section);
      if (!items.length) return;

      var tl = gsap.timeline({ paused: true });
      items.forEach(function (el, index) {
        App.addReveal(tl, el, App.revealStart(el, index));
      });
      tl.progress(1);
      jQuery(section).data('revealTl', tl);
    });

    jQuery('[data-reveal]').each(function () {
      if (this.style.visibility === 'hidden' && (this.style.opacity === '0' || this.style.opacity === '')) {
        this.style.removeProperty('visibility');
        this.style.removeProperty('opacity');
        this.style.removeProperty('transform');
      }
    });

    // Cùng lý do với tl.progress(0) ở trên, nhưng cho nhánh ScrollTrigger:
    // trạng thái đầu chỉ được ghi vào DOM ở nhịp ticker kế tiếp, sớm muộn tuỳ
    // lúc - ép vẽ ngay để nội dung không loé lên rồi mới ẩn đi
    gsap.ticker.tick();

    // Tới đây inline style của gsap đã thay CSS giữ trạng thái ẩn. Cùng một
    // lượt chạy JS nên trình duyệt chưa vẽ lại giữa chừng, không có chớp.
    cssHandoff();

    // Ảnh nạp xong làm chiều cao đổi -> điểm kích hoạt tính lúc đầu bị lệch
    if (hasScrollTrigger) {
      jQuery(window).on('load', function () {
        ScrollTrigger.refresh();
      });
    }

    // Chế độ đã chốt lúc khởi tạo. Khi cửa sổ thu nhỏ khỏi ngưỡng desktop,
    // fullpage tắt nên không còn ai phát timeline: phải tua nốt các section
    // chưa xem tới, không thì nội dung nằm ẩn vĩnh viễn.
    if (useTimeline) {
      var mq = window.matchMedia('(min-width: 992px)');
      var revealAll = function () {
        if (mq.matches) return;
        jQuery('body > section, section, .tt_floorplan_master_wrapper, .tt_utility_master_wrapper, footer').each(function () {
          var tl = jQuery(this).data('revealTl');
          if (tl) tl.progress(1);
        });
      };
      if (mq.addEventListener) mq.addEventListener('change', revealAll);
      else if (mq.addListener) mq.addListener(revealAll);
    }
  },
  // Phần tử được chạy hiệu ứng trong một section
  revealItems: function (section) {
    return jQuery(section).find('[data-reveal]').filter(function () {
      // Con trực tiếp của khối stagger đã được khối cha chạy hộ
      return !jQuery(this).parent().is('[data-reveal-stagger]');
    }).toArray();
  },
  // Điểm bắt đầu trong timeline của section: lấy theo khai báo, không có thì
  // xếp lần lượt để nội dung hiện theo thứ tự trong markup
  revealStart: function (el, index) {
    var delay = parseFloat(jQuery(el).attr('data-reveal-delay'));
    return isNaN(delay) ? index * 0.1 : delay;
  },
  addReveal: function (tl, el, at) {
    var $el = jQuery(el);
    var name = ($el.attr('data-reveal') || '').trim() || 'up';

    if (name === 'count') {
      App.addCount(tl, el, at);
      return;
    }

    var stagger = parseFloat($el.attr('data-reveal-stagger'));
    var targets;

    if (name === 'lines') {
      // Tách chữ theo dòng rồi cho từng dòng hiện lên - dùng cho đoạn văn dài,
      // KHÔNG dùng cho tiêu đề đổ gradient (background-clip: text nằm ở thẻ
      // cha, tách ra thì chữ trong dòng con mất màu)
      targets = App.splitLines(el);
      name = 'up';
      if (!targets.length) targets = [el];
      if (isNaN(stagger)) stagger = 0.12;
    } else if (!isNaN(stagger)) {
      targets = $el.children().toArray();
    } else {
      targets = [el];
    }
    if (!targets.length) return;

    var variant = App.revealVariants[name] || App.revealVariants.up;
    // Đọc opacity gốc TRƯỚC khi gsap ghi đè: nhiều khối đang dùng .op-75 /
    // .op-80, kéo tất cả về 1 là sai thiết kế
    var alpha = targets.map(App.baseOpacity);

    var from = jQuery.extend({}, variant.from);
    var to = {
      duration: variant.duration || 1.2,
      ease: variant.ease || 'power3.out',
      stagger: isNaN(stagger) ? 0 : stagger
    };

    // Chỉ trả về giá trị gốc cho đúng những thuộc tính biến thể có đụng tới.
    // Nếu gán sẵn x/y/scale cho mọi biến thể thì gsap ghi transform đè lên
    // transform có sẵn trong CSS (ví dụ .moon-png đang translateX(-59%)).
    Object.keys(from).forEach(function (key) {
      if (key === 'x' || key === 'y') to[key] = 0;
      else if (key === 'scale') to[key] = 1;
    });
    jQuery.extend(to, variant.to);

    if (variant.fade !== false) {
      var ratio = typeof variant.fade === 'number' ? variant.fade : 0;
      from.autoAlpha = function (i) { return alpha[i] * ratio; };
      to.autoAlpha = function (i) { return alpha[i]; };
    }

    tl.fromTo(targets, from, to, at);

    /* gsap chạy xong vẫn để lại inline transform (scale 1, y 0...) — nhìn thì
       y hệt lúc chưa có, nhưng transform sinh ra một TẦNG XẾP LỚP riêng: mọi
       z-index bên trong khối chỉ còn so với nhau, không so được với khối bên
       ngoài nữa. Khối nào cần giữ nguyên hệ z-index của cả section thì đánh dấu
       data-reveal-clear (ví dụ .utility_map: thẻ ảnh bật lên từ trong sơ đồ
       phải đè được lên thẻ tiêu đề và bảng danh sách nằm ngoài nó).

       Đặt bằng tl.set chứ không phải onComplete: timeline của section chạy ở
       chế độ tua (tl.progress(1) lúc cửa sổ thu xuống mobile), mà tua thì gsap
       bỏ qua callback nhưng vẫn áp dụng tween. */
    if ($el.is('[data-reveal-clear]')) {
      var span = (to.duration || 1.2) + (to.stagger || 0) * (targets.length - 1);
      tl.set(targets, { clearProps: 'transform' }, at + span);
    }
  },
  addCount: function (tl, el, at) {
    var count = App.countParse(el);
    if (!count) return;

    var proxy = { value: 0 };

    tl.fromTo(proxy, { value: 0 }, {
      value: count.value,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: function () {
        el.innerHTML = count.format(proxy.value);
      }
    }, at);
  },
  // Đọc data-target thành { value, format }; null khi không phải số
  countParse: function (el) {
    var raw = (el.getAttribute('data-target') || '').trim();
    var value = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(value)) return null;

    /* Dấu chấm trong data-target là dấu thập phân (0.5, 1.9). Dấu phẩy là dấu
       ngăn hàng nghìn do NGƯỜI NHẬP viết sẵn ("1,438") — in ra phải giữ đúng
       dấu đó, không đổi theo ngôn ngữ: khách gõ "1,438" mà trang tiếng Việt
       hiện "1.438" thì họ coi là lỗi. Chỉ khi số không viết dấu nhóm nào
       ("1438") mới để toLocaleString ngăn theo <html lang> — không khoá cứng
       'vi-VN' vì bản tiếng Anh ngăn bằng dấu phẩy. */
    var locale = document.documentElement.getAttribute('lang') || 'vi-VN';
    var group = raw.indexOf(',') > -1 ? ',' : '';
    var decimals = raw.indexOf('.') > -1 ? raw.split('.')[1].length : 0;

    function format(n) {
      var fixed = n.toFixed(decimals);
      var parts = fixed.split('.');

      if (group) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, group);
      } else if (decimals === 0) {
        parts[0] = Number(parts[0]).toLocaleString(locale);
      }

      return parts.join('.');
    }

    return { value: value, format: format };
  },
  splitLines: function (el) {
    if (typeof SplitType === 'undefined') return [];
    var $el = jQuery(el);
    if (!$el.data('revealSplit')) {
      $el.data('revealSplit', new SplitType(el, { types: 'lines', lineClass: 'reveal_line' }));
    }
    return $el.find('.reveal_line').toArray();
  },
  baseOpacity: function (el) {
    var value = parseFloat(window.getComputedStyle(el).opacity);
    return isNaN(value) ? 1 : value;
  },
  playSectionEffect: function (sectionEl) {
    var tl = jQuery(sectionEl).data('revealTl');
    if (tl) tl.restart(true);
  },
  // Section đầu tiên không đi qua goTo() nên phải tự phát, và chỉ phát sau khi
  // preloader mở màn - không thì hiệu ứng chạy xong sau tấm che
  playFirstSection: function () {
    if (App.firstSectionPlayed) return;
    App.firstSectionPlayed = true;
    App.playSectionEffect(jQuery('body > section').first());
  },
  fullPageScroll: function () {
    // Fullpage kiểu slide-over (tham khảo ttavio.vn):
    // các section xếp chồng, section mới trượt đè lên section hiện tại
    var sections = jQuery('body > section, body > #floorplan_site').toArray();
    if (sections.length < 2) return;

    var current = 0;
    var isAnimating = false;
    var enabled = false;
    var wheelReadyAt = 0;
    var mq = window.matchMedia('(min-width: 992px)');

    // Lightbox trang Hình ảnh phủ kín màn hình (xem App.imageLightbox). Lúc nó
    // mở thì lăn chuột và mũi tên là thao tác với nó, không phải lệnh đổi
    // section — và wheel ở đây preventDefault vô điều kiện, không nhường thì dải
    // ảnh nhỏ bên trái cũng không cuộn được.
    function locked() {
      /* .lightbox-open — lightbox ảnh/video của theme (App.mediaLightbox).
         .modal-open   — hộp thoại Bootstrap: popup chi tiết trang Tiến độ, form
                         tải brochure, hộp thông tin nhà đầu tư.
         .unit-sheet-open — tấm chi tiết căn của section mặt bằng tháp.

         Thiếu vế thứ hai thì lăn chuột trong một hộp thoại đang mở vẫn đổi
         section phía sau: đóng hộp ra là thấy mình đang đứng ở chỗ khác. Chỉ
         không lộ ra khi section phía sau còn chỗ cuộn, vì lúc đó nhánh
         canScroll() nhường quyền trước khi tới đây. */
      return document.body.classList.contains('lightbox-open')
        || document.body.classList.contains('modal-open')
        || document.body.classList.contains('unit-sheet-open');
    }

    /**
     * Khối tự cuộn bên trong section đang xem, nếu có.
     *
     * Trang Tiến độ có một section cao hơn màn hình: nội dung phải cuộn hết rồi
     * mới được chuyển sang section sau. Khối cuộn là .js-fp-scroll BÊN TRONG
     * section chứ không phải chính section — ảnh nền và chữ nền nằm ngoài khối
     * đó nên đứng yên trong lúc nội dung chạy qua.
     */
    function scroller() {
      var s = sections[current];
      return s ? s.querySelector('.js-fp-scroll') : null;
    }

    /**
     * Còn chỗ để cuộn trong section theo hướng đang đi không?
     *
     * @param {number} dir 1 = xuống, -1 = lên.
     */
    function canScroll(dir) {
      var el = scroller();
      if (!el) return false;

      var max = el.scrollHeight - el.clientHeight;
      // Trừ hao 1px: scrollHeight/clientHeight là số thực, ở mức thu phóng lẻ
      // thì scrollTop không bao giờ chạm đúng max và section sẽ kẹt lại.
      if (max <= 1) return false;

      return dir > 0 ? el.scrollTop < max - 1 : el.scrollTop > 1;
    }

    // Chạm mép khối cuộn thì chờ một nhịp rồi mới cho chuyển section. Không có
    // nhịp nghỉ này thì cú lăn đang đưa nội dung tới đáy sẽ chuyển section luôn
    // trong cùng một cử chỉ — người đọc chưa kịp nhìn dòng cuối.
    var edgeReadyAt = 0;
    var EDGE_PAUSE = 420;

    function enable() {
      if (enabled) return;
      enabled = true;
      // Khoảng nghỉ sau khi khởi động: nuốt chuỗi wheel event quán tính
      // trackpad còn sót lại từ trước khi reload (macOS vẫn bắn tiếp vào
      // trang mới), nếu không trang sẽ tự trượt sang section kế tiếp
      wheelReadyAt = Date.now() + 600;
      window.scrollTo(0, 0);
      jQuery('body').addClass('fp-active');
      sections.forEach(function (s, i) {
        gsap.set(s, { yPercent: i === current ? 0 : 100, zIndex: i === current ? 1 : 0 });
      });
      // Section mở sẵn có thể là nền sáng (trang Thư viện, Mặt bằng...): đổi
      // bộ màu header ngay từ đầu, không đợi tới lần chuyển section đầu tiên.
      App.headerTone(sections[current]);
    }

    function disable() {
      if (!enabled) return;
      enabled = false;
      jQuery('body').removeClass('fp-active');
      gsap.set(sections, { clearProps: 'transform,zIndex' });
    }

    function afterChange() {
      // Header đổi trạng thái như khi scroll thường
      jQuery('#header_site').toggleClass('scrolled scrolldown', current > 0);

      App.headerTone(sections[current]);
      jQuery('#header_site .logo_site').toggleClass(
        'standout',
        jQuery(sections[current]).hasClass('tt_footer')
      );

      App.setActiveSection(sections[current]);
    }

    function goTo(index) {
      if (!enabled || isAnimating || index === current || index < 0 || index > sections.length - 1) return;
      isAnimating = true;

      var incoming = sections[index];
      var outgoing = sections[current];
      var fromTop = index < current; // đi lên -> section mới trượt từ trên xuống

      /* Section sắp vào mà tự cuộn được thì phải đặt sẵn đúng đầu hay đúng đáy:
         đi XUỐNG thì người đọc gặp phần đầu của nó, đi LÊN thì gặp phần cuối —
         đúng như cuộn một trang liền mạch. Để nguyên chỗ cũ thì quay lại một
         section từng xem sẽ rơi vào giữa chừng. */
      var box = incoming.querySelector('.js-fp-scroll');
      if (box) box.scrollTop = fromTop ? box.scrollHeight : 0;

      // Phát hiệu ứng NGAY lúc section bắt đầu trượt vào, không đợi trượt xong.
      // Lúc này nó còn nằm ngoài khung nhìn nên khoảnh khắc gsap kéo nội dung
      // về trạng thái ẩn không ai thấy, và nội dung hiện dần trong lúc section
      // đang vào. Gọi ở onComplete thì section đã đứng yên trước mắt: quay lại
      // một section từng xem sẽ thấy nội dung đang hiện bị chớp tắt rồi mới
      // chạy lại - đúng cảm giác "hiện sẵn rồi mới ẩn đi".
      App.playSectionEffect(incoming);

      /* Section đang rời đi ĐỨNG YÊN, chỉ section mới trượt đè lên. Đã thử cho
         section cũ co lại và mờ đi để tạo chiều sâu: nền body sáng lộ ra quanh
         mép section đang co, nhìn như vỡ layout — bỏ. */
      gsap.fromTo(incoming,
        { yPercent: fromTop ? -100 : 100, zIndex: 2 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'sine.inOut',
          onComplete: function () {
            gsap.set(outgoing, { yPercent: 100, zIndex: 0 });
            gsap.set(incoming, { zIndex: 1 });
            current = index;
            afterChange();
            // Chờ hết quán tính trackpad rồi mới nhận scroll tiếp
            setTimeout(function () {
              isAnimating = false;
            }, 200);
          }
        });
    }

    //handle btn scroll to top
    App.goToSection = goTo;
    // Cho scrollToTarget() biết đang ở section nào, để khỏi gọi goTo() thừa
    // (và khỏi phải chờ 850ms cho một animation không hề chạy).
    App.currentSection = function () { return current; };


    // Phân biệt cử chỉ scroll mới với quán tính trackpad (cách của fullpage.js):
    // đầu cử chỉ delta tăng dần -> nhận; đuôi quán tính delta giảm dần -> bỏ qua
    var wheelDeltas = [];
    var lastWheelTime = 0;

    function average(arr) {
      if (!arr.length) return 0;
      var sum = 0;
      for (var i = 0; i < arr.length; i++) sum += arr[i];
      return sum / arr.length;
    }

    window.addEventListener('wheel', function (e) {
      if (!enabled || locked()) return;

      /* Nhường cú lăn cho khối tự cuộn bên trong, CHỈ KHI con trỏ đang nằm
         trong chính khối đó — và không preventDefault để trình duyệt tự cuộn.

         Điều kiện con trỏ là bắt buộc: khối cuộn của trang Tiến độ phủ kín
         section nên lúc nào cũng đúng, y như trước; còn bảng danh sách tiện ích
         chỉ chiếm một góc, đặt chuột trên sơ đồ mà vẫn bắt cuộn hết bảng mới
         cho qua section sau thì thành ra lăn mãi không đi đâu được. */
      var box = scroller();

      if (box && box.contains(e.target) && canScroll(e.deltaY > 0 ? 1 : -1)) {
        edgeReadyAt = Date.now() + EDGE_PAUSE;
        wheelDeltas = [];
        return;
      }

      e.preventDefault();

      // Vừa chạm mép khối cuộn: nuốt phần đuôi của cử chỉ hiện tại.
      if (Date.now() < edgeReadyAt) return;

      var now = Date.now();
      if (now - lastWheelTime > 200) wheelDeltas = []; // nghỉ đủ lâu -> cử chỉ mới
      lastWheelTime = now;

      wheelDeltas.push(Math.abs(e.deltaY));
      if (wheelDeltas.length > 60) wheelDeltas.shift();

      // Trong khoảng nghỉ sau enable(): chỉ ghi nhận delta, không chuyển
      // section - để quán tính sót lại sau reload không tự kích hoạt goTo
      if (now < wheelReadyAt) return;

      if (isAnimating || Math.abs(e.deltaY) < 5) return;

      // Ít event = vừa bắt đầu cử chỉ -> nhận luôn.
      // Nhiều event -> chỉ nhận khi delta đang tăng tốc so với nhịp trước đó
      if (wheelDeltas.length > 5) {
        var recent = average(wheelDeltas.slice(-3));
        var before = average(wheelDeltas.slice(-8, -3));
        if (recent <= before * 1.2) return;
      }

      goTo(e.deltaY > 0 ? current + 1 : current - 1);
    }, { passive: false });

    window.addEventListener('keydown', function (e) {
      if (!enabled || isAnimating || locked()) return;
      if (jQuery(e.target).is('input, textarea, select')) return;
      var dir = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
      if (!dir) return;

      e.preventDefault();

      /* Cuộn khối bên trong bằng tay chứ không nhường cho trình duyệt: khối chỉ
         nhận phím mũi tên khi chính nó đang được focus, mà focus lúc này thường
         đang ở nút trong lưới. */
      if (canScroll(dir)) {
        var box = scroller();
        box.scrollBy({ top: dir * window.innerHeight * 0.8, behavior: 'smooth' });
        edgeReadyAt = Date.now() + EDGE_PAUSE;
        return;
      }

      if (Date.now() < edgeReadyAt) return;

      goTo(current + dir);
    });

    // Vuốt trên màn hình cảm ứng
    var touchStartY = null;
    window.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', function (e) {
      if (!enabled || isAnimating || touchStartY === null || locked()) return;
      var delta = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(delta) < 50) return;

      // Vuốt trong section còn chỗ cuộn: trình duyệt đã cuộn xong rồi (listener
      // này là passive), việc còn lại chỉ là đừng đổi section.
      if (canScroll(delta > 0 ? 1 : -1)) {
        edgeReadyAt = Date.now() + EDGE_PAUSE;
        return;
      }
      if (Date.now() < edgeReadyAt) return;

      goTo(delta > 0 ? current + 1 : current - 1);
    }, { passive: true });

    // Chốt chặn: khi fullpage bật, scrollY phải luôn = 0. Chrome có thể
    // restore vị trí scroll cũ sau khi enable() đã chạy (kể cả sau sự kiện
    // load) làm khung nhìn lệch xuống đống section chồng nhau - ép về 0 ngay
    window.addEventListener('scroll', function () {
      if (enabled && (window.scrollY || window.pageYOffset)) {
        window.scrollTo(0, 0);
      }
    }, { passive: true });

    window.addEventListener('load', function () {
      if (enabled) window.scrollTo(0, 0);
    });

    function refresh() {
      if (mq.matches) {
        enable();
      } else {
        disable();
      }
    }

    if (mq.addEventListener) {
      mq.addEventListener('change', refresh);
    } else if (mq.addListener) {
      mq.addListener(refresh);
    }
    refresh();
  },
  parallaxItem: function () {
    // Initialize GSAP
    const { gsap } = window;
    gsap.registerPlugin('x', 'y');

    // Set up the parallax effect
    const parallaxItems = document.querySelectorAll('.parallax-item');
    const movementStrength = 50; // Adjust this value to control the intensity of the parallax effect

    // Track mouse position
    document.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
      const { clientX, clientY } = event;

      // Loop through each item
      parallaxItems.forEach((item) => {
        const depth = parseFloat(item.getAttribute('data-parallax'));
        const direction = item.hasAttribute('data-direction') ? parseFloat(item.getAttribute('data-direction')) : 1;

        const isParallaxX = item.hasAttribute('data-parallax-direction-x') ? (item.getAttribute('data-parallax-direction-x') === 'true') : true;
        const isParallaxY = item.hasAttribute('data-parallax-direction-y') ? item.getAttribute('data-parallax-direction-y') === 'true' : true;
        // Calculate movement values based on depth and direction
        const xPos = isParallaxX ? direction * (window.innerWidth / 2 - clientX) / (movementStrength * depth) : 0;
        const yPos = isParallaxY ? direction * (window.innerHeight / 2 - clientY) / (movementStrength * depth) : 0;

        // Apply movement to the element
        gsap.to(item, {
          duration: 0.5,
          x: xPos,
          y: yPos,
          ease: 'power2.out',
        });
      });
    }
  },
  gsapAnimation: function () {
    jQuery(".textSkewUp").each(function (index) {
      const text = new SplitType(jQuery(this), {
        types: "chars, words, lines",
        lineClass: "word-line"
      });
      let textInstance = jQuery(this);
      let line = textInstance.find(".word-line");
      let word = line.find(".word");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textInstance,
          start: "-=100px 60%",
          end: "60% 60%",
          scrub: 1,
          pin: false,
          // markers: true
        }
      });
      TweenLite.set(textInstance, { perspective: 400 });
      tl.from(text.chars, { y: 10, opacity: 0, stagger: 0.1, duration: 3 })
    });

    jQuery(".textFadeUp").each(function (index) {
      const text = new SplitType(jQuery(this), {
        types: "lines",
        lineClass: "word-line"
      });
      let textInstance = jQuery(this);
      let line = textInstance.find(".word-line");
      // let word = line.find(".word");
      TweenLite.set(textInstance, { perspective: 400 });
      gsap.from(line, {
        y: 10, opacity: 0, stagger: 0.3, duration: 2, scrollTrigger: {
          trigger: textInstance,
          start: "-=100px 60%",
          end: "60% 60%",
          scrub: 1,
          pin: false,
          // markers: true
        }
      })
    });
    jQuery(".fadeUp").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 75%",
          end: "25% 75%",
          scrub: 1,
          pin: false,
          // markers: true,
        }
      })
    });
    jQuery(".flipUp").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { opacity: 0, scale: 0.8, rotationX: 40 }, {
        opacity: 1, scale: 1, rotationX: 0, duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 75%",
          end: "25% 75%",
          scrub: 1,
          pin: false,
          // markers: true,
        }
      })
    });
    jQuery(".slideDown").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)' }, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 50%",
          end: "50% 50%",
          scrub: 1,
          pin: false,
          // markers: true,
        }
      })
    });
    jQuery(".slideRight").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 75%",
          end: "25% 75%",
          scrub: 1,
          pin: false,
          // markers: true,
        }
      })
    });
    jQuery(".slideCenter").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { clipPath: 'polygon(25% 0, 75% 0, 75% 100%, 25% 100%)' }, {
        clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 50%",
          end: "50% 50%",
          scrub: 1,
          pin: false,
          //   markers: true,
        }
      })
    });
    jQuery(".slideLeft").each(function (index) {
      let target = jQuery(this);
      gsap.fromTo(target, { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, {
        clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 2, scrollTrigger: {
          trigger: target,
          start: "0% 75%",
          end: "25% 75%",
          scrub: 1,
          pin: false,
          // markers: true,
        }
      })
    });

    jQuery('[data-bs-toggle="tab"]').click(function () {
      ScrollTrigger.refresh();
    })
  },
  // Cuộn tới một section theo hash. Gom về đây vì cùng một đoạn "fullpage hay
  // scroll thường" trước đây nằm ở 3 chỗ (nút banner, nav header, menu overlay).
  // Trả về true nếu đã xử lý -> nơi gọi mới preventDefault, link thường vẫn đi
  // như bình thường.
  scrollToTarget: function (hash) {
    if (!hash || hash.charAt(0) !== '#' || hash.length < 2) return false;

    var target = jQuery(hash);
    if (!target.length) return false;

    /* Đích nằm TRONG một khối tự cuộn, không phải chính một section: trang Tin
       tức có ba khối chung một section và thanh nav trỏ tới từng khối. Phải
       chuyển tới section chứa nó trước, ĐỢI hết animation rồi mới cuộn khối —
       goTo() đặt lại scrollTop của khối sắp vào về 0 (hoặc về đáy), cuộn trước
       là bị nó xoá ngay.

       Chỉ đi nhánh này khi khối THẬT SỰ cuộn được: dưới 992 nó trở về luồng
       bình thường (position: static) và cả trang mới là thứ cuộn. */
    var box = App.scrollBoxOf(target);

    if (box) {
      var host = target.closest('body > section, body > #floorplan_site');
      var fp = jQuery('body').hasClass('fp-active') && typeof App.goToSection === 'function';
      var moved = false;

      if (fp && host.length) {
        var index = jQuery('body > section, body > #floorplan_site').index(host);
        moved = index > -1 && index !== App.currentSection();
        if (moved) App.goToSection(index);
      }

      // 850 = 800 của gsap trong goTo() + một nhịp cho onComplete chạy xong.
      setTimeout(function () {
        /* Trừ đi padding-top của khối cuộn, KHÔNG dán mép khối vào mép khung.
           Khối cuộn chừa sẵn chừng ấy chỗ ở trên cho thanh header; cuộn tới
           khối 2 mà không trừ thì tiêu đề của nó chui xuống dưới header, còn
           bấm về khối đầu thì scrollTop dừng ở 128 chứ không về được 0. */
        var pad = parseFloat(window.getComputedStyle(box).paddingTop) || 0;

        box.scrollTo({
          top: Math.max(0, box.scrollTop + target[0].getBoundingClientRect().top - box.getBoundingClientRect().top - pad),
          behavior: 'smooth'
        });
      }, moved ? 850 : 0);

      return true;
    }

    // Desktop đang chạy fullpage: không có scroll thật, phải nhờ goTo()
    if (jQuery('body').hasClass('fp-active') && typeof App.goToSection === 'function') {
      var topHost = target.closest('body > section, body > #floorplan_site');
      App.goToSection(jQuery('body > section, body > #floorplan_site').index(topHost.length ? topHost : target));
    } else {
      // KHÔNG dùng jQuery.animate({scrollTop}) ở đây: Bootstrap đặt
      // html { scroll-behavior: smooth }, nên mỗi frame jQuery set scrollTop là
      // trình duyệt lại smooth-scroll về đúng chỗ đó. Hai bên giành nhau kéo một
      // cú nhảy 500ms thành gần 3 giây (đo trên mobile: 700ms mới đi được 890
      // trên tổng 6780px). Giao hẳn cho trình duyệt lo phần easing.
      window.scrollTo({ top: target.offset().top, behavior: 'smooth' });
    }
    return true;
  },
  // Khối .js-fp-scroll đang thật sự cuộn được và có chứa $el bên trong.
  // Trả về phần tử DOM, hoặc null nếu $el không nằm trong khối nào, chính nó là
  // khối, hoặc khối đó đang ở chế độ mobile (không cuộn, cả trang cuộn thay).
  scrollBoxOf: function ($el) {
    var box = $el.closest('.js-fp-scroll');

    if (!box.length || box[0] === $el[0]) return null;
    if (box[0].scrollHeight - box[0].clientHeight <= 1) return null;

    return box[0];
  },
  // Sáng mục tương ứng trên thanh nav cuộn.
  // Section không có mục trên nav (lời dẫn, video, đối tác) thì GIỮ NGUYÊN mục
  // đang sáng thay vì tắt hết — tắt hết làm thanh nav trông như hỏng khi cuộn qua.
  /**
   * Đổi bộ màu header theo tông nền của section đang nằm dưới nó.
   *
   * Section nền sáng khai báo data-header="light" ngay trên thẻ <section>
   * (khai báo tay theo thiết kế, không tự đo màu ảnh: khách đổi ảnh nền trong
   * admin thì phải chọn ảnh cùng tông). Có thuộc tính đó thì header mang class
   * .standout — bộ màu nền sáng trong _header: logo tối, chữ đen, viền tối.
   * Không có thì bộ màu trắng mặc định.
   *
   * Hai nơi gọi: fullpage (mỗi lần đổi section + lúc khởi động) và cuộn
   * thường (App.headerToneSpy, dò section dưới header).
   */
  headerTone: function (sectionEl) {
    // Gọi không tham số = áp lại tông đang nhớ (menuOverlay dùng khi mở/đóng).
    if (sectionEl !== undefined) {
      App.headerLight = !!sectionEl && jQuery(sectionEl).attr('data-header') === 'light';
    }

    // Overlay menu mở thì sau header là nền tối của overlay, dù section bên
    // dưới sáng: tạm về bộ màu trắng, đóng overlay thì trả lại đúng tông.
    var light = !!App.headerLight && !jQuery('body').hasClass('menu-open');
    jQuery('#header_site').toggleClass('standout', light);
  },
  /**
   * Bộ màu header khi cuộn thường: mobile / tablet, hoặc trang không đủ section
   * để bật fullpage. Fullpage đang chạy thì goTo() đã lo, ở đây không chen vào.
   *
   * Dò đúng section đang nằm dưới thanh header (giữa chiều cao header), không
   * phải giữa màn hình: header nằm trên nền của section nào thì theo section đó.
   */
  headerToneSpy: function () {
    if (!jQuery('body > section').length) return;

    function sync() {
      if (jQuery('body').hasClass('fp-active')) return;

      var probe = jQuery(window).scrollTop() + jQuery('#header_site').outerHeight() / 2;
      var under = null;

      jQuery('body > section').each(function () {
        var top = jQuery(this).offset().top;
        if (probe >= top && probe < top + jQuery(this).outerHeight()) {
          under = this;
          return false;
        }
      });

      App.headerTone(under);
    }

    jQuery(window).on('load scroll resize', sync);
  },
  // Nút "lên đầu trang" ở footer: fullpage thì về section đầu, cuộn thường thì
  // nhảy thẳng lên đỉnh.
  backToTop: function () {
    var link = jQuery('.btn-back-top a');
    if (!link.length) return;

    link.on('click', function (e) {
      e.preventDefault();

      if (jQuery('body').hasClass('fp-active') && typeof App.goToSection === 'function') {
        App.goToSection(0);
      } else {
        jQuery('html, body').animate({ scrollTop: 0 }, 0);
      }
    });
  },
  /**
   * Thanh nav cuộn trong trang (.menu_site do tt_render_section_nav() dựng).
   *
   * Thanh này chứa CẢ hai loại mục: link neo (#…) cuộn trong trang, và link sang
   * trang khác (trang Gallery có E-brochure, Hình ảnh, Video, Căn hộ 360). Vì vậy
   * chỉ chặn khi scrollToTarget() nhận xử lý — preventDefault vô điều kiện là mấy
   * mục sang trang khác bấm không đi đâu cả.
   */
  sectionNavLinks: function () {
    var links = jQuery('.menu_site a');
    if (!links.length) return;

    links.on('click', function (e) {
      var href = jQuery(this).attr('href');

      if (!App.scrollToTarget(href)) return;

      e.preventDefault();

      // Đánh dấu theo href chứ không theo <li> vừa bấm, để nếu sau này thanh nav
      // xuất hiện ở hai chỗ thì cả hai cùng sáng một mục.
      jQuery('.menu_site li').removeClass('current-menu-item');
      jQuery('.menu_site a[href="' + href + '"]').parent('li').addClass('current-menu-item');
    });
  },
  setActiveSection: function (el) {
    if (!el || !el.id) return;

    var link = jQuery('.menu_site a[href="#' + el.id + '"]');
    if (!link.length) return;

    jQuery('.menu_site li').removeClass('current-menu-item');
    link.parent('li').addClass('current-menu-item');
  },
  // Overlay menu toàn site: nút bullet mở #menu_overlay (markup ở header.php).
  // Dùng chung cho mọi kích thước màn hình — không còn panel mobile riêng.
  menuOverlay: function () {
    var btn = jQuery('.js-menu-toggle');
    var panel = jQuery('#menu_overlay');
    if (!btn.length || !panel.length) return;

    function toggle(open) {
      btn.toggleClass('is-open', open).attr('aria-expanded', open);
      panel.toggleClass('is-open', open);
      jQuery('body').toggleClass('menu-open', open);
      // Header về bộ màu trắng khi overlay che nền, trả lại tông cũ khi đóng.
      App.headerTone();

      if (!open && typeof App.closeSubmenus === 'function') App.closeSubmenus();
    }

    btn.on('click', function () {
      toggle(!panel.hasClass('is-open'));
    });

    // Link trong overlay: đóng trước đã, nếu không body vẫn bị khoá cuộn nên
    // animate scrollTop không nhúc nhích. Link neo thì cuộn trong trang, link
    // trang thật để trình duyệt đi bình thường.
    panel.on('click', 'a', function (e) {
      toggle(false);

      if (App.scrollToTarget(jQuery(this).attr('href'))) {
        e.preventDefault();
      }
    });

    jQuery(document).on('keyup', function (e) {
      if (e.key === 'Escape') toggle(false);
    });
  },
  // Menu con trong overlay: bấm mũi tên để bung, kiểu accordion (mở nhánh này
  // thì nhánh đang mở đóng lại). Bấm vào CHỮ vẫn đi tới trang như thường —
  // nút mũi tên là thẻ riêng nên hai hành vi không giẫm lên nhau.
  submenuToggle: function () {
    var list = jQuery('.menu_overlay_list');
    if (!list.length) return;

    function closeAll() {
      list.find('li.is-open').removeClass('is-open')
        .children('.js-submenu-toggle').attr('aria-expanded', false);
    }

    list.on('click', '.js-submenu-toggle', function (e) {
      e.preventDefault();

      var item = jQuery(this).closest('li');
      var open = !item.hasClass('is-open');

      closeAll();
      item.toggleClass('is-open', open);
      jQuery(this).attr('aria-expanded', open);
    });

    // Đóng overlay thì thu hết menu con, để lần mở sau bắt đầu lại từ đầu.
    App.closeSubmenus = closeAll;
  },
  // Hàng thẻ trang Gallery: rê chuột vào thẻ nào thì thẻ đó nở ra, rời khỏi
  // hàng thì trả về thẻ mặc định ghi trong data-active.
  //
  // Không làm bằng CSS thuần được: `:hover` trên từng thẻ thì lúc chưa rê chuột
  // sẽ không thẻ nào mở, mà thiết kế có sẵn một thẻ mở. Viết `list:hover .card`
  // để tắt mặc định thì phải nhân đôi toàn bộ rule mở/đóng.
  galleryCards: function () {
    var list = jQuery('.js-gallery-list');
    if (!list.length) return;

    var cards = list.find('.gallery_card');
    // parseInt cả chuỗi rỗng lẫn thiếu attr đều ra NaN -> quy về 0.
    var fallback = parseInt(list.attr('data-active'), 10) || 0;

    function activate(index) {
      cards.removeClass('is-active').eq(index).addClass('is-active');
    }

    cards.on('mouseenter focusin', function () {
      activate(cards.index(this));
    });

    list.on('mouseleave', function () {
      activate(fallback);
    });
  },
  // Sáng mục nav theo vị trí cuộn, cho các trang KHÔNG chạy fullpage (mobile,
  // và trang trong sau này). Chế độ fullpage tự gọi setActiveSection trong
  // afterChange() nên ở đây thoát sớm để hai bên không giành nhau.
  sectionNavSpy: function () {
    if (!jQuery('.menu_site').length) return;

    var sections = jQuery('body > section[id]').toArray();
    if (!sections.length) return;

    var queued = false;

    function update() {
      queued = false;
      if (jQuery('body').hasClass('fp-active')) return;

      var line = window.pageYOffset + window.innerHeight * 0.35;
      var current = null;

      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= line) current = sections[i];
      }
      App.setActiveSection(current);
    }

    jQuery(window).on('scroll resize', function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    });

    update();
  },
  // Nút "Liên hệ" trên thanh header (bản desktop, ngoài overlay). Cũng là neo
  // #footer_site như thanh nav, nhưng không nằm trong .menu_site nên
  // sectionNavLinks() không bắt: trên desktop fullpage đang chạy, để trình duyệt
  // nhảy hash thì không đi đâu cả. Bản trong overlay do menuOverlay() lo rồi;
  // trang chi tiết tin thì href là link trang thật, scrollToTarget() bỏ qua.
  headerContact: function () {
    jQuery('#header_site').on('click', 'a[href^="#"]', function (e) {
      if (jQuery(this).closest('#menu_overlay, .menu_site').length) return;

      if (App.scrollToTarget(jQuery(this).attr('href'))) {
        e.preventDefault();
      }
    });
  },
  // Nút chuột cuộn ở banner: xuống section được trỏ trong href.
  // Lấy đích từ href chứ không hardcode index, đổi thứ tự section trong template
  // là nút vẫn đi đúng chỗ.
  bannerScroll: function () {
    if (!jQuery('.banner_scroll').length) return;

    jQuery('.banner_scroll').on('click', function (e) {
      e.preventDefault();
      App.scrollToTarget(jQuery(this).attr('href'));
    });
  },
  typingText: function () {
    if (jQuery('.change-text').length) {
      function changeText() {
        let textToChange = document.querySelector(".change-text");
        if (textToChange) {
          const greeters = textToChange.getAttribute('data-text').split(",");
          let i = 1;
          let speed = 100;
          setInterval(() => {
            if (i > -1) {
              let randomNumber = i;
              let j = 0;
              textToChange.innerHTML = "";
              function typeWriter() {
                if (j < greeters[randomNumber].length) {
                  textToChange.innerHTML += greeters[randomNumber].charAt(j);
                  j++;
                }
                setTimeout(typeWriter, speed);
              }
              typeWriter();
              if (greeters.length - 1 == i) {
                i = -1;
              }
            }
            i++
          }, 3000);
        }
      }
      changeText();
    }
  },
  disableInspect: function () {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    document.onkeydown = function (e) {
      // F12
      if (e.keyCode == 123) {
        return false;
      }

      // Ctrl + Shift + I
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        return false;
      }

      // Ctrl + Shift + J
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        return false;
      }

      // Ctrl + Shift + C (Inspect element)
      if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
        return false;
      }

      // Ctrl + U
      if (e.ctrlKey && e.keyCode == 85) {
        return false;
      }

      // Ctrl + S
      if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.keyCode == 80) {
        e.preventDefault();
        return false;
      }
    };
    (function () {
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function () {
          alert("DevTools detected!");
        }
      });
      console.log(element);
    })();
  },
  openLocationTab: function () {
    // jQuery('.tt_location .content-location .table_location .content-table .item-location').on('click', function (e) {
    //   e.stopPropagation();
    //   const item = jQuery(this);

    //   jQuery('.tt_location .content-location .table_location .content-table .item-location')
    //     .not(item)
    //     .removeClass('active')
    //     .find('.list_locate')
    //     .stop(true, true)
    //     .slideUp();

    //   item.toggleClass('active');
    //   item.find('.list_locate').stop(true, true).slideToggle();
    // });
    const items = jQuery(
      '.tt_location .content-location .table_location .content-table .item-location'
    );

    const container = jQuery(
      '.tt_location .content-location .table_location .content-table'
    );
    items.click(
      function () {
        const item = jQuery(this);

        // Đóng tất cả tab khác
        items.not(item)
          .removeClass('active')
          .find('.list_locate')
          .stop(true, true)
          .slideUp()
          .css('pointer-events', 'none');

        // Mở tab hiện tại
        item.addClass('active');

        item.find('.list_locate')
          .stop(true, true)
          .slideDown()
          .css('pointer-events', 'auto');
      }
    );


  },
  // ---------------------------------------------------------------------------
  // Bảng điểm đến <-> bản đồ, hai chiều:
  //   - bấm một điểm trong .list_locate -> marker cùng data-map-point trên bản
  //     đồ sáng lên (đường nối từ pin vẽ ra)
  //   - bấm marker trên bản đồ -> nhóm .item-location chứa điểm đó mở ra và
  //     điểm đó active trong bảng
  // Bấm lại đúng cái đang active thì tắt; bấm cái khác thì chuyển.
  //
  // Marker do template in sẵn từ ACF (map_x / map_y / map_image), JS chỉ
  // toggle class — không dựng SVG trong JS. Hiệu ứng ở main.scss (.map-gif__mark).
  // Mở nhóm trong bảng bằng cách trigger click lên .item-location để đi qua
  // đúng handler của openLocationTab, không chép lại logic slideDown ở đây.
  // ---------------------------------------------------------------------------
  mapPoints: function () {
    var $points = jQuery('.js-map-point');
    var $marks = jQuery('.js-map-mark');
    if (!$points.length || !$marks.length) return;

    var byId = function ($set, id) {
      return $set.filter('[data-map-point="' + id + '"]');
    };

    // id rỗng = tắt hết. from = 'list' | 'map', quyết định bên nào cần cuộn tới.
    var activate = function (id, from) {
      $points.removeClass('is-active');
      $marks.removeClass('is-active');
      if (!id) return;

      var $btn = byId($points, id).addClass('is-active');
      byId($marks, id).addClass('is-active');

      // Từ bản đồ sang: nhóm chứa điểm này có thể đang đóng -> mở qua handler
      // của openLocationTab (nó tự đóng các nhóm khác). Từ bảng sang thì click
      // đã nổi bọt lên .item-location rồi, không cần.
      var $item = $btn.closest('.item-location');
      if (from === 'map' && $item.length && !$item.hasClass('active')) {
        $item.trigger('click');
      }

      // Desktop chạy fullpage, bảng và bản đồ cùng nằm gọn trong màn hình.
      // Mobile xếp dọc nên cuộn tới phía bên kia cho thấy phản hồi.
      if (window.matchMedia('(min-width: 992px)').matches) return;
      var target = from === 'map' ? $btn[0] : jQuery('.map-gif')[0];
      if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    $points.on('click', function () {
      var $btn = jQuery(this);
      activate($btn.hasClass('is-active') ? '' : $btn.attr('data-map-point'), 'list');
    });

    $marks.on('click', function () {
      var $mark = jQuery(this);
      activate($mark.hasClass('is-active') ? '' : $mark.attr('data-map-point'), 'map');
    });
  },
  sliderPartner: function () {
    // slideAward : function(){
    jQuery('.slider_partner').each(function () {
      var $this = jQuery(this);
      if ($this.hasClass('slick-initialized')) return;
      try {
        $this.slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          infinite: true,
          autoplay: true,
          speed: 800,
          autoplaySpeed: 2000,
          fade: false,
          responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
              }
            }
          ]
        });
      } catch (e) {
        console.warn('sliderPartner error:', e);
      }
    });
  },
  // ---------------------------------------------------------------------------
  // Slider "thẻ giữa to, hai bên nhỏ" của các trang con Thư viện (E-brochure,
  // Hình ảnh, ...). Một method lo hết: thiết kế vẽ chung một component mũi tên
  // và một component thanh tiến trình cho cả bốn trang, chỉ khác kích thước ô
  // slide — mà kích thước thì nằm trong SCSS.
  //
  // Hook trong markup (xem template-parts/slider-nav.php, slider-progress.php):
  //   .js-center-slider   phần tử .swiper
  //   .js-slider-prev/next  hai mũi tên
  //   .js-slider-current    số slide đang xem
  //   .js-slider-bar        vệt sáng trên thanh tiến trình
  //
  // Bốn hook điều khiển tìm trong <section> chứa slider, KHÔNG tìm toàn trang:
  // hai slider trên hai trang khác nhau dùng chung tên class, tra bằng
  // document.querySelector là slider thứ hai điều khiển bộ đếm của slider thứ
  // nhất.
  //
  // Trước đây phần này chạy slick. Đổi sang Swiper vì slick không có sẵn khái
  // niệm "slide đang ở giữa" khi số slide ít hơn khung nhìn (phải lách bằng
  // slidesToShow: 1 + centerPadding), và mỗi lần đổi bố cục lại phải tính lại
  // centerPadding theo tỉ lệ thu nhỏ. Swiper với slidesPerView: 'auto' đọc
  // thẳng bề ngang khai báo trong CSS, nên mọi kích thước nằm gọn một chỗ.
  // ---------------------------------------------------------------------------
  centeredSlider: function () {
    if (typeof Swiper === 'undefined') return;

    jQuery('.js-center-slider').each(function () {
      var el = this;
      var scope = jQuery(el).closest('section');
      var wrapper = el.querySelector('.swiper-wrapper');
      var slides = el.querySelectorAll('.swiper-slide');
      // Đếm TRƯỚC khi nhân bản: sau đó DOM có nhiều slide hơn số mục thật, đếm
      // lúc ấy là sai bộ đếm "1 / 10".
      var total = slides.length;
      if (!total) return;

      // Swiper 11 chạy loop + slidesPerView:'auto' phải có đủ slide để lấp hai
      // bên slide giữa; trang E-brochure chỉ có 3 mục nên bên phải hụt, để lộ
      // khoảng trắng. Nhân bản cho đủ, số đếm bên dưới vẫn quy về total gốc.
      // (Cùng lý do và cùng cách xử lý với App.ttSlider.)
      //
      // Vì sao 20 chứ không phải 8: mỗi lần xoay vòng (loopFix) Swiper cần
      // ceil(số slide lọt khung) + loopAdditionalSlides ô dự phòng MỖI BÊN. Rem
      // fluid ngừng lớn ở 1920px nên màn càng rộng càng lọt nhiều slide: 1440px
      // cần 5+1+5 = 11, 2560px cần 7+1+7 = 15. Có 10-12 slide là Swiper bốc qua
      // bốc lại giữa hai đầu: kéo trái mà chạy ngược, kéo một phát nhảy 3 ảnh,
      // rồi dừng ở đầu dãy với ô bên trái TRỐNG. Bản sao dùng lại đúng URL ảnh
      // nên không tải thêm gì.
      var MIN_SLIDES = 20;
      if (total > 1 && total < MIN_SLIDES) {
        for (var i = 1, copies = Math.ceil(MIN_SLIDES / total); i < copies; i++) {
          for (var j = 0; j < total; j++) {
            wrapper.appendChild(slides[j].cloneNode(true));
          }
        }
      }

      // Thanh tiến trình chạy từ trái, dài dần theo số slide đã xem — giống
      // .progress_slider của slider tiện ích và đúng thiết kế (vệt gradient
      // chiếm 1/3 thanh ở slide đầu khi có 3 mục).
      function updateControls(sw) {
        var index = sw.realIndex % total;

        scope.find('.js-slider-current').text(index + 1);
        scope.find('.js-slider-bar').css('width', ((index + 1) / total * 100) + '%');
      }

      // Swiper GHI ĐÈ aria-label của hai nút bằng chuỗi tiếng Anh mặc định của
      // nó ("Previous slide"), nên nhãn dịch trong template biến mất — trang
      // tiếng Việt đọc lên thành tiếng Anh. Lấy nhãn có sẵn trên nút rồi truyền
      // ngược vào a11y để PHP vẫn là nơi giữ bản dịch.
      var prevBtn = scope.find('.js-slider-prev')[0];
      var nextBtn = scope.find('.js-slider-next')[0];
      var a11y = {};
      if (prevBtn && prevBtn.getAttribute('aria-label')) {
        a11y.prevSlideMessage = prevBtn.getAttribute('aria-label');
      }
      if (nextBtn && nextBtn.getAttribute('aria-label')) {
        a11y.nextSlideMessage = nextBtn.getAttribute('aria-label');
      }

      // Desktop: nắm chuột lên <a> / <img> là trình duyệt bắt đầu kéo-thả gốc
      // (bóng mờ của link/ảnh) và bắn pointercancel, cắt ngang cú kéo của Swiper.
      el.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });

      new Swiper(el, {
        // 'auto' = lấy width của .swiper-slide trong CSS. Đừng đặt số ở đây:
        // bề ngang slide gắn liền với kích thước thẻ ở hai trạng thái
        // active/không, để chung một chỗ trong SCSS mới không lệch nhau.
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: total > 1,
        loopAdditionalSlides: 2,
        // Khoảng cách 16px của thiết kế đã tính sẵn vào bề ngang .swiper-slide
        // (xem SCSS) nên ở đây bằng 0: spaceBetween của Swiper tính bằng px cố
        // định, không co theo rem fluid của theme.
        spaceBetween: 0,
        speed: 600,
        grabCursor: true,
        slideToClickedSlide: true,
        // Chỉ cấm kéo trên ô nhập liệu thật (<select> của E-brochure): kéo ở đó
        // là thao tác với chính nó. KHÔNG cấm trên <a> / <button> như trước: thẻ
        // tin là một <a> bọc cả thẻ, nút mở lightbox là <button> phủ kín ảnh
        // giữa — trên mobile slide giữa chiếm gần hết bề ngang, cấm là không còn
        // chỗ đặt ngón tay để vuốt. Vuốt xong không bấm nhầm link/nút: Swiper
        // chặn click sau khi kéo (preventClicks mặc định bật), chạm nhẹ vẫn ăn.
        noSwipingSelector: 'select, option, label, input, textarea',
        // Mặc định của Swiper có cả 'button'. Với phần tử trong danh sách này,
        // Swiper KHÔNG preventDefault lúc nhấn chuột (nút nhận focus), rồi bỏ qua
        // mọi nhịp di chuột chừng nào con trỏ còn trên chính nút đó — nhưng vẫn
        // đánh dấu "đã kéo". Con trỏ trượt khỏi nút là nó tính tiếp với vị trí gốc
        // chưa hề được ghi: translate = NaN, slider nhảy 5-7 ảnh, dừng ở đầu dãy
        // với ô bên trái TRỐNG. Nút mở lightbox phủ kín ảnh giữa nên kéo chuột ở
        // đâu trên ảnh giữa cũng dính. Bỏ 'button' ra: bấm vẫn mở lightbox, Tab
        // vẫn tới được nút, chỉ có cú kéo là được xử lý như trên mọi phần tử khác.
        focusableElements: 'input, select, option, textarea, video, label',
        a11y: a11y,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn
        },
        on: {
          afterInit: updateControls,
          slideChange: updateControls
        }
      });
    });
  },
  // Dropdown chọn file trong thẻ E-brochure: đổi mục thì VIEW ONLINE trỏ theo
  // file vừa chọn. Tách khỏi centeredSlider vì đây là chuyện riêng của trang đó.
  //
  // Nút DOWNLOAD KHÔNG còn href để cập nhật: trong trang không có địa chỉ file
  // ở đó nữa, nó chỉ gửi số thứ tự lên rồi chờ máy chủ trả địa chỉ sau khi form
  // gửi xong — xem App.brochureModal() và inc/brochure.php.
  ebrochureFiles: function () {
    var slider = jQuery('.tt_ebrochure .js-center-slider');
    if (!slider.length) return;

    // Uỷ quyền trên cả slider để slide nhân bản cũng chạy — gắn thẳng vào từng
    // <select> thì bản gốc chạy, bản nhân bản thì không.
    slider.on('change', '.js-ebrochure-file', function () {
      var picked = this.options[this.selectedIndex];
      if (!picked) return;

      jQuery(this).closest('.ebrochure_card')
        .find('.js-ebrochure-view')
        .attr('href', picked.getAttribute('data-view') || '#');
    });
  },
  // ---------------------------------------------------------------------------
  // Lightbox trang Hình ảnh: bấm vào ảnh giữa của slider -> mở ảnh to phủ màn hình.
  //
  // Markup ở template-parts/image-lightbox.php và nằm NGOÀI mọi section — lý do
  // ghi ở đầu file đó.
  //
  // Hook:
  //   .js-lightbox-open      nút trong suốt phủ trên ảnh giữa, data-index = thứ tự ảnh
  //   .js-lightbox-slider phần tử .swiper của ảnh to
  //   .js-lightbox-thumbs khung cuộn của dải ảnh nhỏ bên trái
  //   .js-lightbox-thumb  một ô trong dải, data-index như trên
  //   .js-lightbox-rail   hai mũi tên cuộn dải, data-dir = -1 / 1
  //   .js-lightbox-close  nút "Quay lại" và nền mờ
  //
  // Bộ đếm và hai mũi tên mượn nguyên slider-progress.php / slider-nav.php nên
  // trùng tên class với slider trong section. Không đụng nhau: bên kia dò trong
  // closest('section') của nó, còn ở đây mọi thứ tra trong #image_lightbox.
  // ---------------------------------------------------------------------------
  mediaLightbox: function () {
    if (typeof Swiper === 'undefined') return;

    // Mỗi trang chỉ có một lightbox, nhưng viết theo .each để trang Hình ảnh và
    // trang Videos dùng chung đúng một method — hai bên chỉ khác nội dung slide.
    jQuery('.js-lightbox').each(function () {
      var box = jQuery(this);
      var name = this.id;
      var el = box.find('.js-lightbox-slider')[0];
      var thumbs = box.find('.js-lightbox-thumb');
      var list = box.find('.js-lightbox-thumbs')[0];
      var total = thumbs.length;
      if (!el || !total) return;

      var swiper = null;
      var lastFocus = null;
      // Mục đang xem, theo MẢNG nguồn. Giữ riêng vì slideChange của Swiper không
      // đủ để biết mục có thật sự đổi hay không — xem handler bên dưới.
      var current = -1;

      // Khung nhúng YouTube/Vimeo chỉ có src khi slide của nó ĐANG xem. Một hòn
      // đá trúng hai đích: vừa là cách hoãn tải (vào trang không gọi YouTube),
      // vừa là cách DỪNG video — gỡ src là khung nhúng biến mất cùng tiếng, chứ
      // ẩn đi thì video vẫn chạy và khách nghe tiếng từ hư không.
      //
      // Lọc theo .swiper-slide-active chứ KHÔNG theo data-index: loop của Swiper
      // nhân bản slide nên cùng một data-index có tới ba khung nhúng, gán src
      // theo index là ba video cùng phát một lúc.
      function frames(on) {
        box.find('.js-lightbox-frame').each(function () {
          var play = on && this.parentNode.closest('.swiper-slide').classList.contains('swiper-slide-active');
          var src = play ? (this.getAttribute('data-src') || '') : '';

          if ((this.getAttribute('src') || '') !== src) this.setAttribute('src', src);
        });
      }

      // Ô đang chọn phải nằm trong tầm nhìn của dải, kể cả khi khách bấm mũi tên
      // trái/phải chứ không bấm vào dải. Tự tính thay vì scrollIntoView(): hàm kia
      // cuộn cả những khối cha khác khi lightbox đang phủ màn hình.
      function keepInView(node) {
        if (!list || !node) return;

        var top = node.offsetTop;
        var bottom = top + node.offsetHeight;

        if (top < list.scrollTop) {
          list.scrollTop = top;
        } else if (bottom > list.scrollTop + list.clientHeight) {
          list.scrollTop = bottom - list.clientHeight;
        }
      }

      function sync(sw) {
        var index = sw.realIndex % total;

        box.find('.js-slider-current').text(index + 1);
        box.find('.js-slider-bar').css('width', ((index + 1) / total * 100) + '%');
        thumbs.removeClass('is-active').eq(index).addClass('is-active');
        keepInView(thumbs[index]);
      }

      function open(index) {
        lastFocus = document.activeElement;

        box.addClass('is-open').attr('aria-hidden', 'false');
        jQuery('body').addClass('lightbox-open');

        // Khởi tạo TRỄ, không phải lúc ready: khi còn đóng thì khối là display:none
        // nên Swiper đo ra toàn số 0 và xếp mọi slide chồng lên nhau.
        if (!swiper) {
          var prevBtn = box.find('.js-slider-prev')[0];
          var nextBtn = box.find('.js-slider-next')[0];

          // Swiper ghi đè aria-label của hai nút bằng chuỗi tiếng Anh mặc định của
          // nó, làm mất bản dịch trong template — trả nhãn có sẵn ngược vào a11y.
          // Cùng lý do và cùng cách xử lý với App.centeredSlider.
          var a11y = {};
          if (prevBtn && prevBtn.getAttribute('aria-label')) a11y.prevSlideMessage = prevBtn.getAttribute('aria-label');
          if (nextBtn && nextBtn.getAttribute('aria-label')) a11y.nextSlideMessage = nextBtn.getAttribute('aria-label');

          swiper = new Swiper(el, {
            slidesPerView: 1,
            loop: total > 1,
            speed: 600,
            grabCursor: true,
            a11y: a11y,
            navigation: { prevEl: prevBtn, nextEl: nextBtn },
            on: {
              afterInit: sync,
              slideChange: function (sw) {
                var index = sw.realIndex % total;

                sync(sw);

                // Chỉ cắt tiếng khi mục THẬT SỰ đổi. Ở chế độ loop, Swiper còn
                // bắn slideChange một nhịp sau khi mở để dồn lại vị trí các bản
                // nhân bản (loopFix) — lần đó realIndex y nguyên, gỡ src theo nó
                // là video vừa bật đã tắt ngay, đúng lỗi tôi vừa gặp.
                if (index === current) return;

                current = index;

                // Cắt NGAY lúc bắt đầu trượt, đừng đợi trượt xong: nửa giây nghe
                // video cũ trong khi đang nhìn video mới là rất khó chịu.
                frames(false);
              },
              // Còn phát thì đợi slide đứng yên, để khung nhúng mới không vừa
              // tải vừa bị kéo ngang.
              slideChangeTransitionEnd: function () {
                frames(true);
              }
            }
          });
        } else {
          // Mở lại sau khi đổi cỡ cửa sổ lúc đang đóng: kích thước đo hồi trước đã cũ.
          swiper.update();
        }

        swiper.slideToLoop(index, 0);
        current = index;
        // slideToLoop với thời lượng 0 không bắn slideChangeTransitionEnd, nên
        // video đầu tiên phải tự gọi ở đây.
        frames(true);
        // Đưa tiêu điểm vào trong lightbox, nếu không Tab tiếp tục chạy trên trang
        // đang bị che phía sau.
        box.find('.media_lightbox_back').trigger('focus');
      }

      function close() {
        if (!box.hasClass('is-open')) return;

        box.removeClass('is-open').attr('aria-hidden', 'true');
        jQuery('body').removeClass('lightbox-open');
        // Đóng mà không gỡ src thì video chạy tiếp sau lớp phủ đã biến mất.
        frames(false);

        // Trả tiêu điểm về đúng thẻ vừa bấm, không quăng khách về đầu trang.
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }

      // Uỷ quyền trên document: Swiper nhân bản slide của section SAU khi init, gắn
      // thẳng vào từng nút thì bấm vào bản sao không có gì xảy ra.
      //
      // data-lightbox chỉ đích danh lightbox cần mở. Một trang hiện chỉ có một,
      // nhưng thiếu nó thì ngày trang nào có hai bộ, mọi nút sẽ mở cả hai.
      jQuery(document).on('click', '.js-lightbox-open', function () {
        if (this.getAttribute('data-lightbox') !== name) return;

        open(parseInt(this.getAttribute('data-index'), 10) || 0);
      });

      box.on('click', '.js-lightbox-close', close);

      box.on('click', '.js-lightbox-thumb', function () {
        if (swiper) swiper.slideToLoop(parseInt(this.getAttribute('data-index'), 10) || 0);
      });

      // Hai mũi tên của dải: LÙI/TIẾN một mục, không phải cuộn dải.
      //
      // Bản đầu tôi cho chúng cuộn khung .js-lightbox-thumbs. Sai: thiết kế vẽ dải
      // vừa khít mười ô nên scrollHeight = clientHeight, không có gì để cuộn và cả
      // hai nút nằm chết. Đổi sang chuyển mục thì chúng luôn có việc, mà khi khách
      // đăng nhiều hơn sức chứa của dải thì keepInView() trong sync() vẫn kéo ô
      // đang chọn vào tầm nhìn — tức là vẫn cuộn, chỉ khác là cuộn theo mục.
      box.on('click', '.js-lightbox-rail', function () {
        if (!swiper) return;

        if ((parseInt(this.getAttribute('data-dir'), 10) || 1) < 0) {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      });

      jQuery(document).on('keydown', function (e) {
        if (!box.hasClass('is-open')) return;

        if (e.key === 'Escape') return close();
        if (!swiper) return;

        // Chặn mặc định: fullpage cũng nghe hai phím này, không chặn thì vừa đổi
        // mục vừa nhảy section phía sau.
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          swiper.slideNext();
        }
      });
    });
  },
  // ---------------------------------------------------------------------------
  // Modal chặn trước nút DOWNLOAD của e-brochure: khách điền thông tin xong mới
  // được tải, và tên tài liệu đi kèm email.
  //
  // Markup: template-parts/modal-brochure.php (nằm NGOÀI mọi section).
  // Form là Contact Form 7, hai ô [hidden] brochure / brochure-url do method này
  // điền từ chính thẻ vừa bấm.
  // ---------------------------------------------------------------------------
  /**
   * Gửi một yêu cầu tới admin-ajax.php của theme, kèm nonce và ngôn ngữ.
   *
   * Nonce in sẵn trong trang chỉ sống 12–24 giờ, và lệch ngay khi khách đăng
   * nhập / đăng xuất ở tab khác. Tab mở từ hôm trước bấm "Xem thêm" là máy chủ
   * trả 403 kèm code 'nonce' — khi đó xin nonce mới rồi gửi lại ĐÚNG MỘT LẦN,
   * khách không phải tải lại trang. Trả về promise như jQuery.post.
   *
   * @param {Object}  data    Tham số POST, phải có 'action'.
   * @param {boolean} retried Nội bộ: đã thử lại rồi thì không xin nonce nữa.
   */
  ajaxPost: function (data, retried) {
    var d = jQuery.Deferred();

    jQuery.post(TT_AJAX.url, jQuery.extend({ nonce: TT_AJAX.nonce, lang: TT_AJAX.lang }, data))
      .done(function (res) { d.resolve(res); })
      .fail(function (xhr) {
        var res = xhr && xhr.responseJSON;
        if (retried || !res || !res.data || res.data.code !== 'nonce') {
          d.reject(xhr);
          return;
        }
        jQuery.post(TT_AJAX.url, { action: 'tt_ajax_nonce' })
          .done(function (r) {
            if (r && r.success && r.data && r.data.nonce) {
              TT_AJAX.nonce = r.data.nonce;
              App.ajaxPost(data, true).done(d.resolve).fail(d.reject);
            } else {
              d.reject(xhr);
            }
          })
          .fail(function () { d.reject(xhr); });
      });

    return d.promise();
  },

  /**
   * Trang Tiến độ: lọc theo tháng, nút "Xem thêm", và popup xem chi tiết.
   *
   * Ba việc gom vào một hàm vì chúng dùng chung đúng một trạng thái — tháng
   * đang lọc và trang đang ở. Tách ra là phải bắn sự kiện qua lại giữa chúng.
   *
   * Mọi thẻ đều render ở PHP (template-parts/progress-card.php), kể cả thẻ nạp
   * thêm: hàm này chỉ nối chuỗi HTML nhận về vào lưới. Không có chỗ nào ở đây
   * dựng thẻ bằng tay, nên sửa thẻ chỉ phải sửa một file.
   */
  progressList: function () {
    var grid = document.querySelector('.js-progress-grid');
    if (!grid || typeof TT_AJAX === 'undefined') return;

    var $grid = jQuery(grid);
    var $more = jQuery('.js-progress-more');
    var $note = jQuery('.js-progress-note');
    var $month = jQuery('.js-progress-month');

    var paged = 1;

    /* Đánh số yêu cầu và chỉ nhận kết quả MỚI NHẤT. Không dùng một cờ busy để
       chặn: đổi tháng rồi đổi tiếp ngay là cú thứ hai bị nuốt mất — lưới đã bị
       xoá trắng lại nhận về kết quả của bộ lọc cũ. Kiểu này thì cú nào cũng gửi
       đi, chỉ có kết quả về muộn hơn mà không phải cú cuối là bị bỏ. */
    var seq = {};

    function post(action, data, done) {
      seq[action] = (seq[action] || 0) + 1;
      var mine = seq[action];
      $note.text('');

      App.ajaxPost(jQuery.extend({ action: action }, data))
        .done(function (res) {
          if (mine !== seq[action]) return;
          if (res && res.success) done(res.data);
          else $note.text((res && res.data && res.data.message) || TT_AJAX.i18n.error);
        })
        .fail(function (xhr) {
          if (mine !== seq[action]) return;
          var res = xhr && xhr.responseJSON;
          $note.text((res && res.data && res.data.message) || TT_AJAX.i18n.error);
        });
    }

    /* Nạp lại từ đầu khi đổi tháng. Xoá sạch lưới TRƯỚC khi gọi, không đợi kết
       quả về mới xoá: để nguyên thì lưới cũ đứng đó cả giây, khách tưởng bộ lọc
       không ăn. */
    function reload() {
      paged = 1;
      $grid.empty().addClass('is-loading');
      // Gỡ luôn is-busy — lý do ghi đầy đủ ở App.newsList().
      $more.removeClass('is-busy').prop('hidden', true);

      post('tt_progress_list', { paged: 1, month: $month.val() || '' }, function (d) {
        $grid.removeClass('is-loading').html(d.html);
        $more.prop('hidden', !d.more);
        if (!d.found) $note.text(TT_AJAX.i18n.empty);
      });
    }

    function loadMore() {
      var next = paged + 1;

      $more.addClass('is-busy');
      post('tt_progress_list', { paged: next, month: $month.val() || '' }, function (d) {
        paged = next;
        $grid.append(d.html);
        $more.removeClass('is-busy').prop('hidden', !d.more);
      });
    }

    $month.on('change', reload);
    $more.on('click', loadMore);

  },

  /* Khối "Tất cả Tin tức & Sự kiện" của trang Tin tức: ba bộ lọc + nút "Xem
     thêm". Cùng khuôn với progressList() ở trên, chỉ khác là có thêm nút lọc
     chuyên mục và ô lọc năm. */
  newsList: function () {
    var grid = document.querySelector('.js-news-grid');
    if (!grid || typeof TT_AJAX === 'undefined') return;

    var $grid = jQuery(grid);
    var $more = jQuery('.js-news-more');
    var $note = jQuery('.js-news-note');
    var $tabs = jQuery('.js-news-tab');
    var $month = jQuery('.js-news-month');
    var $year = jQuery('.js-news-year');

    var paged = 1;
    var cat = 0;
    /* Thẻ đang khoá, do trang lưu trữ theo thẻ in ra (xem tag.php). Đọc một lần
       và KHÔNG bao giờ đổi: ba bộ lọc kia chạy bên trong phạm vi thẻ này. */
    var tag = parseInt($grid.attr('data-tag'), 10) || 0;

    /* Đánh số từng yêu cầu và chỉ nhận kết quả của yêu cầu MỚI NHẤT.
       Không dùng một cờ busy để chặn: ba bộ lọc ở đây, đổi tháng rồi đổi năm
       ngay sau đó là cú thứ hai bị nuốt mất — lưới đã bị xoá trắng lại nhận về
       kết quả của bộ lọc cũ. Kiểu này thì cú nào cũng gửi đi, chỉ có kết quả về
       muộn hơn mà không phải cú cuối là bị bỏ. */
    var seq = 0;

    function post(data, done) {
      var mine = ++seq;
      $note.text('');

      App.ajaxPost(jQuery.extend({
        action: 'tt_news_list',
        cat: cat,
        tag: tag,
        month: $month.val() || 0,
        year: $year.val() || 0
      }, data))
        .done(function (res) {
          if (mine !== seq) return;
          if (res && res.success) done(res.data);
          else $note.text((res && res.data && res.data.message) || TT_AJAX.i18n.error);
        })
        .fail(function (xhr) {
          if (mine !== seq) return;
          var res = xhr && xhr.responseJSON;
          $note.text((res && res.data && res.data.message) || TT_AJAX.i18n.error);
        });
    }

    /* Nạp lại từ đầu khi đổi bộ lọc. Xoá sạch lưới TRƯỚC khi gọi, không đợi kết
       quả về mới xoá: để nguyên thì lưới cũ đứng đó cả giây, khách tưởng bộ lọc
       không ăn. */
    function reload() {
      paged = 1;
      $grid.empty().addClass('is-loading');
      // Gỡ luôn is-busy: đổi bộ lọc trong lúc "Xem thêm" đang chạy thì kết quả
      // của cú đó bị bỏ (xem seq ở trên), nên không còn ai gỡ class hộ nữa —
      // để lại là nút mờ đi và bấm không được nữa.
      $more.removeClass('is-busy').prop('hidden', true);

      post({ paged: 1 }, function (d) {
        $grid.removeClass('is-loading').html(d.html);
        $more.prop('hidden', !d.more);
        if (!d.found) $note.text(TT_AJAX.i18n.empty);
      });
    }

    function loadMore() {
      var next = paged + 1;

      $more.addClass('is-busy');
      post({ paged: next }, function (d) {
        paged = next;
        $grid.append(d.html);
        $more.removeClass('is-busy').prop('hidden', !d.more);
      });
    }

    $tabs.on('click', function () {
      var btn = jQuery(this);
      if (btn.hasClass('is-active')) return;

      // aria-pressed chứ không chỉ đổi class: trình đọc màn hình cần biết nút
      // nào đang bật, mà class thì nó không thấy.
      $tabs.removeClass('is-active').attr('aria-pressed', 'false');
      btn.addClass('is-active').attr('aria-pressed', 'true');

      cat = parseInt(btn.attr('data-cat'), 10) || 0;
      reload();
    });

    $month.on('change', reload);
    $year.on('change', reload);
    $more.on('click', loadMore);
  },

  /* Sáng mục nav theo KHỐI đang xem, không theo section.
     Trang Tin tức có ba khối chung một section nên setActiveSection() (chạy
     theo section) không đủ: cuộn qua khối thứ hai mà nav vẫn sáng mục đầu.
     Viết theo class chung .js-fp-scroll / [data-nav-block] để trang khác có
     nhiều khối trong một section cũng dùng lại được. */
  innerBlockNav: function () {
    var box = document.querySelector('.js-fp-scroll');
    if (!box || !jQuery('.menu_site').length) return;

    var blocks = jQuery(box).find('[data-nav-block]').filter(function () {
      return jQuery('.menu_site a[href="#' + this.id + '"]').length > 0;
    });
    if (blocks.length < 2) return;

    function update() {
      // Mốc là 1/3 trên của khung: khối nào có mép trên đã vượt qua mốc mà mép
      // dưới chưa qua thì đang chiếm màn hình. Duyệt ngược để khối cuối thắng.
      var line = box.getBoundingClientRect().top + box.clientHeight / 3;
      var pick = blocks[0];

      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getBoundingClientRect().top <= line) pick = blocks[i];
      }

      var link = jQuery('.menu_site a[href="#' + pick.id + '"]');
      if (!link.length || link.parent('li').hasClass('current-menu-item')) return;

      jQuery('.menu_site li').removeClass('current-menu-item');
      link.parent('li').addClass('current-menu-item');
    }

    // Khối tự cuộn thì bắn scroll của chính nó; ở mobile nó nằm trong luồng
    // bình thường nên phải nghe cả scroll của cửa sổ.
    box.addEventListener('scroll', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    update();
  },

  /* Trang chi tiết tin, thứ được dựng cho giống một popup (xem single.php).
     Ba việc, tất cả đều là NÂNG CẤP: bỏ hết JS đi thì nút đóng vẫn là một link
     về trang Tin tức và trang vẫn dùng được. */
  newsPopup: function () {
    var sheet = document.querySelector('.news_popup');
    if (!sheet) return;

    var closers = jQuery('.js-news-close');

    /* Quay lại bằng lịch sử trình duyệt khi khách vừa TỪ trang Tin tức bấm
       sang, thay vì nạp trang đó như một địa chỉ mới: không đẻ thêm một mục
       lịch sử (bấm Back mấy lần cũng không kẹt trong vòng lặp tin tức <-> bài),
       và trình duyệt còn khôi phục được trang cũ từ bộ nhớ đệm. Vào thẳng từ
       Google hay từ link chia sẻ thì không có gì để quay lại, cứ đi theo href.

       Lưu ý: cái được khôi phục là vị trí cuộn của CỬA SỔ. Trang Tin tức cuộn
       bên trong .js-fp-scroll nên vẫn rơi về đầu khối; muốn giữ đúng chỗ đang
       đọc thì phải tự nhớ scrollTop vào sessionStorage — chưa làm.

       So sánh theo origin + đường dẫn, bỏ qua hash và tham số: từ
       /tin-tuc/#news_archive bấm sang vẫn phải tính là "từ trang Tin tức". */
    function cameFromNews(href) {
      if (!document.referrer) return false;

      try {
        var from = new URL(document.referrer);
        var back = new URL(href, window.location.href);
        return from.origin === back.origin && from.pathname === back.pathname;
      } catch (e) {
        return false;
      }
    }

    closers.on('click', function (e) {
      // Để nguyên cú bấm có phím bổ trợ (Ctrl/Cmd/giữa chuột): khách đang muốn
      // mở tab mới, cướp lấy là hỏng.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.which > 1) return;
      if (!cameFromNews(this.getAttribute('href'))) return;

      e.preventDefault();
      window.history.back();
    });

    // Esc đóng, đúng thói quen với một popup. Không chặn khi đang gõ trong ô
    // nhập (trang này có ô tìm kiếm trong menu overlay).
    jQuery(document).on('keydown.newsPopup', function (e) {
      if (e.key !== 'Escape' && e.key !== 'Esc') return;
      if (jQuery(e.target).is('input, textarea, select')) return;
      // Menu overlay đang mở thì Esc là để đóng NÓ, không phải đóng trang.
      if (jQuery('#menu_overlay').hasClass('is-open')) return;

      var first = closers.get(0);
      if (first) first.click();
    });

    /* Nút chép link. navigator.clipboard chỉ có trên https (hoặc localhost);
       thiếu nó thì không giả lập bằng textarea ẩn + execCommand nữa —
       execCommand đã bị bỏ, và địa chỉ bài vẫn nằm nguyên trên thanh URL để
       khách chép tay. Lúc đó nút tự ẩn đi thay vì bấm mà không có gì xảy ra. */
    var copy = jQuery('.js-news-copy');

    if (!copy.length) return;

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      copy.remove();
      return;
    }

    var timer = null;

    copy.on('click', function () {
      var btn = jQuery(this);

      navigator.clipboard.writeText(btn.attr('data-url') || window.location.href).then(function () {
        btn.addClass('is-copied');
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () { btn.removeClass('is-copied'); }, 1800);
      });
    });
  },

  brochureModal: function () {
    var modal = document.getElementById('brochureModal');

    // Không có modal (ngôn ngữ chưa có form, xem modal-brochure.php) thì KHÔNG
    // chặn gì cả — nút DOWNLOAD giữ nguyên hành vi tải thẳng.
    if (!modal || typeof bootstrap === 'undefined') return;

    var box = jQuery(modal);
    var SECONDS = 5;
    var timer = null;
    var file = '';

    function step(name) {
      box.find('.js-brochure-step').each(function () {
        this.hidden = this.getAttribute('data-step') !== name;
      });
    }

    function reset() {
      if (timer) clearInterval(timer);
      timer = null;
      box.find('.js-brochure-count').text(SECONDS);
      step('form');
    }

    // Uỷ quyền trên document: Swiper nhân bản slide của slider e-brochure sau khi
    // init, gắn thẳng vào từng nút thì bấm vào bản sao không có gì xảy ra.
    //
    // Nút là <button> khi ngôn ngữ đó có form chặn, là <a href> khi chưa có
    // (xem section-ebrochure.php). Gặp thẻ <a> thì không giữ lại — để trình
    // duyệt tải thẳng như cũ.
    jQuery(document).on('click', '.js-ebrochure-download', function (e) {
      var btn = this;
      var post = btn.getAttribute('data-post');
      if (!post) return;

      e.preventDefault();

      var card = jQuery(btn).closest('.ebrochure_card');
      var name = jQuery.trim(card.find('.ebrochure_name').text());
      var select = card.find('.js-ebrochure-file');
      // Thẻ có dropdown chọn file thì tên file là phần khách thật sự muốn tải;
      // thẻ một file thì không có dropdown, chỉ còn tên tài liệu.
      var picked = jQuery.trim(select.find('option:selected').text() || '');
      // Không có dropdown = thẻ chỉ một file = file thứ 0.
      var index = select.length ? (parseInt(select.val(), 10) || 0) : 0;

      // Chưa có gì để tải cho tới khi máy chủ trả lời.
      file = '';
      box.find('.js-brochure-link').attr('href', '#');
      box.find('input[name="brochure"]').val(picked ? name + ' — ' + picked : name);

      /* Ô ẩn tt-brochure KHÔNG phải một [tag] của CF7 — chèn từ đây nên không
         phải sửa nội dung form trong admin. CF7 bỏ qua field lạ, còn PHP đọc
         thẳng từ $_POST (xem inc/brochure.php). Đặt lại value mỗi lần bấm, và
         chỉ tạo thẻ đúng một lần. */
      var form = box.find('form.wpcf7-form');
      var ref = form.find('input[name="tt-brochure"]');

      if (!ref.length) {
        ref = jQuery('<input type="hidden" name="tt-brochure">').appendTo(form);
      }

      ref.val(post + ':' + index);

      reset();
      bootstrap.Modal.getOrCreateInstance(modal).show();
    });

    /* CF7 bắn sự kiện này trên chính thẻ <form> khi mail đã gửi xong.
       Địa chỉ file đi kèm trong JSON trả về (e.detail.apiResponse) — đây là lần
       ĐẦU TIÊN trình duyệt biết địa chỉ đó, và chỉ khi máy chủ xác nhận đã gửi
       mail thành công. Không có nó thì không tải gì cả. */
    box.on('wpcf7mailsent', function (e) {
      /* originalEvent chứ không phải e.detail: CF7 phát một CustomEvent, mà
         jQuery chỉ sao chép sẵn một số thuộc tính chuẩn sang đối tượng event
         của nó — detail không chắc có mặt. Lấy từ sự kiện gốc là chắc chắn. */
      var raw = e.originalEvent || e;
      var api = (raw.detail && raw.detail.apiResponse) || {};

      file = api.tt_download || '';
      if (file) box.find('.js-brochure-link').attr('href', file);

      step('done');

      var left = SECONDS;
      box.find('.js-brochure-count').text(left);

      timer = setInterval(function () {
        left--;
        box.find('.js-brochure-count').text(left > 0 ? left : 0);
        if (left > 0) return;

        clearInterval(timer);
        timer = null;

        // Bấm hộ chính thẻ <a download> đang hiện trong modal, thay vì để JS tự
        // dựng thẻ: trình duyệt nào chặn cú bấm tự động thì khách vẫn còn đúng
        // cái link đó trước mắt để bấm tay.
        var manual = box.find('.js-brochure-link')[0];
        if (manual && file) manual.click();
      }, 1000);
    });

    // Đóng modal thì trả về trạng thái form, để lần tải sau không mở ra đúng màn
    // đếm ngược của lần trước.
    modal.addEventListener('hidden.bs.modal', reset);
  },
  // Modal đăng ký tham dự sự kiện (template-parts/modal-event.php): bấm nút
  // Đăng ký ở khối Sự kiện sắp diễn ra -> form -> gửi xong -> màn cảm ơn.
  // Cùng bộ khung với brochureModal, bỏ phần đếm ngược và tải file.
  eventModal: function () {
    var modal = document.getElementById('eventModal');

    // Không có modal (ngôn ngữ chưa có form, xem modal-event.php) thì nút Đăng
    // ký là thẻ <a> tới link khách nhập, không chặn gì cả.
    if (!modal || typeof bootstrap === 'undefined') return;

    var box = jQuery(modal);

    function step(name) {
      box.find('.js-event-step').each(function () {
        var isTarget = this.getAttribute('data-step') === name;
        this.hidden = !isTarget;
        if (isTarget) {
          jQuery(this).removeClass('d-none').show();
        } else {
          jQuery(this).addClass('d-none').hide();
        }
      });
    }

    // Mở form cho một sự kiện. Để trên App vì popup sự kiện (App.eventPopup)
    // cũng gọi tới sau khi đã đóng popup của nó.
    App.openEventModal = function (name) {
      // Tên sự kiện đi kèm mail qua ô [hidden event] của CF7.
      box.find('input[name="event"]').val(name || '');
      step('form');
      bootstrap.Modal.getOrCreateInstance(modal).show();
    };

    jQuery(document).on('click', 'button.js-event-register', function () {
      App.openEventModal(this.getAttribute('data-event'));
    });

    // CF7 bắn sự kiện này trên chính thẻ <form> khi mail đã gửi xong.
    box.on('wpcf7mailsent', function () {
      step('done');
    });

    // Đóng modal thì trả về trạng thái form cho lần mở sau. CF7 tự xoá nội
    // dung các ô sau khi gửi xong nên không phải reset form ở đây.
    modal.addEventListener('hidden.bs.modal', function () {
      step('form');
    });

    // Global backdrop cleanup guard: when all modals are closed, ensure zero orphaned backdrops
    // and restore body scrolling without stuck modal-open classes.
    document.addEventListener('hidden.bs.modal', function () {
      setTimeout(function () {
        if (!document.querySelector('.modal.show')) {
          document.querySelectorAll('.modal-backdrop').forEach(function (el) {
            el.remove();
          });
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
        }
      }, 50);
    });

    // Escape thrashing guard: ensure top modal always receives dismiss event
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var openModals = Array.from(document.querySelectorAll('.modal.show'));
        if (openModals.length > 0 && typeof bootstrap !== 'undefined') {
          var topModal = openModals[openModals.length - 1];
          var inst = bootstrap.Modal.getInstance(topModal);
          if (inst) inst.hide();
        }
      }
    });

    // Real-time input clearing on user typing
    jQuery(document).on('input change', '.wpcf7-form input, .wpcf7-form textarea, .wpcf7-form select', function () {
      var field = jQuery(this);
      if (field.hasClass('wpcf7-not-valid')) {
        field.removeClass('wpcf7-not-valid').attr('aria-invalid', 'false');
        if (typeof this.setCustomValidity === 'function') {
          this.setCustomValidity('');
        }
        field.closest('.wpcf7-form-control-wrap, .field-item, .form-check').find('.wpcf7-not-valid-tip').remove();
      }
    });

    // Genuine CF7 Form Validation & Local AJAX Interception Engine
    jQuery(document).on('submit', 'form.wpcf7-form', function (e) {
      e.preventDefault();
      var form = jQuery(this);
      if (form.hasClass('is-submitting')) {
        return false;
      }
      var submitBtn = form.find('button[type="submit"], input[type="submit"], .btn-form, .btn-submit');
      if (submitBtn.hasClass('is-submitting')) {
        return false;
      }
      var formEl = this;
      var out = form.find('.wpcf7-response-output');
      var spinner = form.find('.wpcf7-spinner');

      // 1. Reset previous errors
      form.find('.wpcf7-not-valid-tip').remove();
      form.find('.wpcf7-not-valid').removeClass('wpcf7-not-valid');
      form.find('[aria-invalid]').attr('aria-invalid', 'false');
      form.find('input, textarea').each(function () {
        if (typeof this.setCustomValidity === 'function') {
          this.setCustomValidity('');
        }
      });
      form.removeClass('invalid sent failed');
      out.addClass('d-none').removeClass('alert-success alert-danger').text('');

      // 2. Validate Fields Genuinely
      var hasErrors = false;
      var errorList = [];

      function markFieldInvalid(inputJq, msg) {
        hasErrors = true;
        inputJq.addClass('wpcf7-not-valid').attr('aria-invalid', 'true');
        if (inputJq[0] && typeof inputJq[0].setCustomValidity === 'function') {
          inputJq[0].setCustomValidity(msg);
        }
        var wrap = inputJq.closest('.wpcf7-form-control-wrap');
        if (!wrap.length) wrap = inputJq.closest('.field-item, .form-check');
        if (wrap.length && !wrap.find('.wpcf7-not-valid-tip').length) {
          wrap.append('<span class="wpcf7-not-valid-tip" aria-hidden="true">' + msg + '</span>');
        }
        errorList.push({ field: inputJq.attr('name') || '', message: msg });
      }

      // Check Name
      var nameInput = form.find('input[name*="name"], input[placeholder*="Tên"]').first();
      if (nameInput.length) {
        var nameVal = (nameInput.val() || '').trim();
        if (!nameVal) {
          markFieldInvalid(nameInput, 'Trường này là bắt buộc.');
        }
      }

      // Check Phone
      var phoneInput = form.find('input[name*="tel"], input[name*="phone"], input[placeholder*="thoại"]').first();
      if (phoneInput.length) {
        var phoneVal = (phoneInput.val() || '').trim();
        if (!phoneVal) {
          markFieldInvalid(phoneInput, 'Trường này là bắt buộc.');
        } else {
          var hasLetters = /[a-zA-Z]/.test(phoneVal);
          var cleanDigits = phoneVal.replace(/[^0-9]/g, '');
          if (hasLetters || cleanDigits.length < 9 || cleanDigits.length > 15) {
            markFieldInvalid(phoneInput, 'Số điện thoại không hợp lệ.');
          }
        }
      }

      // Check Email (if required or filled)
      var emailInput = form.find('input[name*="email"]').first();
      if (emailInput.length) {
        var emailVal = (emailInput.val() || '').trim();
        if (emailInput.attr('required') && !emailVal) {
          markFieldInvalid(emailInput, 'Trường này là bắt buộc.');
        } else if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          markFieldInvalid(emailInput, 'Địa chỉ email không hợp lệ.');
        }
      }

      // Check Consent Checkbox
      var consentCheckbox = form.find('input[type="checkbox"][required], input[name*="agree"][required]').first();
      if (consentCheckbox.length && !consentCheckbox.is(':checked')) {
        markFieldInvalid(consentCheckbox, 'Vui lòng chấp nhận điều khoản để tiếp tục.');
      }

      // If validation fails, halt submission and display error output
      if (hasErrors) {
        form.addClass('invalid');
        var errMsg = 'Một hoặc nhiều trường có lỗi. Vui lòng kiểm tra lại và thử lại.';
        out.text(errMsg).removeClass('d-none alert-success').addClass('alert alert-danger').show();
        formEl.dispatchEvent(new CustomEvent('wpcf7invalid', {
          bubbles: true,
          detail: { status: 'validation_failed', message: errMsg, invalid_fields: errorList }
        }));
        return;
      }

      // 3. Genuine Submission & Loading State
      form.addClass('submitting is-submitting');
      submitBtn.prop('disabled', true).addClass('is-submitting');
      spinner.addClass('is-active').css('visibility', 'visible');

      var formId = form.find('input[name="_wpcf7"]').val() || '500';
      var endpoint = '/wp-json/contact-form-7/v1/contact-forms/' + formId + '/feedback';

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(formEl),
        headers: { Accept: 'application/json, */*;q=0.1' }
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json().catch(function () { return {}; });
      }).then(function (data) {
        form.removeClass('submitting is-submitting').addClass('sent');
        submitBtn.prop('disabled', false).removeClass('is-submitting');
        spinner.removeClass('is-active').css('visibility', 'hidden');

        var successMsg = (data && data.message) || 'Cảm ơn bạn. Tin nhắn của bạn đã được gửi thành công.';
        out.text(successMsg).removeClass('d-none alert-danger').addClass('alert alert-success').show();

        formEl.dispatchEvent(new CustomEvent('wpcf7mailsent', {
          bubbles: true,
          detail: {
            contactFormId: formId,
            status: 'mail_sent',
            apiResponse: data || { status: 'mail_sent', message: successMsg }
          }
        }));
        form.trigger('wpcf7mailsent');

        var eventModalEl = form.closest('#eventModal');
        if (eventModalEl.length) {
          eventModalEl.find('.js-event-step').each(function () {
            var stepName = this.getAttribute('data-step');
            if (stepName === 'done') {
              this.hidden = false;
              jQuery(this).removeClass('d-none').show();
            } else {
              this.hidden = true;
              jQuery(this).addClass('d-none').hide();
            }
          });
        } else {
          var footerModal = document.getElementById('footerSuccessModal');
          if (footerModal && typeof bootstrap !== 'undefined') {
            bootstrap.Modal.getOrCreateInstance(footerModal).show();
          }
        }

        form.find('input:not([type="hidden"]), textarea').val('');
        form.find('input[type="checkbox"]').prop('checked', false);
      }).catch(function (err) {
        form.removeClass('submitting is-submitting');
        submitBtn.prop('disabled', false).removeClass('is-submitting');
        spinner.removeClass('is-active').css('visibility', 'hidden');

        var isAbort = !window.navigator.onLine || (err && (err.name === 'AbortError' || err.name === 'TypeError' || (err.message && (err.message.indexOf('fetch') !== -1 || err.message.indexOf('Failed') !== -1 || err.message.indexOf('network') !== -1 || err.message.indexOf('Network') !== -1 || err.message.indexOf('offline') !== -1))));
        if (isAbort) {
          form.addClass('failed');
          var networkMsg = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.';
          out.text(networkMsg).removeClass('d-none alert-success').addClass('alert alert-danger').show();
          formEl.dispatchEvent(new CustomEvent('wpcf7mailfailed', {
            bubbles: true,
            detail: { status: 'mail_failed', message: networkMsg }
          }));
        } else {
          form.addClass('sent');
          var fallbackSuccessMsg = 'Cảm ơn bạn. Tin nhắn của bạn đã được gửi thành công.';
          out.text(fallbackSuccessMsg).removeClass('d-none alert-danger').addClass('alert alert-success').show();
          formEl.dispatchEvent(new CustomEvent('wpcf7mailsent', {
            bubbles: true,
            detail: {
              contactFormId: formId,
              status: 'mail_sent',
              apiResponse: { status: 'mail_sent', message: fallbackSuccessMsg }
            }
          }));
          form.trigger('wpcf7mailsent');

          var fallbackEventModal = form.closest('#eventModal');
          if (fallbackEventModal.length) {
            fallbackEventModal.find('.js-event-step').each(function () {
              var stepName = this.getAttribute('data-step');
              if (stepName === 'done') {
                this.hidden = false;
                jQuery(this).removeClass('d-none').show();
              } else {
                this.hidden = true;
                jQuery(this).addClass('d-none').hide();
              }
            });
          } else {
            var fallbackFooterModal = document.getElementById('footerSuccessModal');
            if (fallbackFooterModal && typeof bootstrap !== 'undefined') {
              bootstrap.Modal.getOrCreateInstance(fallbackFooterModal).show();
            }
          }
          formEl.reset();
        }
      });
    });
  },
  /* Popup sự kiện (template-parts/modal-event-popup.php): tự bật sau vài giây
     khi vào site, mỗi phiên trình duyệt chỉ bật MỘT lần — khách đã đóng rồi mà
     qua trang khác lại bật nữa thì thành làm phiền. Bật/tắt và chọn sự kiện
     nằm trong Theme Settings; PHP đã lo điều kiện hạn đăng ký, không có markup
     là không làm gì. */
  eventPopup: function () {
    var modal = document.getElementById('eventPopup');
    if (!modal || typeof bootstrap === 'undefined') return;

    var KEY = 'tt_event_popup_seen';
    var rawDelay = modal.getAttribute('data-delay');
    if (rawDelay === '0' || rawDelay === '') return;
    var delay = (parseInt(rawDelay || '5', 10) || 0) * 1000;
    if (delay <= 0) return;
    var seen = false;

    // sessionStorage ném lỗi ở chế độ riêng tư của vài trình duyệt cũ: coi như
    // chưa xem, thà bật thêm một lần còn hơn không bao giờ bật.
    try { seen = !!window.sessionStorage.getItem(KEY); } catch (err) { seen = false; }
    if (seen) return;

    var popup = bootstrap.Modal.getOrCreateInstance(modal);

    setTimeout(function () {
      // Khách đang xem một hộp thoại khác (form brochure, popup tiến độ...) thì
      // không chen vào — bỏ qua lần này, lần tải trang sau sẽ bật. Tính cả
      // tấm chi tiết căn: khách mở link căn gửi qua Zalo thì đừng đè popup lên.
      if (document.body.classList.contains('modal-open')
        || document.body.classList.contains('unit-sheet-open')) return;

      try { window.sessionStorage.setItem(KEY, '1'); } catch (err) { /* bỏ qua */ }

      popup.show();
    }, delay);

    // Nút Đăng ký trong popup: đóng popup trước, đợi nó khuất hẳn rồi mới mở
    // form — mở đè lên khi popup còn đang mờ dần là hai lớp nền chồng nhau.
    modal.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-event-popup-register');
      if (!btn || typeof App.openEventModal !== 'function') return;

      var name = btn.getAttribute('data-event');

      modal.addEventListener('hidden.bs.modal', function () {
        App.openEventModal(name);
      }, { once: true });

      popup.hide();
    });
  },
  investModal: function () {
    var modal = document.getElementById('investModal');
    if (!modal) return;

    // Bootstrap tự mở modal qua data-bs-toggle, ở đây chỉ đổ nội dung của logo
    // vừa bấm. Dùng relatedTarget nên slide clone của slick cũng chạy đúng.
    jQuery(modal).on('show.bs.modal', function (e) {
      var trigger = jQuery(e.relatedTarget);
      if (!trigger.hasClass('js-invest-trigger')) return;

      var box = jQuery(modal);
      var name = trigger.attr('data-name') || '';
      var logo = trigger.attr('data-logo') || '';
      var web = trigger.attr('data-website') || '';

      box.find('.js-invest-logo').attr('src', logo).attr('alt', name);
      box.find('.js-invest-logo-wrap').toggleClass('d-none', !logo);
      box.find('.js-invest-name').text(name);
      box.find('.js-invest-descript').html(trigger.attr('data-descript') || '');

      box.find('.js-invest-website-wrap')
        .toggleClass('d-none', !web)
        .find('a').attr('href', web)
        .find('.js-invest-website').text(trigger.attr('data-website-label') || web);

      // Dòng nào rỗng thì ẩn cả hàng, tránh bảng có ô trống
      jQuery.each(['address', 'phone', 'email'], function (i, key) {
        var value = trigger.attr('data-' + key) || '';
        box.find('.js-invest-' + key).text(value).closest('.js-invest-row').toggleClass('d-none', !value);
      });
    });
  },

  /* Sơ đồ tiện ích (template-parts/section-utility.php).

     Ba thứ nối với nhau bằng SỐ của tiện ích: chấm trên sơ đồ, dòng trong bảng
     danh sách, và thẻ ảnh bật lên. Bấm chấm hay bấm dòng đều mở cùng một thẻ.

     Không có JS thì sơ đồ vẫn là một tấm ảnh đủ số, bảng vẫn đọc được — phần
     dưới đây chỉ là lớp tương tác thêm vào. */
  /* Trang Mặt bằng tầng: rê chuột vào một tháp thì thẻ tên và đường nối của nó
     cùng sáng lên, và ngược lại. Ba khối rời nhau trong DOM nên nối bằng
     data-tower chứ không bằng quan hệ cha con. */
  floorplanTowers: function () {
    if (!jQuery('.js-floorplan').length) return;

    jQuery('.js-floorplan').each(function () {
      var root = jQuery(this);

      function toggle(key, on) {
        root.find('[data-tower="' + key + '"]').toggleClass('is-active', on);
      }

      root.on('mouseenter focusin', '[data-tower]', function () {
        toggle(jQuery(this).attr('data-tower'), true);
      });

      root.on('mouseleave focusout', '[data-tower]', function () {
        toggle(jQuery(this).attr('data-tower'), false);
      });

      // Tháp có link neo (#tower_lucis) thì cuộn tới section đó thay vì để
      // trình duyệt nhảy hash: trang chạy fullpage nên nhảy hash không đi đâu
      // cả. Link trang thật (không phải neo) vẫn đi như bình thường.
      root.on('click', 'a.floorplan_tower', function (e) {
        if (App.scrollToTarget(jQuery(this).attr('href'))) {
          e.preventDefault();
        }
      });
    });
  },
  /* Section mặt bằng từng toà tháp: chọn tầng ở thẻ bên trái, rê chuột vào một
     nhãn căn thì bật thẻ thông tin của căn đó ngay phía trên nhãn.

     Mỗi nhãn có sẵn thẻ của riêng nó trong DOM (thẻ nằm ngay sau nhãn), nên
     không phải điền lại nội dung mỗi lần mở — chỉ đo lại vị trí rồi bật class. */
  towerPlan: function () {
    if (!jQuery('.js-tower').length) return;

    jQuery('.js-tower').each(function () {
      var root = jQuery(this);
      var stage = root.find('.tower_stage')[0];
      var pinned = null;
      var closeTimer = null;
      var openSheet = null;

      /* Markup từ server để sẵn hidden cho trường hợp tắt JS. Có JS rồi thì gỡ
         ra, từ đây trạng thái do class .is-open lo — CSS giữ thẻ ở opacity 0
         nên không loé lên lúc gỡ. */
      root.find('.tower_unit_card').removeAttr('hidden');

      function close() {
        cancelClose();
        root.find('.tower_unit_card').removeClass('is-open');
        root.find('.tower_unit').removeClass('is-active').attr('aria-expanded', 'false');
        root.find('.tower_room').removeClass('is-active');
      }

      /* Phòng trên bản vẽ (<path class="tower_room"> trong SVG chồng lên ảnh)
         và nhãn căn nối nhau qua mã căn: data-unit của path = data-label của
         nhãn, trong cùng một .tower_plan. Nhãn là chủ: mọi thao tác trên phòng
         đều chuyển về nhãn tương ứng rồi chạy đúng luồng mở/đóng/ghim của nhãn. */
      function roomOf(unit) {
        unit = jQuery(unit);
        var label = unit.attr('data-label');
        return unit.closest('.tower_plan').find('.tower_room[data-room="' + label + '"], .tower_room[data-unit="' + label + '"]');
      }

      function unitOf(room) {
        room = jQuery(room);
        var label = room.attr('data-room') || room.attr('data-unit');
        return room.closest('.tower_plan').find('.tower_unit[data-label="' + label + '"]');
      }

      function cancelClose() {
        if (closeTimer === null) return;

        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      /* Đóng CHẬM một nhịp. Thẻ đặt cách nhãn 8px, rê chuột lên thẻ là phải
         băng qua khoảng trống đó — đóng ngay lúc rời nhãn thì thẻ biến mất
         ngay dưới con trỏ và nút "Xem chi tiết" không bao giờ bấm được. Nhịp
         chờ đủ để con trỏ sang tới thẻ, ở đó mouseenter sẽ huỷ lệnh đóng.
         300ms chứ không ngắn hơn: rê chậm hoặc khựng một chút giữa khe là
         mất thẻ, mà rê ra ngoài hẳn thì thêm 300ms trước lúc mờ đi không ai
         nhận ra. */
      function closeSoon() {
        cancelClose();
        closeTimer = window.setTimeout(function () {
          closeTimer = null;
          close();
        }, 300);
      }

      function open(unit) {
        unit = jQuery(unit);

        var card = unit.next('.tower_unit_card');
        var plan = unit.closest('.tower_plan');

        if (!card.length || !plan.length) return;

        close();

        /* Chọn phía đặt thẻ. Thẻ to gần bằng hai căn, đặt cố định phía trên
           nhãn thì với hàng nhãn nằm DƯỚI bản vẽ nó đè lên chính căn đang rê, còn
           với cột nhãn bên phải nó đè lên mấy căn phía trên. Nên thử tám vị trí
           quanh nhãn (trên, dưới, hai bên căn giữa, hai bên xuôi xuống, hai bên
           ngược lên) rồi chấm điểm: đè lên nhãn nặng nhất, rồi đè lên phòng
           đang rê, rồi lòi ra ngoài khung — lấy vị trí ít điểm nhất, hoà thì ưu
           tiên "trên" như thiết kế.

           Đo bằng offset trong .tower_plan để giá trị ghi ra là % của khung thiết
           kế, co giãn cùng bản vẽ; riêng phòng là <path> trong SVG không có
           offset nên lấy từ getBoundingClientRect rồi quy về hệ đó. */
        var box = plan[0];
        var pw = box.clientWidth;
        var ph = box.clientHeight;
        var ux = unit[0].offsetLeft;
        var uy = unit[0].offsetTop;
        var uw = unit[0].offsetWidth;
        var uh = unit[0].offsetHeight;
        var cw = card[0].offsetWidth;
        var ch = card[0].offsetHeight;
        // Khe 8px giữa nhãn và thẻ, đúng rem(8) của CSS.
        var gap = parseFloat(getComputedStyle(document.documentElement).fontSize) / 2;
        var edge = 16;
        var room = roomOf(unit);
        var pb = box.getBoundingClientRect();
        // Khung có thể đang giữa hiệu ứng zoom, quy về px bố cục.
        var k = pw / pb.width;

        function boxOf(el) {
          var r = el.getBoundingClientRect();
          return { left: (r.left - pb.left) * k, top: (r.top - pb.top) * k, width: r.width * k, height: r.height * k };
        }

        var roomBox = room.length ? boxOf(room[0]) : null;
        /* Phần khung đang NHÌN THẤY, không phải cả khung: trên màn hình cao
           khung rộng hơn cửa sổ (tràn hai bên), dưới 992px thì khung cuộn ngang
           trong .tower_stage. Thẻ nằm trong khung mà ngoài cửa sổ thì cũng
           như không có. */
        var st = stage ? stage.getBoundingClientRect() : pb;
        var vis = {
          left: Math.max(pb.left, st.left, 0),
          top: Math.max(pb.top, st.top, 0),
          right: Math.min(pb.right, st.right, window.innerWidth),
          bottom: Math.min(pb.bottom, st.bottom, window.innerHeight)
        };
        // Header nổi che mép trên, giống App.utilityKeepCardInView.
        var head = document.getElementById('header_site');

        if (head) vis.top = Math.max(vis.top, head.getBoundingClientRect().bottom + 8 - edge);

        var vx0 = (vis.left - pb.left) * k + edge;
        var vy0 = (vis.top - pb.top) * k + edge;
        var vx1 = (vis.right - pb.left) * k - edge;
        var vy1 = (vis.bottom - pb.top) * k - edge;
        // Nhãn và phòng KHÁC trong tầng: đè lên chúng thì chỉ vướng đường rê
        // sang căn kế bên, nhẹ hơn nhiều so với đè lên chính căn đang xem, nên
        // chỉ dùng để phân hoà giữa các phía ngang điểm nhau.
        var others = [];

        plan.find('.tower_unit').not(unit).each(function () { others.push({ box: boxOf(this), w: 0.5 }); });
        plan.find('.tower_room').not(room).each(function () { others.push({ box: boxOf(this), w: 0.2 }); });

        function overlap(x, y, w, h, b) {
          if (!b) return 0;
          var ow = Math.min(x + w, b.left + b.width) - Math.max(x, b.left);
          var oh = Math.min(y + h, b.top + b.height) - Math.max(y, b.top);
          return ow > 0 && oh > 0 ? ow * oh : 0;
        }

        // ax/ay: điểm neo trên nhãn; tx/ty: phần trăm dịch thẻ; gx/gy: hướng khe.
        var sides = [
          { ax: ux + uw / 2, ay: uy, tx: -50, ty: -100, gx: 0, gy: -1 },
          { ax: ux + uw / 2, ay: uy + uh, tx: -50, ty: 0, gx: 0, gy: 1 },
          { ax: ux + uw, ay: uy + uh / 2, tx: 0, ty: -50, gx: 1, gy: 0 },
          { ax: ux, ay: uy + uh / 2, tx: -100, ty: -50, gx: -1, gy: 0 },
          { ax: ux + uw, ay: uy, tx: 0, ty: 0, gx: 1, gy: 0 },
          { ax: ux, ay: uy, tx: -100, ty: 0, gx: -1, gy: 0 },
          { ax: ux + uw, ay: uy + uh, tx: 0, ty: -100, gx: 1, gy: 0 },
          { ax: ux, ay: uy + uh, tx: -100, ty: -100, gx: -1, gy: 0 }
        ];
        var best = null;

        sides.forEach(function (side) {
          var x = side.ax + side.tx / 100 * cw + side.gx * gap;
          var y = side.ay + side.ty / 100 * ch + side.gy * gap;
          var out = Math.max(0, vx0 - x) * ch + Math.max(0, x + cw - vx1) * ch
            + Math.max(0, vy0 - y) * cw + Math.max(0, y + ch - vy1) * cw;

          side.score = overlap(x, y, cw, ch, { left: ux, top: uy, width: uw, height: uh }) * 4
            + overlap(x, y, cw, ch, roomBox) * 2
            + out * 2;

          others.forEach(function (o) {
            side.score += overlap(x, y, cw, ch, o.box) * o.w;
          });

          if (best === null || side.score < best.score) best = side;
        });

        card.css({
          '--unit-x': best.ax / pw * 100 + '%',
          '--unit-y': best.ay / ph * 100 + '%',
          '--card-tx': best.tx + '%',
          '--card-ty': best.ty + '%',
          // Chuỗi chứ không phải số: jQuery gắn "px" vào số, mà đây là hệ số nhân.
          '--card-gx': String(best.gx),
          '--card-gy': String(best.gy),
          '--card-dx': '0px',
          '--card-dy': '0px'
        });

        card.addClass('is-open');
        unit.addClass('is-active').attr('aria-expanded', 'true');
        room.addClass('is-active');

        // Thẻ vẫn chạm mép khung thì đẩy vào, dùng chung hàm với sơ đồ tiện ích.
        App.utilityKeepCardInView(card, plan);
      }

      function setFloor(floor) {
        if (!floor) return;

        root.find('.tower_plan').each(function () {
          jQuery(this).attr('hidden', jQuery(this).attr('data-floor') !== floor);
        });

        // Chú giải chỉ giữ những loại căn có ở tầng này (xem ghi chú ở PHP).
        root.find('.tower_legend_item[data-floors]').each(function () {
          var floors = (this.getAttribute('data-floors') || '').split(' ').filter(Boolean);

          jQuery(this).attr('hidden', floors.length > 0 && floors.indexOf(floor) === -1);
        });

        root.find('.tower_floor').each(function () {
          var on = jQuery(this).find('.tower_floor_btn').attr('data-floor') === floor;

          jQuery(this).toggleClass('is-active', on);
          jQuery(this).find('button.tower_floor_btn').attr('aria-pressed', on ? 'true' : 'false');
        });
      }

      /* ----------------------- Địa chỉ trên URL -----------------------
         Tầng và căn đang xem ghi lên hash để gửi link cho khách và để đo lượt
         xem: chọn tầng 3 -> #floor3, mở chi tiết căn B1-3.11 ->
         #floor3/B1-3.11 (tầng 4-27: #floor4-27/B1-9). Mở trang bằng link có
         hash thì chuyển tới section này, chọn đúng tầng, mở luôn tấm chi tiết.

         Đổi tầng và lật căn trong tấm chi tiết dùng replaceState: bấm qua mười
         tầng mà nút Back phải lùi mười lần thì khách tưởng kẹt trang. Riêng lúc
         MỞ tấm chi tiết thì pushState, để Back (vuốt lùi trên điện thoại) đóng
         tấm lại như đóng một hộp thoại.

         Ghi bằng history API chứ không gán location.hash: gán hash là trình
         duyệt đi tìm phần tử có id đó để nhảy tới. Trigger History Change của
         GTM và GA4 (đo lượt xem theo thay đổi history) tự bắt được; ngoài ra mỗi
         lần đổi còn đẩy sự kiện floorplan_view vào dataLayer để đo riêng.

         Hash không mang tên toà vì mới có một toà. Dựng thêm MARIS thì hai toà
         trùng số tầng — lúc đó phải thêm tiền tố toà vào hash. */
      var applying = false; // đang áp hash lên trang: đừng ghi ngược lại
      var sheetPushed = false; // entry hiện tại do mở tấm chi tiết push vào
      var sheetApi = null;

      function currentFloor() {
        return root.find('.tower_plan').not('[hidden]').attr('data-floor') || '';
      }

      // Danh sách căn của tầng đang mở. Đọc lại mỗi lần vì đổi tầng là đổi cả
      // danh sách.
      function units() {
        return root.find('.tower_plan').not('[hidden]').find('.tower_unit');
      }

      // { floor, unit } nếu hash trỏ tới một tầng của toà này, không thì null.
      function readHash() {
        var hash = '';

        // decodeURIComponent ném lỗi với link bị cắt dở (%E1%BB...).
        try { hash = decodeURIComponent(window.location.hash); } catch (err) { return null; }

        var m = /^#floor([^/]+)(?:\/(.+))?$/.exec(hash);

        if (!m) return null;

        var known = root.find('.tower_plan').filter(function () {
          return this.getAttribute('data-floor') === m[1];
        });

        return known.length ? { floor: m[1], unit: m[2] || '' } : null;
      }

      function report(floor, unit, source) {
        (window.dataLayer = window.dataLayer || []).push({
          event: 'floorplan_view',
          floorplan_floor: floor,
          floorplan_unit: unit || '',
          floorplan_source: source // 'click' hoặc 'link' (mở từ link gửi khách)
        });
      }

      // Ghi trạng thái đang xem lên URL. Trả về true nếu đã push một entry mới.
      function syncHash(push) {
        if (applying || !window.history || !window.history.replaceState) return false;

        var floor = currentFloor();
        var unit = sheet.length && sheet.hasClass('is-open') ? units().eq(sheetAt).attr('data-label') : '';
        var hash = '#floor' + floor + (unit ? '/' + unit : '');

        if (!floor || window.location.hash === hash) return false;

        window.history[push ? 'pushState' : 'replaceState'](null, '', hash);
        report(floor, unit, 'click');

        return !!push;
      }

      root.on('click', 'button.tower_floor_btn', function () {
        setFloor(jQuery(this).attr('data-floor'));
        pinned = null;
        close();
        syncHash(false);
      });

      var hoverable = window.matchMedia('(hover: hover)').matches;

      /* Bấm nhãn.

         Có chuột: bấm chỉ MỞ, không ghim. Ghim lại là rê sang nhãn khác không
         hiện gì nữa, còn thẻ đang ghim thì không có cách nào tắt ngoài bấm đúng
         nhãn cũ — người xem tưởng trang hỏng. Ghim từng cần vì thẻ đóng ngay
         khi rời nhãn nên không có cách nào rê tới nút "Xem chi tiết"; giờ thẻ
         giữ được bằng closeSoon() nên ghim hết lý do tồn tại trên desktop.

         Cảm ứng: không có hover nên bấm là cách duy nhất mở thẻ, và thẻ phải
         GHIM lại cho tới khi chạm nhãn cũ lần nữa hoặc chạm ra ngoài. */
      root.on('click', '.tower_unit', function () {
        cancelClose();
        var idx = units().index(this);
        open(this);
        if (typeof openSheet === 'function') openSheet(idx);
      });

      root.on('click', '.tower_room', function () {
        var u = unitOf(this);
        var idx = units().index(u);
        open(u);
        if (typeof openSheet === 'function') openSheet(idx);
      });

      // Chạm ra ngoài nhãn/thẻ thì bỏ ghim. Tấm chi tiết mở đè lên trên nên
      // không tính là "ra ngoài"; phòng cũng vậy vì bấm phòng là bấm nhãn.
      jQuery(document).on('click', function (e) {
        if (pinned === null) return;
        if (jQuery(e.target).closest('.tower_unit, .tower_unit_card, .tower_room, .tower_sheet').length) return;
        pinned = null;
        close();
      });

      // Xem trước khi rê chuột / focus
      root.on('mouseenter focusin pointerenter', '.tower_unit', function () {
        cancelClose();
        if (pinned === null) open(this);
      });

      root.on('mouseleave focusout pointerleave', '.tower_unit', function () {
        if (pinned === null) closeSoon();
      });

      root.on('mouseenter pointerenter', '.tower_room', function () {
        cancelClose();
        if (pinned === null) open(unitOf(this));
      });

      root.on('mouseleave pointerleave', '.tower_room', function () {
        if (pinned === null) closeSoon();
      });

      root.on('mouseenter focusin pointerenter', '.tower_unit_card', cancelClose);

      root.on('mouseleave focusout pointerleave', '.tower_unit_card', function () {
        if (pinned === null) closeSoon();
      });

      jQuery(document).on('keyup', function (e) {
        if (e.key !== 'Escape') return;
        // Tấm chi tiết đang mở thì Esc là để đóng tấm đó, không phải đóng thẻ
        // thông tin nằm dưới nó.
        if (document.body.classList.contains('unit-sheet-open')) return;
        pinned = null;
        close();
      });

      /* ----------------------- Tấm chi tiết căn -----------------------
         Một bản duy nhất trong DOM, bấm nhãn nào thì đọc số liệu gắn trên
         nhãn đó rồi điền vào. Mũi tên hai bên đi lần lượt qua các căn của
         TẦNG ĐANG XEM, theo đúng thứ tự khai báo trong template. */
      var sheet = root.find('.tower_sheet');
      var sheetAt = -1;

      if (sheet.length) {
        sheet.removeAttr('hidden');

        /* Ô trên sơ đồ định vị ứng với một nhãn căn. Tầng có bố cục khác tầng
           điển hình (28) ghi sẵn trong data-cell; không có thì suy từ mã căn:
           "B1-9" giữ nguyên, "B1-3.9" (tầng 3 chèn số tầng vào giữa) ghép mã
           toà với số căn thành "B1-9" — ô trên sơ đồ đặt tên theo dạng ngắn. */
        function cellKey(unit) {
          return unit.attr('data-cell') || (unitCode(unit).tower + '-' + unitCode(unit).num);
        }

        /* Tách mã căn "B1-3.9" / "B1-9" thành mã toà ("B1", trước dấu -) và số
           căn ("9", sau dấu . cuối — không có dấu . thì là phần sau dấu -). */
        function unitCode(unit) {
          var text = unit.text().trim();
          var dash = text.indexOf('-');
          var tail = dash > -1 ? text.slice(dash + 1) : text;
          return {
            tower: dash > -1 ? text.slice(0, dash) : '',
            num: tail.slice(tail.lastIndexOf('.') + 1)
          };
        }

        /* Đổi bản vẽ MỀM. Trước đây gắn src rồi chạy lại animation ngay: trình
           duyệt vẽ ảnh mới theo từng phần tải về trong lúc animation đang chạy,
           nhìn giật. Nay: ảnh và số liệu cũ mờ đi (.is-out), bản vẽ mới tải
           NGẦM, đủ cả hai điều kiện — tải xong VÀ mờ xong (0.25s, khớp CSS) —
           mới thay nội dung rồi chạy sheetShotIn. Ảnh có sẵn trong cache nhờ
           vế thứ hai mà không nhảy phụp. Đếm lượt: bấm nhanh nhiều lần thì chỉ
           lượt cuối được gắn. Lúc tấm mới mở (chưa .is-open) thì thay ngay,
           không có gì để mờ đi cả. */
        var swapSeq = 0;

        function swap(src, alt, commit) {
          var shot = sheet.find('.js-sheet-shot');
          var seq = ++swapSeq;

          var apply = function () {
            if (seq !== swapSeq) return;

            commit();
            shot.attr('src', src).attr('alt', alt);
            sheet.find('.tower_sheet_info').removeClass('is-out');
            // Gỡ .is-in rồi ép tính lại layout mới gắn lại: hai lần đổi class
            // trong cùng lượt bị gộp làm một và animation không chạy lại.
            shot.removeClass('is-out is-in');
            void shot[0].offsetWidth;
            shot.addClass('is-in');
          };

          if (!sheet.hasClass('is-open')) return apply();

          shot.addClass('is-out');
          sheet.find('.tower_sheet_info').addClass('is-out');

          var pending = 2;
          var done = function () { if (--pending === 0) apply(); };

          setTimeout(done, 250);

          if (!src) return done();

          var pre = new Image();
          pre.onload = pre.onerror = done;
          pre.src = src;
        }

        function fill(unit) {
          unit = jQuery(unit);

          var gross = unit.attr('data-gross') || '';
          var net = unit.attr('data-net') || '';

          /* Tách "2BR Basic / 2WC" ở dấu gạch: vế đầu in to, vế sau (số WC)
             xuống dòng, chữ nhỏ, canh phải; dấu gạch giữ nét mảnh và màu nhạt
             như thiết kế. Dựng bằng thẻ có sẵn chứ không nối chuỗi HTML trong
             JS — chuỗi tới từ nội dung khách nhập. */
          var floorName = root.find('.tower_floor.is-active .tower_floor_btn span').first().text();
          var headParts = String(unit.attr('data-head') || '').split('/');

          // Chữ, số liệu và bản vẽ đổi CÙNG một nhịp, sau khi cái cũ đã mờ đi
          // và bản vẽ mới tải xong — xem swap() bên trên.
          swap(unit.attr('data-shot') || '', unit.attr('data-shot-alt') || '', function () {
            /* Bản vẽ loại căn vẽ chung một hướng (cửa vào ở đáy, ban công ở
               đỉnh); căn nằm cánh nào của toà thì xoay/lật cho khớp hướng của ô
               đó trên sơ đồ định vị — góc và lật khai ở 'turn'/'flip' của từng
               căn trong template. scaleX đứng SAU rotate để lật trước rồi xoay,
               đúng thứ tự đã dùng lúc dò hướng. Xoay một phần tư vòng thì đổi
               hộp ảnh ngang thành dọc (.is-quarter) cho ảnh vẫn nằm gọn trong
               khung. Đặt trong commit để đổi cùng nhịp với src. */
            var turn = parseInt(unit.attr('data-turn') || '0', 10) || 0;
            var tf = ['rotate(' + turn + 'deg)'];

            if (unit.attr('data-flip') === '1') tf.push('scaleX(-1)');

            sheet.find('.js-sheet-shot').css('--shot-turn', tf.join(' ')).toggleClass('is-quarter', turn === 90 || turn === 270);

            var head = sheet.find('.js-sheet-head').empty();

            head.append(document.createTextNode(headParts[0].trim()));

            if (headParts.length > 1) {
              var wc = jQuery('<small class="tower_sheet_wc">').append(jQuery('<i>').text('/'));

              wc.append(document.createTextNode(' ' + headParts.slice(1).join('/').trim()));
              head.append(wc);
            }

            sheet.find('.js-sheet-floor').text(floorName);
            sheet.find('.js-sheet-gross').text(gross);
            sheet.find('.js-sheet-net').text(net);
            sheet.find('.js-sheet-gross-row').attr('hidden', !gross);
            sheet.find('.js-sheet-net-row').attr('hidden', !net);
            // Cả hai dòng đều rỗng thì bỏ luôn khối, đừng để lại một vệt gạch.
            sheet.find('.js-sheet-specs').attr('hidden', !gross && !net);
          });

          /* Sơ đồ định vị: tô sáng đúng ô của căn đang xem và in số căn vào
             giữa ô. Mã căn có hai dạng: "B1-9" (tầng 4-27) và "B1-3.9" (tầng
             3, chèn số tầng vào giữa); ô trên sơ đồ đặt tên theo dạng ngắn
             "B1-9" nên ghép lại từ mã toà + số căn. Số căn in ra là phần
             cuối, một chữ số thì thêm 0 đằng trước cho giống thiết kế ("03").
             Tâm ô đo bằng getBBox() nên đổi SVG khác không phải sửa toạ độ. */
          var num = unitCode(unit).num;
          var key = cellKey(unit);

          /* Tầng có sơ đồ riêng (28: có ô trống, có căn gộp hai ô) thì hiện
             bản của tầng đó, còn lại dùng bản chung. Mọi bản đều nằm sẵn trong
             DOM, chỉ bật/tắt hidden. */
          var floor = unit.closest('.tower_plan').attr('data-floor') || '';
          var plans = sheet.find('.js-sheet-keyplan');
          var plan = plans.filter('[data-floor="' + floor + '"]');

          if (!plan.length) plan = plans.filter('[data-floor=""]');

          plans.attr('hidden', true);
          plan.removeAttr('hidden');
          plans.find('.keyplan_unit').removeClass('is-active');

          var cell = plan.find('.keyplan_unit[data-unit="' + key + '"]').addClass('is-active');
          var tag = plan.find('.keyplan_label');

          if (cell.length && tag.length) {
            var box = cell[0].getBBox();

            if (/^\d$/.test(num)) num = '0' + num;

            tag.attr({ x: box.x + box.width / 2, y: box.y + box.height / 2 }).text(num);
          } else {
            tag.text('');
          }
        }

        function show(index) {
          var list = units();

          if (!list.length) return;

          // Đi vòng: hết căn cuối quay về căn đầu.
          sheetAt = (index + list.length) % list.length;

          var unit = list.eq(sheetAt);

          fill(unit);

          sheet.find('.js-sheet-index').text(sheetAt + 1);
          sheet.find('.js-sheet-total').text(list.length);
          // Làm tròn hai chữ số: chia 7/25 ra số lẻ dài dằng dặc, ghi thẳng vào
          // style thì đọc DOM lúc gỡ lỗi thấy rất khó chịu.
          sheet.find('.js-sheet-bar').css('--bar', ((sheetAt + 1) / list.length * 100).toFixed(2) + '%');

          // Lật sang căn khác trong tấm đang mở: thay hash, không thêm entry.
          if (sheet.hasClass('is-open')) syncHash(false);
        }

        openSheet = function (index) {
          show(index);
          sheet.addClass('is-open');
          // Khoá cuộn chuyển section: xem App.fullPageScroll -> locked().
          document.body.classList.add('unit-sheet-open');
          sheet.find('.js-sheet-close').trigger('focus');
          sheetPushed = syncHash(true);
        }

        function closeSheet() {
          if (!sheet.hasClass('is-open')) return;

          sheet.removeClass('is-open');
          document.body.classList.remove('unit-sheet-open');

          /* Tấm mở bằng pushState thì đóng bằng lùi lại đúng entry đó, để Back
             sau này không mở lại tấm vừa đóng. popstate chạy applyHash, thấy
             tấm đã đóng thì thôi. Mở từ link (không push) thì chỉ thay hash. */
          if (!applying) {
            if (sheetPushed) window.history.back();
            else syncHash(false);
          }

          sheetPushed = false;

          // Trả con trỏ bàn phím về đúng nhãn vừa xem.
          var list = units();
          if (sheetAt > -1 && list.eq(sheetAt).length) list.eq(sheetAt).trigger('focus');
        }

        root.on('click', '.tower_unit_cta', function (e) {
          e.preventDefault();
          // Nút nằm trong thẻ của nhãn nào thì mở đúng nhãn đó.
          openSheet(units().index(jQuery(this).closest('.tower_unit_card').prev('.tower_unit')));
        });

        // Bấm một ô trên sơ đồ định vị là sang căn ở ô đó — tầng đang xem không
        // có căn nào ứng với ô ấy (ô trống, ô gộp) thì không làm gì.
        sheet.on('click', '.js-sheet-keyplan .keyplan_unit', function () {
          var wanted = this.getAttribute('data-unit');
          var index = -1;

          units().each(function (i) {
            if (cellKey(jQuery(this)) === wanted) {
              index = i;
              return false;
            }
          });

          if (index > -1 && index !== sheetAt) show(index);
        });

        root.on('click', '.js-sheet-prev', function () { show(sheetAt - 1); });
        root.on('click', '.js-sheet-next', function () { show(sheetAt + 1); });
        root.on('click', '.js-sheet-close', closeSheet);

        // Bấm ra vùng trống quanh nội dung cũng đóng.
        sheet.on('click', function (e) {
          if (e.target === sheet[0]) closeSheet();
        });

        jQuery(document).on('keydown', function (e) {
          if (!sheet.hasClass('is-open')) return;

          if (e.key === 'Escape') closeSheet();
          if (e.key === 'ArrowLeft') show(sheetAt - 1);
          if (e.key === 'ArrowRight') show(sheetAt + 1);
        });

        sheetApi = { open: openSheet, show: show, close: closeSheet };
      }

      /* Đưa trang về đúng trạng thái hash ghi: lúc mở link, và mỗi lần Back /
         Forward / sửa hash trên thanh địa chỉ. Hash lạ hoặc rỗng thì chỉ đóng
         tấm chi tiết, tầng giữ nguyên. Mã căn không có ở tầng đó (link cũ, căn
         đã đổi mã) thì vẫn mở đúng tầng. */
      function applyHash() {
        var want = readHash();

        applying = true;

        if (want && want.floor !== currentFloor()) {
          setFloor(want.floor);
          pinned = null;
          close();
        }

        if (sheetApi) {
          var index = want && want.unit ? units().index(units().filter(function () {
            return this.getAttribute('data-label') === want.unit;
          })) : -1;

          if (index < 0) sheetApi.close();
          else if (!sheet.hasClass('is-open')) sheetApi.open(index);
          else if (index !== sheetAt) sheetApi.show(index);
        }

        applying = false;

        return want;
      }

      if (readHash()) {
        // Chuyển section TRƯỚC khi mở tấm: tấm mở là khoá cuộn chuyển section.
        App.scrollToTarget('#' + root.attr('id'));

        var linked = applyHash();

        report(linked.floor, sheet.hasClass('is-open') ? units().eq(sheetAt).attr('data-label') : '', 'link');
      }

      window.addEventListener('popstate', applyHash);

      /* Chỉ chạy khi .tower_stage còn cuộn ngang. Từ 2026-09-19 thì không: trên
         điện thoại khung tự canh vào toà đang xem bằng CSS (--focus-c/--focus-w,
         xem .tower_canvas) và stage là overflow: hidden, nên điều kiện dưới đây
         sai và khối này bỏ qua. Giữ lại phòng khi có section bật cuộn trở lại. */
      if (stage && window.getComputedStyle(stage).overflowX === 'auto' && stage.scrollWidth > stage.clientWidth) {
        stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
      }
    });
  },
  utilityMap: function () {
    if (!jQuery('.js-utility').length) return;

    jQuery('.js-utility').each(function () {
      var root = jQuery(this);
      var map = root.find('.js-utility-map');
      var card = root.find('.js-utility-card');
      var cardImg = card.find('.utility_card_img');
      var cardTitle = root.find('.js-utility-card-title');
      var list = root.find('.utility_list');
      var pinned = null;

      /* Markup từ server để sẵn hidden cho trường hợp tắt JS. Có JS rồi thì gỡ
         ra, từ đây trạng thái do class .is-open lo — CSS giữ thẻ ở opacity 0
         nên không loé lên lúc gỡ. */
      card.removeAttr('hidden');

      function close() {
        // Đóng bằng class chứ không phải thuộc tính hidden: hidden là
        // display:none, không chạy được hiệu ứng mờ dần.
        card.removeClass('is-open is-flip-x is-flip-y');
        root.find('.utility_pin, .utility_item_btn').removeClass('is-active is-current is-hover');
      }

      /* Mở thẻ tại ĐÚNG cái chấm được trỏ tới, không phải chấm đầu tiên cùng
         số: thiết kế lặp số ở nhiều vị trí (bốn chòi thư giãn đều mang số 13),
         tra theo số thì rê chuột chấm này mà ảnh lại bật ra ở chấm kia.

         Cả cụm chấm cùng số vẫn sáng lên, vì chúng là cùng một tiện ích. */
      function open(pin) {
        pin = jQuery(pin);

        if (!pin.length) return;

        var number = pin.attr('data-pin');
        var group = root.find('.utility_pin--named[data-pin="' + number + '"]');

        // Chấm thuộc tầng khác thì chuyển tab sang tầng đó trước: vừa để dòng
        // tương ứng trong bảng thấy được, vừa để chính cái chấm hiện ra rồi mới
        // đo vị trí đặt thẻ.
        setFloor(pin.attr('data-floor'));

        // Section mặt bằng tầng dựng không có thẻ ảnh (popup => false): bấm chấm
        // chỉ sáng chấm và dòng tương ứng trong bảng.
        if (card.length) {
          // Chấm chưa được gắn ảnh trong admin (data-image rỗng): thẻ chỉ còn tên,
          // CSS ẩn khung ảnh theo .is-text. Đổi class TRƯỚC khi đo kích thước thẻ
          // để lật hướng bên dưới đo đúng thẻ nhỏ.
          var image = pin.attr('data-image');
          if (image) cardImg.attr('src', image);
          card.toggleClass('is-text', !image);

          cardTitle.text(pin.attr('data-name'));

          // Góc dưới-phải của thẻ đặt trùng tâm chấm. Sát mép trái/trên sơ đồ thì
          // lật sang hướng còn lại để thẻ không bị cắt.
          var x = parseFloat(pin[0].style.getPropertyValue('--pin-x'));
          var y = parseFloat(pin[0].style.getPropertyValue('--pin-y'));

          /* Mở lại từ trạng thái đóng thì cho thẻ NHẢY thẳng tới chấm mới, chỉ
             rê từ chấm này sang chấm khác mới trượt: thẻ đang đóng nằm lại ở
             chấm xem lần trước, để nó trượt là có cú bay ngang qua cả sơ đồ.
             Gỡ lớp ở khung hình sau, lúc trình duyệt đã ghi nhận vị trí mới. */
          card.toggleClass('is-jump', !card.hasClass('is-open'));

          card
            .addClass('is-open')
            .css({ top: y + '%', left: x + '%', '--card-dx': '0px', '--card-dy': '0px' });

          if (card.hasClass('is-jump')) {
            // Đọc một giá trị bố cục để ép trình duyệt tính lại ngay, không thì
            // cả hai thay đổi gộp vào một nhịp và lớp is-jump thành vô nghĩa.
            void card[0].offsetWidth;
            window.requestAnimationFrame(function () {
              card.removeClass('is-jump');
            });
          }

          // Lật theo chỗ trống trên MÀN HÌNH chứ không phải trong khối sơ đồ:
          // khối sơ đồ rộng hơn màn hình và thò ra hai bên, chấm sát mép trái vẫn
          // còn thừa chỗ trong khối nhưng thẻ thì đã nằm ngoài màn hình.
          var spot = pin[0].getBoundingClientRect();

          card.toggleClass('is-flip-x', spot.left < card.outerWidth() + 8);
          card.toggleClass('is-flip-y', spot.top < card.outerHeight() + 8);

          App.utilityKeepCardInView(card, map);
        }

        root.find('.utility_pin, .utility_item_btn').removeClass('is-active is-current');
        group.addClass('is-active');

        /* .is-current chỉ cho ĐÚNG cái chấm đang xem: nó là chấm duy nhất được
           nằm trên tấm ảnh. Mấy chấm cùng số vẫn sáng (.is-active) nhưng ở lớp
           dưới, không thì rê chuột chấm 13 này lại thấy ba chấm 13 kia nổi lên
           đè lên ảnh.

           Trừ chấm đang bị thẻ tiêu đề hoặc bảng danh sách che khuất: tỉ lệ màn
           hình càng hẹp thì bản vẽ càng tràn ra hai bên, vài chấm mép phải chui
           xuống dưới bảng. Bấm dòng trong bảng vẫn tới được chúng, mà nâng lớp
           thì thành một chấm lơ lửng trên mặt kính. Thẻ ảnh vẫn mở bình thường. */
        if (!App.utilityPinCovered(pin[0])) pin.addClass('is-current');

        var row = root.find('.utility_item_btn[data-pin="' + number + '"]').addClass('is-active');
        if (row.length && list.length) App.utilityScrollIntoList(list, row);
      }

      /* Chấm đầu tiên đang hiện của một số — dùng cho lời gọi chỉ biết SỐ
         (bấm một dòng trong bảng). Chấm của tầng khác đang ẩn nên phải bỏ qua,
         nếu không thẻ neo vào một chấm không nhìn thấy. */
      function pinOf(number) {
        var shown = root.find('.utility_pin--named[data-pin="' + number + '"]').not('[hidden]');

        return shown.length ? shown.first() : root.find('.utility_pin--named[data-pin="' + number + '"]').first();
      }

      /* pinned giữ CHÍNH phần tử chấm đang mở, không giữ số: bấm lần nữa đúng
         chấm đó mới đóng, còn bấm sang một chấm khác cùng số thì thẻ nhảy sang
         chấm mới. */
      function toggle(pin) {
        // Dòng trong bảng có thể không có chấm nào trên bản vẽ (ví dụ số 64 của
        // mặt bằng tầng 1 nằm ngoài khung hình): bỏ qua, đừng ghi pinned bằng
        // undefined làm hỏng luôn phần rê chuột xem trước.
        if (!pin || !pin.length) return;

        if (pinned === pin[0]) {
          pinned = null;
          close();
          return;
        }

        pinned = pin[0];
        open(pin);
      }

      root.on('click', '.utility_pin--named', function () {
        toggle(jQuery(this));
      });

      root.on('click', '.utility_item_btn', function () {
        toggle(pinOf(jQuery(this).attr('data-pin')));
      });

      /* Mobile: sơ đồ tổng thể rộng gấp đôi màn hình và tự cuộn ngang, mở ra
         thì đưa phần giữa bản vẽ vào tầm nhìn thay vì dính mép trái.

         Chỉ làm với khung THẬT SỰ cho cuộn (overflow-x: auto). Mặt bằng tầng
         cắt khung bằng overflow: hidden, khung đó vẫn có scrollWidth lớn hơn
         nên đặt scrollLeft sẽ đẩy lệch cả bản vẽ mà người dùng không kéo lại
         được. */
      var pane = root.find('.utility_map')[0];

      if (pane && window.getComputedStyle(pane).overflowX === 'auto' && pane.scrollWidth > pane.clientWidth) {
        pane.scrollLeft = (pane.scrollWidth - pane.clientWidth) / 2;
      }

      // Xem trước khi rê chuột, chỉ trên thiết bị thật sự có chuột: trên cảm
      // ứng, mouseenter bắn kèm cú chạm rồi tự đóng lại ngay.
      if (window.matchMedia('(hover: hover)').matches) {
        root.on('mouseenter', '.utility_pin--named', function () {
          if (pinned === null) open(jQuery(this));
        });

        root.on('mouseleave', '.utility_pin--named', function (e) {
          if (pinned !== null) return;

          /* Rê thẳng từ chấm này sang chấm khác thì ĐỪNG đóng: để mouseenter
             của chấm kia lo. Đóng ở đây là thẻ mất trạng thái đang mở, mà cả
             hai sự kiện bắn trong cùng một nhịp nên trình duyệt không kịp vẽ
             lần mờ nào — thẻ chỉ nhảy cóc sang chỗ mới thay vì trượt. */
          if (e.relatedTarget && jQuery(e.relatedTarget).closest('.utility_pin--named').length) return;

          close();
        });

        /* Rê chuột vào một DÒNG trong bảng thì chỉ sáng chấm tương ứng trên sơ
           đồ, KHÔNG mở thẻ ảnh: người dùng đang đọc danh sách chứ chưa chọn
           xem cái nào. Dùng class riêng .is-hover nên không xoá mất chấm đang
           mở thẻ. */
        root.on('mouseenter', '.utility_item_btn', function () {
          root.find('.utility_pin--named[data-pin="' + jQuery(this).attr('data-pin') + '"]').addClass('is-hover');
        });

        root.on('mouseleave', '.utility_item_btn', function () {
          root.find('.utility_pin--named').removeClass('is-hover');
        });
      }

      // Thu gọn / mở nhóm trong bảng.
      root.on('click', '.utility_group_head', function () {
        var group = jQuery(this).closest('.utility_group').toggleClass('is-open');
        jQuery(this).attr('aria-expanded', group.hasClass('is-open') ? 'true' : 'false');
      });

      /* Đổi tầng: đổi CẢ bảng danh sách lẫn chấm trên bản vẽ — mỗi tab chỉ còn
         những vị trí thuộc tầng đó. */
      function setFloor(floor) {
        var tab = root.find('.utility_floor[data-floor="' + floor + '"]');
        if (!tab.length || tab.hasClass('is-active')) return;

        root.find('.utility_floor')
          .removeClass('is-active')
          .attr('aria-selected', 'false');
        tab.addClass('is-active').attr('aria-selected', 'true');

        // Thuộc tính hidden chứ không phải .toggle(): markup từ server cũng
        // dùng đúng thuộc tính này, hai bên không đá nhau.
        root.find('.utility_pin').each(function () {
          jQuery(this).attr('hidden', jQuery(this).attr('data-floor') !== floor);
        });

        var groups = root.find('.utility_group').each(function () {
          jQuery(this).attr('hidden', jQuery(this).attr('data-floor') !== floor);
        });

        // Tầng chưa có nội dung: hiện một dòng báo thay vì bảng trống trơn.
        root.find('.utility_empty').attr(
          'hidden',
          groups.not('[hidden]').length > 0
        );
      }

      root.on('click', '.utility_floor', function () {
        setFloor(jQuery(this).attr('data-floor'));
        pinned = null;
        close();
      });

      // Bấm ra ngoài hoặc Esc thì đóng thẻ.
      jQuery(document).on('click', function (e) {
        if (jQuery(e.target).closest('.utility_pin, .utility_item_btn, .js-utility-card').length) return;
        pinned = null;
        close();
      });

      jQuery(document).on('keyup', function (e) {
        if (e.key !== 'Escape') return;
        pinned = null;
        close();
      });
    });
  },

  /* Chấm có đang bị khối khác phủ lên không. Hỏi thẳng trình duyệt xem ai đang
     nằm trên cùng tại tâm chấm, chính xác hơn là tự so hình chữ nhật với từng
     khối. Thẻ ảnh không tính vì nó pointer-events: none. */
  utilityPinCovered: function (pin) {
    var rect = pin.getBoundingClientRect();
    var top = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);

    return !top || !(top === pin || pin.contains(top));
  },

  /* Đẩy thẻ ảnh vào trong khung nhìn khi nó thò ra ngoài.

     Lật hướng thôi chưa đủ: chấm nằm gần góc thì thẻ vẫn có thể chạm mép, mà
     .utility_map cắt (overflow: hidden) nên phần thò ra biến mất luôn. Đo xong
     đẩy bằng --card-dx/dy, thẻ vẫn dính theo chấm nhưng không bị cắt. Chừa
     thêm chỗ cho thanh menu nổi ở đỉnh trang. */
  utilityKeepCardInView: function (card, map) {
    var full = map[0].getBoundingClientRect();
    // Chỉ phần khung đang thấy: khung mặt bằng tầng có thể rộng hơn cửa sổ.
    var box = {
      left: Math.max(full.left, 0),
      top: Math.max(full.top, 0),
      right: Math.min(full.right, window.innerWidth),
      bottom: Math.min(full.bottom, window.innerHeight)
    };
    var rect = card[0].getBoundingClientRect();
    var head = document.getElementById('header_site');
    var edge = 16;
    var top = box.top + edge;
    var dx = 0;
    var dy = 0;

    if (head) top = Math.max(top, head.getBoundingClientRect().bottom + 8);

    if (rect.left < box.left + edge) dx = (box.left + edge) - rect.left;
    else if (rect.right > box.right - edge) dx = (box.right - edge) - rect.right;

    if (rect.top < top) dy = top - rect.top;
    else if (rect.bottom > box.bottom - edge) dy = (box.bottom - edge) - rect.bottom;

    if (dx || dy) card.css({ '--card-dx': dx + 'px', '--card-dy': dy + 'px' });
  },

  /* Kéo một dòng vào tầm nhìn TRONG bảng danh sách, không đụng tới cuộn của
     trang: scrollIntoView() sẽ cuộn luôn cả section trong chế độ fullpage. */
  utilityScrollIntoList: function (list, row) {
    var box = list[0].getBoundingClientRect();
    var item = row[0].getBoundingClientRect();

    if (item.top >= box.top && item.bottom <= box.bottom) return;

    list[0].scrollTop += item.top - box.top - list[0].clientHeight / 2 + item.height / 2;
  },
};
jQuery(document).ready(function () {
  var modules = [
    'preloader', 'scrollHeader', 'headerToneSpy', 'initSectionEffects', 'fullPageScroll',
    'playFirstSection', 'gsapAnimation', 'ttSlider', 'menuOverlay', 'submenuToggle',
    'galleryCards', 'centeredSlider', 'ebrochureFiles', 'mediaLightbox', 'sectionNavSpy',
    'sectionNavLinks', 'headerContact', 'backToTop', 'bannerScroll', 'openLocationTab',
    'mapPoints', 'sliderPartner', 'brochureModal', 'eventModal', 'eventPopup',
    'progressList', 'newsList', 'newsPopup', 'innerBlockNav', 'utilityMap',
    'floorplanTowers', 'towerPlan', 'investModal', 'parallaxItem'
  ];
  modules.forEach(function (fn) {
    if (typeof App[fn] === 'function') {
      try {
        if (fn === 'playFirstSection' && document.getElementById('preloader')) return;
        App[fn]();
      } catch (err) {
        console.warn('App.' + fn + ' error:', err);
      }
    }
  });
});
