---
title: "CSS Grid 布局实战"
date: "2026-04-12"
tags: ["CSS", "Grid", "布局"]
summary: "从基础到高级，全面掌握 CSS Grid 布局，包含大量实际案例和代码示例。"
---

# CSS Grid 布局实战

CSS Grid 是一种二维布局系统，专门用于处理页面中的行和列的布局。

## 基础概念

Grid 布局由 **Grid Container**（网格容器）和 **Grid Item**（网格项目）组成：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## 常用属性

| 属性 | 说明 |
|------|------|
| `grid-template-columns` | 定义列的大小 |
| `grid-template-rows` | 定义行的大小 |
| `gap` | 网格间距 |
| `grid-column` | 项目跨越的列 |
| `grid-row` | 项目跨越的行 |

## 实际案例：响应式卡片布局

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

这会自动根据容器宽度创建尽可能多的列，每列最小 300px。

## Grid vs Flexbox

- **Grid**: 二维布局（行和列）
- **Flexbox**: 一维布局（行或列）

选择建议：
- 整体页面布局 → Grid
- 组件内部布局 → Flexbox
