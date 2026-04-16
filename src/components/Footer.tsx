'use client';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {year} Lain · Built with Next.js & TypeScript
      </div>
    </footer>
  );
}
