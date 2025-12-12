import { MetadataRoute } from 'next';
import { locales } from '@/i18n/locale';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lesmirabelles-treport.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'fr' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `${baseUrl}/${loc}`])
      ),
    },
  }));

  return routes;
}

