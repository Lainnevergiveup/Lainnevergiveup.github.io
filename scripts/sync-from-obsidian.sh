#!/bin/bash
# Sync blog posts from Obsidian Vault to content/posts/
# Only syncs .md/.mdx files from the "blogs" folder

VAULT_DIR="$HOME/Documents/Obsidian Vault/blogs"
BLOG_DIR="$HOME/Documents/personal-website/content/posts"

# Use rsync to sync (with --delete, Obsidian Vault is the source of truth)
rsync -av --delete \
  --exclude='.*' \
  --exclude='*.excalidraw.md' \
  "$VAULT_DIR/" "$BLOG_DIR/"

echo "Synced $(find "$BLOG_DIR" -name '*.md' -o -name '*.mdx' | wc -l | tr -d ' ') posts from Obsidian Vault"

# Filter out files without valid frontmatter (title, date, summary required)
node -e "
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const BLOG_DIR = '$BLOG_DIR';
let removed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(md|mdx)\$/.test(entry.name)) {
      const raw = fs.readFileSync(full, 'utf-8');
      let data;
      try { data = matter(raw).data; } catch { data = {}; }
      const missing = [];
      if (!data.title || typeof data.title !== 'string') missing.push('title');
      if (!data.date) missing.push('date');
      if (!data.summary || typeof data.summary !== 'string') missing.push('summary');
      if (missing.length) {
        const rel = path.relative(BLOG_DIR, full);
        console.log('⚠️  Skipped (missing ' + missing.join(', ') + '): ' + rel);
        fs.unlinkSync(full);
        removed++;
      }
    }
  }
}
walk(BLOG_DIR);
if (removed) console.log('Filtered ' + removed + ' file(s) without valid frontmatter');
"
