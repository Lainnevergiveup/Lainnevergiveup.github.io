'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import type { CategoryNode } from '@/lib/types';

interface CategoryTreeProps {
  node: CategoryNode;
  depth?: number;
}

function CategoryTreeNode({ node, depth = 0 }: CategoryTreeProps) {
  const locale = useLocale();
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.size > 0;

  const encodedPath = node.path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1.5"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <svg
              className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <span className="w-5" />}
        <Link
          href={`/${locale}/categories/${encodedPath}`}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {node.name}
        </Link>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({node.posts.length})
        </span>
      </div>
      {expanded && hasChildren && (
        <div>
          {Array.from(node.children.values()).map((child) => (
            <CategoryTreeNode key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryTree({ node }: { node: CategoryNode }) {
  return (
    <div className="space-y-0.5">
      {Array.from(node.children.values()).map((child) => (
        <CategoryTreeNode key={child.path} node={child} />
      ))}
    </div>
  );
}
