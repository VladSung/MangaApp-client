import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@src/pages/[lng]/global.css';

import { getSession } from '@auth0/nextjs-auth0';
import { AppShell, ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import { dir } from 'i18next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { redirect } from 'next/navigation';
import { ScriptProps } from 'next/script';

import { WithProviders } from '@src/app';
import { useTranslation } from '@src/shared/lib/i18n';
import { PageProps } from '@src/shared/types';
import Header from '@src/widgets/header';

import ErrorComponent from './error';
import { MobileNavbar } from '@src/widgets/mobile-navbar';

type Props = {
    token?: string;

    params: { lng: string };
};
const languages = ['en', 'ru'];

export async function generateMetadata({ params: { lng } }: PageProps) {
    const { t } = await useTranslation(lng, 'index');

    return {
        metadataBase: new URL('http://localhost:3000/'),
        manifest: '/manifest.json',
        title: {
            default: `${t('title')} | RedAlopex`,
            template: '%s | RedAlopex',
        },
        description: t('description'),
        applicationName: 'RedAlopex',
        alternates: {
            canonical: '/en',
            languages: { en: [{ url: `/en` }], ru: [{ url: `/ru` }] },
        },
    };
}

export const viewport = {
    colorScheme: 'dark'
}


export function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const theme = createTheme({
    defaultRadius: 'lg',
    primaryColor: 'pink',
    cursorType: 'pointer'
});


export default async function RootLayout({ children, params }: Props & ScriptProps) {

    const session = await getSession()


    if (session?.accessToken && (new Date((session?.accessTokenExpiresAt || 0) * 1000)).getTime() < Date.now()) {
        redirect('/api/auth/logout')
    }

    return (
        <html lang={params.lng} dir={dir(params.lng)}>
            <head>
                <ColorSchemeScript />
                <link rel="icon" href="/assets/favicon.ico" sizes="any" />
            </head>
            <body>
                <MantineProvider defaultColorScheme='auto' theme={theme}>
                    <AppShell header={{ height: 60 }}>
                        <ErrorBoundary errorComponent={ErrorComponent}>
                            <WithProviders token={session?.accessToken}>
                                <Notifications />
                                <Header lng={params.lng} />
                                {children}
                                <MobileNavbar lng={params.lng} />
                            </WithProviders>
                        </ErrorBoundary>
                    </AppShell>
                </MantineProvider>
            </body>
        </html>
    );

}
