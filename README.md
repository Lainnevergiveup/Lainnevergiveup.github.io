# Lain's Tech Blog

A modern personal tech blog built with Next.js App Router, TypeScript, Tailwind CSS, and MDX.

## Features

- **Markdown/MDX driven** - Write posts in `.md`/`.mdx` with frontmatter
- **Directory-based categories** - Automatic tree structure from file paths
- **Tag system** - Multi-tag support with cross-category linking
- **i18n** - Chinese/English with next-intl
- **Full-text search** - Client-side search with FlexSearch
- **Dark mode** - System-aware with localStorage persistence
- **Code highlighting** - Shiki-powered syntax highlighting with copy button
- **Table of Contents** - Auto-generated with scroll-spy highlighting
- **Comments** - Giscus (GitHub Discussions)
- **Responsive** - Mobile-first design with sidebar TOC
- **SEO** - Sitemap, RSS, meta tags

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion
- next-intl (i18n)
- FlexSearch (search)
- Shiki (code highlighting)
- Giscus (comments)
- next-themes (dark mode)

## Getting Started

```bash
npm install
npm run dev
```

## Writing Posts

### Create a new post

```bash
npm run new-post
```

### Manual creation

Place `.md` or `.mdx` files in `content/posts/`. The directory path becomes the category:

```
content/posts/
  frontend/
    react/
      my-post.md      -> /posts/my-post (category: frontend/react)
  backend/
    node-api.md       -> /posts/node-api (category: backend)
```

### Frontmatter format

```yaml
---
title: "Post Title"
date: "2026-04-13"
tags: ["Tag1", "Tag2"]
summary: "A brief summary of the post"
---
```

## Deployment

Pushes to `main` automatically deploy via GitHub Actions to GitHub Pages.

## Project Structure

```
content/posts/      # Blog posts (Markdown/MDX)
public/images/      # Static images
src/
  app/              # Next.js App Router pages
  components/       # React components
  lib/              # Utilities (posts, search, i18n, MDX)
  messages/         # i18n translations
scripts/            # Build & content scripts
.github/workflows/  # CI/CD
```
