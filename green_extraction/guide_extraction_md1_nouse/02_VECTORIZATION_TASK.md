# 阶段 3：将提取到的绿色候选批量矢量化为 SVG（可选但建议）

## 任务目标
对阶段 1 提取出的透明 PNG 候选（或二值掩膜）进行批量矢量化，输出 SVG 文件，用于后续整理、编辑和复用。

> 注意：原图中很多绿色元素有发光和模糊边缘，直接矢量化会产生粗糙边界。请提供“轮廓简化”和“风格化重建”的参数化方案。

---

## 输入来源
默认从阶段 1 输出目录读取：
- `green_extract_output/crops_png/`
- 或 `green_extract_output/masks/`（如果保存了mask）

---

## 输出目录建议
```text
green_extract_output/
  vectors_svg/              # SVG候选输出（核心）
  vector_debug/             # 可选，调试预览图
  metadata/
    vectors.json            # SVG结果映射与参数记录
```

---

## 必须实现的内容

### 1) 支持两种矢量化模式（至少一种必须完整实现）
#### 模式 A：基于轮廓（推荐，易落地）
- 从 alpha mask 或二值mask中提取轮廓（`findContours`）
- 将轮廓点转换为 SVG path
- 支持轮廓简化（`approxPolyDP` 或自定义简化）
- 处理孔洞（如果有）

#### 模式 B：外部矢量化工具（可选）
如使用 potrace / autotrace：
- 调用前先生成二值mask
- 记录调用参数
- 输出SVG

> 如果依赖外部工具，请在 README 中说明安装方法；同时建议保留轮廓法作为纯Python fallback。

---

### 2) SVG 输出要求（必须）
每个候选导出独立 SVG，默认透明背景。

#### 最低要求版本（必须）
- 包含 `viewBox`
- 包含 path 轮廓
- 可用绿色填充或描边表示主体（可配置）
- 文件名与PNG候选对应

#### 推荐增强版本（建议）
- 提供两层表现：
  1. 核心线/主体（清晰）
  2. 淡发光层（SVG filter 或半透明描边）
- 提供 `stroke-only` 输出模式，便于后续做HUD风格统一化

---

### 3) 参数化要求（必须）
- `threshold_alpha`（从PNG alpha提mask时）
- `min_contour_area`
- `epsilon_ratio`（轮廓简化强度）
- `mode`（fill / stroke / dual）
- `stroke_width`
- `color`（默认HUD绿）
- `use_glow_filter`（bool）
- `glow_strength`（简化参数）

---

### 4) 质量过滤（建议）
自动过滤明显无效的矢量结果：
- 轮廓点过少
- 面积极小
- 过度碎片化
- 超过最大复杂度（点数过多）

并在 `vectors.json` 记录状态：
- `success`
- `skipped_reason`
- `contour_count`
- `point_count`

---

## 文件命名与映射
保持与原候选一致，便于追溯：
- `scene01__cand_004.svg`

在 `vectors.json` 中记录：
- `source_png`
- `source_original`
- `svg_file`
- 参数（epsilon、mode等）
- 结果统计

---

## README 必须说明
- 如何运行矢量化脚本
- 如何调简化参数（太锯齿 vs 太失真）
- 为什么发光边缘不建议直接完整矢量化
- 推荐工作流：先提取透明PNG -> 再矢量化 -> 再在SVG中重建发光

---

## 成功标准（验收）
- 能批量把候选PNG/mask转成SVG
- SVG 背景透明
- 轮廓质量可通过参数调节
- 有元数据记录与可追溯映射
