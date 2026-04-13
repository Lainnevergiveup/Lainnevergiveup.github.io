// Reading statistics interface
export interface ReadingStats {
  postId: string;
  views: number;
}

// Track page view - placeholder for analytics integration
export function trackPageView(postId: string): void {
  // This can be extended to integrate with:
  // - Umami
  // - Google Analytics
  // - Custom analytics backend
  if (typeof window !== 'undefined') {
    const key = `post-views-${postId}`;
    const views = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, String(views + 1));
  }
}

export function getPageViews(postId: string): number {
  if (typeof window !== 'undefined') {
    const key = `post-views-${postId}`;
    return parseInt(localStorage.getItem(key) || '0', 10);
  }
  return 0;
}
