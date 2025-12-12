import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const locales = ['fr', 'en', 'de', 'nl'] as const;
export const defaultLocale = 'fr' as const;

export type Locale = (typeof locales)[number];

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocale(request: Request): Locale {
  const headers = {
    'accept-language': request.headers.get('accept-language') || '',
  };

  const languages = new Negotiator({ headers }).languages();
  const matchedLocale = match(languages, locales, defaultLocale);

  return matchedLocale as Locale;
}

