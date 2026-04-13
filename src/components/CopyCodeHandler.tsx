'use client';

import { useEffect } from 'react';

export function CopyCodeHandler() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains('copy-btn')) {
        const code = decodeURIComponent(target.getAttribute('data-code') || '');
        navigator.clipboard.writeText(code).then(() => {
          target.textContent = 'Copied!';
          setTimeout(() => {
            target.textContent = 'Copy';
          }, 2000);
        });
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
