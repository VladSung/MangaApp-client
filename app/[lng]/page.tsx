import { Metadata } from 'next';

import { useTranslation } from '@src/shared/lib/i18n';
import { PageProps } from '@src/shared/types';



export async function generateMetadata({ params: { lng } }: PageProps) {
    // const messages = (await import(`@src/shared/i18n/${lng}/home.json`)).default;
    const { t } = await useTranslation(lng, 'index');

    return {
        title: t('title'),

        description: t('description'),
    } as Metadata;
}

export { default } from "@src/pages/[lng]";