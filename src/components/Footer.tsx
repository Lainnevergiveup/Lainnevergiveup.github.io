'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {year} Lain. {t('copyright')}.</p>
          <p className="mt-1">
            Built with{' '}
            <span className="text-gray-700 dark:text-gray-300">Next.js</span>
            {' '}&{' '}
            <span className="text-gray-700 dark:text-gray-300">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
