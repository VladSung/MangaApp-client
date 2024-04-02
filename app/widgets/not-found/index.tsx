'use client';
import { AppShellMain,Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Error } from '@/app/entities/error';
import { useTranslation } from '@/app/shared/lib/i18n/client';
import { PageProps } from '@/app/shared/types';

type Properties = PageProps;

export const NotFoundError = ({ params: { lng } }: Properties) => {
    const router = useRouter();
    const { t } = useTranslation(lng, 'common');

    const goBack = () => {
        router.back();
    };

    return (
        <AppShellMain>
            <Error
                errorCode={t('error.404.title')}
                message={t('error.404.description')}
            >
                <Button onClick={goBack} variant="contained">
                    {t('go-back')}
                </Button>
            </Error>
        </AppShellMain>
    );
};
