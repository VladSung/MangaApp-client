'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Error } from '@src/entities/error';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { PageProps } from '@src/shared/types';

type Properties = PageProps;

export const NotFoundError = ({ params }: Properties) => {
    const router = useRouter();
    const { t } = useTranslation(params?.lng, 'common');

    const goBack = () => {
        router.back();
    };

    return (
        <Error
            errorCode={t('error.404.title')}
            message={t('error.404.description')}
        >
            <Button onClick={goBack} variant="contained">
                {t('go-back')}
            </Button>
        </Error>
    );
};
