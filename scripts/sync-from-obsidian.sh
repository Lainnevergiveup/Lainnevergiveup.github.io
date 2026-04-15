#!/bin/bash
# Sync blog posts from Obsidian Vault to content/posts/
# Only syncs .md/.mdx files from the "blogs" folder

VAULT_DIR="/Users/lain/Documents/Obsidian Vault/blogs"
BLOG_DIR="/Users/lain/Documents/personal-website/content/posts"

# Use rsync to sync (no --delete, preserves existing posts)
rsync -av \
  --exclude='.*' \
  --exclude='*.excalidraw.md' \
  "$VAULT_DIR/" "$BLOG_DIR/"

echo "Synced $(find "$BLOG_DIR" -name '*.md' -o -name '*.mdx' | wc -l | tr -d ' ') posts from Obsidian Vault"
