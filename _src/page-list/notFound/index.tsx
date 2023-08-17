import { useTranslation } from '@/_src/shared/lib/i18n';
import { PageProps } from '@/_src/shared/types';
import { NotFoundError } from '@/_src/widgets/notFound';
import { Box, CardMedia, Link, Typography } from '@mui/material';

export const NotFoundPage = async ({ params }: PageProps) => {
    const { t } = await useTranslation(params.lng, 'common');
    return (
        <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
            <NotFoundError
                params={params}
                sx={{ ml: 3, display: 'flex', width: '50%', justifyContent: 'center' }}
            />
            <CardMedia
                component="img"
                sx={{ objectFit: 'contain', width: '320px', alignSelf: 'end' }}
                image="/assets/Alice.png"
                alt="Alice - site character"
            />
            <Typography sx={{ alignSelf: 'end', mb: 2, mr: 3 }}>
                {t('art-by')}:
                <Link href="https://vk.com/riminaru_kun_artworks" component={'a'}>
                    riminaru_kun
                </Link>
            </Typography>
        </Box>
    );
};
