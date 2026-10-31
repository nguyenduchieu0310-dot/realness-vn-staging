/**
 * REALNESS POPUP LEAD FORM ENGINE v2.0
 * Trình Engine Tạo & Nhúng Form Pop-up Bất Động Sản Đa Dự Án - Kết Nối Trực Tiếp Realness CRM
 *
 * Tính năng cốt lõi:
 * 1. Tuỳ biến Tone màu (Presets & Custom Hex): Emerald Gold (TBS Land), Royal Navy, Burgundy VIP, Obsidian Luxury, Teal Eco.
 * 2. Tuỳ biến Tên dự án (VD: TBS LAND, GREEN SKYLINE, PALM RIVER...), Tiêu đề, Badge, Nút bấm.
 * 3. Ngày cập nhật Realtime tự động theo thời gian thực khi khách truy cập web (DD/MM/YYYY).
 * 4. Tuỳ biến danh sách Căn hộ / Sản phẩm theo Loại căn, Số lượng rổ hàng (SL), trạng thái chọn sẵn, tự động căn giữa ô lẻ.
 * 5. Đồng bộ Lead Realtime thẳng về hệ thống CRM (localStorage, Cookie .realness.vn, BroadcastChannel, CustomEvent, postMessage).
 */
(function (global) {
  "use strict";

  var CRM_STORAGE_KEY = "rf_crm_leads_v2";
  var CRM_CHANNEL_NAME = "rf_crm_lead_channel";
  var CRM_SHARED_COOKIE_KEY = "rf_crm_shared_leads";

  var THEME_PRESETS = {
    "emerald-gold": {
      id: "emerald-gold",
      name: "Emerald & Gold (Chuẩn TBS Land)",
      headerBgStart: "#126b48",
      headerBgMid: "#074730",
      headerBgEnd: "#03281a",
      goldPrimary: "#d4af37",
      goldLight: "#f7e08a",
      goldDark: "#9c7323",
      titleColor: "#6e0a1e",
      projectColor: "#0c5c38",
      inputBorder: "#154c37",
      unitActiveBg: "#dff2e8",
      unitActiveBorder: "#1c6b48",
      unitActiveText: "#082216",
      btnGradStart: "#061c4c",
      btnGradMid: "#09335a",
      btnGradEnd: "#074736",
    },
    "navy-gold": {
      id: "navy-gold",
      name: "Royal Navy & Gold (The Privé / Marina)",
      headerBgStart: "#153e75",
      headerBgMid: "#0a2547",
      headerBgEnd: "#041226",
      goldPrimary: "#d4af37",
      goldLight: "#f9e498",
      goldDark: "#9a7020",
      titleColor: "#7a0c21",
      projectColor: "#0c3266",
      inputBorder: "#123868",
      unitActiveBg: "#e0ecff",
      unitActiveBorder: "#1d4ed8",
      unitActiveText: "#0f2942",
      btnGradStart: "#041226",
      btnGradMid: "#0f3166",
      btnGradEnd: "#1e40af",
    },
    "burgundy-gold": {
      id: "burgundy-gold",
      name: "Imperial Burgundy & Gold (Dinh Thự / VIP)",
      headerBgStart: "#7c1027",
      headerBgMid: "#520818",
      headerBgEnd: "#2b030b",
      goldPrimary: "#e0b84c",
      goldLight: "#fae596",
      goldDark: "#a3781b",
      titleColor: "#6e0a1e",
      projectColor: "#881337",
      inputBorder: "#691227",
      unitActiveBg: "#fce7eb",
      unitActiveBorder: "#9f1239",
      unitActiveText: "#4c0519",
      btnGradStart: "#3b0612",
      btnGradMid: "#6e0a1e",
      btnGradEnd: "#0f3d2e",
    },
    "obsidian-gold": {
      id: "obsidian-gold",
      name: "Obsidian Luxury & Champagne (Penthouse)",
      headerBgStart: "#27272a",
      headerBgMid: "#18181b",
      headerBgEnd: "#09090b",
      goldPrimary: "#d4af37",
      goldLight: "#f5de8e",
      goldDark: "#96701e",
      titleColor: "#7f1d1d",
      projectColor: "#18181b",
      inputBorder: "#27272a",
      unitActiveBg: "#fef9c3",
      unitActiveBorder: "#a16207",
      unitActiveText: "#1c1917",
      btnGradStart: "#09090b",
      btnGradMid: "#27272a",
      btnGradEnd: "#422006",
    },
    "teal-bronze": {
      id: "teal-bronze",
      name: "Forest Teal & Bronze (Đô Thị Sinh Thái)",
      headerBgStart: "#115e59",
      headerBgMid: "#134e4a",
      headerBgEnd: "#042f2e",
      goldPrimary: "#d9a05b",
      goldLight: "#f6d5a3",
      goldDark: "#925f25",
      titleColor: "#7c2d12",
      projectColor: "#0f766e",
      inputBorder: "#115e59",
      unitActiveBg: "#ccfbf1",
      unitActiveBorder: "#0f766e",
      unitActiveText: "#042f2e",
      btnGradStart: "#042f2e",
      btnGradMid: "#115e59",
      btnGradEnd: "#064e3b",
    },
    "happy-one-slate": {
      id: "happy-one-slate",
      name: "Nordic Slate & Terracotta Gold (Chuẩn Happy One Elite)",
      headerBgStart: "#2c4a6f",
      headerBgMid: "#1b324f",
      headerBgEnd: "#0d1b2e",
      goldPrimary: "#e09f5a",
      goldLight: "#f9d5a7",
      goldDark: "#9c5923",
      titleColor: "#8b1e24",
      projectColor: "#1e3a5f",
      inputBorder: "#2c4a6f",
      unitActiveBg: "#ffedd5",
      unitActiveBorder: "#c2410c",
      unitActiveText: "#431407",
      btnGradStart: "#0d1b2e",
      btnGradMid: "#2c4a6f",
      btnGradEnd: "#9a3412",
    },
    "vlasta-ocean": {
      id: "vlasta-ocean",
      name: "Royal Amber Bronze & Gold (Chuẩn Vlasta Premier)",
      headerBgStart: "#9a5500",
      headerBgMid: "#663600",
      headerBgEnd: "#351c00",
      goldPrimary: "#d69e2e",
      goldLight: "#ffd87d",
      goldDark: "#976a14",
      titleColor: "#7a1224",
      projectColor: "#5c2e04",
      inputBorder: "#4e2806",
      unitActiveBg: "#fdf3e6",
      unitActiveBorder: "#9a5500",
      unitActiveText: "#351c00",
      btnGradStart: "#351c00",
      btnGradMid: "#663600",
      btnGradEnd: "#9a5500",
    },
  };

  var CRM_SYNC_API_URL = "https://realness-crm-sync.backness2112.workers.dev/api/popup-configs";

  var PROJECT_DEFAULT_CONFIGS = {
    "vlasta-premier": {
      projectId: "vlasta-premier",
      projectUrl: "https://realness.vn/du-an/vlasta-premier",
      projectName: "VLASTA PREMIER",
      headerBadgeText: "TẢI BẢNG GIÁ",
      formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
      showDate: true,
      datePrefix: "NGÀY:",
      realtimeDate: true,
      submitText: "ĐĂNG KÝ",
      themePreset: "vlasta-ocean",
      customColors: {
        headerBgStart: "#9a5500",
        headerBgMid: "#663600",
        headerBgEnd: "#351c00",
        goldPrimary: "#d69e2e",
        goldLight: "#ffd87d",
        goldDark: "#976a14",
        titleColor: "#7a1224",
        projectColor: "#5c2e04",
        inputBorder: "#4e2806",
        unitActiveBg: "#fdf3e6",
        unitActiveBorder: "#9a5500",
        unitActiveText: "#351c00",
        btnGradStart: "#351c00",
        btnGradMid: "#663600",
        btnGradEnd: "#9a5500",
      },
      units: [
        { id: "vl-1", label: "Căn 1PN+ (59m2)", checked: false },
        { id: "vl-2", label: "Căn 1PN (50m2)", checked: false },
        { id: "vl-3", label: "Căn 2PN (77,6 - 84,1m2)", checked: false },
        { id: "vl-4", label: "Căn 3PN (101 - 102m2)", checked: false },
        { id: "vl-5", label: "Duplex và Penthouse", checked: false },
        { id: "vl-6", label: "Officetel", checked: false },
      ],
      budgetRange: "4.5 - 15 Tỷ",
    },
    "the-prive": {
      projectId: "the-prive",
      projectUrl: "https://realness.vn/du-an/the-prive",
      projectName: "THE PRIVÉ AN PHÚ",
      headerBadgeText: "TẢI BẢNG GIÁ",
      formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
      showDate: true,
      datePrefix: "NGÀY:",
      realtimeDate: true,
      submitText: "ĐĂNG KÝ",
      themePreset: "navy-gold",
      customColors: null,
      units: [
        { id: "tp-1", label: "Căn 1PN", checked: false },
        { id: "tp-2", label: "Căn 2PN", checked: true },
        { id: "tp-3", label: "Căn 3PN", checked: true },
        { id: "tp-4", label: "Duplex và Penthouse", checked: false },
        { id: "tp-5", label: "Sky Villa", checked: false },
        { id: "tp-6", label: "Shophouse", checked: false },
      ],
      budgetRange: "8.5 - 25 Tỷ",
    },
    "palm-river": {
      projectId: "palm-river",
      projectUrl: "https://realness.vn/du-an/palm-river",
      projectName: "PALM RIVER LUXURY",
      headerBadgeText: "TẢI BẢNG GIÁ",
      formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
      showDate: true,
      datePrefix: "NGÀY:",
      realtimeDate: true,
      submitText: "ĐĂNG KÝ",
      themePreset: "teal-bronze",
      customColors: null,
      units: [
        { id: "pr-1", label: "Căn 1PN+", checked: false },
        { id: "pr-2", label: "Căn 2PN", checked: true },
        { id: "pr-3", label: "Căn 3PN", checked: false },
        { id: "pr-4", label: "Duplex và Penthouse", checked: false },
        { id: "pr-5", label: "Nhà phố/Biệt thự", checked: true },
        { id: "pr-6", label: "Shophouse", checked: false },
      ],
      budgetRange: "7 - 28 Tỷ",
    },
    "happy-one-elite": {
      projectId: "happy-one-elite",
      projectUrl: "https://realness.vn/du-an/happy-one-elite",
      projectName: "HAPPY ONE ELITE",
      headerBadgeText: "TẢI BẢNG GIÁ",
      formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
      showDate: true,
      datePrefix: "NGÀY:",
      realtimeDate: true,
      submitText: "ĐĂNG KÝ",
      themePreset: "happy-one-slate",
      customColors: null,
      units: [
        { id: "ho-1", label: "Căn Studio", checked: false },
        { id: "ho-2", label: "Căn 1PN", checked: true },
        { id: "ho-3", label: "Căn 2PN", checked: true },
        { id: "ho-4", label: "Căn 3PN", checked: false },
        { id: "ho-5", label: "Duplex và Penthouse", checked: false },
        { id: "ho-6", label: "Shophouse", checked: false },
      ],
      budgetRange: "2.8 - 5.5 Tỷ",
    },
    "tt-genesis": {
      projectId: "tt-genesis",
      projectUrl: "https://realness.vn/du-an/tt-genesis",
      projectName: "TT GENESIS NHÀ BÈ",
      headerBadgeText: "TẢI BẢNG GIÁ",
      formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
      showDate: true,
      datePrefix: "NGÀY:",
      realtimeDate: true,
      submitText: "ĐĂNG KÝ",
      themePreset: "burgundy-gold",
      customColors: null,
      units: [
        { id: "tt-1", label: "Căn Studio", checked: false },
        { id: "tt-2", label: "Căn 1PN+", checked: true },
        { id: "tt-3", label: "Căn 2PN", checked: true },
        { id: "tt-4", label: "Căn 3PN", checked: false },
        { id: "tt-5", label: "Duplex và Penthouse", checked: false },
        { id: "tt-6", label: "Shophouse", checked: false },
      ],
      budgetRange: "3.2 - 7.5 Tỷ",
    },
  };

  var DEFAULT_UNITS = [
    { id: "ai-u-1", label: "Căn Studio", checked: false },
    { id: "ai-u-2", label: "Căn 1PN+", checked: true },
    { id: "ai-u-3", label: "Căn 1PN", checked: true },
    { id: "ai-u-4", label: "Căn 2PN+", checked: false },
    { id: "ai-u-5", label: "Căn 2PN", checked: true },
    { id: "ai-u-6", label: "Căn 3PN", checked: false },
  ];

  var DEFAULT_CONFIG = {
    projectId: "green-skyline",
    projectName: "GREEN SKYLINE",
    headerBadgeText: "TẢI BẢNG GIÁ",
    formTitle: "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI",
    showDate: false,
    datePrefix: "NGÀY:",
    realtimeDate: false,
    customDateText: "",
    namePlaceholder: "Họ và tên *",
    phonePlaceholder: "Số điện thoại *",
    showEmailField: false,
    emailPlaceholder: "Email nhận bảng giá (Tuỳ chọn)",
    submitText: "ĐĂNG KÝ",
    themePreset: "emerald-gold",
    customColors: null,
    units: DEFAULT_UNITS,
    triggerMode: "immediate", // "immediate" | "delay" | "smart" | "button" | "inline"
    delaySeconds: 12,
    repeatDelaySeconds: 60,
    maxAutoTriggers: 2,
    showFloatingLauncher: false,
    floatingLauncherText: "Tải Bảng Giá",
    agentName: "Hồng Phúc",
    agentPhone: "0938 819 400",
    budgetRange: "3.5 - 12 Tỷ",
    crmUrl: "https://realness.vn/crm/",
    webhookUrl: "",
  };

  function getRealtimeDateString() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, "0");
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var yyyy = now.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }

  function resolveTheme(config) {
    var base = THEME_PRESETS[config.themePreset] || THEME_PRESETS["emerald-gold"];
    if (!config.customColors || typeof config.customColors !== "object") {
      return Object.assign({}, base);
    }
    return Object.assign({}, base, config.customColors);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Đẩy Lead về thẳng Realness CRM qua 5 kênh đồng bộ:
   * 1. localStorage (cùng domain)
   * 2. Shared Cookie .realness.vn (cross-subdomain)
   * 3. BroadcastChannel (cross-tab realtime)
   * 4. CustomEvent & window.parent.postMessage (iframe / parent)
   * 5. Cross-origin iframe bridge + Webhook (nếu có)
   */
  function dispatchLeadToCrm(payload, config) {
    var now = new Date();
    var timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    var dateStr = getRealtimeDateString();
    var leadId = "LEAD-" + Math.floor(8820 + Math.random() * 900);

    var cleanName = (payload.name || "").trim() || ("Khách quan tâm " + config.projectName);
    var cleanPhone = (payload.phone || "").trim();
    var cleanEmail = (payload.email || "").trim();
    var project = (config.projectName || "TBS LAND").trim();
    var unitInterest = (payload.unitInterest || "").trim() || "Đăng ký nhận báo giá & bảng hàng";
    var placementTitle = "Pop-up " + (config.headerBadgeText || "Tải Bảng Giá") + " - " + project + " (" + dateStr + ")";
    var budgetRange = config.budgetRange || "3.5 - 12 Tỷ";

    var agents = [
      { id: "agent-1", name: config.agentName || "Nguyễn Minh Tuấn", rank: "VIP Specialist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", activeLeads: 4 },
      { id: "agent-2", name: "Trần Thị Mai Lan", rank: "Senior", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80", activeLeads: 3 },
      { id: "agent-3", name: "Lê Hoàng Nam", rank: "Senior", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", activeLeads: 5 },
    ];
    var agent = agents[0];

    var newLead = {
      id: leadId,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      project: project,
      unitInterest: unitInterest,
      budgetRange: budgetRange,
      score: 96,
      status: "new",
      source: "Web Opt-in Form",
      assignedAgent: agent,
      slaSecondsLeft: 300,
      slaExpired: false,
      createdAt: "Vừa xong",
      currentStatusTag: "Khách mới điền Pop-up",
      websiteFootprint: [
        {
          time: timeStr,
          action: "Gửi Form Pop-up Báo Giá",
          detail: "Chiến dịch: " + placementTitle,
        },
        {
          time: timeStr,
          action: "Lựa chọn loại căn quan tâm",
          detail: "Loại căn đã chọn: " + unitInterest,
        },
        {
          time: timeStr,
          action: "Đồng bộ CRM & Kích hoạt SLA 5 Phút",
          detail: "SĐT Zalo: " + cleanPhone + " · Điều phối cho " + agent.name,
        },
      ],
      activityLogs: [
        {
          id: "log-" + Date.now() + "-1",
          timestamp: timeStr,
          type: "system",
          title: "Khách điền Form Pop-up Website",
          detail: 'Đăng ký từ "' + placementTitle + '". Khách hàng: ' + cleanName + " - SĐT: " + cleanPhone,
          author: "Popup Form Engine",
        },
        {
          id: "log-" + Date.now() + "-2",
          timestamp: timeStr,
          type: "system",
          title: "Chấm điểm Lead & Kích hoạt SLA",
          detail: "Hệ thống AI chấm 96 điểm (Lead Nóng). Kích hoạt đồng hồ SLA phản hồi trong 5 phút.",
          author: "AI Lead Scoring",
        },
        {
          id: "log-" + Date.now() + "-3",
          timestamp: timeStr,
          type: "system",
          title: "Điều phối tự động (Round-robin)",
          detail: "Phân phối ngay cho Chuyên viên " + agent.name + " phụ trách dự án " + project,
          author: "CRM Engine",
        },
      ],
      comments: [
        {
          id: "cmt-" + Date.now(),
          timestamp: timeStr,
          author: "CRM Dispatch Bot",
          authorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
          tag: "Khách mới điền Pop-up",
          tagColor: "#10b981",
          content:
            '⚡ Khách vừa đăng ký qua "' +
            placementTitle +
            '" lúc ' +
            timeStr +
            " ngày " +
            dateStr +
            ". Loại căn quan tâm: " +
            unitInterest +
            ". Sales vui lòng gọi hoặc gửi bảng giá Zalo ngay trong 5 phút (SLA)!",
        },
      ],
      zaloHistory: [
        {
          id: "zm-" + Date.now() + "-1",
          sender: "agent",
          time: timeStr,
          text:
            "Dạ em chào anh/chị " +
            cleanName +
            "! Em nhận được yêu cầu tải bảng giá dự án " +
            project +
            " (Loại căn: " +
            unitInterest +
            ") của anh/chị. Em gửi anh/chị trọn bộ bảng giá & chính sách ưu đãi mới nhất ngày " +
            dateStr +
            " qua Zalo ạ!",
        },
        {
          id: "zm-" + Date.now() + "-2",
          sender: "agent",
          time: timeStr,
          cardType: "brochure",
          cardTitle: "Bảng Giá & Chính Sách " + project + " - Cập nhật " + dateStr + " (PDF/Excel)",
          cardDetail: "Chi tiết rổ hàng: " + unitInterest + " & tiến độ thanh toán chuẩn CĐT",
        },
      ],
    };

    function saveToStorage(storageObj) {
      try {
        if (!storageObj) return;
        var raw = storageObj.getItem(CRM_STORAGE_KEY);
        var list = [];
        if (raw) {
          var parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) list = parsed;
        }
        var updated = [newLead].concat(
          list.filter(function (l) {
            return l && l.id !== leadId;
          })
        );
        storageObj.setItem(CRM_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
    }

    saveToStorage(global.localStorage);
    try {
      if (global.parent && global.parent !== global) {
        saveToStorage(global.parent.localStorage);
      }
    } catch (e) {}

    var compactItem = {
      id: leadId,
      n: cleanName,
      p: cleanPhone,
      e: cleanEmail,
      pr: project,
      u: unitInterest,
      b: budgetRange,
      pl: placementTitle,
      t: now.getTime(),
    };

    try {
      var existingCookies = [];
      var parts = document.cookie ? document.cookie.split("; ") : [];
      for (var c = 0; c < parts.length; c++) {
        if (parts[c].indexOf(CRM_SHARED_COOKIE_KEY + "=") === 0) {
          var parsedCookie = JSON.parse(decodeURIComponent(parts[c].substring(CRM_SHARED_COOKIE_KEY.length + 1)));
          if (Array.isArray(parsedCookie)) existingCookies = parsedCookie;
        }
      }
      var mergedCookies = [compactItem]
        .concat(
          existingCookies.filter(function (x) {
            return x && x.id !== leadId;
          })
        )
        .slice(0, 5);
      var encodedCookie = encodeURIComponent(JSON.stringify(mergedCookies));
      document.cookie = CRM_SHARED_COOKIE_KEY + "=" + encodedCookie + "; domain=.realness.vn; path=/; max-age=604800; SameSite=Lax; Secure";
      document.cookie = CRM_SHARED_COOKIE_KEY + "=" + encodedCookie + "; path=/; max-age=604800; SameSite=Lax";
    } catch (e) {}

    try {
      if ("BroadcastChannel" in global) {
        var channel = new BroadcastChannel(CRM_CHANNEL_NAME);
        channel.postMessage({ type: "NEW_LEAD", lead: newLead });
        channel.close();
      }
    } catch (e) {}

    try {
      global.dispatchEvent(new CustomEvent("rf_crm_new_lead", { detail: newLead }));
      if (global.parent && global.parent !== global) {
        global.parent.postMessage({ type: "RF_CRM_NEW_LEAD", lead: newLead }, "*");
        global.parent.dispatchEvent(new CustomEvent("rf_crm_new_lead", { detail: newLead }));
      }
    } catch (e) {}

    try {
      var crmTargets = ["https://realness.vn/crm/", "https://staging.realness.vn/crm/"];
      crmTargets.forEach(function (targetUrl) {
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = targetUrl;
        iframe.onload = function () {
          try {
            iframe.contentWindow.postMessage(
              {
                type: "RF_CRM_NEW_LEAD",
                lead: newLead,
              },
              "*"
            );
          } catch (err) {}
          setTimeout(function () {
            if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
          }, 3000);
        };
        document.body.appendChild(iframe);
      });
    } catch (e) {}

    if (config.webhookUrl) {
      try {
        fetch(config.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead: newLead, compact: compactItem }),
        }).catch(function () {});
      } catch (e) {}
    }

    return { lead: newLead, compact: compactItem };
  }

  var POPUP_FONT_STACKS = {
    "Be Vietnam Pro": {
      css: "'Be Vietnam Pro', 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap",
    },
    "Montserrat": {
      css: "'Montserrat', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap",
    },
    "Playfair Display": {
      css: "'Playfair Display', 'Be Vietnam Pro', Georgia, serif",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap",
    },
    "Cormorant Garamond": {
      css: "'Cormorant Garamond', 'Be Vietnam Pro', Georgia, serif",
      href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap",
    },
    "Plus Jakarta Sans": {
      css: "'Plus Jakarta Sans', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
    },
  };

  function resolveFontStack(fontFamily) {
    var key = fontFamily && POPUP_FONT_STACKS[fontFamily] ? fontFamily : "Be Vietnam Pro";
    return POPUP_FONT_STACKS[key];
  }

  function buildPopupStyles(scopeId, theme, fontFamily) {
    var fontStack = resolveFontStack(fontFamily).css;
    return (
      "@keyframes peDialogEnter {" +
      "  from { opacity: 0; transform: translateY(10px) scale(0.96); }" +
      "  to { opacity: 1; transform: translateY(0) scale(1); }" +
      "}" +
      "#" + scopeId + " {" +
      "  --pe-header-start: " + theme.headerBgStart + ";" +
      "  --pe-header-mid: " + theme.headerBgMid + ";" +
      "  --pe-header-end: " + theme.headerBgEnd + ";" +
      "  --pe-gold: " + theme.goldPrimary + ";" +
      "  --pe-gold-light: " + theme.goldLight + ";" +
      "  --pe-gold-dark: " + theme.goldDark + ";" +
      "  --pe-title-color: " + theme.titleColor + ";" +
      "  --pe-project-color: " + theme.projectColor + ";" +
      "  --pe-input-border: " + theme.inputBorder + ";" +
      "  --pe-unit-active-bg: " + theme.unitActiveBg + ";" +
      "  --pe-unit-active-border: " + theme.unitActiveBorder + ";" +
      "  --pe-unit-active-text: " + theme.unitActiveText + ";" +
      "  --pe-btn-start: " + theme.btnGradStart + ";" +
      "  --pe-btn-mid: " + theme.btnGradMid + ";" +
      "  --pe-btn-end: " + theme.btnGradEnd + ";" +
      "  --pe-icon-check: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'></polyline></svg>\");" +
      "  font-family: " + fontStack + " !important;" +
      "  box-sizing: border-box;" +
      "  line-height: 1.4;" +
      "}" +
      "#" + scopeId + " *, #" + scopeId + " *::before, #" + scopeId + " *::after {" +
      "  box-sizing: border-box;" +
      "  font-family: " + fontStack + ";" +
      "}" +
      "dialog#" + scopeId + "-dialog {" +
      "  padding: 0 !important;" +
      "  border: none !important;" +
      "  background: transparent !important;" +
      "  max-width: 440px !important;" +
      "  width: calc(100vw - 24px) !important;" +
      "  margin: auto !important;" +
      "  overflow: visible !important;" +
      "  overscroll-behavior: contain;" +
      "  z-index: 999999 !important;" +
      "}" +
      "dialog#" + scopeId + "-dialog[open] .pe-card {" +
      "  animation: peDialogEnter 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;" +
      "}" +
      "dialog#" + scopeId + "-dialog:modal {" +
      "  overscroll-behavior: contain;" +
      "}" +
      "dialog#" + scopeId + "-dialog::backdrop {" +
      "  background: rgba(4, 15, 11, 0.72);" +
      "  backdrop-filter: blur(4px);" +
      "  overflow: hidden;" +
      "  overscroll-behavior: contain;" +
      "}" +
      "#" + scopeId + " .pe-card {" +
      "  position: relative;" +
      "  width: 100%;" +
      "  max-width: 430px;" +
      "  margin: 0 auto;" +
      "  background: #ffffff;" +
      "  border-radius: 18px;" +
      "  border: 2.5px solid var(--pe-gold);" +
      "  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(212, 175, 55, 0.25);" +
      "  overflow: hidden;" +
      "}" +
      "#" + scopeId + " .pe-close-btn {" +
      "  position: absolute !important;" +
      "  top: 10px !important;" +
      "  right: 10px !important;" +
      "  z-index: 10 !important;" +
      "  width: 32px !important;" +
      "  height: 32px !important;" +
      "  min-height: 32px !important;" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "  border-radius: 50% !important;" +
      "  border: 1.5px solid rgba(247, 224, 138, 0.65) !important;" +
      "  background: rgba(0, 0, 0, 0.38) !important;" +
      "  color: var(--pe-gold-light) !important;" +
      "  display: inline-flex !important;" +
      "  align-items: center !important;" +
      "  justify-content: center !important;" +
      "  cursor: pointer !important;" +
      "  font-size: 20px !important;" +
      "  font-weight: 700 !important;" +
      "  line-height: 1 !important;" +
      "  transition: transform 0.18s ease, background-color 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-close-btn:hover {" +
      "  background: rgba(0, 0, 0, 0.65) !important;" +
      "  transform: scale(1.06);" +
      "}" +
      "#" + scopeId + " .pe-close-btn:focus-visible {" +
      "  outline: 2px solid var(--pe-gold-light);" +
      "  outline-offset: 2px;" +
      "}" +
      "#" + scopeId + " .pe-header {" +
      "  position: relative;" +
      "  background: radial-gradient(circle at 50% 32%, var(--pe-header-start) 0%, var(--pe-header-mid) 58%, var(--pe-header-end) 100%);" +
      "  padding: 18px 16px 13px;" +
      "  text-align: center;" +
      "  border-bottom: 2.5px solid var(--pe-gold);" +
      "  overflow: hidden;" +
      "}" +
      "#" + scopeId + " .pe-header-wireframe {" +
      "  position: absolute;" +
      "  inset: 0;" +
      "  width: 100%;" +
      "  height: 100%;" +
      "  pointer-events: none;" +
      "  opacity: 0.34;" +
      "}" +
      "#" + scopeId + " .pe-excel-icon-wrap {" +
      "  position: relative;" +
      "  z-index: 2;" +
      "  width: 118px;" +
      "  height: 108px;" +
      "  margin: 0 auto 4px;" +
      "  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.38));" +
      "}" +
      "#" + scopeId + " .pe-header-badge {" +
      "  position: relative;" +
      "  z-index: 2;" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "  font-size: 23px !important;" +
      "  font-weight: 800 !important;" +
      "  text-transform: uppercase !important;" +
      "  letter-spacing: 0.6px;" +
      "  background: linear-gradient(180deg, var(--pe-gold-light) 0%, var(--pe-gold) 55%, var(--pe-gold-dark) 100%);" +
      "  -webkit-background-clip: text;" +
      "  -webkit-text-fill-color: transparent;" +
      "  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));" +
      "}" +
      "#" + scopeId + " .pe-body {" +
      "  padding: 18px 20px 22px;" +
      "  background: linear-gradient(180deg, #ffffff 0%, #f9fbf9 100%);" +
      "  background-color: #ffffff;" +
      "}" +
      "#" + scopeId + " .pe-title {" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "  text-align: center !important;" +
      "  font-size: 18.5px !important;" +
      "  line-height: 1.32 !important;" +
      "  font-weight: 800 !important;" +
      "  text-transform: uppercase !important;" +
      "  text-wrap: balance;" +
      "  color: var(--pe-title-color) !important;" +
      "  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);" +
      "}" +
      "#" + scopeId + " .pe-project-name {" +
      "  margin: 4px 0 0 !important;" +
      "  padding: 0 !important;" +
      "  text-align: center !important;" +
      "  font-size: 23px !important;" +
      "  line-height: 1.25 !important;" +
      "  font-weight: 800 !important;" +
      "  text-transform: uppercase !important;" +
      "  color: var(--pe-project-color) !important;" +
      "  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);" +
      "}" +
      "#" + scopeId + " .pe-project-name.pe-no-date {" +
      "  margin-bottom: 14px !important;" +
      "}" +
      "#" + scopeId + " .pe-date-wrap {" +
      "  display: flex;" +
      "  justify-content: center;" +
      "  margin: 10px 0 15px;" +
      "}" +
      "#" + scopeId + " .pe-date-pill {" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "  padding: 5px 22px;" +
      "  border-radius: 999px;" +
      "  background: linear-gradient(90deg, var(--pe-gold-dark) 0%, var(--pe-gold) 22%, var(--pe-gold-light) 50%, var(--pe-gold) 78%, var(--pe-gold-dark) 100%);" +
      "  border: 1px solid var(--pe-gold-dark);" +
      "  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.65);" +
      "  color: #111111;" +
      "  font-size: 14.5px;" +
      "  font-weight: 800;" +
      "  letter-spacing: 0.3px;" +
      "}" +
      "#" + scopeId + " .pe-form {" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "}" +
      "#" + scopeId + " .pe-input-group {" +
      "  position: relative;" +
      "  margin: 0 0 11px !important;" +
      "}" +
      "#" + scopeId + " .pe-input-icon {" +
      "  position: absolute;" +
      "  left: 16px;" +
      "  top: 50%;" +
      "  transform: translateY(-50%);" +
      "  width: 20px;" +
      "  height: 20px;" +
      "  color: var(--pe-input-border);" +
      "  pointer-events: none;" +
      "  display: flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "  z-index: 2;" +
      "}" +
      "#" + scopeId + " .pe-input {" +
      "  width: 100% !important;" +
      "  height: 46px !important;" +
      "  margin: 0 !important;" +
      "  padding: 8px 18px 8px 44px !important;" +
      "  border-radius: 999px !important;" +
      "  border: 1.6px solid var(--pe-input-border) !important;" +
      "  background: #ffffff !important;" +
      "  color: #111827 !important;" +
      "  font-size: 15px !important;" +
      "  font-weight: 500 !important;" +
      "  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(0, 0, 0, 0.03) !important;" +
      "  transition: border-color 0.18s ease, box-shadow 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-input::placeholder {" +
      "  color: #6b7280 !important;" +
      "  font-weight: 400 !important;" +
      "}" +
      "#" + scopeId + " .pe-input:focus-visible {" +
      "  outline: 2px solid var(--pe-gold) !important;" +
      "  outline-offset: 1px !important;" +
      "  border-color: var(--pe-project-color) !important;" +
      "}" +
      "#" + scopeId + " .pe-units-grid {" +
      "  display: grid;" +
      "  grid-template-columns: repeat(2, minmax(0, 1fr));" +
      "  gap: 9px 11px;" +
      "  margin: 13px 0 16px !important;" +
      "}" +
      "#" + scopeId + " .pe-unit-card {" +
      "  --unit-bg: #f5f6f7;" +
      "  --unit-border: #ced4da;" +
      "  --unit-text: #1f2937;" +
      "  --unit-weight: 600;" +
      "  display: flex !important;" +
      "  align-items: center !important;" +
      "  gap: 8px !important;" +
      "  min-block-size: 42px;" +
      "  margin: 0 !important;" +
      "  padding: 7px 10px !important;" +
      "  border-radius: 9px !important;" +
      "  background-color: var(--unit-bg) !important;" +
      "  border: 1.4px solid var(--unit-border) !important;" +
      "  color: var(--unit-text) !important;" +
      "  font-weight: var(--unit-weight) !important;" +
      "  font-size: 13.5px !important;" +
      "  cursor: pointer !important;" +
      "  user-select: none;" +
      "  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);" +
      "  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-card:hover {" +
      "  border-color: var(--pe-unit-active-border) !important;" +
      "}" +
      "#" + scopeId + " .pe-unit-card.pe-unit-odd-last {" +
      "  grid-column: 1 / -1;" +
      "  width: calc(50% - 6px);" +
      "  min-width: 165px;" +
      "  margin: 0 auto !important;" +
      "}" +
      "#" + scopeId + " .pe-unit-card:has(.pe-unit-checkbox:checked) {" +
      "  --unit-bg: var(--pe-unit-active-bg);" +
      "  --unit-border: var(--pe-unit-active-border);" +
      "  --unit-text: var(--pe-unit-active-text);" +
      "  --unit-weight: 700;" +
      "  box-shadow: 0 2px 6px rgba(12, 92, 56, 0.12);" +
      "}" +
      "@supports not selector(:has(*)) {" +
      "  #" + scopeId + " .pe-unit-card.is-active {" +
      "    --unit-bg: var(--pe-unit-active-bg);" +
      "    --unit-border: var(--pe-unit-active-border);" +
      "    --unit-text: var(--pe-unit-active-text);" +
      "    --unit-weight: 700;" +
      "    box-shadow: 0 2px 6px rgba(12, 92, 56, 0.12);" +
      "  }" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox {" +
      "  --checkbox-size: 20px;" +
      "  --checkbox-icon-size: 12px;" +
      "  appearance: none !important;" +
      "  -webkit-appearance: none !important;" +
      "  display: inline-grid !important;" +
      "  place-content: center !important;" +
      "  inline-size: var(--checkbox-size) !important;" +
      "  block-size: var(--checkbox-size) !important;" +
      "  width: var(--checkbox-size) !important;" +
      "  height: var(--checkbox-size) !important;" +
      "  aspect-ratio: 1;" +
      "  flex-shrink: 0;" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "  border-radius: 5px !important;" +
      "  border: 1.5px solid #c5ccd3 !important;" +
      "  background-color: #ffffff !important;" +
      "  color: #b8c1c8 !important;" +
      "  cursor: pointer !important;" +
      "  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox::before {" +
      "  content: '';" +
      "  inline-size: var(--checkbox-icon-size);" +
      "  block-size: var(--checkbox-icon-size);" +
      "  aspect-ratio: 1;" +
      "  background-color: currentColor;" +
      "  mask: var(--pe-icon-check) no-repeat center / contain;" +
      "  -webkit-mask: var(--pe-icon-check) no-repeat center / contain;" +
      "  scale: 0.92;" +
      "  transition: scale 150ms ease, background-color 150ms ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox:checked {" +
      "  border-color: var(--pe-unit-active-border) !important;" +
      "  background-color: #ffffff !important;" +
      "  color: var(--pe-unit-active-border) !important;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox:checked::before {" +
      "  scale: 1;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox:focus-visible {" +
      "  outline: 2px solid var(--pe-unit-active-border);" +
      "  outline-offset: 2px;" +
      "}" +
      "#" + scopeId + " .pe-unit-label-wrap {" +
      "  display: flex;" +
      "  flex-direction: column;" +
      "  line-height: 1.25;" +
      "  min-width: 0;" +
      "  overflow: hidden;" +
      "}" +
      "#" + scopeId + " .pe-unit-label-wrap span {" +
      "  display: block;" +
      "  overflow: hidden;" +
      "  text-overflow: ellipsis;" +
      "  white-space: nowrap;" +
      "}" +
      "#" + scopeId + " .pe-submit-btn {" +
      "  width: 100% !important;" +
      "  height: 50px !important;" +
      "  min-height: 50px !important;" +
      "  margin: 0 !important;" +
      "  padding: 0 20px !important;" +
      "  border-radius: 999px !important;" +
      "  border: 2px solid var(--pe-gold) !important;" +
      "  background: linear-gradient(90deg, var(--pe-btn-start) 0%, var(--pe-btn-mid) 48%, var(--pe-btn-end) 100%) !important;" +
      "  color: #ffffff !important;" +
      "  font-size: 16.5px !important;" +
      "  font-weight: 800 !important;" +
      "  text-transform: uppercase !important;" +
      "  letter-spacing: 0.5px !important;" +
      "  display: inline-flex !important;" +
      "  align-items: center !important;" +
      "  justify-content: center !important;" +
      "  cursor: pointer !important;" +
      "  box-shadow: 0 6px 16px rgba(6, 28, 76, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.22) !important;" +
      "  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;" +
      "}" +
      "#" + scopeId + " .pe-submit-btn:hover {" +
      "  filter: brightness(1.08);" +
      "  transform: translateY(-1px);" +
      "}" +
      "#" + scopeId + " .pe-submit-btn:active {" +
      "  transform: translateY(0);" +
      "}" +
      "#" + scopeId + " .pe-submit-btn:focus-visible {" +
      "  outline: 2px solid var(--pe-gold);" +
      "  outline-offset: 2px;" +
      "}" +
      "#" + scopeId + " .pe-error-msg {" +
      "  display: none;" +
      "  margin: 0 0 12px;" +
      "  padding: 8px 12px;" +
      "  border-radius: 8px;" +
      "  background: #fef2f2;" +
      "  border: 1px solid #fecaca;" +
      "  color: #b91c1c;" +
      "  font-size: 12.5px;" +
      "  font-weight: 600;" +
      "  text-align: center;" +
      "}" +
      "#" + scopeId + " .pe-success-box {" +
      "  display: none;" +
      "  text-align: center;" +
      "  padding: 18px 8px 10px;" +
      "}" +
      "#" + scopeId + "-launcher {" +
      "  position: fixed;" +
      "  bottom: 18px;" +
      "  left: 16px;" +
      "  z-index: 99990;" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  gap: 8px;" +
      "  margin: 0 !important;" +
      "  padding: 10px 16px !important;" +
      "  border-radius: 999px !important;" +
      "  border: 2px solid " + theme.goldPrimary + " !important;" +
      "  background: linear-gradient(90deg, " + theme.btnGradStart + ", " + theme.btnGradEnd + ") !important;" +
      "  color: #ffffff !important;" +
      "  font-family: 'Be Vietnam Pro', 'Inter', 'Roboto', Arial, sans-serif !important;" +
      "  font-size: 13px !important;" +
      "  font-weight: 800 !important;" +
      "  text-transform: uppercase !important;" +
      "  cursor: pointer !important;" +
      "  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35) !important;" +
      "  transition: transform 0.2s ease, box-shadow 0.2s ease;" +
      "}" +
      "#" + scopeId + "-launcher:hover {" +
      "  transform: translateY(-2px);" +
      "}" +
      "@media (max-width: 420px) {" +
      "  #" + scopeId + " .pe-body { padding: 15px 14px 18px; }" +
      "  #" + scopeId + " .pe-title { font-size: 17px !important; }" +
      "  #" + scopeId + " .pe-project-name { font-size: 20px !important; }" +
      "  #" + scopeId + " .pe-unit-card { font-size: 12.8px !important; padding: 6px 8px !important; }" +
      "  #" + scopeId + " .pe-unit-card.pe-unit-odd-last { width: 62%; }" +
      "  #" + scopeId + "-launcher { bottom: 64px; left: 12px; padding: 8px 14px !important; font-size: 12px !important; }" +
      "}"
    );
  }

  function buildHeaderGraphicSvg(theme, scopeId, config) {
    var sfx = scopeId ? "-" + scopeId : "";
    var iconType = (config && config.headerIconType) ? config.headerIconType : "excel";
    var customIconUrl = (config && config.customIconUrl) ? String(config.customIconUrl) : "";

    var wireframeHtml =
      '<!-- Architectural Perspective Wireframe Lines -->' +
      '<svg class="pe-header-wireframe" viewBox="0 0 430 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '  <g stroke="' + theme.goldLight + '" stroke-width="0.85" opacity="0.55">' +
      '    <line x1="0" y1="15" x2="115" y2="62" />' +
      '    <line x1="0" y1="48" x2="115" y2="82" />' +
      '    <line x1="0" y1="85" x2="115" y2="104" />' +
      '    <line x1="0" y1="125" x2="115" y2="128" />' +
      '    <line x1="0" y1="162" x2="115" y2="148" />' +
      '    <line x1="18" y1="8" x2="18" y2="170" />' +
      '    <line x1="48" y1="22" x2="48" y2="162" />' +
      '    <line x1="78" y1="38" x2="78" y2="155" />' +
      '    <line x1="104" y1="52" x2="104" y2="150" />' +
      '    <line x1="430" y1="15" x2="315" y2="62" />' +
      '    <line x1="430" y1="48" x2="315" y2="82" />' +
      '    <line x1="430" y1="85" x2="315" y2="104" />' +
      '    <line x1="430" y1="125" x2="315" y2="128" />' +
      '    <line x1="430" y1="162" x2="315" y2="148" />' +
      '    <line x1="412" y1="8" x2="412" y2="170" />' +
      '    <line x1="382" y1="22" x2="382" y2="162" />' +
      '    <line x1="352" y1="38" x2="352" y2="155" />' +
      '    <line x1="326" y1="52" x2="326" y2="150" />' +
      '  </g>' +
      '</svg>';

    var innerIconHtml = "";
    if (iconType === "custom-image" && customIconUrl) {
      innerIconHtml =
        '<div style="width:100%;height:100%;border-radius:14px;border:2px solid ' + theme.goldPrimary + ';background:linear-gradient(135deg,' + theme.headerBgStart + ',' + theme.headerBgEnd + ');padding:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
        '  <img src="' + escapeHtml(customIconUrl) + '" alt="Icon thiết kế dự án" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />' +
        '</div>';
    } else if (iconType === "building") {
      innerIconHtml =
        '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '    <defs>' +
        '      <linearGradient id="peBldGold' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldLight + '" />' +
        '        <stop offset="50%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.goldDark + '" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peBldTower' + sfx + '" x1="0" y1="0" x2="0" y2="1">' +
        '        <stop offset="0%" stop-color="#ffffff" />' +
        '        <stop offset="100%" stop-color="#dce5e7" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peBldBrand' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.headerBgStart + '" />' +
        '        <stop offset="100%" stop-color="' + theme.headerBgEnd + '" />' +
        '      </linearGradient>' +
        '    </defs>' +
        '    <rect x="64" y="20" width="36" height="82" rx="4" fill="url(#peBldBrand' + sfx + ')" stroke="url(#peBldGold' + sfx + ')" stroke-width="1.6" />' +
        '    <path d="M70 20 L82 8 L94 20 Z" fill="url(#peBldGold' + sfx + ')" />' +
        '    <rect x="26" y="14" width="44" height="88" rx="5" fill="url(#peBldTower' + sfx + ')" stroke="url(#peBldGold' + sfx + ')" stroke-width="2" />' +
        '    <rect x="34" y="8" width="28" height="6" rx="2" fill="url(#peBldGold' + sfx + ')" />' +
        '    <g fill="' + theme.headerBgMid + '" opacity="0.88">' +
        '      <rect x="33" y="24" width="12" height="8" rx="1.5" />' +
        '      <rect x="51" y="24" width="12" height="8" rx="1.5" />' +
        '      <rect x="33" y="36" width="12" height="8" rx="1.5" />' +
        '      <rect x="51" y="36" width="12" height="8" rx="1.5" />' +
        '      <rect x="33" y="48" width="12" height="8" rx="1.5" />' +
        '      <rect x="51" y="48" width="12" height="8" rx="1.5" />' +
        '      <rect x="33" y="60" width="12" height="8" rx="1.5" />' +
        '      <rect x="51" y="60" width="12" height="8" rx="1.5" />' +
        '      <rect x="33" y="72" width="12" height="8" rx="1.5" />' +
        '      <rect x="51" y="72" width="12" height="8" rx="1.5" />' +
        '    </g>' +
        '    <rect x="41" y="86" width="14" height="16" rx="2" fill="url(#peBldGold' + sfx + ')" />' +
        '    <rect x="16" y="101" width="94" height="6" rx="3" fill="url(#peBldGold' + sfx + ')" />' +
        '    <circle cx="96" cy="90" r="16" fill="' + theme.headerBgEnd + '" stroke="url(#peBldGold' + sfx + ')" stroke-width="2.2" />' +
        '    <path d="M96 81 V93 M90.5 88.5 L96 94 L101.5 88.5 M89 97.5 H103" stroke="' + theme.goldLight + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />' +
        '  </svg>';
    } else if (iconType === "diamond") {
      innerIconHtml =
        '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '    <defs>' +
        '      <linearGradient id="peDiaGold' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldLight + '" />' +
        '        <stop offset="50%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.goldDark + '" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peDiaTop' + sfx + '" x1="0" y1="0" x2="0" y2="1">' +
        '        <stop offset="0%" stop-color="#ffffff" />' +
        '        <stop offset="100%" stop-color="' + theme.goldLight + '" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peDiaBody' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.headerBgStart + '" />' +
        '      </linearGradient>' +
        '    </defs>' +
        '    <circle cx="65" cy="58" r="46" fill="' + theme.headerBgEnd + '" fill-opacity="0.45" stroke="url(#peDiaGold' + sfx + ')" stroke-width="1.8" stroke-dasharray="4 3" />' +
        '    <polygon points="38,22 92,22 110,46 20,46" fill="url(#peDiaTop' + sfx + ')" stroke="url(#peDiaGold' + sfx + ')" stroke-width="2" />' +
        '    <polygon points="20,46 110,46 65,102" fill="url(#peDiaBody' + sfx + ')" stroke="url(#peDiaGold' + sfx + ')" stroke-width="2.2" />' +
        '    <path d="M38 22 L48 46 L65 102 M92 22 L82 46 L65 102 M65 22 L48 46 M65 22 L82 46 M20 46 H110" stroke="#ffffff" stroke-width="1.4" stroke-opacity="0.75" />' +
        '    <path d="M22 18 L24 24 L30 26 L24 28 L22 34 L20 28 L14 26 L20 24 Z" fill="' + theme.goldLight + '" />' +
        '    <path d="M106 16 L107.5 20.5 L112 22 L107.5 23.5 L106 28 L104.5 23.5 L100 22 L104.5 20.5 Z" fill="#ffffff" />' +
        '  </svg>';
    } else if (iconType === "gift") {
      innerIconHtml =
        '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '    <defs>' +
        '      <linearGradient id="peGiftGold' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldLight + '" />' +
        '        <stop offset="50%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.goldDark + '" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peGiftBox' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.headerBgStart + '" />' +
        '        <stop offset="100%" stop-color="' + theme.headerBgEnd + '" />' +
        '      </linearGradient>' +
        '    </defs>' +
        '    <path d="M65 34 C50 14, 34 20, 44 34 C50 40, 60 36, 65 34 Z" fill="url(#peGiftGold' + sfx + ')" />' +
        '    <path d="M65 34 C80 14, 96 20, 86 34 C80 40, 70 36, 65 34 Z" fill="url(#peGiftGold' + sfx + ')" />' +
        '    <rect x="24" y="34" width="82" height="18" rx="5" fill="url(#peGiftBox' + sfx + ')" stroke="url(#peGiftGold' + sfx + ')" stroke-width="2" />' +
        '    <rect x="30" y="52" width="70" height="50" rx="6" fill="#ffffff" stroke="url(#peGiftGold' + sfx + ')" stroke-width="2" />' +
        '    <rect x="58" y="34" width="14" height="68" fill="url(#peGiftGold' + sfx + ')" />' +
        '    <rect x="30" y="69" width="70" height="12" fill="url(#peGiftGold' + sfx + ')" />' +
        '    <circle cx="96" cy="90" r="16" fill="' + theme.headerBgEnd + '" stroke="url(#peGiftGold' + sfx + ')" stroke-width="2" />' +
        '    <text x="96" y="94" fill="' + theme.goldLight + '" font-size="10" font-weight="800" text-anchor="middle" font-family="sans-serif">VIP</text>' +
        '  </svg>';
    } else if (iconType === "document") {
      innerIconHtml =
        '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '    <defs>' +
        '      <linearGradient id="peDocGold' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldLight + '" />' +
        '        <stop offset="50%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.goldDark + '" />' +
        '      </linearGradient>' +
        '    </defs>' +
        '    <rect x="38" y="10" width="62" height="84" rx="6" fill="url(#peDocGold' + sfx + ')" opacity="0.85" />' +
        '    <rect x="26" y="16" width="64" height="88" rx="6" fill="#ffffff" stroke="url(#peDocGold' + sfx + ')" stroke-width="2" />' +
        '    <rect x="36" y="28" width="44" height="8" rx="3" fill="' + theme.headerBgStart + '" />' +
        '    <rect x="36" y="44" width="44" height="4" rx="2" fill="#cbd5e1" />' +
        '    <rect x="36" y="54" width="36" height="4" rx="2" fill="#cbd5e1" />' +
        '    <rect x="36" y="64" width="42" height="4" rx="2" fill="#cbd5e1" />' +
        '    <rect x="36" y="74" width="28" height="4" rx="2" fill="#cbd5e1" />' +
        '    <circle cx="88" cy="86" r="18" fill="' + theme.headerBgEnd + '" stroke="url(#peDocGold' + sfx + ')" stroke-width="2.4" />' +
        '    <path d="M81 86 L86 91 L96 81" stroke="' + theme.goldLight + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />' +
        '  </svg>';
    } else {
      innerIconHtml =
        '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '    <defs>' +
        '      <linearGradient id="peGoldTab' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.goldLight + '" />' +
        '        <stop offset="50%" stop-color="' + theme.goldPrimary + '" />' +
        '        <stop offset="100%" stop-color="' + theme.goldDark + '" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peSheetBg' + sfx + '" x1="0" y1="0" x2="0" y2="1">' +
        '        <stop offset="0%" stop-color="#ffffff" />' +
        '        <stop offset="100%" stop-color="#e6ece9" />' +
        '      </linearGradient>' +
        '      <linearGradient id="peExcelBadge' + sfx + '" x1="0" y1="0" x2="1" y2="1">' +
        '        <stop offset="0%" stop-color="' + theme.headerBgStart + '" />' +
        '        <stop offset="100%" stop-color="' + theme.headerBgEnd + '" />' +
        '      </linearGradient>' +
        '    </defs>' +
        '    <path d="M84 14 H103 C107 14 110 17 110 21 V74 C110 78 107 81 103 81 H84 V14 Z" fill="url(#peGoldTab' + sfx + ')" />' +
        '    <text x="99" y="48" fill="#ffffff" font-size="9.5" font-weight="800" font-family="Be Vietnam Pro, Arial, sans-serif" letter-spacing="0.8" transform="rotate(90 99 48)" text-anchor="middle">PRICE</text>' +
        '    <path d="M36 8 H78 L96 26 V94 C96 98.4 92.4 102 88 102 H36 C31.6 102 28 98.4 28 94 V16 C28 11.6 31.6 8 36 8 Z" fill="url(#peSheetBg' + sfx + ')" />' +
        '    <path d="M78 8 V21 C78 23.8 80.2 26 83 26 H96 L78 8 Z" fill="#cbd5d0" />' +
        '    <g stroke="' + theme.headerBgStart + '" stroke-width="1.5" fill="' + theme.unitActiveBg + '" opacity="0.9">' +
        '      <rect x="54" y="34" width="15" height="9" rx="1" />' +
        '      <rect x="72" y="34" width="15" height="9" rx="1" />' +
        '      <rect x="54" y="46" width="15" height="9" rx="1" />' +
        '      <rect x="72" y="46" width="15" height="9" rx="1" />' +
        '      <rect x="54" y="58" width="15" height="9" rx="1" />' +
        '      <rect x="72" y="58" width="15" height="9" rx="1" />' +
        '      <rect x="54" y="70" width="15" height="9" rx="1" />' +
        '      <rect x="72" y="70" width="15" height="9" rx="1" />' +
        '      <rect x="54" y="82" width="15" height="9" rx="1" />' +
        '      <rect x="72" y="82" width="15" height="9" rx="1" />' +
        '    </g>' +
        '    <rect x="14" y="32" width="44" height="46" rx="8" fill="url(#peExcelBadge' + sfx + ')" stroke="' + theme.goldPrimary + '" stroke-width="1.2" />' +
        '    <path d="M27 44 L45 66 M45 44 L27 66" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />' +
        '    <circle cx="94" cy="92" r="17" fill="' + theme.headerBgEnd + '" stroke="url(#peGoldTab' + sfx + ')" stroke-width="2.2" />' +
        '    <path d="M94 83 V95 M88.5 90.5 L94 96 L99.5 90.5 M87 99.5 H101" stroke="' + theme.goldLight + '" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />' +
        '  </svg>';
    }

    return wireframeHtml + '<div class="pe-excel-icon-wrap" aria-hidden="true">' + innerIconHtml + '</div>';
  }

  function buildFormInnerHtml(config, scopeId, isInline) {
    var theme = resolveTheme(config);
    var dateDisplay = config.realtimeDate ? getRealtimeDateString() : (config.customDateText || getRealtimeDateString());
    var units = Array.isArray(config.units) && config.units.length > 0 ? config.units : DEFAULT_UNITS;
    var isOddCount = units.length % 2 === 1;
    var shouldShowDate = config.showDate !== false;

    var unitsHtml = units
      .map(function (unit, idx) {
        var isLastOdd = isOddCount && idx === units.length - 1;
        var checkedAttr = unit.checked ? " checked" : "";
        var activeClass = unit.checked ? " is-active" : "";
        var oddClass = isLastOdd ? " pe-unit-odd-last" : "";

        return (
          '<label class="pe-unit-card' + oddClass + activeClass + '" title="' + escapeHtml(unit.label) + '">' +
          '  <input type="checkbox" class="pe-unit-checkbox" name="unit_interest" value="' +
          escapeHtml(unit.label) +
          '"' +
          checkedAttr +
          " />" +
          '  <span class="pe-unit-label-wrap">' +
          "    <span>" +
          escapeHtml(unit.label) +
          "</span>" +
          "  </span>" +
          "</label>"
        );
      })
      .join("");

    var emailInputHtml = config.showEmailField
      ? '<div class="pe-input-group">' +
        '  <span class="pe-input-icon" aria-hidden="true">' +
        '    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' +
        "  </span>" +
        '  <input type="email" name="email" class="pe-input" autocomplete="email" placeholder="' +
        escapeHtml(config.emailPlaceholder || "Email nhận bảng giá") +
        '" aria-label="Email" />' +
        "</div>"
      : "";

    var dateBlockHtml = shouldShowDate
      ? '    <div class="pe-date-wrap">' +
        '      <div class="pe-date-pill">' +
        escapeHtml((config.datePrefix || "NGÀY:") + " " + dateDisplay) +
        "</div>" +
        "    </div>"
      : "";

    var closeBtnHtml = isInline
      ? ""
      : '  <button type="button" class="pe-close-btn" data-pe-close aria-label="Đóng biểu mẫu">&times;</button>';

    return (
      '<div class="pe-card">' +
      closeBtnHtml +
      '  <div class="pe-header">' +
      buildHeaderGraphicSvg(theme, scopeId, config) +
      '    <h3 class="pe-header-badge">' +
      escapeHtml(config.headerBadgeText || "TẢI BẢNG GIÁ") +
      "</h3>" +
      "  </div>" +
      '  <div class="pe-body">' +
      '    <h2 id="' +
      scopeId +
      '-title" class="pe-title">' +
      escapeHtml(config.formTitle || "ĐĂNG KÝ TƯ VẤN VÀ NHẬN GIỎ HÀNG ƯU ĐÃI") +
      "</h2>" +
      '    <div class="pe-project-name' + (shouldShowDate ? "" : " pe-no-date") + '">' +
      escapeHtml(config.projectName || "GREEN SKYLINE") +
      "</div>" +
      dateBlockHtml +
      '    <form class="pe-form" novalidate>' +
      '      <div class="pe-error-msg" role="alert"></div>' +
      '      <div class="pe-input-group">' +
      '        <span class="pe-input-icon" aria-hidden="true">' +
      '          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
      "        </span>" +
      '        <input type="text" name="fullname" class="pe-input" required autocomplete="name" placeholder="' +
      escapeHtml(config.namePlaceholder || "Họ và tên *") +
      '" aria-label="Họ và tên" />' +
      "      </div>" +
      '      <div class="pe-input-group">' +
      '        <span class="pe-input-icon" aria-hidden="true">' +
      '          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
      "        </span>" +
      '        <input type="tel" name="phone" class="pe-input" required inputmode="tel" autocomplete="tel" placeholder="' +
      escapeHtml(config.phonePlaceholder || "Số điện thoại *") +
      '" aria-label="Số điện thoại" />' +
      "      </div>" +
      emailInputHtml +
      '      <div class="pe-units-grid" role="group" aria-label="Chọn loại căn quan tâm">' +
      unitsHtml +
      "      </div>" +
      '      <button type="submit" class="pe-submit-btn">' +
      escapeHtml(config.submitText || "ĐĂNG KÝ") +
      "</button>" +
      "    </form>" +
      '    <div class="pe-success-box" aria-live="polite"></div>' +
      "  </div>" +
      "</div>"
    );
  }

  function wireFormInteractions(rootEl, config, dialogEl, onLeadDispatched) {
    // Fallback for browsers without CSS :has() support
    if (typeof CSS !== "undefined" && !CSS.supports("selector(:has(*))")) {
      var checkboxes = rootEl.querySelectorAll(".pe-unit-checkbox");
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function (e) {
          var card = e.target.closest(".pe-unit-card");
          if (card) {
            card.classList.toggle("is-active", e.target.checked);
          }
        });
      }
    }

    // Close button handler
    var closeBtn = rootEl.querySelector("[data-pe-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (dialogEl && typeof dialogEl.close === "function") {
          dialogEl.close();
        } else {
          rootEl.style.display = "none";
        }
      });
    }

    // Fallback for <dialog closedby="any"> in browsers without native closedBy support
    if (dialogEl && !("closedBy" in HTMLDialogElement.prototype)) {
      dialogEl.addEventListener("click", function (event) {
        if (event.target !== dialogEl) return;
        var rect = dialogEl.getBoundingClientRect();
        var isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialogEl.close();
      });
    }

    var form = rootEl.querySelector(".pe-form");
    var errorEl = rootEl.querySelector(".pe-error-msg");
    var successBox = rootEl.querySelector(".pe-success-box");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('input[name="fullname"]');
      var phoneInput = form.querySelector('input[name="phone"]');
      var emailInput = form.querySelector('input[name="email"]');

      var nameVal = nameInput ? nameInput.value.trim() : "";
      var phoneVal = phoneInput ? phoneInput.value.trim() : "";
      var emailVal = emailInput ? emailInput.value.trim() : "";

      var telRegex = /^[0-9+().\s-]{8,15}$/;
      if (!nameVal) {
        if (errorEl) {
          errorEl.textContent = "Vui lòng nhập Họ và tên của quý khách (*).";
          errorEl.style.display = "block";
        }
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phoneVal || !telRegex.test(phoneVal)) {
        if (errorEl) {
          errorEl.textContent = "Vui lòng nhập Số điện thoại Zalo hợp lệ (8-12 số) (*).";
          errorEl.style.display = "block";
        }
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (errorEl) errorEl.style.display = "none";

      var checkedBoxes = form.querySelectorAll(".pe-unit-checkbox:checked");
      var selectedUnits = [];
      for (var c = 0; c < checkedBoxes.length; c++) {
        selectedUnits.push(checkedBoxes[c].value);
      }

      var result = dispatchLeadToCrm(
        {
          name: nameVal,
          phone: phoneVal,
          email: emailVal,
          unitInterest: selectedUnits.length > 0 ? selectedUnits.join(", ") : "Tất cả sản phẩm " + config.projectName,
        },
        config
      );

      try {
        var projSlug = String(config.projectId || config.projectName || "default").toLowerCase().replace(/[^a-z0-9]+/g, "-");
        global.localStorage.setItem("rf_pe_converted_" + projSlug, "1");
        global.sessionStorage.setItem("rf_pe_converted_" + projSlug, "1");
      } catch (err) {}

      if (typeof onLeadDispatched === "function") {
        onLeadDispatched(result);
      }

      var crmParam = "";
      try {
        crmParam = "?crm_lead=" + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(result.compact)))));
      } catch (err) {}

      form.style.display = "none";
      if (successBox) {
        successBox.style.display = "block";
        successBox.innerHTML =
          '<div style="width:54px;height:54px;border-radius:50%;background:#dcfce7;color:#15803d;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;">' +
          '  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          "</div>" +
          '<h4 style="margin:0 0 6px;font-size:18px;font-weight:800;color:#0f5132;">ĐĂNG KÝ NHẬN BÁO GIÁ THÀNH CÔNG!</h4>' +
          '<p style="margin:0 0 12px;font-size:13.5px;line-height:1.55;color:#374151;">' +
          "  Cảm ơn <strong>" +
          escapeHtml(nameVal) +
          "</strong>! Hệ thống đã ghi nhận nhu cầu <strong>" +
          escapeHtml(result.lead.unitInterest) +
          "</strong> dự án <strong>" +
          escapeHtml(config.projectName) +
          '</strong> và đẩy trực tiếp vào <a href="/crm/' +
          crmParam +
          '" target="_blank" style="color:#0c5c38;font-weight:700;text-decoration:underline;">Realness CRM</a>.' +
          "</p>" +
          '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">' +
          '  <button type="button" data-pe-reset style="padding:9px 18px;border-radius:999px;border:1.5px solid #154c37;background:#ffffff;color:#154c37;font-weight:700;font-size:12.5px;cursor:pointer;">Đăng ký thêm căn khác</button>' +
          "</div>";

        var resetBtn = successBox.querySelector("[data-pe-reset]");
        if (resetBtn) {
          resetBtn.addEventListener("click", function () {
            form.reset();
            successBox.style.display = "none";
            form.style.display = "block";
          });
        }
      }
    });
  }

  function ensurePopupFont(fontFamily) {
    if (typeof document === "undefined" || !document.head) return;
    var fontSpec = resolveFontStack(fontFamily);
    var safeId = "rf-pe-font-" + String(fontFamily || "Be-Vietnam-Pro").replace(/[^a-zA-Z0-9]/g, "-");
    if (!document.getElementById(safeId)) {
      var fontLink = document.createElement("link");
      fontLink.id = safeId;
      fontLink.rel = "stylesheet";
      fontLink.href = fontSpec.href;
      document.head.appendChild(fontLink);
    }
  }

  function normalizeEngineProjectKey(raw) {
    var str = String(raw || "").trim().toLowerCase();
    try {
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } catch (e) {}
    return str
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function extractEngineProjectKeys(cfg) {
    var keys = [];
    function addKey(val) {
      var k = normalizeEngineProjectKey(val);
      if (!k) return;
      if (keys.indexOf(k) === -1) keys.push(k);
      if (/-staging$/.test(k)) addKey(k.replace(/-staging$/, ""));
      if (/-luxury$/.test(k)) addKey(k.replace(/-luxury$/, ""));
      if (/-an-phu$/.test(k)) addKey(k.replace(/-an-phu$/, ""));
      if (k === "green-skyline" && keys.indexOf("tbs-land") === -1) keys.push("tbs-land");
      if (k === "tbs-land" && keys.indexOf("green-skyline") === -1) keys.push("green-skyline");
      if (k === "palm-river") {
        if (keys.indexOf("palm-river-staging") === -1) keys.push("palm-river-staging");
        if (keys.indexOf("palm-river-luxury") === -1) keys.push("palm-river-luxury");
      }
    }
    function extractFromUrl(u) {
      if (!u) return;
      var s = String(u);
      var mPath = s.match(/\/(?:du-an|phan-tich)\/([^/?#]+)/i);
      if (mPath && mPath[1]) addKey(mPath[1]);
      var mHtml = s.match(/\/([^/?#]+)\.html/i);
      if (mHtml && mHtml[1]) addKey(mHtml[1]);
    }
    if (cfg) {
      extractFromUrl(cfg.projectUrl);
      addKey(cfg.projectId);
      addKey(cfg.projectName);
      addKey(cfg.id);
    }
    if (typeof window !== "undefined" && window.location) {
      extractFromUrl(window.location.pathname);
    }
    return keys;
  }

  function readPublishedCookieForKey(key) {
    if (typeof document === "undefined" || !key) return null;
    try {
      var prefix = "rf_pe_pub_" + key + "=";
      var parts = document.cookie ? document.cookie.split("; ") : [];
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(prefix) === 0) {
          var raw = decodeURIComponent(parts[i].substring(prefix.length));
          var parsed = JSON.parse(raw);
          if (parsed && parsed.projectName && Array.isArray(parsed.units)) return parsed;
        }
      }
    } catch (e) {}
    return null;
  }

  function findCrmPublishedOverride(cfg) {
    var candidateKeys = extractEngineProjectKeys(cfg);
    if (!candidateKeys.length) return null;

    // 1. Check rf_crm_published_popup_configs_v1 in localStorage
    try {
      var rawMap = global.localStorage && global.localStorage.getItem("rf_crm_published_popup_configs_v1");
      if (rawMap) {
        var map = JSON.parse(rawMap);
        for (var i = 0; i < candidateKeys.length; i++) {
          var k = candidateKeys[i];
          if (map && map[k] && Array.isArray(map[k].units)) {
            return map[k];
          }
        }
      }
    } catch (e) {}

    // 2. Check cross-subdomain cookie
    for (var c = 0; c < candidateKeys.length; c++) {
      var fromCookie = readPublishedCookieForKey(candidateKeys[c]);
      if (fromCookie) return fromCookie;
    }

    // 3. Check rf_crm_popup_configs_v4 in localStorage
    try {
      var rawList = global.localStorage && global.localStorage.getItem("rf_crm_popup_configs_v4");
      if (rawList) {
        var list = JSON.parse(rawList);
        if (Array.isArray(list)) {
          for (var j = 0; j < list.length; j++) {
            var item = list[j];
            var itemKeys = extractEngineProjectKeys(item);
            for (var m = 0; m < candidateKeys.length; m++) {
              if (itemKeys.indexOf(candidateKeys[m]) !== -1) {
                return item;
              }
            }
          }
        }
      }
    } catch (e) {}

    return null;
  }

  function resolveProjectDefaultConfig(cfg) {
    var candidateKeys = extractEngineProjectKeys(cfg);
    for (var i = 0; i < candidateKeys.length; i++) {
      var k = candidateKeys[i];
      if (PROJECT_DEFAULT_CONFIGS[k]) {
        return PROJECT_DEFAULT_CONFIGS[k];
      }
    }
    return null;
  }

  function applyCrmOverrideToConfig(baseConfig, crmCfg) {
    if (!crmCfg) return baseConfig;
    return Object.assign({}, baseConfig, {
      projectUrl: crmCfg.projectUrl || baseConfig.projectUrl,
      projectName: crmCfg.projectName || baseConfig.projectName,
      headerBadgeText: crmCfg.headerBadgeText || baseConfig.headerBadgeText,
      formTitle: crmCfg.formTitle || baseConfig.formTitle,
      datePrefix: crmCfg.datePrefix || baseConfig.datePrefix || "NGÀY:",
      showDate: crmCfg.realtimeDate !== undefined ? Boolean(crmCfg.realtimeDate || crmCfg.customDateText) : baseConfig.showDate,
      realtimeDate: crmCfg.realtimeDate !== undefined ? crmCfg.realtimeDate : baseConfig.realtimeDate,
      customDateText: crmCfg.customDateText !== undefined ? crmCfg.customDateText : baseConfig.customDateText,
      namePlaceholder: crmCfg.namePlaceholder || baseConfig.namePlaceholder,
      phonePlaceholder: crmCfg.phonePlaceholder || baseConfig.phonePlaceholder,
      submitText: crmCfg.submitText || baseConfig.submitText,
      themePreset: crmCfg.themePreset || baseConfig.themePreset,
      fontFamily: crmCfg.fontFamily || baseConfig.fontFamily || "Be Vietnam Pro",
      headerIconType: crmCfg.headerIconType || baseConfig.headerIconType || "excel",
      customIconUrl: crmCfg.customIconUrl !== undefined ? crmCfg.customIconUrl : (baseConfig.customIconUrl || ""),
      customColors: crmCfg.colors || crmCfg.customColors || baseConfig.customColors,
      units: Array.isArray(crmCfg.units) && crmCfg.units.length > 0 ? crmCfg.units : baseConfig.units,
      budgetRange: crmCfg.budgetRange || baseConfig.budgetRange,
      showFloatingLauncher: false,
    });
  }

  function fetchRemoteCrmPopupConfig(cfg, onResolved) {
    if (typeof fetch !== "function") return;
    var candidateKeys = extractEngineProjectKeys(cfg);
    if (!candidateKeys.length) return;
    var primaryKey = candidateKeys[0];
    fetch(CRM_SYNC_API_URL + "?project=" + encodeURIComponent(primaryKey) + "&t=" + Math.floor(Date.now() / 5000), {
      method: "GET",
      cache: "no-store",
    })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (data) {
        if (!data || !data.configs || typeof data.configs !== "object") return;
        try {
          var existingRaw = global.localStorage && global.localStorage.getItem("rf_crm_published_popup_configs_v1");
          var existingMap = existingRaw ? JSON.parse(existingRaw) : {};
          var mergedMap = Object.assign({}, existingMap, data.configs);
          if (global.localStorage) {
            global.localStorage.setItem("rf_crm_published_popup_configs_v1", JSON.stringify(mergedMap));
          }
          for (var i = 0; i < candidateKeys.length; i++) {
            var k = candidateKeys[i];
            if (mergedMap[k] && Array.isArray(mergedMap[k].units)) {
              if (typeof onResolved === "function") {
                onResolved(mergedMap[k]);
              }
              break;
            }
          }
        } catch (e) {}
      })
      .catch(function () {});
  }

  /**
   * Render trực tiếp vào 1 container DOM (Dùng cho Live Preview hoặc Inline Form)
   */
  function renderIntoContainer(containerEl, customConfig, onLeadDispatched) {
    if (!containerEl) return;
    var projectDefaults = resolveProjectDefaultConfig(customConfig || {}) || {};
    var baseCfg = Object.assign({}, DEFAULT_CONFIG, projectDefaults, customConfig || {});
    var config = applyCrmOverrideToConfig(baseCfg, findCrmPublishedOverride(baseCfg));
    var scopeId = "rf-pe-" + Math.random().toString(36).substring(2, 8);

    function renderMount() {
      ensurePopupFont(config.fontFamily);
      var theme = resolveTheme(config);
      containerEl.innerHTML =
        "<style>" +
        buildPopupStyles(scopeId, theme, config.fontFamily) +
        "</style>" +
        '<div id="' +
        scopeId +
        '">' +
        buildFormInnerHtml(config, scopeId, true) +
        "</div>";

      var rootEl = containerEl.querySelector("#" + scopeId);
      wireFormInteractions(rootEl, config, null, onLeadDispatched);
    }

    renderMount();

    function hotReloadInline(newCrmCfg) {
      if (!newCrmCfg) return;
      config = applyCrmOverrideToConfig(baseCfg, newCrmCfg);
      renderMount();
    }

    fetchRemoteCrmPopupConfig(baseCfg, function (remoteCfg) {
      hotReloadInline(remoteCfg);
    });

    function checkInlinePayload(payload) {
      if (!payload || payload.type !== "RF_POPUP_CONFIG_PUBLISHED" || !payload.config) return;
      var myKeys = extractEngineProjectKeys(baseCfg);
      var incomingKeys = Array.isArray(payload.keys) ? payload.keys : extractEngineProjectKeys(payload.config);
      for (var i = 0; i < incomingKeys.length; i++) {
        if (myKeys.indexOf(incomingKeys[i]) !== -1) {
          hotReloadInline(payload.config);
          break;
        }
      }
    }

    try {
      if ("BroadcastChannel" in global) {
        var inlineCh = new BroadcastChannel("rf_crm_popup_sync_channel");
        inlineCh.onmessage = function (ev) {
          checkInlinePayload(ev.data);
        };
      }
    } catch (e) {}

    if (typeof global.addEventListener === "function") {
      global.addEventListener("storage", function (ev) {
        if (!ev || !ev.key || ev.key === "rf_crm_published_popup_configs_v1" || ev.key === "rf_crm_popup_configs_v4") {
          var latest = findCrmPublishedOverride(baseCfg);
          if (latest) hotReloadInline(latest);
        }
      });
      global.addEventListener("rf:popup-config-published", function (ev) {
        if (ev && ev.detail) checkInlinePayload(ev.detail);
      });
      global.addEventListener("message", function (ev) {
        if (ev && ev.data && ev.data.type === "RF_POPUP_CONFIG_PUBLISHED") {
          checkInlinePayload(ev.data);
        }
      });
    }

    return {
      scopeId: scopeId,
      config: config,
    };
  }

  /**
   * Khởi tạo Pop-up Modal nổi lên trên Website (sử dụng <dialog closedby="any">)
   * Hỗ trợ cơ chế hiển thị thông minh 2 nhịp ("smart") không gây khó chịu cho khách
   */
  function initModalPopup(customConfig, onLeadDispatched) {
    var projectDefaults = resolveProjectDefaultConfig(customConfig || {}) || {};
    var baseCfg = Object.assign({}, DEFAULT_CONFIG, projectDefaults, customConfig || {});
    var config = applyCrmOverrideToConfig(baseCfg, findCrmPublishedOverride(baseCfg));
    var scopeId = "rf-pe-modal";
    var theme = resolveTheme(config);

    // Ensure selected font is loaded on host page
    ensurePopupFont(config.fontFamily);

    var existingStyle = document.getElementById(scopeId + "-style");
    if (existingStyle && existingStyle.parentNode) existingStyle.parentNode.removeChild(existingStyle);
    var existingDialog = document.getElementById(scopeId + "-dialog");
    if (existingDialog && existingDialog.parentNode) existingDialog.parentNode.removeChild(existingDialog);
    var existingLauncher = document.getElementById(scopeId + "-launcher");
    if (existingLauncher && existingLauncher.parentNode) existingLauncher.parentNode.removeChild(existingLauncher);

    var styleEl = document.createElement("style");
    styleEl.id = scopeId + "-style";
    styleEl.textContent = buildPopupStyles(scopeId, theme, config.fontFamily);
    document.head.appendChild(styleEl);

    var dialogEl = document.createElement("dialog");
    dialogEl.id = scopeId + "-dialog";
    dialogEl.setAttribute("closedby", "any");
    dialogEl.setAttribute("aria-labelledby", scopeId + "-title");
    dialogEl.innerHTML = '<div id="' + scopeId + '">' + buildFormInnerHtml(config, scopeId, false) + "</div>";
    document.body.appendChild(dialogEl);

    var rootEl = dialogEl.querySelector("#" + scopeId);
    wireFormInteractions(rootEl, config, dialogEl, onLeadDispatched);

    function hotReloadModalWithCrmConfig(newCrmCfg) {
      if (!newCrmCfg) return;
      config = applyCrmOverrideToConfig(baseCfg, newCrmCfg);
      ensurePopupFont(config.fontFamily);
      theme = resolveTheme(config);
      styleEl.textContent = buildPopupStyles(scopeId, theme, config.fontFamily);
      dialogEl.innerHTML = '<div id="' + scopeId + '">' + buildFormInnerHtml(config, scopeId, false) + "</div>";
      var newRootEl = dialogEl.querySelector("#" + scopeId);
      wireFormInteractions(newRootEl, config, dialogEl, onLeadDispatched);
    }

    fetchRemoteCrmPopupConfig(baseCfg, function (remoteCfg) {
      hotReloadModalWithCrmConfig(remoteCfg);
      forwardPublishedConfigToIframes({
        type: "RF_POPUP_CONFIG_PUBLISHED",
        keys: extractEngineProjectKeys(baseCfg),
        config: remoteCfg,
      });
    });

    function forwardPublishedConfigToIframes(payload) {
      try {
        var frames = document.querySelectorAll('iframe[src*="/embed/lead-form"], iframe[src*="/embed/form"]');
        for (var i = 0; i < frames.length; i++) {
          if (frames[i].contentWindow) {
            frames[i].contentWindow.postMessage(payload, "*");
          }
        }
      } catch (e) {}
    }

    function checkAndApplyPayload(payload) {
      if (!payload || payload.type !== "RF_POPUP_CONFIG_PUBLISHED" || !payload.config) return;
      forwardPublishedConfigToIframes(payload);
      var myKeys = extractEngineProjectKeys(baseCfg);
      var incomingKeys = Array.isArray(payload.keys) ? payload.keys : extractEngineProjectKeys(payload.config);
      for (var i = 0; i < incomingKeys.length; i++) {
        if (myKeys.indexOf(incomingKeys[i]) !== -1) {
          hotReloadModalWithCrmConfig(payload.config);
          break;
        }
      }
    }

    try {
      if ("BroadcastChannel" in global) {
        var syncCh = new BroadcastChannel("rf_crm_popup_sync_channel");
        syncCh.onmessage = function (ev) {
          checkAndApplyPayload(ev.data);
        };
      }
    } catch (e) {}

    if (typeof global.addEventListener === "function") {
      global.addEventListener("storage", function (ev) {
        if (!ev || !ev.key || ev.key === "rf_crm_published_popup_configs_v1" || ev.key === "rf_crm_popup_configs_v4") {
          var latest = findCrmPublishedOverride(baseCfg);
          if (latest) hotReloadModalWithCrmConfig(latest);
        }
      });
      global.addEventListener("rf:popup-config-published", function (ev) {
        if (ev && ev.detail) checkAndApplyPayload(ev.detail);
      });
    }

    function openPopup() {
      if (typeof dialogEl.showModal === "function") {
        if (!dialogEl.open) dialogEl.showModal();
      } else {
        dialogEl.setAttribute("open", "open");
      }
    }

    function closePopup() {
      if (typeof dialogEl.close === "function" && dialogEl.open) {
        dialogEl.close();
      } else {
        dialogEl.removeAttribute("open");
      }
    }

    global.__rfPopupModalOpen = openPopup;
    global.__rfPopupModalClose = closePopup;

    var oldLauncher = document.getElementById(scopeId + "-launcher");
    if (oldLauncher && oldLauncher.parentNode) {
      oldLauncher.parentNode.removeChild(oldLauncher);
    }

    // Bind any host page trigger elements ([data-rf-popup-open], a[href="#popup_auto"], a[href="#bao-gia"], .btn_popup)
    if (!global.__rfPopupClickBound) {
      global.__rfPopupClickBound = true;
      document.addEventListener(
        "click",
        function (e) {
          var trigger =
            e.target && e.target.closest
              ? e.target.closest('[data-rf-popup-open], a[href="#popup_auto"], a[href="#bao-gia"], .btn_popup')
              : null;
          if (trigger && typeof global.__rfPopupModalOpen === "function") {
            e.preventDefault();
            e.stopPropagation();
            if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
            global.__rfPopupModalOpen();
          }
        },
        true
      );
    }

    // Smart Non-Intrusive 2-Stage Cadence
    var projSlug = String(config.projectId || config.projectName || "default").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    var convertedKey = "rf_pe_converted_" + projSlug;
    var countKey = "rf_pe_autoshow_count_" + projSlug;
    var maxShows = Math.max(1, Number(config.maxAutoTriggers || 2));

    function hasConverted() {
      try {
        return (
          global.localStorage.getItem(convertedKey) === "1" ||
          global.sessionStorage.getItem(convertedKey) === "1"
        );
      } catch (e) {
        return false;
      }
    }

    function getAutoShowCount() {
      try {
        return Number(global.sessionStorage.getItem(countKey) || "0");
      } catch (e) {
        return 0;
      }
    }

    function incrementAutoShowCount() {
      var next = getAutoShowCount() + 1;
      try {
        global.sessionStorage.setItem(countKey, String(next));
      } catch (e) {}
      return next;
    }

    function isUserBusy() {
      if (document.hidden) return true;
      if (dialogEl.open) return true;
      var active = document.activeElement;
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT")) {
        return true;
      }
      var mfpOpen = document.querySelector(".mfp-wrap");
      if (mfpOpen) return true;
      return false;
    }

    if (config.triggerMode === "immediate") {
      setTimeout(openPopup, 150);
    } else if (config.triggerMode === "delay") {
      var ms = Math.max(0, Number(config.delaySeconds || 2) * 1000);
      setTimeout(openPopup, ms);
    } else if (config.triggerMode === "smart") {
      var firstDelayMs = Math.max(4000, Number(config.delaySeconds || 12) * 1000);
      var repeatDelayMs = Math.max(15000, Number(config.repeatDelaySeconds || 60) * 1000);
      var pageLoadTime = Date.now();
      var lastClosedTime = 0;
      var hasInteractedSinceClose = false;
      var maxScrollRatio = 0;

      window.addEventListener(
        "scroll",
        function () {
          var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
          var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          var ratio = scrollTop / docHeight;
          if (ratio > maxScrollRatio) maxScrollRatio = ratio;
          if (lastClosedTime > 0 && Date.now() - lastClosedTime > 3000) {
            hasInteractedSinceClose = true;
          }
        },
        { passive: true }
      );

      dialogEl.addEventListener("close", function () {
        lastClosedTime = Date.now();
        hasInteractedSinceClose = false;
      });

      var smartTimer = setInterval(function () {
        if (hasConverted()) {
          clearInterval(smartTimer);
          return;
        }
        var shownSoFar = getAutoShowCount();
        if (shownSoFar >= maxShows) {
          clearInterval(smartTimer);
          return;
        }
        if (isUserBusy()) return;

        var now = Date.now();
        if (shownSoFar === 0) {
          var elapsed = now - pageLoadTime;
          var readyForFirst = elapsed >= firstDelayMs || (elapsed >= 8000 && maxScrollRatio >= 0.25);
          if (readyForFirst) {
            incrementAutoShowCount();
            openPopup();
          }
        } else if (shownSoFar === 1 && lastClosedTime > 0) {
          var sinceClose = now - lastClosedTime;
          if (sinceClose >= repeatDelayMs && (hasInteractedSinceClose || sinceClose >= repeatDelayMs + 25000)) {
            incrementAutoShowCount();
            openPopup();
            clearInterval(smartTimer);
          }
        }
      }, 1000);
    }

    return {
      open: openPopup,
      close: closePopup,
      dialog: dialogEl,
      config: config,
    };
  }

  // Auto-init if loaded via <script data-rf-popup-config="..." ...>
  function autoInitFromScriptTag() {
    var scriptEl = document.currentScript;
    if (!scriptEl || (!scriptEl.getAttribute("data-rf-popup-config") && !scriptEl.getAttribute("data-project-name") && !scriptEl.getAttribute("data-rf-popup-auto"))) {
      scriptEl = document.querySelector("script[data-rf-popup-config], script[data-project-name], script[data-rf-popup-auto]");
    }
    if (!scriptEl) return;
    var rawJson = scriptEl.getAttribute("data-rf-popup-config");
    var cfg = {};
    if (rawJson) {
      try {
        cfg = JSON.parse(rawJson);
      } catch (e) {}
    } else {
      if (scriptEl.getAttribute("data-project-name")) cfg.projectName = scriptEl.getAttribute("data-project-name");
      if (scriptEl.getAttribute("data-theme")) cfg.themePreset = scriptEl.getAttribute("data-theme");
      if (scriptEl.getAttribute("data-title")) cfg.formTitle = scriptEl.getAttribute("data-title");
      if (scriptEl.getAttribute("data-badge")) cfg.headerBadgeText = scriptEl.getAttribute("data-badge");
      if (scriptEl.getAttribute("data-submit")) cfg.submitText = scriptEl.getAttribute("data-submit");
      if (scriptEl.getAttribute("data-trigger")) cfg.triggerMode = scriptEl.getAttribute("data-trigger");
      if (scriptEl.getAttribute("data-delay")) cfg.delaySeconds = Number(scriptEl.getAttribute("data-delay"));
      if (scriptEl.getAttribute("data-units")) {
        try {
          cfg.units = JSON.parse(scriptEl.getAttribute("data-units"));
        } catch (e) {}
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        initModalPopup(cfg);
      });
    } else {
      initModalPopup(cfg);
    }
  }

  global.RealnessPopupEngine = {
    version: "2.1.0",
    THEME_PRESETS: THEME_PRESETS,
    DEFAULT_UNITS: DEFAULT_UNITS,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    getRealtimeDateString: getRealtimeDateString,
    resolveTheme: resolveTheme,
    renderIntoContainer: renderIntoContainer,
    initModalPopup: initModalPopup,
    open: function () {
      if (typeof global.__rfPopupModalOpen === "function") global.__rfPopupModalOpen();
    },
    close: function () {
      if (typeof global.__rfPopupModalClose === "function") global.__rfPopupModalClose();
    },
    dispatchLeadToCrm: dispatchLeadToCrm,
    buildPopupStyles: buildPopupStyles,
    buildFormInnerHtml: buildFormInnerHtml,
  };

  if (typeof global.addEventListener === "function") {
    global.addEventListener("message", function (ev) {
      if (!ev || !ev.data || ev.data.type !== "RF_LEAD_FORM_RESIZE") return;
      var targetH = Math.ceil(Number(ev.data.height));
      if (!(targetH >= 220 && targetH <= 1200)) return;
      var frames = document.querySelectorAll('iframe[src*="/embed/lead-form"], iframe[src*="/embed/form"]');
      for (var i = 0; i < frames.length; i++) {
        var f = frames[i];
        if (!ev.source || f.contentWindow === ev.source) {
          if (Math.abs(f.offsetHeight - targetH) > 2) {
            f.style.height = targetH + "px";
          }
        }
      }
    });
  }

  autoInitFromScriptTag();
})(typeof window !== "undefined" ? window : this);
