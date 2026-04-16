import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPostMetaList, buildCategoryTree, getCategoryNodeByPath } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { CategoryTree } from '@/components/CategoryTree';
import type { CategoryNode } from '@/lib/types';
import Link from 'next/link';

function encodeSlug(seg: string): string {
  return encodeURIComponent(seg);
}

function decodeSlug(seg: string): string {
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

export function generateStaticParams() {
  const posts = getPostMetaList();
  const tree = buildCategoryTree(posts);
  const locales = ['zh', 'en'];
  const params: { locale: string; slug: string[] }[] = [];

  function collectPaths(node: CategoryNode, currentPath: string[] = []) {
    if (currentPath.length > 0) {
      locales.forEach((locale) =>
        params.push({ locale, slug: currentPath.map(encodeSlug) })
      );
    }
    node.children.forEach((child) => {
      collectPaths(child, [...currentPath, child.slug]);
    });
  }

  locales.forEach((locale) => params.push({ locale, slug: [] }));
  collectPaths(tree);
  return params;
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug: rawSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('categories');

  const posts = getPostMetaList();
  const tree = buildCategoryTree(posts);

  // Decode slug segments for internal use
  const slug = rawSlug?.map(decodeSlug);

  // No slug: show the overview page with the full tree
  if (!slug || slug.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          <span className="text-blue-500">#</span> {t('title')}
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <CategoryTree node={tree} />
        </div>
      </div>
    );
  }

  // Has slug: show specific category detail
  const node = getCategoryNodeByPath(tree, slug);
  if (!node) notFound();

  // Collect all posts from this node and all children
  function collectPosts(n: CategoryNode): typeof n.posts {
    let allPosts = [...n.posts];
    n.children.forEach((child) => {
      allPosts = allPosts.concat(collectPosts(child));
    });
    return allPosts;
  }

  const allPosts = collectPosts(node);

  return (
    <div>
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href={`/${locale}/categories`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {t('allCategories')}
        </Link>
        {slug.map((seg, i) => (
          <span key={i}>
            {' / '}
            <Link
              href={`/${locale}/categories/${slug.slice(0, i + 1).map(encodeSlug).join('/')}`}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {seg}
            </Link>
          </span>
        ))}
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        <span className="text-blue-500">#</span> {slug.join(' / ')}
      </h1>

      {node.children.size > 0 && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subcategories</h2>
          <CategoryTree node={node} />
        </div>
      )}

      {allPosts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t('noPosts')}</p>
      ) : (
        <div className="grid gap-4">
          {allPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
