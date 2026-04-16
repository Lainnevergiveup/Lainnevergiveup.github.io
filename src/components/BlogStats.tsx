import type { PostMeta } from '@/lib/types';

export function BlogStats({ posts }: { posts: PostMeta[] }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthCount = posts.filter((p) => {
    const d = new Date(p.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{posts.length}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">博客总数</div>
      </div>
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{thisMonthCount}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">本月更新</div>
      </div>
    </div>
  );
}
