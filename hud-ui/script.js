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
  { id: "panel-info-trend", title: "信息面板 / 数据趋势", kind: "panel" },
  { id: "banner-reminder", title: "横向提示条 / 日程提醒", kind: "banner" },
  { id: "statusbar-core", title: "状态栏 / 基础元素", kind: "status" }
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
  if (component.kind === "banner") {
    return createBannerSvg(component.id);
  }
  return createStatusBarSvg(component.id);
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
