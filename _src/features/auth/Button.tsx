import { useTranslation } from '@/_src/shared/lib/i18n';
import { PageProps } from '@/_src/shared/types';
import MuiButton from '@mui/material/Button';

export const Button = async ({ params }: PageProps) => {
    const { t } = await useTranslation(params.lng, 'auth');
    return (
        <MuiButton size={'medium'} variant="outlined" href={'/api/auth/login'} component={'a'}>
            {t('log-in')}
        </MuiButton>
    );
};
