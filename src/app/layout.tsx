import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Lain's Tech Blog",
  description: 'A modern personal tech blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
