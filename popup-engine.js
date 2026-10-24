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
  };

  var DEFAULT_UNITS = [
    { id: "u-1", label: "Căn 1PN", quantity: "", checked: true },
    { id: "u-2", label: "Căn 2PN", quantity: "", checked: false },
    { id: "u-3", label: "Căn 3PN", quantity: "", checked: false },
    { id: "u-4", label: "Nhà phố/Biệt thự", quantity: "", checked: true },
    { id: "u-5", label: "Shophouse", quantity: "", checked: false },
  ];

  var DEFAULT_CONFIG = {
    projectId: "tbs-land",
    projectName: "TBS LAND",
    headerBadgeText: "TẢI BẢNG GIÁ",
    formTitle: "ĐĂNG KÝ NHẬN BÁO GIÁ",
    showDate: true,
    datePrefix: "NGÀY:",
    realtimeDate: true,
    customDateText: "",
    namePlaceholder: "Họ và tên *",
    phonePlaceholder: "Số điện thoại *",
    showEmailField: false,
    emailPlaceholder: "Email nhận bảng giá (Tuỳ chọn)",
    submitText: "ĐĂNG KÝ BÁO GIÁ",
    themePreset: "emerald-gold",
    customColors: null,
    units: DEFAULT_UNITS,
    triggerMode: "immediate", // "immediate" | "delay" | "smart" | "button" | "inline"
    delaySeconds: 12,
    repeatDelaySeconds: 60,
    maxAutoTriggers: 2,
    showFloatingLauncher: true,
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

  function buildPopupStyles(scopeId, theme) {
    return (
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
      "  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;" +
      "  box-sizing: border-box;" +
      "}" +
      "#" + scopeId + " *, #" + scopeId + " *::before, #" + scopeId + " *::after {" +
      "  box-sizing: border-box;" +
      "}" +
      "dialog#" + scopeId + "-dialog {" +
      "  padding: 0;" +
      "  border: none;" +
      "  background: transparent;" +
      "  max-width: 440px;" +
      "  width: calc(100vw - 24px);" +
      "  margin: auto;" +
      "  overflow: auto;" +
      "  overscroll-behavior: contain;" +
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
      "  position: absolute;" +
      "  top: 10px;" +
      "  right: 10px;" +
      "  z-index: 10;" +
      "  width: 32px;" +
      "  height: 32px;" +
      "  border-radius: 50%;" +
      "  border: 1.5px solid rgba(247, 224, 138, 0.65);" +
      "  background: rgba(0, 0, 0, 0.35);" +
      "  color: var(--pe-gold-light);" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "  cursor: pointer;" +
      "  font-size: 18px;" +
      "  line-height: 1;" +
      "  transition: transform 0.18s ease, background-color 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-close-btn:hover {" +
      "  background: rgba(0, 0, 0, 0.6);" +
      "  transform: scale(1.06);" +
      "}" +
      "#" + scopeId + " .pe-close-btn:focus-visible {" +
      "  outline: 2px solid var(--pe-gold-light);" +
      "  outline-offset: 2px;" +
      "}" +
      "#" + scopeId + " .pe-header {" +
      "  position: relative;" +
      "  background: radial-gradient(circle at 50% 32%, var(--pe-header-start) 0%, var(--pe-header-mid) 58%, var(--pe-header-end) 100%);" +
      "  padding: 20px 16px 14px;" +
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
      "  width: 122px;" +
      "  height: 112px;" +
      "  margin: 0 auto 6px;" +
      "  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.38));" +
      "}" +
      "#" + scopeId + " .pe-header-badge {" +
      "  position: relative;" +
      "  z-index: 2;" +
      "  margin: 0;" +
      "  font-size: 24px;" +
      "  font-weight: 800;" +
      "  text-transform: uppercase;" +
      "  letter-spacing: 0.6px;" +
      "  background: linear-gradient(180deg, var(--pe-gold-light) 0%, var(--pe-gold) 55%, var(--pe-gold-dark) 100%);" +
      "  -webkit-background-clip: text;" +
      "  -webkit-text-fill-color: transparent;" +
      "  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));" +
      "}" +
      "#" + scopeId + " .pe-body {" +
      "  padding: 20px 22px 24px;" +
      "  background: linear-gradient(180deg, #ffffff 0%, #f9f6 100%);" +
      "  background-color: #ffffff;" +
      "}" +
      "#" + scopeId + " .pe-title {" +
      "  margin: 0;" +
      "  text-align: center;" +
      "  font-size: 22px;" +
      "  line-height: 1.28;" +
      "  font-weight: 800;" +
      "  text-transform: uppercase;" +
      "  color: var(--pe-title-color);" +
      "  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);" +
      "}" +
      "#" + scopeId + " .pe-project-name {" +
      "  margin: 3px 0 0;" +
      "  text-align: center;" +
      "  font-size: 23px;" +
      "  line-height: 1.25;" +
      "  font-weight: 800;" +
      "  text-transform: uppercase;" +
      "  color: var(--pe-project-color);" +
      "  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);" +
      "}" +
      "#" + scopeId + " .pe-date-wrap {" +
      "  display: flex;" +
      "  justify-content: center;" +
      "  margin: 10px 0 16px;" +
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
      "#" + scopeId + " .pe-input-group {" +
      "  position: relative;" +
      "  margin-bottom: 12px;" +
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
      "}" +
      "#" + scopeId + " .pe-input {" +
      "  width: 100%;" +
      "  height: 46px;" +
      "  padding: 8px 18px 8px 44px;" +
      "  border-radius: 999px;" +
      "  border: 1.6px solid var(--pe-input-border);" +
      "  background: #ffffff;" +
      "  color: #111827;" +
      "  font-size: 15px;" +
      "  font-weight: 500;" +
      "  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(0, 0, 0, 0.03);" +
      "  transition: border-color 0.18s ease, box-shadow 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-input::placeholder {" +
      "  color: #6b7280;" +
      "  font-weight: 400;" +
      "}" +
      "#" + scopeId + " .pe-input:focus-visible {" +
      "  outline: 2px solid var(--pe-gold);" +
      "  outline-offset: 1px;" +
      "  border-color: var(--pe-project-color);" +
      "}" +
      "#" + scopeId + " .pe-units-grid {" +
      "  display: grid;" +
      "  grid-template-columns: repeat(2, minmax(0, 1fr));" +
      "  gap: 10px 12px;" +
      "  margin: 14px 0 18px;" +
      "}" +
      "#" + scopeId + " .pe-unit-card {" +
      "  --unit-bg: #f5f6f7;" +
      "  --unit-border: #ced4da;" +
      "  --unit-text: #1f2937;" +
      "  --unit-weight: 500;" +
      "  display: flex;" +
      "  align-items: center;" +
      "  gap: 9px;" +
      "  min-block-size: 44px;" +
      "  padding: 8px 11px;" +
      "  border-radius: 9px;" +
      "  background-color: var(--unit-bg);" +
      "  border: 1.4px solid var(--unit-border);" +
      "  color: var(--unit-text);" +
      "  font-weight: var(--unit-weight);" +
      "  font-size: 14.5px;" +
      "  cursor: pointer;" +
      "  user-select: none;" +
      "  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);" +
      "  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-card:hover {" +
      "  border-color: var(--pe-unit-active-border);" +
      "}" +
      "#" + scopeId + " .pe-unit-card.pe-unit-odd-last {" +
      "  grid-column: 1 / -1;" +
      "  width: calc(50% - 6px);" +
      "  min-width: 165px;" +
      "  margin: 0 auto;" +
      "}" +
      "#" + scopeId + " .pe-unit-card:has(.pe-unit-checkbox:checked) {" +
      "  --unit-bg: var(--pe-unit-active-bg);" +
      "  --unit-border: var(--pe-unit-active-border);" +
      "  --unit-text: var(--pe-unit-active-text);" +
      "  --unit-weight: 600;" +
      "  box-shadow: 0 2px 6px rgba(12, 92, 56, 0.12);" +
      "}" +
      "@supports not selector(:has(*)) {" +
      "  #" + scopeId + " .pe-unit-card.is-active {" +
      "    --unit-bg: var(--pe-unit-active-bg);" +
      "    --unit-border: var(--pe-unit-active-border);" +
      "    --unit-text: var(--pe-unit-active-text);" +
      "    --unit-weight: 600;" +
      "    box-shadow: 0 2px 6px rgba(12, 92, 56, 0.12);" +
      "  }" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox {" +
      "  --checkbox-size: 21px;" +
      "  --checkbox-icon-size: 13px;" +
      "  appearance: none;" +
      "  -webkit-appearance: none;" +
      "  display: inline-grid;" +
      "  place-content: center;" +
      "  inline-size: var(--checkbox-size);" +
      "  aspect-ratio: 1;" +
      "  flex-shrink: 0;" +
      "  margin: 0;" +
      "  border-radius: 5px;" +
      "  border: 1.5px solid #c5ccd3;" +
      "  background-color: #ffffff;" +
      "  color: #b8c1c8;" +
      "  cursor: pointer;" +
      "  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox::before {" +
      "  content: '';" +
      "  inline-size: var(--checkbox-icon-size);" +
      "  aspect-ratio: 1;" +
      "  background-color: currentColor;" +
      "  mask: var(--pe-icon-check) no-repeat center / contain;" +
      "  -webkit-mask: var(--pe-icon-check) no-repeat center / contain;" +
      "  scale: 0.92;" +
      "  transition: scale 150ms ease, background-color 150ms ease;" +
      "}" +
      "#" + scopeId + " .pe-unit-checkbox:checked {" +
      "  border-color: var(--pe-unit-active-border);" +
      "  background-color: #ffffff;" +
      "  color: var(--pe-unit-active-border);" +
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
      "  line-height: 1.2;" +
      "  min-width: 0;" +
      "}" +
      "#" + scopeId + " .pe-unit-qty {" +
      "  font-size: 11px;" +
      "  font-weight: 700;" +
      "  color: var(--pe-unit-active-border);" +
      "  margin-top: 2px;" +
      "}" +
      "#" + scopeId + " .pe-submit-btn {" +
      "  width: 100%;" +
      "  height: 50px;" +
      "  border-radius: 999px;" +
      "  border: 2px solid var(--pe-gold);" +
      "  background: linear-gradient(90deg, var(--pe-btn-start) 0%, var(--pe-btn-mid) 48%, var(--pe-btn-end) 100%);" +
      "  color: #ffffff;" +
      "  font-size: 17px;" +
      "  font-weight: 800;" +
      "  text-transform: uppercase;" +
      "  letter-spacing: 0.5px;" +
      "  cursor: pointer;" +
      "  box-shadow: 0 6px 16px rgba(6, 28, 76, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.22);" +
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
      "  bottom: 22px;" +
      "  left: 22px;" +
      "  z-index: 99990;" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  gap: 8px;" +
      "  padding: 11px 18px;" +
      "  border-radius: 999px;" +
      "  border: 2px solid " + theme.goldPrimary + ";" +
      "  background: linear-gradient(90deg, " + theme.btnGradStart + ", " + theme.btnGradEnd + ");" +
      "  color: #ffffff;" +
      "  font-family: 'Montserrat', sans-serif;" +
      "  font-size: 13.5px;" +
      "  font-weight: 800;" +
      "  text-transform: uppercase;" +
      "  cursor: pointer;" +
      "  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);" +
      "}" +
      "@media (max-width: 420px) {" +
      "  #" + scopeId + " .pe-body { padding: 16px 14px 20px; }" +
      "  #" + scopeId + " .pe-title { font-size: 19px; }" +
      "  #" + scopeId + " .pe-project-name { font-size: 20px; }" +
      "  #" + scopeId + " .pe-unit-card { font-size: 13.5px; padding: 7px 9px; }" +
      "  #" + scopeId + " .pe-unit-card.pe-unit-odd-last { width: 62%; }" +
      "}"
    );
  }

  function buildHeaderGraphicSvg(theme) {
    return (
      '<!-- Architectural Perspective Wireframe Lines -->' +
      '<svg class="pe-header-wireframe" viewBox="0 0 430 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '  <g stroke="' + theme.goldLight + '" stroke-width="0.85" opacity="0.55">' +
      '    <!-- Left Building Perspective -->' +
      '    <line x1="0" y1="15" x2="115" y2="62" />' +
      '    <line x1="0" y1="48" x2="115" y2="82" />' +
      '    <line x1="0" y1="85" x2="115" y2="104" />' +
      '    <line x1="0" y1="125" x2="115" y2="128" />' +
      '    <line x1="0" y1="162" x2="115" y2="148" />' +
      '    <line x1="18" y1="8" x2="18" y2="170" />' +
      '    <line x1="48" y1="22" x2="48" y2="162" />' +
      '    <line x1="78" y1="38" x2="78" y2="155" />' +
      '    <line x1="104" y1="52" x2="104" y2="150" />' +
      '    <!-- Right Building Perspective -->' +
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
      '</svg>' +
      '<!-- 3D Excel Price Sheet Illustration -->' +
      '<div class="pe-excel-icon-wrap" aria-hidden="true">' +
      '  <svg viewBox="0 0 130 116" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '    <defs>' +
      '      <linearGradient id="peGoldTab" x1="0" y1="0" x2="1" y2="1">' +
      '        <stop offset="0%" stop-color="#f7df8b" />' +
      '        <stop offset="50%" stop-color="#d4af37" />' +
      '        <stop offset="100%" stop-color="#9a711c" />' +
      '      </linearGradient>' +
      '      <linearGradient id="peSheetBg" x1="0" y1="0" x2="0" y2="1">' +
      '        <stop offset="0%" stop-color="#ffffff" />' +
      '        <stop offset="100%" stop-color="#e6ece9" />' +
      '      </linearGradient>' +
      '      <linearGradient id="peExcelBadge" x1="0" y1="0" x2="1" y2="1">' +
      '        <stop offset="0%" stop-color="#1e7e53" />' +
      '        <stop offset="100%" stop-color="#0b462c" />' +
      '      </linearGradient>' +
      '    </defs>' +
      '    <!-- Gold PRICE Folder Tab on Right -->' +
      '    <path d="M84 14 H103 C107 14 110 17 110 21 V74 C110 78 107 81 103 81 H84 V14 Z" fill="url(#peGoldTab)" />' +
      '    <text x="99" y="48" fill="#ffffff" font-size="9.5" font-weight="800" font-family="Montserrat, Arial, sans-serif" letter-spacing="0.8" transform="rotate(90 99 48)" text-anchor="middle">PRICE</text>' +
      '    <!-- Main White Document Sheet -->' +
      '    <path d="M36 8 H78 L96 26 V94 C96 98.4 92.4 102 88 102 H36 C31.6 102 28 98.4 28 94 V16 C28 11.6 31.6 8 36 8 Z" fill="url(#peSheetBg)" />' +
      '    <!-- Folded Corner -->' +
      '    <path d="M78 8 V21 C78 23.8 80.2 26 83 26 H96 L78 8 Z" fill="#cbd5d0" />' +
      '    <!-- Spreadsheet Grid Cells -->' +
      '    <g stroke="#20724c" stroke-width="1.5" fill="#d8eee3" opacity="0.9">' +
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
      '    <!-- Left 3D Green X Badge -->' +
      '    <rect x="14" y="32" width="44" height="46" rx="8" fill="url(#peExcelBadge)" stroke="#349668" stroke-width="1.2" />' +
      '    <path d="M27 44 L45 66 M45 44 L27 66" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />' +
      '    <!-- Bottom-Right Download Circle Badge -->' +
      '    <circle cx="94" cy="92" r="17" fill="#063723" stroke="url(#peGoldTab)" stroke-width="2.2" />' +
      '    <path d="M94 83 V95 M88.5 90.5 L94 96 L99.5 90.5 M87 99.5 H101" stroke="#f5dc8b" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />' +
      '  </svg>' +
      '</div>'
    );
  }

  function buildFormInnerHtml(config, scopeId) {
    var theme = resolveTheme(config);
    var dateDisplay = config.realtimeDate ? getRealtimeDateString() : (config.customDateText || getRealtimeDateString());
    var units = Array.isArray(config.units) && config.units.length > 0 ? config.units : DEFAULT_UNITS;
    var isOddCount = units.length % 2 === 1;

    var unitsHtml = units
      .map(function (unit, idx) {
        var isLastOdd = isOddCount && idx === units.length - 1;
        var checkedAttr = unit.checked ? " checked" : "";
        var activeClass = unit.checked ? " is-active" : "";
        var oddClass = isLastOdd ? " pe-unit-odd-last" : "";
        var qtyHtml = unit.quantity
          ? '<span class="pe-unit-qty">' + escapeHtml(unit.quantity) + "</span>"
          : "";
        var unitValue = unit.quantity ? unit.label + " (" + unit.quantity + ")" : unit.label;

        return (
          '<label class="pe-unit-card' + oddClass + activeClass + '">' +
          '  <input type="checkbox" class="pe-unit-checkbox" name="unit_interest" value="' +
          escapeHtml(unitValue) +
          '"' +
          checkedAttr +
          " />" +
          '  <span class="pe-unit-label-wrap">' +
          "    <span>" +
          escapeHtml(unit.label) +
          "</span>" +
          qtyHtml +
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

    return (
      '<div class="pe-card">' +
      '  <button type="button" class="pe-close-btn" data-pe-close aria-label="Đóng biểu mẫu">&times;</button>' +
      '  <div class="pe-header">' +
      buildHeaderGraphicSvg(theme) +
      '    <h3 class="pe-header-badge">' +
      escapeHtml(config.headerBadgeText || "TẢI BẢNG GIÁ") +
      "</h3>" +
      "  </div>" +
      '  <div class="pe-body">' +
      '    <h2 id="' +
      scopeId +
      '-title" class="pe-title">' +
      escapeHtml(config.formTitle || "ĐĂNG KÝ NHẬN BÁO GIÁ") +
      "</h2>" +
      '    <div class="pe-project-name">' +
      escapeHtml(config.projectName || "TBS LAND") +
      "</div>" +
      '    <div class="pe-date-wrap">' +
      '      <div class="pe-date-pill">' +
      escapeHtml((config.datePrefix || "NGÀY:") + " " + dateDisplay) +
      "</div>" +
      "    </div>" +
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
      escapeHtml(config.submitText || "ĐĂNG KÝ BÁO GIÁ") +
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
          "</strong> và đẩy trực tiếp vào <a href=\"/crm/" +
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

  /**
   * Render trực tiếp vào 1 container DOM (Dùng cho Live Preview hoặc Inline Form)
   */
  function renderIntoContainer(containerEl, customConfig, onLeadDispatched) {
    if (!containerEl) return;
    var config = Object.assign({}, DEFAULT_CONFIG, customConfig || {});
    var scopeId = "rf-pe-" + Math.random().toString(36).substring(2, 8);
    var theme = resolveTheme(config);

    containerEl.innerHTML =
      "<style>" +
      buildPopupStyles(scopeId, theme) +
      "</style>" +
      '<div id="' +
      scopeId +
      '">' +
      buildFormInnerHtml(config, scopeId) +
      "</div>";

    var rootEl = containerEl.querySelector("#" + scopeId);
    wireFormInteractions(rootEl, config, null, onLeadDispatched);
    return {
      scopeId: scopeId,
      config: config,
    };
  }

  /**
   * Khởi tạo Pop-up Modal nổi lên trên Website (sử dụng <dialog closedby="any">)
   */
  function initModalPopup(customConfig, onLeadDispatched) {
    var config = Object.assign({}, DEFAULT_CONFIG, customConfig || {});
    var scopeId = "rf-pe-modal";
    var theme = resolveTheme(config);

    var existingStyle = document.getElementById(scopeId + "-style");
    if (existingStyle && existingStyle.parentNode) existingStyle.parentNode.removeChild(existingStyle);
    var existingDialog = document.getElementById(scopeId + "-dialog");
    if (existingDialog && existingDialog.parentNode) existingDialog.parentNode.removeChild(existingDialog);
    var existingLauncher = document.getElementById(scopeId + "-launcher");
    if (existingLauncher && existingLauncher.parentNode) existingLauncher.parentNode.removeChild(existingLauncher);

    var styleEl = document.createElement("style");
    styleEl.id = scopeId + "-style";
    styleEl.textContent = buildPopupStyles(scopeId, theme);
    document.head.appendChild(styleEl);

    var dialogEl = document.createElement("dialog");
    dialogEl.id = scopeId + "-dialog";
    dialogEl.setAttribute("closedby", "any");
    dialogEl.setAttribute("aria-labelledby", scopeId + "-title");
    dialogEl.innerHTML = '<div id="' + scopeId + '">' + buildFormInnerHtml(config, scopeId) + "</div>";
    document.body.appendChild(dialogEl);

    var rootEl = dialogEl.querySelector("#" + scopeId);
    wireFormInteractions(rootEl, config, dialogEl, onLeadDispatched);

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

    if (config.showFloatingLauncher) {
      var launcherBtn = document.createElement("button");
      launcherBtn.id = scopeId + "-launcher";
      launcherBtn.type = "button";
      launcherBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="' +
        theme.goldLight +
        '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
        "<span>" +
        escapeHtml(config.floatingLauncherText || "Tải Bảng Giá") +
        "</span>";
      launcherBtn.addEventListener("click", openPopup);
      document.body.appendChild(launcherBtn);
    }

    // Bind any host page trigger elements with [data-rf-popup-open]
    document.addEventListener("click", function (e) {
      var trigger = e.target && e.target.closest ? e.target.closest("[data-rf-popup-open]") : null;
      if (trigger) {
        e.preventDefault();
        openPopup();
      }
    });

    if (config.triggerMode === "immediate") {
      setTimeout(openPopup, 150);
    } else if (config.triggerMode === "delay") {
      var ms = Math.max(0, Number(config.delaySeconds || 2) * 1000);
      setTimeout(openPopup, ms);
    }

    return {
      open: openPopup,
      close: closePopup,
      dialog: dialogEl,
      config: config,
    };
  }

  // Auto-init if loaded via <script data-rf-popup-auto="true" ...>
  function autoInitFromScriptTag() {
    var scriptEl = document.currentScript || document.querySelector("script[data-rf-popup-config], script[data-project-name]");
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
    version: "2.0.0",
    THEME_PRESETS: THEME_PRESETS,
    DEFAULT_UNITS: DEFAULT_UNITS,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    getRealtimeDateString: getRealtimeDateString,
    resolveTheme: resolveTheme,
    renderIntoContainer: renderIntoContainer,
    initModalPopup: initModalPopup,
    dispatchLeadToCrm: dispatchLeadToCrm,
    buildPopupStyles: buildPopupStyles,
    buildFormInnerHtml: buildFormInnerHtml,
  };

  autoInitFromScriptTag();
})(typeof window !== "undefined" ? window : this);
