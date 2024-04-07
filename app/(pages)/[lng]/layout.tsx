import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import './global.css';

import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { AppShell, ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import { dir } from 'i18next';
import { ScriptProps } from 'next/script';

import { WithProviders } from '@/app/_providers';
import { useTranslation } from '@/app/shared/lib/i18n';
import { PageProps } from '@/app/shared/types';
import Header from '@/app/widgets/header';
import { redirect } from 'next/navigation';

type Props = {
    token?: string;

    params: { lng: string };
};
const languages = ['en', 'ru'];

export async function generateMetadata({ params: { lng } }: PageProps) {
    const { t } = await useTranslation(lng, 'index');

    return {
        metadataBase: new URL('http://localhost:3000/'),
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


    if (session?.accessToken && (new Date((session?.accessTokenExpiresAt || 0) * 1000)).getTime() < (new Date()).getTime()) {
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
                    <Notifications />
                    <WithProviders token={session?.accessToken}>
                        <AppShell header={{ height: 60 }}>
                            <Header lng={params.lng} />
                            {children}
                        </AppShell>
                    </WithProviders>
                </MantineProvider>
            </body>
        </html>
    );

}
