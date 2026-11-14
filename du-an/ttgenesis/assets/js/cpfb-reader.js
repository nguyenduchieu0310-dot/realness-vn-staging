/**
 * Comma PDF Flipbook — trình đọc
 *
 * Cách hoạt động:
 *   PDF.js đọc file PDF -> vẽ từng trang ra <canvas>. Phần trình bày do một
 *   "engine" lo, và có hai engine thay nhau được:
 *
 *     FlipEngine  — StPageFlip, sách lật 3D
 *     SlideEngine — trượt ngang như slide, tự viết, không cần thư viện
 *
 *   Cả hai nhận cùng một bộ phần tử .cpfb-page nên đổi qua lại lúc đang đọc
 *   được, không phải tải lại file PDF.
 *
 * Vẽ theo nhu cầu (lazy): chỉ vẽ trang đang xem và vài trang lân cận, nên sách
 * 200 trang vẫn mở nhanh và không ngốn RAM.
 */
(function () {
	'use strict';

	var CFG = window.CPFB_CFG || {};

	/**
	 * wp_localize_script biến MỌI giá trị thành chuỗi ("5", "1200", true -> "1").
	 * Không ép về số thì "1 + '5' + 1" ra "151" chứ không phải 7 — vẽ nhầm 151 trang.
	 * Ép một lần ở đây để phần còn lại của file yên tâm dùng như số.
	 */
	function num(v, mac_dinh) {
		var n = parseInt(v, 10);
		return isNaN(n) ? mac_dinh : n;
	}
	CFG.flipSpeed = num(CFG.flipSpeed, 700);
	CFG.preload = num(CFG.preload, 3);
	CFG.readThrottle = num(CFG.readThrottle, 6);
	CFG.autoplayDelay = num(CFG.autoplayDelay, 6);
	// wp_localize_script biến 0 thành chuỗi "0" — mà "0" !== 0, quên ép là công
	// tắc tắt cũng thành bật.
	CFG.splitWide = num(CFG.splitWide, 1);

	/* Các mức phóng to. 1 = vừa khung; người xem bấm +/- để nhảy giữa các mức. */
	var ZOOM = [1, 1.25, 1.5, 2, 2.5, 3];

	/* Dưới bề ngang này thì hai trang cạnh nhau hẹp tới mức không đọc nổi:
	   màn 375px trừ padding còn ~347px, chia đôi ra 173px một trang. */
	var NARROW = 780;

	function el(tag, cls) {
		var e = document.createElement(tag);
		if (cls) e.className = cls;
		return e;
	}

	/**
	 * Chia trang thành từng "màn". Mỗi màn là mảng số trang hiện cùng lúc.
	 *   1 trang/màn: [1] [2] [3]...
	 *   2 trang/màn: [1] [2,3] [4,5]... — trang 1 đứng một mình vì nó là bìa,
	 *   giống hệt cách sách thật mở ra, và cũng là cách StPageFlip ghép cặp.
	 */
	function buildViews(total, per) {
		var v = [];
		if (per === 1) {
			for (var i = 1; i <= total; i++) v.push([i]);
			return v;
		}
		v.push([1]);
		for (var p = 2; p <= total; p += 2) {
			v.push(p + 1 <= total ? [p, p + 1] : [p]);
		}
		return v;
	}

	/* ================================================================== *
	 * ENGINE 1: sách lật 3D (StPageFlip)
	 * ================================================================== */

	function FlipEngine(reader) {
		this.r = reader;
	}

	FlipEngine.prototype.build = function () {
		var r = this.r;
		var single = r.isSingle();

		this.host = el('div', 'cpfb-stage');
		r.viewport.appendChild(this.host);
		r.makePages(this.host);

		var size = r.pageSize();

		/* Ép 1 hay 2 trang/màn bằng chính luật của StPageFlip: nó chuyển sang
		   "portrait" (1 trang) khi bề ngang khung < 2 × minWidth. Nên minWidth
		   khổng lồ = luôn 1 trang, còn usePortrait:false = luôn 2 trang.
		   StPageFlip cũng ghi min-width thẳng vào style của khung — CSS
		   .cpfb-stage{min-width:0!important} vô hiệu hoá nó, nếu không trang sẽ
		   phình ra cả triệu pixel.
		   maxWidth phải lớn hơn minWidth, nếu không thư viện tự đặt lại về 2000
		   và trang bị chặn cứng ở 2000px khi phóng to. */
		this.flip = new window.St.PageFlip(this.host, {
			width: size.w,
			height: size.h,
			size: 'stretch',
			usePortrait: !r.isDouble(),
			minWidth: single ? 1000000 : (r.spread === 'auto' ? 320 : 1),
			maxWidth: 5000000,
			minHeight: 1,
			maxHeight: 5000000,
			maxShadowOpacity: 0.5,
			showCover: true,
			/* true = KHÔNG chặn cuộn dọc bằng ngón tay trên quyển sách.
			   Để false thì StPageFlip gọi preventDefault() ngay ở touchstart, và
			   trên điện thoại quyển sách chiếm gần hết màn hình — người đọc đặt
			   ngón vào giữa trang là không cuộn trang web được nữa, phải mò ra
			   mép trên hoặc mép dưới. Với true, vuốt dọc thì trang cuộn, vuốt
			   ngang thì lật (CSS đã đặt touch-action:pan-y cho đúng ranh giới).
			   Cái giá là trình duyệt bắn thêm chuỗi sự kiện chuột giả sau mỗi cú
			   chạm — bindTouch() bên dưới chặn lại. */
			mobileScrollSupport: true,
			useMouseEvents: true,
			startPage: Math.max(0, (r.startAt || 1) - 1),
			flippingTime: CFG.flipSpeed || 700,
		});

		this.flip.loadFromHTML(this.host.querySelectorAll('.cpfb-page'));
		this.syncDensity();
		this.patchCopy();
		this.bindTouch();
		this.buildGutter();

		/* Phóng to thì kéo là để CUỘN, không phải lật. StPageFlip bắt mousedown
		   trên khung và mousemove trên window, nên chỉ cần rê chuột qua trang là
		   nó nhấc góc giấy lên — kéo sang chỗ khác xem thì thành cú lật dở dang,
		   còn khung thì đứng im. Gỡ hẳn bộ handler của thư viện lúc này; lật vẫn
		   còn nút và bàn phím. Engine dựng lại mỗi lần đổi mức phóng to, nên
		   quay về 1x là handler tự có lại. */
		if (r.zoom > 1) this.setInteractive(false);

		var self = this;
		this.flip.on('flip', function (e) {
			self.syncDensity();
			self.syncCenter();
			r.onPageChange(e.data + 1);
		});
		this.flip.on('changeOrientation', function () {
			self.syncDensity();
			self.syncCenter();
		});

		this.flip.on('changeState', function (e) {
			if (e.data === 'flipping' && r.btn.sound) window.CPFB_UI.sound.flip();

			/* CHỈ đổi chỗ canh giữa ở đúng hai trạng thái: lúc cú lật thật sự bắt
			   đầu chạy ('flipping') và lúc mọi thứ đã yên ('read'). Đổi ngay từ
			   'flipping' để khung trượt cùng nhịp với tờ giấy, chứ đợi lật xong
			   mới trượt thì thành hai cú giật rời.

			   TUYỆT ĐỐI không đụng vào lúc 'fold_corner' — trạng thái thư viện đặt
			   khi con trỏ mới rê tới mép trang và nó nhấc hờ góc giấy lên xem
			   trước, CHƯA bấm gì. Dịch khung lúc đó là tự bắn vào chân mình:

			     rê tới mép -> nhấc góc -> khung trượt đi
			       -> con trỏ hết nằm ở mép -> hạ góc xuống -> khung trượt về
			       -> con trỏ lại nằm ở mép -> nhấc góc... lặp vô tận

			   Chính là hiện tượng sách giật trái phải liên tục khi hover mép phải
			   trang bìa (hoặc mép trái trang 2).

			   'user_fold' (đang kéo tay) cũng để yên: dịch khung giữa chừng thì
			   nếp gấp nhảy theo tay. Kéo xong 'read' lo nốt. */
			if (e.data === 'flipping') self.syncCenter(self.aimSpread());
			else if (e.data === 'read') self.syncCenter();
		});

		this.layout();
	};

	/**
	 * Màn sắp tới là màn nào — dùng lúc tờ giấy mới bắt đầu quay.
	 * Hướng lật do thư viện chốt ở đầu cú lật: 0 = tới, 1 = lùi.
	 */
	FlipEngine.prototype.aimSpread = function () {
		try {
			var col = this.flip.getPageCollection();
			var here = col.getCurrentSpreadIndex();
			var back = this.flip.getRender().getDirection() === 1;
			return Math.max(0, Math.min(col.getSpread().length - 1, here + (back ? -1 : 1)));
		} catch (e) {
			return null;
		}
	};

	/**
	 * Bìa trước (và bìa sau) đứng MỘT MÌNH trên màn, nhưng khung sách vẫn rộng
	 * đúng hai trang — nên trang bìa dính hẳn về một bên, chừa nửa khung trống
	 * bên kia. Nhìn như sách bị lệch chứ không phải bìa.
	 *
	 * Đẩy cả khung sang nửa trang để tờ đơn đó về giữa màn. Dịch bằng transform
	 * chứ không đổi bề ngang khung: đổi bề ngang thì StPageFlip phải tính lại
	 * khổ trang và vẽ lại toàn bộ canvas, còn transform chỉ là phép dời hình,
	 * chạy trên card đồ hoạ và trượt mượt cùng nhịp với cú lật.
	 */
	FlipEngine.prototype.syncCenter = function (spreadIndex) {
		if (!this.flip || !this.host) return;
		var shift = 0;
		try {
			if (!this.r.isSingle()) {
				var col = this.flip.getPageCollection();
				var sp = col.getSpread();
				var i = spreadIndex === null || spreadIndex === undefined ? col.getCurrentSpreadIndex() : spreadIndex;
				var view = sp[i];
				if (view && view.length === 1) {
					/* Bìa TRƯỚC nằm bên phải màn, bìa SAU nằm bên trái — luật của
					   showSpread() trong thư viện. Dịch ngược lại phía đó. */
					shift = view[0] === col.getPages().length - 1 ? 1 : -1;
				}
			}
		} catch (e) { /* thư viện đổi API thì thôi, cứ để nguyên giữa khung */ }

		// translateZ(0) giữ lại vì page-flip.css đặt nó để tách lớp compositor
		this.host.style.transform = 'translateX(' + (shift * 25) + '%) translateZ(0)';
		// Lệch = đang có tờ đứng một mình; 1 trang/màn thì cũng chẳng có gáy nào
		this.host.classList.toggle('cpfb-nogutter', shift !== 0 || this.r.isSingle());
	};

	/**
	 * Rãnh gáy sách: dải tối mờ dần ở đúng giữa hai trang.
	 *
	 * Phần tử riêng nằm trong khung sách, KHÔNG vẽ vào canvas của trang — vẽ vào
	 * canvas thì mỗi lần đổi khổ hay phóng to đều phải vẽ lại cả trang, mà bóng
	 * gáy sách lại phải nằm vắt qua ranh giới hai trang chứ không thuộc trang nào.
	 *
	 * Đặt trên các trang đứng yên nhưng nhường tờ đang lật (z-index của tờ đó là
	 * startZIndex+5), nên tờ giấy quay qua thì đi phía trước rãnh, đúng như khi
	 * lật một quyển sách thật.
	 */
	FlipEngine.prototype.buildGutter = function () {
		/* PHẢI nằm trong .stf__block, không phải trong .cpfb-stage.
		   .stf__block đặt perspective nên nó là một NGỮ CẢNH XẾP LỚP riêng: mọi
		   z-index của trang (1 = trang đứng yên, 3 = trang lộ ra bên dưới,
		   4 = bóng nếp gấp, 5 = trang đang lật) chỉ so với nhau BÊN TRONG nó.
		   Để rãnh ở ngoài thì nó so với chính .stf__wrapper — mà wrapper không
		   có z-index, nên rãnh luôn nằm trên MỌI trang, kể cả trang đang lật.
		   Đó là lý do rãnh đè lên tờ giấy đang quay. */
		var block = this.host.querySelector('.stf__block');
		if (!block) return;
		var g = el('div', 'cpfb-gutter');
		g.setAttribute('aria-hidden', 'true');
		block.appendChild(g);
		this.gutter = g;
	};

	/**
	 * Chọn kiểu lật (density) cho từng trang trước mỗi cú lật.
	 *
	 * VÌ SAO PHẢI CÓ HÀM NÀY
	 *
	 * showCover:true khiến StPageFlip gán density "hard" cho trang bìa (và cho
	 * trang cuối khi nó đứng lẻ một mình trên màn). Trang "hard" không vẽ nếp gấp
	 * mà xoay cứng nguyên khối bằng rotateY 3D — mô phỏng bìa các-tông. Tệ hơn,
	 * hễ hai trang kề nhau khác density là thư viện kéo luôn trang bên cạnh sang
	 * "hard" cho khớp. Kết quả người xem thấy: đúng cú lật ĐẦU TIÊN thì thô và
	 * giật, từ trang 2 trở đi mới mềm mại.
	 *
	 * Nhưng KHÔNG thể đặt cả quyển thành "soft" rồi thôi. Có hai lúc thư viện
	 * thật sự cần "hard": khi màn đích chỉ có MỘT trang (lật ngược về bìa, hoặc
	 * lật xuôi vào trang cuối lẻ), nó trỏ cả "trang đang lật" lẫn "trang lộ ra
	 * bên dưới" vào cùng một phần tử — kiểu mềm vẽ chồng lên chính nó, kiểu cứng
	 * thì không cần trang bên dưới nên vẫn đúng. Vậy nên density phải đổi theo
	 * chỗ đang đứng, chứ không đặt một lần rồi quên:
	 *
	 *   2 trang/màn, đang ở màn bìa -> bìa mềm (cú lật đầu tiên)
	 *   2 trang/màn, đã đi qua bìa  -> bìa cứng (để lật ngược về bìa vẽ đúng)
	 *   2 trang/màn, trang cuối lẻ  -> mềm khi đang ở đó, cứng khi chưa tới
	 *   1 trang/màn                 -> chỉ trang ngay TRƯỚC chỗ đang đọc là cứng
	 *
	 * Hàm còn dọn một lỗi rò của thư viện: chỗ ép "hard" cho trang kề bên KHÔNG
	 * bao giờ được trả về như cũ. Lật ngược về bìa một lần là trang 2 mang kiểu
	 * cứng theo suốt phiên đọc. Ở đây gọi setDensity() cho MỌI trang nên đặt lại
	 * sạch sau mỗi cú lật.
	 */
	FlipEngine.prototype.syncDensity = function () {
		if (!this.flip || !this.flip.getPageCollection) return;
		try {
			var col = this.flip.getPageCollection();
			var pages = col.getPages() || [];
			if (pages.length < 2) return;

			var portrait = this.flip.getOrientation() === 'portrait';
			var spread = col.getSpread() || [];
			var here = col.getCurrentSpreadIndex();
			var tail = spread.length ? spread[spread.length - 1] : null;
			// Trang cuối "đứng lẻ": màn cuối chỉ chứa đúng nó
			var lone = tail && tail.length === 1 && tail[0] === pages.length - 1 ? tail[0] : -1;

			pages.forEach(function (p, i) {
				var hard;
				if (portrait) {
					/* 1 trang/màn: lật LÙI cũng là trường hợp suy biến — thư viện
					   trỏ cả "trang đang lật" lẫn "trang bên dưới" vào cùng một
					   phần tử rồi BỎ LUÔN bước vẽ trang bên dưới (xem drawBottomPage:
					   portrait && direction===1 là thoát ngay). Kiểu mềm không còn
					   gì để lộ ra nên chỉ còn mỗi mép cắt chạy ngang qua màn hình —
					   nhìn thành trang TRƯỢT vào chứ không phải lật. Kiểu cứng xoay
					   nguyên tờ quanh mép trái nên vẫn ra dáng lật trang.
					   Chỉ trang NGAY TRƯỚC chỗ đang đọc mới cần, vì chỉ nó mới là
					   đích của cú lật lùi; trang đang đọc phải để mềm, nếu không
					   newTemporaryCopy() trả về chính nó và cú lật TỚI mất nếp gấp. */
					hard = i === here - 1;
				} else if (i === 0) {
					hard = here !== 0;
				} else if (i === lone) {
					hard = here !== spread.length - 1;
				} else {
					hard = false;
				}
				var want = hard ? 'hard' : 'soft';
				// setDensity() đặt lại cả density gốc lẫn density đang vẽ...
				p.setDensity(want);
				// ...còn lớp --soft/--hard trên thẻ thì chỉ setDrawingDensity() đổi
				if (p.setDrawingDensity) p.setDrawingDensity(want);
			});
		} catch (e) { /* thư viện đổi API thì cùng lắm bìa lật cứng như cũ */ }
	};

	/**
	 * Chạm để lật trang, và dọn hai cái bẫy của cảm ứng.
	 *
	 * 1. CHẠM NHANH KHÔNG LẬT ĐƯỢC. StPageFlip chỉ coi là thao tác thật khi ngón
	 *    tay ở lại ÍT NHẤT 250ms: touchstart hẹn giờ 250ms rồi mới bật cờ
	 *    isUserTouch, mà thiếu cờ đó thì lúc nhả tay nó bỏ qua hoàn toàn. Chạm
	 *    nhanh — đúng kiểu người ta vẫn chạm — nên không có gì xảy ra. Máy tính
	 *    không dính vì cú bấm chuột bật cờ ngay lập tức.
	 *    Vậy phần DƯỚI 250ms do đây lo, từ 250ms trở lên để thư viện lo. Hai
	 *    khoảng không chồng nhau nên không bao giờ lật hai lần: bộ đếm của thư
	 *    viện chỉ chạy khi ngón tay còn trên màn hình.
	 *
	 * 2. CHUỘT GIẢ. Đã bật mobileScrollSupport nên thư viện không preventDefault
	 *    ở touchstart nữa — đổi lại trình duyệt bắn ra một chuỗi mousedown/mouseup
	 *    giả sau mỗi cú chạm. Trình xử lý chuột của StPageFlip không hề kiểm tra
	 *    xem sự kiện là thật hay giả, nên mỗi cú vuốt lật hai trang. Chặn ở pha
	 *    CAPTURE của phần tử cha: pha này chạy trước trình xử lý của thư viện
	 *    (gắn trên .stf__block nằm bên trong), nên stopPropagation là nó không
	 *    bao giờ thấy sự kiện giả đó.
	 */
	/** Chép ảnh từ canvas này sang canvas kia, theo đúng thứ tự trong hai phần tử. */
	function copyCanvases(from, to) {
		if (!from || !to) return;
		var a = from.querySelectorAll('canvas');
		var b = to.querySelectorAll('canvas');
		for (var i = 0; i < a.length && i < b.length; i++) {
			if (!a[i].width || !a[i].height) continue;
			// Gán width/height là xoá sạch canvas -> chỉ gán khi thật sự lệch
			if (b[i].width !== a[i].width) b[i].width = a[i].width;
			if (b[i].height !== a[i].height) b[i].height = a[i].height;
			try { b[i].getContext('2d').drawImage(a[i], 0, 0); } catch (e) { /* canvas rỗng */ }
		}
	}

	/**
	 * Vá bản sao tạm của trang ở chế độ 1 trang/màn — tức là chế độ của mọi
	 * chiếc điện thoại.
	 *
	 * Lật TỚI ở chế độ này, StPageFlip không gấp chính trang đang xem mà NHÂN
	 * BẢN nó rồi cho bản sao gấp lại, giữ bản gốc nằm yên bên dưới. Nó nhân bản
	 * bằng cloneNode(), mà cloneNode() KHÔNG chép nội dung <canvas>: thẻ canvas
	 * được sao ra đúng kích thước nhưng trắng trơn. Nên trên điện thoại, mỗi cú
	 * lật tới là một tờ giấy TRẮNG gấp qua, gấp xong mới thấy trang thật.
	 *
	 * Trang ở đây bắt buộc vẽ bằng canvas (để phóng to vẫn nét) nên không né
	 * được; chép lại ảnh ngay sau khi thư viện nhân bản là xong. Không đụng vào
	 * mã thư viện: chỉ bọc thêm một lớp quanh phương thức của từng đối tượng
	 * trang, thư viện vẫn chạy nguyên như cũ.
	 */
	FlipEngine.prototype.patchCopy = function () {
		if (!this.flip || !this.flip.getPageCollection) return;
		try {
			var pages = this.flip.getPageCollection().getPages() || [];
			pages.forEach(function (p) {
				if (!p.newTemporaryCopy || p.cpfbPatched) return;
				p.cpfbPatched = true;
				var goc = p.newTemporaryCopy;
				p.newTemporaryCopy = function () {
					var copy = goc.call(this);
					// Trang "hard" thì thư viện trả về chính nó, không có gì để chép
					if (copy && copy !== this && copy.getElement) {
						copyCanvases(this.getElement(), copy.getElement());
					}
					return copy;
				};
			});
		} catch (e) { /* thư viện đổi API thì cùng lắm trang lật trắng như cũ */ }
	};

	FlipEngine.prototype.bindTouch = function () {
		var self = this;
		var host = this.host;
		var start = null;
		var lastTouch = 0;

		host.addEventListener('mousedown', function (e) {
			// 700ms: đủ rộng cho chuỗi sự kiện giả, đủ hẹp để không nuốt cú bấm thật
			if (Date.now() - lastTouch < 700) e.stopPropagation();
		}, true);

		host.addEventListener('touchstart', function (e) {
			// Hai ngón trở lên là phóng to, không phải lật trang
			if (e.touches.length !== 1) { start = null; return; }
			start = { x: e.touches[0].clientX, y: e.touches[0].clientY, at: Date.now() };
		}, { passive: true });

		host.addEventListener('touchcancel', function () {
			start = null;
			lastTouch = Date.now();
		}, { passive: true });

		host.addEventListener('touchend', function (e) {
			lastTouch = Date.now();

			var s = start;
			start = null;
			if (!s || e.changedTouches.length !== 1 || !self.flip) return;
			// Phóng to: ngón tay đang cuộn khung, chạm nhẹ cũng không phải lệnh lật
			if (self.r.zoom > 1) return;

			var t  = e.changedTouches[0];
			var dx = t.clientX - s.x;
			var dy = t.clientY - s.y;

			/* Vuốt DỌC = đang cuộn trang, không phải lật.
			   Bộ đếm 250ms của StPageFlip bật cờ "đã chạm" bất kể ngón tay đi
			   hướng nào, nên cuộn dọc lâu hơn 250ms rồi nhả tay là nó lật mất
			   một trang. Huỷ trước khi trình xử lý của thư viện chạy — sự kiện
			   nổi bọt qua đây (gắn trên khung sách) rồi mới tới nó (gắn trên
			   window). Chỉ huỷ khi CHƯA có nếp gấp nào đang dở, để không bỏ dở
			   một cú lật thật của người đọc. */
			if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
				try {
					if (self.flip.getState() === 'read') self.flip.userStop({ x: 0, y: 0 }, true);
				} catch (err) { /* thư viện đổi API thì thôi, giữ nguyên nếp cũ */ }
				return;
			}

			if (Date.now() - s.at >= 250) return;               // khúc này thư viện tự lo
			if (Math.abs(dx) > 10 || Math.abs(dy) > 10) return; // vuốt, không phải chạm

			var box = host.getBoundingClientRect();
			if (t.clientX < box.left + box.width / 2) self.prev();
			else self.next();
		}, { passive: true });
	};

	/**
	 * Bật/tắt việc thư viện tự bắt chuột và chạm trên quyển sách.
	 * getUI().setHandlers()/removeHandlers() là hai hàm StPageFlip tự dùng khi
	 * dựng và huỷ; gọi lại chúng là cách duy nhất không phải vá thư viện.
	 * removeHandlers() gỡ luôn listener resize của nó — không sao, relayout()
	 * của trình đọc vẫn gọi flip.update() mỗi khi khổ màn hình đổi.
	 */
	FlipEngine.prototype.setInteractive = function (on) {
		try {
			var ui = this.flip.getUI();
			if (on) ui.setHandlers();
			else ui.removeHandlers();
		} catch (e) { /* thư viện đổi API thì thôi, còn hơn làm sập trình đọc */ }
	};

	FlipEngine.prototype.layout = function () {
		this.host.style.width = this.r.stageWidth() + 'px';
		if (this.flip) this.flip.update();
		this.syncCenter();
	};

	FlipEngine.prototype.current = function () {
		return this.flip ? this.flip.getCurrentPageIndex() + 1 : 1;
	};

	FlipEngine.prototype.next = function () { this.flip.flipNext(); };
	FlipEngine.prototype.prev = function () { this.flip.flipPrev(); };

	FlipEngine.prototype.atStart = function () {
		return !this.flip || this.flip.getCurrentPageIndex() < 1;
	};

	FlipEngine.prototype.atEnd = function () {
		if (!this.flip) return true;
		var col = this.flip.getPageCollection();
		return col.getCurrentSpreadIndex() >= col.getSpread().length - 1;
	};

	FlipEngine.prototype.goto = function (page) {
		this.flip.flip(page - 1);
	};

	FlipEngine.prototype.destroy = function () {
		try {
			// destroy() tự gỡ luôn phần tử khung khỏi DOM
			if (this.flip) this.flip.destroy();
		} catch (e) { /* thư viện ném lỗi thì cũng đừng để kẹt cả trình đọc */ }
		if (this.host && this.host.parentNode) this.host.remove();
		this.flip = null;
	};

	/* ================================================================== *
	 * ENGINE 2: trượt ngang (tự viết)
	 * ================================================================== */

	function SlideEngine(reader) {
		this.r = reader;
		this.index = 0;
		this.drag = null;
	}

	SlideEngine.prototype.build = function () {
		var r = this.r;
		this.views = buildViews(r.total, r.isSingle() ? 1 : 2);

		this.host = el('div', 'cpfb-slide');
		this.track = el('div', 'cpfb-slide__track');
		this.host.appendChild(this.track);
		r.viewport.appendChild(this.host);

		// Cùng một rãnh gáy sách như kiểu lật — hai kiểu xem phải ra cùng một quyển
		this.gutter = el('div', 'cpfb-gutter');
		this.gutter.setAttribute('aria-hidden', 'true');
		this.host.appendChild(this.gutter);

		var self = this;
		this.views.forEach(function (view) {
			var box = el('div', 'cpfb-slide__view');
			view.forEach(function (n) {
				box.appendChild(r.makePage(n));
			});
			self.track.appendChild(box);
		});

		this.index = this.viewOf(r.startAt || 1);
		this.bindSwipe();
		this.layout();
		this.paint(false);
	};

	SlideEngine.prototype.viewOf = function (page) {
		for (var i = 0; i < this.views.length; i++) {
			if (this.views[i].indexOf(page) !== -1) return i;
		}
		return 0;
	};

	SlideEngine.prototype.layout = function () {
		var r = this.r;
		var w = r.stageWidth();
		var per = r.isSingle() ? 1 : 2;
		var pw = Math.floor(w / per);
		var ph = Math.floor(pw / r.ratio);

		this.host.style.width = w + 'px';
		this.host.style.height = ph + 'px';

		var pages = this.track.querySelectorAll('.cpfb-page');
		for (var i = 0; i < pages.length; i++) {
			pages[i].style.width = pw + 'px';
			pages[i].style.height = ph + 'px';
		}
		this.paint(false);
	};

	/** Đẩy dải trang sang trái/phải. offset = pixel đang kéo bằng tay. */
	SlideEngine.prototype.paint = function (animate, offset) {
		var w = this.host ? this.host.clientWidth : 0;
		var view = this.views[this.index];
		this.host.classList.toggle('cpfb-nogutter', !view || view.length < 2);
		this.track.style.transition = animate ? 'transform .32s cubic-bezier(.22,.61,.36,1)' : 'none';
		this.track.style.transform = 'translate3d(' + (-this.index * w + (offset || 0)) + 'px,0,0)';
	};

	SlideEngine.prototype.go = function (i) {
		var next = Math.max(0, Math.min(this.views.length - 1, i));
		var changed = next !== this.index;
		this.index = next;
		this.paint(true);
		if (changed) {
			if (this.r.btn.sound) window.CPFB_UI.sound.flip();
			this.r.onPageChange(this.current());
		}
	};

	SlideEngine.prototype.current = function () {
		var v = this.views[this.index];
		return v ? v[0] : 1;
	};

	SlideEngine.prototype.next = function () { this.go(this.index + 1); };
	SlideEngine.prototype.prev = function () { this.go(this.index - 1); };

	SlideEngine.prototype.atStart = function () { return this.index <= 0; };
	SlideEngine.prototype.atEnd = function () { return this.index >= this.views.length - 1; };

	SlideEngine.prototype.goto = function (page) {
		this.go(this.viewOf(page));
	};

	/**
	 * Vuốt bằng ngón tay / kéo bằng chuột.
	 * Chỉ nhận khi cử chỉ nghiêng về phương ngang — nếu không thì người dùng
	 * đang cuộn trang dọc và ta phải để yên cho họ cuộn.
	 */
	SlideEngine.prototype.bindSwipe = function () {
		var self = this;
		var start = null;
		var axis = '';

		var down = function (e) {
			// Phóng to: kéo là cuộn khung (Reader.bindPan), không phải vuốt sang trang
			if (e.button > 0 || self.r.zoom > 1) return;
			start = { x: e.clientX, y: e.clientY };
			axis = '';
			self.track.style.transition = 'none';
		};

		var move = function (e) {
			if (!start) return;
			var dx = e.clientX - start.x;
			var dy = e.clientY - start.y;
			if (!axis) {
				if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
				axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
			}
			if (axis !== 'x') return;
			if (e.cancelable) e.preventDefault();
			self.paint(false, dx);
		};

		var up = function (e) {
			if (!start) return;
			var dx = e.clientX - start.x;
			start = null;

			/* Chưa nghiêng hẳn về phía nào = một cú chạm/bấm tại chỗ. Lật theo
			   nửa màn hình đã chạm, giống hệt chế độ sách lật — hai kiểu xem mà
			   thao tác khác nhau thì người đọc phải học lại từ đầu. */
			if (!axis) {
				var box = self.host.getBoundingClientRect();
				if (e.clientX < box.left + box.width / 2) self.prev();
				else self.next();
				return;
			}

			if (axis !== 'x') return;
			// 12% bề ngang, tối thiểu 45px — vuốt hụt thì trả về chỗ cũ
			var need = Math.max(45, self.host.clientWidth * 0.12);
			if (dx <= -need) self.go(self.index + 1);
			else if (dx >= need) self.go(self.index - 1);
			else self.paint(true);
		};

		this.host.addEventListener('pointerdown', down);
		this.host.addEventListener('pointermove', move, { passive: false });
		window.addEventListener('pointerup', up);
		window.addEventListener('pointercancel', up);

		this._off = function () {
			self.host.removeEventListener('pointerdown', down);
			self.host.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
			window.removeEventListener('pointercancel', up);
		};
	};

	SlideEngine.prototype.destroy = function () {
		if (this._off) this._off();
		if (this.host && this.host.parentNode) this.host.remove();
	};

	/* ================================================================== *
	 * TRÌNH ĐỌC
	 * ================================================================== */

	function Reader(root, opts) {
		opts = opts || {};
		this.root = root;
		this.url = root.dataset.pdf;
		this.postId = parseInt(root.dataset.id || '0', 10);
		this.shareUrl = root.dataset.share || '';
		this.shareImg = root.dataset.image || '';
		this.isModal = !!opts.modal;
		this.onClose = opts.onClose || null;

		/* Nút nào hiện + mở kiểu gì là RIÊNG từng tài liệu (đặt trong meta box),
		   nên đọc từ thuộc tính HTML chứ không lấy từ CFG chung — một trang có
		   thể nhúng nhiều tài liệu với cấu hình khác nhau. */
		this.btn = {
			toc: 1, thumbs: 1, sound: 1, fs: 1, dl: 1,
			share: 1, autoplay: 1, zoom: 1,
		};
		try {
			if (root.dataset.btn) this.btn = JSON.parse(root.dataset.btn);
		} catch (e) { /* hỏng thì dùng mặc định, không để sập trình đọc */ }

		/* Cửa sổ phủ có nút đóng hay không — PHP quyết định, vì chỉ bên đó mới biết
		   trình đọc đang nằm ở trang nào (xem CPFB_Shortcode::render). */
		this.canClose = root.dataset.close !== '0';

		this.openMode = root.dataset.open || 'normal';
		this.mode = root.dataset.mode === 'slide' ? 'slide' : 'flip';
		this.spread = root.dataset.spread || 'auto';
		if (['auto', 'single', 'double'].indexOf(this.spread) === -1) this.spread = 'auto';

		this.pdf = null;
		this.opened = false;   // getDocument() đã xong chưa — xem onProgress trong start()
		this.engine = null;
		this.pageEls = {};    // số trang -> phần tử
		this.rendered = {};   // số trang -> true (đã vẽ)
		this.pending = {};    // số trang -> thế hệ đang chờ vẽ
		this.chain = {};      // số trang -> hàng đợi vẽ (xem renderPage)
		this.tasks = {};      // số trang -> lệnh vẽ của PDF.js, để còn huỷ được
		this.gen = 0;         // tăng mỗi lần bố cục đổi; xem invalidate()
		this.total = 0;
		this.zoom = 1;
		this.startAt = 1;
		this.inFs = false;
		this.nativeFs = false;
		this.triedNative = false;
		this.isLightbox = false;
		this.autoplayTimer = null;
		this.heldMedia = null;   // video/âm thanh của trang đang bị tạm dừng

		// Mở lối cho theme/nhà phát triển gọi tới trình đọc, và để gỡ lỗi
		root.cpfbReader = this;
	}

	Reader.prototype.fail = function (msg) {
		/* Hỏng ngay từ đầu thì thanh công cụ chưa kịp dựng -> không có nút thoát.
		   Cứ để lớp phủ toàn màn hình nằm đó là người xem kẹt cứng với một ô báo
		   lỗi che kín trang. Gỡ lớp phủ trước, rồi mới báo lỗi tại chỗ. */
		this.root.classList.remove('cpfb-open--fullscreen');
		if (this.inFs && !this.isModal) this.exitFullscreen();

		this.root.innerHTML = '';
		var b = el('div', 'cpfb-error');
		b.textContent = msg;
		this.root.appendChild(b);
		if (this.isModal) this.root.appendChild(this.closeButton());
	};

	Reader.prototype.setProgress = function (pct, label) {
		if (!this.bar) return;
		this.bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
		if (label && this.label) this.label.textContent = label;
	};

	Reader.prototype.buildLoading = function () {
		var wrap = el('div', 'cpfb-loading');
		this.label = el('div', 'cpfb-loading__label');
		this.label.textContent = CFG.i18n.loading;
		var track = el('div', 'cpfb-loading__track');
		this.bar = el('div', 'cpfb-loading__bar');
		track.appendChild(this.bar);
		wrap.appendChild(this.label);
		wrap.appendChild(track);
		this.root.appendChild(wrap);
		this.loadingEl = wrap;
	};

	Reader.prototype.start = async function () {
		if (!this.url) { this.fail(CFG.i18n.noFile); return; }

		this.buildLoading();

		/* Áp trạng thái mở NGAY, trước mọi lệnh await.
		   Trước đây việc này nằm sau khi PDF tải xong, nên tài liệu đặt "mở toàn
		   màn hình" vẫn để lộ header/footer của theme suốt lúc tải — file nặng
		   thì lộ vài giây. Đặt ở đây thì khoá cuộn và lớp phủ có mặt từ nhịp đầu,
		   và khổ sách cũng được tính đúng ngay lần dựng đầu tiên. */
		this.applyOpenMode();

		/* Cửa sổ nổi do cpfb-autolink.js dựng KHÔNG đi qua enterFullscreen()
		   (applyOpenMode thoát sớm với isModal), nhưng nó vẫn che kín trang. */
		if (this.isModal) this.holdBackground();

		var pdfjs;
		try {
			pdfjs = await import(CFG.pdfjs);
			pdfjs.GlobalWorkerOptions.workerSrc = CFG.pdfWorker;
		} catch (e) {
			this.fail(CFG.i18n.errLib);
			return;
		}

		try {
			var task = pdfjs.getDocument({
				url: this.url,
				cMapUrl: CFG.cmaps,
				cMapPacked: true,
				standardFontDataUrl: CFG.stdFonts,
			});
			/* PDF.js VẪN bắn onProgress sau khi getDocument() đã xong: nó tải nốt
			   các khối còn lại của file ở nền. Không chặn thì những nhịp muộn đó
			   ghi đè nhãn ngược từ "Đang dựng sách" về "Đang tải tài liệu", và
			   thanh tiến trình tụt từ 75% xuống 70%.

			   Người đọc vì thế thấy chữ "Đang tải tài liệu" suốt cả lúc trình đọc
			   đã tải xong từ lâu và đang bận VẼ trang — đọc nhầm thành lỗi mạng.
			   Đo trên một brochure 30MB: tài liệu mở xong ở giây 0,56 nhưng nhãn
			   nhảy ngược ở giây 7,0. */
			task.onProgress = (p) => {
				if (this.opened) return;
				if (p.total) this.setProgress((p.loaded / p.total) * 70, CFG.i18n.loading);
			};
			this.pdf = await task.promise;
			this.opened = true;
		} catch (e) {
			this.fail(CFG.i18n.errOpen);
			return;
		}

		this.total = this.pdf.numPages;
		this.setProgress(75, CFG.i18n.rendering);

		/* Mục lục. Hai nguồn, theo thứ tự ưu tiên:
		   1. Nhập tay trong admin (data-toc) — hầu hết PDF scan không có bookmark
		      nên đây thường là nguồn duy nhất.
		   2. Bookmark có sẵn trong file PDF. */
		this.outline = [];
		this.manualToc = null;
		if (this.btn.toc) {
			try {
				var raw = this.root.dataset.toc;
				if (raw) {
					var m = JSON.parse(raw);
					if (m && m.length) this.manualToc = m;
				}
			} catch (e) { /* JSON hỏng thì bỏ qua, rơi về bookmark */ }

			if (!this.manualToc) {
				try {
					this.outline = (await this.pdf.getOutline()) || [];
				} catch (e) {
					this.outline = [];
				}
			}
		}

		await this.buildPanels();

		this.viewport = el('div', 'cpfb-viewport');
		this.root.appendChild(this.viewport);
		this.bindPan();

		this.buildControls();

		this.countRead();

		await this.buildEngine();

		this.setProgress(100, '');
		if (this.loadingEl) this.loadingEl.remove();
	};

	/* ---------------- tách trang đôi ---------------- */

	/**
	 * Dựng bản đồ "ô": mỗi ô là MỘT trang của sách lật.
	 *
	 * Nhiều file brochure/leaflet xuất ra theo lối dàn trang, không theo lối
	 * đọc: bìa trước và bìa sau là một khổ đơn, còn ruột thì mỗi trang PDF là
	 * nguyên một khổ đôi đã dán liền hai trang. Đo file Leaflet-Digital.pdf:
	 *
	 *   trang 1      552.8 x 850.4   (tỉ lệ 0.65 — khổ đứng, một ô)
	 *   trang 2–24  1105.5 x 850.4   (tỉ lệ 1.30 — đúng GẤP ĐÔI, hai ô)
	 *   trang 12    2211.0 x 850.4   (tỉ lệ 2.60 — gấp bốn, bốn ô)
	 *   trang 25     552.8 x 850.4   (một ô)
	 *
	 * Sách lật thì mọi tờ phải cùng khổ — StPageFlip chốt một cỡ trang duy nhất
	 * lúc khởi tạo. Trước đây plugin lấy khổ của trang 1 làm khổ chung, nên cả
	 * quyển thành khung ĐỨNG hẹp, rồi 23 trang ruột khổ ngang bị object-fit thu
	 * lại vừa bề ngang — chỉ còn cao một nửa khung, trên dưới hai dải trống.
	 * Bìa đẹp, từ trang 2 trở đi thì bé tí.
	 *
	 * Nay cắt mỗi khổ đôi thành hai ô rời. Cả quyển về cùng một khổ đứng, đúng
	 * khổ mà nhà thiết kế đã dựng; máy tính hiện 2 ô cạnh nhau thì ghép lại vừa
	 * đúng khổ đôi ban đầu.
	 *
	 * Điều kiện tách được đặt CHẶT, cốt để file bình thường không bao giờ dính:
	 * chỉ tách khi tài liệu có nhiều khổ ngang khác nhau VÀ khổ rộng đúng bằng
	 * bội số nguyên của khổ hẹp nhất. Một file A4 đứng lẫn một trang nằm ngang
	 * (tỉ lệ 1.41, không phải bội số nguyên) sẽ không bị đụng tới.
	 */
	Reader.prototype.buildPanels = async function () {
		var n = this.pdf.numPages;
		var self = this;

		var sizes = await Promise.all(
			Array.from({ length: n }, function (_, i) {
				return self.pdf.getPage(i + 1).then(function (p) {
					var v = p.getViewport({ scale: 1 });
					return { w: v.width, h: v.height };
				});
			})
		);

		// Khổ hẹp nhất là "một ô"; mọi thứ khác đo theo nó
		var base = sizes[0];
		sizes.forEach(function (s) { if (s.w < base.w) base = s; });

		var mixed = sizes.some(function (s) { return Math.abs(s.w - base.w) > 1; });
		var allow = CFG.splitWide !== 0 && mixed && base.w > 0;

		this.panels = [];
		var split = false;
		for (var i = 0; i < n; i++) {
			var s = sizes[i];
			var parts = 1;
			if (allow) {
				var k = Math.round(s.w / base.w);
				// Sai số 2% cho khác biệt làm tròn khi xuất file; cao cũng phải khớp
				var fit = k >= 2 && Math.abs(s.w - k * base.w) <= Math.max(2, base.w * 0.02);
				if (fit && Math.abs(s.h - base.h) <= Math.max(2, base.h * 0.02)) parts = k;
			}
			if (parts > 1) split = true;
			for (var j = 0; j < parts; j++) {
				this.panels.push({ pdf: i + 1, part: j, parts: parts });
			}
		}

		this.total = this.panels.length;

		/* Khổ sách. Có cắt thì lấy khổ MỘT Ô — mọi tờ khi đó đều bằng nhau.
		   Không cắt được thì lấy khổ PHỔ BIẾN NHẤT, chứ không lấy khổ trang 1:
		   trang 1 là bìa, và bìa hay là trang lệch khổ nhất trong cả tập. Lấy
		   nhầm nó là cả quyển sai khổ để chiều một trang. */
		this.ratio = split ? base.w / base.h : self.commonSize(sizes);
	};

	/** Tỉ lệ của khổ trang xuất hiện nhiều nhất trong tài liệu. */
	Reader.prototype.commonSize = function (sizes) {
		var tally = {};
		var best = sizes[0];
		var top = 0;
		sizes.forEach(function (s) {
			var key = Math.round(s.w) + 'x' + Math.round(s.h);
			tally[key] = (tally[key] || 0) + 1;
			if (tally[key] > top) { top = tally[key]; best = s; }
		});
		return best.w / best.h;
	};

	/** Số trang PDF -> số ô đầu tiên của trang đó (mục lục trỏ theo trang PDF). */
	Reader.prototype.panelOf = function (pdfPage) {
		if (!this.panels) return pdfPage;
		for (var i = 0; i < this.panels.length; i++) {
			if (this.panels[i].pdf === pdfPage) return i + 1;
		}
		return Math.max(1, Math.min(this.total, pdfPage));
	};

	/**
	 * Khổ canvas + phép tịnh tiến để vẽ ĐÚNG một ô của trang PDF.
	 * Cắt bằng cách đẩy cả trang sang trái rồi để canvas hẹp tự xén phần thừa —
	 * PDF.js vẽ vector nên ô nào cũng nét như nhau, không phải cắt từ ảnh lớn.
	 */
	Reader.prototype.panelBox = function (page, pan, targetW, dpr) {
		var raw = page.getViewport({ scale: 1 });
		var scale = (targetW / (raw.width / pan.parts)) * dpr;
		var vp = page.getViewport({ scale: scale });
		// Làm tròn theo mốc tuyệt đối để các ô ghép lại không hụt/thừa pixel nào
		var x0 = Math.round(vp.width * pan.part / pan.parts);
		var x1 = Math.round(vp.width * (pan.part + 1) / pan.parts);
		return { vp: vp, w: x1 - x0, h: Math.floor(vp.height), dx: -x0 };
	};

	/* ---------------- kích thước ---------------- */

	/**
	 * Một hay hai trang trên một màn hình.
	 *
	 * "2 trang" là lựa chọn cho MÁY BÀN. Máy hẹp thì vẫn phải hạ xuống 1 trang,
	 * không thì mỗi trang còn ~173px trên điện thoại — nhìn thấy chữ nhưng không
	 * đọc được. Chỉ "1 trang" là tuyệt đối, vì đó là chọn ít gây hại.
	 */
	Reader.prototype.isSingle = function () {
		if (this.spread === 'single') return true;
		return window.innerWidth < NARROW;
	};

	/**
	 * Có ép StPageFlip giữ 2 trang không (usePortrait:false = cấm nó tự về 1 trang).
	 * Chỉ ép khi màn còn đủ rộng; máy hẹp phải để ngỏ đường về 1 trang, nếu không
	 * minWidth bên FlipEngine có đặt lớn cỡ nào cũng vô nghĩa.
	 */
	Reader.prototype.isDouble = function () {
		return this.spread === 'double' && !this.isSingle();
	};

	/** Chỗ trống thật sự còn lại cho sách, sau khi trừ padding của khung. */
	Reader.prototype.avail = function () {
		var cs = window.getComputedStyle(this.root);
		var pad = parseFloat(cs.paddingLeft || 0) + parseFloat(cs.paddingRight || 0);
		var w = (this.root.clientWidth || 900) - pad;
		return Math.max(220, Math.floor(w));
	};

	/**
	 * Bề ngang dải sách. Đây là chỗ DUY NHẤT phóng to tác động vào: khung rộng
	 * ra thì cả sách to theo, canvas được vẽ lại ở độ phân giải mới nên phóng to
	 * vẫn nét — khác hẳn transform:scale() (chỉ kéo giãn ảnh cũ cho mờ đi).
	 */
	Reader.prototype.stageWidth = function () {
		var w = this.avail();
		var per = this.isSingle() ? 1 : 2;

		/* Trần chiều cao. Chỉ được đo clientHeight của khung khi chiều cao đó do
		   BÊN NGOÀI quyết định — toàn màn hình, hoặc quản trị đặt chiều cao cố
		   định. Khung nhúng bình thường thì chiều cao lại do chính quyển sách
		   đẩy ra, đo nó để tính lại khổ sách là quẩn vòng: sách nhỏ -> khung
		   thấp -> tính ra sách còn nhỏ hơn nữa. */
		var maxH;
		if (this.fsLike()) {
			maxH = Math.max(240, this.root.clientHeight - 96);
		} else if (this.root.style.height) {
			maxH = Math.max(240, this.root.clientHeight - 88);
		} else {
			maxH = Math.max(320, window.innerHeight * 0.82);
		}

		var byH = Math.floor(maxH * this.ratio * per);
		if (byH < w) w = byH;

		return Math.max(200, Math.floor(w * this.zoom));
	};

	/** Khổ MỘT trang — dùng để biết cần vẽ canvas to bao nhiêu. */
	Reader.prototype.pageSize = function () {
		var per = this.isSingle() ? 1 : 2;
		var w = Math.floor(this.stageWidth() / per);
		return { w: w, h: Math.floor(w / this.ratio) };
	};

	Reader.prototype.fsLike = function () {
		return this.inFs || this.isModal;
	};

	/* ---------------- dựng engine ---------------- */

	Reader.prototype.makePage = function (n) {
		var p = el('div', 'cpfb-page');
		p.dataset.page = n;
		var ph = el('div', 'cpfb-page__ph');
		ph.textContent = n;
		p.appendChild(ph);
		this.pageEls[n] = p;
		return p;
	};

	Reader.prototype.makePages = function (host) {
		for (var i = 1; i <= this.total; i++) {
			host.appendChild(this.makePage(i));
		}
	};

	Reader.prototype.buildEngine = async function () {
		this.pageEls = {};
		this.invalidate();
		this.engine = this.mode === 'slide' ? new SlideEngine(this) : new FlipEngine(this);
		this.engine.build();
		await this.ensureAround(this.startAt || 1);
		this.updateBar();
	};

	/**
	 * Đổi kiểu xem / số trang mỗi màn / mức phóng to.
	 * Dựng lại engine chứ không vá engine cũ: StPageFlip chốt số 1-hay-2-trang
	 * ngay lúc khởi tạo, sửa nóng là bể bố cục. Dựng lại rẻ vì file PDF đã nằm
	 * sẵn trong bộ nhớ — chỉ vẽ lại vài trang quanh chỗ đang đọc.
	 */
	Reader.prototype.rebuild = async function () {
		this.startAt = this.engine ? this.engine.current() : 1;
		this.stopAutoplay(true);
		if (this.engine) this.engine.destroy();
		await this.buildEngine();
	};

	Reader.prototype.onPageChange = function (page) {
		this.ensureAround(page);
		this.updateBar();
	};

	/**
	 * Vẽ trang đang xem + vài trang trước/sau. Số trang lấy từ cài đặt "Vẽ trước".
	 *
	 * CHỈ chờ những trang người đọc đang NHÌN THẤY; các trang lân cận vẫn được vẽ
	 * nhưng chạy ở nền, không giữ chân ai.
	 *
	 * Trước đây hàm này chờ hết cả chùm, mà buildEngine() lại await nó trước khi
	 * gỡ lớp "đang tải" — nên thời gian mở tài liệu bằng thời gian vẽ 5 trang chứ
	 * không phải 2. Với PDF nặng thì chênh nhau một trời một vực: đo trên một
	 * brochure 28 trang chứa 2040 ảnh rời, vẽ 5 trang mất 7,9 giây trong khi hai
	 * trang đầu chỉ mất 1,2 giây — người đọc ngồi nhìn thanh tiến trình thêm 6
	 * giây để chờ những trang mà họ còn chưa lật tới.
	 *
	 * Hạ "Vẽ trước" xuống 1 KHÔNG phải là cách sửa: mở thì nhanh thật nhưng lật
	 * sang trang là gặp trang trắng, chỉ dời cái chờ từ lúc mở sang lúc đọc.
	 * Tách "chờ" khỏi "vẽ" mới được cả hai.
	 *
	 * Xếp lân cận vào SAU khi trang đang xem vẽ xong, chứ không thả cùng lúc:
	 * PDF.js vẽ song song thì các lệnh tranh nhau CPU, trang đang xem cũng chậm
	 * theo. Cùng phép đo đó: 5 lệnh song song mất 0,43 / 1,08 / 2,25 / 3,82 /
	 * 7,93 giây — càng nhiều lệnh cùng chạy càng lâu.
	 *
	 * @param {number} page Trang đang xem.
	 * @return {Promise} Xong khi các trang ĐANG HIỂN THỊ đã vẽ xong.
	 */
	Reader.prototype.ensureAround = function (page) {
		// `|| 3` cũ coi số 0 là "chưa đặt" nên 0 không bao giờ có tác dụng. Bảng
		// cài đặt hiện kẹp tối thiểu là 1, nhưng CFG có thể tới từ chỗ khác.
		var n = typeof CFG.preload === 'number' && CFG.preload >= 0 ? CFG.preload : 3;
		var self = this;
		var here = [];
		var near = [];

		for (var p = page - n; p <= page + n + 1; p++) {
			if (p < 1 || p > this.total) continue;
			// Khổ đôi thì trang bên cạnh cũng đang hiển thị. Đoán dư một trang ở
			// vài chỗ (bìa đứng một mình) thì cùng lắm vẽ thừa một trang, không sai.
			if (p === page || (p === page + 1 && !this.isSingle())) here.push(p);
			else near.push(p);
		}

		var shown = Promise.all(here.map(function (i) { return self.renderPage(i); }));

		shown.then(function () {
			near.forEach(function (i) { self.renderPage(i); });
		});

		return shown;
	};

	/**
	 * Bỏ hết trang đã vẽ vì khổ hoặc bố cục vừa đổi.
	 *
	 * Phải HUỶ các lệnh vẽ đang dở chứ không chỉ mặc kệ chúng. PDF.js không cho
	 * hai lệnh render() chạy song song trên cùng một trang: lệnh thứ hai không
	 * báo lỗi mà nằm treo mãi mãi, và trang đó trắng vĩnh viễn. Đổi kiểu xem vài
	 * lần liên tiếp là dính ngay.
	 *
	 * Kèm theo là số "thế hệ": lệnh vẽ nào hoàn tất sau khi bố cục đã đổi thì tự
	 * biết kết quả của mình đã lỗi thời, không ghi đè lên trang mới nữa.
	 */
	Reader.prototype.invalidate = function () {
		this.gen++;
		this.rendered = {};
		this.pending = {};
		for (var k in this.tasks) {
			try { this.tasks[k].task.cancel(); } catch (e) { /* đã xong thì thôi */ }
		}
		this.tasks = {};
		// KHÔNG xoá this.chain: hàng đợi chính là thứ bắt lệnh vẽ mới phải đợi
		// lệnh vừa bị huỷ kết thúc hẳn.
	};

	/**
	 * Xếp hàng: mỗi trang chỉ có ĐÚNG MỘT lệnh vẽ chạy tại một thời điểm, lệnh
	 * sau nối đuôi lệnh trước.
	 *
	 * Bắt buộc phải vậy vì PDF.js không chịu được hai lệnh render() chồng nhau
	 * trên cùng một trang: lệnh thứ hai không lỗi, không xong, chỉ nằm treo và
	 * trang trắng vĩnh viễn. Huỷ lệnh cũ thôi chưa đủ — lệnh mới còn phải đợi
	 * lệnh cũ kết thúc hẳn rồi mới được bắt đầu.
	 */
	Reader.prototype.renderPage = function (num) {
		if (this.rendered[num]) return Promise.resolve();
		// Đã có lệnh cùng thế hệ đang xếp hàng thì dùng chung, khỏi xếp thêm
		if (this.pending[num] === this.gen) return this.chain[num];

		var self = this;
		var gen = this.gen;
		this.pending[num] = gen;

		var prev = this.chain[num] || Promise.resolve();
		this.chain[num] = prev.then(function () {
			return self.drawPage(num, gen);
		}).catch(function () { /* trang lỗi hoặc lệnh bị huỷ: bỏ qua */ });

		return this.chain[num];
	};

	Reader.prototype.drawPage = async function (num, gen) {
		if (gen !== this.gen || this.rendered[num]) return;
		try {
			var pan = this.panels[num - 1];
			if (!pan) return;
			var page = await this.pdf.getPage(pan.pdf);
			if (gen !== this.gen) return;
			var host = this.pageEls[num];
			if (!host) return;

			// Kích thước lấy từ pageSize(), KHÔNG đo DOM: StPageFlip di chuyển và
			// nhân bản phần tử trang, nên getBoundingClientRect() lúc này trả về
			// vài pixel -> canvas tí hon -> chữ mờ nhoè.
			var box = this.panelBox(page, pan, this.pageSize().w, Math.min(window.devicePixelRatio || 1, 2));

			var canvas = el('canvas', 'cpfb-canvas');
			canvas.width = box.w;
			canvas.height = box.h;
			var task = page.render({
				canvasContext: canvas.getContext('2d', { alpha: false }),
				viewport: box.vp,
				// Đẩy trang sang trái để đúng ô cần vẽ rơi vào khung canvas
				transform: [1, 0, 0, 1, box.dx, 0],
			});
			this.tasks[num] = { gen: gen, task: task };
			try {
				await task.promise;
			} finally {
				// Chỉ dọn dấu của CHÍNH mình, không xoá dấu lệnh đời sau vừa đặt
				if (this.tasks[num] && this.tasks[num].gen === gen) delete this.tasks[num];
			}
			if (gen !== this.gen) return;

			host.innerHTML = '';
			host.appendChild(canvas);
			this.rendered[num] = true;
		} catch (e) {
			/* Trang lỗi — hoặc chỉ là lệnh vẽ vừa bị huỷ vì đổi bố cục.
			   Cả hai trường hợp đều để nguyên ô số trang, không làm sập cả sách. */
		}
	};

	/* ---------------- thanh điều khiển ---------------- */

	/**
	 * Ô đếm trang, gõ số vào để nhảy thẳng tới trang đó.
	 *
	 * Dùng type="text" + inputmode="numeric" chứ KHÔNG dùng type="number":
	 * number kèm hai mũi tên tăng giảm chiếm chỗ và bấm nhầm liên tục trên một
	 * thanh nút chỉ cao 34px, lại còn nuốt phím mũi tên trái/phải của bàn phím.
	 */
	Reader.prototype.buildCounter = function () {
		var wrap = el('span', 'cpfb-counter');

		var input = el('input', 'cpfb-counter__in');
		input.type = 'text';
		input.inputMode = 'numeric';
		input.autocomplete = 'off';
		input.value = '1';
		input.setAttribute('aria-label', CFG.i18n.gotoPage || CFG.i18n.page || 'Trang');

		var total = el('span', 'cpfb-counter__t');

		var apply = () => {
			var n = parseInt(input.value, 10);
			if (isNaN(n)) { this.updateBar(); return; }
			this.goto(n);
			// goto() đã kẹp vào khoảng hợp lệ; in lại con số THẬT sự tới được
			this.updateBar();
		};

		input.addEventListener('focus', function () { input.select(); });
		input.addEventListener('blur', apply);
		input.addEventListener('keydown', (e) => {
			// Chặn để phím mũi tên không vừa sửa số vừa lật trang
			e.stopPropagation();
			if (e.key === 'Enter') { e.preventDefault(); apply(); input.blur(); }
			if (e.key === 'Escape') { this.updateBar(); input.blur(); }
		});

		wrap.appendChild(input);
		wrap.appendChild(total);

		this.counter = wrap;
		this.pageIn = input;
		this.pageTotal = total;
		return wrap;
	};

	/**
	 * Hai mũi tên lớn ở mép trái/phải khung đọc.
	 *
	 * Thanh nút dưới đáy đã có nút lùi–tới, nhưng nó nằm xa chỗ mắt đang đọc và
	 * bé bằng đúng mấy nút khác. Mũi tên ở mép là chỗ tay tự tìm tới, và là quy
	 * ước chung của mọi trình đọc dạng sách lật.
	 */
	Reader.prototype.buildEdgeNav = function () {
		var mk = (cls, iconName, label, fn) => {
			var b = el('button', 'cpfb-edge ' + cls);
			b.type = 'button';
			b.innerHTML = window.CPFB_UI.icon(iconName, 34);
			b.setAttribute('aria-label', label);
			b.title = label;
			b.addEventListener('click', fn);
			return b;
		};
		this.edgePrev = mk('cpfb-edge--prev', 'prev', CFG.i18n.prev, () => this.nav('prev'));
		this.edgeNext = mk('cpfb-edge--next', 'next', CFG.i18n.next, () => this.nav('next'));
		this.root.appendChild(this.edgePrev);
		this.root.appendChild(this.edgeNext);
	};

	Reader.prototype.mkBtn = function (cls, iconName, label, fn) {
		var b = el('button', 'cpfb-btn ' + cls);
		b.type = 'button';
		b.innerHTML = window.CPFB_UI.icon(iconName);
		b.setAttribute('aria-label', label);
		b.title = label;
		b.addEventListener('click', fn);
		return b;
	};

	Reader.prototype.buildControls = function () {
		var UI = window.CPFB_UI;
		var bar = el('div', 'cpfb-bar');
		var mk = this.mkBtn.bind(this);

		// Mục lục — chỉ hiện nút khi file PDF thật sự có mục lục
		if (this.btn.toc && (this.manualToc || (this.outline && this.outline.length))) {
			bar.appendChild(mk('cpfb-toc', 'toc', CFG.i18n.toc, () => this.togglePanel('toc')));
		}
		// Thumbnail các trang
		if (this.btn.thumbs) {
			bar.appendChild(mk('cpfb-thumbs', 'grid', CFG.i18n.thumbs, () => this.togglePanel('thumbs')));
		}

		bar.appendChild(el('span', 'cpfb-sep'));
		this.prevBtn = mk('cpfb-prev', 'prev', CFG.i18n.prev, () => this.nav('prev'));
		bar.appendChild(this.prevBtn);
		bar.appendChild(this.buildCounter());
		this.nextBtn = mk('cpfb-next', 'next', CFG.i18n.next, () => this.nav('next'));
		bar.appendChild(this.nextBtn);
		bar.appendChild(el('span', 'cpfb-sep'));

		// Phóng to / thu nhỏ
		if (this.btn.zoom) {
			this.zoomOutBtn = mk('cpfb-zoomout', 'zoomOut', CFG.i18n.zoomOut, () => this.stepZoom(-1));
			this.zoomInBtn = mk('cpfb-zoomin', 'zoomIn', CFG.i18n.zoomIn, () => this.stepZoom(1));
			bar.appendChild(this.zoomOutBtn);
			bar.appendChild(this.zoomInBtn);
		}

		// Tự lật
		if (this.btn.autoplay) {
			this.playBtn = mk('cpfb-play', 'play', CFG.i18n.autoplay, () => this.toggleAutoplay());
			bar.appendChild(this.playBtn);
		}

		if (this.btn.sound) {
			this.soundBtn = mk('cpfb-sound', 'sound', CFG.i18n.soundOff, () => {
				UI.sound.on = !UI.sound.on;
				this.soundBtn.innerHTML = UI.icon(UI.sound.on ? 'sound' : 'mute');
				this.soundBtn.title = UI.sound.on ? CFG.i18n.soundOff : CFG.i18n.soundOn;
			});
			bar.appendChild(this.soundBtn);
		}

		if (this.btn.share) {
			bar.appendChild(mk('cpfb-share', 'share', CFG.i18n.share, () => this.share()));
		}

		/* Nút toàn màn hình LUÔN được tạo, kể cả khi quản trị tắt nó.
		   Lý do: tắt nút + mở thẳng toàn màn hình = người xem không còn lối ra
		   nào ngoài phím Esc. Esc là cơ chế của trình duyệt nên gần như chắc chắn
		   chạy, nhưng "gần như" là chưa đủ khi cái giá là người dùng bị kẹt.
		   Nên: tắt thì ẩn, hễ vào toàn màn hình là hiện lại. */
		this.fsBtn = mk('cpfb-full', 'full', CFG.i18n.fullscreen, () => this.toggleFullscreen());
		if (!this.btn.fs && !this.isModal) this.fsBtn.classList.add('cpfb-btn--off');
		if (!this.isModal) bar.appendChild(this.fsBtn);

		if (this.btn.dl && this.url) {
			var a = el('a', 'cpfb-btn cpfb-dl');
			a.href = this.url;
			a.target = '_blank';
			a.rel = 'noopener';
			a.innerHTML = UI.icon('download');
			a.setAttribute('aria-label', CFG.i18n.download);
			a.title = CFG.i18n.download;
			bar.appendChild(a);
		}

		this.root.appendChild(bar);
		this.barEl = bar;
		this.syncBarSpace();
		this.buildEdgeNav();

		/* Cửa sổ phủ cũng cần nút đóng y như cửa sổ nổi mở từ link PDF — trừ khi
		   nó đang đứng ở chính trang của tài liệu, lúc đó đóng ra cũng chẳng về
		   đâu. Phím Esc vẫn ra được, cứ để đó làm lối thoát cho ai lỡ kẹt. */
		if (this.isModal || (this.isLightbox && this.canClose)) {
			this.closeBtn = this.closeButton();
			this.root.appendChild(this.closeBtn);
		}

		this.updateZoomBtns();
		/* Toàn màn hình có thể đã bật TRƯỚC khi thanh công cụ ra đời (tài liệu đặt
		   "mở toàn màn hình" bung ngay từ nhịp đầu). Đồng bộ lại để nút hiện đúng
		   biểu tượng thoát — nếu không, quản trị tắt nút toàn màn hình là người
		   xem không còn lối ra nào ngoài phím Esc. */
		this.syncFsBtn();

		// Bấm ĐÚP để bung toàn màn hình — bấm một lần đã dùng để lật trang
		if (CFG.fsOnClick && !this.isModal) {
			this.viewport.addEventListener('dblclick', () => this.toggleFullscreen());
		}

		this.keyHandler = (e) => {
			if (!this.engine) return;
			// Đang gõ số trang thì mọi phím là của ô đó
			if (e.target === this.pageIn) return;
			// Chỉ nhận phím khi con trỏ đang ở trình đọc này, hoặc nó đang chiếm màn hình
			if (!this.fsLike() && !this.root.contains(document.activeElement) && !this.hover) return;
			if (e.key === 'ArrowLeft') this.nav('prev');
			if (e.key === 'ArrowRight') this.nav('next');
			if (e.key === 'Escape') {
				if (this.panel && !this.panel.hidden) this.closePanel();
				else if (this.isModal) this.close();
				/* Đang toàn màn hình thật thì Esc là của TRÌNH DUYỆT — nó thoát
				   toàn màn hình, và fullscreenchange bên dưới đưa về cửa sổ phủ.
				   Giành lấy phím ở đây là đóng luôn tài liệu, mất một bước. */
				else if (this.isLightbox) { if (!this.nativeFs) this.closeLightbox(); }
				else if (this.inFs) this.exitFullscreen();
			}
		};
		document.addEventListener('keydown', this.keyHandler);

		this.root.addEventListener('mouseenter', () => { this.hover = true; });
		this.root.addEventListener('mouseleave', () => { this.hover = false; });

		// Đổi khổ màn hình (kể cả khi vào/ra toàn màn hình) -> tính lại kích thước
		var t;
		this.relayout = () => {
			clearTimeout(t);
			// Đo lại NGAY, không đợi 250ms: thanh nút gấp thêm/bớt một hàng là
			// chỗ dành cho sách đổi liền, để chậm thì thấy sách nhảy hai lần.
			this.syncBarSpace();
			t = setTimeout(() => {
				if (!this.engine) return;
				var wasSingle = this.engineSingle;
				this.engineSingle = this.isSingle();
				// 'auto' đổi giữa 1 và 2 trang khi xoay máy -> phải dựng lại engine
				if (wasSingle !== undefined && wasSingle !== this.engineSingle) {
					this.rebuild();
					return;
				}
				this.engine.layout();
				// Khổ đổi -> canvas cũ bị kéo giãn, vẽ lại quanh trang đang xem cho nét
				this.invalidate();
				this.ensureAround(this.engine.current());
			}, 250);
		};
		this.engineSingle = this.isSingle();
		window.addEventListener('resize', this.relayout);

		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement && this.nativeFs) {
				this.nativeFs = false;
				this.syncFsBtn();
				/* Cửa sổ phủ phải Ở LẠI. Thoát toàn màn hình thật (bấm Esc, hoặc
				   bấm lại nút) chỉ là trả thanh địa chỉ về, KHÔNG phải là đóng tài
				   liệu — gỡ lớp phủ ở đây thì người đang đọc bỗng thấy header và
				   footer hiện ra giữa chừng. Chỉ khung nhúng bình thường mới thu
				   về, vì với nó cửa sổ phủ và toàn màn hình là cùng một việc. */
				if (!this.isLightbox && !this.isModal && this.inFs) {
					this.exitFullscreen();
					return;
				}
			}
			this.relayout();
		});
	};

	/**
	 * Chừa đúng chỗ cho thanh nút, đo chứ không đoán.
	 *
	 * Thanh nút cao bao nhiêu thì tuỳ: quản trị tắt bớt nút, và trên điện thoại
	 * nó gấp xuống hai hàng. Ghi con số ĐO ĐƯỢC vào biến CSS rồi để padding-bottom
	 * tự tính theo, thay vì cắm cứng một con số trong CSS — cắm cứng thì hoặc
	 * thanh nút đè lên trang sách, hoặc chừa thừa cả một mảng trống trên màn hình
	 * điện thoại vốn đã chật.
	 */
	Reader.prototype.syncBarSpace = function () {
		if (!this.barEl) return;
		var h = this.barEl.offsetHeight;
		if (h) this.root.style.setProperty('--cpfb-bar-h', h + 'px');
	};

	Reader.prototype.closeButton = function () {
		var b = el('button', 'cpfb-close');
		b.type = 'button';
		b.innerHTML = window.CPFB_UI.icon('close', 20);
		b.title = CFG.i18n.close;
		b.setAttribute('aria-label', CFG.i18n.close);
		b.addEventListener('click', () => {
			if (this.isModal) this.close();
			else this.closeLightbox();
		});
		return b;
	};

	/* ---------------- phóng to ---------------- */

	Reader.prototype.stepZoom = function (dir) {
		var self = this;
		/* Nối đuôi: bấm hai lần liền thì bước sau phải đo trên kết quả của bước
		   trước, không phải trên engine đang bị dỡ dở. */
		this.zoomChain = (this.zoomChain || Promise.resolve()).then(function () {
			return self.applyZoom(dir);
		}).catch(function () {
			/* Một bước hỏng (thư viện ném lỗi lúc dựng lại) thì nuốt đi, để bước
			   sau vẫn nối vào được — không thì chuỗi kẹt ở trạng thái lỗi và nút
			   phóng to chết hẳn cho tới khi tải lại trang. */
		});
		return this.zoomChain;
	};

	Reader.prototype.applyZoom = function (dir) {
		var i = ZOOM.indexOf(this.zoom);
		if (i === -1) i = 0;
		i = Math.max(0, Math.min(ZOOM.length - 1, i + dir));
		return this.setZoom(ZOOM[i]);
	};

	/**
	 * Về 1x. Lật trang khi đang phóng to là lật trong một khung đã cuộn lệch
	 * đi đâu đó và tờ giấy quay ra ngoài vùng nhìn thấy — nên mọi lệnh lật
	 * (nút, mép, bàn phím, ô số trang, mục lục, tự lật) đi qua nav() và gọi
	 * hàm này trước. Nối vào cùng chuỗi với stepZoom() để không chen ngang một
	 * bước phóng to đang dựng dở.
	 */
	Reader.prototype.resetZoom = function () {
		var self = this;
		this.zoomChain = (this.zoomChain || Promise.resolve()).then(function () {
			return self.setZoom(1);
		}).catch(function () { /* như stepZoom: một bước hỏng không được kẹt chuỗi */ });
		return this.zoomChain;
	};

	Reader.prototype.setZoom = async function (level) {
		if (level === this.zoom) return;

		/* Điểm đang nằm giữa khung, tính theo tỉ lệ trên quyển sách — đo TRƯỚC
		   khi dựng lại. Phóng to xong cuộn về đúng điểm đó, nên chỗ đang đọc
		   vẫn ở giữa màn thay vì khung nhảy về góc trên-trái. Từ 1x (chưa cuộn)
		   thì tỉ lệ là 0.5/0.5, tức là canh giữa. */
		var focus = this.zoomFocus();

		this.zoom = level;
		this.root.classList.toggle('cpfb-zoomed', this.zoom > 1);
		this.updateZoomBtns();
		await this.rebuild();
		this.scrollToFocus(focus);
	};

	/**
	 * Mọi lệnh lật trang đi qua đây.
	 * @param {'prev'|'next'|number} action Lùi, tới, hoặc số trang.
	 */
	Reader.prototype.nav = function (action) {
		var self = this;
		var run = function () {
			if (!self.engine) return;
			if (action === 'prev') self.engine.prev();
			else if (action === 'next') self.engine.next();
			else {
				var p = Math.max(1, Math.min(self.total, action));
				self.engine.goto(p);
				self.ensureAround(p);
				self.updateBar();
			}
		};
		// Đang phóng to thì về 1x trước; engine được dựng lại nên phải đợi xong
		if (this.zoom > 1) this.resetZoom().then(run);
		else run();
	};

	/**
	 * Điểm giữa khung nhìn, tính theo tỉ lệ (0..1) trên khung sách.
	 * Dùng offsetLeft/offsetWidth (toạ độ bố cục) chứ không getBoundingClientRect:
	 * khung sách có transform trượt khi bìa đứng một mình (syncCenter), mà
	 * transform không đổi vùng cuộn, nên phải đo theo bố cục mới khớp với
	 * scrollLeft.
	 */
	Reader.prototype.zoomFocus = function () {
		var vp = this.viewport;
		var host = vp ? vp.firstElementChild : null;
		if (!host || host.offsetWidth < 1 || host.offsetHeight < 1) return { x: 0.5, y: 0.5 };
		return {
			x: (vp.scrollLeft + vp.clientWidth / 2 - host.offsetLeft) / host.offsetWidth,
			y: (vp.scrollTop + vp.clientHeight / 2 - host.offsetTop) / host.offsetHeight,
		};
	};

	Reader.prototype.scrollToFocus = function (focus) {
		var vp = this.viewport;
		var host = vp ? vp.firstElementChild : null;
		if (!host) return;
		// Trình duyệt tự kẹp về [0, scrollWidth - clientWidth]; sách vừa khung thì ra 0
		vp.scrollLeft = Math.round(host.offsetLeft + focus.x * host.offsetWidth - vp.clientWidth / 2);
		vp.scrollTop = Math.round(host.offsetTop + focus.y * host.offsetHeight - vp.clientHeight / 2);
	};

	/**
	 * Kéo chuột để cuộn khung khi đã phóng to.
	 *
	 * Chỉ chuột: ngón tay thì trình duyệt tự cuộn được vùng overflow:auto, và
	 * hai engine đã nhường (StPageFlip bị gỡ handler, SlideEngine bỏ qua vuốt).
	 * Nghe pointerup trên window chứ không chỉ trên khung, vì thả chuột ngoài
	 * khung là chuyện thường khi kéo mạnh tay.
	 */
	Reader.prototype.bindPan = function () {
		var self = this;
		var vp = this.viewport;
		var drag = null;

		vp.addEventListener('pointerdown', function (e) {
			if (self.zoom <= 1 || e.pointerType !== 'mouse' || e.button !== 0) return;
			if (e.target.closest('.cpfb-bar, button, a, input, select, textarea')) return;
			drag = { id: e.pointerId, x: e.clientX, y: e.clientY, left: vp.scrollLeft, top: vp.scrollTop };
			try { vp.setPointerCapture(e.pointerId); } catch (err) { /* không bắt được thì vẫn kéo được trong khung */ }
			self.root.classList.add('cpfb-panning');
			// Chặn chuỗi mousedown/mousemove giả theo sau, để không có gì bên dưới hiểu nhầm thành kéo trang
			e.preventDefault();
		});

		vp.addEventListener('pointermove', function (e) {
			if (!drag || e.pointerId !== drag.id) return;
			vp.scrollLeft = drag.left - (e.clientX - drag.x);
			vp.scrollTop = drag.top - (e.clientY - drag.y);
		});

		var end = function (e) {
			if (!drag || (e && e.pointerId !== undefined && e.pointerId !== drag.id)) return;
			drag = null;
			self.root.classList.remove('cpfb-panning');
		};
		vp.addEventListener('pointerup', end);
		vp.addEventListener('pointercancel', end);
		window.addEventListener('pointerup', end);
		window.addEventListener('pointercancel', end);
	};

	Reader.prototype.updateZoomBtns = function () {
		if (!this.zoomInBtn) return;
		this.zoomInBtn.disabled = this.zoom >= ZOOM[ZOOM.length - 1];
		this.zoomOutBtn.disabled = this.zoom <= ZOOM[0];
	};

	/* ---------------- tự lật ---------------- */

	Reader.prototype.toggleAutoplay = function () {
		if (this.autoplayTimer) this.stopAutoplay();
		else this.startAutoplay();
	};

	Reader.prototype.startAutoplay = function () {
		var self = this;
		var ms = Math.max(2, CFG.autoplayDelay) * 1000;
		this.autoplayTimer = setInterval(function () {
			if (!self.engine) return;
			// Hết sách thì quay lại đầu, để màn hình trưng bày chạy vòng mãi
			if (self.engine.current() >= self.total) self.nav(1);
			else self.nav('next');
		}, ms);
		if (this.playBtn) {
			this.playBtn.innerHTML = window.CPFB_UI.icon('pause');
			this.playBtn.title = CFG.i18n.autoplayStop;
			this.playBtn.classList.add('cpfb-btn--on');
		}
	};

	Reader.prototype.stopAutoplay = function () {
		clearInterval(this.autoplayTimer);
		this.autoplayTimer = null;
		if (this.playBtn) {
			this.playBtn.innerHTML = window.CPFB_UI.icon('play');
			this.playBtn.title = CFG.i18n.autoplay;
			this.playBtn.classList.remove('cpfb-btn--on');
		}
	};

	/* ---------------- chia sẻ ---------------- */

	Reader.prototype.linkToShare = function () {
		return this.shareUrl || (this.isModal ? this.url : window.location.href);
	};

	/* Bảng của mình mở TRƯỚC, kể cả trên điện thoại có bảng hệ thống.
	   Bảng hệ thống liệt kê ứng dụng đang cài trên máy đó — máy không cài
	   Pinterest thì không bao giờ thấy Pinterest, và chủ site không có cách nào
	   biết vì sao lượt ghim bằng không. Danh sách ở đây thì trang nào máy nào
	   cũng như nhau. Bảng hệ thống vẫn còn, nằm ở nút cuối bảng, cho ai muốn
	   gửi qua Zalo/Messenger hay ứng dụng riêng của họ. */
	Reader.prototype.share = function () {
		this.togglePanel('share');
	};

	Reader.prototype.nativeShare = function () {
		if (!navigator.share) return;
		navigator.share({ title: document.title, url: this.linkToShare() }).catch(() => {});
	};

	Reader.prototype.copyLink = function (btn) {
		var url = this.linkToShare();
		/* Báo "xong" bằng dấu tích xanh chứ không đổi chữ trong nút: nút này chỉ
		   rộng bằng cái icon, nhét chữ "Đã chép!" vào là cả hàng nhảy ngang. */
		var done = () => {
			if (!btn) return;
			if (btn.dataset.busy) return;
			btn.dataset.busy = '1';
			var back = btn.innerHTML;
			btn.innerHTML = window.CPFB_UI.icon('check', 17);
			btn.classList.add('cpfb-share__copy--ok');
			btn.title = CFG.i18n.copied;
			setTimeout(function () {
				btn.innerHTML = back;
				btn.classList.remove('cpfb-share__copy--ok');
				btn.title = CFG.i18n.copyLink;
				delete btn.dataset.busy;
			}, 1600);
		};
		// Trình duyệt cũ / trang không chạy HTTPS: clipboard API không tồn tại
		var legacy = function () {
			var ta = el('textarea');
			ta.value = url;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			var ok = false;
			try { ok = document.execCommand('copy'); } catch (e) { /* chịu */ }
			ta.remove();
			if (ok) done();
		};

		/* clipboard API từ chối cả ở https khi cửa sổ mất tiêu điểm hoặc người
		   dùng đã chặn quyền. Nuốt lỗi thì bấm xong nút không nhúc nhích, mà
		   người ta lại tưởng đã chép được -> lùi về đường cũ thay vì im lặng. */
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url).then(done).catch(legacy);
			return;
		}
		legacy();
	};

	/* ---------------- toàn màn hình ---------------- */

	/**
	 * Nút toàn màn hình.
	 *
	 * Có một trạng thái ở giữa mà lần trước bỏ sót: tài liệu đặt "toàn màn hình
	 * ngay khi mở" thì lúc trang vừa tải, lớp phủ CSS đã che kín header/footer —
	 * NHƯNG toàn màn hình THẬT của trình duyệt thì bị chặn, vì lúc đó người dùng
	 * chưa thao tác gì. Người xem nhìn thấy một trình đọc chiếm hết màn hình và
	 * một nút toàn màn hình, bấm vào để "phóng to nốt" — mà mã cũ lại hiểu là
	 * "thoát", gỡ luôn lớp phủ và phơi header/footer ra.
	 *
	 * Cú bấm này CHÍNH LÀ thao tác mà trình duyệt đang đợi, nên dùng nó để xin
	 * toàn màn hình thật. Chỉ xin ĐÚNG MỘT LẦN: trình duyệt nào không cho (Safari
	 * trên iPhone không cho phần tử thường bung toàn màn hình) thì cú bấm sau
	 * quay về nghĩa "thoát", không để người xem kẹt trong lớp phủ.
	 */
	/** Xin toàn màn hình THẬT của trình duyệt. Chỉ gọi được từ trong một thao tác. */
	Reader.prototype.requestNative = function () {
		if (this.nativeFs || !this.root.requestFullscreen) return;
		this.triedNative = true;
		var req;
		try { req = this.root.requestFullscreen(); } catch (e) { req = null; }
		if (req && req.then) {
			req.then(() => { this.nativeFs = true; this.syncFsBtn(); })
			   .catch(() => { this.syncFsBtn(); });
		}
		this.syncFsBtn();
	};

	/** Ra khỏi toàn màn hình thật. KHÔNG đụng tới cửa sổ phủ. */
	Reader.prototype.exitNative = function () {
		if (document.fullscreenElement === this.root && document.exitFullscreen) {
			document.exitFullscreen().catch(() => {});
		}
		this.nativeFs = false;
		this.syncFsBtn();
	};

	/**
	 * Nút toàn màn hình.
	 *
	 * CỬA SỔ PHỦ và TOÀN MÀN HÌNH THẬT là hai việc khác nhau, trước đây bị gộp
	 * làm một nên mới sinh lỗi:
	 *
	 *   cửa sổ phủ  — lớp CSS phủ kín trang, che header/footer. Chạy được ở mọi
	 *                 nơi, mở lúc nào cũng được, kể cả khi trang vừa tải.
	 *   toàn màn hình thật — F11 của trình duyệt, giấu nốt thanh địa chỉ. Bắt
	 *                 buộc phải có thao tác của người dùng mới xin được.
	 *
	 * Ở chế độ "toàn màn hình ngay khi mở", trình đọc VỐN ĐÃ là một cửa sổ phủ.
	 * Nút này khi đó chỉ bật/tắt toàn màn hình thật; nó không được phép gỡ cửa sổ
	 * phủ, vì gỡ là phơi header/footer ra giữa lúc người ta đang đọc. Muốn ra hẳn
	 * thì bấm nút đóng ở góc.
	 */
	Reader.prototype.toggleFullscreen = function () {
		if (this.isLightbox || this.isModal) {
			if (this.nativeFs) this.exitNative();
			else this.requestNative();
			return;
		}
		/* Nhúng bình thường: nút này mở/đóng cả cửa sổ phủ lẫn toàn màn hình thật,
		   vì ở đây hai thứ đó cùng phục vụ một việc — phóng to tài liệu lên. */
		if (this.inFs) this.exitFullscreen();
		else this.enterFullscreen(true);
	};

	/** Đóng cửa sổ phủ, trả trình đọc về đúng chỗ của nó trong trang. */
	Reader.prototype.closeLightbox = function () {
		this.isLightbox = false;
		this.exitFullscreen();
	};

	/**
	 * Toàn màn hình = lớp phủ CSS (position:fixed) + toàn màn hình thật của
	 * trình duyệt nếu xin được.
	 *
	 * Vì sao không chỉ dùng requestFullscreen():
	 *   - Safari trên iPhone KHÔNG cho phần tử thường bung toàn màn hình (chỉ
	 *     video), nên cả một dòng máy sẽ không dùng được tính năng này.
	 *   - Trình duyệt chặn tự bung khi người dùng chưa thao tác gì.
	 * Lớp phủ CSS thì ở đâu cũng chạy và cũng che kín header/footer của theme.
	 *
	 * Trình đọc được CHUYỂN ra thẳng <body>: nếu để nguyên chỗ cũ, chỉ cần một
	 * thẻ cha bất kỳ có transform/filter/contain là position:fixed bị nhốt lại
	 * trong thẻ đó — theme nào cũng có thể vô tình làm vậy.
	 */
	/**
	 * @param {boolean} gesture Có phải do người dùng vừa bấm không.
	 *   Quan trọng: lúc tự mở theo cài đặt của tài liệu thì KHÔNG có thao tác
	 *   nào, trình duyệt chắc chắn từ chối toàn màn hình thật. Đánh dấu "đã thử"
	 *   cho lần đó là nút toàn màn hình mất luôn cơ hội xin lại tử tế.
	 */
	Reader.prototype.enterFullscreen = function (gesture) {
		if (this.inFs) return;
		this.inFs = true;
		this.holdBackground();

		if (!this.isModal) {
			this.anchor = document.createComment('cpfb');
			this.root.parentNode.insertBefore(this.anchor, this.root);
			document.body.appendChild(this.root);
		}

		this.root.classList.add('cpfb-fs');
		/* Gỡ lớp phủ "tĩnh" do PHP in sẵn: từ đây trạng thái toàn màn hình do JS
		   nắm. Giữ lại thì bấm thoát cũng không ra được — CSS vẫn ghim cứng. Hai
		   thao tác nằm chung một nhịp nên không có khung hình nào bị nhấp nháy. */
		this.root.classList.remove('cpfb-open--fullscreen');
		document.documentElement.classList.add('cpfb-fs-lock');

		var req = this.root.requestFullscreen && this.root.requestFullscreen();
		this.nativeFs = false;
		if (gesture) this.triedNative = true;
		if (req && req.then) {
			req.then(() => { this.nativeFs = true; this.syncFsBtn(); })
			   .catch(() => { this.syncFsBtn(); });
		}

		this.syncFsBtn();
		this.afterFsChange();
	};

	Reader.prototype.exitFullscreen = function () {
		if (!this.inFs) return;
		this.inFs = false;
		this.releaseBackground();

		if (document.fullscreenElement === this.root && document.exitFullscreen) {
			document.exitFullscreen().catch(() => {});
		}
		this.nativeFs = false;

		this.root.classList.remove('cpfb-fs');
		document.documentElement.classList.remove('cpfb-fs-lock');
		this.triedNative = false;

		if (this.anchor && this.anchor.parentNode) {
			this.anchor.parentNode.insertBefore(this.root, this.anchor);
			this.anchor.remove();
			this.anchor = null;
		}

		this.syncFsBtn();
		this.afterFsChange();
	};

	Reader.prototype.syncFsBtn = function () {
		if (!this.fsBtn) return;
		/* Đang phủ CSS mà chưa xin được toàn màn hình thật -> cú bấm tới sẽ PHÓNG
		   TO nốt chứ không phải thoát, nên giữ nguyên biểu tượng phóng to. Nhãn
		   phải nói đúng việc nút sẽ làm, nếu không người xem bấm nhầm rồi văng ra
		   giữa trang. */
		/* Trong cửa sổ phủ, nút này chỉ nói về TOÀN MÀN HÌNH THẬT — vào hay ra
		   khỏi nó, chứ không phải vào hay ra khỏi cửa sổ phủ. */
		var willExit = this.isLightbox || this.isModal
			? this.nativeFs
			: this.inFs && (this.nativeFs || this.triedNative);
		this.fsBtn.innerHTML = window.CPFB_UI.icon(willExit ? 'exit' : 'full');
		this.fsBtn.title = willExit ? CFG.i18n.exitFullscreen
			: (this.inFs ? CFG.i18n.openFullscreen : CFG.i18n.fullscreen);
		// Đang toàn màn hình thì luôn phải thấy nút thoát, dù quản trị đã tắt nút
		this.fsBtn.classList.toggle('cpfb-btn--off', !this.inFs && !this.btn.fs);
		// Nút đóng chỉ có nghĩa khi cửa sổ phủ đang bật
		if (this.closeBtn && !this.isModal) this.closeBtn.hidden = !(this.isLightbox && this.inFs);
	};

	/** Khổ đổi hẳn -> tính lại ngay, không đợi 250ms như lúc kéo cửa sổ. */
	Reader.prototype.afterFsChange = function () {
		var self = this;
		this.syncBarSpace();
		setTimeout(function () {
			self.syncBarSpace();
			if (!self.engine) return;
			var single = self.isSingle();
			if (single !== self.engineSingle) {
				self.engineSingle = single;
				self.rebuild();
				return;
			}
			self.engine.layout();
			self.invalidate();
			self.ensureAround(self.engine.current());
		}, 60);
	};

	/**
	 * Trạng thái khi mở, đặt riêng cho từng tài liệu trong meta box.
	 *
	 *   normal     — nhúng bình thường
	 *   wide       — kéo rộng hết chiều ngang màn hình (chỉ CSS, luôn chạy được)
	 *   fullscreen — bung toàn màn hình. Lớp phủ CSS chạy được ngay; riêng phần
	 *                toàn màn hình THẬT của trình duyệt thì bị chặn khi người
	 *                dùng chưa thao tác gì — nhưng lớp phủ đã đủ nên không còn
	 *                phải hiện nút mời bấm như trước.
	 */
	/**
	 * Tạm dừng video/âm thanh CỦA TRANG khi trình đọc che kín màn hình.
	 *
	 * Hai lý do:
	 *   1. Nghe được mà không thấy: một video nền có tiếng, hay một trình phát
	 *      nhạc, vẫn kêu sau lưng lớp phủ — người đọc không biết tìm đâu để tắt.
	 *   2. Tranh máy: trang vẫn giải mã video và vẽ lại từng khung hình dù chẳng
	 *      ai nhìn thấy, giành CPU với việc vẽ trang PDF. Đo trên một trang có
	 *      chữ nền là video chạy trong nét chữ: tắt hiệu ứng nền đi thì thời gian
	 *      mở tài liệu giảm 2,5 giây.
	 *
	 * Chỉ đụng vào thứ ĐANG chạy và ghi lại đúng danh sách đó, để lúc đóng trả
	 * về nguyên trạng — không tự tiện bật những video vốn đã dừng sẵn.
	 *
	 * KHÔNG dừng animation CSS của trang: nhìn thì cũng lợi, nhưng lắm giao diện
	 * treo logic vào sự kiện animationend, dừng giữa chừng là kẹt trạng thái.
	 * Không đáng đổi.
	 */
	Reader.prototype.holdBackground = function () {
		if (this.heldMedia) return;
		this.heldMedia = [];
		var self = this;
		try {
			[].forEach.call(document.querySelectorAll('video, audio'), function (m) {
				if (m.paused || self.root.contains(m)) return;
				self.heldMedia.push(m);
				m.pause();
			});
		} catch (e) { /* trình duyệt cũ: bỏ qua, không đáng làm sập trình đọc */ }
	};

	/** Trả lại đúng những video/âm thanh mà holdBackground() đã dừng. */
	Reader.prototype.releaseBackground = function () {
		if (!this.heldMedia) return;
		this.heldMedia.forEach(function (m) {
			// Phần tử có thể đã bị gỡ khỏi trang trong lúc người ta đang đọc
			if (m.isConnected === false) return;
			var r = m.play();
			if (r && r.catch) r.catch(function () { /* trình duyệt chặn thì thôi */ });
		});
		this.heldMedia = null;
	};

	Reader.prototype.applyOpenMode = function () {
		if (this.isModal) return;

		if (this.openMode === 'wide') {
			this.root.classList.add('cpfb-wide');
			this.afterFsChange();
			return;
		}

		/* Cố tình KHÔNG kiểm tra this.btn.fs ở đây.
		   "Mở toàn màn hình" và "hiện nút toàn màn hình" là hai chuyện khác nhau:
		   quản trị có thể muốn mở thẳng toàn màn hình mà giấu nút đi. */
		if (this.openMode === 'fullscreen') {
			/* Đây là CỬA SỔ PHỦ (lightbox), không phải "đang tạm phóng to".
			   Khác nhau ở chỗ ra: cửa sổ phủ chỉ đóng bằng nút đóng, còn thoát
			   toàn màn hình thật của trình duyệt thì quay về cửa sổ phủ chứ không
			   phơi trang ra. Xem toggleFullscreen(). */
			this.isLightbox = true;
			this.enterFullscreen();
		}
	};

	/* ---------------- đóng (chỉ dùng cho cửa sổ nổi) ---------------- */

	Reader.prototype.close = function () {
		this.stopAutoplay();
		this.releaseBackground();
		if (this.engine) this.engine.destroy();
		if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
		if (this.relayout) window.removeEventListener('resize', this.relayout);
		document.documentElement.classList.remove('cpfb-fs-lock');
		if (document.fullscreenElement === this.root && document.exitFullscreen) {
			document.exitFullscreen().catch(() => {});
		}
		this.root.remove();
		if (this.pdf && this.pdf.destroy) this.pdf.destroy().catch(() => {});
		if (this.onClose) this.onClose();
	};

	/* ================= Bảng bên: Mục lục, Thumbnail, Kiểu xem, Chia sẻ ========= */

	Reader.prototype.togglePanel = function (kind) {
		if (this.panelKind === kind && this.panel && !this.panel.hidden) {
			this.closePanel();
			return;
		}
		this.openPanel(kind);
	};

	Reader.prototype.closePanel = function () {
		if (this.panel) this.panel.hidden = true;
		this.panelKind = null;
	};

	Reader.prototype.openPanel = function (kind) {
		var UI = window.CPFB_UI;
		if (!this.panel) {
			this.panel = el('div', 'cpfb-panel');
			this.root.appendChild(this.panel);
		}
		this.panel.hidden = false;
		this.panelKind = kind;
		this.panel.innerHTML = '';
		this.panel.classList.toggle('cpfb-panel--sm', kind === 'share');

		var head = el('div', 'cpfb-panel__head');
		var title = el('strong');
		title.textContent = {
			toc: CFG.i18n.toc,
			thumbs: CFG.i18n.thumbs,
			share: CFG.i18n.share,
		}[kind] || '';
		var x = el('button', 'cpfb-panel__x');
		x.type = 'button';
		x.innerHTML = UI.icon('close', 17);
		x.setAttribute('aria-label', CFG.i18n.close);
		x.addEventListener('click', () => this.closePanel());
		head.appendChild(title);
		head.appendChild(x);
		this.panel.appendChild(head);

		var body = el('div', 'cpfb-panel__body');
		this.panel.appendChild(body);

		if (kind === 'toc') this.fillToc(body);
		else if (kind === 'thumbs') this.fillThumbs(body);
		else if (kind === 'share') this.fillShare(body);
	};

	/** Nhảy tới trang. */
	Reader.prototype.goto = function (page) {
		this.nav(page);
	};

	/* --- bảng chia sẻ --- */

	/* Sáu ô mạng xã hội + một dòng link.
	   Mở bằng window.open chứ không phải thẻ <a target=_blank>: trình đọc hay
	   chạy trong cửa sổ phủ kín trang, mà rời trang lúc đó là mất luôn chỗ đang
	   đọc. Cửa sổ con bật ra, chia sẻ xong đóng lại, sách vẫn nằm nguyên đó. */
	var NETS = [
		{ k: 'facebook',  t: 'Facebook',    c: '#1877f2',
		  u: function (d) { return 'https://www.facebook.com/sharer/sharer.php?u=' + d.url; } },
		{ k: 'x',         t: 'X',           c: '#000',
		  u: function (d) { return 'https://twitter.com/intent/tweet?url=' + d.url + '&text=' + d.title; } },
		{ k: 'pinterest', t: 'Pinterest',   c: '#e60023', img: true,
		  u: function (d) { return 'https://pinterest.com/pin/create/button/?url=' + d.url + '&media=' + d.img + '&description=' + d.title; } },
		{ k: 'linkedin',  t: 'LinkedIn',    c: '#0a66c2',
		  u: function (d) { return 'https://www.linkedin.com/sharing/share-offsite/?url=' + d.url; } },
		{ k: 'whatsapp',  t: 'WhatsApp',    c: '#25d366',
		  u: function (d) { return 'https://api.whatsapp.com/send?text=' + d.title + '%20' + d.url; } },
		{ k: 'mail',      t: 'Email',       c: '#5b6270', mail: true,
		  u: function (d) { return 'mailto:?subject=' + d.title + '&body=' + d.url; } },
	];

	Reader.prototype.fillShare = function (body) {
		var self = this;
		var UI   = window.CPFB_UI;
		var url  = this.linkToShare();
		var data = {
			url:   encodeURIComponent(url),
			title: encodeURIComponent(document.title || ''),
			img:   encodeURIComponent(this.shareImg || ''),
		};

		var box = el('div', 'cpfb-share');

		var grid = el('div', 'cpfb-share__grid');
		NETS.forEach(function (n) {
			// Pinterest không có ảnh bìa để ghim thì thà không hiện còn hơn hiện rồi hỏng
			if (n.img && !self.shareImg) return;

			var b = el('button', 'cpfb-share__net');
			b.type = 'button';
			b.title = n.t;

			var ic = el('span', 'cpfb-share__ic');
			ic.style.background = n.c;
			ic.innerHTML = UI.brand(n.k, 19);
			b.appendChild(ic);

			var lb = el('span', 'cpfb-share__lb');
			lb.textContent = n.t;
			b.appendChild(lb);

			b.addEventListener('click', function () {
				var to = n.u(data);
				// mailto không phải trang web: mở cửa sổ con thì để lại một tab trắng
				if (n.mail) { window.location.href = to; return; }
				window.open(to, 'cpfb_share', 'noopener,noreferrer,width=640,height=580');
			});
			grid.appendChild(b);
		});
		box.appendChild(grid);

		var row = el('div', 'cpfb-share__row');
		var link = el('input', 'cpfb-share__url');
		link.type = 'text';
		link.readOnly = true;
		link.value = url;
		// Bấm vào là bôi đen sẵn — máy nào chặn clipboard thì còn Ctrl+C
		link.addEventListener('focus', function () { this.select(); });
		link.addEventListener('click', function () { this.select(); });
		row.appendChild(link);

		var copy = el('button', 'cpfb-share__copy');
		copy.type = 'button';
		copy.title = CFG.i18n.copyLink;
		copy.setAttribute('aria-label', CFG.i18n.copyLink);
		copy.innerHTML = UI.icon('link', 17);
		copy.addEventListener('click', function () { self.copyLink(copy); });
		row.appendChild(copy);
		box.appendChild(row);

		if (navigator.share) {
			var more = el('button', 'cpfb-share__more');
			more.type = 'button';
			more.textContent = CFG.i18n.shareMore;
			more.addEventListener('click', function () { self.nativeShare(); });
			box.appendChild(more);
		}

		body.appendChild(box);
	};

	/* --- mục lục --- */

	Reader.prototype.fillToc = function (body) {
		var list = el('ul', 'cpfb-toc-list');

		// Mục lục nhập tay: đã có sẵn số trang, khỏi phải hỏi PDF.js
		if (this.manualToc) {
			this.manualToc.forEach((it) => {
				var li = el('li');
				var b = el('button', 'cpfb-toc-item');
				b.type = 'button';
				b.style.paddingLeft = (10 + (it.depth || 0) * 14) + 'px';
				b.innerHTML = '';
				b.appendChild(document.createTextNode(it.title));
				var pg = el('span', 'cpfb-toc-page');
				pg.textContent = it.page;
				b.appendChild(pg);
				// Mục lục ghi theo số trang PDF; sách lật đánh số theo Ô
				b.addEventListener('click', () => { this.goto(this.panelOf(it.page)); this.closePanel(); });
				li.appendChild(b);
				list.appendChild(li);
			});
			body.appendChild(list);
			return;
		}

		var add = (items, depth) => {
			items.forEach((it) => {
				var li = el('li');
				var b = el('button', 'cpfb-toc-item');
				b.type = 'button';
				b.style.paddingLeft = (10 + depth * 14) + 'px';
				b.textContent = it.title;
				b.addEventListener('click', async () => {
					var page = await this.outlinePage(it);
					if (page) {
						this.goto(this.panelOf(page));
						this.closePanel();
					}
				});
				li.appendChild(b);
				list.appendChild(li);
				if (it.items && it.items.length) add(it.items, depth + 1);
			});
		};

		add(this.outline, 0);
		body.appendChild(list);
	};

	/** Mục lục PDF trỏ tới "đích", phải hỏi PDF.js xem đích đó là trang mấy. */
	Reader.prototype.outlinePage = async function (item) {
		try {
			var dest = item.dest;
			if (typeof dest === 'string') dest = await this.pdf.getDestination(dest);
			if (!dest) return 0;
			var idx = await this.pdf.getPageIndex(dest[0]);
			return idx + 1;
		} catch (e) {
			return 0;
		}
	};

	Reader.prototype.fillThumbs = function (body) {
		var grid = el('div', 'cpfb-thumb-grid');
		body.appendChild(grid);

		for (var i = 1; i <= this.total; i++) {
			(function (self, n) {
				var cell = el('button', 'cpfb-thumb');
				cell.type = 'button';
				cell.dataset.page = n;
				var num = el('span', 'cpfb-thumb__n');
				num.textContent = n;
				cell.appendChild(num);
				cell.addEventListener('click', function () {
					self.goto(n);
					self.closePanel();
				});
				grid.appendChild(cell);
			})(this, i);
		}

		// Chỉ vẽ thumbnail khi ô lọt vào tầm nhìn — sách 216 trang thì vẽ hết là treo máy
		var io = new IntersectionObserver((entries) => {
			entries.forEach((en) => {
				if (!en.isIntersecting) return;
				io.unobserve(en.target);
				this.renderThumb(en.target);
			});
		}, { root: body, rootMargin: '160px' });
		grid.querySelectorAll('.cpfb-thumb').forEach((c) => io.observe(c));
		this.thumbIO = io;
	};

	Reader.prototype.renderThumb = async function (cell) {
		var n = parseInt(cell.dataset.page, 10);
		if (cell.dataset.done) return;
		cell.dataset.done = '1';
		try {
			var pan = this.panels[n - 1];
			if (!pan) return;
			var page = await this.pdf.getPage(pan.pdf);
			var box = this.panelBox(page, pan, 132, 1);
			var c = el('canvas');
			c.width = box.w;
			c.height = box.h;
			await page.render({
				canvasContext: c.getContext('2d', { alpha: false }),
				viewport: box.vp,
				transform: [1, 0, 0, 1, box.dx, 0],
			}).promise;
			cell.insertBefore(c, cell.firstChild);
		} catch (e) {
			delete cell.dataset.done;
		}
	};

	Reader.prototype.updateBar = function () {
		if (!this.engine) return;
		var cur = this.engine.current();
		// Đang gõ dở thì đừng giật con số dưới tay người ta
		if (this.pageIn && document.activeElement !== this.pageIn) this.pageIn.value = cur;
		if (this.pageTotal) this.pageTotal.textContent = '/ ' + this.total;
		this.syncNav();
	};

	/** Bật/tắt nút lùi–tới theo chỗ đang đứng, cả trên thanh lẫn hai mép. */
	Reader.prototype.syncNav = function () {
		if (!this.engine) return;
		var first = this.engine.atStart ? this.engine.atStart() : false;
		var last = this.engine.atEnd ? this.engine.atEnd() : false;
		[this.prevBtn, this.edgePrev].forEach(function (b) { if (b) b.disabled = first; });
		[this.nextBtn, this.edgeNext].forEach(function (b) { if (b) b.disabled = last; });
	};

	/** Đếm lượt đọc. Khoảng chặn trùng lấy từ cài đặt; restRead rỗng = đã tắt đếm. */
	Reader.prototype.countRead = function () {
		if (!this.postId || !CFG.restRead) return;
		var hours = CFG.readThrottle;
		var key = 'cpfb_read_' + this.postId;
		try {
			var last = parseInt(localStorage.getItem(key) || '0', 10);
			if (hours > 0 && Date.now() - last < hours * 3600 * 1000) return;
		} catch (e) { /* chặn localStorage thì cứ đếm */ }

		fetch(CFG.restRead.replace('%d', this.postId), {
			method: 'POST',
			headers: { 'X-WP-Nonce': CFG.nonce },
		}).then(r => r.json()).then(d => {
			try { localStorage.setItem(key, String(Date.now())); } catch (e) {}
			var box = document.querySelector('[data-cpfb-reads="' + this.postId + '"]');
			if (box && d && typeof d.read_count !== 'undefined') {
				box.textContent = Number(d.read_count).toLocaleString('vi-VN');
			}
		}).catch(() => {});
	};

	function boot() {
		document.querySelectorAll('.cpfb-reader:not([data-cpfb-ready])').forEach(function (root) {
			root.setAttribute('data-cpfb-ready', '1');
			new Reader(root).start();
		});
	}

	// cpfb-autolink.js dùng lại đúng lớp này để mở PDF trong cửa sổ nổi
	window.CPFB_Reader = Reader;

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
