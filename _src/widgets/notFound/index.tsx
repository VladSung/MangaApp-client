// @module
'use client';
import { Button, SxProps, Theme } from '@mui/material';
import { Error } from '@/_src/entities/Error';

import { useTranslation } from '@/_src/shared/lib/i18n/client';
import { PageProps } from '@/_src/shared/types';
import { useRouter } from 'next/navigation';

type Properties = PageProps & {
    sx?: SxProps<Theme>;
};

export const NotFoundError = ({ sx, params: { lng } }: Properties) => {
    const router = useRouter();
    const { t } = useTranslation(lng, 'common');
    return (
        <Error
            sx={{ ...sx, fontWeight: '700' }}
            errorCode={t('error.404.title')}
            message={t('error.404.description')}
        >
            <Button onClick={router.back} variant="contained">
                {t('go-back')}
            </Button>
        </Error>
    );
};
