'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchBar } from './SearchBar';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Strip locale prefix for active detection
  const localePrefix = pathname.match(/^\/(zh|en)/) ? pathname.slice(0, 3) : '';
  const currentPath = pathname.replace(/^\/(zh|en)/, '') || '/';

  const links = [
    { href: '/', label: t('home') },
    { href: '/github', label: 'GitHub' },
    { href: '/about', label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={`${localePrefix}/`} className="text-xl font-bold text-gray-900 dark:text-white font-mono">
            {'<Lain />'}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`${localePrefix}${link.href}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.href
                    ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <SearchBar />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-3 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={`${localePrefix}${link.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      currentPath === link.href
                        ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-2 px-3 pt-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
