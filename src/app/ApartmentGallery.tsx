"use client";

import AirBnbIcon from "@/components/AirBnbIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Locale } from "@/i18n/locale";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { FaCouch, FaUtensils, FaBed, FaShower } from "react-icons/fa";

type Dictionary = Awaited<ReturnType<typeof import('./[lang]/dictionaries').getDictionary>>;

interface ApartmentGalleryProps {
  airbnbUrl?: string;
  dictionary: Dictionary;
  lang: Locale;
}

export default function ApartmentGallery({
  airbnbUrl = "https://airbnb.fr/h/les-mirabelles-du-treport",
  dictionary,
  lang
}: ApartmentGalleryProps) {
  const imageData = dictionary.images.alt.map((alt, index) => ({
    src: `/images/m${index + 1}.avif`,
    alt,
    size: index < 2 ? "large" as const : index < 5 ? "medium" as const : "small" as const,
  }));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden professional-bg">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-50/30 via-white to-stone-50/30 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,113,108,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,113,108,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Scroll-triggered Header with Airbnb Button */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl border-b border-stone-200/50 dark:border-stone-800/50 shadow-sm transition-all duration-300 ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              {dictionary.apartment.name}
            </h1>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang={lang} dictionary={dictionary} />
              <a
                href={airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-stone-600 hover:bg-stone-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <AirBnbIcon className="size-5" />
                <span className="hidden sm:inline">{dictionary.header.bookButton}</span>
                <span className="sm:hidden">{dictionary.header.bookButtonShort}</span>
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </header>

        {/* Gallery Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <article className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Apartment Information Card */}
            <section className="bento-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 shadow-lg hover:shadow-xl transition-all duration-500 sm:col-span-2 sm:row-span-2 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                  {dictionary.apartment.name}
                </h2>
                <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
                  {dictionary.apartment.description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-stone-700/50 backdrop-blur-sm">
                    <FaCouch className="text-3xl sm:text-4xl text-stone-700 dark:text-stone-200 mb-2" />
                    <span className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100 text-center">
                      {dictionary.apartment.features.livingSpace}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-stone-700/50 backdrop-blur-sm">
                    <FaUtensils className="text-3xl sm:text-4xl text-stone-700 dark:text-stone-200 mb-2" />
                    <span className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100 text-center">
                      {dictionary.apartment.features.kitchen}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-stone-700/50 backdrop-blur-sm">
                    <FaBed className="text-3xl sm:text-4xl text-stone-700 dark:text-stone-200 mb-2" />
                    <span className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100 text-center">
                      {dictionary.apartment.features.bedrooms}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-stone-700/50 backdrop-blur-sm">
                    <FaShower className="text-3xl sm:text-4xl text-stone-700 dark:text-stone-200 mb-2" />
                    <span className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100 text-center">
                      {dictionary.apartment.features.bathroom}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <a
                  href={airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#FF385C] hover:bg-[#E61E4D] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                >
                  <AirBnbIcon className="size-5" />
                  <span>{dictionary.header.bookButton}</span>
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </section>
            {imageData.map((image, index) => {
              const isHovered = hoveredIndex === index;
              const sizeClasses = {
                large: "sm:col-span-2 sm:row-span-2 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]",
                medium: "sm:col-span-1 sm:row-span-2 min-h-[300px] sm:min-h-[400px]",
                small: "sm:col-span-1 sm:row-span-1 min-h-[250px] sm:min-h-[300px]",
              };

              return (
                <div
                  key={index}
                  className={`bento-card group relative overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800 cursor-pointer transition-all duration-500 ${sizeClasses[image.size as keyof typeof sizeClasses]
                    } ${isHovered ? "scale-[1.02] shadow-2xl z-10" : "shadow-lg hover:shadow-xl"}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                      priority={index < 2}
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  </div>
                </div>
              );
            })}
            {/* Google Maps Widget */}
            <section className="bento-card group relative overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800 shadow-lg hover:shadow-xl transition-all duration-500 sm:col-span-1 sm:row-span-1 min-h-[250px] sm:min-h-[300px]">
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2580.1234567890!2d1.3664729!3d50.0607202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47de01001b26ef37%3A0x7367c73f257b292d!2sLes%20Mirabelles%20du%20Tr%C3%A8port!5e0!3m2!1sen!2sus!4v1736543212345!5m2!1sen!2sus`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  title="Location Map"
                />
              </div>
            </section>
          </article>

          {/* Description Section */}
          <section className="mt-12 text-center max-w-3xl mx-auto" aria-labelledby="description-heading">
            <h2 id="description-heading" className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mb-4">
              {dictionary.description.title}
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              {dictionary.description.text}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

