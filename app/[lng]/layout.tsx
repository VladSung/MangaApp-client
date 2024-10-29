import { PageProps } from '@src/shared/api/types';
import { fetchTranslation } from '@src/shared/lib/i18n';

export { RootLayout as default } from '@src/app/layout/layout';

const languages = ['en', 'ru'];

export async function generateMetadata({ params }: PageProps) {
    const { lng } = await params;
    const { t } = await fetchTranslation(lng, 'index');

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
    colorScheme: 'dark',
};

export function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}
