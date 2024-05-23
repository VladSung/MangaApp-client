import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@src/pages/[lng]/global.css';

import { getSession } from '@auth0/nextjs-auth0';
import { AppShell, ColorSchemeScript, createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import { WithProviders } from '@src/app';
import { checkIsOnline } from '@src/shared/lib/checkIsOnline';
import { useTranslation } from '@src/shared/lib/i18n';
import { PageProps } from '@src/shared/types';
import Header from '@src/widgets/header';
import { MobileNavbar } from '@src/widgets/mobile-navbar';
import { dir } from 'i18next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { redirect } from 'next/navigation';
import { ScriptProps } from 'next/script';

import ErrorComponent from './error';

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

const primary: MantineColorsTuple = [
    '#ffecee',
    '#f7d7da',
    '#edadb3',
    '#e37f88',
    '#da5965',
    '#d7424e',
    '#d43542',
    '#bc2834',
    '#a9212d',
    '#941625'
];


const theme = createTheme({
    colors: { primary },
    defaultRadius: 'lg',
    primaryColor: 'primary',
    cursorType: 'pointer'
});


export default async function RootLayout({ children, params }: Props & ScriptProps) {

    const session = await getSession()

    console.log(session)
    if (session?.accessToken && (new Date((session?.accessTokenExpiresAt || 0) * 1000)).getTime() < Date.now()) {
        try {
            const isOnline = await checkIsOnline();

            if (isOnline) {
                redirect('/api/auth/logout');
            }
        } catch (error) {
            console.log(error)
        }
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
                                <ErrorBoundary errorComponent={ErrorComponent}>
                                    {children}
                                </ErrorBoundary>
                                <MobileNavbar lng={params.lng} />
                            </WithProviders>
                        </ErrorBoundary>
                    </AppShell>
                </MantineProvider>
            </body>
        </html>
    );

}
