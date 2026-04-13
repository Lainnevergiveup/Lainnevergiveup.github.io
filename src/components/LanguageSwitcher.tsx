'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace locale prefix in pathname
    const newPath = pathname.replace(/^\/(zh|en)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLocale('zh')}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          locale === 'zh'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          locale === 'en'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
