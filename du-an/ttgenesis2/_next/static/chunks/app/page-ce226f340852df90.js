(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [974], {
        3082: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                default: () => et
            });
            var r = n(5155),
                s = n(2115),
                i = n(6766),
                o = n(6874),
                a = n.n(o);

            function l() {
                let [e, t] = (0, s.useState)(!1), [n, i] = (0, s.useState)(!1), o = e => {
                    t(!1), document.body.style.overflow = "auto", setTimeout(() => {
                        let t = document.getElementById(e);
                        if (t) {
                            let e = t.getBoundingClientRect(),
                                n = window.pageYOffset || document.documentElement.scrollTop,
                                r = e.top + n;
                            window.scrollTo({
                                top: r,
                                behavior: "smooth"
                            })
                        }
                    }, 300)
                };
                return (0, s.useEffect)(() => {
                    let e = () => {
                        window.scrollY > 50 ? i(!0) : i(!1)
                    };
                    return window.addEventListener("scroll", e), () => {
                        window.removeEventListener("scroll", e), document.body.style.overflow = "auto"
                    }
                }, []), (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)("header", {
                        className: "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-5",
                        children: (0, r.jsx)("div", {
                            className: "container mx-auto px-4 flex justify-end items-center",
                            children: (0, r.jsx)("button", {
                                onClick: () => {
                                    t(!e), e ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
                                },
                                className: "relative z-10 text-white focus:outline-none",
                                "aria-label": e ? "Đ\xf3ng menu" : "Mở menu",
                                children: (0, r.jsxs)("div", {
                                    className: "w-6 flex flex-col items-end gap-1.5",
                                    children: [(0, r.jsx)("span", {
                                        className: "block h-0.5 bg-white transition-all duration-300 ".concat(e ? "w-6 transform rotate-45 translate-y-2" : "w-6")
                                    }), (0, r.jsx)("span", {
                                        className: "block h-0.5 bg-white transition-all duration-300 ".concat(e ? "opacity-0" : "w-4")
                                    }), (0, r.jsx)("span", {
                                        className: "block h-0.5 bg-white transition-all duration-300 ".concat(e ? "w-6 transform -rotate-45 -translate-y-2" : "w-5")
                                    })]
                                })
                            })
                        })
                    }), (0, r.jsx)("div", {
                        className: "fixed inset-0 bg-[#13655c]/95 backdrop-blur-lg z-30 transition-all duration-500 ".concat(e ? "opacity-100 visible" : "opacity-0 invisible"),
                        children: (0, r.jsxs)("div", {
                            className: "h-full flex flex-col pt-24 pb-8 px-8",
                            children: [(0, r.jsx)("nav", {
                                className: "flex-1",
                                children: (0, r.jsx)("ul", {
                                    className: "space-y-2.5 text-center overflow-y-auto max-h-[78vh]",
                                    children: C_MENU.map((item) => (0, r.jsx)("li", {
                                        children: (0, r.jsx)(a(), {
                                            href: "#" + item.hash,
                                            className: "text-lg font-medium text-white hover:text-[#c9aa6f] transition-colors",
                                            onClick: () => o(item.hash),
                                            children: item.title
                                        })
                                    }, item.hash))
                                })
                            }), (0, r.jsx)]
                        })
                    })]
                })
            }


            function CdtHero(props) {
                let isMobile = !!(props && props.isMobile),
                    cfg = window.C_CDT.hero,
                    Tag = isMobile ? "section" : "div",
                    onScrollClick = () => {
                        if (isMobile) {
                            let el = document.getElementById("section_intro");
                            el && el.scrollIntoView({ behavior: "smooth" });
                        } else {
                            window.dispatchEvent(new CustomEvent("gotoSection", { detail: { index: 1, direction: 1 } }));
                        }
                    };
                return (0, r.jsxs)(Tag, {
                    id: isMobile ? "section1" : void 0,
                    className: "cdt-sec cdt-hero font-gotham",
                    children: [
                        (0, r.jsxs)("div", {
                            className: "cdt-hero__bg",
                            children: [
                                (0, r.jsx)("img", { src: cfg.bg, alt: "TT Genesis", className: "cdt-hero__sky" }),
                                (0, r.jsx)("div", { className: "cdt-hero__sky-tint" }),
                                (0, r.jsx)("div", {
                                    className: "cdt-hero__video-wrap",
                                    children: (0, r.jsx)("video", {
                                        autoPlay: !0,
                                        muted: !0,
                                        loop: !0,
                                        playsInline: !0,
                                        children: (0, r.jsx)("source", { src: cfg.video, type: "video/mp4" })
                                    })
                                }),
                                (0, r.jsx)("img", { src: cfg.fg, alt: "TT Genesis Towers", className: "cdt-hero__towers" })
                            ]
                        }),
                        isMobile
                            ? (0, r.jsx)("a", {
                                  href: "#",
                                  className: "cdt-mobile-logo-badge",
                                  children: (0, r.jsx)("img", {
                                      alt: "logo inf",
                                      src: C_HEADER.logo
                                  })
                              })
                            : (0, r.jsx)("div", {
                                  className: "fixed top-0 left-0 w-full z-30 h-28 flex items-center justify-between px-[5%]",
                                  children: (0, r.jsx)("a", {
                                      href: "#",
                                      className: "logo-container px-14 py-5 rounded-b-2xl border-[1px] border-[#FFE4BD] bg-[#0C5B3E] -mt-[2px]",
                                      children: (0, r.jsx)("img", {
                                          alt: "logo inf",
                                          src: C_HEADER.logo,
                                          className: "w-[4vw] h-auto object-contain"
                                      })
                                  })
                              }),
                        (0, r.jsxs)("div", {
                            className: "cdt-hero__content",
                            children: [
                                (0, r.jsxs)("p", {
                                    className: "cdt-hero__subtitle",
                                    children: [cfg.subTitleLines[0], (0, r.jsx)("br", {}), cfg.subTitleLines[1]]
                                }),
                                (0, r.jsx)("p", {
                                    className: "cdt-hero__desc",
                                    children: cfg.description
                                })
                            ]
                        }),
                        (0, r.jsxs)("button", {
                            type: "button",
                            onClick: onScrollClick,
                            className: "cdt-hero__scroll",
                            "aria-label": cfg.scrollLabel,
                            children: [
                                (0, r.jsx)("span", { className: "cdt-hero__mouse", children: (0, r.jsx)("span", {}) }),
                                (0, r.jsx)("span", { className: "cdt-hero__scroll-text", children: cfg.scrollLabel })
                            ]
                        })
                    ]
                });
            }

            function CdtIntro(props) {
                let isMobile = !!(props && props.isMobile),
                    cfg = window.C_CDT.intro,
                    Tag = isMobile ? "section" : "div";
                return (0, r.jsxs)(Tag, {
                    id: isMobile ? "section_intro" : void 0,
                    className: "cdt-sec cdt-intro font-gotham",
                    children: [
                        (0, r.jsx)("div", {
                            className: "cdt-intro__bg",
                            children: (0, r.jsx)("img", { src: cfg.bg, alt: "Khởi nguyên thịnh vượng TT Genesis" })
                        }),
                        (0, r.jsxs)("div", {
                            className: "cdt-intro__content",
                            children: [
                                (0, r.jsx)("p", { className: "cdt-intro__eyebrow", children: cfg.eyebrow }),
                                (0, r.jsx)("h2", { className: "cdt-intro__title cdt-gold-gradient-text", children: cfg.title }),
                                (0, r.jsx)("div", {
                                    className: "cdt-intro__paragraphs",
                                    children: cfg.paragraphs.map((p, idx) => (0, r.jsx)("p", { children: p }, idx))
                                })
                            ]
                        })
                    ]
                });
            }

            function CdtLocation(props) {
                let isMobile = !!(props && props.isMobile),
                    cfg = window.C_CDT.location,
                    Tag = isMobile ? "section" : "div",
                    [openCat, setOpenCat] = (0, s.useState)(-1),
                    [activePoint, setActivePoint] = (0, s.useState)(""),
                    mapRef = (0, s.useRef)(null),
                    onToggleCat = (idx) => {
                        setOpenCat((prev) => (prev === idx ? -1 : idx));
                        setActivePoint("");
                    },
                    onClickListPoint = (id) => {
                        let next = activePoint === id ? "" : id;
                        setActivePoint(next);
                        if (isMobile && next && mapRef.current) {
                            mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    },
                    onClickMapMark = (id) => {
                        let next = activePoint === id ? "" : id;
                        setActivePoint(next);
                        if (next) {
                            let cIdx = parseInt(id.split("-")[0], 10);
                            !Number.isNaN(cIdx) && setOpenCat(cIdx);
                        }
                    };
                return (0, r.jsxs)(Tag, {
                    id: isMobile ? "section_locate" : void 0,
                    className: "cdt-sec cdt-locate font-gotham",
                    children: [
                        (0, r.jsxs)("div", {
                            className: "cdt-locate__inner",
                            children: [
                                (0, r.jsxs)("h2", {
                                    className: "cdt-locate__title cdt-gold-gradient-text",
                                    children: [cfg.titleLines[0], (0, r.jsx)("br", {}), cfg.titleLines[1]]
                                }),
                                (0, r.jsxs)("div", {
                                    className: "cdt-locate__card",
                                    children: [
                                        (0, r.jsx)("div", {
                                            className: "cdt-locate__card-head",
                                            children: (0, r.jsx)("h3", { children: cfg.tableTitle })
                                        }),
                                        (0, r.jsx)("div", {
                                            className: "cdt-locate__card-body",
                                            onWheel: (ev) => {
                                                let el = ev.currentTarget;
                                                if (el.scrollHeight > el.clientHeight) ev.stopPropagation();
                                            },
                                            children: cfg.categories.map((cat, idx) => (0, r.jsxs)("div", {
                                                className: "cdt-locate__item item-location".concat(openCat === idx ? " active" : ""),
                                                children: [
                                                    (0, r.jsxs)("button", {
                                                        type: "button",
                                                        className: "cdt-locate__topic topic-location",
                                                        "aria-expanded": openCat === idx,
                                                        onClick: () => onToggleCat(idx),
                                                        children: [
                                                            (0, r.jsxs)("span", {
                                                                className: "cdt-locate__topic-left",
                                                                children: [
                                                                    (0, r.jsx)("img", { src: cat.icon, alt: "", width: 16, height: 16 }),
                                                                    (0, r.jsx)("span", { children: cat.title })
                                                                ]
                                                            }),
                                                            (0, r.jsx)("svg", {
                                                                className: "cdt-locate__chevron",
                                                                viewBox: "0 0 20 20",
                                                                fill: "none",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                children: (0, r.jsx)("path", {
                                                                    d: "M5 7.5L10 12.5L15 7.5",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "1.8",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    (0, r.jsx)("div", {
                                                        className: "cdt-locate__list list_locate",
                                                        children: (0, r.jsx)("ul", {
                                                            className: "cdt-locate__grid",
                                                            children: cat.points.map((pt) => (0, r.jsx)("li", {
                                                                children: (0, r.jsxs)("button", {
                                                                    type: "button",
                                                                    className: "cdt-locate__point js-map-point".concat(activePoint === pt.id ? " is-active" : ""),
                                                                    "data-map-point": pt.id,
                                                                    onClick: () => onClickListPoint(pt.id),
                                                                    children: [
                                                                        (0, r.jsx)("span", { className: "cdt-locate__point-name", children: pt.name }),
                                                                        pt.time ? (0, r.jsx)("span", { className: "cdt-locate__point-time", children: pt.time }) : null
                                                                    ]
                                                                })
                                                            }, pt.id))
                                                        })
                                                    })
                                                ]
                                            }, idx))
                                        })
                                    ]
                                }),
                                (0, r.jsx)("p", { className: "cdt-locate__note", children: cfg.note })
                            ]
                        }),
                        (0, r.jsxs)("div", {
                            ref: mapRef,
                            className: "map-gif",
                            children: [
                                (0, r.jsxs)("div", {
                                    className: "map-gif__stack",
                                    children: [
                                        (0, r.jsx)("img", {
                                            className: "map-gif__img",
                                            src: cfg.mapBase,
                                            srcSet: cfg.mapBase + " 1x, " + cfg.mapBase2x + " 2x",
                                            width: 1078,
                                            height: 906,
                                            alt: "Bản đồ vị trí TT Genesis và các điểm đến lân cận",
                                            decoding: "async"
                                        }),
                                        (0, r.jsxs)("svg", {
                                            className: "map-gif__svg",
                                            viewBox: "0 0 1078 906",
                                            fill: "none",
                                            "aria-hidden": "true",
                                            children: [
                                                (0, r.jsx)("g", {
                                                    className: "map-gif__routes",
                                                    strokeMiterlimit: "10",
                                                    strokeLinejoin: "round",
                                                    children: (0, r.jsx)("path", {
                                                        className: "map-gif__dash map-gif__dash--road",
                                                        d: "M392.9 268L406 295.3L397.8 358.4L492.7 610.9",
                                                        stroke: "#D4AF6A"
                                                    })
                                                }),
                                                (0, r.jsx)("image", { className: "map-gif__layer", href: cfg.mapMid2x, width: "1078", height: "906" }),
                                                (0, r.jsxs)("g", {
                                                    className: "map-gif__routes",
                                                    strokeMiterlimit: "10",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        (0, r.jsx)("path", {
                                                            className: "map-gif__dash map-gif__dash--road",
                                                            d: "M384.3 644.4L670.1 567.6L778 541.3L862.7 523.7L1070.7 518.1",
                                                            stroke: "#D4AF6A"
                                                        }),
                                                        (0, r.jsx)("path", {
                                                            className: "map-gif__dash map-gif__dash--planned",
                                                            d: "M650 128.5L672.7 274.8",
                                                            stroke: "#7BC8B2"
                                                        }),
                                                        (0, r.jsx)("path", {
                                                            className: "map-gif__dash map-gif__dash--metro",
                                                            d: "M497.9 188.7L645.4 286.8C649 289.8 650.9 294.4 650.4 299.1L644.7 354C644 359.9 640.1 361.2 634.5 363.3L580.4 384.3L660.7 562.3L736.9 834.9L827.1 903.2",
                                                            stroke: "#8CE0C8"
                                                        }),
                                                        (0, r.jsx)("path", {
                                                            className: "map-gif__dash map-gif__dash--metro",
                                                            d: "M476.5 190.6L481 428.4L479.9 442C478.5 445.5 482.1 455 484 461.8C485.8 468.2 488.4 473.5 490.4 478.8C547.2 618.5 604.5 761.9 661.3 901.6",
                                                            stroke: "#FFE4BD"
                                                        }),
                                                        (0, r.jsx)("path", {
                                                            className: "map-gif__dash map-gif__dash--metro",
                                                            d: "M91.8 597.9L305 515.9C306.6 515.3 308.4 515.2 310 515.8L377.7 518.8L391.4 525.8L503.1 506.5L589.5 526.6L644.3 486.1L607 405.4C605.3 401.7 607.1 397.3 610.9 395.9L698.8 363.1C698.8 363.1 706.2 363.5 704.4 355.3C698.9 329.9 672.6 221.4 672.6 221.4C668.5 222 666.3 222.6 666.2 222.6C662.3 223.4 577.4 238.6 561.9 176.3C546 112.5 593.5 90 621.1 83.3C673.5 70.6 684.1 0.5 684.1 0.5",
                                                            stroke: "#3EC7A7"
                                                        })
                                                    ]
                                                }),
                                                (0, r.jsx)("image", { className: "map-gif__layer", href: cfg.mapTop2x, width: "1078", height: "906" })
                                            ]
                                        })
                                    ]
                                }),
                                (0, r.jsxs)("svg", {
                                    className: "map-gif__svg map-gif__svg--marks",
                                    viewBox: "0 0 1078 906",
                                    fill: "none",
                                    children: [
                                        (0, r.jsx)("g", {
                                            className: "map-gif__marks",
                                            children: cfg.marks.map((mk) => {
                                                let isMarkActive = activePoint
                                                    ? activePoint === mk.id
                                                    : openCat >= 0 && mk.id.startsWith(openCat + "-");
                                                return (0, r.jsxs)("g", {
                                                    className: "map-gif__mark js-map-mark".concat(isMarkActive ? " is-active" : ""),
                                                    "data-map-point": mk.id,
                                                    onClick: () => onClickMapMark(mk.id),
                                                    children: [
                                                        (0, r.jsx)("line", {
                                                            className: "map-gif__mark-line",
                                                            x1: mk.line.x1,
                                                            y1: mk.line.y1,
                                                            x2: mk.line.x2,
                                                            y2: mk.line.y2,
                                                            pathLength: "1"
                                                        }),
                                                        mk.ring ? (0, r.jsx)("circle", {
                                                            className: "map-gif__mark-ring",
                                                            cx: mk.ring.cx,
                                                            cy: mk.ring.cy,
                                                            r: mk.ring.r
                                                        }) : null,
                                                        (0, r.jsx)("image", {
                                                            className: "map-gif__poi",
                                                            href: mk.poi.href,
                                                            x: mk.poi.x,
                                                            y: mk.poi.y,
                                                            width: mk.poi.width,
                                                            height: mk.poi.height
                                                        })
                                                    ]
                                                }, mk.id);
                                            })
                                        }),
                                        (0, r.jsxs)("g", {
                                            className: "map-gif__pin-wrap",
                                            children: [
                                                (0, r.jsx)("ellipse", { className: "map-gif__pulse", cx: "444.5", cy: "533.8", rx: "9", ry: "4.5", strokeWidth: "1.5" }),
                                                (0, r.jsx)("ellipse", { className: "map-gif__pulse map-gif__pulse--late", cx: "444.5", cy: "533.8", rx: "9", ry: "4.5", strokeWidth: "1.5" }),
                                                (0, r.jsx)("path", {
                                                    className: "map-gif__pin",
                                                    d: "M454.3 498.4C451.6 495.7 448.1 494.4 444.5 494.4C440.9 494.4 437.4 495.7 434.7 498.4C429.3 503.8 428.6 511.4 433.8 519.1C436.5 523 444.4 532.8 444.4 532.8C444.4 532.8 452.4 523 455 519.1C460.4 511.4 459.7 503.8 454.3 498.4ZM444.6 516.8C440 516.8 436.3 513.1 436.3 508.5C436.3 503.9 440 500.2 444.6 500.2C449.2 500.2 452.9 503.9 452.9 508.5C452.9 513.1 449.2 516.8 444.6 516.8Z",
                                                    fill: "#E8C37E",
                                                    stroke: "#073826",
                                                    strokeWidth: "1.2",
                                                    strokeMiterlimit: "10"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                });
            }

            function CdtPartners(props) {
                let isMobile = !!(props && props.isMobile),
                    cfg = window.C_CDT.partners,
                    Tag = isMobile ? "section" : "div",
                    invLoop = [...cfg.investors, ...cfg.investors],
                    durations = ["22s", "30s", "44s"];
                return (0, r.jsx)(Tag, {
                    id: isMobile ? "section10" : void 0,
                    className: "cdt-sec cdt-partner font-gotham",
                    children: (0, r.jsxs)("div", {
                        className: "cdt-partner__grid",
                        children: [
                            (0, r.jsxs)("div", {
                                className: "cdt-partner__left",
                                children: [
                                    (0, r.jsxs)("div", {
                                        className: "cdt-partner__card cdt-partner__card--top",
                                        children: [
                                            (0, r.jsxs)("div", {
                                                className: "cdt-partner__head",
                                                children: [
                                                    (0, r.jsx)("div", {
                                                        className: "cdt-badge-emerald",
                                                        children: (0, r.jsx)("img", { src: cfg.investBadge, alt: "" })
                                                    }),
                                                    (0, r.jsxs)("div", {
                                                        children: [
                                                            (0, r.jsx)("h2", { className: "cdt-partner__title", children: cfg.investTitle }),
                                                            (0, r.jsx)("p", { className: "cdt-partner__desc", children: cfg.investDesc })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, r.jsx)("div", {
                                                className: "cdt-marquee-box",
                                                style: { "--marquee-dur": "24s" },
                                                children: (0, r.jsx)("div", {
                                                    className: "cdt-marquee-track",
                                                    children: invLoop.map((inv, idx) => (0, r.jsx)("div", {
                                                        className: "cdt-partner-item",
                                                        children: (0, r.jsxs)("button", {
                                                            type: "button",
                                                            className: "cdt-invest-btn js-invest-trigger",
                                                            "data-investor": inv.name,
                                                            onClick: () => window.dispatchEvent(new CustomEvent("openInvestModal", { detail: inv })),
                                                            children: [
                                                                (0, r.jsx)("img", { src: inv.logo, alt: inv.name }),
                                                                (0, r.jsx)("span", { className: "cdt-sr-only", children: inv.name })
                                                            ]
                                                        })
                                                    }, idx))
                                                })
                                            })
                                        ]
                                    }),
                                    (0, r.jsxs)("div", {
                                        className: "cdt-partner__card cdt-partner__card--bottom",
                                        children: [
                                            (0, r.jsxs)("div", {
                                                className: "cdt-partner__head",
                                                children: [
                                                    (0, r.jsx)("div", {
                                                        className: "cdt-badge-emerald",
                                                        children: (0, r.jsx)("img", { src: cfg.partnerBadge, alt: "" })
                                                    }),
                                                    (0, r.jsxs)("div", {
                                                        children: [
                                                            (0, r.jsx)("h2", { className: "cdt-partner__title", children: cfg.partnerTitle }),
                                                            (0, r.jsx)("p", { className: "cdt-partner__desc", children: cfg.partnerDesc })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, r.jsx)("div", {
                                                className: "cdt-partner__groups",
                                                children: cfg.groups.map((grp, gIdx) => {
                                                    let loopLogos = [...grp.logos, ...grp.logos];
                                                    return (0, r.jsxs)("div", {
                                                        className: "cdt-partner__group-row",
                                                        children: [
                                                            (0, r.jsx)("p", { className: "cdt-partner__group-label", children: grp.label }),
                                                            (0, r.jsx)("div", {
                                                                className: "cdt-marquee-box",
                                                                style: { "--marquee-dur": durations[gIdx] || "28s" },
                                                                children: (0, r.jsx)("div", {
                                                                    className: "cdt-marquee-track",
                                                                    children: loopLogos.map((lg, lIdx) => (0, r.jsx)("div", {
                                                                        className: "cdt-partner-item",
                                                                        children: (0, r.jsx)("img", { src: lg.src, alt: lg.alt || "Partner logo" })
                                                                    }, lIdx))
                                                                })
                                                            })
                                                        ]
                                                    }, gIdx);
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, r.jsxs)("div", {
                                className: "cdt-award award_site",
                                children: [
                                    (0, r.jsx)("video", {
                                        autoPlay: !0,
                                        muted: !0,
                                        loop: !0,
                                        playsInline: !0,
                                        children: (0, r.jsx)("source", { src: cfg.awards.video, type: "video/mp4" })
                                    }),
                                    (0, r.jsxs)("div", {
                                        className: "cdt-award__content",
                                        children: [
                                            (0, r.jsxs)("div", {
                                                children: [
                                                    (0, r.jsx)("h3", { className: "cdt-award__title cdt-gold-gradient-text", children: cfg.awards.title }),
                                                    (0, r.jsx)("p", { className: "cdt-award__desc", children: cfg.awards.description })
                                                ]
                                            }),
                                            (0, r.jsx)("div", {
                                                className: "cdt-award__items",
                                                children: cfg.awards.items.map((aw, aIdx) => (0, r.jsxs)("div", {
                                                    className: "cdt-award__item",
                                                    children: [
                                                        (0, r.jsx)("figure", {
                                                            children: (0, r.jsx)("img", { src: aw.img, alt: aw.name })
                                                        }),
                                                        (0, r.jsx)("p", { className: "cdt-award__name", children: aw.name }),
                                                        (0, r.jsx)("p", { className: "cdt-award__year", children: aw.year })
                                                    ]
                                                }, aIdx))
                                            }),
                                            (0, r.jsx)("p", { className: "cdt-award__quote", children: cfg.awards.footerQuote })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                });
            }

            function CdtInvestModal() {
                let [inv, setInv] = (0, s.useState)(null),
                    icons = window.C_CDT.partners.modalIcons;
                (0, s.useEffect)(() => {
                    let onOpen = (ev) => setInv(ev.detail || null),
                        onKey = (ev) => {
                            if ("Escape" === ev.key) setInv(null);
                        };
                    window.addEventListener("openInvestModal", onOpen);
                    window.addEventListener("keydown", onKey);
                    return () => {
                        window.removeEventListener("openInvestModal", onOpen);
                        window.removeEventListener("keydown", onKey);
                    };
                }, []);
                if (!inv) return null;
                let rows = [
                    { label: "Address", val: inv.address },
                    { label: "Phone", val: inv.phone },
                    { label: "Email", val: inv.email }
                ].filter((rItem) => !!rItem.val);
                return (0, r.jsx)("div", {
                    id: "investModal",
                    role: "dialog",
                    "aria-modal": "true",
                    "data-state": "open",
                    className: "cdt-invest-modal-backdrop font-gotham",
                    onClick: (ev) => {
                        if (ev.target === ev.currentTarget) setInv(null);
                    },
                    onWheel: (ev) => ev.stopPropagation(),
                    children: (0, r.jsxs)("div", {
                        className: "cdt-invest-modal",
                        children: [
                            (0, r.jsxs)("button", {
                                type: "button",
                                className: "cdt-invest-modal__close",
                                "aria-label": "Close",
                                onClick: () => setInv(null),
                                children: [
                                    "Close ",
                                    (0, r.jsx)("img", { src: icons.close, alt: "", width: 12, height: 12 })
                                ]
                            }),
                            inv.logo ? (0, r.jsx)("div", {
                                className: "cdt-invest-modal__logo",
                                children: (0, r.jsx)("img", { src: inv.logo, alt: inv.name })
                            }) : null,
                            (0, r.jsx)("h4", { className: "cdt-invest-modal__name js-invest-name", children: inv.name }),
                            inv.website ? (0, r.jsxs)("a", {
                                href: inv.website,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "cdt-invest-modal__web",
                                children: [
                                    "Website: ",
                                    (0, r.jsx)("span", { children: inv.websiteLabel || inv.website }),
                                    (0, r.jsx)("img", { src: icons.link, alt: "", width: 12, height: 12 })
                                ]
                            }) : null,
                            (0, r.jsx)("p", { className: "cdt-invest-modal__desc js-invest-descript", children: inv.description }),
                            rows.length > 0 ? (0, r.jsx)("table", {
                                className: "cdt-invest-modal__table",
                                children: (0, r.jsx)("tbody", {
                                    children: rows.map((rw) => (0, r.jsxs)("tr", {
                                        children: [
                                            (0, r.jsx)("td", { children: rw.label }),
                                            (0, r.jsx)("td", { children: rw.val })
                                        ]
                                    }, rw.label))
                                })
                            }) : null
                        ]
                    })
                });
            }

            function c() {
                let e = (0, s.useRef)(null);
                return (0, r.jsx)("section", {
                    id: "section1",
                    ref: e,
                    className: "relative flex flex-col items-center justify-center text-white",
                    children: (0, r.jsx)("img", {
                        src: C_SECTIONS.section1.bgm,
                        alt: "Background",
                        className: " object-contain w-full h-full"
                    })
                })
            }
            var u = n(802);

            function d() {
                let [e, t] = (0, s.useState)(!1), [n, i] = (0, s.useState)(!1), o = (0, s.useRef)(null), a = (0, s.useRef)(null), l = (0, s.useRef)(null), c = (0, s.useRef)(null), d = (0, s.useRef)([]), h = e => {
                    e && !d.current.includes(e) && d.current.push(e)
                };
                return (0, s.useEffect)(() => () => {
                    t(!1), d.current = []
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (i(!0), console.log("MobileSection2 v\xe0o viewport")) : (i(!1), console.log("MobileSection2 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return o.current && e.observe(o.current), () => {
                        o.current && e.unobserve(o.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!n || !o.current || !a.current || !l.current || !c.current || 0 === d.current.length || e) return;
                    console.log("MobileSection2 thiết lập trạng th\xe1i ban đầu"), u.os.set(a.current, {
                        y: -40,
                        opacity: 0
                    }), u.os.set(l.current, {
                        y: -20,
                        opacity: 0
                    }), u.os.set(c.current, {
                        scale: .8,
                        opacity: 0
                    }), d.current.forEach((e, t) => {
                        u.os.set(e, {
                            x: -30,
                            opacity: 0
                        })
                    });
                    let r = setTimeout(() => {
                        console.log("MobileSection2 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                t(!0), console.log("MobileSection2 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(a.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power3.out"
                        }), e.to(l.current, {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            ease: "power2.out"
                        }, "-=0.4"), e.to(c.current, {
                            scale: 1,
                            opacity: 1,
                            duration: 1,
                            ease: "back.out(1.2)"
                        }, "-=0.3"), d.current.forEach((t, n) => {
                            e.to(t, {
                                x: 0,
                                opacity: 1,
                                duration: .6,
                                ease: "power2.out"
                            }, "-=".concat(n > 0 ? .4 : .3))
                        })
                    }, 100);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, s.useEffect)(() => {
                    if (!n) return;
                    let r = setTimeout(() => {
                        !e && a.current && l.current && c.current && d.current.length > 0 && (console.log("MobileSection2 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([a.current, l.current, c.current, ...d.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), t(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, r.jsxs)("section", {
                    ref: o,
                    id: "section2",
                    className: "relative flex flex-col text-white",
                    children: [
                      (0, r.jsx)("img", {
                        src: C_SECTIONS.section2.bgm,
                        alt: "Background",
                        className: "object-contain w-full h-full"
                      }),
                      (0, r.jsxs)("div", {
                        className: "flex flex-col items-center pt-[15%] absolute inset-0",
                        children: [
                            (0, r.jsx)("h1", {
                              children: C_SECTIONS.section2.title,
                              className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] uppercase text-center"
                            }),
                            (0, r.jsx)("h4", {
                              ref: l,
                              className: "text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center uppercase",
                              children: C_SECTIONS.section2.sub,
                            }),
                            (0, r.jsx)("div", {
                              ref: c,
                              className: "flex flex-col gap-[2vw] items-center justify-center rounded-full w-[100vw] h-[100vw] bg-[#0C5B3E99] mt-[8%] px-[12%] box-tron",
                              children: (0, r.jsx)("p", {
                                  ref: e => h(e),
                                  className: "text-[4.2vw]",
                                  children: (0, r.jsx)("div", {
                                      ref: h,
                                      className: "flex flex-col gap-[1.4vw] text-[1.125vw] font-light",
                                      children: C_SECTIONS.section2.data.descriptions.map(item =>
                                        (0, r.jsx)("p", {
                                          class: "",
                                          children: item
                                        })
                                      )
                                  })
                            })
                        })]
                    })]
                })
            }
            let h = C_SECTIONS.section3.data.list;

            function m() {
                let [e, t] = (0, s.useState)(!1), [n, i] = (0, s.useState)(!1), o = (0, s.useRef)(null), a = (0, s.useRef)(null), l = (0, s.useRef)(null), c = (0, s.useRef)(null), d = (0, s.useRef)([]), m = () => {
                    d.current = []
                }, p = e => {
                    e && !d.current.includes(e) && d.current.push(e)
                };
                return (0, s.useEffect)(() => () => {
                    t(!1), m()
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (i(!0), console.log("MobileSection3 v\xe0o viewport")) : (i(!1), console.log("MobileSection3 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return o.current && e.observe(o.current), () => {
                        o.current && e.unobserve(o.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!n || !o.current || !a.current || !l.current || !c.current || d.current.length < 4 || e) return;
                    console.log("MobileSection3 thiết lập trạng th\xe1i ban đầu"), u.os.set(a.current, {
                        y: -30,
                        opacity: 0
                    }), u.os.set(l.current, {
                        scale: .8,
                        opacity: 0
                    }), u.os.set(c.current, {
                        y: 30,
                        opacity: 0
                    }), d.current.forEach((e, t) => {
                        u.os.set(e, {
                            y: 20,
                            opacity: 0
                        })
                    });
                    let r = setTimeout(() => {
                        console.log("MobileSection3 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                t(!0), console.log("MobileSection3 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(a.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power2.out"
                        }), e.to(l.current, {
                            scale: 1,
                            opacity: 1,
                            duration: .8,
                            ease: "back.out(1.7)"
                        }, "-=0.5"), e.to(c.current, {
                            y: 0,
                            opacity: 1,
                            duration: .7,
                            ease: "power2.out"
                        }, "-=0.3"), d.current.forEach((t, n) => {
                            e.to(t, {
                                y: 0,
                                opacity: 1,
                                duration: .5,
                                ease: "power2.out"
                            }, "-=".concat(n > 0 ? .3 : .1))
                        })
                    }, 100);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, s.useEffect)(() => {
                    if (!n) return;
                    let r = setTimeout(() => {
                        !e && a.current && l.current && c.current && d.current.length > 0 && (console.log("MobileSection3 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([a.current, l.current, c.current, ...d.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), t(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, r.jsxs)("section", {
                    ref: o,
                    id: "section3",
                    className: "relative flex flex-col text-white",
                    children: [(0, r.jsx)("img", {
                        src: C_SECTIONS.section3.bgm,
                        alt: "Background",
                        className: "object-contain w-full h-full"
                    }), (0, r.jsxs)("div", {
                        className: "flex flex-col items-center absolute inset-0",
                        children: [(0, r.jsxs)("div", {
                            className: "relative w-screen",
                            children: [(0, r.jsx)("img", {
                                ref: a,
                                src: "/du-an/ttgenesis2/images/sec-3-sub-bg-mb.png",
                                alt: "title",
                                className: "w-screen h-auto absolute"
                            }), (0, r.jsx)("h1", {
                                children: C_SECTIONS.section3.title,
                                className: "w-screen h-auto absolute font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                            })]
                        }), (0, r.jsx)("div", {
                            ref: c,
                            className: "grid grid-cols-2 gap-x-[0.5vw] mt-[40%]",
                            children: h.map((e, t) => (0, r.jsxs)("div", {
                                ref: e => p(e),
                                className: "flex flex-col items-center gap-[3.2vw]",
                                children: [(0, r.jsx)("img", {
                                    alt: "img",
                                    src: e.img,
                                    className: "w-[13vw] h-auto object-contain"
                                }), (0, r.jsxs)("div", {
                                    className: "flex flex-col items-center gap-[1.5vw]",
                                    children: [(0, r.jsx)("h2", {
                                        children: e.title,
                                        className: " font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] h-[4.5vw] w-auto text-[6vw]"
                                    }), (0, r.jsx)("div", {
                                        className: "text-white leading-[1.6] font-gotham text-center mt-[10%] box-tin",
                                        children: e.description
                                    })]
                                })]
                            }, t))
                        })]
                    })]
                })
            }

            function p() {
                let [e, t] = (0, s.useState)(!1), [n, i] = (0, s.useState)(!1), o = (0, s.useRef)(null), a = (0, s.useRef)(null), l = (0, s.useRef)(null), c = (0, s.useRef)(null), d = (0, s.useRef)(null), h = (0, s.useRef)(null);
                return (0, s.useEffect)(() => () => {
                    t(!1)
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (i(!0), console.log("MobileSection4 v\xe0o viewport")) : (i(!1), console.log("MobileSection4 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return o.current && e.observe(o.current), () => {
                        o.current && e.unobserve(o.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!n || !o.current || !a.current || !l.current || !c.current || !d.current || !h.current || e) return;
                    console.log("MobileSection4 thiết lập trạng th\xe1i ban đầu"), u.os.set(a.current, {
                        y: -40,
                        opacity: 0
                    }), u.os.set(l.current, {
                        y: -20,
                        opacity: 0
                    }), u.os.set(c.current, {
                        x: -30,
                        opacity: 0
                    }), u.os.set(d.current, {
                        scale: .8,
                        opacity: 0
                    }), u.os.set(h.current, {
                        y: 40,
                        opacity: 0
                    });
                    let r = setTimeout(() => {
                        console.log("MobileSection4 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                t(!0), console.log("MobileSection4 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(a.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power3.out"
                        }), e.to(l.current, {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            ease: "power2.out"
                        }, "-=0.4"), e.to(c.current, {
                            x: 0,
                            opacity: 1,
                            duration: .7,
                            ease: "power2.out"
                        }, "-=0.3"), e.to(d.current, {
                            scale: 1,
                            opacity: 1,
                            duration: .9,
                            ease: "back.out(1.2)"
                        }, "-=0.3"), e.to(h.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power2.out"
                        }, "-=0.5")
                    }, 100);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, s.useEffect)(() => {
                    if (!n) return;
                    let r = setTimeout(() => {
                        !e && a.current && l.current && c.current && d.current && h.current && (console.log("MobileSection4 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([a.current, l.current, c.current, d.current, h.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), t(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, r.jsxs)("section", {
                    ref: o,
                    id: "section4",
                    className: "relative flex flex-col text-white",
                    children: [(0, r.jsx)("img", {
                        src: C_SECTIONS.section4.bgm,
                        alt: "background",
                        className: "object-contain w-full h-full"
                    }), (0, r.jsxs)("div", {
                        className: "flex flex-col items-center absolute inset-0",
                        children: [(0, r.jsx)("h1", {
                            children: C_SECTIONS.section4.title,
                            className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                        }), (0, r.jsx)("div", {
                            ref: l,
                            className: "text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center",
                            children: C_SECTIONS.section4.sub
                        }), (0, r.jsx)("div", {
                            ref: c,
                            className: "text-white text-[4vw] leading-[1.6] mt-[4%] text-justify transition-all px-4",
                            children: (0, r.jsx)("div", {
                                ref: h,
                                className: "flex flex-col gap-[1.4vw] text-[1.125vw] font-light",
                                children: C_SECTIONS.section4.data.descriptions.map(item =>
                                  (0, r.jsx)("p", {
                                    class: "",
                                    children: item
                                  })
                                )
                            })
                        }), (0, r.jsx)("div", {
                            ref: d,
                            className: "relative overflow-hidden rounded-full w-[calc(100vw-3px)] h-[100vw] bg-[#0C5B3E99] border-[1.5px] border-[#fae19a] mt-[5%] px-[4vw]",
                            children: (0, r.jsx)("div", {
                                className: "absolute inset-0 flex items-center justify-center z-10 box-tron",
                                children: (0, r.jsxs)("div", {
                                    className: "w-[93%] h-[90%] relative -z-10",
                                    children: [(0, r.jsx)("img", {
                                        alt: "banner",
                                        src: C_SECTIONS.section4.data.left_img,
                                        className: "w-full object-contain"
                                    })]
                                })
                            })
                        }), (0, r.jsx)("img", {
                            ref: h,
                            src: C_SECTIONS.section4.data.imgm,
                            alt: "img",
                            className: "mb-6 w-full h-auto px-[5vw] pt-[4%]"
                        })]
                    })]
                })
            }
            var f = n(9137),
                g = n.n(f),
                x = n(7677),
                w = n(1036),
                v = n(3724);

            function b() {
                let [e, t] = (0, s.useState)(0), [n, i] = (0, s.useState)(!1), [o, a] = (0, s.useState)(!1), l = (0, s.useRef)(null), c = (0, s.useRef)(null), d = (0, s.useRef)(null), h = (0, s.useRef)(null), m = (0, s.useRef)(null), p = (0, s.useRef)(null), f = (0, s.useRef)(null), b = (0, s.useRef)(null), y = C_SECTIONS.section5.data.list;
                return (0, s.useEffect)(() => () => {
                    i(!1)
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (a(!0), console.log("MobileSection5 v\xe0o viewport")) : (a(!1), console.log("MobileSection5 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return c.current && e.observe(c.current), () => {
                        c.current && e.unobserve(c.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!o || !c.current || !d.current || !h.current || !m.current || !p.current || !f.current || !b.current || n) return;
                    console.log("MobileSection5 thiết lập trạng th\xe1i ban đầu"), u.os.set(d.current, {
                        y: -40,
                        opacity: 0
                    }), u.os.set(h.current, {
                        y: -20,
                        opacity: 0
                    }), u.os.set(m.current, {
                        y: 20,
                        opacity: 0
                    }), u.os.set(p.current, {
                        scale: .9,
                        opacity: 0
                    }), u.os.set([f.current, b.current], {
                        opacity: 0,
                        x: e => 0 === e ? -20 : 20
                    });
                    let e = setTimeout(() => {
                        console.log("MobileSection5 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                i(!0), console.log("MobileSection5 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(d.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power3.out"
                        }), e.to(h.current, {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            ease: "power2.out"
                        }, "-=0.4"), e.to(m.current, {
                            y: 0,
                            opacity: 1,
                            duration: .7,
                            ease: "power2.out"
                        }, "-=0.3"), e.to(p.current, {
                            scale: 1,
                            opacity: 1,
                            duration: .9,
                            ease: "back.out(1.2)"
                        }, "-=0.4"), e.to([f.current, b.current], {
                            x: 0,
                            opacity: 1,
                            duration: .5,
                            stagger: .1,
                            ease: "power2.out"
                        }, "-=0.6")
                    }, 100);
                    return () => {
                        clearTimeout(e)
                    }
                }, [o, n]), (0, s.useEffect)(() => {
                    if (!o) return;
                    let e = setTimeout(() => {
                        !n && d.current && h.current && m.current && p.current && f.current && b.current && (console.log("MobileSection5 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([d.current, h.current, m.current, p.current, f.current, b.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), i(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(e)
                    }
                }, [o, n]), (0, s.useEffect)(() => (v.lX.bind("[data-fancybox]", {
                    loop: !0,
                    buttons: ["zoom", "slideShow", "fullScreen", "close"],
                    animationEffect: "fade",
                    transitionEffect: "fade"
                }), () => {
                    v.lX.destroy()
                }), []), (0, r.jsxs)("section", {
                    ref: c,
                    id: "section5",
                    className: "relative flex flex-col text-white",
                    children: [(0, r.jsx)("img", {
                        src: C_SECTIONS.section5.bgm,
                        alt: "background",
                        className: "object-cover absolute inset-0 w-full h-full"
                    }), (0, r.jsxs)("div", {
                        className: "jsx-3ae053cd33bf89a3 relative z-10 flex flex-col items-center justify-center px-4",
                        children: [(0, r.jsx)("h1", {
                            children: C_SECTIONS.section5.title,
                            className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                        }), (0, r.jsx)("div", {
                            ref: h,
                            className: "jsx-3ae053cd33bf89a3 text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center mb-6",
                            children: C_SECTIONS.section5.sub,
                        }), (0, r.jsx)("p", {
                            ref: m,
                            className: "jsx-3ae053cd33bf89a3 text-center h-[24vw]",
                            children: y[e].description
                        }), (0, r.jsxs)("div", {
                            ref: p,
                            className: "jsx-3ae053cd33bf89a3 w-full relative",
                            children: [(0, r.jsx)(x.RC, {
                                grabCursor: !0,
                                centeredSlides: !0,
                                loop: !0,
                                slidesPerView: 1,
                                onSwiper: e => {
                                    l.current = e
                                },
                                autoplay: {
                                    delay: 5e3,
                                    disableOnInteraction: !1
                                },
                                pagination: {
                                    clickable: !0
                                },
                                modules: [w.dK, w.Ij],
                                onRealIndexChange: e => t(e.realIndex),
                                className: "mobile-section5-swiper",
                                speed: 800,
                                children: y.map((e, t) => (0, r.jsx)(x.qr, {
                                    children: (0, r.jsxs)("div", {
                                        className: "jsx-3ae053cd33bf89a3 flex flex-col items-center pb-[12%]",
                                        children: [(0, r.jsx)("a", {
                                            href: e.img,
                                            "data-fancybox": "gallery",
                                            className: "jsx-3ae053cd33bf89a3 rounded-full overflow-hidden relative border-2 border-[#D4AF37] w-[95%] aspect-square shadow-lg mx-auto",
                                            children: (0, r.jsx)("img", {
                                                src: e.img,
                                                alt: e.title,
                                                className: "jsx-3ae053cd33bf89a3 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                            })
                                        }), (0, r.jsx)("div", {
                                            className: "jsx-3ae053cd33bf89a3 bg-[#0C5B3E] text-white text-sm font-medium px-[4vw] py-[1vw] rounded-full mt-[-5vw] z-20 border-2 border-white shadow-md",
                                            children: e.title
                                        })]
                                    })
                                }, t))
                            }), (0, r.jsx)("button", {
                                ref: f,
                                onClick: () => {
                                    var e;
                                    null == (e = l.current) || e.slidePrev()
                                },
                                className: "jsx-3ae053cd33bf89a3 absolute left-2 top-[40%] z-20 cursor-pointer text-white hover:scale-110 transition-transform duration-300",
                                children: (0, r.jsx)("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    className: "jsx-3ae053cd33bf89a3 w-8 h-8",
                                    children: (0, r.jsx)("path", {
                                        fillRule: "evenodd",
                                        d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
                                        clipRule: "evenodd",
                                        className: "jsx-3ae053cd33bf89a3"
                                    })
                                })
                            }), (0, r.jsx)("button", {
                                ref: b,
                                onClick: () => {
                                    var e;
                                    null == (e = l.current) || e.slideNext()
                                },
                                className: "jsx-3ae053cd33bf89a3 absolute right-2 top-[40%] z-20 cursor-pointer text-white hover:scale-110 transition-transform duration-300",
                                children: (0, r.jsx)("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    className: "jsx-3ae053cd33bf89a3 w-8 h-8",
                                    children: (0, r.jsx)("path", {
                                        fillRule: "evenodd",
                                        d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
                                        clipRule: "evenodd",
                                        className: "jsx-3ae053cd33bf89a3"
                                    })
                                })
                            })]
                        }), (0, r.jsx)(g(), {
                            id: "3ae053cd33bf89a3",
                            children: ".mobile-section5-swiper .swiper-pagination-bullet{background-color:white;opacity:.5;width:8px;height:8px}.mobile-section5-swiper .swiper-pagination-bullet-active{opacity:1;-webkit-transform:scale(1.2);-moz-transform:scale(1.2);-ms-transform:scale(1.2);-o-transform:scale(1.2);transform:scale(1.2)}"
                        })]
                    })]
                })
            }

            function y(e) {
                let {
                    text: t,
                    onClick: n,
                    children: s,
                    className: i = "",
                    buttonRef: o,
                    ...a
                } = e;
                return (0, r.jsx)("button", {
                    id: 'xin_bang_gia',
                    ref: o,
                    onClick: n,
                    className: "rounded-full btn-gradient border-2 md:border-[3px] border-white text-[#0C5B3E] text-[4vw] md:text-[1.2vw] font-medium px-[4vw] md:px-[2vw] py-[1.6vw] md:py-[0.3vw] md:pb-[0.6vw] flex items-center gap-[0.5vw] uppercase ".concat(i),
                    ...a,
                    children: s || t
                })
            }
            n(9732), n(2252), n(6970);
            var j = n(1700),
                C = n(2596),
                N = n(9688);

            function k() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return (0, N.QP)((0, C.$)(t))
            }
            let S = j.bL;
            j.l9;
            let T = j.ZL;
            j.bm;
            let E = s.forwardRef((e, t) => {
                let {
                    className: n,
                    ...s
                } = e;
                return (0, r.jsx)(j.hJ, {
                    ref: t,
                    className: k("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", n),
                    ...s
                })
            });
            E.displayName = j.hJ.displayName;
            let I = s.forwardRef((e, t) => {
                let {
                    className: n,
                    children: s,
                    ...i
                } = e;
                return (0, r.jsxs)(T, {
                    children: [(0, r.jsx)(E, {}), (0, r.jsxs)(j.UC, {
                        ref: t,
                        className: k("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", n),
                        ...i,
                        children: [s, (0, r.jsx)(j.bm, {
                            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                            children: (0, r.jsx)("span", {
                                className: "sr-only",
                                children: "Close"
                            })
                        })]
                    })]
                })
            });
            I.displayName = j.UC.displayName;
            let R = e => {
                let {
                    className: t,
                    ...n
                } = e;
                return (0, r.jsx)("div", {
                    className: k("flex flex-col space-y-1.5 text-center sm:text-left", t),
                    ...n
                })
            };
            R.displayName = "DialogHeader";
            let M = s.forwardRef((e, t) => {
                let {
                    className: n,
                    ...s
                } = e;
                return (0, r.jsx)(j.hE, {
                    ref: t,
                    className: k("text-lg font-semibold leading-none tracking-tight", n),
                    ...s
                })
            });

            function L(e) {
                let {
                    isOpen: t,
                    onClose: n
                } = e;
                return (0, r.jsx)(S, {
                    open: t,
                    onOpenChange: n,
                    children: (0, r.jsx)(I, {
                        className: "bg-white sm:max-w-[400px] p-0 overflow-hidden outline-none border-none rounded-2xl max-h-[90vh] w-[90vw] sm:w-auto",
                        children: (0, r.jsxs)("div", {
                            className: "p-4 sm:p-6 flex flex-col items-center",
                            children: [(0, r.jsx)(R, {
                                children: (0, r.jsx)(M, {})
                            }), (0, r.jsx)("div", {
                                className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-[scale-up_0.3s_ease-in-out]",
                                children: (0, r.jsx)("svg", {
                                    className: "w-8 h-8 sm:w-10 sm:h-10 text-green-500",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: (0, r.jsx)("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "3",
                                        d: "M5 13l4 4L19 7",
                                        className: "animate-[check-mark_0.4s_ease-in-out_0.3s_forwards] custom-check-mark"
                                    })
                                })
                            }), (0, r.jsxs)("div", {
                                className: "text-center space-y-2 animate-[fade-up_0.4s_ease-in-out_0.2s_forwards] opacity-0",
                                children: [(0, r.jsx)("div", {
                                    className: "text-xl sm:text-2xl font-bold !text-gray-900",
                                    children: "Đăng k\xfd th\xe0nh c\xf4ng!"
                                }), (0, r.jsx)("div", {
                                    className: "!text-gray-500 text-sm sm:text-base",
                                    children: "Ch\xfang t\xf4i sẽ li\xean hệ với Qu\xfd kh\xe1ch h\xe0ng trong thời gian sớm nhất để tư vấn th\xf4ng tin chi tiết về dự \xe1n."
                                })]
                            }), (0, r.jsx)("button", {
                                onClick: n,
                                style: {
                                    background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                                },
                                className: "mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-2.5 text-white rounded-full font-medium hover:opacity-90 transition-opacity animate-[fade-up_0.4s_ease-in-out_0.5s_forwards] opacity-0",
                                children: "Đ\xf3ng"
                            })]
                        })
                    })
                })
            }
            M.displayName = j.hE.displayName, s.forwardRef((e, t) => {
                let {
                    className: n,
                    ...s
                } = e;
                return (0, r.jsx)(j.VY, {
                    ref: t,
                    className: k("text-sm text-muted-foreground", n),
                    ...s
                })
            }).displayName = j.VY.displayName;
            let H = e => {
                try {
                    window.dataLayer && window.dataLayer.push({
                        event: "form_submit",
                        form_name: e.formType,
                        form_data: {
                            name: e.name,
                            phone: e.phone,
                            url: e.url,
                            ip: e.ip,
                            user_agent: e.userAgent
                        }
                    })
                } catch (e) {
                    console.error("Error pushing to dataLayer:", e)
                }
            };

            function B(e) {
                let {
                    isOpen: t,
                    onClose: n
                } = e, [o, a] = (0, s.useState)(!1), [l, c] = (0, s.useState)(!1), [u, d] = (0, s.useState)(!1), [h, m] = (0, s.useState)(!1), [p, f] = (0, s.useState)(""), [g, x] = (0, s.useState)("");
                return (0, s.useEffect)(() => {
                    if (x(window.navigator.userAgent), Promise.resolve({json:()=>Promise.resolve({ip:""})}).then(e => e.json()).then(e => f(e.ip)).catch(e => console.error("Error fetching IP:", e)), t) {
                        let e = setTimeout(() => {
                            a(!0)
                        }, 100);
                        return () => clearTimeout(e)
                    }
                    a(!1), c(!1), d(!1), m(!1)
                }, [t]), (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)(S, {
                        open: t,
                        onOpenChange: n,
                        children: (0, r.jsxs)(I, {
                            className: "bg-[linear-gradient(180deg,_#1D705D_0%,_#129463_100%)] sm:max-w-[800px] p-0 overflow-hidden outline-none border-none py-10",
                            children: [(0, r.jsxs)("button", {
                                onClick: n,
                                className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none border-none focus:ring-0 disabled:pointer-events-none",
                                children: [(0, r.jsxs)("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [(0, r.jsx)("line", {
                                        x1: "18",
                                        y1: "6",
                                        x2: "6",
                                        y2: "18"
                                    }), (0, r.jsx)("line", {
                                        x1: "6",
                                        y1: "6",
                                        x2: "18",
                                        y2: "18"
                                    })]
                                }), (0, r.jsx)("span", {
                                    className: "sr-only",
                                    children: "Đ\xf3ng"
                                })]
                            }), (0, r.jsxs)("div", {
                                children: [(0, r.jsx)(R, {
                                    children: (0, r.jsx)(M, {
                                        className: "text-center text-2xl md:text-3xl text-white mb-6",
                                        children: C_FORM.title
                                    })
                                }), (0, r.jsxs)("div", {
                                    className: "px-6",
                                    children: [(0, r.jsxs)("div", {
                                        className: "border border-white rounded-lg p-4 flex items-center justify-center space-x-2 mb-6",
                                        children: [(0, r.jsx)(i.default, {
                                            src: "/du-an/ttgenesis2/images/pdf_icon.png",
                                            alt: "PDF Icon",
                                            width: 24,
                                            height: 24
                                        }), (0, r.jsx)("span", {
                                            className: "text-white",
                                            children: C_FORM.bg_file
                                        })]
                                    }), (0, r.jsx)("div", {
                                        className: "border border-white rounded-lg p-4 mb-6",
                                        children: (0, r.jsxs)("div", {
                                            className: "space-y-3",
                                            children: C_FORM.notes.map(item => (0, r.jsxs)("div", {
                                                className: "flex items-center space-x-2 text-white",
                                                children: (0, r.jsx)("span", {
                                                    children: item
                                                })
                                            }))
                                        })
                                    }), (0, r.jsxs)("form", {
                                        id: "FormBaoGia",
                                        onSubmit: e => {
                                            console.log("Submit PdfModal"), e.preventDefault(), d(!0);
                                            let t = new FormData(e.target),
                                                n = t.get(C_FORM.ggf_entry.name.id),
                                                r = t.get(C_FORM.ggf_entry.phone.id);
                                            if (!n || !r) return console.log("Validate Fail");
                                            H({
                                                name: t.get(C_FORM.ggf_entry.name.id),
                                                phone: t.get(C_FORM.ggf_entry.phone.id),
                                                formType: "FormBaoGia",
                                                url: window.location.href,
                                                ip: p,
                                                userAgent: g
                                            }), fetch(e.target.action, {
                                                method: "POST",
                                                body: t,
                                                mode: "no-cors"
                                            }).then(() => {
                                                c(!0), d(!1), m(!0), setTimeout(() => e.target.reset(), 2e3)
                                            }).catch(e => {
                                                console.error("Error:", e), d(!1)
                                            })
                                        },
                                        action: "https://docs.google.com/forms/u/0/d/e/"+ C_FORM.ggf_id +"/formResponse",

                                        className: "space-y-4",
                                        children: [(0, r.jsx)("input", {
                                            type: "text",
                                            id: C_FORM.ggf_entry.name.id,
                                            name: C_FORM.ggf_entry.name.id,
                                            placeholder: C_FORM.ggf_entry.name.label,
                                            required: !0,
                                            autoComplete: "off",
                                            autoFocus: !1,
                                            readOnly: !o,
                                            tabIndex: o ? 0 : -1,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21C4FF] transition-all bg-white"
                                        }), (0, r.jsx)("input", {
                                            type: "tel",
                                            id: C_FORM.ggf_entry.phone.id,
                                            name: C_FORM.ggf_entry.phone.id,
                                            placeholder: C_FORM.ggf_entry.phone.label,
                                            required: !0,
                                            pattern: "(?:7|0\\d|\\+84\\d)\\d{8}",
                                            title: "Vui lòng nhập dữ liệu hợp lệ",
                                            autoComplete: "off",
                                            autoFocus: !1,
                                            readOnly: !o,
                                            tabIndex: o ? 0 : -1,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21C4FF] transition-all bg-white"
                                        }), (0, r.jsxs)("button", {
                                            type: "submit",
                                            disabled: l || u,
                                            className: "w-full bg-white text-[#0C5B3E] border-2 border-[#AD8444] px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-bold disabled:opacity-50",
                                            children: [(0, r.jsx)(i.default, {
                                                src: "/du-an/ttgenesis2/images/navigate_icon.png",
                                                alt: "Send",
                                                width: 16,
                                                height: 16
                                            }), u ? "ĐANG GỬI TH\xd4NG TIN..." : "GỬI TH\xd4NG TIN"]
                                        })]
                                    })]
                                })]
                            })]
                        })
                    }), (0, r.jsx)(L, {
                        isOpen: h,
                        onClose: () => {
                            m(!1), n()
                        }
                    })]
                })
            }

            function A() {
                let [e, t] = (0, s.useState)(!1), n = (0, s.useRef)(null), [i, o] = (0, s.useState)(!1), [a, l] = (0, s.useState)(!1), c = (0, s.useRef)(null), d = (0, s.useRef)(null), h = (0, s.useRef)([]), m = (0, s.useRef)(null);
                return (0, s.useEffect)(() => {
                    if (!n.current || !c.current || !d.current || 0 === h.current.length) return;
                    a || (u.os.set(c.current, {
                        y: -30,
                        opacity: 0
                    }), u.os.set(d.current, {
                        y: -20,
                        opacity: 0
                    }), h.current.forEach(e => {
                        u.os.set(e, {
                            y: 30,
                            opacity: 0
                        })
                    }), u.os.set(m.current, {
                        scale: .8,
                        opacity: 0
                    }));
                    let e = () => {
                            let e = u.os.timeline();
                            e.to(c.current, {
                                y: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }), e.to(d.current, {
                                y: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }, "-=0.5"), h.current.forEach((t, n) => {
                                e.to(t, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .6,
                                    ease: "power2.out"
                                }, "-=".concat(n > 0 ? .4 : .3))
                            }), e.to(m.current, {
                                scale: 1,
                                opacity: 1,
                                duration: .8,
                                ease: "back.out(1.7)"
                            }, "-=0.3"), l(!0)
                        },
                        t = new IntersectionObserver(t => {
                            t[0].isIntersecting && !i ? (console.log("MobileSection6 v\xe0o viewport, bắt đầu animation"), o(!0), a || e()) : !t[0].isIntersecting && i && (console.log("MobileSection6 rời khỏi viewport"), o(!1))
                        }, {
                            threshold: .2
                        });
                    return n.current && t.observe(n.current), () => {
                        n.current && t.unobserve(n.current)
                    }
                }, [i, a]), (0, r.jsx)("section", {
                    id: "section6",
                    className: "relative flex flex-col text-white",
                    children: [(0, r.jsx)("div", {
                        className: "absolute inset-0 bg-cover bg-center",
                        style: {
                            background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                        }
                      }),(0, r.jsxs)("div", {
                        ref: n,
                        className: "relative h-full w-full font-gotham overflow-hidden ",
                        children: [(0, r.jsxs)("div", {
                            className: " flex flex-col items-center justify-start h-auto z-10 px-[4vw] pb-[10vw] overflow-y-auto",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section6.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                            }), (0, r.jsx)("h2", {
                                ref: d,
                                className: "text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center",
                                children: C_SECTIONS.section6.sub
                            }), (0, r.jsx)("div", {
                                className: "flex flex-col gap-[4vw] w-full mt-[6vw]",
                                children: C_SECTIONS.section6.data.list.map((e, t) => (0, r.jsxs)("div", {
                                    ref: e => h.current[t] = e,
                                    className: "flex flex-col bg-white rounded-lg p-[5vw] sec-6-box",
                                    children: [(0, r.jsxs)("div", {
                                        className: "flex flex-row items-center mb-[3vw]",
                                        children: [(0, r.jsx)("img", {
                                            src: e.img,
                                            alt: "icon",
                                            className: "w-[10vw] h-auto mr-[3vw]"
                                        }), (0, r.jsx)("h3", {
                                            className: "text-[#0C5B3E] text-[3.4vw] leading-[1.4] font-gotham uppercase font-medium whitespace-pre-line flex-1",
                                            children: e.title
                                        })]
                                    }), (0, r.jsx)("p", {
                                        className: "text-[#233F35] text-[3.2vw] leading-[1.4] text-justify font-gotham whitespace-pre-line",
                                        children: e.description
                                    })]
                                }, t))
                            }), (0, r.jsx)(y, {
                                buttonRef: m,
                                text: C_SECTIONS.section6.data.button,
                                className: "mt-[8vw] text-[3.8vw] py-[2.5vw] px-[5vw]",
                                onClick: () => {
                                    t(!0)
                                }
                            }), (0, r.jsx)(B, {
                                isOpen: e,
                                onClose: () => t(!1)
                            })]
                        })]
                    })]
                })
            }

            function G(e) {
                let {
                    isOpen: t,
                    onClose: n,
                    title: o
                } = e, [a, l] = (0, s.useState)(!1), [c, u] = (0, s.useState)(!1), [d, h] = (0, s.useState)(!1), [m, p] = (0, s.useState)(!1), [f, g] = (0, s.useState)(""), [x, w] = (0, s.useState)("");
                return (0, s.useEffect)(() => {
                    if (w(window.navigator.userAgent), Promise.resolve({json:()=>Promise.resolve({ip:""})}).then(e => e.json()).then(e => g(e.ip)).catch(e => console.error("Error fetching IP:", e)), t) {
                        let e = setTimeout(() => {
                            l(!0)
                        }, 100);
                        return () => clearTimeout(e)
                    }
                    l(!1), u(!1), h(!1), p(!1)
                }, [t]), (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)(S, {
                        open: t,
                        onOpenChange: n,
                        children: (0, r.jsxs)(I, {
                            className: "bg-[linear-gradient(180deg,_#1D705D_0%,_#129463_100%)] sm:max-w-[800px] p-0 overflow-hidden outline-none border-none pt-10 ",
                            children: [(0, r.jsxs)("button", {
                                onClick: n,
                                className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none border-none focus:ring-0 disabled:pointer-events-none",
                                children: [(0, r.jsxs)("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [(0, r.jsx)("line", {
                                        x1: "18",
                                        y1: "6",
                                        x2: "6",
                                        y2: "18"
                                    }), (0, r.jsx)("line", {
                                        x1: "6",
                                        y1: "6",
                                        x2: "18",
                                        y2: "18"
                                    })]
                                }), (0, r.jsx)("span", {
                                    className: "sr-only",
                                    children: "Đ\xf3ng"
                                })]
                            }), (0, r.jsxs)("div", {
                                children: [(0, r.jsx)("img", {
                                    src: C_FORM.popup_img,
                                    alt: "Form header",
                                    className: "object-cover rounded-xl px-10 hidden lg:block"
                                }), (0, r.jsx)("img", {
                                    src: C_FORM.popup_img,
                                    alt: "Form header",
                                    className: "object-cover px-6 mt-2 lg:hidden"
                                }), (0, r.jsxs)("div", {
                                    className: "p-6",
                                    children: [(0, r.jsx)(R, {
                                        children: (0, r.jsx)(M, {
                                            className: "text-center text-2xl md:text-3xl text-white",
                                            children: null != o ? o : "ĐĂNG K\xdd NHẬN B\xc1O GI\xc1"
                                        })
                                    }), (0, r.jsxs)("form", {
                                        id: "FormDangKy",
                                        onSubmit: e => {
                                            console.log("RegisterModal"), e.preventDefault(), h(!0);
                                            let t = new FormData(e.target),
                                                n = t.get(C_FORM.ggf_entry.name.id),
                                                r = t.get(C_FORM.ggf_entry.phone.id);
                                            if (!n || !r) return console.log("Validate Fail");
                                            H({
                                                name: t.get(C_FORM.ggf_entry.name.id),
                                                phone: t.get(C_FORM.ggf_entry.phone.id),
                                                formType: "FormDangKy",
                                                url: window.location.href,
                                                ip: f,
                                                userAgent: x
                                            }), fetch(e.target.action, {
                                                method: "POST",
                                                body: t,
                                                mode: "no-cors"
                                            }).then(() => {
                                                u(!0), h(!1), p(!0), setTimeout(() => e.target.reset(), 2e3)
                                            }).catch(e => {
                                                console.error("Error:", e), h(!1)
                                            })
                                        },
                                        action: "https://docs.google.com/forms/u/0/d/e/"+ C_FORM.ggf_id +"/formResponse",
                                        className: "mt-4 space-y-4",
                                        children: [(0, r.jsx)("input", {
                                            type: "text",
                                            id: C_FORM.ggf_entry.name.id,
                                            name: C_FORM.ggf_entry.name.id,
                                            placeholder: C_FORM.ggf_entry.name.label,
                                            required: !0,
                                            autoComplete: "off",
                                            autoFocus: !1,
                                            readOnly: !a,
                                            tabIndex: a ? 0 : -1,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21C4FF] transition-all bg-white"
                                        }), (0, r.jsx)("input", {
                                            type: "tel",
                                            id: C_FORM.ggf_entry.phone.id,
                                            name: C_FORM.ggf_entry.phone.id,
                                            placeholder: C_FORM.ggf_entry.phone.label,
                                            required: !0,
                                            pattern: "(?:7|0\\d|\\+84\\d)\\d{8}",
                                            title: "Vui l\xf2ng nhập dữ liệu hợp lệ",
                                            autoComplete: "off",
                                            autoFocus: !1,
                                            readOnly: !a,
                                            tabIndex: a ? 0 : -1,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21C4FF] transition-all bg-white"
                                        }), (0, r.jsxs)("button", {
                                            type: "submit",
                                            disabled: c || d,
                                            className: "w-full bg-white text-[#0F3B4C] border-2 border-[#AD8444] px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-bold disabled:opacity-50",
                                            children: [(0, r.jsx)(i.default, {
                                                src: "/du-an/ttgenesis2/images/navigate_icon.png",
                                                alt: "Send",
                                                width: 16,
                                                height: 16
                                            }), d ? "ĐANG GỬI TH\xd4NG TIN..." : "GỬI TH\xd4NG TIN"]
                                        })]
                                    })]
                                })]
                            })]
                        })
                    }), (0, r.jsx)(L, {
                        isOpen: m,
                        onClose: () => {
                            p(!1), n()
                        }
                    })]
                })
            }

            function _() {
                let e = (0, s.useRef)(null),
                    [t, n] = (0, s.useState)(!1);
                return (0, r.jsxs)("section", {
                    id: "section7",
                    className: "relative flex flex-col items-center justify-center",
                    children: [(0, r.jsx)("img", {
                        src: C_SECTIONS.section7.bgm,
                        alt: "background",
                        className: "object-cover w-full"
                    }), (0, r.jsx)(y, {
                        buttonRef: e,
                        text: C_SECTIONS.section7.data.button,
                        className: "absolute bottom-[4%] text-[3.8vw] py-[2.5vw] px-[5vw]",
                        onClick: () => {
                            n(!0)
                        }
                    }), (0, r.jsx)(G, {
                        isOpen: t,
                        onClose: () => n(!1)
                    })]
                })
            }

            function D() {
                let [e, t] = (0, s.useState)(0), n = (0, s.useRef)(), i = (0, s.useRef)(null), [o, a] = (0, s.useState)(!1), l = (0, s.useRef)(null), c = (0, s.useRef)(null), d = (0, s.useRef)(null);
                return (0, s.useEffect)(() => {
                    if (!l.current || !c.current || !d.current) return;
                    o || (u.os.set(l.current, {
                        y: -30,
                        opacity: 0
                    }), u.os.set(c.current, {
                        x: -50,
                        opacity: 0
                    }), u.os.set(d.current, {
                        scale: .8,
                        opacity: 0
                    }));
                    let e = () => {
                            let e = u.os.timeline();
                            e.to(l.current, {
                                y: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }), e.to(c.current, {
                                x: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }, "-=0.4"), e.to(d.current, {
                                scale: 1,
                                opacity: 1,
                                duration: 1,
                                ease: "back.out(1.7)"
                            }, "-=0.3"), a(!0)
                        },
                        t = new IntersectionObserver(t => {
                            t[0].isIntersecting && !o && e()
                        }, {
                            threshold: .2
                        });
                    return i.current && t.observe(i.current), () => {
                        i.current && t.unobserve(i.current)
                    }
                }, [o]), (0, r.jsxs)("section", {
                    id: "section8",
                    ref: i,
                    className: "relative h-full w-full font-gotham overflow-hidden py-[2vw]",
                    children: [(0, r.jsx)("div", {
                        className: "absolute inset-0 bg-cover bg-center",
                        style: {
                            background: "linear-gradient(180deg, #174734 0%, #56A694 100%)"
                        }
                    }), (0, r.jsxs)("div", {
                        className: "flex flex-col items-center w-full h-full justify-start pt-[5vw]",
                        children: [(0, r.jsx)("h1", {
                            children: "MẶT BẰNG ĐIỂN HÌNH",
                            className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] uppercase text-center z-20 mt-6"
                        }), (0, r.jsx)("div", {
                            ref: c,
                            className: "flex flex-col gap-[3vw] mt-[5vw] z-20",
                            children: C_SECTIONS.section8.data.tabs.map(item => item.title).map((n, s) => (0, r.jsx)("button", {
                                onClick: () => t(s),
                                className: k("bg-none border-2 border-white/80 rounded-full w-[60vw] h-[10vw] text-[3.5vw] text-white", e == s ? "bg-[#B38F54]" : "bg-[#0C5B3E]"),
                                children: n
                            }, s))
                        }), (0, r.jsx)("div", {
                            ref: d,
                            className: "flex relative mt-[5vw]",
                            children: (0, r.jsx)(x.RC, {
                                loop: !0,
                                lazy: "true",
                                pagination: {
                                    clickable: !0
                                },
                                modules: [w.dK],
                                onSwiper: e => {
                                    n.current = e
                                },
                                className: "w-[94vw]",
                                children: C_SECTIONS.section8.data.tabs.map(item => item.list)[e].map((e, t) => (0, r.jsx)(x.qr, {
                                    children: (0, r.jsx)("div", {
                                        className: "mx-auto w-[92vw] h-[62vw] relative",
                                        children: (0, r.jsx)("img", {
                                            alt: "sld",
                                            src: e,
                                            className: "rounded-lg absolute inset-0"
                                        })
                                    })
                                }, e))
                            })
                        })]
                    })]
                })
            }

            function P() {
                let [e, t] = (0, s.useState)(!1), [n, i] = (0, s.useState)(!1), o = (0, s.useRef)(null), a = (0, s.useRef)(null), l = (0, s.useRef)(null), c = (0, s.useRef)([]), d = e => {
                    e && !c.current.includes(e) && c.current.push(e)
                };
                return (0, s.useEffect)(() => () => {
                    t(!1), c.current = []
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (i(!0), console.log("MobileSection9 v\xe0o viewport")) : (i(!1), console.log("MobileSection9 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return o.current && e.observe(o.current), () => {
                        o.current && e.unobserve(o.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!n || !o.current || !a.current || !l.current || 0 === c.current.length || e) return;
                    console.log("MobileSection9 thiết lập trạng th\xe1i ban đầu"), u.os.set(a.current, {
                        y: -40,
                        opacity: 0
                    }), u.os.set(l.current, {
                        scale: .8,
                        opacity: 0
                    }), c.current.forEach((e, t) => {
                        u.os.set(e, {
                            x: -30,
                            opacity: 0,
                            delay: .1 * t
                        })
                    });
                    let r = setTimeout(() => {
                        console.log("MobileSection9 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                t(!0), console.log("MobileSection9 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(a.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power3.out"
                        }), e.to(l.current, {
                            scale: 1,
                            opacity: 1,
                            duration: 1,
                            ease: "back.out(1.2)"
                        }, "-=0.5"), c.current.forEach((t, n) => {
                            e.to(t, {
                                x: 0,
                                opacity: 1,
                                duration: .6,
                                ease: "power2.out"
                            }, "-=".concat(n > 0 ? .4 : .3))
                        })
                    }, 100);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, s.useEffect)(() => {
                    if (!n) return;
                    let r = setTimeout(() => {
                        !e && a.current && l.current && c.current.length > 0 && (console.log("MobileSection9 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([a.current, l.current, ...c.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), t(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(r)
                    }
                }, [n, e]), (0, r.jsxs)("section", {
                    ref: o,
                    id: "section9",
                    className: "relative",
                    children: [(0, r.jsx)("img", {
                        src: "/du-an/ttgenesis2/images/bg-section9.jpg",
                        alt: "Background",
                        className: "object-contain w-full h-full"
                    }), (0, r.jsxs)("div", {
                        className: "absolute inset-0 flex flex-col items-center",
                        children: [(0, r.jsxs)("div", {
                            ref: l,
                            className: "z-10 flex flex-col gap-[0.4vw] items-center justify-center rounded-full border-2 border-[#fbe29d] w-[calc(100vw-4px)] h-[calc(100vw-4px)] bg-[#0C5B3E99] mt-[10%] px-[14vw]",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section9.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] uppercase text-center "
                            }),(0, r.jsx)("h2", {
                                className: "text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center",
                                children: C_SECTIONS.section9.sub
                            }),(0, r.jsx)("div", {
                                ref: h,
                                className: "flex flex-col gap-[1.4vw] text-[1.125vw] font-light mt-8",
                                children: C_SECTIONS.section9.data.descriptions.map(item =>
                                  (0, r.jsx)("p", {
                                    class: "",
                                    children: item
                                  })
                                )
                            })]
                        }), (0, r.jsx)("img", {
                            src: C_SECTIONS.section9.bgm,
                            alt: "Title",
                            className: "w-screen absolute bottom-0 z-20"
                        })]
                    })]
                })
            }

            function z() {
                let [e, t] = (0, s.useState)(!1), n = (0, s.useRef)(null), i = (0, s.useRef)(null), o = (0, s.useRef)(null), a = (0, s.useRef)(null), l = (0, s.useRef)(null), c = (0, s.useRef)(null);
                return (0, s.useEffect)(() => {
                    if (!n.current || !i.current || !o.current || !a.current || !l.current || !c.current) return;
                    e || (u.os.set(i.current, {
                        scale: 1.1,
                        opacity: 0
                    }), u.os.set(o.current, {
                        scale: 1.2,
                        opacity: 0
                    }), u.os.set(a.current, {
                        y: -40,
                        opacity: 0
                    }), u.os.set(l.current, {
                        x: 30,
                        opacity: 0
                    }), u.os.set(c.current, {
                        y: 40,
                        opacity: 0
                    }));
                    let r = () => {
                            let e = u.os.timeline();
                            e.to(i.current, {
                                scale: 1,
                                opacity: 1,
                                duration: 1.2,
                                ease: "power2.out"
                            }), e.to(o.current, {
                                scale: 1,
                                opacity: 1,
                                duration: 1,
                                ease: "back.out(1.2)"
                            }, "-=0.8"), e.to(a.current, {
                                y: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }, "-=0.5"), e.to(l.current, {
                                x: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }, "-=0.6"), e.to(c.current, {
                                y: 0,
                                opacity: 1,
                                duration: .8,
                                ease: "power2.out"
                            }, "-=0.4"), t(!0)
                        },
                        s = new IntersectionObserver(t => {
                            t[0].isIntersecting && !e && (console.log("MobileSection10 v\xe0o viewport, bắt đầu animation"), r())
                        }, {
                            threshold: .2
                        });
                    return n.current && s.observe(n.current), () => {
                        n.current && s.unobserve(n.current)
                    }
                }, [e]), (0, r.jsxs)("section", {
                    ref: n,
                    id: "section10",
                    className: "relative w-screen overflow-hidden",
                    children: [(0, r.jsx)("img", {
                        ref: i,
                        src: C_SECTIONS.section10.bgm,
                        alt: "Background",
                        className: "object-contain w-full h-full"
                    }), (0, r.jsx)("div", {
                        ref: o,
                        className: "absolute top-[-32%] left-[-20vw] z-10 flex flex-col gap-[0.4vw] items-center justify-center rounded-full border-2 border-[#fbe29d] w-[140vw] h-[140vw] bg-[#0C5B3E99] mt-[2%] px-[12vw]"
                    }), (0, r.jsxs)("div", {
                        className: "absolute inset-0 z-20 flex flex-col items-center",
                        children: [(0, r.jsx)("h1", {
                            children: C_SECTIONS.section10.title,
                            className: "z-20 font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                        }), (0, r.jsx)("h4", {
                            ref: l,
                            className: "z-20 text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center",
                            children: C_SECTIONS.section10.sub
                        }), (0, r.jsx)("p", {
                            ref: c,
                            className: "z-20 font-normal text-[3.5vw] mt-[3%] px-[5%] text-white",
                            children: (0, r.jsx)("div", {
                                ref: h,
                                className: "flex flex-col gap-[1.4vw] text-[1.125vw] font-light",
                                children: C_SECTIONS.section10.data.descriptions.map(item =>
                                  (0, r.jsx)("p", {
                                    class: "",
                                    children: item
                                  })
                                )
                            })
                        })]
                    })]
                })
            }
            var F = n(6072),
                O = n(1255);

            function V(e) {
                var t, n, i;
                let {
                    isOpen: o,
                    onClose: a,
                    news: l
                } = e, c = (0, s.useRef)(null), u = (0, s.useRef)(null);
                return ((0, s.useEffect)(() => {
                    if (o) {
                        let e = O.nu.getAll();
                        return e.forEach(e => e.disable()), () => {
                            e.forEach(e => e.enable())
                        }
                    }
                }, [o]), (0, s.useEffect)(() => {
                    let e = e => {
                            e.stopPropagation()
                        },
                        t = u.current;
                    if (t && o) return t.addEventListener("wheel", e, {
                        passive: !1
                    }), () => {
                        t.removeEventListener("wheel", e)
                    }
                }, [o]), (0, s.useEffect)(() => {
                    if (o && c.current) {
                        let e = () => {
                            c.current.querySelectorAll("img").forEach(e => {
                                if (e.style.width = "100% !important", e.style.maxWidth = "100% !important", e.style.height = "auto !important", e.style.borderRadius = "0.5rem !important", e.style.margin = "1.5rem 0 !important", e.style.display = "block !important", e.style.objectFit = "cover", e.classList.add("news-dialog-img"), !e.parentElement.classList.contains("img-wrapper")) {
                                    let t = document.createElement("div");
                                    t.className = "img-wrapper w-full my-4", e.parentNode.insertBefore(t, e), t.appendChild(e)
                                }
                            })
                        };
                        e(), setTimeout(e, 100)
                    }
                }, [o, l]), (0, s.useEffect)(() => {
                    if (c.current && o && l) {
                        let e = document.createElement("style");
                        return e.textContent = "\n        .news-dialog-content p, .news-dialog-content div {\n          color: #333333 !important;\n          font-family: inherit !important;\n          font-size: 1rem !important;\n          line-height: 1.75 !important;\n          margin: 1rem 0 !important;\n        }\n\n        .news-dialog-content h1, .news-dialog-content h2, .news-dialog-content h3, \n        .news-dialog-content h4, .news-dialog-content h5, .news-dialog-content h6 {\n          color: #0C5B3E !important;\n          font-family: inherit !important;\n          font-weight: bold !important;\n          margin: 1.5rem 0 0.75rem 0 !important;\n        }\n\n        .news-dialog-content span {\n          color: #333333 !important;\n          font-family: inherit !important;\n        }\n\n        .news-dialog-content strong, .news-dialog-content b {\n          color: #0C5B3E !important;\n          font-weight: bold !important;\n        }\n\n        .news-dialog-content i, .news-dialog-content em {\n          color: #333333 !important;\n          font-style: italic !important;\n        }\n\n        .news-dialog-content img, .news-dialog-img {\n          width: 100% !important;\n          max-width: 100% !important;\n          height: auto !important;\n          border-radius: 0.5rem !important;\n          margin: 1.5rem 0 !important;\n          display: block !important;\n          object-fit: cover !important;\n        }\n\n        .news-dialog-content .img-wrapper {\n          width: 100% !important;\n          margin: 1.5rem 0 !important;\n          display: block !important;\n        }\n\n        .news-dialog-content * {\n          background-color: transparent !important;\n        }\n      ", document.head.appendChild(e), () => {
                            document.head.removeChild(e)
                        }
                    }
                }, [o, l]), l) ? (0, r.jsx)(S, {
                    open: o,
                    onOpenChange: a,
                    children: (0, r.jsxs)(I, {
                        ref: u,
                        className: "max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-[#333333]",
                        onWheel: e => e.stopPropagation(),
                        onClick: e => e.stopPropagation(),
                        children: [(0, r.jsx)(R, {
                            children: (0, r.jsx)(M, {
                                className: "text-2xl font-bold text-center text-[#0C5B3E]",
                                children: l.title
                            })
                        }), (0, r.jsxs)("div", {
                            className: "jsx-162b5226928812b5 mt-4",
                            children: [(0, r.jsx)("div", {
                                className: "jsx-162b5226928812b5 aspect-video w-full overflow-hidden rounded-lg mb-6",
                                children: (0, r.jsx)("img", {
                                    src: "".concat(null == (i = l.thumbnail) || null == (n = i.data) || null == (t = n.attributes) ? void 0 : t.url),
                                    alt: l.title,
                                    className: "jsx-162b5226928812b5 w-full h-full object-cover"
                                })
                            }), (0, r.jsx)("div", {
                                ref: c,
                                dangerouslySetInnerHTML: {
                                    __html: l.content
                                },
                                className: "jsx-162b5226928812b5 prose prose-lg max-w-none news-dialog-content text-[#333333] prose-headings:text-[#0C5B3E] prose-p:text-[#333333] prose-strong:text-[#0C5B3E] prose-img:rounded-lg prose-img:my-6"
                            })]
                        }), (0, r.jsx)(g(), {
                            id: "162b5226928812b5",
                            children: ".news-dialog-content p{color:#333!important;font-family:inherit!important;font-size:1rem!important;line-height:1.75!important;margin:1rem 0!important}.news-dialog-content h1,.news-dialog-content h2,.news-dialog-content h3,.news-dialog-content h4,.news-dialog-content h5,.news-dialog-content h6{color:#0C5B3E!important;font-family:inherit!important;font-weight:bold!important;margin:1.5rem 0 .75rem 0!important}.news-dialog-content span{color:#333!important;font-family:inherit!important}.news-dialog-content strong,.news-dialog-content b{color:#0C5B3E!important;font-weight:bold!important}.news-dialog-content i,.news-dialog-content em{color:#333!important;font-style:italic!important}.news-dialog-content img,.news-dialog-img{width:100%!important;max-width:100%!important;height:auto!important;-webkit-border-radius:.5rem!important;-moz-border-radius:.5rem!important;border-radius:.5rem!important;margin:1.5rem 0!important;display:block!important;-o-object-fit:cover!important;object-fit:cover!important}.news-dialog-content .img-wrapper{width:100%!important;margin:1.5rem 0!important;display:block!important}.news-dialog-content *{background-color:transparent!important}"
                        })]
                    })
                }) : null
            }
            async function q(e) {
                let t = new Headers;
                t.append("Authorization", "Bearer " + POST_API_TOKEN);
                let n = await fetch(e, {
                    method: "GET",
                    headers: t,
                    redirect: "follow",
                    cache: "no-store"
                });
                if (!n.ok) throw Error("Failed to fetch data");
                return (await n.json())
            }

            function Z() {
                let {
                    posts: e,
                    isError: t,
                    isLoading: n
                } = function() {
                    let {
                        data: e,
                        error: t,
                        isLoading: n
                    } = (0, F.Ay)("/du-an/ttgenesis2/api/posts.json", q);
                    return {
                        posts: e,
                        isLoading: n,
                        isError: t
                    }
                }(), i = (0, s.useRef)(), [o, a] = (0, s.useState)(0), [l, c] = (0, s.useState)(!1), [d, h] = (0, s.useState)(!1), [m, p] = (0, s.useState)(null), f = (0, s.useRef)(null), g = (0, s.useRef)(null), w = (0, s.useRef)(null), v = (0, s.useRef)(null), b = (0, s.useRef)(null);
                (0, s.useEffect)(() => () => {
                    c(!1)
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (h(!0), console.log("MobileSection11 v\xe0o viewport")) : (h(!1), console.log("MobileSection11 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return f.current && e.observe(f.current), () => {
                        f.current && e.unobserve(f.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!d || !f.current || !g.current || !w.current || !v.current || !b.current || l) return;
                    console.log("MobileSection11 thiết lập trạng th\xe1i ban đầu"), u.os.set(g.current, {
                        y: -50,
                        opacity: 0
                    }), u.os.set(w.current, {
                        y: -30,
                        opacity: 0
                    }), u.os.set(v.current, {
                        y: 30,
                        opacity: 0
                    }), u.os.set(b.current, {
                        y: 20,
                        opacity: 0
                    });
                    let e = setTimeout(() => {
                        console.log("MobileSection11 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                c(!0), console.log("MobileSection11 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(g.current, {
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power2.out"
                        }), e.to(w.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power2.out"
                        }, "-=0.5"), e.to(v.current, {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out"
                        }, "-=0.3"), e.to(b.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power2.out"
                        }, "-=0.5")
                    }, 100);
                    return () => {
                        clearTimeout(e)
                    }
                }, [d, l, n]), (0, s.useEffect)(() => {
                    if (!d) return;
                    let e = setTimeout(() => {
                        !l && g.current && w.current && v.current && b.current && (console.log("MobileSection11 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([g.current, w.current, v.current, b.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), c(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(e)
                    }
                }, [d, l]);
                let y = (e => {
                        if (!e) return [];
                        let t = [];
                        for (let n = 0; n < e.length; n += 3) t.push(e.slice(n, n + 3));
                        return t
                    })(e),
                    j = e => {
                        e.link ? window.open(e.link, "_blank", "noopener,noreferrer") : p(e)
                    };
                return t ? (0, r.jsx)("div", {
                    className: "relative h-full w-full font-gotham overflow-hidden flex items-center justify-center",
                    children: (0, r.jsx)("div", {
                        className: "text-white text-[5vw]",
                        children: "C\xf3 lỗi xảy ra khi tải dữ liệu"
                    })
                }) : (0, r.jsxs)("section", {
                    ref: f,
                    id: "section11",
                    className: "relative flex flex-col text-white",
                    children: [(0, r.jsx)("div", {
                        className: "absolute inset-0 bg-cover bg-center",
                        style: {
                            background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                        }
                    }), (0, r.jsxs)("div", {
                        className: "flex flex-col items-center w-full h-full justify-center",
                        children: [(0, r.jsx)("h1", {
                            children: C_SECTIONS.section11.title,
                            className: "z-20 font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                        }), (0, r.jsx)("div", {
                            ref: w,
                            className: "z-20 text-white text-[4vw] leading-[1.4] font-medium mt-[3vw] text-center",
                            children: C_SECTIONS.section11.sub
                        }), (0, r.jsx)("div", {
                            ref: v,
                            className: "flex items-center relative px-[5vw] w-full",
                            children: n ? (0, r.jsx)("div", {
                                className: "w-full mt-[5vw] flex items-center justify-center",
                                children: (0, r.jsx)("div", {
                                    className: "text-white text-[5vw]",
                                    children: "Đang tải..."
                                })
                            }) : (0, r.jsx)(x.RC, {
                                loop: !1,
                                slidesPerView: 1,
                                spaceBetween: 20,
                                pagination: {
                                    clickable: !0,
                                    enabled: !0
                                },
                                allowTouchMove: !0,
                                onSwiper: e => {
                                    i.current = e
                                },
                                onSlideChange: e => a(e.activeIndex),
                                className: "w-full mt-[6vw]",
                                children: y.map((e, t) => (0, r.jsx)(x.qr, {
                                    className: "w-full",
                                    children: (0, r.jsx)("div", {
                                        className: "flex flex-col gap-[3vw]",
                                        children: e.map((e, t) => {
                                            let n = e;
                                            return (0, r.jsxs)("div", {
                                                onClick: () => j(n),
                                                className: "bg-white flex w-full rounded-xl overflow-hidden shadow-md p-[3vw] cursor-pointer box-tin",
                                                children: [(0, r.jsx)("div", {
                                                    className: "w-[40%] h-[30vw] overflow-hidden",
                                                    children: (0, r.jsx)("img", {
                                                        alt: "thumbnail",
                                                        src: n._embedded && n._embedded['wp:featuredmedia'] && n._embedded['wp:featuredmedia'][0] && n._embedded['wp:featuredmedia'][0]['media_details'] && n._embedded['wp:featuredmedia'][0]['media_details']['sizes'] ? n._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url'] : "/du-an/ttgenesis2/images/default-thumbnail.jpg",
                                                        className: "w-full h-full object-cover rounded-xl"
                                                    })
                                                }), (0, r.jsxs)("div", {
                                                    className: "flex-1 px-[2vw] flex flex-col justify-between",
                                                    children: [(0, r.jsxs)("div", {
                                                        children: [(0, r.jsx)("div", {
                                                            className: "text-[3.4vw] leading-[1.4] font-medium text-[#0C5B3E] line-clamp-3",
                                                            children: n.title.rendered.replace(/(<([^>]+)>)/ig, '')
                                                        }), (0, r.jsx)("div", {
                                                            className: "text-[2.6vw] text-[#233F35] mt-[1vw] line-clamp-2",
                                                            children: n.excerpt.rendered.replace(/(<([^>]+)>)/ig, '')
                                                        })]
                                                    }), (0, r.jsx)("div", {
                                                        className: "flex justify-between items-center mt-auto",
                                                        children: (0, r.jsxs)("div", {
                                                            className: "flex items-center text-[#0C5B3E] text-[2.8vw] font-medium",
                                                            children: ["XEM TH\xcaM", (0, r.jsx)("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "ml-[1vw]",
                                                                children: (0, r.jsx)("path", {
                                                                    d: "M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.08",
                                                                    stroke: "#0C5B3E",
                                                                    strokeWidth: "2",
                                                                    strokeMiterlimit: "10",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round"
                                                                })
                                                            })]
                                                        })
                                                    })]
                                                })]
                                            }, t)
                                        })
                                    })
                                }, t))
                            })
                        }), e && (0, r.jsx)("div", {
                            ref: b,
                            className: "flex items-center gap-[3vw] my-[4vw]",
                            children: Array.from({
                                length: Math.ceil((e.length || 0) / 3)
                            }).map((e, t) => (0, r.jsx)("div", {
                                onClick: () => {
                                    var e;
                                    null == (e = i.current) || e.slideTo(t), a(t)
                                },
                                className: "cursor-pointer text-[3.5vw] flex items-center justify-center h-[8vw] w-[8vw] rounded-full border-double border-[3px] ".concat(o === t ? "bg-white text-[#0C5B3E] border-[#0C5B3E]" : " border-white bg-[#0C5B3E] text-white"),
                                children: t + 1
                            }, t))
                        })]
                    }), (0, r.jsx)(V, {
                        isOpen: !!m,
                        onClose: () => p(null),
                        news: m
                    })]
                })
            }

            function U() {
                let [e, t] = (0, s.useState)({
                    fullName: "",
                    phoneNumber: ""
                }), [n, i] = (0, s.useState)(!1), [o, a] = (0, s.useState)(!1), [l, c] = (0, s.useState)(""), [d, h] = (0, s.useState)(""), [m, p] = (0, s.useState)(""), [f, g] = (0, s.useState)(!1), [x, w] = (0, s.useState)(!1), [v, b] = (0, s.useState)(!1), y = (0, s.useRef)(null), j = (0, s.useRef)(null), C = (0, s.useRef)(null), N = (0, s.useRef)(null), k = (0, s.useRef)(null), S = (0, s.useRef)(null), T = (0, s.useRef)(null), E = (0, s.useRef)(null), I = (0, s.useRef)(null), R = (0, s.useRef)(null);
                (0, s.useEffect)(() => () => {
                    w(!1)
                }, []), (0, s.useEffect)(() => {
                    let e = new IntersectionObserver(e => {
                        e[0].isIntersecting ? (b(!0), console.log("MobileSection12 v\xe0o viewport")) : (b(!1), console.log("MobileSection12 rời khỏi viewport"))
                    }, {
                        threshold: [.1, .2, .3]
                    });
                    return y.current && e.observe(y.current), () => {
                        y.current && e.unobserve(y.current)
                    }
                }, []), (0, s.useEffect)(() => {
                    if (!v || !y.current || !j.current || !C.current || !N.current || !k.current || !S.current || !T.current || !E.current || !I.current || !R.current || x) return;
                    console.log("MobileSection12 thiết lập trạng th\xe1i ban đầu"), u.os.set(j.current, {
                        y: -30,
                        opacity: 0
                    }), u.os.set(C.current, {
                        scale: .8,
                        opacity: 0
                    }), u.os.set([N.current, k.current], {
                        y: -20,
                        opacity: 0
                    }), u.os.set(S.current, {
                        y: 20,
                        opacity: 0
                    }), u.os.set(E.current, {
                        y: 20,
                        opacity: 0
                    }), u.os.set(I.current, {
                        y: 30,
                        opacity: 0
                    }), u.os.set(R.current, {
                        y: 20,
                        opacity: 0
                    });
                    let e = setTimeout(() => {
                        console.log("MobileSection12 bắt đầu animation");
                        let e = u.os.timeline({
                            onComplete: () => {
                                w(!0), console.log("MobileSection12 đ\xe3 ho\xe0n th\xe0nh animation")
                            }
                        });
                        e.to(j.current, {
                            y: 0,
                            opacity: 1,
                            duration: .8,
                            ease: "power3.out"
                        }), e.to(C.current, {
                            scale: 1,
                            opacity: 1,
                            duration: 1,
                            ease: "back.out(1.2)"
                        }, "-=0.4"), e.to([N.current, k.current], {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            stagger: .1,
                            ease: "power2.out"
                        }, "-=0.7"), e.to(S.current, {
                            y: 0,
                            opacity: 1,
                            duration: .7,
                            ease: "power2.out"
                        }, "-=0.3"), e.to(E.current, {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            ease: "power2.out"
                        }, "-=0.2"), e.to(I.current, {
                            y: 0,
                            opacity: 1,
                            duration: .7,
                            ease: "power2.out"
                        }, "-=0.3"), e.to(R.current, {
                            y: 0,
                            opacity: 1,
                            duration: .6,
                            ease: "power2.out"
                        }, "-=0.3")
                    }, 100);
                    return () => {
                        clearTimeout(e)
                    }
                }, [v, x]), (0, s.useEffect)(() => {
                    if (!v) return;
                    let e = setTimeout(() => {
                        !x && j.current && C.current && N.current && k.current && S.current && E.current && I.current && R.current && (console.log("MobileSection12 safety fallback - hiển thị c\xe1c phần tử"), u.os.set([j.current, C.current, N.current, k.current, S.current, E.current, I.current, R.current], {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1
                        }), w(!0))
                    }, 2e3);
                    return () => {
                        clearTimeout(e)
                    }
                }, [v, x]), (0, s.useEffect)(() => {
                    h(window.navigator.userAgent), Promise.resolve({json:()=>Promise.resolve({ip:""})}).then(e => e.json()).then(e => c(e.ip)).catch(e => {
                        console.error("Error fetching IP:", e), p("Kh\xf4ng thể kết nối đến server. Vui l\xf2ng thử lại sau.")
                    })
                }, []);
                let M = e => {
                        let {
                            name: n,
                            value: r
                        } = e.target;
                        t(e => ({
                            ...e,
                            [n]: r
                        })), p("")
                    },
                    H = async n => {
                        n.preventDefault();
                        try {
                            i(!0), p("");
                            let n = new FormData,
                                r = e.fullName,
                                s = e.phoneNumber;
                            if (!r || !s) return console.log("Validate Fail");
                            n.append(C_FORM.ggf_entry.name.id, e.fullName), n.append(C_FORM.ggf_entry.phone.id, e.phoneNumber), await fetch("https://docs.google.com/forms/u/0/d/e/" + C_FORM.ggf_id + "/formResponse", {
                                method: "POST",
                                body: n,
                                mode: "no-cors"
                            }), window.dataLayer && window.dataLayer.push({
                                event: "form_submit",
                                formType: "FormSection12",
                                formData: {
                                    name: e.fullName,
                                    phone: e.phoneNumber,
                                    url: window.location.href,
                                    ip: l,
                                    userAgent: d
                                }
                            }), a(!0), t({
                                fullName: "",
                                phoneNumber: ""
                            })
                        } catch (e) {
                            console.error("Error submitting form:", e), p("Đ\xe3 c\xf3 lỗi xảy ra. Vui l\xf2ng thử lại sau.")
                        } finally {
                            i(!1)
                        }
                    };
                return (0, r.jsx)("section", {
                    ref: y,
                    id: "section12",
                    className: "relative flex flex-col text-white",
                    children: (0, r.jsxs)("div", {
                        className: "relative",
                        children: [(0, r.jsx)(L, {
                            isOpen: o,
                            onClose: () => a(!1)
                        }), (0, r.jsx)("img", {
                            src: C_SECTIONS.section12.bgm,
                            alt: "bg",
                            className: "w-full"
                        }),(0, r.jsxs)("div", {
                            className: "w-full flex flex-col items-center text-[3vw] text-white px-[4vw] mt-[5vw] py-[1vw] bg-[#146a65]/90 absolute bottom-0",
                            children: [(0, r.jsx)("div", {
                                className: "mb-[1vw]",
                                children: C_FOOTER.copyright
                            }), (0, r.jsxs)("div", {
                                className: "flex items-center space-x-[3vw] ",
                                children: C_FOOTER.links.map(item => (0, r.jsx)("a", {
                                  target: "_blank",
                                  href: item.href,
                                  className: "hover:underline",
                                  children: item.title
                              }))
                            })]
                        }), (0, r.jsxs)("div", {
                            className: "z-20 absolute top-0 flex flex-col justify-center mt-[10%]",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section12.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] uppercase text-center"
                            }),(0, r.jsx)("img", {
                                ref: b,
                                src: C_SECTIONS.section12.data.imgm,
                                alt: "title",
                                className: "w-full h-auto mt-[10%]"
                            }), (0, r.jsxs)("div", {
                                ref: C,
                                className: "w-[90vw] h-[90vw] rounded-full flex flex-col items-center justify-center text-white px-[10vw] mt-[12%] mx-auto",
                                style: {
                                    background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                                },
                                children: [(0, r.jsx)("h2", {
                                    ref: N,
                                    className: "!text-[5.6vw] font-bold leading-none mb-[4vw]",
                                    children: "ĐĂNG K\xdd"
                                }), (0, r.jsx)("p", {
                                    ref: k,
                                    className: "text-[4.2vw] leading-none tracking-wide mb-[2vw]",
                                    children: "NHẬN TƯ VẤN V\xc0 B\xc1O GI\xc1"
                                }), (0, r.jsxs)("form", {
                                    ref: S,
                                    className: "w-full flex flex-col gap-[1vw]",
                                    onSubmit: H,
                                    children: [(0, r.jsx)("div", {
                                        className: "relative w-full mt-[2vw]",
                                        children: (0, r.jsx)("input", {
                                            type: "text",
                                            name: "fullName",
                                            value: e.fullName,
                                            onChange: M,
                                            placeholder: "Họ t\xean (*)",
                                            required: !0,
                                            className: "w-full py-[3vw] px-[4vw] rounded-xl bg-transparent border border-white text-white placeholder:text-white text-[3vw] outline-none"
                                        })
                                    }), (0, r.jsx)("div", {
                                        className: "relative w-full mt-[2vw]",
                                        children: (0, r.jsx)("input", {
                                            type: "tel",
                                            name: "phoneNumber",
                                            value: e.phoneNumber,
                                            onChange: M,
                                            placeholder: "Số điện thoại (*)",
                                            required: !0,
                                            pattern: "(?:7|0\\d|\\+84\\d)\\d{8}",
                                            title: "Vui l\xf2ng nhập số điện thoại hợp lệ",
                                            className: "w-full py-[3vw] px-[4vw] rounded-xl bg-transparent border border-white text-white placeholder:text-white text-[3vw] outline-none"
                                        })
                                    }), m && (0, r.jsx)("p", {
                                        className: "text-red-500 text-[0.7vw] text-center",
                                        children: m
                                    }), (0, r.jsx)("button", {
                                        type: "submit",
                                        disabled: n,
                                        className: "mt-[3vw] bg-white text-[#1D705D] font-medium py-[2vw] px-[6vw] rounded-full text-[4vw] hover:bg-opacity-90 transition-all duration-300 w-fit mx-auto ".concat(n ? "opacity-70 cursor-not-allowed" : ""),
                                        children: "GỬI TH\xd4NG TIN"
                                    })]
                                })]
                            }), (0, r.jsxs)("div", {
                                ref: T,
                                className: "flex flex-col items-start gap-[1.4vw] mx-auto",
                                children: [(0, r.jsx)("h1", {
                                    children: C_SECTIONS.section13.title,
                                    className: "w-full font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[6vw] mt-[10%] uppercase text-center"
                                }), (0, r.jsxs)("div", {
                                    ref: I,
                                    className: "text-white/90 text-[3.6vw] leading-[1.4] text-center mt-[4%] no-underline px-[6vw]",
                                    children: C_SECTIONS.section13.data.list.map(item => (0, r.jsx)("div", {
                                        className: "text-white/90 text-[3.6vw] leading-[1.4] text-center mt-[4%] no-underline box-tin",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className: "font-bold text-white",
                                            children: item.title
                                          }),
                                          (0, r.jsx)("br", {}),
                                          item.description
                                        ]
                                    }))
                                })]
                            })]
                        })]
                    })
                })
            }

            function Y() {
                return (0, r.jsxs)("div", {
                    className: "min-h-screen bg-black text-white",
                    children: [(0, r.jsx)(l, {}), (0, r.jsxs)("div", {
                        className: "flex md:hidden  fixed px-4 left-0 bottom-4 z-50 font-gotham w-full items-end justify-between pointer-events-none",
                        children: [(0, r.jsxs)("a", {
                            onClick: () => {
                                document.getElementById('xin_bang_gia').click();
                            },
                            id: "azvidi_form",
                            className: "azvd-dk-mb opacity-0 fadeToRightAni z-50 gold-bg-2 flex items-center pl-[2px] pr-3 py-[2px] rounded-full border-2 border-white/50 pointer-events-auto",
                            children: [(0, r.jsxs)("svg", {
                                className: "p-[1.2vw] w-[10vw] h-auto rounded-full bg-[#0C5B3E] border-[1px] border-white",
                                width: "35",
                                height: "35",
                                viewBox: "0 0 22 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [(0, r.jsx)("path", {
                                    d: "M16.4961 10.4806C17.6256 10.7296 18.6216 11.1992 19.485 11.9273C20.9819 13.1903 21.8623 14.7931 21.9835 16.7558C22.1445 19.3679 21.1239 21.4546 19.0012 22.9684C17.6464 23.9351 16.1041 24.328 14.4435 24.1642C12.2016 23.9436 10.4738 22.8567 9.23349 20.9869C9.14923 20.86 9.0574 20.8363 8.92296 20.8363C6.88363 20.8392 4.84336 20.8411 2.80404 20.8363C1.54768 20.8344 0.529914 20.1405 0.15689 19.011C0.0622142 18.725 0.00824877 18.4107 0.00824877 18.1097C-0.00121885 12.9924 -0.00216561 7.87327 0.00351496 2.75413C0.00446172 1.18724 1.1917 0.00757409 2.75859 0.00473381C5.40479 -0.000946761 8.05099 0.00473381 10.6962 0C10.9519 0 11.146 0.0852085 11.3211 0.269827C12.9637 2.00051 14.6092 3.72835 16.2575 5.45335C16.426 5.62944 16.4989 5.82542 16.498 6.06874C16.4923 7.44723 16.4952 8.82476 16.4952 10.2032V10.4816L16.4961 10.4806ZM10.3431 1.0244C10.2484 1.01777 10.1869 1.01019 10.1253 1.01019C7.69217 1.01019 5.25804 1.0083 2.82486 1.01209C2.64593 1.01209 2.46036 1.03008 2.289 1.07741C1.46531 1.30274 1.00898 1.95033 1.00898 2.88762C1.00803 7.91209 1.00803 12.9375 1.01087 17.962C1.01087 18.157 1.02602 18.3587 1.07525 18.5452C1.2949 19.3764 1.93017 19.8233 2.88072 19.8242C4.70797 19.8271 6.53522 19.8242 8.36247 19.8242H8.62567C8.10685 18.4448 7.99986 17.0692 8.32555 15.6443C8.22141 15.6443 8.1362 15.6443 8.05004 15.6443C6.78233 15.6443 5.51367 15.6443 4.24595 15.6424C4.13708 15.6424 4.02441 15.6329 3.92027 15.6026C3.69683 15.5373 3.56807 15.3309 3.58606 15.0952C3.60216 14.8736 3.75648 14.6928 3.97707 14.6549C4.085 14.636 4.19672 14.635 4.30655 14.635C5.68503 14.6341 7.06352 14.6313 8.44105 14.6379C8.59632 14.6379 8.67396 14.5905 8.74686 14.4504C8.94568 14.067 9.16817 13.6968 9.38308 13.3209C9.42379 13.2499 9.46734 13.1799 9.53267 13.0719C9.39066 13.0719 9.29693 13.0719 9.20414 13.0719C7.57382 13.0719 5.9435 13.0719 4.31317 13.071C4.20335 13.071 4.09163 13.0672 3.98465 13.0483C3.7508 13.0066 3.59553 12.822 3.58511 12.59C3.5747 12.3533 3.70819 12.1555 3.9392 12.0958C4.05187 12.0665 4.17211 12.0589 4.28856 12.0589C6.25782 12.057 8.22614 12.0551 10.1954 12.0608C10.3952 12.0608 10.5504 12.0144 10.7085 11.8856C11.6695 11.1074 12.764 10.6094 13.9872 10.4238C14.4729 10.35 14.969 10.3405 15.4717 10.3008V6.41052C15.3704 6.41052 15.2852 6.41052 15.2 6.41052C14.3649 6.41052 13.5299 6.4162 12.6958 6.40957C11.2794 6.39727 10.3507 5.45997 10.3459 4.04551C10.344 3.65166 10.3459 3.25781 10.3459 2.86395C10.3459 2.25803 10.3459 1.65305 10.3459 1.0225L10.3431 1.0244ZM15.0684 23.1994C18.3158 23.2155 20.9856 20.5495 20.9961 17.2803C21.0055 14.0206 18.3508 11.3564 15.0845 11.3479C11.8257 11.3394 9.17101 13.9884 9.15586 17.2642C9.14166 20.5144 11.7992 23.1833 15.0684 23.1994ZM11.3486 1.77518C11.3486 2.60359 11.3438 3.35816 11.3495 4.11273C11.3561 4.88908 11.8645 5.39086 12.6447 5.39559C13.2828 5.39938 13.92 5.39654 14.5581 5.39559C14.6158 5.39559 14.6736 5.38423 14.7673 5.37477C13.6265 4.17333 12.5121 3.00029 11.3486 1.77518Z",
                                    fill: "white"
                                }), (0, r.jsx)("path", {
                                    d: "M6.62696 9.54052C7.46958 9.54052 8.3122 9.53579 9.15481 9.54336C9.4663 9.5462 9.68121 9.75543 9.68784 10.03C9.69541 10.3131 9.47293 10.527 9.15292 10.5441C9.09043 10.5479 9.027 10.545 8.96357 10.545C7.95527 10.545 6.94791 10.545 5.93961 10.545C5.33368 10.545 4.72681 10.546 4.12088 10.5441C3.89839 10.5441 3.71756 10.4541 3.62573 10.2459C3.54336 10.0603 3.54714 9.84822 3.70809 9.72324C3.83875 9.62194 4.02905 9.55093 4.19378 9.54715C5.00421 9.5301 5.81559 9.53957 6.62696 9.53957V9.54052Z",
                                    fill: "white"
                                }), (0, r.jsx)("path", {
                                    d: "M14.573 19.3092V19.029C14.573 17.3996 14.573 15.7702 14.573 14.1408C14.573 14.0622 14.5692 13.9827 14.5777 13.9051C14.6118 13.5955 14.8229 13.3863 15.0899 13.3919C15.3588 13.3986 15.5605 13.6116 15.5879 13.9221C15.5945 13.9922 15.5908 14.0641 15.5908 14.1342C15.5908 15.7797 15.5908 17.4242 15.5908 19.0697V19.3698C15.6712 19.2941 15.7224 19.2514 15.7669 19.2032C16.3557 18.5688 16.9446 17.9336 17.5345 17.2992C17.5979 17.2311 17.667 17.1629 17.7427 17.1099C17.9463 16.966 18.1981 16.9868 18.3695 17.1506C18.5418 17.3163 18.5702 17.5624 18.4367 17.7754C18.3951 17.8417 18.343 17.9014 18.29 17.9591C17.3678 18.9504 16.4466 19.9426 15.5226 20.9319C15.2092 21.2671 14.928 21.2709 14.6184 20.9395C13.683 19.9388 12.7505 18.9362 11.8189 17.9317C11.6068 17.7025 11.5642 17.4753 11.6825 17.2689C11.7933 17.0748 12.0129 16.9603 12.2212 17.0322C12.3557 17.0786 12.4863 17.1714 12.5848 17.2756C13.1822 17.9023 13.7711 18.5366 14.3619 19.17C14.4139 19.2259 14.4622 19.2855 14.5114 19.3433L14.572 19.3101L14.573 19.3092Z",
                                    fill: "white"
                                })]
                            }), (0, r.jsx)("p", {
                                className: "ml-2 text-[#0C5B3E] text-[3.5vw] font-medium",
                                children: "NHẬN BẢNG GI\xc1"
                            })]
                        }), (0, r.jsxs)("div", {
                            "data-aos": "fade-left",
                            "data-aos-delay": "300",
                            "data-aos-duration": "1500",
                            className: "flex flex-col items-end gap-4",
                            children: [(0, r.jsx)("a", {
                                href: "tel:" + C_FOOTER.hotline,
                                className: "gold-bg-2 border-[1px] border-white rounded-full p-2 pointer-events-auto",
                                children: (0, r.jsx)("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 23 23",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[8vw] h-auto animate-shake",
                                    children: (0, r.jsx)("path", {
                                        d: "M15.6206 22.8045C15.6245 22.7821 15.6284 22.7596 15.6313 22.7362C16.4744 22.704 17.2648 22.4844 17.9889 22.0482C18.5451 21.7135 19.0965 21.37 19.641 21.0178C21.0862 20.081 21.2413 18.0883 19.963 16.9349C19.6137 16.6197 19.2458 16.324 18.9042 15.9991C17.6727 14.8281 15.8665 15.1725 15.0497 16.365C14.7511 16.8012 14.2983 16.9651 13.7675 16.8773C10.1686 16.2821 7.30942 13.4922 6.58048 9.89232C6.43898 9.19363 6.60487 8.67058 7.17769 8.22951C8.29696 7.36687 8.45895 5.79969 7.56704 4.69798C7.23526 4.28813 6.88786 3.88999 6.54242 3.49185C5.36947 2.14033 3.34853 2.28377 2.38051 3.78655C2.03799 4.31838 1.69352 4.85021 1.36467 5.39082C0.833815 6.26321 0.561559 7.22342 0.700127 8.22951C0.822105 9.11556 1.01044 10.0094 1.31002 10.8506C3.46465 16.9046 7.65975 20.7836 13.8582 22.4825C14.432 22.6396 15.0331 22.7001 15.6215 22.8055L15.6206 22.8045ZM12.0803 0.659016C11.9261 0.659016 11.7719 0.656088 11.6177 0.659016C11.3747 0.663895 11.1747 0.755623 11.041 0.964451C10.7717 1.38699 11.0469 1.91589 11.5582 1.96468C12.1876 2.0242 12.8238 2.04762 13.4445 2.15496C17.1468 2.7912 20.3494 5.83579 21.1535 9.50296C21.3175 10.2505 21.3584 11.0262 21.4385 11.7913C21.4697 12.085 21.5761 12.3085 21.8532 12.4226C22.3109 12.6129 22.7861 12.2724 22.7461 11.7337C22.6885 10.9433 22.6387 10.1421 22.4709 9.37025C21.4004 4.46573 17.0541 0.844424 12.0803 0.659016ZM20.1191 11.3609C20.0938 11.115 20.0782 10.8145 20.0294 10.5188C19.4273 6.90043 16.7955 4.15932 13.221 3.44989C12.6989 3.34645 12.1593 3.3162 11.6255 3.28888C11.2342 3.26936 10.9454 3.56504 10.9366 3.92707C10.9278 4.29203 11.204 4.57112 11.5972 4.59454C11.7836 4.60527 11.971 4.6082 12.1564 4.62869C15.2029 4.96145 17.2785 6.56864 18.3958 9.41221C18.7022 10.1909 18.7969 11.0126 18.8232 11.845C18.834 12.1992 19.1043 12.4597 19.4429 12.4753C19.7786 12.491 20.0704 12.2509 20.1162 11.9016C20.1367 11.7425 20.1201 11.5776 20.1201 11.3629L20.1191 11.3609ZM17.502 11.6683C17.4746 10.957 17.3371 10.27 17.0736 9.6064C16.207 7.42835 14.0309 5.93045 11.6968 5.90801C11.3962 5.90508 11.1522 5.99778 11.0098 6.27589C10.7775 6.72966 11.0986 7.20488 11.648 7.22245C13.0561 7.26831 14.2271 7.81283 15.1327 8.896C15.8245 9.72253 16.1592 10.6876 16.1895 11.761C16.2002 12.1387 16.3866 12.3865 16.7096 12.4607C17.1565 12.5632 17.5137 12.207 17.501 11.6683H17.502Z",
                                        fill: "#0C5B3E"
                                    })
                                })
                            }), (0, r.jsx)("a", {
                                href: C_FOOTER.facebook,
                                "aria-label": "Chat with us on Messenger",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                className: "gold-bg-2 pointer-events-auto border-[1px] border-white rounded-full p-2",
                                children: (0, r.jsxs)("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 35 36",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[8vw] h-auto",
                                    children: [(0, r.jsx)("path", {
                                        d: "M16.9442 34.299C15.5092 34.1763 14.0984 34.0077 12.7105 33.6584C12.5149 33.6085 12.2654 33.6381 12.0766 33.7164C11.146 34.1048 10.2436 34.5634 9.30222 34.9194C7.38699 35.6464 5.65655 34.4878 5.58776 32.5753C5.55944 31.7674 5.54865 30.9595 5.50414 30.153C5.4947 29.9844 5.40973 29.7794 5.28969 29.6634C1.43226 25.9745 -0.265814 21.4292 0.146904 16.1529C0.618966 10.0876 3.60915 5.57603 8.97043 2.68566C11.1702 1.49876 13.5548 0.902608 16.05 0.743456C19.6903 0.512819 23.1417 1.18854 26.3019 3.03363C30.8768 5.70551 33.6269 9.69106 34.3539 14.9391C35.1618 20.771 33.4921 25.8208 29.1154 29.8508C26.6498 32.1221 23.692 33.4453 20.3862 33.9564C19.2479 34.1331 18.092 34.1884 16.9429 34.299H16.9442ZM8.23266 32.4391C8.4053 32.3703 8.49836 32.3379 8.58738 32.2988C9.43844 31.9252 10.2962 31.5624 11.1406 31.1726C11.8122 30.8624 12.4839 30.8017 13.2015 30.9919C15.7533 31.6676 18.3267 31.7189 20.8961 31.1241C24.5943 30.2663 27.5724 28.3187 29.6495 25.1086C31.5296 22.2048 32.1703 19.0015 31.7333 15.5878C31.2221 11.5942 29.3446 8.37199 26.0402 6.06562C22.3581 3.49625 18.2512 2.86099 13.9042 3.76466C10.3367 4.50647 7.43285 6.35021 5.30183 9.33365C3.79932 11.4377 3.00086 13.8007 2.81878 16.3782C2.62726 19.0919 3.11281 21.6693 4.37658 24.0876C5.09547 25.4634 6.02476 26.6813 7.17794 27.7185C7.84287 28.316 8.20029 29.0375 8.20434 29.9345C8.20569 30.3607 8.22727 30.7869 8.23266 31.2131C8.23806 31.6042 8.23266 31.9953 8.23266 32.4391Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M14.3612 13.4203C15.0342 13.4244 15.5414 13.6294 16.0013 13.9814C17.1423 14.8527 18.2874 15.7173 19.4312 16.5858C20.0098 17.0255 20.351 17.0309 20.9404 16.5858C22.5158 15.3963 24.0816 14.1959 25.6664 13.0198C25.8647 12.8727 26.1614 12.7567 26.3961 12.7824C26.945 12.8444 27.1757 13.45 26.8668 13.949C26.2909 14.8837 25.6988 15.8103 25.1134 16.7396C24.1869 18.2097 23.2589 19.6785 22.331 21.1473C21.4111 22.604 19.9019 22.867 18.5383 21.8069C17.4134 20.9329 16.2899 20.0589 15.1637 19.1849C14.6458 18.783 14.2627 18.783 13.7367 19.1889C12.1547 20.4069 10.5793 21.6329 8.98779 22.8373C8.78952 22.987 8.49819 23.1111 8.26216 23.0922C7.69838 23.0464 7.45426 22.4273 7.77391 21.9121C8.39434 20.9113 9.0269 19.9186 9.65542 18.9246C10.5645 17.4841 11.4776 16.045 12.3839 14.6032C12.8641 13.8398 13.5574 13.4581 14.3612 13.4217V13.4203Z",
                                        fill: "#0C5B3E"
                                    })]
                                })
                            }), (0, r.jsx)("a", {
                                href: C_FOOTER.zalo,
                                "aria-label": "Chat with us on Zalo",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                className: "gold-bg-2 border-[1px] border-white rounded-full p-2 pointer-events-auto",
                                children: (0, r.jsxs)("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 44 18",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[8vw] h-auto",
                                    children: [(0, r.jsx)("path", {
                                        d: "M43.4756 10.7398C43.3982 13.5186 42.5025 15.4471 40.3506 16.554C38.1866 17.6664 35.9783 17.5691 33.9769 16.1393C31.9687 14.704 31.3683 12.6085 31.6348 10.241C31.8825 8.04163 32.9993 6.41501 35.0484 5.516C38.1291 4.16583 41.7318 5.54364 42.9548 8.5713C43.2788 9.37411 43.3672 10.272 43.4756 10.7398ZM39.9128 10.9366C39.8785 10.7431 39.8464 10.3538 39.7391 9.98671C39.4351 8.94064 38.6002 8.28711 37.5685 8.2473C36.5799 8.2086 35.7859 8.75155 35.3724 9.76998C35.0329 10.6037 35.0207 11.4685 35.2839 12.3133C35.7119 13.69 37.1063 14.3402 38.4155 13.8194C39.3068 13.4644 39.9161 12.3708 39.9139 10.9377L39.9128 10.9366Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M8.80989 3.6731C7.61453 3.6731 6.56956 3.67421 5.52569 3.6731C4.80693 3.67199 4.08706 3.69964 3.37161 3.64988C2.90165 3.6167 2.41953 3.52161 1.97942 3.35684C1.37455 3.12905 1.07267 2.63808 1.06604 1.97792C1.0583 1.29786 1.34359 0.773715 1.97942 0.543711C2.45381 0.370102 2.97574 0.247359 3.47887 0.242936C6.27874 0.216397 9.0786 0.239618 11.8774 0.229666C12.7664 0.226349 13.5272 0.447507 13.9673 1.28791C14.4163 2.1449 14.1044 2.89462 13.5781 3.59238C11.6695 6.12022 9.75756 8.64474 7.84675 11.1715C7.25073 11.9599 6.65471 12.7472 5.96138 13.6639C6.31633 13.6639 6.52533 13.6628 6.73432 13.6639C8.74244 13.6761 10.7495 13.6805 12.7576 13.7059C13.8435 13.7192 14.5202 14.3727 14.5556 15.3934C14.5921 16.4461 13.9551 17.1626 12.8195 17.1792C10.0572 17.2201 7.29496 17.2135 4.53159 17.2036C3.81614 17.2013 3.08964 17.1759 2.38635 17.0576C0.985315 16.821 0.371601 15.6709 0.990844 14.3805C1.32148 13.6927 1.80028 13.0668 2.26803 12.4553C4.26952 9.83568 6.29532 7.23485 8.30012 4.61855C8.49032 4.37085 8.60201 4.06234 8.80768 3.67199L8.80989 3.6731Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M26.1069 11.1467C26.1069 12.5643 26.1401 13.983 26.0947 15.3985C26.066 16.2919 25.481 16.878 24.6362 17.0218C24.0689 17.118 23.5757 16.9709 23.1799 16.5463C22.9012 16.2466 22.6038 16.1769 22.251 16.4125C18.9712 18.6041 15.2392 16.2554 14.4309 12.749C13.8028 10.0243 14.7571 7.2919 16.9056 5.86543C18.5344 4.78507 20.2528 4.69993 21.958 5.68851C22.491 5.99702 22.8702 6.1065 23.3424 5.58567C23.8279 5.05157 24.4803 5.14003 25.0918 5.38552C25.6867 5.62548 26.0682 6.08106 26.0804 6.72795C26.1091 8.19976 26.0892 9.67267 26.0892 11.1445C26.0947 11.1445 26.1014 11.1445 26.1069 11.1445V11.1467ZM17.6974 11.1002C17.8466 11.6797 17.9119 12.1806 18.1054 12.6262C18.4714 13.47 19.1393 13.962 20.0837 13.9753C21.0391 13.9875 21.8264 13.6469 22.2444 12.7313C22.7022 11.7272 22.7364 10.6933 22.2986 9.67488C21.9381 8.83448 21.31 8.3026 20.3634 8.25062C19.4368 8.20086 18.676 8.56025 18.2569 9.3918C17.9827 9.93474 17.8699 10.5584 17.6985 11.1014L17.6974 11.1002Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M27.1405 8.63544C27.1405 6.53665 27.136 4.43675 27.1449 2.33796C27.146 2.02834 27.1604 1.70545 27.2466 1.41131C27.5076 0.51783 28.1224 0.121956 29.0336 0.212631C29.9525 0.303306 30.4678 0.803124 30.5784 1.72425C30.6049 1.94319 30.6038 2.16546 30.6038 2.38662C30.6038 6.51122 30.6038 10.6358 30.5994 14.7604C30.5994 14.9805 30.5905 15.2027 30.5607 15.4217C30.4169 16.4998 29.7789 17.0605 28.7549 17.0196C27.8051 16.9809 27.1681 16.3317 27.1537 15.2647C27.125 13.0553 27.1449 10.8459 27.1449 8.63655C27.1427 8.63655 27.1405 8.63655 27.1383 8.63655L27.1405 8.63544Z",
                                        fill: "#0C5B3E"
                                    })]
                                })
                            })]
                        })]
                    }), (0, r.jsxs)("main", {
                        children: [(0, r.jsx)(CdtHero, { isMobile: !0 }), (0, r.jsx)(CdtIntro, { isMobile: !0 }), (0, r.jsx)(d, {}), (0, r.jsx)(m, {}), (0, r.jsx)(p, {}), (0, r.jsx)(CdtLocation, { isMobile: !0 }), (0, r.jsx)(b, {}), (0, r.jsx)(A, {}), (0, r.jsx)(_, {}), (0, r.jsx)(D, {}), (0, r.jsx)(P, {}), (0, r.jsx)(CdtPartners, { isMobile: !0 }), (0, r.jsx)(Z, {}), (0, r.jsx)(U, {})]
                    })]
                })
            }
            async function K(e) {
                let t = new Headers;
                t.append("Authorization", "Bearer " + POST_API_TOKEN);
                let n = await fetch(e, {
                    method: "GET",
                    headers: t,
                    redirect: "follow",
                    cache: "no-store"
                });
                if (!n.ok) throw Error("Failed to fetch data");
                return (await n.json())
            }
            n(5303);
            let Q = C_SECTIONS.section13.data.list.map(item => (0, r.jsx)("span", {
                className: "leading-[1.4] text-[1vw]",
                children: [
                  item.title,
                  (0, r.jsx)("br", {}),
                  (0, r.jsx)("span", {
                    className: "text-[0.7vw] font-light",
                    children: item.description
                  })
                ]
            }));

            u.Ay.registerPlugin(O.nu);
            let W = C_MENU.map(item => item.hash),
                X = [function() { return (0, r.jsx)(CdtHero, { isMobile: !1 }); }, function() { return (0, r.jsx)(CdtIntro, { isMobile: !1 }); }, function() {
                    let e = (0, s.useRef)(null),
                        t = (0, s.useRef)(null),
                        [n, i] = (0, s.useState)(!1),
                        [o, a] = (0, s.useState)({
                            x: 0,
                            y: 0
                        }),
                        l = (0, s.useRef)(null),
                        c = (0, s.useRef)(null),
                        d = (0, s.useRef)(null),
                        h = (0, s.useRef)(null),
                        m = (0, s.useRef)(null),
                        p = (0, s.useCallback)(e => {
                            if (!n) return;
                            let t = (e.clientX / window.innerWidth - .5) * 2,
                                r = (e.clientY / window.innerHeight - .5) * 2;
                            a({
                                x: t,
                                y: r
                            }), l.current && c.current && d.current && (u.os.to(l.current, {
                                x: 15 * t,
                                y: 10 * r,
                                duration: .8,
                                ease: "power2.out"
                            }), u.os.to(c.current, {
                                x: 10 * t,
                                y: 8 * r,
                                duration: .8,
                                ease: "power2.out"
                            }), u.os.to(d.current, {
                                x: 30 * t,
                                y: 25 * r,
                                duration: 1,
                                ease: "power1.out"
                            }), u.os.to(h.current, {
                                duration: 1,
                                ease: "power2.out"
                            }), m.current && u.os.to(m.current, {
                                backgroundPosition: "".concat(50 + 5 * t, "% ").concat(50 + 5 * r, "%"),
                                duration: 1.5,
                                ease: "power1.out"
                            }))
                        }, [n]);
                    return (0, s.useEffect)(() => {
                        if (!e.current || !l.current || !c.current || !d.current) return;
                        let r = () => {
                            u.os.set(l.current, {
                                x: -300,
                                opacity: 0
                            }), u.os.set(c.current, {
                                x: -300,
                                opacity: 0
                            }), u.os.set(d.current, {
                                scale: .8,
                                opacity: 0
                            }), u.os.set(h.current, {
                                y: 20,
                                opacity: 0
                            })
                        };
                        r();
                        let s = () => {
                                let e = u.os.timeline();
                                e.to(l.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }), e.to(c.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.5"), e.to(d.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "back.out(1.7)"
                                }, "-=0.3"), e.to(h.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.7")
                            },
                            o = new IntersectionObserver(e => {
                                e[0].isIntersecting && !n ? (console.log("Section v\xe0o viewport, bắt đầu animation"), i(!0), s()) : !e[0].isIntersecting && n && (console.log("Section rời khỏi viewport, reset trạng th\xe1i"), i(!1), r())
                            }, {
                                threshold: .2
                            });
                        return t.current && o.observe(t.current), window.addEventListener("mousemove", p), () => {
                            t.current && o.unobserve(t.current), window.removeEventListener("mousemove", p)
                        }
                    }, [n, p]), (0, r.jsxs)("div", {
                        ref: t,
                        className: "relative h-full w-full font-gotham",
                        children: [(0, r.jsx)("div", {
                            ref: m,
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                backgroundImage: "url('" + C_SECTIONS.section2.bg + "')",
                                transition: "background-position 0.3s ease-out"
                            }
                        }), (0, r.jsx)("div", {
                            ref: e,
                            className: "absolute h-full left-[42.9%] top-[6%] w-[45%]",
                            style: {
                                overflow: "visible"
                            },
                            children: (0, r.jsxs)("div", {
                                className: "h-full flex flex-col items-end px-4 relative",
                                style: {
                                    width: "100%"
                                },
                                children: [(0, r.jsxs)("div", {
                                    children: [(0, r.jsxs)("h2", {
                                        ref: l,
                                        className: "uppercase text-[#FFF5D8] font-bold leading-[1.15]",
                                        children: C_SECTIONS.section2.title
                                    }), (0, r.jsx)("h4", {
                                        ref: c,
                                        className: "text-[#FFF5D8] text-[1.2vw] uppercase",
                                        children: C_SECTIONS.section2.sub
                                    })]
                                }), (0, r.jsx)("div", {
                                    ref: d,
                                    className: "flex flex-col gap-[0.4vw] items-center justify-center rounded-full w-[35vw] h-[35vw] bg-[#0C5B3E99] mt-[6%] px-[12%]",
                                    children: (0, r.jsx)("div", {
                                        ref: h,
                                        className: "flex flex-col gap-[0.4vw] text-[1.125vw] font-light",
                                        children: C_SECTIONS.section2.data.descriptions.map(item =>
                                          (0, r.jsx)("p", {
                                            class: "",
                                            children: item
                                          })
                                        )
                                    })
                                })]
                            })
                        })]
                    })
                }, function() {
                    let e = (0, s.useRef)(null),
                        [t, n] = (0, s.useState)(!1),
                        [i, o] = (0, s.useState)({
                            x: 0,
                            y: 0
                        }),
                        a = (0, s.useRef)(null),
                        l = (0, s.useRef)(null),
                        c = (0, s.useRef)(null),
                        d = (0, s.useRef)([]),
                        h = (0, s.useRef)(null),
                        m = C_SECTIONS.section3.data.list,
                        p = (0, s.useCallback)(e => {
                            if (!t) return;
                            let n = (e.clientX / window.innerWidth - .5) * 2,
                                r = (e.clientY / window.innerHeight - .5) * 2;
                            o({
                                x: n,
                                y: r
                            }), h.current && u.os.to(h.current, {
                                x: 25 * n,
                                y: 15 * r,
                                duration: .8,
                                ease: "power2.out"
                            }), d.current.length > 0 && d.current.forEach((e, t) => {
                                e && u.os.to(e, {
                                    x: (t + 1) * 2 * n,
                                    duration: .8,
                                    ease: "power2.out"
                                })
                            })
                        }, [t]);
                    return (0, s.useEffect)(() => {
                        if (!e.current) return;
                        let r = () => {
                                u.os.set(a.current, {
                                    scale: .8,
                                    opacity: 0
                                }), u.os.set(l.current, {
                                    scale: .9,
                                    opacity: 0
                                }), u.os.set(c.current, {
                                    x: 100,
                                    opacity: 0
                                }), h.current && u.os.set(h.current, {
                                    x: 0,
                                    y: 0
                                }), d.current.forEach((e, t) => {
                                    u.os.set(e, {
                                        x: -50,
                                        opacity: 0
                                    })
                                })
                            },
                            s = () => {
                                let e = u.os.timeline();
                                e.to(a.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "back.out(1.7)"
                                }), e.to(l.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.8"), e.to(c.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }, "-=0.5"), d.current.forEach((t, n) => {
                                    e.to(t, {
                                        x: 0,
                                        opacity: 1,
                                        duration: .6,
                                        ease: "power2.out"
                                    }, "-=".concat(0 === n ? .3 : .4))
                                })
                            },
                            i = new IntersectionObserver(e => {
                                e[0].isIntersecting && !t ? (n(!0), s()) : !e[0].isIntersecting && t && (n(!1), r())
                            }, {
                                threshold: .2
                            });
                        return e.current && i.observe(e.current), window.addEventListener("mousemove", p), r(), () => {
                            e.current && i.unobserve(e.current), window.removeEventListener("mousemove", p)
                        }
                    }, [t, p]), (0, r.jsxs)("div", {
                        ref: e,
                        className: "relative h-full w-full",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-bottom",
                            style: {
                                backgroundImage: "url('/du-an/ttgenesis2/images/section3_bg.jpg')"
                            }
                        }), (0, r.jsx)("div", {
                            ref: a,
                            className: "absolute top-[4%] border-2 border-[#FFE9A9] flex items-start justify-center left-[30%] w-[38vw] h-[38vw] z-10 bg-[#0C5B3E99] rounded-full",
                            children: (0, r.jsx)("h1", {
                                ref: l,
                                children: C_SECTIONS.section3.title,
                                className: "text-[#FFF5D8] font-bold h-auto object-contain mt-[10%] text-[2.6vw] uppercase text-center"
                            })
                        }), (0, r.jsx)("img", {
                            src: C_SECTIONS.section3.bg,
                            alt: "sub bg",
                            className: "absolute bottom-0 w-full h-auto z-30"
                        }), (0, r.jsx)("div", {
                            className: "flex flex-col items-center absolute top-[28%] left-[13%] z-20",
                            children: (0, r.jsx)("div", {
                                ref: h,
                                className: "flex flex-col gap-[1vw]",
                                children: m.map((e, t) => (0, r.jsxs)("div", {
                                    ref: e => d.current[t] = e,
                                    className: "flex items-start gap-[1.2vw]",
                                    children: [(0, r.jsx)("img", {
                                        alt: "img",
                                        src: e.img,
                                        className: "w-[2.5vw] h-auto object-contain"
                                    }), (0, r.jsxs)("div", {
                                        className: "flex flex-col items-start",
                                        children: [(0, r.jsx)("h2", {
                                            children: e.title,
                                            className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[1.6vw] uppercase text-center"
                                        }), (0, r.jsx)("div", {
                                            className: "text-white text-[0.9vw] leading-[1.6] font-gotham ",
                                            children: e.description
                                        })]
                                    })]
                                }, t))
                            })
                        }), (0, r.jsx)("img", {
                            ref: c,
                            src: C_SECTIONS.section3.data.right_img,
                            alt: "floor info",
                            className: "absolute top-[18%] left-[57.5%] w-[20%] h-auto z-20"
                        })]
                    })
                }, function() {
                    let e = (0, s.useRef)(null),
                        [t, n] = (0, s.useState)(!1),
                        [i, o] = (0, s.useState)({
                            x: 0,
                            y: 0
                        }),
                        a = (0, s.useRef)(null),
                        l = (0, s.useRef)(null),
                        c = (0, s.useRef)(null),
                        d = (0, s.useRef)(null),
                        h = (0, s.useRef)(null),
                        m = (0, s.useRef)(null),
                        p = (0, s.useRef)(null),
                        f = (0, s.useRef)(null),
                        g = (0, s.useRef)(null),
                        x = (0, s.useRef)(null),
                        w = (0, s.useRef)(null),
                        v = (0, s.useCallback)(e => {
                            if (!t) return;
                            let n = (e.clientX / window.innerWidth - .5) * 2,
                                r = (e.clientY / window.innerHeight - .5) * 2;
                            o({
                                x: n,
                                y: r
                            }), x.current && u.os.to(x.current, {
                                x: 30 * n,
                                y: 20 * r,
                                duration: .8,
                                ease: "power2.out"
                            }), w.current && u.os.to(w.current, {
                                backgroundPosition: "".concat(50 + 5 * n, "% ").concat(50 + 5 * r, "%"),
                                duration: 1.5,
                                ease: "power1.out"
                            })
                        }, [t]);
                    return (0, s.useEffect)(() => {
                        if (!e.current) return;
                        let r = () => {
                            u.os.set(g.current, {
                                x: -100,
                                opacity: 0
                            }), u.os.set(a.current, {
                                scale: .9,
                                opacity: 0
                            }), u.os.set(f.current, {
                                strokeDashoffset: 1e3,
                                opacity: 0
                            }), u.os.set(x.current, {
                                opacity: 0,
                                x: 30
                            }), u.os.set(c.current, {
                                y: -15,
                                opacity: 0
                            }), u.os.set(d.current, {
                                y: -10,
                                opacity: 0
                            }), u.os.set(h.current, {
                                y: 15,
                                opacity: 0
                            }), u.os.set(m.current, {
                                y: 20,
                                opacity: 0
                            }), u.os.set(p.current, {
                                y: 20,
                                opacity: 0
                            }), x.current && u.os.set(x.current, {
                                x: 0,
                                y: 0
                            })
                        };
                        r();
                        let s = () => {
                                let e = u.os.timeline();
                                e.to(g.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: .7,
                                    ease: "power2.out"
                                }), e.to(a.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.5"), e.to(f.current, {
                                    strokeDashoffset: 0,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "power2.inOut"
                                }, "-=0.6"), e.to(x.current, {
                                    opacity: 1,
                                    x: 0,
                                    duration: .6,
                                    ease: "power2.out"
                                }, "-=1"), e.to(c.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .5,
                                    ease: "back.out(1.3)"
                                }, "-=0.5"), e.to(d.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .4,
                                    ease: "back.out(1.3)"
                                }, "-=0.3"), e.to(h.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .4,
                                    ease: "power2.out"
                                }, "-=0.25"), e.to(m.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .5,
                                    ease: "power2.out"
                                }, "-=0.2"), e.to(p.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .5,
                                    ease: "power2.out"
                                }, "-=0.3")
                            },
                            i = new IntersectionObserver(e => {
                                e[0].isIntersecting && !t ? (n(!0), s()) : !e[0].isIntersecting && t && (n(!1), r())
                            }, {
                                threshold: .15
                            });
                        return e.current && i.observe(e.current), window.addEventListener("mousemove", v), () => {
                            e.current && i.unobserve(e.current), window.removeEventListener("mousemove", v)
                        }
                    }, [t, v]), (0, r.jsxs)("div", {
                        ref: e,
                        className: "relative h-full w-full font-gotham",
                        children: [(0, r.jsx)("div", {
                            ref: w,
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                backgroundImage: "url('"+ C_SECTIONS.section4.bg +"')",
                                transition: "background-position 0.3s ease-out"
                            }
                        }), (0, r.jsx)("img", {
                            ref: g,
                            src: "/du-an/ttgenesis2/images/sec-4-sub-bg.png",
                            alt: "section4_bg",
                            className: "absolute h-full w-[45%] left-0"
                        }), (0, r.jsx)("div", {
                            className: "absolute top-[4%] left-[2.8%] z-10",
                            children: (0, r.jsxs)("div", {
                                ref: a,
                                className: "w-[38vw] h-[37vw] relative -z-10",
                                children: [(0, r.jsx)("img", {
                                    alt: "banner",
                                    src: C_SECTIONS.section4.data.left_img,
                                    className: "w-full object-contain"
                                })]
                            })
                        }), (0, r.jsxs)("div", {
                            ref: x,
                            className: "flex flex-col items-center w-[35vw] absolute top-[20%] left-[50%]",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section4.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }), (0, r.jsx)("div", {
                                ref: d,
                                className: "text-white text-[1.2vw] leading-[1.4] mt-[3%] tracking-wider font-medium",
                                children: C_SECTIONS.section4.sub
                            }), (0, r.jsx)("div", {
                                ref: h,
                                className: "text-white text-[0.85vw] leading-[1.6] mt-[4%] text-justify transition-all",
                                children: (0, r.jsx)("div", {
                                    ref: h,
                                    className: "flex flex-col gap-[0.4vw] text-[1.125vw] font-light",
                                    children: C_SECTIONS.section4.data.descriptions.map(item =>
                                      (0, r.jsx)("p", {
                                        class: "",
                                        children: item
                                      })
                                    )
                                })
                            }), (0, r.jsx)("img", {
                                ref: m,
                                alt: "img",
                                src: C_SECTIONS.section4.data.img,
                                className: "w-full mt-[6%]",
                                loading: "lazy"
                            })]
                        }), (0, r.jsx)("div", {
                            className: "relative h-full flex flex-col items-center justify-center px-4"
                        })]
                    })
                }, function() { return (0, r.jsx)(CdtLocation, { isMobile: !1 }); }, function() {
                    let [e, t] = (0, s.useState)(0), n = (0, s.useRef)(null), i = (0, s.useRef)(null), [o, a] = (0, s.useState)(!1), [l, c] = (0, s.useState)(!1), d = (0, s.useRef)(null), h = (0, s.useRef)(null), m = (0, s.useRef)(null), p = (0, s.useRef)(null), f = (0, s.useRef)(null), b = (0, s.useRef)(null), y = (0, s.useRef)(null), j = (0, s.useRef)(null), C = C_SECTIONS.section5.data.list;
                    return (0, s.useEffect)(() => {
                        if (!i.current) return;
                        let e = () => {
                            u.os.set(j.current, {
                                opacity: 0
                            }), u.os.set(d.current, {
                                y: -10,
                                opacity: 0,
                                scale: .95
                            }), u.os.set(h.current, {
                                y: -8,
                                opacity: 0,
                                scale: .95
                            }), u.os.set(m.current, {
                                opacity: 0,
                                scale: .98
                            }), u.os.set(p.current, {
                                scale: .95,
                                opacity: 0
                            }), u.os.set([b.current, y.current], {
                                opacity: 0,
                                scale: .8
                            }), u.os.set(f.current, {
                                opacity: 0,
                                y: 10
                            }), c(!1)
                        };
                        e();
                        let t = () => {
                                let e = u.os.timeline();
                                e.to(j.current, {
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power1.inOut"
                                }), e.to(d.current, {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    duration: .6,
                                    ease: "power2.out"
                                }, "-=0.5"), e.to(h.current, {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    duration: .6,
                                    ease: "power2.out"
                                }, "-=0.4"), e.to(m.current, {
                                    opacity: 1,
                                    scale: 1,
                                    duration: .5,
                                    ease: "power2.out"
                                }, "-=0.3"), e.to(p.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "power1.inOut"
                                }, "-=0.1"), e.call(() => {
                                    c(!0)
                                }, null, "+=0.2"), e.to([b.current, y.current], {
                                    opacity: 1,
                                    scale: 1,
                                    duration: .5,
                                    stagger: .15,
                                    ease: "back.out(1.5)"
                                }, "-=0.3"), e.to(f.current, {
                                    opacity: 1,
                                    y: 0,
                                    duration: .5,
                                    ease: "power2.out"
                                }, "-=0.2")
                            },
                            n = new IntersectionObserver(n => {
                                n[0].isIntersecting && !o ? (a(!0), t()) : !n[0].isIntersecting && o && (a(!1), e())
                            }, {
                                threshold: .25
                            });
                        return i.current && n.observe(i.current), () => {
                            i.current && n.unobserve(i.current)
                        }
                    }, [o]), (0, s.useEffect)(() => {
                        if (l && n.current) {
                            let e = setTimeout(() => {
                                n.current.autoplay.start()
                            }, 1e3);
                            return () => clearTimeout(e)
                        }
                    }, [l]), (0, s.useEffect)(() => (v.lX.bind("[data-fancybox]", {
                        loop: !0,
                        buttons: ["zoom", "slideShow", "fullScreen", "close"],
                        animationEffect: "fade",
                        transitionEffect: "fade"
                    }), () => {
                        v.lX.destroy()
                    }), []), (0, r.jsxs)("div", {
                        ref: i,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                backgroundImage: "url('"+ C_SECTIONS.section5.bg +"')"
                            }
                        }), (0, r.jsx)("div", {
                            ref: j,
                            className: "absolute inset-0 bg-black bg-opacity-30"
                        }), (0, r.jsxs)("div", {
                            className: "jsx-5208a88129cdf4d4 relative h-full flex flex-col items-center justify-center",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section5.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }), (0, r.jsx)("div", {
                                ref: h,
                                className: "jsx-5208a88129cdf4d4 text-white text-[1.4vw] leading-[1.4] mt-[0.8%] tracking-wider font-medium",
                                children: C_SECTIONS.section5.sub
                            }), (0, r.jsx)("div", {
                                ref: m,
                                className: "jsx-5208a88129cdf4d4 text-[#FDF7EC] text-[1vw] min-h-[4vw] leading-[1.6] mt-[1vw] text-center transition-all w-[50vw]",
                                children: C[e].description
                            }), (0, r.jsxs)("div", {
                                ref: p,
                                className: "jsx-5208a88129cdf4d4 flex gap-5 items-center relative w-[80vw]",
                                children: [(0, r.jsx)("button", {
                                    ref: b,
                                    onClick: () => {
                                        var e;
                                        null == (e = n.current) || e.slidePrev()
                                    },
                                    className: "jsx-5208a88129cdf4d4 absolute left-[34%] z-20 cursor-pointer text-white hover:scale-110 transition-transform duration-300",
                                    children: (0, r.jsx)("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "jsx-5208a88129cdf4d4 w-[2vw] h-[2vw]",
                                        children: (0, r.jsx)("path", {
                                            fillRule: "evenodd",
                                            d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
                                            clipRule: "evenodd",
                                            className: "jsx-5208a88129cdf4d4"
                                        })
                                    })
                                }), (0, r.jsx)(x.RC, {
                                    effect: "coverflow",
                                    grabCursor: !0,
                                    centeredSlides: !0,
                                    loop: !0,
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 20,
                                        modifier: 10,
                                        slideShadows: !1
                                    },
                                    slidesPerView: 3.2,
                                    onSwiper: e => {
                                        n.current = e, e.autoplay.stop()
                                    },
                                    autoplay: {
                                        delay: 5e3,
                                        disableOnInteraction: !1
                                    },
                                    initialSlide: 2,
                                    modules: [w.t9, w.dK, w.Ij],
                                    onRealIndexChange: e => t(e.realIndex),
                                    className: "section5-swiper",
                                    speed: 800,
                                    children: C.map((e, t) => (0, r.jsx)(x.qr, {
                                        children: t => {
                                            let {
                                                isActive: n,
                                                isVisible: s
                                            } = t;
                                            return (0, r.jsxs)("div", {
                                                className: "jsx-5208a88129cdf4d4 " + "relative pt-[2vw] pb-[3vw] flex justify-center items-center transition-all duration-800 ".concat(s ? "opacity-100" : "opacity-0"),
                                                children: [(0, r.jsxs)("a", {
                                                    href: e.img,
                                                    "data-fancybox": "gallery",
                                                    className: "jsx-5208a88129cdf4d4 " + "rounded-full aspect-square overflow-hidden relative ".concat(n ? "border-2 border-[#D4AF37]" : "", " w-[25vw] h-[25vw] transition-all duration-800 shadow-lg cursor-pointer"),
                                                    children: [(0, r.jsx)("img", {
                                                        src: e.img,
                                                        alt: e.title,
                                                        className: "jsx-5208a88129cdf4d4 " + "w-full h-full object-cover transition-transform duration-700 hover:scale-110 ".concat(n ? "" : "opacity-70")
                                                    }), !n && (0, r.jsx)("div", {
                                                        className: "jsx-5208a88129cdf4d4 absolute inset-0 bg-[#0C5B3E4D] mix-blend-multiply"
                                                    })]
                                                }), n && (0, r.jsx)("div", {
                                                    className: "jsx-5208a88129cdf4d4 bg-[#0C5B3E] text-white text-[1vw] font-medium px-[2vw] py-[0.5vw] rounded-full absolute bottom-[5%] z-10 border-2 border-white shadow-md animate-fadeIn",
                                                    children: e.title
                                                })]
                                            })
                                        }
                                    }, t))
                                }), (0, r.jsx)("button", {
                                    ref: y,
                                    onClick: () => {
                                        var e;
                                        null == (e = n.current) || e.slideNext()
                                    },
                                    className: "jsx-5208a88129cdf4d4 absolute right-[34%] z-20 cursor-pointer text-white hover:scale-110 transition-transform duration-300",
                                    children: (0, r.jsx)("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "jsx-5208a88129cdf4d4 w-[2vw] h-[2vw]",
                                        children: (0, r.jsx)("path", {
                                            fillRule: "evenodd",
                                            d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
                                            clipRule: "evenodd",
                                            className: "jsx-5208a88129cdf4d4"
                                        })
                                    })
                                })]
                            }), (0, r.jsx)("div", {
                                ref: f,
                                className: "jsx-5208a88129cdf4d4 flex space-x-[0.5vw] mt-[0.5vw]",
                                children: C.map((t, s) => (0, r.jsx)("button", {
                                    onClick: () => {
                                        var e;
                                        null == (e = n.current) || e.slideToLoop(s)
                                    },
                                    "aria-label": "Go to slide ".concat(s + 1),
                                    className: "jsx-5208a88129cdf4d4 " + "w-[0.8vw] h-[0.8vw] rounded-full transition-all duration-300 ".concat(s === e ? "bg-white scale-110" : "bg-white opacity-50 hover:opacity-75")
                                }, s))
                            }), (0, r.jsx)(g(), {
                                id: "5208a88129cdf4d4",
                                children: ".section5-swiper .swiper-slide{opacity:0;-webkit-transition:opacity.8s ease;-moz-transition:opacity.8s ease;-o-transition:opacity.8s ease;transition:opacity.8s ease}.section5-swiper .swiper-slide-active,.section5-swiper .swiper-slide-prev,.section5-swiper .swiper-slide-next{opacity:1}@-webkit-keyframes fadeIn{0%{opacity:0;-webkit-transform:translatey(10px);transform:translatey(10px)}30%{opacity:.3}100%{opacity:1;-webkit-transform:translatey(0);transform:translatey(0)}}@-moz-keyframes fadeIn{0%{opacity:0;-moz-transform:translatey(10px);transform:translatey(10px)}30%{opacity:.3}100%{opacity:1;-moz-transform:translatey(0);transform:translatey(0)}}@-o-keyframes fadeIn{0%{opacity:0;-o-transform:translatey(10px);transform:translatey(10px)}30%{opacity:.3}100%{opacity:1;-o-transform:translatey(0);transform:translatey(0)}}@keyframes fadeIn{0%{opacity:0;-webkit-transform:translatey(10px);-moz-transform:translatey(10px);-o-transform:translatey(10px);transform:translatey(10px)}30%{opacity:.3}100%{opacity:1;-webkit-transform:translatey(0);-moz-transform:translatey(0);-o-transform:translatey(0);transform:translatey(0)}}.section5-swiper .animate-fadeIn{-webkit-animation:fadeIn.8s ease forwards;-moz-animation:fadeIn.8s ease forwards;-o-animation:fadeIn.8s ease forwards;animation:fadeIn.8s ease forwards}"
                            })]
                        })]
                    })
                }, function() {
                    let e = (0, s.useRef)(null),
                        [t, n] = (0, s.useState)(!1),
                        [i, o] = (0, s.useState)(!1),
                        a = (0, s.useRef)(null),
                        l = (0, s.useRef)(null),
                        c = (0, s.useRef)([]),
                        d = (0, s.useRef)(null);
                    return (0, s.useEffect)(() => {
                        if (!e.current || !a.current || !l.current || 0 === c.current.length) return;
                        let r = () => {
                            u.os.set(a.current, {
                                y: -50,
                                opacity: 0
                            }), u.os.set(l.current, {
                                y: -30,
                                opacity: 0
                            }), c.current.forEach((e, t) => {
                                u.os.set(e, {
                                    y: 50,
                                    opacity: 0
                                })
                            }), u.os.set(d.current, {
                                scale: .8,
                                opacity: 0
                            })
                        };
                        r();
                        let s = () => {
                                let e = u.os.timeline();
                                e.to(a.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }), e.to(l.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.5"), c.current.forEach((t, n) => {
                                    e.to(t, {
                                        y: 0,
                                        opacity: 1,
                                        duration: .6,
                                        ease: "power2.out"
                                    }, "-=".concat(n > 0 ? .4 : .3))
                                }), e.to(d.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "back.out(1.7)"
                                }, "-=0.3")
                            },
                            i = new IntersectionObserver(e => {
                                e[0].isIntersecting && !t ? (console.log("Section6 v\xe0o viewport, bắt đầu animation"), n(!0), s()) : !e[0].isIntersecting && t && (console.log("Section6 rời khỏi viewport, reset trạng th\xe1i"), n(!1), r())
                            }, {
                                threshold: .2
                            });
                        return e.current && i.observe(e.current), () => {
                            e.current && i.unobserve(e.current)
                        }
                    }, [t]), (0, r.jsxs)("div", {
                        ref: e,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                            }
                        }), (0, r.jsxs)("div", {
                            className: "absolute inset-0 flex flex-col items-center justify-center h-auto z-10 object-contain object-top",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section6.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }), (0, r.jsx)("h2", {
                                ref: l,
                                className: "text-white text-[1.4vw] leading-[1.4] font-medium mt-[0.5vw]",
                                children: C_SECTIONS.section6.sub
                            }), (0, r.jsx)("div", {
                                className: "grid grid-cols-3 gap-[1vw] w-[65vw] mt-[1vw]",
                                children: C_SECTIONS.section6.data.list.map((e, t) => (0, r.jsxs)("div", {
                                    ref: e => c.current[t] = e,
                                    className: "flex flex-col items-center bg-white rounded-lg p-[1vw] pb-[1.4vw]",
                                    children: [(0, r.jsx)("img", {
                                        src: e.img,
                                        alt: "icon",
                                        className: "w-[2.7vw] h-auto"
                                    }), (0, r.jsx)("h3", {
                                        className: "text-[#0C5B3E] text-[0.9vw] leading-[1.4] font-gotham mt-[0.8vw] uppercase font-medium text-center whitespace-pre-line",
                                        children: e.title
                                    }), (0, r.jsx)("p", {
                                        className: "text-[#233F35] text-[0.85vw] leading-[1.4] text-justify font-gotham mt-[0.5vw] whitespace-pre-line",
                                        children: e.description
                                    })]
                                }, t))
                            }), (0, r.jsx)(y, {
                                buttonRef: d,
                                text: C_SECTIONS.section6.data.button,
                                className: "mt-[1.5vw]",
                                onClick: () => {
                                    o(!0)
                                }
                            }), (0, r.jsx)(B, {
                                isOpen: i,
                                onClose: () => o(!1)
                            })]
                        })]
                    })
                }, function() {
                    let [e, t] = (0, s.useState)(!1), n = (0, s.useRef)(null), i = (0, s.useRef)(null), o = (0, s.useRef)(null), [a, l] = (0, s.useState)(!1), [c, d] = (0, s.useState)({
                        x: 0,
                        y: 0
                    }), h = (0, s.useRef)(null), m = (0, s.useRef)(null), p = (0, s.useCallback)(e => {
                        if (!a) return;
                        let t = (e.clientX / window.innerWidth - .5) * 2,
                            n = (e.clientY / window.innerHeight - .5) * 2;
                        d({
                            x: t,
                            y: n
                        }), h.current && u.os.to(h.current, {
                            x: 25 * t,
                            y: 15 * n,
                            duration: .8,
                            ease: "power2.out"
                        }), m.current && u.os.to(m.current, {
                            backgroundPosition: "".concat(50 + 5 * t, "% ").concat(50 + 5 * n, "%"),
                            duration: 1.5,
                            ease: "power1.out"
                        })
                    }, [a]);
                    return (0, s.useEffect)(() => {
                        if (!i.current || !o.current) return;
                        h.current && u.os.set(h.current, {
                            xPercent: -50,
                            yPercent: -50,
                            x: 0,
                            y: 0
                        });
                        let e = () => {
                            u.os.set(i.current, {
                                scale: .9,
                                opacity: 0
                            }), u.os.set(o.current, {
                                y: 30,
                                opacity: 0
                            }), h.current && u.os.to(h.current, {
                                x: 0,
                                y: 0,
                                duration: .3
                            })
                        };
                        e();
                        let t = () => {
                                let e = u.os.timeline();
                                e.to(i.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "power2.out"
                                }), e.to(o.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "back.out(1.7)"
                                }, "-=0.5")
                            },
                            r = new IntersectionObserver(n => {
                                n[0].isIntersecting && !a ? (l(!0), t()) : !n[0].isIntersecting && a && (l(!1), e())
                            }, {
                                threshold: .2
                            });
                        return n.current && r.observe(n.current), window.addEventListener("mousemove", p), () => {
                            n.current && r.unobserve(n.current), window.removeEventListener("mousemove", p)
                        }
                    }, [a, p]), (0, r.jsxs)("div", {
                        ref: n,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            ref: m,
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                backgroundImage: "url('"+ C_SECTIONS.section7.bg +"')",
                                transition: "background-position 0.3s ease-out"
                            }
                        }), (0, r.jsxs)("div", {
                            ref: h,
                            style: {
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "60vw"
                            },
                            className: "content-container",
                            children: [(0, r.jsx)("img", {
                                ref: i,
                                src: C_SECTIONS.section7.data.img,
                                alt: "img",
                                className: "w-full"
                            }), (0, r.jsx)(y, {
                                text: C_SECTIONS.section7.data.button,
                                className: "absolute bottom-[5%] right-[12%]",
                                buttonRef: o,
                                onClick: () => {
                                    t(!0)
                                }
                            }), (0, r.jsx)(B, {
                                isOpen: e,
                                onClose: () => t(!1)
                            })]
                        })]
                    })
                }, function() {
                    let [e, t] = (0, s.useState)(0), n = (0, s.useRef)();
                    (0, s.useRef)();
                    let i = (0, s.useRef)(null),
                        [o, a] = (0, s.useState)(!1),
                        l = (0, s.useRef)(null),
                        c = (0, s.useRef)(null),
                        d = (0, s.useRef)(null);
                    return (0, s.useEffect)(() => {
                        if (!l.current || !c.current || !d.current) return;
                        let e = () => {
                            u.os.set(l.current, {
                                y: -50,
                                opacity: 0
                            }), u.os.set(c.current, {
                                x: -100,
                                opacity: 0
                            }), u.os.set(d.current, {
                                scale: .8,
                                opacity: 0
                            })
                        };
                        e();
                        let t = () => {
                                let e = u.os.timeline();
                                e.to(l.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }), e.to(c.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.4"), e.to(d.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "back.out(1.7)"
                                }, "-=0.3")
                            },
                            n = new IntersectionObserver(n => {
                                n[0].isIntersecting && !o ? (a(!0), t()) : !n[0].isIntersecting && o && (a(!1), e())
                            }, {
                                threshold: .2
                            });
                        return i.current && n.observe(i.current), () => {
                            i.current && n.unobserve(i.current)
                        }
                    }, [o]), (0, r.jsxs)("div", {
                        ref: i,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                background: "linear-gradient(180deg, #174734 0%, #56A694 100%)"
                            }
                        }), (0, r.jsxs)("div", {
                            className: "flex flex-col items-center w-full absolute top-[2%] h-full justify-center",
                            children: [(0, r.jsx)("div", {
                                ref: l,
                                children: (0, r.jsx)("h1", {
                                    children: "MẶT BẰNG ĐIỂN HÌNH",
                                    className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                                })
                            }), (0, r.jsx)("div", {
                                ref: c,
                                className: "flex gap-[2vw] mt-[1%] z-20",
                                children: C_SECTIONS.section8.data.tabs.map(item => item.title).map((n, s) => (0, r.jsx)("button", {
                                    onClick: () => t(s),
                                    className: k("bg-none border-2 border-white/80 rounded-full w-[15vw] h-[40px] text-[1vw] text-white", e == s ? "bg-[#B38F54]" : "bg-[#0C5B3E]"),
                                    children: n
                                }, s))
                            }), (0, r.jsxs)("div", {
                                ref: d,
                                className: "flex relative mt-[2%]",
                                children: [(0, r.jsx)("img", {
                                    alt: "btn",
                                    src: "/du-an/ttgenesis2/images/sec-8-left-btn.png",
                                    className: "w-[38px] h-[38px] cursor-pointer absolute z-10 left-[1vw] top-1/2",
                                    onClick: () => {
                                        n.current.slidePrev()
                                    }
                                }), (0, r.jsx)(x.RC, {
                                    loop: !0,
                                    lazy: "true",
                                    pagination: {
                                        clickable: !0
                                    },
                                    modules: [w.dK],
                                    onSwiper: e => {
                                        n.current = e
                                    },
                                    className: "w-[60vw]",
                                    children: C_SECTIONS.section8.data.tabs.map(item => item.list)[e].map((e, t) => (0, r.jsx)(x.qr, {
                                        children: (0, r.jsx)("div", {
                                            className: " w-[60vw] h-[36.1vw] relative",
                                            children: (0, r.jsx)("img", {
                                                alt: "sld",
                                                src: e,
                                                className: "w-full rounded-lg absolute inset-0"
                                            })
                                        })
                                    }, e))
                                }), (0, r.jsx)("img", {
                                    alt: "btn",
                                    src: "/du-an/ttgenesis2/images/sec-8-right-btn.png",
                                    className: "w-[38px] h-[38px] cursor-pointer absolute z-10 right-[1vw] top-1/2",
                                    onClick: () => {
                                        n.current.slideNext()
                                    }
                                })]
                            })]
                        })]
                    })
                }, function() {
                    let e = (0, s.useRef)(null),
                        t = (0, s.useRef)(null),
                        n = (0, s.useRef)(null),
                        i = (0, s.useRef)(null),
                        o = (0, s.useRef)(null),
                        a = (0, s.useRef)(null),
                        [l, c] = (0, s.useState)(!1),
                        [d, h] = (0, s.useState)({
                            x: 0,
                            y: 0
                        }),
                        m = (0, s.useRef)(null),
                        p = (0, s.useCallback)(e => {
                            if (!l) return;
                            let t = (e.clientX / window.innerWidth - .5) * 2,
                                r = (e.clientY / window.innerHeight - .5) * 2;
                            h({
                                x: t,
                                y: r
                            }), n.current && u.os.to(n.current, {
                                x: 30 * t,
                                y: 20 * r,
                                duration: .8,
                                ease: "power2.out"
                            }), m.current && u.os.to(m.current, {
                                backgroundPosition: "".concat(50 + 5 * t, "% bottom"),
                                duration: 1.5,
                                ease: "power1.out"
                            })
                        }, [l]);
                    return (0, s.useEffect)(() => {
                        if (!t.current || !n.current) return;
                        let r = () => {
                            u.os.set(t.current, {
                                y: -50,
                                opacity: 0
                            }), u.os.set(n.current, {
                                scale: .8,
                                opacity: 0,
                                x: 0,
                                y: 0
                            }), u.os.set([i.current, o.current, a.current], {
                                y: 20,
                                opacity: 0
                            }), m.current && u.os.to(m.current, {
                                backgroundPosition: "50% bottom",
                                duration: .3
                            })
                        };
                        r();
                        let s = () => {
                                let e = u.os.timeline();
                                e.to(t.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "power2.out"
                                }), e.to(n.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "back.out(1.7)"
                                }, "-=0.5"), e.to([i.current, o.current, a.current], {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    stagger: .2,
                                    ease: "power2.out"
                                }, "-=0.7")
                            },
                            d = new IntersectionObserver(e => {
                                e[0].isIntersecting && !l ? (console.log("Section9 v\xe0o viewport, bắt đầu animation"), c(!0), s()) : !e[0].isIntersecting && l && (console.log("Section9 rời khỏi viewport, reset trạng th\xe1i"), c(!1), r())
                            }, {
                                threshold: .2
                            });
                        return e.current && d.observe(e.current), window.addEventListener("mousemove", p), () => {
                            e.current && d.unobserve(e.current), window.removeEventListener("mousemove", p)
                        }
                    }, [l, p]), (0, r.jsxs)("div", {
                        ref: e,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            ref: m,
                            className: "absolute inset-0 bg-cover bg-bottom",
                            style: {
                                backgroundImage: "url('"+ C_SECTIONS.section9.bg +"')",
                                backgroundPosition: "50% bottom",
                                transition: "background-position 0.3s ease-out"
                            }
                        }), (0, r.jsxs)("div", {
                            ref: n,
                            className: "z-10 absolute left-[9%] bottom-[6%] flex flex-col gap-[0.4vw] items-center justify-center rounded-full w-[35vw] h-[35vw] bg-[#0C5B3E99] mt-[10%] px-[4vw]",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section9.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }),(0, r.jsx)("h2", {
                                className: "text-white text-[1.4vw] leading-[1.4] font-medium mt-[0.5vw]",
                                children: C_SECTIONS.section9.sub
                            }),(0, r.jsx)("div", {
                                ref: h,
                                className: "flex flex-col gap-[0.4vw] text-[1.125vw] font-light",
                                children: C_SECTIONS.section9.data.descriptions.map(item =>
                                  (0, r.jsx)("p", {
                                    class: "",
                                    children: item
                                  })
                                )
                            })]
                        })]
                    })
                }, function() { return (0, r.jsx)(CdtPartners, { isMobile: !1 }); }, function() {
                    let {
                        posts: e,
                        isError: t,
                        isLoading: n
                    } = function() {
                        let {
                            data: e,
                            error: t,
                            isLoading: n
                        } = (0, F.Ay)("/du-an/ttgenesis2/api/posts.json", K);
                        return {
                            posts: e,
                            isLoading: n,
                            isError: t
                        }
                    }();
                    (0, s.useRef)();
                    let o = (0, s.useRef)(),
                        [a, l] = (0, s.useState)(0),
                        [c, d] = (0, s.useState)(!1),
                        [h, m] = (0, s.useState)(null),
                        p = (0, s.useRef)(null),
                        f = (0, s.useRef)(null),
                        g = (0, s.useRef)(null),
                        w = (0, s.useRef)(null),
                        v = (0, s.useRef)(null);
                    (0, s.useEffect)(() => {
                        if (!p.current || !f.current || !g.current || !w.current || !v.current) return;
                        c || (u.os.set(f.current, {
                            y: -50,
                            opacity: 0
                        }), u.os.set(g.current, {
                            y: -30,
                            opacity: 0
                        }), u.os.set(w.current, {
                            y: 30
                        }), u.os.set(v.current, {
                            y: 20,
                            opacity: 0
                        }));
                        let e = () => {
                                let e = u.os.timeline();
                                e.to(f.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: 1.2,
                                    ease: "power2.out"
                                }), e.to(g.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.5"), e.to(w.current, {
                                    y: 0,
                                    duration: 1,
                                    ease: "power2.out"
                                }, "-=0.3"), e.to(v.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: .8,
                                    ease: "power2.out"
                                }, "-=0.5")
                            },
                            t = new IntersectionObserver(t => {
                                t[0].isIntersecting && !c && (console.log("Section11 v\xe0o viewport, bắt đầu animation"), d(!0), e())
                            }, {
                                threshold: .1
                            });
                        return p.current && t.observe(p.current), () => {
                            p.current && t.unobserve(p.current)
                        }
                    }, [c]);
                    let b = e => {
                        e.link ? window.open(e.link, "_blank", "noopener,noreferrer") : m(e)
                    };
                    return t ? (0, r.jsx)("div", {
                        className: "relative h-full w-full font-gotham overflow-hidden flex items-center justify-center",
                        children: (0, r.jsx)("div", {
                            className: "text-white text-xl",
                            children: "C\xf3 lỗi xảy ra khi tải dữ liệu"
                        })
                    }) : (0, r.jsxs)("div", {
                        ref: p,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-center",
                            style: {
                                background: "linear-gradient(180deg, #174734 0%, #56A694 100%)"
                            }
                        }), (0, r.jsxs)("div", {
                            className: "absolute top-0 flex flex-col items-center w-full h-full justify-center",
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section11.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }), (0, r.jsx)("div", {
                                ref: g,
                                className: "text-white text-[1.4vw] leading-[1.4] font-medium tracking-wider",
                                children: C_SECTIONS.section11.sub
                            }), (0, r.jsxs)("div", {
                                ref: w,
                                className: "flex items-center relative px-[2.4vw] w-[70vw]",
                                children: [(0, r.jsx)("img", {
                                    alt: "btn",
                                    src: "/du-an/ttgenesis2/images/sec-11-left-btn.png",
                                    className: "w-[2vw] h-auto absolute left-0 z-20 cursor-pointer",
                                    onClick: () => {
                                        var e;
                                        null == (e = o.current) || e.slidePrev()
                                    }
                                }), n ? (0, r.jsx)("div", {
                                    className: "w-[62vw] mt-[4vh] flex items-center justify-center",
                                    children: (0, r.jsx)("div", {
                                        className: "text-white text-xl",
                                        children: "Đang tải..."
                                    })
                                }) : (0, r.jsx)(x.RC, {
                                    loop: !1,
                                    slidesPerView: 3,
                                    spaceBetween: 18,
                                    pagination: {
                                        clickable: !0,
                                        enabled: !0
                                    },
                                    allowTouchMove: !0,
                                    onSwiper: e => {
                                        o.current = e
                                    },
                                    onSlideChange: e => l(e.activeIndex),
                                    className: "w-[62vw] mt-[4vh] opacity-100",
                                    children: null == e ? void 0 : e.map((e, t) => {
                                        let n = e;
                                        return (0, r.jsx)(x.qr, {
                                            className: "flex items-start opacity-100",
                                            style: {
                                                opacity: 1
                                            },
                                            children: (0, r.jsxs)("div", {
                                                onClick: () => b(n),
                                                className: "bg-white flex flex-col w-full h-[24vw] text-[#d7d7d7] p-[1.3vw] pt-[1.6vw] cursor-pointer group bg-gradient-2 rounded-2xl hover:shadow-2xl overflow-hidden opacity-100",
                                                style: {
                                                    opacity: 1
                                                },
                                                children: [(0, r.jsx)("div", {
                                                    className: "w-full aspect-[14/9] overflow-hidden rounded-xl opacity-100 relative",
                                                    style: {
                                                        opacity: 1
                                                    },
                                                    children: (0, r.jsx)(i.default, {
                                                        alt: "thumbnail",
                                                        src: n._embedded && n._embedded['wp:featuredmedia'] && n._embedded['wp:featuredmedia'][0] && n._embedded['wp:featuredmedia'][0]['media_details'] && n._embedded['wp:featuredmedia'][0]['media_details']['sizes'] ? n._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url'] : "/du-an/ttgenesis2/images/default-thumbnail.jpg",
                                                        fill: !0,
                                                        className: " object-cover group-hover:scale-110 transition duration-500 !opacity-100",
                                                        style: {
                                                            opacity: 1
                                                        }
                                                    })
                                                }), (0, r.jsxs)("div", {
                                                    className: "relative flex flex-col flex-1",
                                                    children: [(0, r.jsx)("div", {
                                                        className: "line-clamp-4 text-[1.05vw] leading-[1.4] mt-2 relative text-[#0C5B3E] text-start font-medium",
                                                        children: n.title.rendered.replace(/(<([^>]+)>)/ig, '')
                                                    }), (0, r.jsx)("div", {
                                                        className: "text-left text-[0.8vw] line-clamp-3 text-[#233F35] leading-[1.6] mt-[0.5vw]",
                                                        children: n.excerpt.rendered.replace(/(<([^>]+)>)/ig, '')
                                                    }), (0, r.jsxs)("div", {
                                                        className: "text-[#233F35] text-[0.9vw] mt-auto text-left flex gap-[0.5vw] items-center",
                                                        children: [(0, r.jsx)("img", {
                                                            src: "/du-an/ttgenesis2/images/calendar.svg",
                                                            alt: "calendar",
                                                            className: "w-[1.2vw] h-auto object-contain opacity-100",
                                                            style: {
                                                                opacity: 1
                                                            }
                                                        }), new Date(n.date).toLocaleDateString("vi-VN")]
                                                    })]
                                                })]
                                            })
                                        }, t)
                                    })
                                }), (0, r.jsx)("img", {
                                    alt: "btn",
                                    src: "/du-an/ttgenesis2/images/sec-11-right-btn.png",
                                    className: "w-[2vw] h-auto absolute right-0 z-20 cursor-pointer",
                                    onClick: () => {
                                        var e;
                                        null == (e = o.current) || e.slideNext()
                                    }
                                })]
                            }), e && (0, r.jsx)("div", {
                                ref: v,
                                className: "flex items-center gap-[1vw] mt-[1%]",
                                children: Array.from({
                                    length: Math.ceil((e.length - 1) / 3) + 1
                                }).map((e, t) => (0, r.jsx)("div", {
                                    onClick: () => {
                                        var e;
                                        null == (e = o.current) || e.slideTo(3 * t), l(3 * t)
                                    },
                                    className: "cursor-pointer text-[1vw] flex items-center justify-center h-[2.2vw] w-[2.2vw] rounded-full border-double border-[5px] ".concat(Math.floor(a / 3) === t ? "bg-white text-[#0C5B3E] border-[#0C5B3E]" : " border-white bg-[#0C5B3E] text-white"),
                                    children: t + 1
                                }, t))
                            })]
                        }), (0, r.jsx)(V, {
                            isOpen: !!h,
                            onClose: () => m(null),
                            news: h
                        })]
                    })
                }, function() {
                    let [e, t] = (0, s.useState)({
                        fullName: "",
                        phoneNumber: ""
                    }), [n, i] = (0, s.useState)(!1), [o, a] = (0, s.useState)(!1), [l, c] = (0, s.useState)(""), [d, h] = (0, s.useState)(""), [m, p] = (0, s.useState)(""), [f, g] = (0, s.useState)(!1), x = (0, s.useRef)(null), w = (0, s.useRef)(null), v = (0, s.useRef)(null), b = (0, s.useRef)(null), y = (0, s.useRef)(null), j = (0, s.useRef)(null);
                    (0, s.useEffect)(() => {
                        h(window.navigator.userAgent), Promise.resolve({json:()=>Promise.resolve({ip:""})}).then(e => e.json()).then(e => c(e.ip)).catch(e => {
                            console.error("Error fetching IP:", e), p("Kh\xf4ng thể kết nối đến server. Vui l\xf2ng thử lại sau.")
                        })
                    }, []), (0, s.useEffect)(() => {
                        if (!x.current) return;
                        let e = () => {
                            u.os.set(w.current, {
                                y: -50,
                                opacity: 0
                            }), u.os.set(v.current, {
                                scale: .8,
                                opacity: 0
                            }), u.os.set(b.current, {
                                y: 50,
                                opacity: 0
                            }), u.os.set(y.current, {
                                x: -50,
                                opacity: 0
                            }), u.os.set(j.current, {
                                x: 50,
                                opacity: 0
                            })
                        };
                        e();
                        let t = () => {
                                u.os.timeline().to(w.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }).to(v.current, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "back.out(1.7)"
                                }, "-=0.5").to(b.current, {
                                    y: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }, "-=0.5").to(y.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }, "-=0.5").to(j.current, {
                                    x: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out"
                                }, "-=0.5")
                            },
                            n = new IntersectionObserver(n => {
                                n[0].isIntersecting && !f ? (g(!0), t()) : !n[0].isIntersecting && f && (g(!1), e())
                            }, {
                                threshold: .2
                            });
                        return n.observe(x.current), () => {
                            x.current && n.unobserve(x.current)
                        }
                    }, [f]);
                    let C = e => {
                            let {
                                name: n,
                                value: r
                            } = e.target;
                            t(e => ({
                                ...e,
                                [n]: r
                            })), p("")
                        },
                        N = async n => {
                            n.preventDefault();
                            try {
                                i(!0), p("");
                                let n = new FormData,
                                    r = e.fullName,
                                    s = e.phoneNumber;
                                if (!r || !s) return console.log("Validate Fail");
                                n.append(C_FORM.ggf_entry.name.id, e.fullName), n.append(C_FORM.ggf_entry.phone.id, e.phoneNumber), await fetch("https://docs.google.com/forms/u/0/d/e/" + C_FORM.ggf_id + "/formResponse", {
                                    method: "POST",
                                    body: n,
                                    mode: "no-cors"
                                }), window.dataLayer && window.dataLayer.push({
                                    event: "form_submit",
                                    formType: "FooterForm",
                                    formData: {
                                        name: e.fullName,
                                        phone: e.phoneNumber,
                                        url: window.location.href,
                                        ip: l,
                                        userAgent: d
                                    }
                                }), a(!0), t({
                                    fullName: "",
                                    phoneNumber: ""
                                })
                            } catch (e) {
                                console.error("Error submitting form:", e), p("Đ\xe3 c\xf3 lỗi xảy ra. Vui l\xf2ng thử lại sau.")
                            } finally {
                                i(!1)
                            }
                        };
                    return (0, r.jsxs)("div", {
                        ref: x,
                        className: "relative h-full w-full font-gotham overflow-hidden",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0 bg-cover bg-bottom",
                            style: {
                                backgroundImage: "url('"+ C_SECTIONS.section12.bg +"')"
                            }
                        }), (0, r.jsxs)("div", {
                            className: "absolute top-[4%] left-[18%] z-10 w-[68vw] flex flex-col items-center",
                            style: {
                                position: "relative"
                            },
                            children: [(0, r.jsx)("h1", {
                                children: C_SECTIONS.section12.title,
                                className: "font-\[\'Cormorant_Garamond\'\] text-[#FFF5D8] font-bold h-auto object-contain text-[2.6vw] uppercase text-center"
                            }), (0, r.jsx)("img", {
                                ref: b,
                                src: C_SECTIONS.section12.data.img,
                                alt: "title",
                                className: "w-full h-auto mt-[2%]"
                            }), (0, r.jsxs)("div", {
                                className: "flex items-center gap-[2vw] mt-[3%]",
                                children: [(0, r.jsx)("div", {
                                    ref: y,
                                    className: "flex flex-col items-start gap-[1.4vw]",
                                    children: Q.map((e, t) => (0, r.jsxs)("div", {
                                        className: "text-white flex items-start gap-[1.2vw] text-[1.6vw] leading-[1.4]",
                                        children: [(0, r.jsx)("img", {
                                            alt: "logo",
                                            src: C_SECTIONS.section13.data.list[t].img,
                                            className: "w-[2vw] h-[2vw]"
                                        }), e]
                                    }, t))
                                }), (0, r.jsxs)("div", {
                                    ref: j,
                                    className: "w-[24vw] h-[24vw] rounded-full flex flex-col items-center justify-center text-white p-[2.5vw]",
                                    style: {
                                        background: "linear-gradient(180deg, #1D705D 0%, #129463 100%)"
                                    },
                                    children: [(0, r.jsx)("h2", {
                                        ref: w,
                                        className: "!text-[1.6vw] font-bold leading-none mb-[1vw]",
                                        children: "ĐĂNG K\xdd"
                                    }), (0, r.jsx)("p", {
                                        className: "text-[1.2vw] leading-none tracking-wide mb-[1.5vw]",
                                        children: "NHẬN TƯ VẤN V\xc0 B\xc1O GI\xc1"
                                    }), (0, r.jsxs)("form", {
                                        id: "FooterForm",
                                        className: "w-full flex flex-col gap-[1vw]",
                                        onSubmit: N,
                                        children: [(0, r.jsx)("div", {
                                            className: "relative w-full",
                                            children: (0, r.jsx)("input", {
                                                type: "text",
                                                name: "fullName",
                                                value: e.fullName,
                                                onChange: C,
                                                placeholder: "Họ t\xean (*)",
                                                required: !0,
                                                className: "w-full py-[0.5vw] px-[1.2vw] rounded-[0.2vw] bg-transparent border border-white text-white placeholder:text-white text-[0.85vw] outline-none"
                                            })
                                        }), (0, r.jsx)("div", {
                                            className: "relative w-full",
                                            children: (0, r.jsx)("input", {
                                                type: "tel",
                                                name: "phoneNumber",
                                                value: e.phoneNumber,
                                                onChange: C,
                                                placeholder: "Số điện thoại (*)",
                                                required: !0,
                                                pattern: "(?:7|0\\d|\\+84\\d)\\d{8}",
                                                title: "Vui l\xf2ng nhập số điện thoại hợp lệ",
                                                className: "w-full py-[0.5vw] px-[1.2vw] rounded-[0.2vw] bg-transparent border border-white text-white placeholder:text-white text-[0.85vw] outline-none"
                                            })
                                        }), m && (0, r.jsx)("p", {
                                            className: "text-red-500 text-[0.7vw] text-center",
                                            children: m
                                        }), (0, r.jsx)("button", {
                                            type: "submit",
                                            disabled: n,
                                            className: "mt-[0.5vw] bg-white text-[#1D705D] font-medium py-[0.4vw] px-[2.5vw] rounded-full text-[1vw] hover:bg-opacity-90 transition-all duration-300 w-fit mx-auto ".concat(n ? "opacity-70 cursor-not-allowed" : ""),
                                            children: "GỬI TH\xd4NG TIN"
                                        })]
                                    })]
                                })]
                            })]
                        }), (0, r.jsx)(L, {
                            isOpen: o,
                            onClose: () => a(!1)
                        }), (0, r.jsxs)("div", {
                            className: "w-full flex justify-between items-center text-[0.8vw] text-white py-[0.1vw] px-[1.5vw] mt-[4vw] bg-[#146a65]/40 rounded-[0.2vw] z-30 absolute bottom-0",
                            children: [(0, r.jsx)("div", {
                                children: C_FOOTER.copyright
                            }), (0, r.jsxs)("div", {
                                className: "flex items-center space-x-[1vw]",
                                children: C_FOOTER.links.map(item => (0, r.jsx)("a", {
                                    target: "_blank",
                                    href: item.href,
                                    className: "hover:underline",
                                    children: item.title
                                }))
                            })]
                        })]
                    })
                }],
                J = C_MENU.map(item => item.title),
                $ = C_MENU.map(item => item.slug);

            function ee() {
                (0, s.useRef)(null);
                let e = (0, s.useRef)([]),
                    t = (0, s.useRef)([]),
                    n = (0, s.useRef)([]),
                    i = (0, s.useRef)([]),
                    o = (0, s.useRef)([]),
                    a = (0, s.useRef)(-1),
                    l = (0, s.useRef)(!1),
                    [c, d] = (0, s.useState)(!0),
                    [h, m] = (0, s.useState)(0),
                    p = (0, s.useRef)(null),
                    f = (0, s.useRef)(null),
                    g = (0, s.useRef)(null),
                    x = (0, s.useRef)(null);
                (0, s.useRef)(null), (0, s.useEffect)(() => {
                    if (!p.current) return;
                    let e = p.current,
                        t = e.querySelector("svg");
                    return e.querySelector("p"), e.addEventListener("mouseenter", () => {
                        u.Ay.to(e, {
                            scale: 1.05,
                            duration: .2,
                            ease: "power2.out"
                        }), u.Ay.to(t, {
                            rotation: 15,
                            duration: .2,
                            ease: "power2.out"
                        })
                    }), e.addEventListener("mouseleave", () => {
                        u.Ay.to(e, {
                            scale: 1,
                            duration: .2,
                            ease: "power2.out"
                        }), u.Ay.to(t, {
                            rotation: 0,
                            duration: .2,
                            ease: "power2.out"
                        })
                    }), e.addEventListener("mousedown", () => {
                        u.Ay.to(e, {
                            scale: .95,
                            duration: .1,
                            ease: "power2.out"
                        }), u.Ay.to(t, {
                            rotation: -15,
                            duration: .1,
                            ease: "power2.out"
                        })
                    }), e.addEventListener("mouseup", () => {
                        u.Ay.to(e, {
                            scale: 1.05,
                            duration: .2,
                            ease: "power2.out"
                        }), u.Ay.to(t, {
                            rotation: 15,
                            duration: .2,
                            ease: "power2.out"
                        })
                    }), () => {
                        e.removeEventListener("mouseenter", () => {}), e.removeEventListener("mouseleave", () => {}), e.removeEventListener("mousedown", () => {}), e.removeEventListener("mouseup", () => {})
                    }
                }, []), (0, s.useEffect)(() => {
                    let e = u.Ay.timeline({
                        defaults: {
                            ease: "power2.out"
                        }
                    });
                    if (p.current && f.current && g.current && x.current) {
                        u.Ay.set([p.current, f.current, g.current, x.current], {
                            opacity: 0,
                            y: 20
                        }), e.to(p.current, {
                            opacity: 1,
                            y: 0,
                            duration: .5,
                            delay: .5
                        }).to(f.current, {
                            opacity: 1,
                            y: 0,
                            duration: .5
                        }, "-=0.3").to(g.current, {
                            opacity: 1,
                            y: 0,
                            duration: .5
                        }, "-=0.3").to(x.current, {
                            opacity: 1,
                            y: 0,
                            duration: .5
                        }, "-=0.3");
                        let t = [f.current, g.current, x.current],
                            n = {},
                            r = {};
                        return t.forEach((e, t) => {
                            e && (u.Ay.set(e, {
                                scale: 1
                            }), n[t] = () => {
                                u.Ay.to(e, {
                                    scale: 1.1,
                                    duration: .3
                                })
                            }, r[t] = () => {
                                u.Ay.to(e, {
                                    scale: 1,
                                    duration: .3
                                })
                            }, e.addEventListener("mouseenter", n[t]), e.addEventListener("mouseleave", r[t]))
                        }), () => {
                            e.kill(), t.forEach((e, t) => {
                                e && (e.removeEventListener("mouseenter", n[t]), e.removeEventListener("mouseleave", r[t]))
                            })
                        }
                    }
                    return () => {
                        e && e.kill()
                    }
                }, []);
                let w = u.Ay.utils.wrap(0, X.length);

                function v(e) {
                    window.location.hash !== "#".concat($[e]) && window.history.pushState(null, null, "#".concat($[e]))
                }

                function b(r, s) {
                    r = w(r), l.current = !0, m(r);
                    let c = -1 === s ? -1 : 1,
                        d = u.Ay.timeline({
                            defaults: {
                                duration: 1.2,
                                ease: "power2.inOut"
                            },
                            onComplete: () => {
                                l.current = !1, v(r)
                            }
                        });
                    try {
                        let e = document.querySelectorAll(".relative .group");
                        e && e.length > 0 && e.forEach((e, t) => {
                            if (!e) return;
                            let n = e.querySelector(".nav-indicator");
                            if (t === r) {
                                d.to(e, {
                                    color: "#ffffff",
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2), n && d.to(n, {
                                    height: "40px",
                                    opacity: 1,
                                    boxShadow: "0 0 10px #ffeeb1",
                                    duration: .8,
                                    ease: "elastic.out(0.6, 0.5)"
                                }, .1);
                                let t = e.querySelector("img");
                                t && d.to(t, {
                                    opacity: 1,
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2);
                                let r = e.querySelector(".nav-line");
                                r && d.to(r, {
                                    opacity: 0,
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2)
                            } else {
                                d.to(e, {
                                    color: "#c9aa6f",
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2), n && d.to(n, {
                                    height: "2px",
                                    opacity: 0,
                                    boxShadow: "none",
                                    duration: .6,
                                    ease: "power2.out"
                                }, .1);
                                let t = e.querySelector("img");
                                t && d.to(t, {
                                    opacity: 0,
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2);
                                let r = e.querySelector(".nav-line");
                                r && d.to(r, {
                                    opacity: 1,
                                    duration: .9,
                                    ease: "power2.out"
                                }, .2)
                            }
                        })
                    } catch (e) {
                        console.error("Lỗi khi animation navItems:", e)
                    }
                    if (a.current >= 0) {
                        let r = t.current[a.current],
                            s = n.current[a.current],
                            i = e.current[a.current];
                        i && u.Ay.set(i, {
                            zIndex: 0
                        }), r && d.to(r, {
                            yPercent: -15 * c,
                            scale: 1.2,
                            duration: 1
                        }), s && d.to(s, {
                            yPercent: -50 * c,
                            opacity: 0,
                            scale: .8,
                            duration: .6
                        }, "-=0.3"), i && d.set(i, {
                            autoAlpha: 0
                        })
                    }
                    let h = e.current[r],
                        p = i.current[r],
                        f = o.current[r],
                        g = t.current[r],
                        x = n.current[r];
                    if (!h || !p || !f || !g || !x) {
                        console.error("Kh\xf4ng t\xecm thấy phần tử cho section:", r), l.current = !1;
                        return
                    }
                    u.Ay.set(h, {
                        autoAlpha: 1,
                        zIndex: 1
                    }), d.fromTo([p, f], {
                        yPercent: e => e ? -100 * c : 100 * c
                    }, {
                        yPercent: 0
                    }, 0).fromTo(g, {
                        yPercent: 15 * c,
                        scale: 1.2
                    }, {
                        yPercent: 0,
                        scale: 1,
                        duration: 1
                    }, 0).fromTo(x, {
                        opacity: 0,
                        yPercent: 150 * c,
                        scale: .8
                    }, {
                        opacity: 1,
                        yPercent: 0,
                        scale: 1,
                        duration: .8,
                        ease: "power3.out"
                    }, .3), a.current = r
                }(0, s.useEffect)(() => {
                    let r = e.current,
                        s = t.current,
                        c = n.current,
                        d = i.current,
                        h = o.current;
                    if (a.current, l.current, !r.length || !s.length || !c.length || !d.length || !h.length) return;
                    let p = () => {
                        sessionStorage.setItem("isReloading", "true")
                    };
                    if (window.addEventListener("beforeunload", p), "true" === sessionStorage.getItem("isReloading") && "" !== window.location.hash && (sessionStorage.removeItem("isReloading"), window.location.href = window.location.pathname, 1)) return;
                    u.Ay.set(d, {
                        yPercent: 100
                    }), u.Ay.set(h, {
                        yPercent: -100
                    }), u.Ay.set(c, {
                        opacity: 0
                    }), u.Ay.set(r[0], {
                        autoAlpha: 1,
                        zIndex: 1
                    }), u.Ay.set(d[0], {
                        yPercent: 0
                    }), u.Ay.set(h[0], {
                        yPercent: 0
                    }), u.Ay.set(s[0], {
                        yPercent: 0
                    }), u.Ay.set(c[0], {
                        opacity: 1,
                        yPercent: 0
                    });
                    let f = window.location.hash.slice(1),
                        g = $.indexOf(f);

                    function x() {
                        let e = window.location.hash.slice(1),
                            t = $.indexOf(e);
                        if (-1 !== t && t !== a.current) {
                            let e = t > a.current ? 1 : -1;
                            b(t, e)
                        }
                    }
                    return -1 !== g && 0 !== g && (a.current = g - 1, b(g, 1)), window.addEventListener("hashchange", x), window.addEventListener("gotoSection", e => {
                        if (!l.current) {
                            let {
                                index: t,
                                direction: n
                            } = e.detail;
                            b(t, n)
                        }
                    }), O.nu.create({
                        type: "wheel",
                        wheelSpeed: -1,
                        onDown: () => !l.current && !document.getElementById("investModal") && b(a.current - 1, -1),
                        onUp: () => !l.current && !document.getElementById("investModal") && b(a.current + 1, 1),
                        tolerance: 10,
                        preventDefault: !0
                    }), -1 === a.current && (a.current = 0, m(0), v(0)), () => {
                        O.nu.getAll().forEach(e => e.kill()), window.removeEventListener("hashchange", x), window.removeEventListener("beforeunload", p)
                    }
                }, []);
                let y = e => {
                    if (!l.current) {
                        let t = e > a.current ? 1 : -1;
                        b(e, t)
                    }
                };

                return (0, r.jsxs)("div", {
                    className: "relative h-screen w-screen overflow-hidden bg-black text-white font-['Cormorant_Garamond'] ",
                    children: [(0, r.jsx)("nav", {
                        className: "hidden md:flex flex-col items-center fixed z-30 right-[2%] h-screen justify-start top-[12%] transition-all duration-700",
                        children: (0, r.jsxs)("div", {
                            className: "relative h-[60%] flex items-center font-gotham",
                            children: [(0, r.jsx)("div", {
                                className: "w-[1px] h-[105%] bg-white/30 absolute right-0 top-[-2.5%]"
                            }), (0, r.jsx)("div", {
                                className: "relative h-full",
                                children: Array.from({
                                    length: X.length
                                }).map((e, t) => {
                                    let n = t / (X.length - 1) * 100;
                                    return (0, r.jsxs)("div", {
                                        onClick: () => y(t),
                                        className: "absolute w-full group cursor-pointer flex items-center",
                                        style: {
                                            top: "".concat(n, "%"),
                                            transform: "translateY(-50%)"
                                        },
                                        children: [(0, r.jsx)("div", {
                                            className: "absolute h-[28px] right-0 left-[-20px] hover:bg-transparent z-10"
                                        }), (0, r.jsx)("div", {
                                            className: "absolute w-[6px] bg-[#ffeeb1] rounded-full left-[-3px] top-1/2 transform -translate-y-1/2 nav-indicator transition-all duration-300 ease-out ".concat(h === t ? "h-[40px] opacity-100 shadow-[0_0_10px_#ffeeb1]" : "h-[2px] opacity-0")
                                        }), (0, r.jsx)("div", {
                                            className: "absolute w-[6px] bg-[#ffeeb1] rounded-full left-[-3px] top-1/2 transform -translate-y-1/2 hover-indicator opacity-0 h-[2px] group-hover:opacity-70 group-hover:h-[40px] transition-all duration-300 ease-out pointer-events-none ".concat(h === t ? "hidden" : "")
                                        }), (0, r.jsx)("div", {
                                            className: "absolute right-6 text-sm uppercase font-medium transition-all duration-200 whitespace-nowrap top-1/2 transform -translate-y-1/2 ".concat(h === t ? "opacity-100 text-white text-shadow-[0_0_10px_#fff]" : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 text-white"),
                                            children: J[t]
                                        })]
                                    }, t)
                                })
                            })]
                        })
                    }), (0, r.jsxs)("div", {
                        className: "hidden md:flex fixed px-[1.5vw] left-0 bottom-[4%] z-50 font-gotham w-full items-end justify-between pointer-events-none",
                        children: [(0, r.jsxs)("a", {
                            ref: p,
                            href: "tel:" + C_FOOTER.hotline,
                            className: "z-50 gold-bg-2 flex items-center pl-1 pr-5 py-1 rounded-full border-[0.2vw] border-white/50 pointer-events-auto animate-[callPulse_2s_ease-in-out_infinite]",
                            children: [(0, r.jsx)("div", {
                                className: "bg-[#0C5B3E] rounded-full p-2 border-2 border-white",
                                children: (0, r.jsx)("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 20 20",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[24px] h-[24px] animate-[phoneShake_1.4s_ease-in-out_infinite]",
                                    children: (0, r.jsx)("path", {
                                        d: "M19.4637 14.8216L16.3095 11.6522C15.5936 10.9286 14.4316 10.9272 13.714 11.6491C13.713 11.6501 13.712 11.6511 13.7109 11.6522L11.9037 13.4745C11.767 13.6128 11.5515 13.6319 11.393 13.5198C10.4039 12.8228 9.47792 12.0387 8.62605 11.1768C7.8631 10.4092 7.16125 9.58225 6.52695 8.70354C6.41198 8.54569 6.42869 8.32683 6.56622 8.18854L8.41834 6.32089C9.13341 5.59843 9.13341 4.42863 8.41834 3.70618L5.26414 0.525526C4.5373 -0.175175 3.39241 -0.175175 2.66557 0.525526L1.66657 1.5329C0.157832 3.03718 -0.380772 5.2708 0.274642 7.30565C0.763719 8.7944 1.45504 10.2076 2.32882 11.505C3.11545 12.6945 4.0179 13.8017 5.02282 14.8102C6.11535 15.9198 7.32555 16.9048 8.63164 17.7475C10.0674 18.6923 11.6439 19.3992 13.3012 19.8415C13.7273 19.9475 14.1645 20.0007 14.6033 20C16.1076 19.9907 17.5467 19.3801 18.605 18.3021L19.4638 17.4362C20.1788 16.7138 20.1788 15.544 19.4637 14.8216ZM18.6689 16.6644C18.6682 16.6651 18.6675 16.6659 18.6667 16.6666L18.6723 16.6496L17.8135 17.5155C16.7102 18.6422 15.1034 19.1057 13.5761 18.738C12.0374 18.3227 10.5746 17.6616 9.24325 16.7798C8.00635 15.9827 6.86008 15.0508 5.82523 14.001C4.87306 13.0478 4.01764 12.0013 3.27152 10.8769C2.45543 9.66702 1.80949 8.34905 1.35205 6.96044C0.827649 5.32916 1.2622 3.53917 2.47457 2.33661L3.47357 1.32923C3.75133 1.04789 4.20265 1.04689 4.48159 1.32697C4.48231 1.3277 4.4831 1.32843 4.48382 1.32923L7.63803 4.50988C7.91703 4.78996 7.91802 5.24507 7.64027 5.52634C7.63954 5.52707 7.63882 5.5278 7.63803 5.5286L5.7859 7.39625C5.25447 7.9263 5.18765 8.76861 5.62878 9.37712C6.29866 10.3042 7.03997 11.1765 7.84574 11.9862C8.74411 12.896 9.72075 13.7237 10.7642 14.4594C11.3671 14.8835 12.1846 14.812 12.7061 14.2897L14.4965 12.456C14.7742 12.1746 15.2256 12.1736 15.5045 12.4537C15.5052 12.4544 15.506 12.4552 15.5067 12.456L18.6666 15.648C18.9457 15.928 18.9467 16.383 18.6689 16.6644Z",
                                        fill: "white"
                                    })
                                })
                            }), (0, r.jsx)("p", {
                                className: "ml-2 text-[#0C5B3E] text-[1vw] font-medium",
                                children: C_FOOTER.hotline
                            })]
                        }), (0, r.jsxs)("div", {
                            className: "flex flex-col items-end gap-4 transition-all pointer-events-auto duration-1000",
                            children: [(0, r.jsx)("a", {
                                ref: f,
                                href: C_FOOTER.facebook,
                                "aria-label": "Chat with us on Messenger",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                className: "gold-bg-2 border-[1px] border-white rounded-full p-2 animate-fadeInRight animate-delay-100",
                                children: (0, r.jsxs)("svg", {
                                    width: "40",
                                    height: "40",
                                    viewBox: "0 0 35 36",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[1.8vw] h-auto",
                                    children: [(0, r.jsx)("path", {
                                        d: "M16.9442 34.299C15.5092 34.1763 14.0984 34.0077 12.7105 33.6584C12.5149 33.6085 12.2654 33.6381 12.0766 33.7164C11.146 34.1048 10.2436 34.5634 9.30222 34.9194C7.38699 35.6464 5.65655 34.4878 5.58776 32.5753C5.55944 31.7674 5.54865 30.9595 5.50414 30.153C5.4947 29.9844 5.40973 29.7794 5.28969 29.6634C1.43226 25.9745 -0.265814 21.4292 0.146904 16.1529C0.618966 10.0876 3.60915 5.57603 8.97043 2.68566C11.1702 1.49876 13.5548 0.902608 16.05 0.743456C19.6903 0.512819 23.1417 1.18854 26.3019 3.03363C30.8768 5.70551 33.6269 9.69106 34.3539 14.9391C35.1618 20.771 33.4921 25.8208 29.1154 29.8508C26.6498 32.1221 23.692 33.4453 20.3862 33.9564C19.2479 34.1331 18.092 34.1884 16.9429 34.299H16.9442ZM8.23266 32.4391C8.4053 32.3703 8.49836 32.3379 8.58738 32.2988C9.43844 31.9252 10.2962 31.5624 11.1406 31.1726C11.8122 30.8624 12.4839 30.8017 13.2015 30.9919C15.7533 31.6676 18.3267 31.7189 20.8961 31.1241C24.5943 30.2663 27.5724 28.3187 29.6495 25.1086C31.5296 22.2048 32.1703 19.0015 31.7333 15.5878C31.2221 11.5942 29.3446 8.37199 26.0402 6.06562C22.3581 3.49625 18.2512 2.86099 13.9042 3.76466C10.3367 4.50647 7.43285 6.35021 5.30183 9.33365C3.79932 11.4377 3.00086 13.8007 2.81878 16.3782C2.62726 19.0919 3.11281 21.6693 4.37658 24.0876C5.09547 25.4634 6.02476 26.6813 7.17794 27.7185C7.84287 28.316 8.20029 29.0375 8.20434 29.9345C8.20569 30.3607 8.22727 30.7869 8.23266 31.2131C8.23806 31.6042 8.23266 31.9953 8.23266 32.4391",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M14.3612 13.4203C15.0342 13.4244 15.5414 13.6294 16.0013 13.9814C17.1423 14.8527 18.2874 15.7173 19.4312 16.5858C20.0098 17.0255 20.351 17.0309 20.9404 16.5858C22.5158 15.3963 24.0816 14.1959 25.6664 13.0198C25.8647 12.8727 26.1614 12.7567 26.3961 12.7824C26.945 12.8444 27.1757 13.45 26.8668 13.949C26.2909 14.8837 25.6988 15.8103 25.1134 16.7396C24.1869 18.2097 23.2589 19.6785 22.331 21.1473C21.4111 22.604 19.9019 22.867 18.5383 21.8069C17.4134 20.9329 16.2899 20.0589 15.1637 19.1849C14.6458 18.783 14.2627 18.783 13.7367 19.1889C12.1547 20.4069 10.5793 21.6329 8.98779 22.8373C8.78952 22.987 8.49819 23.1111 8.26216 23.0922C7.69838 23.0464 7.45426 22.4273 7.77391 21.9121C8.39434 20.9113 9.0269 19.9186 9.65542 18.9246C10.5645 17.4841 11.4776 16.045 12.3839 14.6032C12.8641 13.8398 13.5574 13.4581 14.3612 13.4217V13.4203Z",
                                        fill: "#0C5B3E"
                                    })]
                                })
                            }), (0, r.jsx)("a", {
                                ref: g,
                                href: C_FOOTER.zalo,
                                "aria-label": "Chat with us on Zalo",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                className: "gold-bg-2 border-[1px] border-white rounded-full p-2 animate-fadeInRight animate-delay-200",
                                children: (0, r.jsxs)("svg", {
                                    width: "40",
                                    height: "40",
                                    viewBox: "0 0 44 18",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-[1.8vw] h-auto",
                                    children: [(0, r.jsx)("path", {
                                        d: "M43.4756 10.7398C43.3982 13.5186 42.5025 15.4471 40.3506 16.554C38.1866 17.6664 35.9783 17.5691 33.9769 16.1393C31.9687 14.704 31.3683 12.6085 31.6348 10.241C31.8825 8.04163 32.9993 6.41501 35.0484 5.516C38.1291 4.16583 41.7318 5.54364 42.9548 8.5713C43.2788 9.37411 43.3672 10.272 43.4756 10.7398ZM39.9128 10.9366C39.8785 10.7431 39.8464 10.3538 39.7391 9.98671C39.4351 8.94064 38.6002 8.28711 37.5685 8.2473C36.5799 8.2086 35.7859 8.75155 35.3724 9.76998C35.0329 10.6037 35.0207 11.4685 35.2839 12.3133C35.7119 13.69 37.1063 14.3402 38.4155 13.8194C39.3068 13.4644 39.9161 12.3708 39.9139 10.9377L39.9128 10.9366Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M8.80989 3.6731C7.61453 3.6731 6.56956 3.67421 5.52569 3.6731C4.80693 3.67199 4.08706 3.69964 3.37161 3.64988C2.90165 3.6167 2.41953 3.52161 1.97942 3.35684C1.37455 3.12905 1.07267 2.63808 1.06604 1.97792C1.0583 1.29786 1.34359 0.773715 1.97942 0.543711C2.45381 0.370102 2.97574 0.247359 3.47887 0.242936C6.27874 0.216397 9.0786 0.239618 11.8774 0.229666C12.7664 0.226349 13.5272 0.447507 13.9673 1.28791C14.4163 2.1449 14.1044 2.89462 13.5781 3.59238C11.6695 6.12022 9.75756 8.64474 7.84675 11.1715C7.25073 11.9599 6.65471 12.7472 5.96138 13.6639C6.31633 13.6639 6.52533 13.6628 6.73432 13.6639C8.74244 13.6761 10.7495 13.6805 12.7576 13.7059C13.8435 13.7192 14.5202 14.3727 14.5556 15.3934C14.5921 16.4461 13.9551 17.1626 12.8195 17.1792C10.0572 17.2201 7.29496 17.2135 4.53159 17.2036C3.81614 17.2013 3.08964 17.1759 2.38635 17.0576C0.985315 16.821 0.371601 15.6709 0.990844 14.3805C1.32148 13.6927 1.80028 13.0668 2.26803 12.4553C4.26952 9.83568 6.29532 7.23485 8.30012 4.61855C8.49032 4.37085 8.60201 4.06234 8.80768 3.67199L8.80989 3.6731Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M26.1069 11.1467C26.1069 12.5643 26.1401 13.983 26.0947 15.3985C26.066 16.2919 25.481 16.878 24.6362 17.0218C24.0689 17.118 23.5757 16.9709 23.1799 16.5463C22.9012 16.2466 22.6038 16.1769 22.251 16.4125C18.9712 18.6041 15.2392 16.2554 14.4309 12.749C13.8028 10.0243 14.7571 7.2919 16.9056 5.86543C18.5344 4.78507 20.2528 4.69993 21.958 5.68851C22.491 5.99702 22.8702 6.1065 23.3424 5.58567C23.8279 5.05157 24.4803 5.14003 25.0918 5.38552C25.6867 5.62548 26.0682 6.08106 26.0804 6.72795C26.1091 8.19976 26.0892 9.67267 26.0892 11.1445C26.0947 11.1445 26.1014 11.1445 26.1069 11.1445V11.1467ZM17.6974 11.1002C17.8466 11.6797 17.9119 12.1806 18.1054 12.6262C18.4714 13.47 19.1393 13.962 20.0837 13.9753C21.0391 13.9875 21.8264 13.6469 22.2444 12.7313C22.7022 11.7272 22.7364 10.6933 22.2986 9.67488C21.9381 8.83448 21.31 8.3026 20.3634 8.25062C19.4368 8.20086 18.676 8.56025 18.2569 9.3918C17.9827 9.93474 17.8699 10.5584 17.6985 11.1014L17.6974 11.1002Z",
                                        fill: "#0C5B3E"
                                    }), (0, r.jsx)("path", {
                                        d: "M27.1405 8.63544C27.1405 6.53665 27.136 4.43675 27.1449 2.33796C27.146 2.02834 27.1604 1.70545 27.2466 1.41131C27.5076 0.51783 28.1224 0.121956 29.0336 0.212631C29.9525 0.303306 30.4678 0.803124 30.5784 1.72425C30.6049 1.94319 30.6038 2.16546 30.6038 2.38662C30.6038 6.51122 30.6038 10.6358 30.5994 14.7604C30.5994 14.9805 30.5905 15.2027 30.5607 15.4217C30.4169 16.4998 29.7789 17.0605 28.7549 17.0196C27.8051 16.9809 27.1681 16.3317 27.1537 15.2647C27.125 13.0553 27.1449 10.8459 27.1449 8.63655C27.1427 8.63655 27.1405 8.63655L27.1405 8.63544",
                                        fill: "#0C5B3E"
                                    })]
                                })
                            }), (0, r.jsxs)("a", {
                                ref: x,
                                id: "azvidi_form",
                                role: "button",
                                href: "#",
                                onClick: () => {
                                    document.getElementById('xin_bang_gia').click();
                                },
                                "aria-label": "Nhận bảng gi\xe1",
                                className: "azvd-dk cursor-pointer z-50 gold-bg-2 flex items-center pl-1 pr-5 py-1 rounded-full border-[0.2vw] border-white/50 animate-fadeInRight animate-delay-300",
                                children: [(0, r.jsxs)("svg", {
                                    className: "p-[0.3vw] w-[1.8vw] h-auto rounded-full bg-[#0C5B3E] border-[1px] border-white",
                                    width: "40",
                                    height: "40",
                                    viewBox: "0 0 22 25",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [(0, r.jsx)("path", {
                                        d: "M16.4961 10.4806C17.6256 10.7296 18.6216 11.1992 19.485 11.9273C20.9819 13.1903 21.8623 14.7931 21.9835 16.7558C22.1445 19.3679 21.1239 21.4546 19.0012 22.9684C17.6464 23.9351 16.1041 24.328 14.4435 24.1642C12.2016 23.9436 10.4738 22.8567 9.23349 20.9869C9.14923 20.86 9.0574 20.8363 8.92296 20.8363C6.88363 20.8392 4.84336 20.8411 2.80404 20.8363C1.54768 20.8344 0.529914 20.1405 0.15689 19.011C0.0622142 18.725 0.00824877 18.4107 0.00824877 18.1097C-0.00121885 12.9924 -0.00216561 7.87327 0.00351496 2.75413C0.00446172 1.18724 1.1917 0.00757409 2.75859 0.00473381C5.40479 -0.000946761 8.05099 0.00473381 10.6962 0C10.9519 0 11.146 0.0852085 11.3211 0.269827C12.9637 2.00051 14.6092 3.72835 16.2575 5.45335C16.426 5.62944 16.4989 5.82542 16.498 6.06874C16.4923 7.44723 16.4952 8.82476 16.4952 10.2032V10.4816L16.4961 10.4806ZM10.3431 1.0244C10.2484 1.01777 10.1869 1.01019 10.1253 1.01019C7.69217 1.01019 5.25804 1.0083 2.82486 1.01209C2.64593 1.01209 2.46036 1.03008 2.289 1.07741C1.46531 1.30274 1.00898 1.95033 1.00898 2.88762C1.00803 7.91209 1.00803 12.9375 1.01087 17.962C1.01087 18.157 1.02602 18.3587 1.07525 18.5452C1.2949 19.3764 1.93017 19.8233 2.88072 19.8242C4.70797 19.8271 6.53522 19.8242 8.36247 19.8242H8.62567C8.10685 18.4448 7.99986 17.0692 8.32555 15.6443C8.22141 15.6443 8.1362 15.6443 8.05004 15.6443C6.78233 15.6443 5.51367 15.6443 4.24595 15.6424C4.13708 15.6424 4.02441 15.6329 3.92027 15.6026C3.69683 15.5373 3.56807 15.3309 3.58606 15.0952C3.60216 14.8736 3.75648 14.6928 3.97707 14.6549C4.085 14.636 4.19672 14.635 4.30655 14.635C5.68503 14.6341 7.06352 14.6313 8.44105 14.6379C8.59632 14.6379 8.67396 14.5905 8.74686 14.4504C8.94568 14.067 9.16817 13.6968 9.38308 13.3209C9.42379 13.2499 9.46734 13.1799 9.53267 13.0719C9.39066 13.0719 9.29693 13.0719 9.20414 13.0719C7.57382 13.0719 5.9435 13.0719 4.31317 13.071C4.20335 13.071 4.09163 13.0672 3.98465 13.0483C3.7508 13.0066 3.59553 12.822 3.58511 12.59C3.5747 12.3533 3.70819 12.1555 3.9392 12.0958C4.05187 12.0665 4.17211 12.0589 4.28856 12.0589C6.25782 12.057 8.22614 12.0551 10.1954 12.0608C10.3952 12.0608 10.5504 12.0144 10.7085 11.8856C11.6695 11.1074 12.764 10.6094 13.9872 10.4238C14.4729 10.35 14.969 10.3405 15.4717 10.3008V6.41052C15.3704 6.41052 15.2852 6.41052 15.2 6.41052C14.3649 6.41052 13.5299 6.4162 12.6958 6.40957C11.2794 6.39727 10.3507 5.45997 10.3459 4.04551C10.344 3.65166 10.3459 3.25781 10.3459 2.86395C10.3459 2.25803 10.3459 1.65305 10.3459 1.0225L10.3431 1.0244ZM15.0684 23.1994C18.3158 23.2155 20.9856 20.5495 20.9961 17.2803C21.0055 14.0206 18.3508 11.3564 15.0845 11.3479C11.8257 11.3394 9.17101 13.9884 9.15586 17.2642C9.14166 20.5144 11.7992 23.1833 15.0684 23.1994ZM11.3486 1.77518C11.3486 2.60359 11.3438 3.35816 11.3495 4.11273C11.3561 4.88908 11.8645 5.39086 12.6447 5.39559C13.2828 5.39938 13.92 5.39654 14.5581 5.39559C14.6158 5.39559 14.6736 5.38423 14.7673 5.37477C13.6265 4.17333 12.5121 3.00029 11.3486 1.77518Z",
                                        fill: "white"
                                    }), (0, r.jsx)("path", {
                                        d: "M6.62696 9.54052C7.46958 9.54052 8.3122 9.53579 9.15481 9.54336C9.4663 9.5462 9.68121 9.75543 9.68784 10.03C9.69541 10.3131 9.47293 10.527 9.15292 10.5441C9.09043 10.5479 9.027 10.545 8.96357 10.545C7.95527 10.545 6.94791 10.545 5.93961 10.545C5.33368 10.545 4.72681 10.546 4.12088 10.5441C3.89839 10.5441 3.71756 10.4541 3.62573 10.2459C3.54336 10.0603 3.54714 9.84822 3.70809 9.72324C3.83875 9.62194 4.02905 9.55093 4.19378 9.54715C5.00421 9.5301 5.81559 9.53957 6.62696 9.53957V9.54052Z",
                                        fill: "white"
                                    }), (0, r.jsx)("path", {
                                        d: "M14.573 19.3092V19.029C14.573 17.3996 14.573 15.7702 14.573 14.1408C14.573 14.0622 14.5692 13.9827 14.5777 13.9051C14.6118 13.5955 14.8229 13.3863 15.0899 13.3919C15.3588 13.3986 15.5605 13.6116 15.5879 13.9221C15.5945 13.9922 15.5908 14.0641 15.5908 14.1342C15.5908 15.7797 15.5908 17.4242 15.5908 19.0697V19.3698C15.6712 19.2941 15.7224 19.2514 15.7669 19.2032C16.3557 18.5688 16.9446 17.9336 17.5345 17.2992C17.5979 17.2311 17.667 17.1629 17.7427 17.1099C17.9463 16.966 18.1981 16.9868 18.3695 17.1506C18.5418 17.3163 18.5702 17.5624 18.4367 17.7754C18.3951 17.8417 18.343 17.9014 18.29 17.9591C17.3678 18.9504 16.4466 19.9426 15.5226 20.9319C15.2092 21.2671 14.928 21.2709 14.6184 20.9395C13.683 19.9388 12.7505 18.9362 11.8189 17.9317C11.6068 17.7025 11.5642 17.4753 11.6825 17.2689C11.7933 17.0748 12.0129 16.9603 12.2212 17.0322C12.3557 17.0786 12.4863 17.1714 12.5848 17.2756C13.1822 17.9023 13.7711 18.5366 14.3619 19.17C14.4139 19.2259 14.4622 19.2855 14.5114 19.3433L14.572 19.3101L14.573 19.3092Z",
                                        fill: "white"
                                    })]
                                }), (0, r.jsx)("p", {
                                    className: "ml-2 text-[#0C5B3E] text-[1vw] font-medium",
                                    children: "NHẬN BẢNG GI\xc1"
                                })]
                            })]
                        })]
                    }), X.map((s, a) => (0, r.jsx)("section", {
                        ref: t => e.current[a] = t,
                        className: "fixed top-0 left-0 w-screen h-full ".concat(0 === a ? "visible" : "invisible"),
                        children: (0, r.jsx)("div", {
                            ref: e => i.current[a] = e,
                            className: "w-full h-full overflow-hidden",
                            children: (0, r.jsx)("div", {
                                ref: e => o.current[a] = e,
                                className: "w-full h-full overflow-hidden",
                                children: (0, r.jsxs)("div", {
                                    ref: e => t.current[a] = e,
                                    className: "absolute inset-0",
                                    children: [(0, r.jsx)(s, {}), (0, r.jsx)("div", {
                                        ref: e => n.current[a] = e,
                                        className: "hidden"
                                    })]
                                })
                            })
                        })
                    }, W[a]))]
                })
            }

            function et() {
                let [e, t] = (0, s.useState)(null), [n, i] = (0, s.useState)(!1);
                return ((0, s.useLayoutEffect)(() => {
                    let e = () => {
                        t(window.innerWidth < 1024)
                    };
                    return e(), window.addEventListener("resize", e), () => {
                        window.removeEventListener("resize", e)
                    }
                }, []), (0, s.useEffect)(() => {
                    let e = setTimeout(() => {
                        i(!0)
                    }, 5e3);
                    return () => clearTimeout(e)
                }, []), null === e) ? null : (0, r.jsxs)("main", {
                    children: [e ? (0, r.jsx)(Y, {}) : (0, r.jsx)(ee, {}), (0, r.jsx)(G, {
                        isOpen: n,
                        onClose: () => {
                            i(!1)
                        },
                        title: "Đăng k\xfd tư vấn miễn ph\xed"
                    }), (0, r.jsx)(CdtInvestModal, {})]
                })
            }
        },
        8139: (e, t, n) => {
            Promise.resolve().then(n.bind(n, 3082))
        }
    },
    e => {
        var t = t => e(e.s = t);
        e.O(0, [676, 592, 392, 441, 684, 358], () => t(8139)), _N_E = e.O()
    }
]);