(function anonymous(
) {
function Za() {
		var b;
		u = f.get("scene").getArray();
		for (b = 0; b < u.length; b++) {
			var d = b,
				h = "<content>" + u[d].content + "</content>";
			if (window.DOMParser) var e = (new DOMParser).parseFromString(h, "text/xml");
			else e = new ActiveXObject("Microsoft.XMLDOM"), e.async = !1, e.loadXML(h);
			h = e.getElementsByTagName("view")[0];
			var C = null,
				k = null,
				t = null;
			"undefined" !== typeof h && (C = h.getAttribute("hlookat"), k = h.getAttribute("vlookat"), t = h
				.getAttribute("fov"));
			u[d].view = {
				hlookat: C,
				vlookat: k,
				fov: t
			};
			e = e.getElementsByTagName("image")[0];
			h = e.getElementsByTagName("depthmap")[0];
			C = null;
			t = k = !1;
			"undefined" !== typeof e && (C = e.getAttribute("style"));
			"undefined" !== typeof h && (h.getAttribute("url") && h.getAttribute("enabled"), k = h.getAttribute(
				"url"), t = h.getAttribute("enabled"));
			u[d].depthmap = {
				style: C,
				depthmap: k && t
			}
		}
		for (b = 0; b < u.length; b++) u[b].click = !1, 0 == u[b].depthmap.depthmap && (V = !1);
		V = !0;

		if (!V)
			//          for (b = f.get("style").getArray(), i = 0; i < b.length; i++) - 1 < b[i].name.indexOf("jypano_") && (b[i].ox = 0, b[i].oy = 0, b[i].oz = 0);
			W = a.leftkey;
		X = a.rightkey;
		Y = a.forwardkey;
		Z = a.backwardkey;
		qa = a.upkey;
		ra = a.downkey;
		J = a.angletolerance;
		P = a.hotspotvisibility;
		aa = a.notfoundmove;
		Q = a.notfoundtime;
		B = a.navigationmode;
		K = a.navigationclick;
		L = a.navigationspeed;
		ba = a.walkingspeed;
		ea = a.walktransition;
		fa = a.loadsceneflags;
		ha = a.loadscenevars;
		ia = a.loadsceneblend;
		D = a.loadsceneblendtime;
		F = a.modereturn;
		R = a.returnaction;
		ja = a.returnvraction;
		ka = a.returnnotfoundaction;
		la = a.returnnotfoundvraction;
		S = a.depthmapuse;
		M = a.hapticfeedback;


	}

	function Oa() {
		var b;
		G = [];
		if ("undefined" !== typeof O)
			if ("scene" == P) G = t[O].visiblePanos;
			else if ("model" == P)
			for (b = 0; b < Ca.length; b++) Ca[b] != T && G.push(Ca[b])
	}



	function na(b) {
		b = void 0 === b ? "forward" : b;
		var d = f.get("view.hlookat") % 360;
		f.get("view.vlookat");
		var h = {};
		"left" == b ? (h.x = d - 90, h.y = 0) : "right" == b ? (h.x = d + 90, h.y = 0) : "forward" == b ? (h.x = d,
			h.y = 0) : "backward" == b ? (h.x = d - 180, h.y = 0) : b.x && b.y && (h.x = b.x % 360, h.y = b.y);
		Ra(h)
	}

	function Ra(b, d) {
		d = void 0 === d ? !1 : d;
		var h = 1E32,
			e = null;
		if (Array.isArray(d)) {
			var a = d[0];
			var k = d[1]
		}
		d = {
			x: I.x,
			y: I.z
		};
		var m = Sa(b.x, 0);
		m.x += d.x;
		m.y +=
			d.y;
		var g, p = 0,
			n = null;
		if (Da(t)) var l = void 0;
		else {
			var r = {
				x: I.x,
				y: I.z
			};
			for (g = 0; g < t.length; g++)
				if (t[g].panoId != T) {
					var y = ya(r, {
						x: t[g].x,
						y: t[g].z
					}, 2);
					if (y > p) {
						p = y;
						n = g;
						l = t[g].panoId;
						var q = t[g].panoName
					}
				} l = null != n ? {
				id: l,
				name: q,
				x: t[n].x,
				y: t[n].z
			} : !1
		}
		a: {
			l = ya(d, l, 2);p = g = q = null;n = 90;r = J / 2;y = (null != l) + (null != q) + (null != g);
			var E = (null != p) + (null != n) + (null != r);
			if (3 != y + E) throw "Give exactly 3 pieces of information";
			if (0 == y) throw "Give at least one side length";
			if (3 == y) {
				y = "Side side side (SSS) case";
				if (l + q <= g || q + g <= l ||
					g + l <= q) {
					var c = !1;
					break a
				}
				p = oa(q, g, l);
				n = oa(g, l, q);
				r = oa(l, q, g);
				c = (l + q + g) / 2;
				var z = Math.sqrt(c * (c - l) * (c - q) * (c - g))
			} else if (2 == E) {
				y = "Angle side angle (ASA) case";
				null == p && (p = 180 - n - r);
				null == n && (n = 180 - r - p);
				null == r && (r = 180 - p - n);
				if (0 >= p || 0 >= n || 0 >= r) throw y + " - No solution";
				var x = Math.sin(A(p));
				var v = Math.sin(A(n)),
					w = Math.sin(A(r));
				null != l && (c = l / x, z = l * c * v * w / 2);
				null != q && (c = q / v, z = q * c * w * x / 2);
				null != g && (c = g / w, z = g * c * x * v / 2);
				null == l && (l = c * x);
				null == q && (q = c * v);
				null == g && (g = c * w)
			} else if (null != p && null == l || null != n && null ==
				q || null != r && null == g) {
				y = "Side angle side (SAS) case";
				if (null != p && 180 <= p || null != n && 180 <= n || null != r && 180 <= r) throw y +
					" - No solution";
				null == l && (l = Fa(q, g, p));
				null == q && (q = Fa(g, l, n));
				null == g && (g = Fa(l, q, r));
				null == p && (p = oa(q, g, l));
				null == n && (n = oa(g, l, q));
				null == r && (r = oa(l, q, g));
				null != p && (z = q * g * Math.sin(A(p)) / 2);
				null != n && (z = g * l * Math.sin(A(n)) / 2);
				null != r && (z = l * q * Math.sin(A(r)) / 2)
			} else {
				y = "Side side angle (SSA) case - ";
				null != l && null != p && (x = l, w = p);
				null != q && null != n && (x = q, w = n);
				null != g && null != r && (x = g, w = r);
				null != l &&
					null == p && (v = l);
				null != q && null == n && (v = q);
				null != g && null == r && (v = g);
				if (180 <= w) throw y + "No solution";
				c = x / Math.sin(A(w));
				z = v / c;
				if (1 < z || 90 <= w && x <= v) throw y + "No solution";
				if (1 == z || x >= v) {
					y += "Unique solution";
					E = Math.asin(z) / Math.PI * 180;
					var u = 180 - w - E;
					c *= Math.sin(A(u));
					z = x * v * Math.sin(A(u)) / 2
				} else {
					y += "Two solutions";
					E = Math.asin(z) / Math.PI * 180;
					u = 180 - E;
					z = 180 - w - E;
					w = 180 - w - u;
					var B = c * Math.sin(A(z));
					c *= Math.sin(A(w));
					E = [E, u];
					u = [z, w];
					c = [B, c];
					z = [x * v * Math.sin(A(z)) / 2, x * v * Math.sin(A(w)) / 2]
				}
				null != l && null == p && (p = E);
				null != q &&
					null == n && (n = E);
				null != g && null == r && (r = E);
				null == l && null == p && (l = c, p = u);
				null == q && null == n && (q = c, n = u);
				null == g && null == r && (g = c, r = u)
			}
			c = [l, q, g, p, n, r, z, y]
		}
		c = Ga(d, m, c[1] + 20, 2);
		m = Ha(d, c, J / 2 * -1);
		x = Ha(d, c, J / 2);
		Oa();
		if (!Da(G))
			for (c = 0; c < G.length; c++)
				if (v = H(t, G[c], "panoId"), "undefined" !== typeof v && (z = {
							id: G[c],
							x: t[v].x,
							y: t[v].z
						}, q = z.x - x.x, g = z.y - x.y, p = x.x - m.x, n = m.y - x.y, l = n * (d.x - x.x) + p * (d
							.y - x.y), p = n * q + p * g, q = (x.y - d.y) * q + (d.x - x.x) * g, 0 > l ? 0 >= p &&
						0 >= q && p + q >= l : 0 <= p && 0 <= q && p + q <= l))
					if (z = ya(d, z, 2), z < h) {
						h = z;
						e = t[v].panoId;
						var D = t[v].panoName
					} if (null !=
			e) F || a || (S ? ma(D, h / L) : (b = Ea(D, T), ma(D, null, b.view))), !F && a && (M && f.webvr
			.isenabled && f.call("hotspot[" + k + "].pulse(0.5,1)"), ma(D, h / L)), F && !a && (null != R ? f
			.call(R + "(" + D + "," + h.toFixed(2) + ");") : f.trace(3,
				"warning, you need to set a return action")), F && a && (null != ja ? f.call(ja + "(" + D +
			"," + h.toFixed(2) + ");") : f.trace(3, "warning, you need to set a return vr action"));
		else {
			F || a || Ta(b, !N);
			!F && a && (Ta(b, !N), void 0 !== k && (M && f.webvr.isenabled && f.call("hotspot[" + k +
				"].pulse(0.5,1)"), M && f.webvr.isenabled && f.call("hotspot[" +
				k + "].pulse(0.5,1)")));
			if (F && !a)
				if (null != ka) {
					k = Ia(b);
					if (null == k) return;
					f.call(ka + "(" + k.x0.toFixed(2) + "|" + k.y0.toFixed(2) + "|" + k.x1.toFixed(2) + "|" + k.y1
						.toFixed(2) + ");")
				} else f.trace(3, "warning, you need to set a not found return action");
			F && a && (null != la ? (a = Ia(b), null != a && f.call(la + "(" + a.x0.toFixed(2) + "|" + a.y0.toFixed(
				2) + "|" + a.x1.toFixed(2) + "|" + a.y1.toFixed(2) + ");")) : f.trace(3,
				"warning, you need to set a not found return vr action"))
		}
	}

	function Ta(b, d) {
		d = void 0 === d ? !0 : d;
		b = Ia(b);
		// return
		// console.log(b)


		null != b && d && f.call("tween(view.tx|view.tz," +
		    b.x1 + "|" + b.y1 + "," + Q + ", default,tween(view.tx|view.tz," + b.x0 + "|" + b.y0 + "," + Q + ", default));")
	}

	function Ia(b) {
		if (V)
			if ("undefined" !== typeof I.x) var d = {
				x: I.x,
				y: I.z
			};
			else return null;
		else d = {
			x: 0,
			y: 0
		};
		b = Sa(b.x, 0);
		V && (b.x += d.x, b.y += d.y);
		b = Ga(d, b, aa / 10, 2);
		return {
			x0: d.x,
			y0: d.y,
			x1: b.x,
			y1: b.y
		}
	}

	function Sa(b, d) {
		b = b * Math.PI / 180;
		d = d * Math.PI / 180;
		var h = {};
		h.x = Math.cos(d) * Math.sin(b);
		h.y = Math.cos(d) * Math.cos(b);
		h.z = Math.sin(d);
		return h
	}

	function Ua(b) {
		var d = {};
		d.x = 180 * Math.atan2(b.x, b.y) / Math.PI;
		d.y = 180 * Math.atan2(b.z,
			Math.sqrt(b.x * b.x + b.y * b.y)) / Math.PI;
		return d
	}

	function Ha(b, d, h) {
		var e = Math.PI / 180 * h;
		h = Math.cos(e);
		e = Math.sin(e);
		var a = {};
		a.x = h * (d.x - b.x) + e * (d.y - b.y) + b.x;
		a.y = h * (d.y - b.y) - e * (d.x - b.x) + b.y;
		return a
	}

	function Ga(b, d, a, e) {
		var h = {};
		h.x = b.x + a * (d.x - b.x);
		h.y = b.y + a * (d.y - b.y);
		null != b.z && null != d.z && 3 == (void 0 === e ? 3 : e) && (h.z = b.z + a * (d.z - b.z));
		return h
	}

	function ya(b, d, a) {
		var e = b.x - d.x;
		var h = b.y - d.y;
		null != b.z && null != d.z && 3 == (void 0 === a ? 3 : a) ? (b = b.z - d.z, e = Math.sqrt(e * e + h * h +
			b * b)) : e = Math.sqrt(e * e + h * h);
		return e
	}

	function Va(b,
		d) {
		var a = H(f.jynav, b, "id"),
			e = H(f.navPlugMod, f.jynav[a].modelI, "id");
		b = H(f.navPlugMod[e].absolutePos, b, "id");
		if ("undefined" !== typeof e && "undefined" !== typeof a) return a = Ha(f.navPlugMod[e].absolutePos[b]
				.rotatationPoint, d, -1 * f.navPlugMod[e].absolutePos[b].rotation), a.x -= f.navPlugMod[e]
			.absolutePos[b].translation.x, a.y -= f.navPlugMod[e].absolutePos[b].translation.y, a.z = d.z, d =
			Ua(a), a.h = d.x, a.v = d.y, a
	}

	function Fa(b, d, a) {
		a = A(a);
		return .001 < a ? Math.sqrt(b * b + d * d - 2 * b * d * Math.cos(a)) : Math.sqrt((b - d) * (b -
			d) + b * d * a * a * (1 - a * a / 12))
	}

	function oa(b, d, a) {
		var e = (b * b + d * d - a * a) / (2 * b * d);
		return -1 <= e && .9999999 >= e ? Math.acos(e) / Math.PI * 180 : 1 >= e ? Math.sqrt((a * a - (b - d) * (b -
			d)) / (b * d)) / Math.PI * 180 : "No solution"
	}

	function A(b) {
		return b / 180 * Math.PI
	}

	function H(b, d, a) {
		a = "undefined" === typeof a ? "name" : a;
		for (var e = 0; e < b.length; e++)
			if (b[e][a] == d) return e
	}

	function Da(b) {
		return "undefined" !== typeof b && 0 < b.length ? !1 : !0
	}

	function ma(b, d, a) {
		a = void 0 === a ? null : a;
		$a(b, void 0 === d ? 2 : d, !0)
	}

	function $a(b, d, a) {
		// console.log('$a', b, d, a)
		d = void 0 === d ? 1 : d;
		a =
			void 0 === a ? !0 : a;
		U = !1;
		if (!Ja) {
			var e = H(t, b, "panoName");
			Ja = !0;
			f.get("events").onblendcomplete = function() {
				Ja = !1
			};
			a && f.call("stoptween(view.tx|view.ty|view.tz);set(events.onkeydown,null);");
			f.call("flytopano(" + b + ");");

			b = t[e].x;
			e = t[e].z;
			// a && f.call("tween(view.tx|view.tz," + b + "|" + e + "," + a * 1.5 + ", easeinoutcubic, set(events.onkeydown,null); );");
			setTimeout(function() {
				U = true
			}, 100)
		}
	}



	function Xa() {
		var b = f.get("xml.scene");
		b = void 0 === b ? null : b;
		Ka = null == b ? f.get("xml.scene") : b;
		O = H(t,
			Ka, "panoName");
		b = H(u, Ka.toLowerCase(), "name");
		za = u[b].type;
		Aa = u[b].click;
		"undefined" !== typeof O && (T = t[O].panoId, I = {
			x: t[O].x,
			y: t[O].y,
			z: t[O].z
		});
		Oa();



	}

	function ab() {
		var b = f.events.createItem(a.name + "_events");
		b.keep = a.keep;
		b.onclick = function() {
			if (Aa) {
				var b = f.screentosphere(f.mouse.stagex, f.mouse.stagey);
				na(b)
			}
		};
		b.onloadcomplete =
			function() {
				Xa()
			};
		b.onkeyup = function() {
			var b = f.get("keycode");

		};
		b.onkeydown = function() {
			var b = f.get("keycode");
			Aa && (b == W && na("left"), b == X && na("right"), b == Y && na("forward"), b == Z && na(
				"backward"));

		}
	}



	function bb(b) {
		b = void 0 === b ? "vr_controller_r" : b;
		var a = f.get("hotspot[" + b + "]");
		null != a ? (a = Ua({
			x: a.dx,
			y: a.dz,
			z: a.dy
		}), Ra(a, [!0, b])) : f.trace(3, "warning, controller not found")
	}

	function Ea(b, a) {
		a = void 0 === a ? null : a;
		null == a && (a = T);
		var d = H(f.navPlugMod[MODELINDEX].absolutePos, b, "id"),
			e = {
				x: f.navPlugMod[MODELINDEX].absolutePos[d].x,
				y: f.navPlugMod[MODELINDEX].absolutePos[d].y,
				z: f.navPlugMod[MODELINDEX].absolutePos[d].z
			},
			m = Va(a, e);
		a = H(f.navPlugMod[MODELINDEX].absolutePos,
			a, "id");
		e = Ga({
			x: f.navPlugMod[MODELINDEX].absolutePos[a].x,
			y: f.navPlugMod[MODELINDEX].absolutePos[a].y
		}, e, 1.02, 2);
		b = Va(b, e);
		return {
			destination: f.navPlugMod[MODELINDEX].absolutePos[d].id,
			position: {
				h: m.h,
				v: m.v,
				x: m.x,
				y: m.y,
				z: m.z
			},
			view: {
				hlookat: b.h,
				vlookat: 0,
				fov: 120
			}
		}
	}

	function cb(b, a) {
		var d = f.get("hotspot[nav_hint_" + b + "]");
		d.sprite.setAttribute("id", "hotspot_hint_" + b);
		d.sprite.setAttribute("class", " hint--top hint--rounded ");
		d.sprite.setAttribute("aria-label", a)
	}





	function fb() {
		var b;
		for (b = 0; b < f.jynav.length; b++) {
			var a = f.jynav[b];
			a = {
				panoId: a[0][0],
				panoName: a[0][1].toLowerCase(),
				visiblePanos: a[1],
				x: a[2][0],
				y: a[2][1],
				z: a[2][2]
			};
			t.push(a);
			Ca.push(a.panoId);
			a = H(u, a.panoName.toLowerCase(), "name");
			"undefined" !== typeof a && (u[a].click = !0)
		}
	}
	var Ba = this;


	var f = null,
		a = null;
	Ba.registerplugin = function(b, d, h) {
		f = b;
		a = h;

		a.jump = na, a.makevrclick = bb, a.callloadscene = ma, a.sethotspotattributes = cb, a.registerattribute(
				"leftkey", "65",
				function(a) {
					a != W && (W = a)
				},
				function() {
					return W
				}),
			a.registerattribute("rightkey", "68", function(a) {
				a != X && (X = a)
			}, function() {
				return X
			}), a.registerattribute("forwardkey", "87", function(a) {
				a != Y && (Y = a)
			}, function() {
				return Y
			}), a.registerattribute("backwardkey", "83", function(a) {
				a != Z && (Z = a)
			}, function() {
				return Z
			}), a.registerattribute("upkey", "81", function(a) {
				a != qa && (qa = a)
			}, function() {
				return qa
			}), a.registerattribute("downkey", "69", function(a) {
				a != ra && (ra = a)
			}, function() {
				return ra
			}), a.registerattribute("angletolerance", 60, function(a) {
				a != J && (J = a)
			}, function() {
				return J
			}),
			a.registerattribute("hotspotvisibility", "scene", function(a) {
				a != P && (P = a)
			}, function() {
				return P
			}), a.registerattribute("notfoundmove", 100, function(a) {
				a != aa && (aa = a)
			}, function() {
				return aa
			}), a.registerattribute("notfoundtime", 0.3, function(a) {
				a != Q && (Q = a)
			}, function() {
				return Q
			}), a.registerattribute("navigationmode", "jumping", function(a) {
				a != B && (B = a);

			}, function() {
				return B
			}), a.registerattribute("navigationclick", !0, function(a) {
				a != K && (K = a)
			}, function() {
				return K
			}), a.registerattribute("navigationspeed", 100, function(a) {
				a != L && (L = a)
			}, function() {
				return L
			}), a.registerattribute("loadsceneblendtime", null, function(a) {
				a != D && (D = a)
			}, function() {
				return D
			}), a.registerattribute("modereturn", !1, function(a) {
				a != F &&
					(F = a)
			}, function() {
				return F
			}), a.registerattribute("returnaction", null, function(a) {
				a != R && (R = a)
			}, function() {
				return R
			}), a.registerattribute("returnvraction", null, function(a) {
				a != ja && (ja = a)
			}, function() {
				return ja
			}), a.registerattribute("returnnotfoundaction", null, function(a) {
				a != ka && (ka = a)
			}, function() {
				return ka
			}), a.registerattribute("returnnotfoundvraction", null, function(a) {
				a != la && (la = a)
			}, function() {
				return la
			}), a.registerattribute("depthmapuse", !0, function(a) {
				a != S && (S = a)
			}, function() {
				return S
			}), a.registerattribute("hapticfeedback",
				!0,
				function(a) {
					a != M && (M = a)
				},
				function() {
					return M
				}), a.mode = "pro", Za(), fb(), Xa(), ab()

	};
	Ba.unloadplugin = function() {
		f = a = null
	};
	var t = [],
		Ca = [],
		G = [],
		Ka, T, O, I, za, Aa, W, X, Y, Z, qa, ra, J, P, aa, Q, B, K, L, ba, ca, da, ea, fa, ha, ia, D, F, R, ja, ka,
		la, S, M, Ma, N, Na, sa, ta, ua, va, wa, xa, u, V = !0,
		U, Qa = !1,
		m, Ja
})