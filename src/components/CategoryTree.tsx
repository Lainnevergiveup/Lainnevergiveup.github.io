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

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1.5 ${
          depth === 0 ? '' : ''
        }`}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
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
          href={`/${locale}/categories/${node.path}`}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
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
    <div className="space-y-1">
      {Array.from(node.children.values()).map((child) => (
        <CategoryTreeNode key={child.path} node={child} depth={0} />
      ))}
    </div>
  );
}
