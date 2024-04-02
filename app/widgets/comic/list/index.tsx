import { ComicCard } from '@/app/entities/comic';
import { getClient } from '@/app/shared/lib/apollo/client';

import { comicListQuery } from './api';
import { List } from './ui';

export const ComicList = async () => {
    const { data, loading } = await getClient().query({ query: comicListQuery });

    if (!data?.comics || loading) {
        return <div>laoding</div>
    }

    return <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 16, rowGap: 24 }}>
        {data.comics.map((m) =>
        (
            <ComicCard key={m?.id} data={m} />
        )
        )}
    </div>;
};
