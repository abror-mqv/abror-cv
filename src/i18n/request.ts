import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Try to get locale from cookie, fallback to provided locale or default
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  let validLocale: Locale = defaultLocale;
  
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    validLocale = cookieLocale as Locale;
  } else if (locale && locales.includes(locale as Locale)) {
    validLocale = locale as Locale;
  }

  const homepageMessages = (await import(`./messages/${validLocale}/homepage.json`)).default;

  return {
    locale: validLocale,
    messages: {
      homepage: homepageMessages,
    },
  };
});

