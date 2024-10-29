import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { fallbackLng, languages } from '@src/shared/lib/i18n/config';
import acceptLanguage from 'accept-language';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

acceptLanguage.languages(languages);

export const config = {
    // matcher: '/:lng*',
    matcher: [
        '/((?!api|_next/static|_error|_next/public|robots.txt|manifest.json|_next/image|assets|favicon.ico|sw.js).*)',
    ],
};

const authRequiredPaths: string[] = ['dashboard', 'profile', 'library'];

const cookieName = 'i18next';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let lng;

    if (req?.cookies?.has(cookieName)) {
        lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value);
    }

    if (!lng) {
        lng = acceptLanguage.get(req?.headers?.get('Accept-Language'));
    }

    if (!lng) {
        lng = fallbackLng;
    }

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => req.url.includes(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(
            new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl?.search}`, req.url)
        );
    }

    // Auth required paths
    for (const path of authRequiredPaths) {
        if (req.nextUrl.pathname?.startsWith(`/${lng}/${path}`)) {
            return withMiddlewareAuthRequired({ returnTo: req.nextUrl.pathname })(req, event);
        }
    }

    // Set the language cookie from the referer URL if it includes a supported language path
    // This is useful for preserving the language when navigating between pages
    // within the same language.
    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer')!);
        const lngInReferer = languages.find((l) => refererUrl.pathname.includes(`/${l}`));
        const response = NextResponse.next();

        // If the referer URL includes a supported language path, set the language cookie to that language.
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }

        return response;
    }

    return NextResponse.next();
}
