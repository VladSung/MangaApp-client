import { chaptersByComicIdQuery } from '@src/entities/chapter';
import { OrderBy } from '@src/shared/api';
import { getClient } from '@src/shared/lib/apollo/client';

import { ChaptersInner } from './list-inner';

export const Chapters = async ({ comicId, lng }: { lng: string; comicId: string }) => {
    const { data } = await getClient().query({
        query: chaptersByComicIdQuery,
        variables: { id: comicId, sort: OrderBy.Desc, paginate: { first: 10 } },
    });

    return <ChaptersInner lng={lng} comicId={comicId} />;
};
