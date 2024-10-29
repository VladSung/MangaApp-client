import { PageProps } from '@src/shared/api/types';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps) {
    const params = await props.params;

    const {
        lng
    } = params;

    const { t } = await fetchTranslation(lng, 'index');

    return {
        title: t('title'),

        description: t('description'),
    } as Metadata;
}

export { /* @next-codemod-error `HomePage` export is re-exported. Check if this component uses `params` or `searchParams`*/
HomePage as default } from '@src/pages/home';
