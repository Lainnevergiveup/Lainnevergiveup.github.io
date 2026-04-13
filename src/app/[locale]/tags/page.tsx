import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPostMetaList, getAllTags } from '@/lib/posts';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function TagsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('tags');
  const posts = getPostMetaList();
  const tagMap = getAllTags(posts);

  const sortedTags = Array.from(tagMap.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        <span className="text-blue-500">#</span> {t('title')}
      </h1>
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, tagPosts]) => (
          <Link
            key={tag}
            href={`/${locale}/tags/${tag}`}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            #{tag}
            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
              {tagPosts.length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
