---
title: "Next.js App Router 入门"
date: "2026-04-13"
tags: ["Next.js", "React", "SSR"]
summary: "了解 Next.js App Router 的核心概念，包括文件系统路由、服务端组件、布局和数据获取方式。"
---

# Next.js App Router 入门

Next.js 13+ 引入的 App Router 是一种全新的路由系统，基于 React Server Components 构建。

## 核心概念

### 文件系统路由

App Router 使用文件系统来定义路由：

```
app/
  page.tsx        → /
  about/page.tsx  → /about
  blog/[id]/page.tsx → /blog/:id
```

### 服务端组件

默认情况下，所有组件都是 **服务端组件**：

```tsx
// 这个组件在服务器上运行
export default async function Page() {
  const data = await fetchData(); // 直接使用 await
  return <div>{data.title}</div>;
}
```

### 客户端组件

需要交互功能时，使用 `'use client'` 指令：

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 数据获取

在 App Router 中，可以直接在组件内获取数据：

```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## 布局系统

布局在路由切换时保持状态，不会重新渲染：

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## 总结

App Router 提供了更直观的路由方式和更好的性能，是 Next.js 应用开发的推荐方式。
