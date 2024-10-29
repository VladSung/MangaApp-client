'use client';
import { useMutation } from '@apollo/client';
import { ActionIcon, Button } from '@mantine/core';
import { BookmarkPayload, PredefinedBookmarkTitle } from '@src/shared/api';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';

import { addBookmarkMutation } from '../api';

type Props = {
    lng: string;
    comicId: string;
    bookmarkTitle: string;
    onMutationResult?: (payload?: BookmarkPayload | null) => void;
};

export const AddBookmark = ({ lng, comicId, bookmarkTitle, onMutationResult }: Props) => {
    const { t } = useTranslation(lng, 'comic/id');

    const [addToBookmark, { data, loading }] = useMutation(addBookmarkMutation, {
        errorPolicy: 'all',
    });

    if (!loading && onMutationResult) {
        onMutationResult(data?.bookmark?.add);
    }

    const addBookmarkHandler = () => {
        addToBookmark({
            variables: { input: { comicId, predefinedTitle: PredefinedBookmarkTitle.Reading } },
        });
    };

    return (
        <>
            <ActionIcon
                onClick={addBookmarkHandler}
                loading={loading}
                size="lg"
                hiddenFrom="xs"
                aria-label={t('add-bookmark')}
            >
                {data?.bookmark?.add.record?.id ? (
                    <IconBookmarkFilled size={20} />
                ) : (
                    <IconBookmark size={20} />
                )}
            </ActionIcon>
            <Button
                onClick={addBookmarkHandler}
                loading={loading}
                visibleFrom="xs"
                mb={16}
                size="xs"
                leftSection={
                    data?.bookmark?.add.record?.id ? (
                        <IconBookmarkFilled size={20} />
                    ) : (
                        <IconBookmark size={20} />
                    )
                }
                variant="default"
                fullWidth
            >
                {t('add-bookmark')}
            </Button>
        </>
    );
};
