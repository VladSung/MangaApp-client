import { Box } from '@mui/material';
import { useTranslation } from '@/_src/shared/lib/i18n';
import { PageProps } from '@/_src/shared/types';
import { Metadata } from 'next';

export async function generateMetadata({ params: { lng } }: PageProps) {
    // const messages = (await import(`@/_src/shared/i18n/${lng}/home.json`)).default;
    const { t } = await useTranslation(lng, 'index');
    return {
        title: t('title'),
        description: t('description'),
    } as Metadata;
}

const Home = async ({ params: { lng } }: PageProps) => {
    const { t } = await useTranslation(lng, 'index');
    return <Box>{t('title')}</Box>;
};

export default Home;
