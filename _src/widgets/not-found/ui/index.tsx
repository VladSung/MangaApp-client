'use client';
import { Button } from '@mantine/core';
import { ErrorComponent } from '@src/entities/error';
import { PageProps } from '@src/shared/api/types';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export const NotFoundError = ({ params }: PageProps) => {
    const { lng } = use(params);
    const router = useRouter();
    const { t } = useTranslation(lng, 'common');

    const goBack = () => {
        router.back();
    };

    return (
        <ErrorComponent errorCode={t('error.404.title')} message={t('error.404.description')}>
            <Button onClick={goBack} variant="contained">
                {t('go-back')}
            </Button>
        </ErrorComponent>
    );
};
