import { Metadata } from 'next';

import { useTranslation } from '@/app/shared/lib/i18n';
import { PageProps } from '@/app/shared/types';



export async function generateMetadata({ params: { lng } }: PageProps) {
    // const messages = (await import(`@/app/shared/i18n/${lng}/home.json`)).default;
    const { t } = await useTranslation(lng, 'index');

    return {
        title: t('title'),

        description: t('description'),
    } as Metadata;
}


export { Home as default } from './home';
