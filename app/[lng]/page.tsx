import { PageProps } from '@src/shared/api/types';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { Metadata } from 'next';

export async function generateMetadata({ params: { lng } }: PageProps) {
    const { t } = await fetchTranslation(lng, 'index');

    return {
        title: t('title'),

        description: t('description'),
    } as Metadata;
}

export { HomePage as default } from '@src/pages/home';
