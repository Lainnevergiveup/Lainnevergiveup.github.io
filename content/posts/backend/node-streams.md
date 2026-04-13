---
title: "Node.js 流处理详解"
date: "2026-04-11"
tags: ["Node.js", "Streams", "后端"]
summary: "深入解析 Node.js 中的流（Stream）概念，包括可读流、可写流、双工流和转换流的使用方法。"
---

# Node.js 流处理详解

Node.js 中的 Stream 是处理流式数据的抽象接口，特别适合处理大量数据或网络通信。

## 流的类型

Node.js 有四种基本流类型：

1. **Readable** - 可读流（如 `fs.createReadStream`）
2. **Writable** - 可写流（如 `fs.createWriteStream`）
3. **Duplex** - 双工流（可读可写，如 TCP socket）
4. **Transform** - 转换流（可修改数据的双工流）

## 基础示例

```javascript
const fs = require('fs');

// 创建可读流
const readStream = fs.createReadStream('./input.txt', 'utf8');

// 监听数据事件
readStream.on('data', (chunk) => {
  console.log('Received:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading');
});
```

## 管道操作

管道是流处理的核心概念，它将一个流的输出连接到另一个流的输入：

```javascript
const fs = require('fs');
const zlib = require('zlib');

// 压缩文件
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

## 为什么要用流？

- **内存效率** - 不需要将所有数据加载到内存
- **时间效率** - 边接收边处理，无需等待全部数据

```plaintext
普通方式: 等待全部数据 → 处理 → 输出
流方式:   边接收 → 边处理 → 边输出
```
