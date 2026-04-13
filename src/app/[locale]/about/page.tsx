import { setRequestLocale, getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        <span className="text-blue-500">#</span> {t('title')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="prose max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {locale === 'zh'
              ? '你好！我是 Lain，一名热爱技术的开发者。这个博客是我的技术笔记本，记录我在编程、系统设计和开源领域的探索与思考。'
              : 'Hello! I\'m Lain, a developer passionate about technology. This blog is my tech notebook where I document my explorations in programming, system design, and open source.'}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            {locale === 'zh' ? '技术栈' : 'Tech Stack'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'TypeScript', icon: '{}' },
              { name: 'React / Next.js', icon: '</>' },
              { name: 'Node.js', icon: '>>' },
              { name: 'Python', icon: 'py' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <span className="text-blue-500 font-mono font-bold">{tech.icon}</span>
                <span className="text-gray-700 dark:text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            {locale === 'zh' ? '联系方式' : 'Contact'}
          </h2>
          <div className="flex gap-4">
            <a
              href="https://github.com/lain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
