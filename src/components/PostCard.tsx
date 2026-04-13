'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import type { PostMeta } from '@/lib/types';

interface PostCardProps {
  post: PostMeta;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const locale = useLocale();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
    >
      <Link href={`/${locale}/posts/${post.slug}`}>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.categoryPath.length > 0 && (
            <>
              <span>·</span>
              <span className="text-blue-600 dark:text-blue-400">
                {post.categoryPath.join(' / ')}
              </span>
            </>
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {post.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
