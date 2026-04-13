# 个人博客系统开发任务文档（Claude Code 中文完整版 v4 - 目录分类增强版）

---

## 一、项目目标

开发一个现代化个人博客系统，具备以下完整能力：

* 基于 Markdown（MD/MDX）内容驱动
* 支持目录驱动的分类系统（树形结构）
* 支持标签分类（辅助分类）
* 与 Obsidian 深度兼容（作为主要写作工具）
* 支持自动发布（写完即上线）
* 支持多语言（UI 国际化 + 内容翻译）
* 提供技术风 UI（开发者风格）
* 支持全文搜索
* 支持阅读统计
* 支持评论系统
* 支持文章目录（TOC）
* 支持代码复制功能
* 支持夜间模式（暗黑模式）
* 具备良好的可扩展性与可维护性
* 部署在 GitHub Pages

---

## 二、技术选型要求

请严格使用主流、稳定、社区成熟的技术栈：

* 框架：Next.js（App Router 模式）
* 语言：TypeScript
* 样式：Tailwind CSS
* 动画：Framer Motion
* 内容系统：MDX
* 国际化：next-intl
* 搜索：flexsearch 或 fuse.js
* 评论系统：giscus（基于 GitHub Discussions）
* 构建策略：静态生成（SSG）
* 部署平台：GitHub Pages
* CI/CD：GitHub Actions

---

## 三、核心功能模块

### 3.1 文章系统

* 从 `/content/posts` 目录读取文章
* 支持 `.md` 和 `.mdx` 文件
* 使用 frontmatter 管理元信息

#### 必须支持字段：

```yaml
title: "文章标题"
date: "2026-04-13"
tags: ["标签1", "标签2"]
summary: "文章摘要"
```

---

### 3.2 分类系统（基于目录自动生成）

#### 设计目标

通过文件目录结构自动生成博客分类体系，形成树形结构（支持多级嵌套），用于主导航。

---

#### 内容目录示例：

```bash
/content/posts
  /frontend
    /react
      hooks.md
  /backend
    node.md
```

---

#### 分类解析规则：

* 文件路径即分类路径
* 示例：

  * `/frontend/react/hooks.md` → 分类路径：["frontend", "react"]
* 支持无限级嵌套
* 文件名作为文章 slug

---

#### 分类数据结构要求：

系统必须构建树形结构：

* 每个分类节点包含：

  * 子分类（children）
  * 当前分类文章列表（posts）

---

#### 分类页面：

必须实现：

* `/categories`：分类总览（树形展示）
* `/categories/[...slug]`：分类详情页（支持多级路径）

示例：

* `/categories/frontend`
* `/categories/frontend/react`

---

#### 分类扩展（必须预留）：

* 支持 `index.md` 作为分类介绍页
* 支持未来添加：

  * 分类描述
  * 分类排序
  * 分类图标

---

### 3.3 标签系统（辅助分类）

#### 定义方式：

通过 frontmatter：

```yaml
tags: ["性能优化", "面试"]
```

---

#### 功能：

* 支持多标签
* 跨分类内容关联

---

#### 页面：

* `/tags`
* `/tags/[tag]`

---

#### 分类与标签关系：

* 分类：结构化（目录驱动）
* 标签：非结构化（手动添加）
* 两者必须同时支持且互不冲突

---

### 3.4 Markdown 渲染能力

必须完整支持：

* 标题（h1-h6）
* 段落
* 粗体 / 斜体
* 列表（有序 / 无序）
* 表格
* 外部链接
* 图片
* 行内代码
* 代码块

---

### 3.5 代码高亮

* 使用 Shiki 或 Prism
* 支持多语言
* 支持暗黑模式适配

---

### 3.6 文章目录（TOC）

* 自动解析 Markdown 标题（h1 ~ h3）
* 生成侧边目录
* 支持点击跳转
* 支持滚动高亮

---

### 3.7 代码复制功能

* 每个代码块提供复制按钮
* 点击复制到剪贴板
* 显示复制成功提示

---

### 3.8 评论系统（giscus）

* 基于 GitHub Discussions
* 自动绑定文章
* 支持暗黑模式
* 懒加载

---

### 3.9 阅读统计

提供接口：

```ts
trackPageView(postId: string)
```

支持扩展：

* Umami
* Google Analytics

---

### 3.10 搜索系统

* 构建时生成索引
* 前端全文搜索

支持：

* 标题
* 内容

---

### 3.11 夜间模式（暗黑模式）

* 支持切换
* 跟随系统
* 使用 Tailwind dark 模式
* localStorage 持久化

---

## 四、多语言支持

### 4.1 UI 国际化

* 使用 next-intl
* 默认中文
* 支持英文

```bash
/messages
  zh.json
  en.json
```

---

### 4.2 内容翻译

不维护多语言 Markdown。

实现：

```ts
translateContent(content: string, targetLang: string): Promise<string>
```

* 提供翻译按钮
* 初期可使用 mock
* 后期可接入 API

---

## 五、自动发布系统

### 5.1 自动流程

```text
Obsidian 写作
→ Git 提交
→ 推送 GitHub
→ GitHub Actions 构建
→ 自动部署
```

---

### 5.2 内容目录

```bash
/content/posts
```

---

### 5.3 文件命名建议

```bash
2026-04-13-my-post.md
```

---

### 5.4 CI 校验

必须校验：

* frontmatter 完整
* 日期格式正确
* tags 为数组
* Markdown 可解析

失败则构建失败

---

### 5.5 GitHub Actions

必须生成：

```bash
.github/workflows/deploy.yml
```

功能：

* push main 触发
* 自动 build
* 自动 deploy

---

### 5.6 本地工具

提供：

```bash
npm run new-post
```

功能：

* 自动创建文章
* 自动填充 frontmatter
* 自动生成 slug

---

### 5.7 图片管理

```bash
/public/images
```

Markdown：

```md
![](/images/xxx.png)
```

---

### 5.8 发布原则

* 写 Markdown 即发布
* 无需手动操作

---

## 六、UI / UX 要求

### 风格：

* 技术风
* 类似 Medium + GitHub Docs

---

### 布局：

* 响应式
* 支持侧边栏分类树
* 文章页：内容 + TOC + 评论

---

### 动画：

* 使用 Framer Motion
* 平滑过渡

---

## 七、页面结构

* `/`
* `/posts/[slug]`
* `/categories`
* `/categories/[...slug]`
* `/tags`
* `/tags/[tag]`
* `/about`

---

## 八、内容结构

```bash
/content/posts
/public/images
/messages
```

---

## 九、SEO

* sitemap.xml
* RSS
* meta 标签

---

## 十、Obsidian 兼容

* 标准 Markdown
* Git 同步
* 不破坏语法

---

## 十一、项目结构

```bash
/app
/components
/lib
/content
/messages
/public
/scripts
/styles
```

---

## 十二、可扩展性

必须支持未来：

* 评论系统替换
* 翻译 API
* 搜索升级
* AI增强

---

## 十三、交付内容

必须包含：

1. 完整代码
2. README
3. GitHub Actions
4. 示例文章
5. 本地脚本

---

## 十四、本地运行

```bash
npm install
npm run dev
```

---

## 十五、验收标准

必须全部满足：

* 分类树正常
* 标签系统正常
* 搜索正常
* 评论正常
* TOC 正常
* 代码复制正常
* 夜间模式正常
* 多语言正常
* 自动发布正常
* 页面响应式正常

---

## 十六、开发约束

* 使用 SSG
* 模块化
* 可维护

---

## 十七、最终目标

```text
Obsidian 写作 → 自动发布 → 在线博客
```
