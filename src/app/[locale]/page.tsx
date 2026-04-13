import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPostMetaList } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPostMetaList();
  const t = await getTranslations('home');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-mono">
          {'>'} Lain&apos;s Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          // exploring technology, one post at a time
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-blue-500">#</span>
          {t('latestPosts')}
        </h2>
        <div className="grid gap-4">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
