/**
 * Comma PDF Flipbook — bắt link PDF trong bài viết/trang.
 *
 * Mặc định bấm vào một link .pdf là trình duyệt tải file về hoặc mở trình xem
 * PDF thô của nó — người đọc rời khỏi website. Module này chặn cú bấm đó lại và
 * mở file ngay trong một cửa sổ nổi toàn màn hình, dùng đúng trình đọc sách lật.
 *
 * Không đụng gì tới HTML của bài viết: link vẫn là link thật, vẫn bấm chuột
 * giữa / Ctrl+bấm để mở tab mới được, máy tìm kiếm vẫn thấy. Chỉ cú bấm trái
 * thông thường mới bị đổi hướng.
 *
 * Không nhận link nào:
 *   - có class .cpfb-skip hoặc thuộc tính data-cpfb="off"
 *   - nằm trong thanh admin, trong chính trình đọc
 *   - trỏ sang tên miền khác (PDF.js đọc bằng JavaScript nên bị CORS chặn,
 *     mở ra chỉ để báo lỗi thì thà cứ để trình duyệt xử lý như cũ)
 */
(function () {
	'use strict';

	var CFG = window.CPFB_CFG || {};
	var open = null;      // cửa sổ đang mở; mỗi lúc chỉ cho phép một
	var loading = null;   // lời hứa nạp bộ đọc; chỉ chạy đúng một lần

	/* ------------------------------------------------------------------ *
	 * NẠP MUỘN BỘ ĐỌC
	 *
	 * Script này nằm ở mọi trang của site nên phải nhẹ. PDF.js + StPageFlip +
	 * CSS cộng lại vài trăm KB — tải sẵn cho một trang có thể chẳng ai bấm vào
	 * link PDF là phí băng thông của tất cả mọi người. Nên chờ tới cú bấm thật
	 * rồi mới nạp.
	 * ------------------------------------------------------------------ */

	/** Nạp một file CSS. Đã có trên trang rồi thì thôi. */
	function needCss(url) {
		return new Promise(function (done, fail) {
			if (!url || document.querySelector('link[href="' + url + '"]')) return done();
			var el = document.createElement('link');
			el.rel = 'stylesheet';
			el.href = url;
			el.onload = done;
			el.onerror = function () { fail(new Error(url)); };
			document.head.appendChild(el);
		});
	}

	/** Nạp một file JS. Đã có trên trang rồi thì thôi. */
	function needJs(url) {
		return new Promise(function (done, fail) {
			if (!url || document.querySelector('script[src="' + url + '"]')) return done();
			var el = document.createElement('script');
			el.src = url;
			el.onload = done;
			el.onerror = function () { fail(new Error(url)); };
			document.head.appendChild(el);
		});
	}

	/**
	 * Bảo đảm window.CPFB_Reader đã sẵn sàng.
	 *
	 * Trang tài liệu vốn đã nạp sẵn bộ đọc theo lối thường -> thoát ngay, không
	 * nạp chồng. Còn thứ tự ba file JS thì bắt buộc: page-flip và cpfb-ui phải
	 * chạy xong trước cpfb-reader, vì cpfb-reader đọc window.St và window.CPFB_UI
	 * ngay lúc dựng engine.
	 */
	function needReader() {
		if (window.CPFB_Reader) return Promise.resolve();
		if (loading) return loading;

		var A = CFG.assets || {};
		loading = Promise.all([needCss(A.pageFlipCss), needCss(A.readerCss)])
			.then(function () { return Promise.all([needJs(A.pageFlipJs), needJs(A.uiJs)]); })
			.then(function () { return needJs(A.readerJs); })
			.then(function () {
				if (!window.CPFB_Reader) throw new Error('CPFB_Reader khong xuat hien');
			})
			.catch(function (e) {
				loading = null;   // cho phép thử lại ở cú bấm sau, đừng kẹt vĩnh viễn
				throw e;
			});
		return loading;
	}

	/** Đuôi .pdf, chấp nhận có ?query hoặc #anchor phía sau. */
	function isPdf(href) {
		return /\.pdf(\?|#|$)/i.test(href);
	}

	function sameOrigin(a) {
		// a.href đã được trình duyệt chuẩn hoá thành đường dẫn tuyệt đối
		return a.origin === window.location.origin;
	}

	function skip(a) {
		if (a.dataset.cpfb === 'off' || a.classList.contains('cpfb-skip')) return true;
		if (a.closest('#wpadminbar, .cpfb-reader, .cpfb-modal')) return true;
		// download="..." là ý đồ rõ ràng của tác giả: họ muốn người ta tải file
		if (a.hasAttribute('download')) return true;
		return false;
	}

	function openReader(url, title) {
		if (open) return;
		CFG = window.CPFB_CFG || CFG;   // phòng khi cấu hình được in ra sau script này

		var root = document.createElement('div');
		root.className = 'cpfb-reader cpfb-modal cpfb-fs';
		root.setAttribute('data-cpfb-ready', '1');
		root.dataset.pdf = url;
		root.dataset.share = url;
		root.dataset.btn = JSON.stringify(CFG.defaultBtn || {});
		root.dataset.mode = CFG.viewMode || 'flip';
		root.dataset.spread = CFG.spread || 'auto';
		if (title) root.setAttribute('aria-label', title);

		document.body.appendChild(root);
		document.documentElement.classList.add('cpfb-fs-lock');

		open = new window.CPFB_Reader(root, {
			modal: true,
			onClose: function () { open = null; },
		});
		open.start();
	}

	function onClick(e) {
		// Chuột giữa, Ctrl/Cmd+bấm, Shift+bấm = người dùng CỐ Ý mở tab/cửa sổ mới
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

		var a = e.target.closest && e.target.closest('a[href]');
		if (!a || !isPdf(a.href) || !sameOrigin(a) || skip(a)) return;

		e.preventDefault();

		/* Giữ lại href và tiêu đề NGAY BÂY GIỜ: tới lúc nạp xong thì phần tử <a>
		   có thể đã bị JS khác thay hoặc gỡ khỏi DOM. */
		var url = a.href;
		var title = a.textContent.trim() || a.title;

		needReader().then(function () {
			openReader(url, title);
		}).catch(function () {
			/* Không nạp nổi bộ đọc thì trả lại hành vi mặc định của trình duyệt,
			   đừng để cú bấm rơi vào hư không. */
			window.location.href = url;
		});
	}

	function boot() {
		// Bắt ở tầng document: link do JS chèn thêm sau (bộ lọc, phân trang ajax,
		// tải thêm…) cũng chạy, không phải quét lại DOM lần nào.
		document.addEventListener('click', onClick);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
