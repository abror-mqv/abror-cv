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
  const certificatesMessages = (await import(`./messages/${validLocale}/certificates.json`)).default;
  const projectsMessages = (await import(`./messages/${validLocale}/projects.json`)).default;
  const headerMessages = (await import(`./messages/${validLocale}/header.json`)).default;
  const contactModalMessages = (await import(`./messages/${validLocale}/contact_modal.json`)).default;
  const expectationsMessages = (await import(`./messages/${validLocale}/expectations.json`)).default;
  const timelineMessages = (await import(`./messages/${validLocale}/timeline.json`)).default;
  const timelineContentMessages = (await import(`./messages/${validLocale}/timeline_content.json`)).default;

  return {
    locale: validLocale,
    messages: {
      homepage: homepageMessages,
      certificates: certificatesMessages,
      projects: projectsMessages,
      header: headerMessages,
      contact_modal: contactModalMessages,
      expectations: expectationsMessages,
      timeline: timelineMessages,
      timeline_content: timelineContentMessages,
    },
  };
});

