import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { hasLocale, locales } from '@/i18n/locale';
import { notFound } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Get base URL from environment variable or use default
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lesmirabelles-treport.com';

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }, { lang: 'nl' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {
      title: 'Les Mirabelles du Trèport',
      description: 'Apartment rental in Le Tréport',
    };
  }

  const titles: Record<string, string> = {
    fr: 'Les Mirabelles du Trèport - Appartement de vacances',
    en: 'Les Mirabelles du Trèport - Vacation Apartment',
    de: 'Les Mirabelles du Trèport - Ferienwohnung',
    nl: 'Les Mirabelles du Trèport - Vakantieappartement',
  };

  const descriptions: Record<string, string> = {
    fr: 'Appartement lumineux de 62 m² au pied de la plage au Trèport. Entièrement rénové et équipé.',
    en: 'Bright 62 m² apartment at the foot of the beach in Le Tréport. Fully renovated and equipped.',
    de: 'Helle 62 m² Wohnung am Fuße des Strandes in Le Tréport. Vollständig renoviert und ausgestattet.',
    nl: 'Licht appartement van 62 m² aan de voet van het strand in Le Tréport. Volledig gerenoveerd en uitgerust.',
  };

  const keywords: Record<string, string> = {
    fr: 'appartement vacances, location Le Tréport, appartement plage, location Normandie, vacances Le Tréport, appartement rénové',
    en: 'vacation apartment, Le Tréport rental, beach apartment, Normandy rental, Le Tréport vacation, renovated apartment',
    de: 'Ferienwohnung, Le Tréport Vermietung, Strandwohnung, Normandie Vermietung, Le Tréport Urlaub, renovierte Wohnung',
    nl: 'vakantieappartement, Le Tréport verhuur, strandappartement, Normandië verhuur, Le Tréport vakantie, gerenoveerd appartement',
  };

  const currentUrl = `${baseUrl}/${lang}`;
  const ogImage = `${baseUrl}/images/m1.avif`;

  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  locales.forEach((locale) => {
    alternates[locale] = `${baseUrl}/${locale}`;
  });

  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
    keywords: keywords[lang] || keywords.fr,
    authors: [{ name: 'Les Mirabelles du Trèport' }],
    creator: 'Les Mirabelles du Trèport',
    publisher: 'Les Mirabelles du Trèport',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: alternates,
    },
    openGraph: {
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      url: currentUrl,
      siteName: 'Les Mirabelles du Trèport',
      locale: lang === 'fr' ? 'fr_FR' : lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'nl_NL',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: titles[lang] || titles.fr,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
      ],
    },
    other: {
      'theme-color': '#78716c',
      'format-detection': 'telephone=no',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

