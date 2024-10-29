'use client';
import { useMutation } from '@apollo/client';
import { ActionIcon, Button } from '@mantine/core';
import { BookmarkPayload } from '@src/shared/api';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { IconBookmarkFilled } from '@tabler/icons-react';

import { deleteBookmarkMutation } from '../api';

type Props = {
    lng: string;
    bookmarkId: string;
    onMutationResult: (payload?: BookmarkPayload | null) => void;
};

export const DeleteBookmark = ({ lng, bookmarkId, onMutationResult }: Props) => {
    const { t } = useTranslation(lng, 'comic/id');

    const [deleteBookmark, { data, loading }] = useMutation(deleteBookmarkMutation, {
        errorPolicy: 'all',
    });

    if (!loading) {
        onMutationResult(data?.bookmark?.delete);
    }

    const deleteBookmarkHandler = () => {
        deleteBookmark({ variables: { id: bookmarkId } });
    };

    return (
        <>
            <ActionIcon
                onClick={deleteBookmarkHandler}
                loading={loading}
                size="lg"
                hiddenFrom="xs"
                aria-label={t('delete-bookmark')}
            >
                <IconBookmarkFilled size={20} />
            </ActionIcon>
            <Button
                onClick={deleteBookmarkHandler}
                loading={loading}
                visibleFrom="xs"
                mb={16}
                size="xs"
                leftSection={<IconBookmarkFilled size={20} />}
                variant="default"
                fullWidth
            >
                {t('delete-bookmark')}
            </Button>
        </>
    );
};
