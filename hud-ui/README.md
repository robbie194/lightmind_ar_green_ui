# LightMind HUD UI (Round 3.5 Expand)

## 1. 运行方式

- 直接打开：`hud-ui/index.html`
- 如果浏览器限制本地下载或图片解码，使用本地静态服务：

```bash
cd /home/robbie/tyf_file/startup/lightMind/code_ui_ar/hud-ui
/home/robbie/miniconda3/envs/lightmind/bin/python -m http.server 8080
```

然后访问：`http://127.0.0.1:8080`

## 2. 页面分组

1. 图标卡片 / 基础入口（已有 + 新增）
2. 信息面板 / 行情与数据
3. 导航与地图类
4. 识别 / 翻译 / 会议类
5. 提示条 / 快捷提示
6. 状态栏 / 状态组

## 3. 新增覆盖

- 新增图标卡片：`12` 个（会议记录、实时翻译、地图导航、AI助手、提词器、歌词、相机拍摄、视频录制、相册图片、文件管理、股票行情、翻译识图）
- 新增面板类：`6` 个（自选股列表、分时行情、地图导航、实时翻译、会议摘要、拍摄提示层）
- 新增状态类：`3` 个（底部导航状态栏、左下环境状态组、右下连接状态组）
- 新增提示条变体：`2` 个（日程摘要条、AI 助手唤起提示条）

## 4. 导出说明

- 每个组件都有 `导出 SVG` 与 `导出 PNG` 按钮。
- 导出逻辑复用同一套函数：`exportSvg(...)` / `exportPng(...)`。
- 导出文件名使用稳定可读的 `kebab-case`（例如 `hud-panel-watchlist.svg`、`hud-card-ocr.png`）。
- PNG 导出默认 `2x`，透明背景不填充底色。

## 5. 已知限制

- 不同浏览器对中文字体渲染略有差异。
- `file://` 下个别浏览器可能限制 Blob 下载；建议本地静态服务。
- SVG glow 在极端缩放下可能有轻微边缘差异。

## 6. 扩展方法

- 在 `script.js` 的 `components` 新增配置项（`id/group/kind/variant/exportName`）。
- 按 `kind + variant` 在对应工厂函数新增 SVG 结构。
- 复用现有导出函数，不要复制导出逻辑。
