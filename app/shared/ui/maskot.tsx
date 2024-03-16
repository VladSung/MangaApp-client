'use client';

import { useTranslation } from '@/app/shared/lib/i18n/client';

import { PageProps } from '../types';

const Maskot = ({ params: { lng } }: PageProps) => {
    const { t } = useTranslation(lng, 'common');

    return (
        <>
            {/* <CardMedia
                component="img"
                sx={{ objectFit: 'contain', width: '320px', alignSelf: 'end' }}
                image="/assets/Alice.png"
                alt="Alice - site character"
            /> */}
            {/* <Typography sx={{ alignSelf: 'end', mb: 2, mr: 3 }}>
                {t('art-by')}:
                <Link href="https://vk.com/riminaru_kun_artworks" component={'a'}>
                    riminaru_kun
                </Link>
            </Typography> */}
        </>
    );
};

export default Maskot;
