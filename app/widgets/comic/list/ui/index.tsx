import { ComicCard } from '@/app/entities/comic';

import { ComicCardListQuery } from './types';

export const List = ({ data, loading }: ComicCardListQuery) => {
    if (loading) {
        return (
            <div>Loading</div>
        );
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 16, rowGap: 24 }}>
            {data?.comics?.map((m) =>
            (
                <ComicCard key={m.id} data={m} />
            )
            )}
        </div>
    );
};
