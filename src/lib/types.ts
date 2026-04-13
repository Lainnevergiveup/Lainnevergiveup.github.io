export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  categoryPath: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface CategoryNode {
  name: string;
  slug: string;
  path: string;
  children: Map<string, CategoryNode>;
  posts: PostMeta[];
  description?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface SearchItem {
  slug: string;
  title: string;
  summary: string;
  content: string;
  categoryPath: string[];
  tags: string[];
  date: string;
}

export type Locale = 'zh' | 'en';
