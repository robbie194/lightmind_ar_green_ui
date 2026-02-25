const state = {
  color: "#67f08a",
  stroke: 1.8,
  glow: 0.55,
  radius: 14,
  scale: 1,
  fillAlpha: 0.12
};

const GROUP_TITLES = {
  cards: "图标卡片 / 基础入口（已有 + 新增）",
  dataPanels: "信息面板 / 行情与数据",
  navMap: "导航与地图类",
  recognition: "识别 / 翻译 / 会议类",
  banners: "提示条 / 快捷提示",
  status: "状态栏 / 状态组"
};

const GROUP_ORDER = ["cards", "dataPanels", "navMap", "recognition", "banners", "status"];

const components = [
  // 基础卡片（已有）
  { id: "card-settings", group: "cards", title: "图标卡片 / 设置", kind: "icon", icon: "settings", label: "设置", exportName: "hud-card-settings" },
  { id: "card-trend", group: "cards", title: "图标卡片 / 趋势", kind: "icon", icon: "trend", label: "趋势", exportName: "hud-card-trend" },
  { id: "card-grid", group: "cards", title: "图标卡片 / 管理器", kind: "icon", icon: "grid", label: "管理器", exportName: "hud-card-manager-grid" },
  { id: "card-home", group: "cards", title: "图标卡片 / 主页", kind: "icon", icon: "home", label: "主页", exportName: "hud-card-home" },

  // 新增图标卡片（>=12）
  { id: "card-meeting-notes", group: "cards", title: "图标卡片 / 会议记录", kind: "icon", icon: "meeting-notes", label: "会议记录", exportName: "hud-card-meeting-notes" },
  { id: "card-live-translate", group: "cards", title: "图标卡片 / 实时翻译", kind: "icon", icon: "live-translate", label: "实时翻译", exportName: "hud-card-live-translate" },
  { id: "card-map-navigation", group: "cards", title: "图标卡片 / 地图导航", kind: "icon", icon: "map-navigation", label: "地图导航", exportName: "hud-card-map-navigation" },
  { id: "card-ai-assistant", group: "cards", title: "图标卡片 / AI助手", kind: "icon", icon: "ai-assistant", label: "AI 助手", exportName: "hud-card-ai-assistant" },
  { id: "card-teleprompter", group: "cards", title: "图标卡片 / 提词器", kind: "icon", icon: "teleprompter", label: "提词器", exportName: "hud-card-teleprompter" },
  { id: "card-lyrics", group: "cards", title: "图标卡片 / 歌词", kind: "icon", icon: "lyrics", label: "歌词", exportName: "hud-card-lyrics" },
  { id: "card-camera", group: "cards", title: "图标卡片 / 相机拍摄", kind: "icon", icon: "camera", label: "相机拍摄", exportName: "hud-card-camera" },
  { id: "card-video-recorder", group: "cards", title: "图标卡片 / 视频录制", kind: "icon", icon: "video-recorder", label: "视频录制", exportName: "hud-card-video-recorder" },
  { id: "card-gallery", group: "cards", title: "图标卡片 / 相册图片", kind: "icon", icon: "gallery", label: "相册图片", exportName: "hud-card-gallery" },
  { id: "card-file-manager", group: "cards", title: "图标卡片 / 文件管理", kind: "icon", icon: "file-manager", label: "文件管理", exportName: "hud-card-file-manager" },
  { id: "card-stock-watch", group: "cards", title: "图标卡片 / 股票行情", kind: "icon", icon: "stock-watch", label: "股票行情", exportName: "hud-card-stock-watch" },
  { id: "card-ocr", group: "cards", title: "图标卡片 / 翻译识图", kind: "icon", icon: "ocr", label: "翻译识图", exportName: "hud-card-ocr" },

  // 信息面板 / 行情与数据
  { id: "panel-watchlist", group: "dataPanels", title: "信息面板 / 自选股列表", kind: "panel", variant: "watchlist", exportName: "hud-panel-watchlist" },
  { id: "panel-intraday-chart", group: "dataPanels", title: "信息面板 / 分时行情", kind: "panel", variant: "intraday-chart", exportName: "hud-panel-intraday-chart" },

  // 导航与地图类
  { id: "panel-nav-route", group: "navMap", title: "导航面板 / 路线指引", kind: "panel", variant: "nav-route", exportName: "hud-panel-nav-route" },

  // 识别 / 翻译 / 会议类
  { id: "panel-live-translation", group: "recognition", title: "识别面板 / 实时翻译", kind: "panel", variant: "live-translation", exportName: "hud-panel-live-translation" },
  { id: "panel-meeting-summary", group: "recognition", title: "识别面板 / 会议摘要", kind: "panel", variant: "meeting-summary", exportName: "hud-panel-meeting-summary" },
  { id: "panel-camera-capture-hud", group: "recognition", title: "识别面板 / 拍摄提示层", kind: "panel", variant: "camera-capture-hud", exportName: "hud-panel-camera-capture-hud" },

  // 提示条
  { id: "banner-reminder", group: "banners", title: "提示条 / 日程提醒", kind: "banner", variant: "reminder", exportName: "hud-banner-reminder" },
  { id: "banner-schedule-summary", group: "banners", title: "提示条 / 日程摘要", kind: "banner", variant: "schedule-summary", exportName: "hud-banner-schedule-summary" },
  { id: "banner-ai-wake-tip", group: "banners", title: "提示条 / AI唤起", kind: "banner", variant: "ai-wake-tip", exportName: "hud-banner-ai-wake-tip" },

  // 状态栏 / 状态组
  { id: "statusbar-core", group: "status", title: "状态栏 / 基础元素", kind: "status", variant: "core", exportName: "hud-status-core" },
  { id: "statusbar-bottom-thin", group: "status", title: "状态栏 / 细长底栏", kind: "status", variant: "bottom-thin", exportName: "hud-bar-nav-status" },
  { id: "status-env-left", group: "status", title: "状态组 / 左下环境", kind: "status", variant: "env-left", exportName: "hud-status-env-left" },
  { id: "status-connect-right", group: "status", title: "状态组 / 右下连接", kind: "status", variant: "connect-right", exportName: "hud-status-connect-right" }
];

function init() {
  bindControls();
  renderGallery();
}

function bindControls() {
  const color = document.getElementById("control-color");
  const stroke = document.getElementById("control-stroke");
  const glow = document.getElementById("control-glow");
  const radius = document.getElementById("control-radius");
  const scale = document.getElementById("control-scale");
  const fill = document.getElementById("control-fill");

  color.addEventListener("input", () => {
    state.color = color.value;
    renderGallery();
  });
  stroke.addEventListener("input", () => {
    state.stroke = parseFloat(stroke.value);
    document.getElementById("value-stroke").textContent = state.stroke.toFixed(1);
    renderGallery();
  });
  glow.addEventListener("input", () => {
    state.glow = parseFloat(glow.value);
    document.getElementById("value-glow").textContent = state.glow.toFixed(2);
    renderGallery();
  });
  radius.addEventListener("input", () => {
    state.radius = parseFloat(radius.value);
    document.getElementById("value-radius").textContent = String(Math.round(state.radius));
    renderGallery();
  });
  scale.addEventListener("input", () => {
    state.scale = parseFloat(scale.value);
    document.getElementById("value-scale").textContent = state.scale.toFixed(2);
    renderGallery();
  });
  fill.addEventListener("input", () => {
    state.fillAlpha = parseFloat(fill.value);
    document.getElementById("value-fill").textContent = state.fillAlpha.toFixed(2);
    renderGallery();
  });
}

function renderGallery() {
  applyRootVars();
  const gallery = document.getElementById("gallery");
  const tpl = document.getElementById("component-template");
  gallery.innerHTML = "";

  GROUP_ORDER.forEach((groupKey) => {
    const groupItems = components.filter((item) => item.group === groupKey);
    if (!groupItems.length) {
      return;
    }

    const section = document.createElement("section");
    section.className = "group-section";

    const heading = document.createElement("h2");
    heading.className = "group-title";
    heading.textContent = GROUP_TITLES[groupKey] || groupKey;
    section.appendChild(heading);

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "group-grid";

    groupItems.forEach((component) => {
      const node = tpl.content.firstElementChild.cloneNode(true);
      node.querySelector(".component-title").textContent = component.title;
      const stage = node.querySelector(".svg-stage");
      stage.innerHTML = createComponentSvg(component);

      node.querySelector('[data-action="svg"]').addEventListener("click", () => {
        const svgEl = stage.querySelector("svg");
        exportSvg(svgEl, `${component.exportName}.svg`);
      });
      node.querySelector('[data-action="png"]').addEventListener("click", () => {
        const svgEl = stage.querySelector("svg");
        exportPng(svgEl, `${component.exportName}.png`, 2);
      });

      sectionGrid.appendChild(node);
    });

    section.appendChild(sectionGrid);
    gallery.appendChild(section);
  });
}

function applyRootVars() {
  const root = document.documentElement;
  root.style.setProperty("--hud-green-main", state.color);
  root.style.setProperty("--stroke-main", String(state.stroke));
  root.style.setProperty("--radius", String(state.radius));
  root.style.setProperty("--glow", String(state.glow));
  root.style.setProperty("--scale", String(state.scale));
  root.style.setProperty("--fill-alpha", String(state.fillAlpha));
}

function createComponentSvg(component) {
  if (component.kind === "icon") {
    return createIconCardSvg(component);
  }
  if (component.kind === "panel") {
    return createPanelSvg(component);
  }
  if (component.kind === "banner") {
    return createBannerSvg(component);
  }
  return createStatusSvg(component);
}

function makeGlowFilter(filterId) {
  const blur = (1.8 + state.glow * 3.6).toFixed(2);
  const opacity = (0.32 + state.glow * 0.28).toFixed(2);
  return `
  <defs>
    <filter id="${filterId}" x="-35%" y="-35%" width="170%" height="170%" filterUnits="objectBoundingBox">
      <feGaussianBlur stdDeviation="${blur}" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.40
                0 0 0 0 0.94
                0 0 0 0 0.54
                0 0 0 ${opacity} 0"></feColorMatrix>
      <feMerge>
        <feMergeNode></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
  </defs>`;
}

function withSvgShell({ id, width, height, content }) {
  const scaledWidth = Math.round(width * state.scale);
  const scaledHeight = Math.round(height * state.scale);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${width} ${height}" fill="none" aria-label="${id}">
  ${content}
  </svg>`;
}

function createIconCardSvg(component) {
  const width = 220;
  const height = 300;
  const r = state.radius;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.68);
  const fill = hexToRgba(state.color, Math.max(0.04, state.fillAlpha * 0.65));
  const filterId = `${component.id}-glow`;
  return withSvgShell({
    id: component.id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="14" width="188" height="270" rx="${r}" fill="${fill}" />
    <line x1="74" y1="205" x2="146" y2="205" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}" />
    ${iconPath(component.icon, state.color, stroke)}
  </g>
  <text x="110" y="250" text-anchor="middle" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">${component.label}</text>`
  });
}

function iconPath(type, color, stroke) {
  if (type === "settings") {
    return `<g transform="translate(68 62)">
      <circle cx="42" cy="42" r="16"></circle><circle cx="42" cy="42" r="30"></circle>
      <line x1="42" y1="4" x2="42" y2="16"></line><line x1="42" y1="68" x2="42" y2="80"></line>
      <line x1="4" y1="42" x2="16" y2="42"></line><line x1="68" y1="42" x2="80" y2="42"></line>
      <line x1="14" y1="14" x2="22" y2="22"></line><line x1="62" y1="62" x2="70" y2="70"></line>
      <line x1="14" y1="70" x2="22" y2="62"></line><line x1="62" y1="22" x2="70" y2="14"></line>
    </g>`;
  }
  if (type === "trend") {
    return `<g transform="translate(62 60)"><polyline points="0,68 20,42 38,50 60,24 78,34 96,12" fill="none"></polyline><line x1="0" y1="80" x2="102" y2="80"></line><line x1="0" y1="80" x2="0" y2="8"></line></g>`;
  }
  if (type === "grid") {
    return `<g transform="translate(66 62)"><rect x="0" y="0" width="34" height="34" rx="6"></rect><rect x="46" y="0" width="34" height="34" rx="6"></rect><rect x="0" y="46" width="34" height="34" rx="6"></rect><rect x="46" y="46" width="34" height="34" rx="6"></rect></g>`;
  }
  if (type === "home") {
    return `<g transform="translate(64 62)"><path d="M8 40 L44 12 L80 40" fill="none"></path><rect x="20" y="40" width="48" height="40" rx="6"></rect><rect x="38" y="52" width="12" height="28" rx="4"></rect></g>`;
  }
  if (type === "meeting-notes") {
    return `<g transform="translate(60 60)"><rect x="10" y="8" width="80" height="92" rx="10"></rect><line x1="24" y1="30" x2="76" y2="30"></line><line x1="24" y1="46" x2="76" y2="46"></line><line x1="24" y1="62" x2="66" y2="62"></line><line x1="24" y1="78" x2="58" y2="78"></line><path d="M78 84 L88 94" fill="none"></path></g>`;
  }
  if (type === "live-translate") {
    return `<g transform="translate(58 60)"><rect x="8" y="10" width="92" height="72" rx="10"></rect><path d="M24 32 H60 M42 32 V60 M30 60 L54 32" fill="none"></path><path d="M68 42 H90 M79 30 V56" fill="none"></path><path d="M20 88 H88" fill="none"></path></g>`;
  }
  if (type === "map-navigation") {
    return `<g transform="translate(58 64)"><path d="M8 20 L38 10 L68 20 L98 10 V84 L68 94 L38 84 L8 94 Z" fill="none"></path><line x1="38" y1="10" x2="38" y2="84"></line><line x1="68" y1="20" x2="68" y2="94"></line><path d="M52 44 C52 34,60 28,68 28 C76 28,84 34,84 44 C84 58,68 68,68 68 C68 68,52 58,52 44 Z" fill="none"></path></g>`;
  }
  if (type === "ai-assistant") {
    return `<g transform="translate(58 62)"><rect x="18" y="16" width="76" height="58" rx="16"></rect><circle cx="44" cy="44" r="4"></circle><circle cx="70" cy="44" r="4"></circle><path d="M44 60 H70" fill="none"></path><line x1="56" y1="16" x2="56" y2="6"></line><circle cx="56" cy="4" r="2" fill="${color}" stroke="none"></circle></g>`;
  }
  if (type === "teleprompter") {
    return `<g transform="translate(58 62)"><rect x="8" y="12" width="94" height="62" rx="10"></rect><line x1="24" y1="30" x2="86" y2="30"></line><line x1="24" y1="44" x2="74" y2="44"></line><line x1="24" y1="58" x2="82" y2="58"></line><path d="M34 82 H76" fill="none"></path></g>`;
  }
  if (type === "lyrics") {
    return `<g transform="translate(58 60)"><path d="M24 16 V62 C24 70,18 76,10 76 C2 76,-4 70,-4 62 C-4 54,2 48,10 48 C15 48,19 50,24 52" fill="none"></path><path d="M24 16 L78 8 V52 C78 60,72 66,64 66 C56 66,50 60,50 52 C50 44,56 38,64 38 C69 38,73 40,78 42" fill="none"></path><line x1="8" y1="90" x2="92" y2="90"></line></g>`;
  }
  if (type === "camera") {
    return `<g transform="translate(58 64)"><rect x="6" y="20" width="96" height="62" rx="12"></rect><rect x="22" y="10" width="24" height="12" rx="4"></rect><circle cx="54" cy="51" r="20"></circle><circle cx="54" cy="51" r="8"></circle></g>`;
  }
  if (type === "video-recorder") {
    return `<g transform="translate(60 66)"><rect x="10" y="20" width="70" height="52" rx="10"></rect><path d="M80 34 L104 22 V70 L80 58 Z" fill="none"></path><circle cx="30" cy="46" r="8"></circle></g>`;
  }
  if (type === "gallery") {
    return `<g transform="translate(58 64)"><rect x="8" y="16" width="92" height="70" rx="10"></rect><path d="M18 72 L40 48 L58 64 L72 52 L90 72" fill="none"></path><circle cx="30" cy="34" r="5"></circle></g>`;
  }
  if (type === "file-manager") {
    return `<g transform="translate(58 66)"><path d="M8 28 H38 L46 18 H100 V84 H8 Z" fill="none"></path><line x1="8" y1="44" x2="100" y2="44"></line></g>`;
  }
  if (type === "stock-watch") {
    return `<g transform="translate(58 62)"><line x1="10" y1="84" x2="102" y2="84"></line><line x1="10" y1="84" x2="10" y2="16"></line><polyline points="14,72 30,58 42,64 58,40 72,48 88,30 100,34" fill="none"></polyline><line x1="54" y1="20" x2="88" y2="20"></line></g>`;
  }
  if (type === "ocr") {
    return `<g transform="translate(60 62)"><path d="M10 34 V14 H30" fill="none"></path><path d="M90 34 V14 H70" fill="none"></path><path d="M10 66 V86 H30" fill="none"></path><path d="M90 66 V86 H70" fill="none"></path><line x1="24" y1="48" x2="76" y2="48"></line><line x1="24" y1="60" x2="64" y2="60"></line></g>`;
  }
  return `<g transform="translate(66 62)"><rect x="0" y="0" width="84" height="84" rx="14"></rect></g>`;
}

function createPanelSvg(component) {
  if (component.variant === "watchlist") {
    return createWatchlistPanelSvg(component.id);
  }
  if (component.variant === "intraday-chart") {
    return createIntradayChartPanelSvg(component.id);
  }
  if (component.variant === "nav-route") {
    return createNavRoutePanelSvg(component.id);
  }
  if (component.variant === "live-translation") {
    return createLiveTranslationPanelSvg(component.id);
  }
  if (component.variant === "meeting-summary") {
    return createMeetingSummaryPanelSvg(component.id);
  }
  return createCameraCaptureHudPanelSvg(component.id);
}

// 复杂面板：自选股列表
function createWatchlistPanelSvg(id) {
  const width = 700;
  const height = 420;
  const r = state.radius + 4;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.74);
  const fill = hexToRgba(state.color, Math.max(0.08, state.fillAlpha));
  const rowFill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.9));
  const filterId = `${id}-glow`;
  const rows = [
    ["凌光智联", "LM2101", "+1.28%", "46.52"],
    ["启明星图", "LM3024", "-0.42%", "32.08"],
    ["远瞳科技", "LM5509", "+0.96%", "88.15"],
    ["云桥系统", "LM8720", "+2.14%", "26.37"],
    ["澄澜动力", "LM1906", "-0.31%", "58.74"]
  ];

  const rowSvg = rows
    .map((row, idx) => {
      const y = 100 + idx * 58;
      const changeColor = row[2].startsWith("-") ? hexToRgba(state.color, 0.72) : state.color;
      return `
      <rect x="26" y="${y - 28}" width="648" height="46" rx="12" fill="${rowFill}" stroke="${hexToRgba(state.color, 0.38)}" stroke-width="${(state.stroke * 0.55).toFixed(2)}"></rect>
      <text x="44" y="${y}" fill="${state.color}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">${row[0]}</text>
      <text x="46" y="${y + 20}" fill="${dim}" font-size="14" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">${row[1]}</text>
      <text x="532" y="${y}" fill="${changeColor}" text-anchor="end" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">${row[2]}</text>
      <text x="654" y="${y}" fill="${dim}" text-anchor="end" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">${row[3]}</text>`;
    })
    .join("");

  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="672" height="392" rx="${r}" fill="${fill}"></rect>
  </g>
  <text x="30" y="52" fill="${state.color}" font-size="26" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">自选股</text>
  <text x="660" y="52" text-anchor="end" fill="${dim}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
  ${rowSvg}`
  });
}

// 复杂面板：分时行情
function createIntradayChartPanelSvg(id) {
  const width = 700;
  const height = 380;
  const r = state.radius + 4;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.08, state.fillAlpha));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="672" height="352" rx="${r}" fill="${fill}"></rect>
    <line x1="34" y1="226" x2="666" y2="226" stroke="${hexToRgba(state.color, 0.42)}" stroke-dasharray="6 6"></line>
    <polyline points="34,210 78,196 124,208 172,180 214,188 262,162 320,172 376,148 430,162 492,132 548,144 602,130 662,136" fill="none"></polyline>
    <line x1="34" y1="106" x2="666" y2="106" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
  </g>
  <text x="36" y="52" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">分时</text>
  <text x="652" y="52" text-anchor="end" fill="${dim}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
  <text x="36" y="92" fill="${state.color}" font-size="30" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">凌光智联 LM2101</text>
  <text x="36" y="164" fill="${state.color}" font-size="56" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">57.42</text>
  <text x="236" y="164" fill="${dim}" font-size="28" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">+0.82  +1.35%</text>
  <text x="40" y="314" fill="${state.color}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">09:30</text>
  <text x="656" y="314" text-anchor="end" fill="${state.color}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15:00</text>`
  });
}

// 复杂面板：导航路线
function createNavRoutePanelSvg(id) {
  const width = 760;
  const height = 360;
  const r = state.radius + 4;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.85));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="732" height="332" rx="${r}" fill="${fill}"></rect>
    <polyline points="42,230 140,210 228,222 316,182 402,198 486,162 580,172 666,136" fill="none"></polyline>
    <polyline points="42,260 118,242 210,252 294,220 392,236 480,202 560,214 654,184" stroke="${hexToRgba(state.color, 0.42)}" fill="none"></polyline>
    <circle cx="42" cy="230" r="6"></circle>
    <circle cx="666" cy="136" r="6"></circle>
    <path d="M650 106 L688 106 L676 92" fill="none"></path>
    <rect x="28" y="274" width="704" height="54" rx="14" fill="${hexToRgba(state.color, 0.14)}"></rect>
  </g>
  <text x="34" y="52" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">地图导航</text>
  <text x="732" y="52" text-anchor="end" fill="${dim}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">实时路线</text>
  <text x="34" y="306" fill="${state.color}" font-size="19" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">总计 18.2 公里 · 剩余 6.4 公里 · 预计 21 分钟到达</text>
  <text x="34" y="332" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">前方 180 米右转，进入园区主路</text>`
  });
}

// 复杂面板：实时翻译
function createLiveTranslationPanelSvg(id) {
  const width = 760;
  const height = 300;
  const r = state.radius + 6;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.08, state.fillAlpha));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="20" y="20" width="720" height="220" rx="${r}" fill="${fill}"></rect>
    <line x1="40" y1="68" x2="720" y2="68" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <circle cx="380" cy="246" r="12"></circle>
  </g>
  <text x="42" y="52" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">实时翻译</text>
  <text x="44" y="102" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">请在入口处扫码登记，并向前台确认会议室编号。</text>
  <text x="44" y="140" fill="${dim}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">Please scan at the entrance and confirm room number at the desk.</text>
  <text x="44" y="182" fill="${dim}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">ZH -> EN · 延迟 120ms · 置信度 96%</text>`
  });
}

// 复杂面板：会议摘要
function createMeetingSummaryPanelSvg(id) {
  const width = 760;
  const height = 360;
  const r = state.radius + 6;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.08, state.fillAlpha));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="18" y="18" width="724" height="324" rx="${r}" fill="${fill}"></rect>
    <line x1="38" y1="70" x2="722" y2="70" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="38" y1="186" x2="722" y2="186" stroke="${hexToRgba(state.color, 0.42)}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
  </g>
  <text x="42" y="52" fill="${state.color}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">会议摘要</text>
  <text x="720" y="52" text-anchor="end" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:20</text>
  <text x="42" y="102" fill="${state.color}" font-size="19" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">议题</text>
  <text x="42" y="130" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">- 新版 HUD 组件覆盖与导出规范统一</text>
  <text x="42" y="158" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">- 识别/导航/状态组件纳入同一风格体系</text>
  <text x="42" y="218" fill="${state.color}" font-size="19" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">结论</text>
  <text x="42" y="246" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">- 本周完成核心组件交付，导出链路保持统一。</text>
  <text x="42" y="274" fill="${dim}" font-size="17" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">- 待办：补充 2 套提示条与 3 套状态组模板。</text>
  <text x="42" y="316" fill="${state.color}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">状态：P0 · Owner: UI Team · 网络稳定</text>`
  });
}

// 复杂面板：相机拍摄提示层
function createCameraCaptureHudPanelSvg(id) {
  const width = 700;
  const height = 360;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M64 78 H164 V58" fill="none"></path>
    <path d="M636 78 H536 V58" fill="none"></path>
    <path d="M64 282 H164 V302" fill="none"></path>
    <path d="M636 282 H536 V302" fill="none"></path>
    <rect x="150" y="128" width="400" height="104" rx="18" fill="${hexToRgba(state.color, Math.max(0.05, state.fillAlpha * 0.6))}"></rect>
    <circle cx="350" cy="258" r="18"></circle>
    <line x1="300" y1="258" x2="400" y2="258" stroke="${dim}"></line>
    <rect x="560" y="38" width="86" height="26" rx="8" fill="none"></rect>
    <rect x="648" y="44" width="6" height="14" rx="2" fill="none"></rect>
    <rect x="566" y="44" width="52" height="14" rx="4" fill="${hexToRgba(state.color, 0.22)}"></rect>
  </g>
  <text x="350" y="172" text-anchor="middle" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">单击拍摄 · 双击录像</text>
  <text x="350" y="204" text-anchor="middle" fill="${dim}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">拍照模式 · 可切换视频</text>
  <text x="48" y="334" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12 · 存储 12.8GB</text>
  <text x="666" y="334" text-anchor="end" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">电量 82%</text>`
  });
}

function createBannerSvg(component) {
  if (component.variant === "schedule-summary") {
    return createScheduleSummaryBannerSvg(component.id);
  }
  if (component.variant === "ai-wake-tip") {
    return createAiWakeTipBannerSvg(component.id);
  }
  return createReminderBannerSvg(component.id);
}

function createReminderBannerSvg(id) {
  const width = 760;
  const height = 220;
  const r = state.radius + 8;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.85));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="20" width="728" height="152" rx="${r}" fill="${fill}"></rect>
    <rect x="42" y="58" width="40" height="40" rx="${Math.max(7, state.radius - 5)}"></rect>
    <path d="M58 68 L58 88 M48 78 L68 78"></path>
    <circle cx="378" cy="146" r="16"></circle>
    <line x1="306" y1="146" x2="450" y2="146" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
  </g>
  <text x="98" y="84" fill="${state.color}" font-size="28" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">下午会议提醒</text>
  <text x="98" y="116" fill="${dim}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15:30 团队周会 · 18:00 提交日报</text>
  <text x="46" y="202" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">14:29 · 16°C · 电量 100%</text>`
  });
}

function createScheduleSummaryBannerSvg(id) {
  const width = 760;
  const height = 210;
  const r = state.radius + 8;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.82));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="24" width="728" height="150" rx="${r}" fill="${fill}"></rect>
    <rect x="38" y="64" width="42" height="40" rx="10"></rect>
    <line x1="46" y1="78" x2="72" y2="78"></line>
    <line x1="46" y1="90" x2="66" y2="90"></line>
    <circle cx="378" cy="148" r="9"></circle>
  </g>
  <text x="96" y="84" fill="${state.color}" font-size="26" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">日程摘要</text>
  <text x="96" y="114" fill="${dim}" font-size="21" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">下午有 2 个日程，17:00 前完成周报提交</text>
  <text x="40" y="198" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">14:29 · 会议室 A3 · 已同步</text>`
  });
}

function createAiWakeTipBannerSvg(id) {
  const width = 760;
  const height = 210;
  const r = state.radius + 8;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.82));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="24" width="728" height="150" rx="${r}" fill="${fill}"></rect>
    <circle cx="58" cy="82" r="18"></circle>
    <line x1="58" y1="72" x2="58" y2="92"></line>
    <path d="M48 82 H68" fill="none"></path>
    <path d="M310 150 H450" stroke="${dim}"></path>
  </g>
  <text x="98" y="84" fill="${state.color}" font-size="26" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">AI 助手已就绪</text>
  <text x="98" y="114" fill="${dim}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">请说“开始记录会议要点”或“导航到园区 B 楼”</text>
  <text x="42" y="198" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">语音待机 · 噪声抑制开启</text>`
  });
}

function createStatusSvg(component) {
  if (component.variant === "bottom-thin") {
    return createBottomThinStatusBarSvg(component.id);
  }
  if (component.variant === "env-left") {
    return createEnvLeftStatusSvg(component.id);
  }
  if (component.variant === "connect-right") {
    return createConnectRightStatusSvg(component.id);
  }
  return createCoreStatusBarSvg(component.id);
}

function createCoreStatusBarSvg(id) {
  const width = 680;
  const height = 100;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <text x="20" y="62" fill="${state.color}" stroke="none" font-size="34" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
    <text x="174" y="62" fill="${dim}" stroke="none" font-size="30" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15°C</text>
    <path d="M500 57 C510 45, 526 45, 536 57" fill="none"></path>
    <path d="M506 57 C513 49, 523 49, 530 57" fill="none"></path>
    <path d="M513 57 C517 53, 519 53, 523 57" fill="none"></path>
    <circle cx="518" cy="61" r="2.2" fill="${state.color}" stroke="none"></circle>
    <rect x="560" y="42" width="58" height="24" rx="6"></rect>
    <rect x="618" y="48" width="6" height="12" rx="2"></rect>
    <rect x="566" y="48" width="40" height="12" rx="4" fill="${hexToRgba(state.color, 0.25)}"></rect>
    <text x="632" y="62" fill="${state.color}" stroke="none" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">80%</text>
  </g>`
  });
}

function createBottomThinStatusBarSvg(id) {
  const width = 860;
  const height = 88;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.03, state.fillAlpha * 0.45));
  const filterId = `${id}-glow`;
  const r = Math.max(10, state.radius + 2);
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="10" y="14" width="840" height="58" rx="${r}" fill="${fill}"></rect>
    <line x1="228" y1="28" x2="228" y2="58" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="448" y1="28" x2="448" y2="58" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="628" y1="28" x2="628" y2="58" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <path d="M694 46 C702 38, 714 38, 722 46" fill="none"></path>
    <path d="M700 52 C706 46, 710 46, 716 52" fill="none"></path>
    <circle cx="708" cy="55" r="2" fill="${state.color}" stroke="none"></circle>
    <rect x="760" y="34" width="50" height="20" rx="6" fill="none"></rect>
    <rect x="810" y="39" width="5" height="10" rx="2" fill="none"></rect>
    <rect x="766" y="39" width="30" height="10" rx="4" fill="${hexToRgba(state.color, 0.22)}"></rect>
  </g>
  <text x="28" y="51" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">导航状态</text>
  <text x="246" y="51" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15km/h</text>
  <text x="466" y="51" fill="${dim}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">剩余 6.4km / 21min</text>
  <text x="646" y="51" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">前方右转</text>
  <text x="822" y="51" fill="${state.color}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">80%</text>`
  });
}

function createEnvLeftStatusSvg(id) {
  const width = 320;
  const height = 94;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.05, state.fillAlpha * 0.7));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="14" width="304" height="66" rx="14" fill="${fill}"></rect>
    <text x="20" y="58" fill="${state.color}" stroke="none" font-size="26" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
    <text x="118" y="58" fill="${dim}" stroke="none" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">☁ 15°C</text>
    <text x="228" y="58" fill="${state.color}" stroke="none" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">电量 82%</text>
  </g>`
  });
}

function createConnectRightStatusSvg(id) {
  const width = 300;
  const height = 94;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.72);
  const fill = hexToRgba(state.color, Math.max(0.05, state.fillAlpha * 0.7));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="14" width="284" height="66" rx="14" fill="${fill}"></rect>
    <path d="M42 56 C50 46, 62 46, 70 56" fill="none"></path>
    <path d="M48 62 C54 54, 58 54, 64 62" fill="none"></path>
    <circle cx="56" cy="66" r="2" fill="${state.color}" stroke="none"></circle>
    <text x="84" y="58" fill="${state.color}" stroke="none" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">WiFi 稳定</text>
    <rect x="196" y="42" width="52" height="20" rx="6" fill="none"></rect>
    <rect x="248" y="47" width="5" height="10" rx="2" fill="none"></rect>
    <rect x="202" y="47" width="28" height="10" rx="4" fill="${hexToRgba(state.color, 0.22)}"></rect>
    <text x="262" y="58" fill="${dim}" stroke="none" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">82%</text>
  </g>`
  });
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const expanded = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean;
  const num = Number.parseInt(expanded, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getSvgSize(svgEl) {
  const widthAttr = Number.parseFloat(svgEl.getAttribute("width") || "");
  const heightAttr = Number.parseFloat(svgEl.getAttribute("height") || "");
  if (Number.isFinite(widthAttr) && Number.isFinite(heightAttr)) {
    return { width: widthAttr, height: heightAttr };
  }
  const viewBox = (svgEl.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
  if (viewBox.length === 4 && viewBox.every((value) => Number.isFinite(value))) {
    return { width: viewBox[2], height: viewBox[3] };
  }
  return { width: 512, height: 512 };
}

function serializeSvg(svgEl) {
  const clone = svgEl.cloneNode(true);
  if (!clone.getAttribute("xmlns")) {
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
}

/**
 * 导出单个组件 SVG：直接序列化目标 svg 节点，确保不包含页面控制区和其他组件。
 */
function exportSvg(svgEl, filename) {
  const svgString = serializeSvg(svgEl);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  URL.revokeObjectURL(url);
}

/**
 * 导出透明 PNG：先把 SVG 序列化为 Blob，再渲染到透明 canvas，最后下载 PNG。
 */
function exportPng(svgEl, filename, scale = 2) {
  const svgString = serializeSvg(svgEl);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  const { width, height } = getSvgSize(svgEl);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        URL.revokeObjectURL(url);
        return;
      }
      const pngUrl = URL.createObjectURL(blob);
      triggerDownload(pngUrl, filename);
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    window.alert("PNG 导出失败，请尝试使用本地静态服务器打开页面。");
  };

  img.src = url;
}

function triggerDownload(url, filename) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

init();
