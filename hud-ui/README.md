# LightMind HUD UI (Round 2)

## 1. 运行方式

- 直接打开：`hud-ui/index.html`
- 如果浏览器限制本地下载或图片解码，使用本地静态服务：

```bash
cd /home/robbie/tyf_file/startup/lightMind/code_ui_ar/hud-ui
/home/robbie/miniconda3/envs/lightmind/bin/python -m http.server 8080
```

然后访问：`http://127.0.0.1:8080`

## 2. 页面功能

- 顶部控制区：
- 主色
- 线宽
- 发光强度
- 圆角
- 缩放倍率
- 填充透明度
- 所有控件会实时影响页面中全部组件样式。

## 3. 组件清单（MVP）

- 图标卡片：设置、趋势、管理器、主页
- 信息面板：数据趋势面板（标题、主数值、涨跌、折线、时间刻度）
- 横向提示条：会议提醒条（双行文本 + 状态信息）
- 状态栏：时间、温度、WiFi、电池、电量

## 4. 导出说明

- 每个组件都有 `导出 SVG` 与 `导出 PNG` 按钮。
- 导出 SVG：序列化目标组件的 `<svg>` 节点，不包含页面背景和控制按钮。
- 导出 PNG：SVG -> Canvas（默认 2x）转换，透明背景不填充底色。

## 5. 已知限制

- 不同浏览器对字体渲染略有差异，中文文字宽度可能轻微不同。
- `file://` 打开时，个别浏览器可能限制 Blob 下载或 SVG 解码；建议使用本地静态服务。
- SVG 的 glow filter 在极端缩放下可能出现轻微边缘差异。

## 6. 扩展新组件

- 在 `script.js` 的 `components` 数组新增条目。
- 在 `createComponentSvg(...)` 中增加组件类型分支。
- 保持使用同一套 token（颜色、线宽、圆角、glow）以维持风格一致。
