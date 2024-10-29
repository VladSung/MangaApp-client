import { QueryReference } from '@apollo/client';
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Stack, Text } from '@mantine/core';
import { ComicListItem } from '@src/entities/comic';
import { ErrorComponent } from '@src/entities/error';
import { Exact, SearchComicsBySearchTextQuery } from '@src/shared/api';

export const SearchComicList = ({
    queryRef,
    onClose,
}: {
    queryRef: QueryReference<
        SearchComicsBySearchTextQuery | undefined,
        Exact<{
            search: string;
        }>
    >;
    onClose: () => void;
}) => {
    const { data, error } = useReadQuery(queryRef);

    return (
        <>
            {error && <ErrorComponent message={error.message} errorCode={error.name} />}
            {Boolean(data?.comic?.all.pageInfo.totalCount) || <Text ta="center">No results</Text>}
            {data?.comic?.all.edges?.map(
                ({ node: comic }) =>
                    comic && (
                        <ComicListItem
                            onClick={onClose}
                            key={comic?.id}
                            href={`/comic/${comic?.id}`}
                            data={{ ...comic, subtitle: comic.alternativeTitles }}
                        />
                    )
            )}
        </>
    );
};
