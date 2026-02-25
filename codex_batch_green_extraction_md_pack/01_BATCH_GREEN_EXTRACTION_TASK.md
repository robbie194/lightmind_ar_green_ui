# 阶段 1：批量自动提取参考图中的绿色部分（透明 PNG 候选）

## 任务目标
实现一个 **Python 批量处理工具**，扫描目录：

`/home/robbie/tyf_file/startup/lightMind/code_ui_ar/leqi_ui`

自动从所有图片中提取绿色 UI/图标区域，去除背景，并导出透明 PNG 候选素材。

> 每张图中的绿色图标/绿色HUD元素都是目标。优先自动化，不要求用户逐张查看原图或手工框选。

---

## 实现要求（必须）

### 技术栈（建议）
- Python 3.x
- OpenCV (`cv2`)
- NumPy
- Pillow（可选，用于保存/检查透明PNG）
- 标准库（argparse、pathlib、json、csv）

如果你选择其他库，也可以，但要保证本地易运行。

---

## 输入与输出（必须）

### 默认输入目录（写死默认值）
`/home/robbie/tyf_file/startup/lightMind/code_ui_ar/leqi_ui`

### 支持的输入格式（至少）
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`（可选）

### 输出目录结构（建议）
```text
green_extract_output/
  masks/                 # 每张原图对应绿色掩膜（可选）
  crops_png/             # 裁切后的透明PNG候选（核心输出）
  debug_overlays/        # 调试可视化（原图+框），可选
  metadata/
    candidates.json      # 候选信息（来源、bbox、面积等）
    summary.json         # 汇总统计
```

---

## 必须完成的处理流程（核心）

### 1) 扫描所有图片
- 递归扫描输入目录（建议）
- 按扩展名过滤
- 跳过无法读取的文件并记录错误日志

### 2) 绿色区域检测（必须）
使用颜色分割提取绿色区域，建议在 **HSV 色彩空间** 中完成，至少提供可调参数：
- Hue 范围（绿色区间）
- Saturation 最小阈值
- Value 最小阈值 / 最大阈值（可选）

#### 要求
- 参数可配置（配置文件或命令行）
- 初始默认参数要能覆盖“荧光绿HUD”风格
- 尽量保留发光边缘（避免只留下过细中心线）

### 3) 掩膜净化（必须）
至少提供以下处理步骤（可开关）：
- 开运算（去噪点）
- 闭运算（连通断裂）
- 膨胀/腐蚀（可选）
- 小连通域过滤（按面积阈值）

### 4) 连通域 / 轮廓分割（必须）
从绿色掩膜中自动分割出多个候选区域：
- 每个候选区域计算 bbox
- 可按面积/宽高比过滤掉明显噪点
- 保留来源文件名、bbox、面积等元数据

### 5) 导出透明 PNG（必须）
对每个候选区域：
- 按 bbox 从原图裁切
- 使用绿色掩膜作为 alpha 通道（透明背景）
- 导出为独立 PNG 文件

#### 文件命名建议
`{source_stem}__cand_{index:03d}.png`

例如：
`scene01__cand_004.png`

### 6) 元数据输出（必须）
输出 `candidates.json`，每个候选至少包含：
- `id`
- `source_file`
- `output_png`
- `bbox` (`x`,`y`,`w`,`h`)
- `area_px`
- `mask_area_px`
- `aspect_ratio`
- `score`（可选，自定义质量分）

输出 `summary.json`，至少包含：
- 总图片数
- 成功处理数
- 候选总数
- 被过滤数量（按原因统计）
- 错误文件列表（如有）

---

## 参数化要求（非常重要）
请提供以下可调参数（命令行或 config）：

### 颜色阈值
- `h_min`, `h_max`
- `s_min`
- `v_min`
- （可选）`v_max`

### 形态学参数
- `open_kernel`
- `close_kernel`
- `dilate_iter`（可选）
- `erode_iter`（可选）

### 候选过滤参数
- `min_area`
- `max_area`（可选）
- `min_width`, `min_height`
- `max_aspect_ratio`（可选）
- `padding`（导出时bbox外扩边距）

### 运行控制
- `recursive`（是否递归）
- `save_masks`
- `save_debug_overlays`
- `limit`（调试时限制处理前N张图，可选）

---

## 质量增强（建议实现）
可实现但不是硬性必须：
1. **双阈值绿色检测**
   - 核心亮绿 + 外围弱绿 两层mask合并
2. **自适应阈值微调**
   - 根据图像整体亮度微调 `v_min`
3. **候选评分**
   - 根据绿色占比、边缘密度、面积范围生成 quality score
4. **合并相邻候选**
   - 对过近bbox进行合并（防止一个图标被切成多块）

---

## 调试输出（建议）
- `debug_overlays/`：原图上画出候选框和编号
- 每张图输出一张带框调试图，方便快速判断提取是否大体正确（不是逐张人工抠图）

---

## 代码结构建议（可调整）
```text
extract_green/
  extract_green.py           # 主脚本
  config.json                # 默认参数
  image_utils.py             # 图像处理函数（可选）
  filters.py                 # 阈值与形态学处理（可选）
  README.md
```

---

## README 必须说明
- 依赖安装命令（如 `pip install opencv-python numpy pillow`）
- 默认输入目录
- 如何运行
- 如何调整阈值参数
- 输出目录说明
- 常见问题（漏检/误检、发光边缘太薄等）

---

## 成功标准（验收）
运行后应满足：
- 能批量处理输入目录中的图片
- 生成大量透明PNG候选（不是整图）
- 背景透明正确
- 生成元数据与汇总统计
- 参数可调，便于二次优化
