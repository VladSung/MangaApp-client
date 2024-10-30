import { useLoadableQuery } from '@apollo/client';
import { Input, Loader, Modal, ScrollAreaAutosize, Stack } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { SearchComicsBySearchTextQuery } from '@src/shared/api';
import { ChangeEvent, Suspense, useEffect } from 'react';

import { searchComicsBySearchTextQuery } from './api';
import { SearchComicList } from './list';

export const SearchComicByName = ({
    opened,
    onClose,
}: {
    opened: boolean;
    onClose: () => void;
}) => {
    const [searchText, setSearchText] = useDebouncedState('', 800);
    const [loadComics, queryRef] = useLoadableQuery<SearchComicsBySearchTextQuery>(
        searchComicsBySearchTextQuery,
        {
            errorPolicy: 'all',
        }
    );

    useEffect(() => {
        if (searchText.length > 2) {
            loadComics({ search: searchText });
        }
    }, [searchText]);

    return (
        <Modal
            title={'Search comic by name'}
            scrollAreaComponent={ScrollAreaAutosize}
            opened={opened}
            onClose={onClose}
            size="lg"
        >
            <Input
                mb="lg"
                placeholder="Please enter more than 2 characters to search"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchText(e.target.value.trim())
                }
            />

            <Suspense
                fallback={
                    <Stack align="center">
                        <Loader />
                    </Stack>
                }
            >
                {queryRef && <SearchComicList onClose={onClose} queryRef={queryRef} />}
            </Suspense>
        </Modal>
    );
};
