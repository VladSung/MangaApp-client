import { MangaCard } from '@/_src/entities/manga';

import { MangaCardListQuery } from './types';
import { Skeleton } from '@mui/material';

export const List = ({ data, loading }: MangaCardListQuery) => {
    if (loading) return <Skeleton />;

    return (
        <>
            {data?.mangas?.map((m) => (
                <MangaCard data={m} />
            ))}
        </>
    );
};
