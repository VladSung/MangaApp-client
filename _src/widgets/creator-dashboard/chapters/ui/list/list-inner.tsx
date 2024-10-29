'use client';
import { useMutation } from '@apollo/client';
import { ActionIcon, AppShellAside, AppShellSection, Button, Group } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ChaptersByComicIdQuery } from '@src/shared/api';
import { ChaptersList } from '@src/widgets/chapter';
import { IconEditCircle, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

import { deleteChapterMutation } from '../../api';
import classes from './styles.module.css';

export const ChaptersInner = ({ comicId, lng }: { lng: string; comicId: string }) => {
    const [opened, { toggle }] = useDisclosure();
    const smallerViewport = useMediaQuery('(max-width: 1200px)', true);

    const [deleteChapter] = useMutation(deleteChapterMutation);

    const deleteChapterHandler = (id: string) => {
        deleteChapter({
            variables: { id },
            update: (cache) => {
                cache.evict({ id: `Chapter:${id}` });
                cache.gc();
            },
        });
    };

    const children = (
        <AppShellSection miw={smallerViewport ? 'auto' : 480} py={32} pr={24}>
            {smallerViewport && (
                <Button onClick={toggle} hiddenFrom="lg" className={classes.button}>
                    Open chapters list
                </Button>
            )}
            <ChaptersList
                isDashboard
                lng={lng}
                comic={{ id: comicId }}
                Actions={({ chapterId }) => (
                    <Group gap="xs" wrap="nowrap">
                        <ActionIcon
                            component={Link}
                            href={`/dashboard/comic/${comicId}/${chapterId}`}
                            variant="light"
                            aria-label="edit chapter"
                        >
                            <IconEditCircle size={14} />
                        </ActionIcon>
                        <ActionIcon
                            onClick={() => deleteChapterHandler(chapterId)}
                            variant="light"
                            aria-label="delete chapter"
                        >
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Group>
                )}
            />
        </AppShellSection>
    );

    if (smallerViewport) {
        return (
            <AppShellAside
                style={{ transition: '280ms' }}
                className={`${classes.chapters} ${opened && classes.open}`}
            >
                {children}
            </AppShellAside>
        );
    }

    return children;
};
