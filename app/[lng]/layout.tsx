import './globals.css';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Header } from '@/_src/page-list/header';
import { WithProviders } from '../_providers';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { dir } from 'i18next';
import { ScriptProps } from 'next/script';
import { useTranslation } from '@/_src/shared/lib/i18n';
import { PageProps } from '@/_src/shared/types';

type Context = { req: NextApiRequest; res: NextApiResponse };

type Props = {
    token?: string;

    params: { lng: string };
};
const languages = ['en', 'ru'];

export async function generateMetadata({ params: { lng } }: PageProps) {
    const { t } = await useTranslation(lng, 'index');
    return {
        metadataBase: new URL('http://localhost:3000/'),
        title: `RedAlopex ${t('title')}`,
        description: t('description'),
        applicationName: 'RedAlopex',
        colorScheme: 'dark light',
        alternates: {
            canonical: '/en',
            languages: { en: [{ url: `/en` }], ru: [{ url: `/ru` }] },
        },
    };
}

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}
export async function getServerSideProps({ req, res }: Context) {
    const token = await getAccessToken(req, res, {
        scopes: ['openid', 'profile', 'email'],
    });
    console.log(token);
    return {
        props: {
            token: token?.accessToken,
        }, // Will be passed to the page component as props
    };
}

export default async function RootLayout({ children, token, params }: Props & ScriptProps) {
    const session = await getSession();
    return (
        <html lang={params.lng} dir={dir(params.lng)}>
            <body>
                <WithProviders token={token || session?.accessToken}>
                    <div id="app">
                        <Header params={params} />
                        {children}
                    </div>
                </WithProviders>
            </body>
        </html>
    );
}
