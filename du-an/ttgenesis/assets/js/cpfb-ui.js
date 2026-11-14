/**
 * Comma PDF Flipbook — bộ icon và âm thanh lật trang.
 *
 * ICON: SVG nội tuyến, nét 1.8px, khung 24x24, bo tròn đầu nét — thống nhất
 * một bộ thay vì mượn ký tự ‹ › ⛶ như trước (mỗi máy render một kiểu).
 *
 * ÂM THANH: tổng hợp bằng WebAudio, KHÔNG dùng file mp3. Lý do:
 *   - không vướng bản quyền, không phải kèm file, không tốn dung lượng
 *   - mỗi lần lật nghe hơi khác nhau -> tai người không thấy lặp máy móc
 */
(function (w) {
	'use strict';

	/* ---------------------------------------------------------------- *
	 * ICON
	 * ---------------------------------------------------------------- */
	var P = {
		prev: '<path d="M15 5 8 12l7 7"/>',
		next: '<path d="m9 5 7 7-7 7"/>',
		full: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/>',
		exit: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"/>',
		download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
		toc: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
		grid: '<path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v6H4zM14 15h6v6h-6z"/>',
		close: '<path d="m6 6 12 12M18 6 6 18"/>',
		sound: '<path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7"/>',
		mute: '<path d="M11 5 6 9H3v6h3l5 4zM22 9l-6 6m0-6 6 6"/>',
		share: '<path d="M8.6 13.5 15.4 17M15.4 7 8.6 10.5"/><circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/>',
		play: '<path d="M7 4.5 19 12 7 19.5z"/>',
		pause: '<path d="M9 5v14M15 5v14"/>',
		zoomIn: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8M10.5 8v5M8 10.5h5"/>',
		zoomOut: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8M8 10.5h5"/>',
		check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
		link: '<path d="M10.2 13.8a4.2 4.2 0 0 0 6 0l2.6-2.6a4.2 4.2 0 0 0-6-6l-1.5 1.5"/><path d="M13.8 10.2a4.2 4.2 0 0 0-6 0l-2.6 2.6a4.2 4.2 0 0 0 6 6l1.5-1.5"/>',
	};

	function icon(name, size) {
		return '<svg viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) +
			'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
			'stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>';
	}

	/* ---------------------------------------------------------------- *
	 * DẤU HIỆU THƯƠNG HIỆU (bảng chia sẻ)
	 *
	 * Tách khỏi bộ icon ở trên vì khác hẳn về bản chất: icon của trình đọc là
	 * nét vẽ 1.8px do mình đặt ra, còn logo mạng xã hội là hình khối ĐẶC và
	 * không được vẽ lại theo ý mình — vẽ sai một chút là người ta vẫn nhận ra
	 * nhưng thấy sai sai. Nên bộ này dùng fill, giữ đúng đường nét gốc, và có
	 * hàm riêng để không ai lỡ tay truyền stroke-width vào.
	 * ---------------------------------------------------------------- */
	var B = {
		facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
		x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
		pinterest: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592.001 11.985.001L12.017 0z',
		linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
		whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.4',
		/* Email không có logo — tự vẽ, nhưng vẽ ĐẶC cho hợp hàng với năm cái trên */
		mail: 'M3 4.5h18c.83 0 1.5.67 1.5 1.5v.62l-10.5 6.4L1.5 6.62V6c0-.83.67-1.5 1.5-1.5zM1.5 8.38V18c0 .83.67 1.5 1.5 1.5h18c.83 0 1.5-.67 1.5-1.5V8.38l-9.72 5.93a1.5 1.5 0 0 1-1.56 0z',
	};

	function brand(name, size) {
		return '<svg viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) +
			'" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + (B[name] || '') + '"/></svg>';
	}

	/* ---------------------------------------------------------------- *
	 * ÂM THANH LẬT TRANG
	 * ---------------------------------------------------------------- */
	var Sound = {
		ctx: null,
		on: true,

		/** Trình duyệt chặn âm thanh tới khi người dùng chạm vào trang -> tạo muộn. */
		ensure: function () {
			if (this.ctx) return this.ctx;
			var AC = w.AudioContext || w.webkitAudioContext;
			if (!AC) return null;
			try {
				this.ctx = new AC();
			} catch (e) {
				return null;
			}
			return this.ctx;
		},

		/**
		 * Tiếng lật sách. Nghe kỹ tiếng thật thì nó là BA lớp nối nhau, không phải
		 * một tiếng "shhh" đều đều:
		 *
		 *   1. NHẤC  — ngón tay miết vào mép giấy, tiếng rin rít trầm, rất ngắn
		 *   2. VÚT   — trang giấy quạt qua không khí; đây là phần dài nhất, và
		 *              quan trọng là nó RUNG (giấy vặn mình) chứ không mượt
		 *   3. ĐẬP   — trang rơi chạm chồng giấy: một tiếng "tách" đục, có thân
		 *
		 * Lớp 2 dùng nhiễu điều biên bằng mấy dao động chậm lệch pha nhau — đó là
		 * thứ tạo cảm giác "giấy" thay vì "gió".
		 */
		flip: function () {
			if (!this.on) return;
			var ctx = this.ensure();
			if (!ctx) return;
			if (ctx.state === 'suspended') ctx.resume().catch(function () {});

			var t0 = ctx.currentTime;
			var rate = ctx.sampleRate;
			var out = ctx.createGain();
			// Số này đo bằng OfflineAudioContext chứ không ước lượng:
			//   0.5 -> đỉnh 0.07 (nhỏ như muỗi) | 2.6 -> đỉnh 0.40 (hơi to)
			//   1.7 -> đỉnh ~0.27, vừa cho tiếng phát mỗi lần lật.
			out.gain.value = 1.7;
			out.connect(ctx.destination);

			// Mỗi lần lật lệch nhau một chút -> tai không nhận ra tiếng lặp
			var rnd = function (a, b) { return a + Math.random() * (b - a); };
			var speed = rnd(0.85, 1.15);

			/* ---- Lớp 1: NHẤC (0 -> 55ms) ---- */
			var d1 = 0.055 * speed;
			var b1 = ctx.createBuffer(1, Math.ceil(rate * d1), rate);
			var a1 = b1.getChannelData(0);
			for (var i = 0; i < a1.length; i++) {
				var t = i / a1.length;
				a1[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.5) * 0.8;
			}
			var s1 = ctx.createBufferSource(); s1.buffer = b1;
			var f1 = ctx.createBiquadFilter();
			f1.type = 'bandpass'; f1.frequency.value = rnd(1100, 1500); f1.Q.value = 1.4;
			var g1 = ctx.createGain(); g1.gain.value = 0.22;
			s1.connect(f1); f1.connect(g1); g1.connect(out);
			s1.start(t0);

			/* ---- Lớp 2: VÚT (bắt đầu ~40ms, dài ~230ms) ---- */
			var d2 = rnd(0.20, 0.26) * speed;
			var n2 = Math.ceil(rate * d2);
			var b2 = ctx.createBuffer(1, n2, rate);
			var a2 = b2.getChannelData(0);
			// 3 dao động chậm lệch pha = giấy vặn, tạo tiếng lạo xạo bất quy tắc
			var w1 = rnd(28, 40), w2 = rnd(55, 75), w3 = rnd(95, 130);
			var p1 = Math.random() * 6.28, p2 = Math.random() * 6.28, p3 = Math.random() * 6.28;
			for (var j = 0; j < n2; j++) {
				var x = j / n2;
				var tt = x * d2;
				// vào nhanh, giữ, rồi tắt dần
				var env = Math.min(1, x * 9) * Math.pow(1 - x, 1.25);
				var crinkle =
					0.62 +
					0.20 * Math.sin(6.28 * w1 * tt + p1) +
					0.12 * Math.sin(6.28 * w2 * tt + p2) +
					0.06 * Math.sin(6.28 * w3 * tt + p3);
				a2[j] = (Math.random() * 2 - 1) * env * crinkle;
			}
			var s2 = ctx.createBufferSource(); s2.buffer = b2;
			var f2 = ctx.createBiquadFilter();
			f2.type = 'bandpass'; f2.Q.value = 0.55;
			// quét LÊN rồi XUỐNG: giấy tăng tốc qua đỉnh vòng cung rồi chậm lại
			var fa = rnd(1500, 1900), fb = rnd(3400, 4200), fc = rnd(900, 1200);
			f2.frequency.setValueAtTime(fa, t0 + 0.04);
			f2.frequency.exponentialRampToValueAtTime(fb, t0 + 0.04 + d2 * 0.45);
			f2.frequency.exponentialRampToValueAtTime(fc, t0 + 0.04 + d2);
			var hp2 = ctx.createBiquadFilter();
			hp2.type = 'highpass'; hp2.frequency.value = 500;
			var g2 = ctx.createGain(); g2.gain.value = 0.3;
			s2.connect(f2); f2.connect(hp2); hp2.connect(g2); g2.connect(out);
			s2.start(t0 + 0.04);

			/* ---- Lớp 3: ĐẬP (lúc trang chạm xuống) ---- */
			var tHit = t0 + 0.04 + d2 * 0.92;
			var d3 = 0.07;
			var b3 = ctx.createBuffer(1, Math.ceil(rate * d3), rate);
			var a3 = b3.getChannelData(0);
			for (var k = 0; k < a3.length; k++) {
				var u = k / a3.length;
				a3[k] = (Math.random() * 2 - 1) * Math.pow(1 - u, 5); // tắt rất nhanh = "tách"
			}
			var s3 = ctx.createBufferSource(); s3.buffer = b3;
			var f3 = ctx.createBiquadFilter();
			f3.type = 'lowpass'; f3.frequency.value = rnd(700, 950); // đục, có thân
			var g3 = ctx.createGain(); g3.gain.value = 0.26;
			s3.connect(f3); f3.connect(g3); g3.connect(out);
			s3.start(tHit);
		},
	};

	w.CPFB_UI = { icon: icon, brand: brand, sound: Sound };
})(window);
