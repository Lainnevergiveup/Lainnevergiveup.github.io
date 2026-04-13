'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { TocItem } from '@/lib/types';

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  const t = useTranslations('post');
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-20 w-56 shrink-0">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        {t('tableOfContents')}
      </h3>
      <ul className="space-y-1 text-sm border-l border-gray-200 dark:border-gray-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-1 transition-colors ${
                item.level === 1 ? 'pl-3' : item.level === 2 ? 'pl-6' : 'pl-9'
              } ${
                activeId === item.id
                  ? 'text-blue-600 dark:text-blue-400 border-l-2 border-blue-600 dark:border-blue-400 -ml-px font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
