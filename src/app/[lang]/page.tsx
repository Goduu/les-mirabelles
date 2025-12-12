import { notFound } from 'next/navigation';
import { getDictionary } from './dictionaries';
import { hasLocale, type Locale } from '@/i18n/locale';
import ApartmentGallery from '../ApartmentGallery';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lesmirabelles-treport.com';

function generateStructuredData(lang: Locale, dictionary: Awaited<ReturnType<typeof getDictionary>>, airbnbUrl: string) {
  const images = Array.from({ length: 10 }, (_, i) => `${baseUrl}/images/m${i + 1}.avif`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: dictionary.apartment.name,
    description: dictionary.apartment.description,
    image: images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Le Tréport',
      addressRegion: 'Normandie',
      addressCountry: 'FR',
      streetAddress: 'Les Mirabelles du Trèport',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0607202,
      longitude: 1.3664729,
    },
    numberOfRooms: 2,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: 62,
      unitCode: 'MTK',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Kitchen',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Bathroom',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Beach Access',
        value: true,
      },
    ],
    url: `${baseUrl}/${lang}`,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: airbnbUrl,
        actionPlatform: ['http://schema.org/Airbnb'],
      },
    },
    offers: {
      '@type': 'Offer',
      url: airbnbUrl,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const airbnbUrl = process.env.NEXT_PUBLIC_AIRBNB_URL || 'https://airbnb.fr/h/les-mirabelles-du-treport';
  const structuredData = generateStructuredData(lang, dictionary, airbnbUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ApartmentGallery airbnbUrl={airbnbUrl} dictionary={dictionary} lang={lang} />
    </>
  );
}

