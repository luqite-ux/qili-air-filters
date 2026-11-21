# 动效方案

## 外部候选

- OpenAI GPT‑6 Astra：分章节滚动揭示与大标题层级。采用克制的章节节奏；不采用黑色沉浸背景。
- Google Antigravity：空间层次、模块过渡和产品矩阵交互。采用轻量空间纵深；不采用宇宙装饰或持续漂浮。
- Motion UI 候选：image-mask reveal。适合真实设备/滤材图，但避免遮罩影响主体完整。
- Motion Examples 候选：scroll-driven layered diagram。仅用于解释空气流经多级过滤的业务关系。

## 最终 4 个场景

1. `hero-layered-entry`：Logo/导航、标题、说明、CTA、主视觉按信息优先级进入；手机缩短位移，reduced motion 立即显示。
2. `airflow-explainer`：首页气流/滤层关系随滚动分层推进，可用轻量 Three.js/WebGL；无 WebGL、低性能、手机或 reduced motion 回退为静态 SVG/图片，内容不依赖动画。
3. `media-mask-reveal`：制造、设备与证书图片在真实进入视口时做克制遮罩揭示；每项单独触发，故障只恢复可见，不写完成状态。
4. `card-stagger-feedback`：产品、应用、资质、FAQ 等卡片逐项 stagger 入场，桌面 hover 轻抬 4–6px，手机保留入场与触控反馈。

全部主要区块和卡片集合均有可感知进入视口动效；禁止固定超时提前将屏外区块标记完成。基础 CSS 默认内容可见，只有 `data-motion-ready` 后才允许短暂增强状态。桌面、390px、键盘、触控、prefers-reduced-motion、禁用 JS 与脚本失败均纳入后续复验。
