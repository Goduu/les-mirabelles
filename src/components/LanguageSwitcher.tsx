"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locale";
import { locales } from "@/i18n/locale";

interface LanguageSwitcherProps {
    currentLang: Locale;
    dictionary: {
        languageSwitcher: {
            current: string;
            switchTo: string;
        };
    };
}

const languageNames: Record<Locale, string> = {
    fr: "Français",
    en: "English",
    de: "Deutsch",
    nl: "Nederlands",
};

export default function LanguageSwitcher({ currentLang, dictionary }: LanguageSwitcherProps) {
    const pathname = usePathname();

    // Remove current locale from pathname to get the base path
    const basePath = pathname.replace(`/${currentLang}`, "") || "/";

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                {locales.map((locale) => (
                    <Link
                        key={locale}
                        href={`/${locale}${basePath}`}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${locale === currentLang
                            ? "bg-stone-600 text-white shadow-md"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                            }`}
                        aria-label={`${dictionary.languageSwitcher.switchTo} ${languageNames[locale]}`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                ))}
            </div>
        </div>
    );
}

