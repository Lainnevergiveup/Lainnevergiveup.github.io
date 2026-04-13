import * as FlexSearch from 'flexsearch';
import type { SearchItem } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let index: any = null;
let documents: SearchItem[] = [];

export function buildSearchIndex(items: SearchItem[]) {
  documents = items;
  index = new FlexSearch.Index({
    tokenize: 'forward',
    cache: true,
  });
  items.forEach((item, i) => {
    index.add(i, `${item.title} ${item.summary} ${item.content}`);
  });
}

export function search(query: string): SearchItem[] {
  if (!index || !query.trim()) return [];
  const results = index.search(query, { limit: 20 });
  return (results as number[]).map((i) => documents[i]);
}

export function getSearchData(): SearchItem[] {
  return documents;
}
