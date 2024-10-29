import { ComicInfoQuery, PageProps } from '@src/shared/api';

export type ComicPageProps = {
    comic: ComicInfoQuery;
    t: (key: string | string[]) => string;
} & PageProps<{
    id: string;
}>;
