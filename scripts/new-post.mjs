import fs from 'fs';
import path from 'path';
import readline from 'readline';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const title = await ask('Post title: ');
  const category = await ask('Category path (e.g. frontend/react): ');
  const tags = await ask('Tags (comma separated): ');
  const summary = await ask('Summary: ');

  const today = new Date().toISOString().split('T')[0];
  const slug = title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '');

  const dir = category ? path.join(POSTS_DIR, category) : POSTS_DIR;
  fs.mkdirSync(dir, { recursive: true });

  const filename = `${today}-${slug}.md`;
  const filePath = path.join(dir, filename);

  const frontmatter = `---
title: "${title}"
date: "${today}"
tags: [${tags
    .split(',')
    .map((t) => `"${t.trim()}"`)
    .join(', ')}]
summary: "${summary}"
---

# ${title}

Write your content here...
`;

  fs.writeFileSync(filePath, frontmatter);
  console.log(`\nCreated: ${filePath}`);
  rl.close();
}

main().catch(console.error);
