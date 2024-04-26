import { GetComicPageQuery } from '@src/shared/api/graphql';

export type ComicPageProps = {
    comic: GetComicPageQuery;
    t: (key: string | string[]) => string;
    params: {
        id: string;
        lng: string;
    };
};
