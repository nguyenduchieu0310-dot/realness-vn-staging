(function anonymous() {
    var A, M, Q;
    function Jb() {
        n = [{
            id: "map",
            condition: "haveMap,showMap",
            toolName: "mapButton",
            action: "toggleMap();",
            icon: "ionic-map"
        }, {
            id: "fullscreen",
            condition: "haveFullscreen,showFullscreen",
            toolName: "fullscreen",
            action: "toggle(fullscreen);",
            icon: "ionic-expand"
        }, {
            id: "measure",
            condition: "haveMeasure,showMeasure",
            toolName: "measureButton",
            action: `plugin[${d.name}].togglemeasure()`,
            icon: "ionic-ruler",
            icon_active: "ionic-ruler1"
        }, {
            id: "vr",
            condition: "showVR",
            toolName: "vrdesktop",
            action: "webvr.enterVR();",
            icon: "ionic-vr"
        }, {
            id: "contact",
            condition: "showContact",
            toolName: "mail",
            action: "toggleMail();",
            icon: "ionic-mail"
        }, {
            id: "share",
            condition: "showShare",
            toolName: "share",
            action: "toggleShare();",
            icon: "ionic-heart"
        }, {
            id: "settings",
            condition: "showSettings",
            toolName: "settings",
            action: "toggleSettings();",
            icon: "ionic-gear"
        }, {
            id: "logo",
            condition: "showLogo",
            toolName: "logo",
            action: "openDevWeb();",
            icon: "ionic-everLogo"
        }, {
            id: "model3d",
            condition: "showModel3d",
            toolName: "model3d",
            action: "toggle_tour();",
            icon: "ionic-play"
        }, {
            id: "sound",
            condition: "showSound",
            toolName: "soundButton",
            action: "toggleSoundIcon()",
            icon: "ionic-microOn",
        }, {
            id: "custommap",
            condition: "showCustomMap",
            toolName: "customMapButton",
            action: "togglebangdo();",
            icon: "ionic-map"
        }
    ];
        var a;
        m = e.get("scene").getArray();
        for (a = 0; a < m.length; a++) {
            var c = void 0
              , f = a
              , b = "<content>" + m[f].content + "</content>";
            window.DOMParser ? c = (new DOMParser).parseFromString(b, "text/xml") : (c = new ActiveXObject("Microsoft.XMLDOM"),
            c.async = !1,
            c.loadXML(b));
            b = c.getElementsByTagName("view")[0];
            c.getElementsByTagName("preview");
            c = c.getElementsByTagName("image")[0];
            var h = null
              , k = null
              , g = null;
            "undefined" !== typeof b && (h = b.getAttribute("hlookat"),
            k = b.getAttribute("vlookat"),
            g = b.getAttribute("fov"));
            m[f].view = {
                hlookat: h,
                vlookat: k,
                fov: g
            };
            b = c.getElementsByTagName("depthmap")[0];
            h = null;
            g = k = !1;
            "undefined" !== typeof c && (h = c.getAttribute("style"));
            "undefined" !== typeof b && (b.getAttribute("url") && b.getAttribute("enabled"),
            k = b.getAttribute("url"),
            depthmapTextured = b.getAttribute("textured"),
            g = b.getAttribute("enabled"));
            m[f].depthmap = {
                style: h,
                depthmap: k && g,
                textured: depthmapTextured
            };
            m[f].index = m[f].name.replace("scene", "");
            m[f].id = m[f].name.replace("scene", "")
        }
        for (a = 0; a < m.length; a++)
            0 == m[a].depthmap.depthmap && (pb = !1);
        pb = !0;
        if (!pb)
            for (a = e.get("style").getArray(),
            i = 0; i < a.length; i++)
                -1 < a[i].name.indexOf("everpano3d_") && (a[i].ox = 0,
                a[i].oy = 0,
                a[i].oz = 0);
        zb(e.get("xml.scene"));
        N = e.get("device");
        A = e.get("stagewidth");
        M = e.get("stageheight");
        ma = Q = !1;
        E = d.menuopen;
        na = d.menuanimation;
        oa = d.showpanotitle;
        R = d.shownextprevious;
        S = d.shownptooltips;
        T = d.menuscrolltopoffset;
        pa = d.menuscrollbottomoffset;
        U = d.menuscrollthumboffset;
        I = d.menuscrollthumbwidth;
        V = d.menuscrollthumbheight;
        qa = d.menuscrolltxtheight;
        ra = d.menuscrolltxtalpha;
        sa = d.menuscrolltxtbgcolor;
        W = d.thumbmaskopacity;
        u = d.containerbuttonsize;
        ta = d.bottomcontainercolor;
        ua = d.bottomcontaineralpha;
        va = d.mapposition;
        wa = d.fullscreenposition;
        xa = d.measureposition;
        ya = d.vrposition;
        za = d.contactposition;
        Aa = d.shareposition;
        Ba = d.settingsposition;
        Ca = d.logoposition;
        Da = d.model3dposition;
        Ea = d.maporder;
        Fa = d.fullscreenorder;
        Ga = d.measureorder;
        Ha = d.vrorder;
        Ia = d.contactorder;
        Ja = d.shareorder;
        Ka = d.settingsorder;
        La = d.logoorder;
        Ma = d.model3dorder;
        showMeasure = d.showmeasure;
        showMap = d.showmap;
        showContact = d.showcontact;
        showShare = d.showshare;
        showVR = d.showvr;
        showSettings = d.showsettings;
        showLogo = d.showlogo;
        showFullscreen = d.showfullscreen;
        showModel3d = d.showmodel3d;
        showSound = d.showsound;
        showCustomMap = d.showcustommap;
        X = d.panonamewidth;
        J = d.panonamevisible;
        Y = d.pluginspath;
        Na = d.measurekey;
        Oa = d.measureskipkey;
        Pa = d.measurecompletekey;
        Qa = d.reloadmeasures;
        O = d.depthoffset;
        Ra = d.measuremousesize;
        Sa = d.measuremouseradius0;
        Ta = d.measuremouseradius1;
        Ua = d.measuremousecolor0;
        Va = d.measuremousecolor1;
        Z = d.measuremarkerwh;
        Wa = d.measuremarkersize;
        Xa = d.measuremarkerscale;
        Ya = d.measuremarkerradius0;
        Za = d.measuremarkerradius1;
        $a = d.measuremarkercolor0;
        ab = d.measuremarkercolor1;
        bb = d.measurelineborderwidth;
        cb = d.measurelinebordercolor;
        db = d.measurelineborderalpha;
        aa = d.measureinfostyle;
        ba = d.measureinforoundedge;
        ca = d.measureinfounits;
        B = d.measureinforemovemessage;
        eb = d.showevertags;
        da = d.evertagsstyle;
        fb = d.evertagcss;
        gb = d.evertaghtml;
        P = d.evertagsize;
        hb = d.evertagscale;
        ib = d.evertagalpha;
        jb = d.evertagborder;
        kb = d.evertagonover;
        lb = d.evertagonout;
        ea = d.typelinktarget;
        fa = d.typelinkaction;
        ha = d.typepanoaction;
        ia = d.typevideoaction;
        ja = d.typehtmlaction;
        qb = d.password;
        n[t(n, "map", "id")].position = va;
        n[t(n, "measure", "id")].position = xa;
        n[t(n, "fullscreen", "id")].position = wa;
        n[t(n, "vr", "id")].position = ya;
        n[t(n, "contact", "id")].position = za;
        n[t(n, "share", "id")].position = Aa;
        n[t(n, "settings", "id")].position = Ba;
        n[t(n, "logo", "id")].position = Ca;
        n[t(n, "model3d", "id")].position = Da;
        n[t(n, "sound", "id")].position = soundPosition;
        n[t(n, "custommap", "id")].position = customMapPosition;
        n[t(n, "map", "id")].order = Ea;
        n[t(n, "measure", "id")].order = Ga;
        n[t(n, "fullscreen", "id")].order = Fa;
        n[t(n, "vr", "id")].order = Ha;
        n[t(n, "contact", "id")].order = Ia;
        n[t(n, "share", "id")].order = Ja;
        n[t(n, "settings", "id")].order = Ka;
        n[t(n, "logo", "id")].order = La;
        n[t(n, "model3d", "id")].order = Ma;
        n[t(n, "sound", "id")].order = soundOrder;
        n[t(n, "custommap", "id")].order = customMapOrder
    }
    function t(a, c, f) {
        f = "undefined" === typeof f ? "name" : f;
        for (var b = 0; b < a.length; b++)
            if (a[b][f] == c)
                return b
    }
    function Ab(a) {
        for (var c in a)
            if (a.hasOwnProperty(c))
                return !1;
        return !0
    }
    function K(a) {
        for (var c = "", f = 0; f < a; f++)
            c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
        return c
    }
    function Kb(a, c) {
        return a.order < c.order ? -1 : a.order > c.order ? 1 : 0
    }
    function C(a, c, f, b, h, k, g, q, r, D, ka, la, rb) {
        a = e.addlayer(a);
        a.x = c;
        a.y = f;
        a.width = b;
        a.height = h;
        a.align = k;
        a.edge = g;
        a.alpha = q;
        a.zorder = r;
        a.visible = D;
        a.parent = ka;
        a.bgcolor = la;
        a.bgalpha = rb;
        a.keep = "true";
        a.type = "container"
    }
    function F(a, c, f, b=null, h=null, k, g, q, r, D, ka, la, rb, v, Lb=.5, Mb=!0) {
        v = e.addlayer(a);
        v.scale = Lb;
        v.keep = Mb;
        v.x = c;
        v.y = f;
        null != b && (v.width = b);
        null != h && (v.height = h);
        a = null != rb ? t(x, rb, "id") : t(x, a, "id");
        "undefined" !== a && (v.crop = x[a].crop);
        v.url = "./images/skin.png";
        v.alpha = k;
        v.align = g;
        v.edge = q;
        v.onclick = r;
        v.parent = D;
        v.enabled = ka;
        v.zorder = la
    }
    function Nb() {
        const a = e.events.createItem(d.name + "_ui_events");
        a.keep = d.keep;
        a.onloadcomplete = function() {
            sb(!1);
            zb(e.get("xml.scene"));
            var c;
            for (c = 0; c < m.length; c++)
                e.set("layer[ev_menuthumbmask-" + m[c].name + "].bgalpha", W);
            e.set("layer[ev_menuthumbmask-" + mb + "].bgalpha", 0);
            Bb();
            Cb(m[G].type);
            "undefined" !== typeof m[G].title ? (e.set("layer[ev_panoName].html", m[G].title),
            e.set("layer[ev_panoName].visible", !0)) : (w("layer[ev_panoName].html", ""),
            e.call("tween(layer[ev_toolstitlecontainerbox].width, 0,0.5,null,set(layer[ev_panoName].visible,false););"),
            ub());
            if (R && S) {
                c = document.getElementById("ev_btnprevscene");
                let f = document.getElementById("ev_btnnextscene");
                null != c && null != f && (c.setAttribute("aria-label", m[nb(-1)].title),
                f.setAttribute("aria-label", m[nb(1)].title))
            }
        }
        ;
        a.onkeydown = function() {
            e.keycode == Na && e.have_measure && !e.measures_blocked && sb()
        }
        ;
        a.onresize = function() {
            let c = !1;
            A = e.get("stagewidth");
            M = e.get("stageheight");
            Q || (Q = A);
            ma || (ma = M);
            Q != A && (c = !0);
            ma != M && (c = !0);
            Q = A;
            ma = M;
            c && (ub(),
            300 > M ? (E = 1,
            Db(),
            e.set("layer[ev_btnmenu].visible", 0)) : e.set("layer[ev_btnmenu].visible", 1),
            Ob())
        }
    }
    function Pb(a, c, f="layer", b=null, h=null, k=null, g="rounded", q="bounce") {
        f = e.get(f + "[" + a + "]");
        let r = "";
        null != b && (r += " " + b);
        null != h && (r += h);
        null != k && (r += k);
        null != g && (r += g);
        null != q && (r += q);
        f.sprite.setAttribute("id", a);
        f.sprite.setAttribute("class", r);
        f.sprite.setAttribute("aria-label", c)
    }
    function Qb(a, c, f="layer") {
        e.get(f + "[" + a + "]").sprite.setAttribute("id", c)
    }
    function Eb() {
        var a = T + pa + V;
        vb = -1 * a;
        C("ev_thumbsroot", 0, 0, "100%", a, "bottom", null, 1, 1, !0, "STAGE", "0x000000", .1);
        F("ev_btnmenu", null, null, null, null, 1, "center", null, "plugin[" + d.name + "].togglemenu()", "ev_toolsmenucontainerbox", !0, 10, "ionic-menu");
        E ? e.set("layer[ev_thumbsroot].y", 0) : e.set("layer[ev_thumbsroot].y", vb);
        if (!N.mobile) {
            F("ev_btnPrevScroll", 10, 0, null, null, 1, "left", null, null, "ev_thumbsroot", !0, 10, "ionic-previous");
            F("ev_btnNextScroll", 10, 0, null, null, 1, "right", null, null, "ev_thumbsroot", !0, 10, "ionic-next");
            a = e.get("layer[ev_btnprevscroll]");
            var c = e.get("layer[ev_btnnextscroll]");
            a.ondown = "asyncloop(pressed, layer[ev_thumbscroll].scrollby(+1,0));";
            c.ondown = "asyncloop(pressed, layer[ev_thumbscroll].scrollby(-1,0));"
        }
        a = e.addlayer("ev_thumbscrollmask");
        a.width = "100%";
        a.height = "100%";
        a.bgalpha = 0;
        a.keep = !0;
        a.alpha = 1;
        a.type = "container";
        a.maskchildren = !0;
        a.align = "center";
        a.zorder = 1;
        a.parent = "ev_thumbsroot";
        a = e.addlayer("ev_thumbscrollindicator");
        a.y = 0;
        a.height = 4;
        a.bgroundedge = 0;
        a.bgcolor = "0xfafafa;";
        a.bgalpha = .6;
        a.keep = !0;
        a.alpha = 1;
        a.type = "container";
        a.align = "bottomleft";
        a.zorder = 3;
        a.parent = "ev_thumbscrollmask";
        a = e.addlayer("ev_thumbscroll");
        a.width = m.length * (U + I);
        a.height = "100%";
        a.keep = !0;
        a.url = Y + "/scrollarea.js?nocache=%$random%";
        a.align = "left";
        a.direction = "h";
        a.overscroll = 1;
        a.onhover_autoscrolling = !1;
        a.draggable = !0;
        a.maskchilren = !0;
        a.parent = "ev_thumbscrollmask";
        a.onscroll = "plugin[" + d.name + "].updatescroll(thumb)";
        a.draggable = a.width > A ? !0 : !1;
        for (a = c = 0; a < m.length; a++) {
            if ("undefined" !== typeof m[a].menu && "false" == m[a].menu)
                continue;
            var f = "000|000|250|125";
            "undefined" !== typeof m[a].thumbsize && (f = m[a].thumbsize.split(","),
            f = "000|" + Math.floor((parseInt(f[1]) - 125) / 2) + "|250|125");
            let b = e.addlayer("ev_menuthumbimage-" + m[a].name);
            b.width = I;
            b.height = V;
            b.x = c;
            b.y = T;
            b.crop = f;
            b.scale = 1;
            b.keep = !0;
            b.url = m[a].thumburl + "?nocache=%$random%";
            b.align = "topleft";
            b.alpha = 1;
            b.zorder = 2;
            b.parent = "ev_thumbscroll";
            b.linkedscene = m[a].name;
            b.onclick = "model3d" == m[a].type ? "model3d_view();" : "\n\t\t\t\t\tloadscene(" + m[a].name + ",null, MERGE, BLEND(1));tween(layer[ev_tooltipmenu].alpha, 0.0);\n\t\t\t\t\ttween(view.tx|view.ty|view.tz|view.ox|view.oy|view.oz|view.fisheye,\n\t\t\t\t\t\tcalc(''+image.ox+'|'+image.oy+'|'+image.oz+'|0|0|0|0'),\n\t\t\t\t\t\t0.1,\n\t\t\t\t\t\tdefault,\n\t\t\t\t\t\tset(control.invert,false);\n\t\t\t\t\t);\n\t\t\t\t";
            f = e.addlayer("ev_menuthumbmask-" + m[a].name);
            f.width = "100%";
            f.height = "100%";
            f.bgcolor = "0x000000";
            f.keep = !0;
            f.alpha = 1;
            f.type = "container";
            f.align = "topleft";
            f.zorder = 1;
            f.maskchildren = !0;
            f.parent = "ev_menuthumbimage-" + m[a].name;
            f.bgalpha = m[a].name == mb ? 0 : W;
            oa && m[a].title && (f = e.addlayer("ev_menuthumbtxt-" + m[a].name),
            f.width = "100%",
            f.height = qa,
            f.keep = !0,
            f.type = "text",
            f.css = "text-align:center; color:#fafafa; font-family:'UTM Aptima' !important; font-size:13px; -webkit-font-smoothing: antialiased",
            f.vcenter = !0,
            f.children = !1,
            f.align = "bottomleft",
            f.edge = "bottomleft",
            f.onclick = "plugin[" + d.name + "].callloadscene(" + m[a].name + ");",
            f.padding = 10,
            f.bg = !0,
            f.bgcolor = sa,
            f.bgalpha = ra,
            f.parent = "ev_menuthumbmask-" + m[a].name,
            f.html = m[a].title);
            c = U + I + c
        }
    }
    function Ob() {
        setTimeout(function() {
            Bb()
        }, 1000)
    }
    function Bb() {
        let a = e.get("layer[ev_menuthumbimage-" + mb + "]");
        null != a && e.call("layer[ev_thumbscroll].scrolltocenter(" + (a.x + I / 2) + "," + a.y + ")")
    }
    function Rb(a) {
        let c = 10;
        N.mobile && (c *= 2);
        var f = Number(e.get("layer[ev_thumbscroll].loverflow"))
          , b = Number(e.get("layer[ev_thumbscroll].roverflow"));
        let h = Number(e.get("layer[ev_thumbscroll].woverflow"));
        0 < f ? e.set("layer[ev_btnprevscroll].visible", !0) : e.set("layer[ev_btnprevscroll].visible", !1);
        0 < b ? e.set("layer[ev_btnnextscroll].visible", !0) : e.set("layer[ev_btnnextscroll].visible", !1);
        a = "ev_" + a + "scrollindicator";
        if (0 < h) {
            e.set("layer[" + a + "].visible", !0);
            var k = Number(e.get("layer[ev_thumbscroll].pixelwidth"));
            b = k - h;
            k = b / k;
            f /= h;
            k *= b;
            e.set("layer[" + a + "].width", k);
            b -= k;
            b -= c;
            b -= c;
            f *= b;
            f += c;
            e.set("layer[" + a + "].x", f)
        } else
            e.set("layer[" + a + "].visible", !1)
    }
    function Db() {
        E ? (e.call("tween(layer[ev_thumbsroot].y," + vb + ");"),
        E = 0) : (e.call("stopdelayedcall(menuanimationid);"),
        e.call("tween(layer[ev_thumbsroot].y,0);"),
        E = 1)
    }
    function nb(a) {
        a = Number(G) + Number(a);
        let c = m.length - 1;
        0 > a && (a = c);
        a > c && (a = 0);
        return a
    }
    function Sb(a) {
        a = nb(a);
        "model3d" == m[a].type ? e.call("\n                loadscene(" + m[a].name + ",null,MERGE|,NOBLEND,\n                    tween(view.oz,1000,2.0);\n                    set(control.invert,true);\n                );\n            ") : e.call("\n                loadscene(" + m[a].name + ",null, MERGE, BLEND(1));tween(layer[ev_tooltipmenu].alpha, 0.0);\n                tween(view.tx|view.ty|view.tz|view.ox|view.oy|view.oz|view.fisheye,\n                    calc(''+image.ox+'|'+image.oy+'|'+image.oz+'|0|0|0|0'),\n                    0.1,\n                    default,\n                    set(control.invert,false);\n                );\n            ")
    }
    function zb(a=null) {
        mb = null == a ? e.get("xml.scene") : a;
        Fb = mb.replace("scene", "");
        G = t(m, Fb, "index")
    }
    function Tb(a=0, c=100, f=!0, b=5, h=1, k=2) {
        let g = e.addplugin("pp_sharpen");
        g.devices = "html5";
        g.keep = !0;
        g.enabled = !0;
        g.url = Y + "/pp_blur.js?nocache=%$random%";
        g.strength = a;
        g.range = c;
        g.linearrgb = !1;
        g.luminanceonly = f;
        g.quality = b;
        g.order = h;
        g.phase = k
    }
    function Ub(a) {
        pb ? Vb(a.replace("scene", ""), 2, !0) : Wb(a.replace("scene", ""))
    }
    function Vb(a, c=1, f=!0) {
        if (!wb) {
            var b = t(L, a, "name");
            wb = !0;
            e.get("events").onblendcomplete = function() {
                wb = !1
            }
            ;
            e.call("loadscene(" + a + ", null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(1.0));");
            f && e.call("stoptween(view.tx|view.ty|view.tz);set(events.onkeydown,null);");
            a = L[b].x;
            b = L[b].z;
            f && e.call("tween(view.tx|view.tz," + a + "|" + b + "," + c + ", default, set(events.onkeydown,null); );")
        }
    }
    function Wb(a, c=null, f=!1) {
        var b = t(L, a, "name");
        e.call("loadscene(" + a + ",null, MERGE, ZOOMBLEND(1));");
        a = L[b].x;
        let h = L[b].z;
        b = L[b].y;
        f && (e.call("set(view.tx=" + a + ");"),
        e.call("set(view.ty=" + b + ");"),
        e.call("set(view.tz=" + h + ");"));
        null != c && (b = f = 0,
        a = 120,
        "object" === typeof c ? (c.hlookat && (f = c.hlookat),
        c.vlookat && (b = c.vlookat),
        c.fov && (a = c.fov)) : "string" === typeof c && (f = Number(c)),
        e.call("lookat(" + f + "," + b + "," + a + ")"))
    }
    function Xb() {
        var a;
        N.mobile && (u *= 2);
        C("ev_buttonbox", 0, 0, "100%", u, "bottomleft", "bottomleft", 1, 1, !0, "STAGE", ta, ua);
        C("ev_tourcontainerbox", 0, 0, 1, u, "topleft", "topleft", 1, 5, !0, "ev_buttonbox", "0xfafafa", 0);
        haveMenu ? (C("ev_toolsmenucontainerbox", "0%", 0, u, "100%", "left", null, 1, 5, !0, "ev_tourcontainerbox", "0xFF0000", 0),
        C("ev_toolstitlecontainerbox", u, 0, 0, "100%", "left", null, 1, 1, !0, "ev_tourcontainerbox", "0x088A29", 0)) : C("ev_toolstitlecontainerbox", 0, 0, 0, "100%", "left", null, 1, 1, !0, "ev_tourcontainerbox", "0x0489B1", 0);
        n.sort(Kb);
        for (a = 0; a < n.length; a++)
            Yb(n[a].condition, n[a].position, n[a].toolName, n[a].action, n[a].icon);
        C("ev_leftcontainerbox", 0, 0, u * y.length, "100%", "right", "left", 1, 1, !0, "ev_toolstitlecontainerbox", "0x000000", 0);
        var c = 100 / y.length;
        let f, b = 0;
        for (a = 0; a < y.length; a++)
            f = 0,
            C("ev_tool_" + y[a].name + "containerbox", b + "%", 0, c + "%", "100%", "left", null, 1, 1, !0, "ev_leftcontainerbox", "0x000000", f),
            F("ev_" + y[a].name, null, null, null, null, 1, "center", null, y[a].action, "ev_tool_" + y[a].name + "containerbox", !0, 10, y[a].icon),
            // Thêm tooltips cho các nút bên trái
            Pb("ev_" + y[a].name, getButtonTooltip(y[a].name), "layer", "hint--top", "hint--rounded"),
            b += c;
        C("ev_rightcontainerbox", 0, 0, u * z.length, u, "bottomright", null, 1, 1, !0, "ev_buttonbox", "0x000000", 0);
        c = 100 / z.length;
        for (a = b = 0; a < z.length; a++)
            f = 0,
            C("ev_tool_" + z[a].name + "containerbox", b + "%", 0, c + "%", "100%", "left", null, 1, 1, !0, "ev_rightcontainerbox", "0x000000", f),
            F("ev_" + z[a].name, null, null, null, null, 1, "center", null, z[a].action, "ev_tool_" + z[a].name + "containerbox", !0, 10, z[a].icon),
            // Thêm tooltips cho các nút bên phải
            Pb("ev_" + z[a].name, getButtonTooltip(z[a].name), "layer", "hint--top", "hint--rounded"),
            b += c;
        haveMenu && (Eb(),
        e.set("layer[ev_buttonbox].align", "topleft"),
        e.set("layer[ev_buttonbox].parent", "ev_thumbsroot"),
        R && (F("ev_btnprevscene", 10, 0, null, null, 1, "left", null, "plugin[" + d.name + "].nextsceneloop(-1)", null, !0, 10, "ionic-previous", null),
        F("ev_btnnextscene", 10, 0, null, null, 1, "right", null, "plugin[" + d.name + "].nextsceneloop(+1)", null, !0, 10, "ionic-next", null),
        F("ev_btnprevscene_cont", 0, 0, null, null, 1, null, null, "plugin[" + d.name + "].nextsceneloop(-1)", "ev_btnprevscene", !0, 15, "ionic-trans", null),
        F("ev_btnnextscene_cont", 0, 0, null, null, 1, null, null, "plugin[" + d.name + "].nextsceneloop(+1)", "ev_btnnextscene", !0, 15, "ionic-trans", null),
        S && (a = e.get("layer[ev_btnprevscene_cont]"),
        a.sprite.name = "ev_btnprevscene",
        a.sprite.setAttribute("id", "ev_btnprevscene"),
        a.sprite.setAttribute("class", " hint--bottom-right hint--rounded "),
        a.sprite.setAttribute("aria-label", m[nb(-1)].title),
        a = e.get("layer[ev_btnnextscene_cont]"),
        a.sprite.name = "ev_btnnextscene",
        a.sprite.setAttribute("id", "ev_btnnextscene"),
        a.sprite.setAttribute("class", " hint--bottom-left hint--rounded "),
        a.sprite.setAttribute("aria-label", m[nb(1)].title)),
        N.mobile && (e.set("layer[ev_btnprevscene].x", 10),
        e.set("layer[ev_btnnextscene].x", 10))),
        na && e.call("delayedcall(menuanimationid, 3,plugin[" + d.name + "].togglemenu())"));
        a = m[G].title;
        c = e.addlayer("ev_panoname");
        c.x = 0;
        c.y = null;
        c.width = null;
        c.height = null;
        c.keep = "true";
        c.enabled = !0;
        c.bg = !1;
        c.bgcolor = void 0;
        c.bgalpha = .5;
        c.alpha = 1;
        c.align = "center";
        c.zorder = 2;
        c.type = "text";
        c.css = "text-align:center; color:#fafafa; font-family:arial; font-size:20px; letter-spacing: 0px; -webkit-font-smoothing: antialiased);";
        c.vcenter = !0;
        c.autoheight = !0;
        c.html = a;
        c.parent = "ev_toolstitlecontainerbox";
        c.onclick = void 0;
        w("layer[ev_panoname].txtshadow", "2 2 3 0x000000 0.5");
        w("layer[ev_panoname].onautosized", "\n            set(plugin[" + d.name + "].panoNameVisible, 1);\n            if(layer[ev_panoname].enabled,\n                calc(plugin[" + d.name + "].panoNameWidth, layer[ev_panoname].width + 20);\n                tween(layer[ev_toolstitlecontainerbox].width, get(plugin[" + d.name + "].panoNameWidth));\n                plugin[" + d.name + "].resizeButtonBoxSize();\n            );\n\n            ")
    }
    function Cb(a=null) {
        let c = t(x, "ionic-walk", "id")
          , f = t(x, "ionic-model", "id");
        null == a && (a = m[G].type);
        if (null == e.get("layer[ev_model3d].linkedscene")) {
            var b;
            a: {
                for (b = 0; b < m.length; b++) {
                    const h = m[b];
                    if ("panorama" == h.type) {
                        b = h.name;
                        break a
                    }
                }
                b = void 0
            }
            w("layer[ev_model3d].linkedscene", b)
        }
        "model3d" == a ? (w("layer[ev_model3d].crop", x[c].crop),
        w("layer[ev_model3d].onclick", "flytopano();"),
        w("layer[ev_tool_model3dcontainerbox].zorder", 20),
        a = e.get("layer[ev_measureButton]"),
        null != a && (a.alpha = .3,
        a.enabled = !1,
        e.measures_blocked = !0,
        sb(!1))) : "panorama" == a && (w("layer[ev_model3d].crop", x[f].crop),
        w("layer[ev_model3d].onclick", "model3d_view();"),
        w("layer[ev_model3d].linkedscene", m[G].name),
        a = e.get("layer[ev_measureButton]"),
        null != a && (e.measures_blocked = !1,
        a.alpha = 1,
        a.enabled = !0))
    }
    function ub() {
        let a = X + u * y.length + u * z.length
          , c = u * y.length + u * z.length;
        haveMenu && (c += u);
        A < a ? (J && (e.call("tween(layer[ev_toolstitlecontainerbox].width, 0);"),
        e.call("tween(layer[ev_panoname].alpha, 0);"),
        e.set("layer[ev_panoName].enabled", 0),
        J = 0),
        A < c ? e.call("tween(layer[ev_rightcontainerbox].alpha, 0);") : e.call("tween(layer[ev_rightcontainerbox].alpha, 1);")) : J || (e.call("tween(layer[ev_toolstitlecontainerbox].width," + X + ");"),
        e.call("tween(layer[ev_panoname].alpha, 1);"),
        e.call("set(layer[ev_panoname].enabled, 1);"),
        J = 1,
        A < c ? e.call("tween(layer[ev_rightcontainerbox].alpha, 0);") : e.call("tween(layer[ev_rightcontainerbox].alpha, 1);"))
    }
    function Yb(a, c, f, b, h) {
        let k = a.split(",")
          , g = [];
        for (a = 0; a < k.length; a++)
            g.push(eval(k[a]));
        (q => q.every(r => r === q[0]))(g) && 1 == g[0] && (f = {
            name: f,
            action: b,
            icon: h
        },
        "left" == c ? y.push(f) : "right" == c && z.push(f))
    }
    function Zb() {
        $b();
        e.navPlugPan.forEach(a => {
            a = {
                id: a[0][0],
                name: a[0][1].toLowerCase(),
                visiblePanos: a[1],
                x: a[2][0],
                y: a[2][1],
                z: a[2][2],
                floorPos: {
                    x: a[2][0],
                    y: a[2][1],
                    z: a[2][2]
                },
                cameraPos: {
                    x: a[3][0],
                    y: a[3][1],
                    z: a[3][2]
                },
                height: a[3][1]
            };
            L.push(a);
            ac.push(a.id);
            a = t(m, a.name.toLowerCase(), "name");
            "undefined" !== typeof a && (m[a].click = !0)
        }
        )
    }
    function w(a, c) {
        e.set(a, c)
    }
    function $b() {
        let a;
        var c;
        if ("string" === typeof e.navPlugPan) {
            var f = bc(e.navPlugPan);
            f = JSON.parse(f);
            var b = [];
            for (a = 0; a < f.length; a++) {
                var h = f[a];
                let k = [Number(H(h[0][0], 13)), H(h[0][1], 11)]
                  , g = [];
                for (c = 0; c < h[1].length; c++)
                    g.push(Number(H(h[1][c], 13 + c)));
                c = [Number(H(h[2][0], 13 + a)), Number(H(h[2][1], 21 + a)), Number(H(h[2][2], 15 + a))];
                h = [Number(H(h[3][0], 15 + a)), Number(H(h[3][1], 17 + a)), Number(H(h[3][2], 12 + a))];
                b.push([k, g, c, h])
            }
            e.navPlugPan = b
        }
    }
    function bc(a) {
        return decodeURIComponent(atob(a).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
    }
    function cc(a, c, f=126) {
        if ("number" !== typeof c || 0 !== c % 1 || "number" !== typeof c || 0 !== c % 1)
            return a.toString();
        a = a.toString().split("");
        for (var b = 0; b < a.length; b++)
            a[b].charCodeAt(0) <= f && (a[b] = String.fromCharCode((a[b].charCodeAt(0) + c) % f));
        return a.join("")
    }
    function H(a, c, f=126) {
        return "number" !== typeof c || 0 !== c % 1 || "number" !== typeof c || 0 !== c % 1 ? a.toString() : cc(a.toString(), f - c)
    }
    // Sound toggle function removed - handled directly in main.xml
    
    function sb(a=null) {
        null == a ? e.measure_status = !e.measure_status : e.measure_status = a;
        var c = t(n, "measure", "id");
        a = e.get("hotspot[floorspot]");
        e.measure_status ? (c = t(x, n[c].icon_active, "id"),
        w("layer[ev_measureButton].crop", x[c].crop),
        a.url = Gb(Ra, Sa, Ta, Ua, Va),
        a = e.events.createItem(d.name + "_measure_events"),
        a.keep = d.keep,
        a.onclick = function() {
            xb(1)
        }
        ,
        a.onkeydown = function() {
            e.keycode == Pa && (e.complete_measure = !0);
            e.keycode == Oa && (Ab(l) || (e.removehotspot(l.line),
            e.removehotspot(l.p0marker),
            l = {}),
            e.draw_hit_point_loop = !1)
        }
        ,
        a.onkeyup = function() {
            16 == e.keycode && (e.complete_measure = !1)
        }
        ) : (c = t(x, n[c].icon, "id"),
        w("layer[ev_measureButton].crop", x[c].crop),
        null != e.mouse_image ? a.url = e.mouse_image : null != a && (a.url = dc()),
        e.events.removeItem(d.name + "_measure_events"),
        l = {})
    }
    function xb() {
        var a = e.get("hotspot[floorspot]");
        let c = null;
        var f = 0
          , b = 0;
        let h = 0;
        if (Ab(l)) {
            if (e.draw_hit_point_loop = !0,
            l.line = `hotspot_${K(5)}_${K(6)}`,
            l.p0marker = `hotspot_${K(5)}_${K(6)}`,
            l.points = [new p(a.tx,a.ty,a.tz), new p(a.tx,a.ty,a.tz)],
            l.normals = [new p(a.nx,a.ny,a.nz), new p(a.nx,a.ny,a.nz)],
            l.rotations = [new p(a.rx,a.ry,a.rz), new p(a.rx,a.ry,a.rz)],
            yb(l.line, l.points[0], l.points[1]),
            c = yb(l.line, l.points[0], l.points[1])[1],
            tb(l.p0marker, l.points[0], l.rotations[0]),
            f = a.nx,
            b = a.ny,
            h = a.nz,
            e.complete_measure) {
                var k = null;
                f = new Hb;
                f.orig = l.points[0];
                f.dir = l.normals[0];
                if (k = "everpano" == e.raycastmethod ? Ib(f) : e.actions.raycastdepth(f.orig.x, f.orig.y, f.orig.z, f.dir.x, f.dir.y, f.dir.z))
                    f = new p(e.view.tx,e.view.ty,e.view.tz),
                    b = new p(k.x,k.y,k.z),
                    b = b.sub(f),
                    null != c && (f = e.spacetosphere(b.x, b.y, b.z),
                    c.ath = f.h,
                    c.atv = f.v),
                    h = b = f = 0,
                    "undefined" !== typeof l.points && (l.points[1] = new p(k.x,k.y,k.z)),
                    "undefined" !== typeof l.normals && (l.normals[1] = new p(k.nx,k.ny,k.nz)),
                    "undefined" !== typeof l.rotations && (l.rotations[1] = new p(k.rx,k.ry,k.rz)),
                    xb();
                else {
                    e.removehotspot(l.line);
                    e.removehotspot(l.p0marker);
                    return
                }
            }
        } else {
            k = l.points[1].sub(l.points[0]).length();
            f += a.nx;
            b += a.ny;
            h += a.nz;
            let g = e.addhotspot(`hotspot_${K(5)}_${K(6)}`, "webgl");
            g.type = "text";
            g.css = aa;
            g.oversampling = 2;
            g.padding = "5";
            g.vcenter = !0;
            g.scale = .25;
            g.zoom = !0;
            g.bgroundedge = ba;
            g.depth = 0;
            g.depthbuffer = !1;
            g.depthoffset = O;
            g.zorder = 5;
            g.stencil = !0;
            g.html = `${k.toFixed(1)} ${ca}`;
            g.deletehtml = B;
            a = ec(l.points[0], l.points[1]);
            g.tx = a.x + 5 * f;
            g.ty = a.y + 5 * b;
            g.tz = a.z + 5 * h;
            f = new p(g.tx,g.ty,g.tz);
            g.onclick = function() {
                g.backuphtml ? (e.removehotspot(g.line),
                e.removehotspot(g.p0marker),
                e.removehotspot(g.p1marker),
                e.removehotspot(g.name)) : (g.backuphtml = g.html,
                g.html = B,
                e.actions.delayedcall(1, function() {
                    g.backuphtml && (g.html = g.backuphtml,
                    g.backuphtml = g.deletehtml)
                }))
            }
            ;
            e.device.mouse && (g.onover = function() {
                g.backuphtml = g.html;
                g.html = B
            }
            ,
            g.onout = function() {
                g.backuphtml && (g.html = g.backuphtml,
                g.backuphtml = g.deletehtml)
            }
            );
            l.p1marker = `hotspot_${K(5)}_${K(6)}`;
            tb(l.p1marker, l.points[1], l.rotations[1]);
            l.lineinfo = g.name;
            l.length = k;
            l.lineinfoPos = f;
            g.line = l.line;
            g.p0marker = l.p0marker;
            g.p1marker = l.p1marker;
            e.measures.push(l);
            e.draw_hit_point_loop = !1;
            l = {};
            c = null
        }
        e.actions.asyncloop("draw_hit_point_loop", function() {
            if ("everpano" == e.raycastmethod) {
                var g = e.screentosphere(e.mouse.x, e.mouse.y);
                g = e.spheretospace(g.x, g.y, 100);
                var q = new p(e.view.tx,e.view.ty,e.view.tz)
                  , r = new p(e.view.ox_rotated,e.view.oy_rotated,e.view.oz_rotated);
                q = q.sub(r);
                g = (new p(g.x,g.y,g.z)).normalize();
                r = new Hb;
                r.orig = q;
                r.dir = g;
                g = Ib(r)
            } else
                g = e.actions.screentodepth(e.mouse.x, e.mouse.y);
            g && c && (q = new p(e.view.tx,e.view.ty,e.view.tz),
            r = new p(g.x,g.y,g.z),
            r = r.sub(q),
            q = e.spacetosphere(r.x, r.y, r.z),
            c.ath = q.h,
            c.atv = q.v,
            "undefined" !== typeof l.points && (l.points[1] = new p(g.x,g.y,g.z)),
            "undefined" !== typeof l.normals && (l.normals[1] = new p(g.nx,g.ny,g.nz)),
            "undefined" !== typeof l.rotations && (l.rotations[1] = new p(g.rx,g.ry,g.rz)))
        }, function() {
            l.line && e.removehotspot(l.line);
            l.p0marker && e.removehotspot(l.p0marker)
        })
    }
    function tb(a, c, f=null) {
        a = e.addhotspot(a, "webgl");
        a.type = "image";
        a.width = Z;
        a.height = Z;
        a.url = Gb(Wa, Ya, Za, $a, ab);
        a.scale = Xa;
        a.keep = !1;
        a.zoom = !0;
        a.distorted = !0;
        a.depth = 0;
        a.depthbuffer = !0;
        a.depthoffset = O;
        a.zorder = 1;
        a.tx = c.x;
        a.ty = c.y;
        a.tz = c.z;
        null != f && (a.rx = f.x,
        a.ry = f.y,
        a.rz = f.z)
    }
    function yb(a, c, f, b=null) {
        if ("model3d" == m[G].type)
            return [null, null];
        var h = e.addhotspot(a, "webgl");
        h.polyline = !0;
        h.borderwidth = bb;
        h.bordercolor = cb;
        h.borderalpha = db;
        h.depthbuffer = !0;
        h.keep = !1;
        h.enabled = !1;
        h.zorder = 4;
        h.torigin = "world";
        a = h.point.createItem(0);
        h = h.point.createItem(1);
        null == b && (b = new p(e.view.tx,e.view.ty,e.view.tz));
        c = c.sub(b);
        f = f.sub(b);
        c = e.spacetosphere(c.x, c.y, c.z);
        f = e.spacetosphere(f.x, f.y, f.z);
        a.ath = c.h;
        a.atv = c.v;
        h.ath = f.h;
        h.atv = f.v;
        return [a, h]
    }
    function fc() {
        e.measures.length && Qa && e.measures.forEach(a => {
            gc(a)
        }
        )
    }
    function gc(a) {
        yb(a.line, a.points[0], a.points[1], new p(e.image.ox,e.image.oy,e.image.oz));
        tb(a.p0marker, a.points[0]);
        tb(a.p1marker, a.points[1]);
        let c = e.addhotspot(a.lineinfo, "webgl");
        c.type = "text";
        c.css = aa;
        c.oversampling = 2;
        c.padding = "5";
        c.vcenter = !0;
        c.scale = .25;
        c.zoom = !0;
        c.bgroundedge = ba;
        c.depth = 0;
        c.depthbuffer = !0;
        c.depthoffset = O;
        c.zorder = 2;
        c.html = `${a.length.toFixed(1)} ${ca}`;
        c.deletehtml = B;
        c.tx = a.lineinfoPos.x;
        c.ty = a.lineinfoPos.y;
        c.tz = a.lineinfoPos.z;
        c.onclick = function() {
            c.backuphtml ? (e.removehotspot(a.line),
            e.removehotspot(a.p0marker),
            e.removehotspot(a.p1marker),
            e.removehotspot(a.lineinfo)) : (c.backuphtml = c.html,
            c.html = B,
            e.actions.delayedcall(1, function() {
                c.backuphtml && (c.html = c.backuphtml,
                c.backuphtml = c.deletehtml)
            }))
        }
        ;
        e.device.mouse && (c.onover = function() {
            c.backuphtml = c.html;
            c.html = B
        }
        ,
        c.onout = function() {
            c.backuphtml && (c.html = c.backuphtml,
            c.backuphtml = c.deletehtml)
        }
        )
    }
    function Gb(a=400, c=100, f=50, b="rgba(250, 250, 250, 0.5)", h="rgba(250, 0, 0, 0.5)") {
        b.includes("0x") && (b = b.replace("0x", "#"));
        h.includes("0x") && (h = h.replace("0x", "#"));
        const k = document.createElement("canvas");
        k.id = "measurePoint";
        k.width = a;
        k.height = a;
        let g = k.getContext("2d");
        g.beginPath();
        g.arc(a / 2, a / 2, c, 0, 2 * Math.PI);
        g.fillStyle = b;
        g.fill();
        g.closePath();
        g.beginPath();
        g.arc(a / 2, a / 2, f, 0, 2 * Math.PI);
        g.fillStyle = h;
        g.fill();
        g.closePath();
        return k.toDataURL()
    }
    function dc(a=400, c, f=200, b=190, h=185, k=130, g="rgba(250, 250, 250, 0.5)", q) {
        c = document.createElement("canvas");
        c.id = "mouseHotspot";
        c.width = a;
        c.height = a;
        q = c.getContext("2d");
        q.fillStyle = g;
        q.beginPath();
        q.arc(a / 2, a / 2, f, 0, 2 * Math.PI, !1);
        q.arc(a / 2, a / 2, b, 0, 2 * Math.PI, !0);
        q.arc(a / 2, a / 2, h, 0, 2 * Math.PI, !1);
        q.arc(a / 2, a / 2, k, 0, 2 * Math.PI, !0);
        q.fill();
        return c.toDataURL()
    }
    function ec(a, c) {
        return new p((a.x + c.x) / 2,(a.y + c.y) / 2,(a.z + c.z) / 2)
    }
    function p(a, c, f) {
        this.x = a;
        this.y = c;
        this.z = f
    }
    function Hb(a, c) {
        this.orig = a;
        this.dir = c
    }
    function hc(a, c, f=3) {
        var b = a.x - c.x;
        var h = a.y - c.y;
        null != a.z && null != c.z && 3 == f ? (a = a.z - c.z,
        b = Math.sqrt(b * b + h * h + a * a)) : b = Math.sqrt(b * b + h * h);
        return b
    }
    function ic() {
        e.evertags.forEach(a => {
            {
                let f = e.addhotspot(a.name, "webgl");
                f.ev_type = a.type;
                "undefined" !== typeof a.title && "" != a.title && (f.title = a.title);
                if (null != da)
                    f.loadstyle(da);
                else {
                    f.keep = !0;
                    f.type = "text";
                    f.css = fb;
                    f.html = gb;
                    f.vcenter = !0;
                    f.width = P;
                    f.height = P;
                    f.scale = hb;
                    f.alpha = ib;
                    f.bgroundedge = P / 2;
                    f.bgcolor = a.color.replace("#", "0x");
                    f.bgborder = jb;
                    f.oversampling = 2;
                    f.mipmapping = !0;
                    f.zorder = 1;
                    f.distorted = !1;
                    f.zoom = !0;
                    f.depth = 0;
                    f.depthbuffer = !0;
                    f.torigin = "world";
                    f.rotationorder = "xyz";
                    f.xalpha = 0;
                    f.onover = kb;
                    f.onout = lb;
                    if ("link" == a.type) {
                        var c = "openurl";
                        null != fa && "undefined" === typeof a.action && (c = fa);
                        "undefined" !== typeof a.action && (c = a.action);
                        let b = "_blank";
                        null != ea && "undefined" === typeof a.target && (b = ea);
                        "undefined" !== typeof a.target && (b = a.target);
                        f.onclick = `${c}('${a.content}',${b},${a.title});`
                    }
                    "pano" == a.type && (c = "flytopano",
                    null != ha && "undefined" === typeof a.action && (c = ha),
                    "undefined" !== typeof a.action && (c = a.action),
                    f.onclick = `set(linkedscene,${a.content}); ${c}(${a.content},${a.title});`);
                    "video" == a.type && (c = "youtubeplayer_open",
                    null != ia && "undefined" === typeof a.action && (c = ia),
                    "undefined" !== typeof a.action && (c = a.action),
                    f.onclick = `${c}(${a.content},${a.title});`);
                    "html" == a.type && (c = "info_open",
                    null != ja && "undefined" === typeof a.action && (c = ja),
                    "undefined" !== typeof a.action && (c = a.action),
                    f.onclick = `${c}(${a.title},${a.content});`)
                }
                f.tx = a.x;
                f.ty = a.y;
                f.tz = a.z
            }
        }
        )
    }
    var ob = this;
    ob.name = "everpanoui";
    ob.version = "1.4.0";
    var e = null
      , d = null;
    ob.registerplugin = function(a, c, f) {
        e = a;
        d = f;
        "1.20" > e.version || "2019-06-03" > e.build ? e.trace(3, ob.name + " - too old krpano version (min. 1.20)") : (e.raycast_use = !0,
        e.raycastmethod = "everpano",
        e.measure_status = !1,
        e.complete_measure = !1,
        e.have_measure = !1,
        e.sound_status = !0,
        e.mouse_image = null,
        e.measures = [],
        e.measures_blocked = !1,
        d.callloadscene = Ub,
        d.setmenu = Eb,
        d.togglemenu = Db,
        d.updatescroll = Rb,
        d.nextsceneloop = Sb,
        d.setarialabel = Pb,
        d.setid = Qb,
        d.resizebuttonboxsize = ub,
        d.toggletypemode = Cb,
        d.createmeasure = xb,
        d.togglemeasure = sb,
        d.loadmeasures = fc,

        d.registerattribute("menuscrolltopoffset", 0, function(b) {
            b != T && (T = b)
        }, function() {
            return T
        }),
        d.registerattribute("menuscrollbottomoffset", 0, function(b) {
            b != pa && (pa = b)
        }, function() {
            return pa
        }),
        d.registerattribute("menuscrollthumboffset", 1, function(b) {
            b != U && (U = b)
        }, function() {
            return U
        }),
        d.registerattribute("menuscrollthumbwidth", 250, function(b) {
            b != I && (I = b)
        }, function() {
            return I
        }),
        d.registerattribute("menuscrollthumbheight", 125, function(b) {
            b != V && (V = b)
        }, function() {
            return V
        }),
        d.registerattribute("menuscrolltxtheight", 50, function(b) {
            b != qa && (qa = b)
        }, function() {
            return qa
        }),
        d.registerattribute("menuscrolltxtalpha", .3, function(b) {
            b != ra && (ra = b)
        }, function() {
            return ra
        }),
        d.registerattribute("menuscrolltxtbgcolor", "0x000000", function(b) {
            b != sa && (sa = b)
        }, function() {
            return sa
        }),
        d.registerattribute("thumbmaskopacity", .4, function(b) {
            b != W && (W = b)
        }, function() {
            return W
        }),
        d.registerattribute("containerbuttonsize", 50, function(b) {
            b != u && (u = b)
        }, function() {
            return u
        }),
        d.registerattribute("bottomcontainercolor", "0x000000", function(b) {
            b != ta && (ta = b)
        }, function() {
            return ta
        }),
        d.registerattribute("bottomcontaineralpha", 0, function(b) {
            b != ua && (ua = b)
        }, function() {
            return ua
        }),
        d.registerattribute("pluginspath", "%VIEWER%/plugins", function(b) {
            b != Y && (Y = b)
        }, function() {
            return Y
        }),
        d.registerattribute("model3dposition", "left", function(b) {
            b != Da && (Da = b)
        }, function() {
            return Da
        }),
        d.registerattribute("soundposition", "left", function(b) {
            b != soundPosition && (soundPosition = b)
        }, function() {
            return soundPosition
        }),
        d.registerattribute("custommapposition", "right", function(b) {
            b != customMapPosition && (customMapPosition = b)
        }, function() {
            return customMapPosition
        }),
        d.registerattribute("mapposition", "left", function(b) {
            b != va && (va = b)
        }, function() {
            return va
        }),
        d.registerattribute("measureposition", "left", function(b) {
            b != xa && (xa = b)
        }, function() {
            return xa
        }),
        d.registerattribute("fullscreenposition", "left", function(b) {
            b != wa && (wa = b)
        }, function() {
            return wa
        }),
        d.registerattribute("vrposition", "left", function(b) {
            b != ya && (ya = b)
        }, function() {
            return ya
        }),
        d.registerattribute("contactposition", "right", function(b) {
            b != za && (za = b)
        }, function() {
            return za
        }),
        d.registerattribute("shareposition", "right", function(b) {
            b != Aa && (Aa = b)
        }, function() {
            return Aa
        }),
        d.registerattribute("settingsposition", "right", function(b) {
            b != Ba && (Ba = b)
        }, function() {
            return Ba
        }),
        d.registerattribute("logoposition", "right", function(b) {
            b != Ca && (Ca = b)
        }, function() {
            return Ca
        }),
        d.registerattribute("model3dorder", 1, function(b) {
            b != Ma && (Ma = b)
        }, function() {
            return Ma
        }),
        d.registerattribute("soundorder", 2, function(b) {
            b != soundOrder && (soundOrder = b)
        }, function() {
            return soundOrder
        }),
        d.registerattribute("custommaporder", 1, function(b) {
            b != customMapOrder && (customMapOrder = b)
        }, function() {
            return customMapOrder
        }),
        d.registerattribute("maporder", 2, function(b) {
            b != Ea && (Ea = b)
        }, function() {
            return Ea
        }),
        d.registerattribute("measureorder", 3, function(b) {
            b != Ga && (Ga = b)
        }, function() {
            return Ga
        }),
        d.registerattribute("fullscreenorder", 4, function(b) {
            b != Fa && (Fa = b)
        }, function() {
            return Fa
        }),
        d.registerattribute("vrorder", 5, function(b) {
            b != Ha && (Ha = b)
        }, function() {
            return Ha
        }),
        d.registerattribute("contactorder", 0, function(b) {
            b != Ia && (Ia = b)
        }, function() {
            return Ia
        }),
        d.registerattribute("shareorder", 1, function(b) {
            b != Ja && (Ja = b)
        }, function() {
            return Ja
        }),
        d.registerattribute("settingsorder", 2, function(b) {
            b != Ka && (Ka = b)
        }, function() {
            return Ka
        }),
        d.registerattribute("logoorder", 3, function(b) {
            b != La && (La = b)
        }, function() {
            return La
        }),
        d.registerattribute("showmeasure", 0, function(b) {
            b != showMeasure && (showMeasure = b)
        }, function() {
            return showMeasure
        }),
        d.registerattribute("showmap", 0, function(b) {
            b != showMap && (showMap = b)
        }, function() {
            return showMap
        }),
        d.registerattribute("showcontact", 0, function(b) {
            b != showContact && (showContact = b)
        }, function() {
            return showContact
        }),
        d.registerattribute("showshare", 0, function(b) {
            b != showShare && (showShare = b)
        }, function() {
            return showShare
        }),
        d.registerattribute("showvr", 1, function(b) {
            b != showVR && (showVR = b)
        }, function() {
            return showVR
        }),
        d.registerattribute("showsettings", 0, function(b) {
            b != showSettings && (showSettings = b)
        }, function() {
            return showSettings
        }),
        d.registerattribute("showlogo", 0, function(b) {
            b != showLogo && (showLogo = b)
        }, function() {
            return showLogo
        }),
        d.registerattribute("showfullscreen", 1, function(b) {
            b != showFullscreen && (showFullscreen = b)
        }, function() {
            return showFullscreen
        }),
        d.registerattribute("showmodel3d", 1, function(b) {
            b != showModel3d && (showModel3d = b)
        }, function() {
            return showModel3d
        }),
        d.registerattribute("showsound", 1, function(b) {
            b != showSound && (showSound = b)
        }, function() {
            return showSound
        }),
        d.registerattribute("showcustommap", 1, function(b) {
            b != showCustomMap && (showCustomMap = b)
        }, function() {
            return showCustomMap
        }),
        d.registerattribute("menuopen", 0, function(b) {
            b != E && (E = b)
        }, function() {
            return E
        }),
        d.registerattribute("menuanimation", 1, function(b) {
            b != na && (na = b)
        }, function() {
            return na
        }),
        d.registerattribute("showpanotitle", !0, function(b) {
            b != oa && (oa = b)
        }, function() {
            return oa
        }),
        d.registerattribute("shownextprevious", 1, function(b) {
            b != R && (R = b)
        }, function() {
            return R
        }),
        d.registerattribute("shownptooltips", 1, function(b) {
            b != S && (S = b)
        }, function() {
            return S
        }),
        d.registerattribute("panonamewidth", 0, function(b) {
            b != X && (X = b)
        }, function() {
            return X
        }),
        d.registerattribute("panonamevisible", 0, function(b) {
            b != J && (J = b)
        }, function() {
            return J
        }),
        d.registerattribute("password", null, function(b) {
            b != qb && (qb = b)
        }, function() {
            return qb
        }),
        d.registerattribute("measurekey", "77", function(b) {
            b != Na && (Na = b)
        }, function() {
            return Na
        }),
        d.registerattribute("measurecompletekey", "16", function(b) {
            b != Pa && (Pa = b)
        }, function() {
            return Pa
        }),
        d.registerattribute("measureskipkey", "27", function(b) {
            b != Oa && (Oa = b)
        }, function() {
            return Oa
        }),
        d.registerattribute("depthoffset", -200, function(b) {
            b != O && (O = b)
        }, function() {
            return O
        }),
        d.registerattribute("reloadmeasures", !0, function(b) {
            b != Qa && (Qa = b)
        }, function() {
            return Qa
        }),
        d.registerattribute("measuremousesize", 400, function(b) {
            b != Ra && (Ra = b)
        }, function() {
            return Ra
        }),
        d.registerattribute("measuremouseradius0", 100, function(b) {
            b != Sa && (Sa = b)
        }, function() {
            return Sa
        }),
        d.registerattribute("measuremouseradius1", 50, function(b) {
            b != Ta && (Ta = b)
        }, function() {
            return Ta
        }),
        d.registerattribute("measuremousecolor0", "rgba(250, 250, 250, 0.5)", function(b) {
            b != Ua && (Ua = b)
        }, function() {
            return Ua
        }),
        d.registerattribute("measuremousecolor1", "rgba(250, 0, 0, 0.5)", function(b) {
            b != Va && (Va = b)
        }, function() {
            return Va
        }),
        d.registerattribute("measuremarkerwh", 5, function(b) {
            b != Z && (Z = b)
        }, function() {
            return Z
        }),
        d.registerattribute("measuremarkersize", 200, function(b) {
            b != Wa && (Wa = b)
        }, function() {
            return Wa
        }),
        d.registerattribute("measuremarkerscale", .5, function(b) {
            b != Xa && (Xa = b)
        }, function() {
            return Xa
        }),
        d.registerattribute("measuremarkerradius0", 100, function(b) {
            b != Ya && (Ya = b)
        }, function() {
            return Ya
        }),
        d.registerattribute("measuremarkerradius1", 30, function(b) {
            b != Za && (Za = b)
        }, function() {
            return Za
        }),
        d.registerattribute("measuremarkercolor0", "rgba(250, 250, 250, 0.5)", function(b) {
            b != $a && ($a = b)
        }, function() {
            return $a
        }),
        d.registerattribute("measuremarkercolor1", "rgba(250, 0, 0, 0.5)", function(b) {
            b != ab && (ab = b)
        }, function() {
            return ab
        }),
        d.registerattribute("measurelineborderwidth", 3, function(b) {
            b != bb && (bb = b)
        }, function() {
            return bb
        }),
        d.registerattribute("measurelinebordercolor", "0xfafafa", function(b) {
            b != cb && (cb = b)
        }, function() {
            return cb
        }),
        d.registerattribute("measurelineborderalpha", .5, function(b) {
            b != db && (db = b)
        }, function() {
            return db
        }),
        d.registerattribute("measureinfostyle", "font-size:11px;font-family:Helvetica,Arial;color:#474646", function(b) {
            b != aa && (aa = b)
        }, function() {
            return aa
        }),
        d.registerattribute("measureinforoundedge", 11, function(b) {
            b != ba && (ba = b)
        }, function() {
            return ba
        }),
        d.registerattribute("measureinfounits", "cm", function(b) {
            b != ca && (ca = b)
        }, function() {
            return ca
        }),
        d.registerattribute("measureinforemovemessage", "\u2715 remove", function(b) {
            b != B && (B = b)
        }, function() {
            return B
        }),
        d.registerattribute("showevertags", !0, function(b) {
            b != eb && (eb = b)
        }, function() {
            return eb
        }),
        d.registerattribute("evertagsstyle", null, function(b) {
            b != da && (da = b)
        }, function() {
            return da
        }),
        d.registerattribute("evertagcss", "font-size:20px;text-align:center;color:#fafafa", function(b) {
            b != fb && (fb = b)
        }, function() {
            return fb
        }),
        d.registerattribute("evertaghtml", "+", function(b) {
            b != gb && (gb = b)
        }, function() {
            return gb
        }),
        d.registerattribute("evertagsize", 50, function(b) {
            b != P && (P = b)
        }, function() {
            return P
        }),
        d.registerattribute("evertagscale", .05, function(b) {
            b != hb && (hb = b)
        }, function() {
            return hb
        }),
        d.registerattribute("evertagalpha", .3, function(b) {
            b != ib && (ib = b)
        }, function() {
            return ib
        }),
        d.registerattribute("evertagborder", "2 0xfafafa 2", function(b) {
            b != jb && (jb = b)
        }, function() {
            return jb
        }),
        d.registerattribute("evertagonover", "tween(scale,0.07); tween(alpha,0.6);", function(b) {
            b != kb && (kb = b)
        }, function() {
            return kb
        }),
        d.registerattribute("evertagonout", "tween(scale,0.05); tween(alpha,0.3);", function(b) {
            b != lb && (lb = b)
        }, function() {
            return lb
        }),
        d.registerattribute("typelinktarget", null, function(b) {
            b != ea && (ea = b)
        }, function() {
            return ea
        }),
        d.registerattribute("typelinkaction", null, function(b) {
            b != fa && (fa = b)
        }, function() {
            return fa
        }),
        d.registerattribute("typepanoaction", null, function(b) {
            b != ha && (ha = b)
        }, function() {
            return ha
        }),
        d.registerattribute("typevideoaction", null, function(b) {
            b != ia && (ia = b)
        }, function() {
            return ia
        }),
        d.registerattribute("typehtmlaction", null, function(b) {
            b != ja && (ja = b)
        }, function() {
            return ja
        }),
        e.removelayer("webvr_enterbutton"),
        null != d.password && "" !== d.password && "undefined" !== typeof d.password ? (Tb(),
        e.set("control.usercontrol", "off")) : (Jb(),
        Zb(),
        Nb(),
        haveMeasure = haveMenu = haveFullscreen = 0,
        haveMap = null,
        1 < m.length && (haveMenu = 1),
        e.raycast_use && showMeasure && (haveMeasure = 1,
        e.have_measure = 1),
        N.fullscreensupport && (N.ios || (haveFullscreen = 1)),
        null != e.get("modelpath") && showModel3d && (showModel = 1),
        Xb(),
        eb && ic()))
    }
    ;
    ob.unloadplugin = function() {
        e = d = null
    }
    ;
    let L = [], ac = [], m, mb, Fb, G, pb = !0, N;
    var ma = Q = M = A = void 0;
    let T, pa, U, I, V, qa, ra, sa, W, u, ta, ua, E, na, R, S, oa, X, J, qb, va, wa, xa, ya, za, Aa, Ba, Ca, Da, soundPosition, customMapPosition, Ea, Fa, Ga, Ha, Ia, Ja, Ka, La, Ma, soundOrder, customMapOrder, Y, Na, Oa, Pa, Qa, O, Ra, Sa, Ta, Ua, Va, Z, Wa, Xa, Ya, Za, $a, ab, bb, cb, db, aa, ba, ca, B, eb, da, fb, gb, P, hb, ib, jb, kb, lb, ea, fa, ha, ia, ja;
    window.haveMenu = "";
    window.haveMap = "";
    window.haveMeasure = "";
    window.haveFullscreen = "";
    window.showMap = "";
    window.showFullscreen = "";
    window.showMeasure = "";
    window.showVR = "";
    window.showContact = "";
    window.showShare = "";
    window.showSettings = "";
    window.showLogo = "";
    window.showModel3d = "";
    window.showSound = "";
    window.showCustomMap = "";
    let vb, n, y = [], z = [], l = {};
    (function(a) {
        var c = document.createElement("link");
        c.rel = "stylesheet";
        c.href = "./css/hint.css";
        document.head.appendChild(c);
    }
    )();
    
    let x = [{
        id: "ionic-map",
        crop: "000|160|080|080"
    }, {
        id: "ionic-expand",
        crop: "080|160|080|080"
    }, {
        id: "ionic-contract",
        crop: "160|160|080|080"
    }, {
        id: "ionic-twitter",
        crop: "240|000|080|080"
    }, {
        id: "ionic-google",
        crop: "000|000|080|080"
    }, {
        id: "ionic-facebook",
        crop: "080|000|080|080"
    }, {
        id: "ionic-whatsapp",
        crop: "160|000|080|080"
    }, {
        id: "ionic-pause",
        crop: "400|000|080|080"
    }, {
        id: "ionic-walk",
        crop: "080|400|080|080"
    }, {
        id: "ionic-play",
        crop: "400|160|080|080"
    }, {
        id: "ionic-rotate",
        crop: "080|240|080|080"
    }, {
        id: "ionic-close",
        crop: "240|400|080|080"
    }, {
        id: "ionic-menu",
        crop: "400|240|080|080"
    }, {
        id: "ionic-camera",
        crop: "240|160|080|080"
    }, {
        id: "ionic-share",
        crop: "000|320|080|080"
    }, {
        id: "ionic-gear",
        crop: "000|240|080|080"
    }, {
        id: "ionic-ruler",
        crop: "160|240|080|080"
    }, {
        id: "ionic-ruler1",
        crop: "240|240|080|080"
    }, {
        id: "ionic-compass",
        crop: "320|160|080|080"
    }, {
        id: "ionic-previous",
        crop: "000|080|080|080"
    }, {
        id: "ionic-trans",
        crop: "000|000|005|005"
    }, {
        id: "ionic-next",
        crop: "400|080|080|080"
    }, {
        id: "ionic-everLogo",
        crop: "320|320|080|080"
    }, {
        id: "ionic-everLogoLarge",
        crop: "080|080|320|080"
    }, {
        id: "ionic-star",
        crop: "000|400|080|080"
    }, {
        id: "ionic-walk",
        crop: "080|400|080|080"
    }, {
        id: "ionic-model",
        crop: "160|400|080|080"
    }, {
        id: "ionic-microOn",
        crop: "320|400|080|080"
    }, {
        id: "ionic-microOff",
        crop: "400|400|080|080"
    }, {
        id: "ionic-cercle",
        crop: "320|240|080|080"
    }, {
        id: "ionic-vr",
        crop: "080|320|080|080"
    }, {
        id: "ionic-heart",
        crop: "400|320|080|080"
    }, {
        id: "ionic-mail",
        crop: "320|000|080|080"
    }], wb;
    const Ib = function(a) {
        var c = 1E32;
        let f = null;
        var b = 0;
        for (var h = 0; h < e.everVec3.length / 3; h++) {
            a: {
                var k = a;
                var g = e.everVec3[3 * h]
                  , q = e.everVec3[3 * h + 2]
                  , r = e.everVec3[3 * h + 1].sub(g);
                q = q.sub(g);
                const ka = k.dir.cross(q);
                var D = r.dot(ka);
                if (1E-6 > D) {
                    k = !1;
                    break a
                }
                D = 1 / D;
                const la = k.orig.sub(g);
                g = la.dot(ka) * D;
                0 > g || 1 < g ? k = !1 : (r = la.cross(r),
                k = k.dir.dot(r) * D,
                k = 0 > k || 1 < g + k ? !1 : q.dot(r) * D)
            }
            k && 0 < k && (k < c && (c = k,
            f = h),
            b++)
        }
        return null != f ? (c = a.dir.mul(c),
        c = a.orig.add(c),
        h = e.everVec3[3 * f],
        k = e.everVec3[3 * f + 2],
        b = e.everVec3[3 * f + 1].sub(h),
        h = k.sub(h),
        b = b.cross(h).normalize(),
        h = new p(180 / Math.PI * -Math.atan2(b.y, Math.sqrt(b.z * b.z + b.x * b.x)),180 / Math.PI * Math.atan2(b.x, b.z),0),
        {
            d: hc(a.orig, c),
            x: c.x,
            y: c.y,
            z: c.z,
            nx: b.x,
            ny: b.y,
            nz: b.z,
            rx: h.x,
            ry: h.y,
            rz: h.z,
            id: f
        }) : null
    };
    p.prototype.sub = function(a) {
        return new p(this.x - a.x,this.y - a.y,this.z - a.z)
    }
    ;
    p.prototype.add = function(a) {
        return new p(this.x + a.x,this.y + a.y,this.z + a.z)
    }
    ;
    p.prototype.mul = function(a) {
        return new p(this.x * a,this.y * a,this.z * a)
    }
    ;
    p.prototype.dot = function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    }
    ;
    p.prototype.cross = function(a) {
        return new p(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x)
    }
    ;
    p.prototype.length = function(a) {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    ;
    p.prototype.normalize = function(a) {
        a = this.length();
        return new p(this.x / a,this.y / a,this.z / a)
    }

    // Sound toggle function removed - handled directly in main.xml

    // Thêm hàm getButtonTooltip trước hàm Zb()
    function getButtonTooltip(name) {
        switch(name) {
            case "mapButton": return "Bản đồ";
            case "fullscreen": return "Toàn màn hình";
            case "measureButton": return "Đo kích thước";
            case "vrdesktop": return "Chế độ VR";
            case "mail": return "Liên hệ";
            case "share": return "Chia sẻ";
            case "settings": return "Cài đặt";
            case "logo": return "Thông tin";
            case "model3d": return "Tự động tham quan";
            case "soundButton": return "Âm thanh";
            case "customMapButton": return "Bản đồ";
            default: return name;
        }
    }
    
    function Zb() {
        $b();
        e.navPlugPan.forEach(a => {
            a = {
                id: a[0][0],
                name: a[0][1].toLowerCase(),
                visiblePanos: a[1],
                x: a[2][0],
                y: a[2][1],
                z: a[2][2],
                floorPos: {
                    x: a[2][0],
                    y: a[2][1],
                    z: a[2][2]
                },
                cameraPos: {
                    x: a[3][0],
                    y: a[3][1],
                    z: a[3][2]
                },
                height: a[3][1]
            };
            L.push(a);
            ac.push(a.id);
            a = t(m, a.name.toLowerCase(), "name");
            "undefined" !== typeof a && (m[a].click = !0)
        }
        )
    }

    (function(a) {
        var c = document.createElement("link");
        c.rel = "stylesheet";
        c.href = "./css/hint.css";
        document.head.appendChild(c);
    }
    )();
}
)
