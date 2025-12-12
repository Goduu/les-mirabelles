import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, getLocale } from './i18n/locale';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If pathname already has a locale, continue
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Get the preferred locale from the request
    const locale = getLocale(request);

    // Redirect to the locale-prefixed pathname
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|favicon.ico|.*\\..*).*)',
    ],
};

