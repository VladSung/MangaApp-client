import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from './app/shared/lib/i18n/settings';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

acceptLanguage.languages(languages);

export const config = {
    // matcher: '/:lng*',
    matcher: ['/((?!api|_next/static|_error|_next/public|_next/image|assets|favicon.ico|sw.js).*)'],
};

const cookieName = 'i18next';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let lng;
    if (req?.cookies?.has(cookieName))
        lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value);
    if (!lng) lng = acceptLanguage.get(req?.headers?.get('Accept-Language'));
    if (!lng) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => req.url.includes(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(
            new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl?.search}`, req.url)
        );
    }

    if (req.nextUrl.pathname?.startsWith(`/${lng}/dashboard`)) {
        return withMiddlewareAuthRequired({ returnTo: req.nextUrl.pathname })(req, event);
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer')!);
        const lngInReferer = languages.find((l) => refererUrl.pathname.includes(`/${l}`));
        const response = NextResponse.next();
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next();
}
