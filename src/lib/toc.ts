import GithubSlugger from 'github-slugger';
import type { TocItem } from './types';

export function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_~\[\]]/g, '').trim();
    const id = slugger.slug(text);
    items.push({ id, text, level });
  }

  return items;
}
