const state = {
  color: "#67f08a",
  stroke: 1.8,
  glow: 0.55,
  radius: 14,
  scale: 1,
  fillAlpha: 0.12
};

const components = [
  { id: "card-settings", title: "图标卡片 / 设置", kind: "icon", icon: "settings", label: "设置" },
  { id: "card-trend", title: "图标卡片 / 趋势", kind: "icon", icon: "trend", label: "趋势" },
  { id: "card-grid", title: "图标卡片 / 管理器", kind: "icon", icon: "grid", label: "管理器" },
  { id: "card-home", title: "图标卡片 / 主页", kind: "icon", icon: "home", label: "主页" },

  // [新增] 图标卡片扩展
  { id: "card-wifi", title: "图标卡片 / 网络", kind: "icon", icon: "wifi", label: "网络" },
  { id: "card-battery", title: "图标卡片 / 电量", kind: "icon", icon: "battery", label: "电量" },
  { id: "card-clock", title: "图标卡片 / 时钟", kind: "icon", icon: "clock", label: "时钟" },
  { id: "card-translate", title: "图标卡片 / 翻译", kind: "icon", icon: "translate", label: "翻译" },
  { id: "card-camera", title: "图标卡片 / 拍摄", kind: "icon", icon: "camera", label: "拍摄" },
  { id: "card-mic", title: "图标卡片 / 语音", kind: "icon", icon: "mic", label: "语音" },
  { id: "card-map", title: "图标卡片 / 导航", kind: "icon", icon: "map", label: "导航" },
  { id: "card-chat", title: "图标卡片 / 消息", kind: "icon", icon: "chat", label: "消息" },
  { id: "card-calendar", title: "图标卡片 / 日历", kind: "icon", icon: "calendar", label: "日程" },
  { id: "card-bell", title: "图标卡片 / 提醒", kind: "icon", icon: "bell", label: "提醒" },
  { id: "card-scan", title: "图标卡片 / 扫描", kind: "icon", icon: "scan", label: "扫描" },
  { id: "card-music", title: "图标卡片 / 音频", kind: "icon", icon: "music", label: "音频" },
  { id: "card-compass", title: "图标卡片 / 指南针", kind: "icon", icon: "compass", label: "方向" },
  { id: "card-shield", title: "图标卡片 / 安全", kind: "icon", icon: "shield", label: "安全" },

  { id: "panel-info-trend", title: "信息面板 / 数据趋势", kind: "panel" },

  // [新增] 小状态面板
  { id: "panel-mini-status", title: "小状态面板 / 网络电量时间", kind: "mini-panel" },

  { id: "banner-reminder", title: "横向提示条 / 日程提醒", kind: "banner" },
  { id: "statusbar-core", title: "状态栏 / 基础元素", kind: "status" },

  // [新增] 细长底部状态栏
  { id: "statusbar-bottom-thin", title: "状态栏 / 细长底部栏", kind: "bottom-bar" }
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

  components.forEach((component) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".component-title").textContent = component.title;
    const stage = node.querySelector(".svg-stage");
    stage.innerHTML = createComponentSvg(component);

    node.querySelector('[data-action="svg"]').addEventListener("click", () => {
      const svgEl = stage.querySelector("svg");
      exportSvg(svgEl, `${component.id}.svg`);
    });
    node.querySelector('[data-action="png"]').addEventListener("click", () => {
      const svgEl = stage.querySelector("svg");
      exportPng(svgEl, `${component.id}.png`, 2);
    });

    gallery.appendChild(node);
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
    return createInfoPanelSvg(component.id);
  }
  // [新增] 小状态面板
  if (component.kind === "mini-panel") {
    return createMiniStatusPanelSvg(component.id);
  }
  if (component.kind === "banner") {
    return createBannerSvg(component.id);
  }
  if (component.kind === "status") {
    return createStatusBarSvg(component.id);
  }
  // [新增] 细长底部状态栏
  return createBottomThinStatusBarSvg(component.id);
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

function withSvgShell({
  id,
  width,
  height,
  content
}) {
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
      <circle cx="42" cy="42" r="16" stroke="${color}" stroke-width="${stroke}"></circle>
      <circle cx="42" cy="42" r="30" stroke="${color}" stroke-width="${stroke}"></circle>
      <line x1="42" y1="4" x2="42" y2="16"></line>
      <line x1="42" y1="68" x2="42" y2="80"></line>
      <line x1="4" y1="42" x2="16" y2="42"></line>
      <line x1="68" y1="42" x2="80" y2="42"></line>
      <line x1="14" y1="14" x2="22" y2="22"></line>
      <line x1="62" y1="62" x2="70" y2="70"></line>
      <line x1="14" y1="70" x2="22" y2="62"></line>
      <line x1="62" y1="22" x2="70" y2="14"></line>
    </g>`;
  }
  if (type === "trend") {
    return `<g transform="translate(62 60)">
      <polyline points="0,68 20,42 38,50 60,24 78,34 96,12" stroke="${color}" stroke-width="${stroke}" fill="none"></polyline>
      <line x1="0" y1="80" x2="102" y2="80"></line>
      <line x1="0" y1="80" x2="0" y2="8"></line>
    </g>`;
  }
  if (type === "grid") {
    return `<g transform="translate(66 62)">
      <rect x="0" y="0" width="34" height="34" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
      <rect x="46" y="0" width="34" height="34" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
      <rect x="0" y="46" width="34" height="34" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
      <rect x="46" y="46" width="34" height="34" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
    </g>`;
  }
  if (type === "home") {
    return `<g transform="translate(64 62)">
      <path d="M8 40 L44 12 L80 40" stroke="${color}" stroke-width="${stroke}" fill="none"></path>
      <rect x="20" y="40" width="48" height="40" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
      <rect x="38" y="52" width="12" height="28" rx="4" stroke="${color}" stroke-width="${stroke}"></rect>
    </g>`;
  }
  // [新增] 图标路径扩展
  if (type === "wifi") {
    return `<g transform="translate(64 66)">
      <path d="M6 40 C24 20, 62 20, 80 40" fill="none"></path>
      <path d="M18 48 C32 34, 54 34, 68 48" fill="none"></path>
      <path d="M30 56 C38 48, 48 48, 56 56" fill="none"></path>
      <circle cx="43" cy="64" r="3" fill="${color}" stroke="none"></circle>
    </g>`;
  }
  if (type === "battery") {
    return `<g transform="translate(60 72)">
      <rect x="0" y="10" width="96" height="50" rx="8" fill="none"></rect>
      <rect x="96" y="25" width="8" height="20" rx="3" fill="none"></rect>
      <rect x="10" y="20" width="56" height="30" rx="4" fill="${hexToRgba(color, 0.22)}"></rect>
      <line x1="76" y1="35" x2="88" y2="35"></line>
    </g>`;
  }
  if (type === "clock") {
    return `<g transform="translate(62 60)">
      <circle cx="48" cy="46" r="36" fill="none"></circle>
      <line x1="48" y1="46" x2="48" y2="24"></line>
      <line x1="48" y1="46" x2="66" y2="58"></line>
      <circle cx="48" cy="46" r="2.5" fill="${color}" stroke="none"></circle>
    </g>`;
  }
  if (type === "translate") {
    return `<g transform="translate(58 60)">
      <rect x="6" y="8" width="92" height="72" rx="10" fill="none"></rect>
      <path d="M22 28 H62 M42 28 V58 M28 58 L58 28" fill="none"></path>
      <path d="M74 48 L90 48 M82 36 V64" fill="none"></path>
    </g>`;
  }
  if (type === "camera") {
    return `<g transform="translate(58 64)">
      <rect x="6" y="20" width="96" height="62" rx="12" fill="none"></rect>
      <rect x="22" y="10" width="24" height="12" rx="4" fill="none"></rect>
      <circle cx="54" cy="51" r="20" fill="none"></circle>
      <circle cx="54" cy="51" r="8" fill="none"></circle>
    </g>`;
  }
  if (type === "mic") {
    return `<g transform="translate(66 58)">
      <rect x="30" y="10" width="28" height="52" rx="14" fill="none"></rect>
      <path d="M22 46 C22 64, 34 74, 44 74 C54 74, 66 64, 66 46" fill="none"></path>
      <line x1="44" y1="74" x2="44" y2="88"></line>
      <line x1="30" y1="88" x2="58" y2="88"></line>
    </g>`;
  }
  if (type === "map") {
    return `<g transform="translate(58 64)">
      <path d="M8 20 L38 10 L68 20 L98 10 V84 L68 94 L38 84 L8 94 Z" fill="none"></path>
      <line x1="38" y1="10" x2="38" y2="84"></line>
      <line x1="68" y1="20" x2="68" y2="94"></line>
      <path d="M52 42 C52 32, 60 26, 68 26 C76 26, 84 32, 84 42 C84 56, 68 66, 68 66 C68 66, 52 56, 52 42 Z" fill="none"></path>
      <circle cx="68" cy="42" r="4" fill="none"></circle>
    </g>`;
  }
  if (type === "chat") {
    return `<g transform="translate(58 68)">
      <rect x="8" y="10" width="94" height="58" rx="12" fill="none"></rect>
      <path d="M30 68 L24 86 L46 72" fill="none"></path>
      <line x1="24" y1="30" x2="86" y2="30"></line>
      <line x1="24" y1="44" x2="74" y2="44"></line>
    </g>`;
  }
  if (type === "calendar") {
    return `<g transform="translate(60 64)">
      <rect x="8" y="16" width="92" height="72" rx="10" fill="none"></rect>
      <line x1="8" y1="34" x2="100" y2="34"></line>
      <line x1="28" y1="8" x2="28" y2="24"></line>
      <line x1="80" y1="8" x2="80" y2="24"></line>
      <rect x="26" y="48" width="20" height="16" rx="4" fill="none"></rect>
      <rect x="56" y="48" width="20" height="16" rx="4" fill="none"></rect>
    </g>`;
  }
  if (type === "bell") {
    return `<g transform="translate(62 58)">
      <path d="M48 16 C66 16, 76 30, 76 50 V66 L86 74 H10 L20 66 V50 C20 30, 30 16, 48 16 Z" fill="none"></path>
      <circle cx="48" cy="82" r="7" fill="none"></circle>
    </g>`;
  }
  if (type === "scan") {
    return `<g transform="translate(62 60)">
      <path d="M8 30 V10 H28" fill="none"></path>
      <path d="M88 30 V10 H68" fill="none"></path>
      <path d="M8 62 V82 H28" fill="none"></path>
      <path d="M88 62 V82 H68" fill="none"></path>
      <line x1="18" y1="46" x2="78" y2="46"></line>
      <line x1="24" y1="56" x2="72" y2="56" stroke="${hexToRgba(color, 0.7)}"></line>
    </g>`;
  }
  if (type === "music") {
    return `<g transform="translate(64 60)">
      <path d="M22 18 V62 C22 70, 16 76, 8 76 C0 76, -6 70, -6 62 C-6 54, 0 48, 8 48 C13 48, 17 50, 22 52" fill="none"></path>
      <path d="M22 18 L76 8 V52 C76 60, 70 66, 62 66 C54 66, 48 60, 48 52 C48 44, 54 38, 62 38 C67 38, 71 40, 76 42" fill="none"></path>
    </g>`;
  }
  if (type === "compass") {
    return `<g transform="translate(62 60)">
      <circle cx="48" cy="46" r="36" fill="none"></circle>
      <path d="M48 18 L64 58 L48 74 L32 34 Z" fill="none"></path>
      <circle cx="48" cy="46" r="3" fill="${color}" stroke="none"></circle>
    </g>`;
  }
  if (type === "shield") {
    return `<g transform="translate(64 60)">
      <path d="M44 10 L82 24 V48 C82 70, 64 84, 44 92 C24 84, 6 70, 6 48 V24 Z" fill="none"></path>
      <path d="M28 48 L40 60 L62 34" fill="none"></path>
    </g>`;
  }
  return `<g transform="translate(64 62)">
    <path d="M8 40 L44 12 L80 40" stroke="${color}" stroke-width="${stroke}" fill="none"></path>
    <rect x="20" y="40" width="48" height="40" rx="6" stroke="${color}" stroke-width="${stroke}"></rect>
    <rect x="38" y="52" width="12" height="28" rx="4" stroke="${color}" stroke-width="${stroke}"></rect>
  </g>`;
}

function createInfoPanelSvg(id) {
  const width = 680;
  const height = 360;
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
    <rect x="16" y="16" width="648" height="328" rx="${r}" fill="${fill}"></rect>
    <line x1="34" y1="104" x2="644" y2="104" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="48" y1="232" x2="632" y2="232" stroke="${hexToRgba(state.color, 0.42)}" stroke-dasharray="5 6"></line>
    <polyline points="48,216 102,198 154,212 208,178 266,186 322,154 384,172 438,136 504,148 564,126 628,138" fill="none"></polyline>
  </g>
  <text x="38" y="56" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">分时概览</text>
  <text x="590" y="56" fill="${dim}" font-size="20" text-anchor="end" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
  <text x="38" y="90" fill="${state.color}" font-size="30" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">LMT-Demo 8821</text>
  <text x="38" y="146" fill="${state.color}" font-size="58" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">57.42</text>
  <text x="240" y="146" fill="${dim}" font-size="30" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">+1.35%</text>
  <text x="48" y="286" fill="${state.color}" font-size="24" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">09:30</text>
  <text x="632" y="286" fill="${state.color}" font-size="24" text-anchor="end" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15:00</text>`
  });
}

// [新增] 小状态面板
function createMiniStatusPanelSvg(id) {
  const width = 460;
  const height = 196;
  const r = state.radius + 2;
  const stroke = state.stroke.toFixed(2);
  const dim = hexToRgba(state.color, 0.74);
  const fill = hexToRgba(state.color, Math.max(0.06, state.fillAlpha * 0.9));
  const filterId = `${id}-glow`;
  return withSvgShell({
    id,
    width,
    height,
    content: `
  ${makeGlowFilter(filterId)}
  <g filter="url(#${filterId})" stroke="${state.color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="432" height="168" rx="${r}" fill="${fill}"></rect>
    <line x1="32" y1="76" x2="428" y2="76" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="156" y1="88" x2="156" y2="162" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <line x1="294" y1="88" x2="294" y2="162" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>

    <path d="M326 112 C336 102, 350 102, 360 112" fill="none"></path>
    <path d="M332 120 C340 112, 346 112, 354 120" fill="none"></path>
    <circle cx="343" cy="124" r="2" fill="${state.color}" stroke="none"></circle>

    <rect x="182" y="104" width="62" height="28" rx="7" fill="none"></rect>
    <rect x="244" y="111" width="5" height="14" rx="2" fill="none"></rect>
    <rect x="188" y="109" width="40" height="18" rx="5" fill="${hexToRgba(state.color, 0.22)}"></rect>
  </g>
  <text x="34" y="50" fill="${state.color}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">系统状态</text>
  <text x="424" y="50" text-anchor="end" fill="${dim}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">在线</text>

  <text x="52" y="120" fill="${state.color}" font-size="28" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
  <text x="58" y="152" fill="${dim}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">北京时间</text>

  <text x="188" y="152" fill="${state.color}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">电量 78%</text>
  <text x="324" y="152" fill="${state.color}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">WiFi 强</text>`
  });
}

function createBannerSvg(id) {
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
    <path d="M58 68 L58 88 M48 78 L68 78" stroke="${state.color}" stroke-width="${(state.stroke * 0.9).toFixed(2)}"></path>
    <circle cx="378" cy="146" r="16"></circle>
    <line x1="306" y1="146" x2="450" y2="146" stroke="${dim}" stroke-width="${(state.stroke * 0.8).toFixed(2)}"></line>
    <path d="M620 142 C640 132, 660 134, 682 142" stroke="${dim}"></path>
  </g>
  <text x="98" y="84" fill="${state.color}" font-size="28" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">下午会议提醒</text>
  <text x="98" y="116" fill="${dim}" font-size="22" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">15:30 团队周会 · 18:00 提交日报</text>
  <text x="46" y="202" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">14:29 · 16°C · 电量 100%</text>`
  });
}

function createStatusBarSvg(id) {
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

// [新增] 细长底部状态栏
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
  <text x="28" y="51" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">LightMind HUD</text>
  <text x="246" y="51" fill="${state.color}" font-size="20" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">16:12</text>
  <text x="466" y="51" fill="${dim}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">杭州 · 15°C</text>
  <text x="646" y="51" fill="${state.color}" font-size="18" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">在线 · 稳定</text>
  <text x="822" y="51" fill="${state.color}" font-size="16" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">80%</text>`
  });
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const expanded = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
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
