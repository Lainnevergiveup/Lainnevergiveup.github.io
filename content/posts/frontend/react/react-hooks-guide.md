---
title: "React Hooks 完全指南"
date: "2026-04-13"
tags: ["React", "Hooks", "前端"]
summary: "深入理解 React Hooks 的核心概念和最佳实践，包括 useState、useEffect、useContext 等常用 Hook 的详细用法。"
---

# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## useState

`useState` 是最基础的 Hook，用于在函数组件中添加状态：

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

## useEffect

`useEffect` 用于处理副作用，如数据获取、订阅、手动修改 DOM 等：

```typescript
useEffect(() => {
  document.title = `You clicked ${count} times`;

  return () => {
    // cleanup
  };
}, [count]);
```

## useContext

`useContext` 让你可以订阅 React 的 Context：

```typescript
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Styled Button</button>;
}
```

## 自定义 Hook

你可以创建自定义 Hook 来复用状态逻辑：

```typescript
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

## 最佳实践

1. **只在最顶层使用 Hook** - 不要在循环、条件或嵌套函数中调用 Hook
2. **只在 React 函数中调用 Hook** - 不要在普通的 JavaScript 函数中调用
3. **使用 ESLint 插件** - `eslint-plugin-react-hooks` 可以帮助你遵守这些规则
