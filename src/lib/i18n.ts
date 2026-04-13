import {getRequestConfig} from 'next-intl/server';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
});

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'zh' | 'en')) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
