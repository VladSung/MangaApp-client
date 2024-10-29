import { ComicInfoQuery } from '@src/shared/api';

export type ComicPageProps = {
    comic: ComicInfoQuery;
    t: (key: string | string[]) => string;
    params: Promise<{
        id: string;
        lng: string;
    }>;
};
