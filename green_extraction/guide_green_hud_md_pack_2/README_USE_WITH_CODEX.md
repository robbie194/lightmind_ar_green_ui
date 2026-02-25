# 给你（用户）使用的说明：如何把这套 MD 丢给 Codex

## 你现在手里有什么
这是一套“给 Codex 的任务包”，用于让它按正确顺序完成：
1. 风格提炼（不写代码）
2. 你确认风格规范
3. UI 实现（写代码）
4. 自检验收
5. 二次迭代修正（如需要）

---

## 文件顺序（必须按顺序）
1. `00_RUN_ORDER.md`  → 先发给 Codex（总规则）
2. `01_STYLE_LEARNING_TASK.md`  → 阶段 1 任务说明
3. `02_REFERENCES_INDEX_FILLED.md`  → 参考图用途映射（已填好）
4. （同时附上所有参考图 `02251308_*.jpg`）
5. 等 Codex 输出 `STYLE_SPEC.md` + `COMPONENT_PLAN.md` 后，你确认
6. 确认后再发：
   - `03_UI_IMPLEMENTATION_TASK.md`
   - `04_ACCEPTANCE_CHECKLIST.md`
7. 如果结果不满意，再用 `05_ITERATION_FIX_PROMPTS.md` 里的模板追改

---

## 推荐你给 Codex 的发法（最稳）
### 第一轮（只做风格规范）
把以下内容一次性发给 Codex：
- `00_RUN_ORDER.md`
- `01_STYLE_LEARNING_TASK.md`
- `02_REFERENCES_INDEX_FILLED.md`
- 全部参考图

并明确加一句：
> 现在只做阶段 1，请输出 `STYLE_SPEC.md` 和 `COMPONENT_PLAN.md`，不要写代码。

### 第二轮（做代码）
等你确认风格规范后，再发：
- `03_UI_IMPLEMENTATION_TASK.md`
- `04_ACCEPTANCE_CHECKLIST.md`

并明确加一句：
> 现在进入阶段 3，请按规范输出完整 `hud-ui/` 项目文件，并在末尾附自检结果。

### 第三轮（修正）
从 `05_ITERATION_FIX_PROMPTS.md` 里挑一条复制过去即可。

---

## 小提示（很有用）
- 如果 Codex开始“抄参考图内容/图标”，你就用模板 2 或模板 5 拉回正轨
- 如果导出 PNG 有黑底/白底，用模板 3
- 如果整体不像参考风格（太普通科技风），用模板 1
- 如果你想先稳住风格再扩组件，用模板 4

---

## 这套包的定位
- 是“任务编排 + 风格约束 + 验收清单”包
- 不是最终代码
- 目的是让 Codex稳定地产出可用的 HUD SVG/PNG 导出页面
