'use client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    ActionIcon,
    AppShellMain,
    Container,
    Group,
    Paper,
    RingProgress,
    SimpleGrid,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Text,
} from '@mantine/core';
import { PredefinedBookmarkTitle } from '@src/shared/api';
import { IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { meBookmarksQuery } from '../api';

type ReadingProgressProps = {
    title: string;
    volume?: number;
    chapter?: number;
    progress: number;
    cover: string;
    id: string;
};

const ReadingProgress = ({
    title,
    id,
    cover,
    volume = 1,
    chapter = 1,
    progress,
}: ReadingProgressProps) => {
    return (
        <Paper withBorder p="xs" component={Link} href={`/comic/${id}`}>
            <Group wrap="nowrap" gap="xs">
                <Image
                    style={{ objectFit: 'cover', borderRadius: 'var(--mantine-radius-md)' }}
                    src={cover}
                    alt={title}
                    width={64}
                    height={90}
                />
                <div>
                    <Text size="sm" fw={500}>
                        {title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {`Том ${volume} - Глава ${chapter}`}
                    </Text>
                    <Group wrap="nowrap" gap="xs">
                        <RingProgress
                            size={24}
                            sections={[
                                { value: progress, color: 'var(--mantine-color-primary-filled)' },
                            ]}
                        />
                        <Text size="xs" c="dimmed">
                            {`Глава: ${progress}%`}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Paper>
    );
};

type LibraryProps = {
    id: string;
    title: string;
    volume: number;
    chapter: number;
    progress: number;
};

export const LibraryPage = () => {
    const { data } = useSuspenseQuery(meBookmarksQuery);

    const bookmarks = data.user.me?.bookmarks?.edges;
    console.log(bookmarks);

    return (
        <AppShellMain>
            <Container pt="lg">
                <Tabs defaultValue={bookmarks?.[0].node.id} variant="pills">
                    <Group wrap="nowrap" align="flex-start">
                        <TabsList mb="md">
                            {bookmarks?.map(({ node }) => (
                                <TabsTab
                                    size="sm"
                                    style={{ textTransform: 'capitalize' }}
                                    key={node.id}
                                    value={node.id}
                                >
                                    {node.title}
                                </TabsTab>
                            ))}
                        </TabsList>
                        <ActionIcon
                            variant="light"
                            ml="auto"
                            aria-label="Tabs settings"
                            size="md"
                            mb="sm"
                        >
                            <IconSettings />
                        </ActionIcon>
                    </Group>
                    {bookmarks?.map(({ node }) => {
                        if (!node.comics) {
return null;
}

                        return (
                            <TabsPanel key={node.id} value={node.id}>
                                <SimpleGrid
                                    cols={{ base: 1, sm: 2, lg: 3 }}
                                    spacing="sm"
                                    verticalSpacing="sm"
                                >
                                    {node.comics.map(
                                        (comic) =>
                                            comic && (
                                                <ReadingProgress
                                                    id={comic.id}
                                                    key={comic?.title}
                                                    title={comic?.title}
                                                    volume={comic?.lastReadChapter?.volume}
                                                    chapter={comic?.lastReadChapter?.number}
                                                    cover={comic?.cover}
                                                    progress={0}
                                                />
                                            )
                                    )}
                                </SimpleGrid>
                            </TabsPanel>
                        );
                    })}
                </Tabs>
            </Container>
        </AppShellMain>
    );
};
