'use client';

import { useState } from 'react';
import type { PostMeta } from '@/lib/types';
import { PostCard } from './PostCard';

const PAGE_SIZE = 5;

export function Pagination({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const currentPosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <div className="grid gap-4">
        {currentPosts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
                p === page
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
