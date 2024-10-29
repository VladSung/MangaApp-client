'use client';
import { useQuery } from '@apollo/client';
import {
    ActionIcon,
    Button,
    Center,
    Group,
    Loader,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
} from '@mantine/core';
import { chaptersByComicIdQuery } from '@src/entities/chapter';
import { OrderBy } from '@src/shared/api';
import { useTranslation } from '@src/shared/lib/i18n/client';
import {
    IconCalendar,
    IconEye,
    IconEyeClosed,
    IconReload,
    IconSortAscendingNumbers,
    IconSortDescendingNumbers,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { FixedSizeList } from 'react-window';

export const NoChaptersPublished = ({ lng, startDate }: { lng: string; startDate?: string }) => {
    const { t } = useTranslation(lng, 'comic/id');

    return (
        <Stack gap="md">
            <Group justify="flex-start" align="center">
                <Text fw={700} size="lg">
                    {t('publish-not-started')}
                </Text>
                <ThemeIcon size="lg" variant="light" color="blue">
                    <IconCalendar size={20} />
                </ThemeIcon>
            </Group>

            {startDate && `${t('expected-start-date')}:${dayjs(startDate).format('DD/MM/YYYY')}`}
        </Stack>
    );
};

export const ChaptersList = ({
    comic,
    activeChapter,
    lng,
    isDashboard,
    Actions,
    withBorder = true,
}: {
    lng: string;
    Actions?: ({ chapterId }: { chapterId: string }) => React.ReactNode;
    activeChapter?: number;
    isDashboard?: boolean;
    withBorder?: boolean;
    comic: { id: string };
}) => {
    const { t } = useTranslation(lng, 'comic/id');
    const [sortOrder, setSortOrder] = useState<'Asc' | 'Desc'>('Desc');

    const { data, loading, refetch } = useQuery(chaptersByComicIdQuery, {
        variables: {
            id: comic.id,
            sort: OrderBy[sortOrder],
            paginate: {
                first: null,
            },
        },
        nextFetchPolicy: 'cache-and-network',
    });

    return (
        <Paper shadow="sm" p={withBorder ? 'md' : 0} withBorder={withBorder}>
            <Group gap="xs" mb="md">
                <Title order={4}>{`Главы (${data?.chapter?.all?.pageInfo.totalCount || 0})`}</Title>
                {isDashboard && (
                    <Button
                        size="compact-sm"
                        component={Link}
                        href={`/dashboard/comic/${comic.id}/ch-new`}
                    >
                        Add new
                    </Button>
                )}
                {(Boolean(data?.chapter?.all?.pageInfo.totalCount) || loading) && (
                    <Group ml="auto" align="center" gap="md">
                        <Button
                            variant="light"
                            size="compact-xs"
                            onClick={() =>
                                setSortOrder((prev) => (prev === 'Asc' ? 'Desc' : 'Asc'))
                            }
                            rightSection={
                                sortOrder === 'Asc' ? (
                                    <IconSortAscendingNumbers size={18} />
                                ) : (
                                    <IconSortDescendingNumbers size={18} />
                                )
                            }
                        >
                            {sortOrder === 'Asc'
                                ? t('chapter-sort.ascending')
                                : t('chapter-sort.descending')}
                        </Button>
                        <ActionIcon
                            aria-label="refetch chapters"
                            title="refetch chapters"
                            onClick={() => refetch()}
                            variant="light"
                        >
                            <IconReload size={18} />
                        </ActionIcon>
                    </Group>
                )}
            </Group>
            {loading && (
                <Center>
                    <Loader variant="bars" />
                </Center>
            )}
            {!loading && data?.chapter?.all?.edges && data?.chapter?.all?.pageInfo.totalCount && (
                <FixedSizeList
                    itemSize={35}
                    width={'100%'}
                    height={334}
                    itemCount={data?.chapter?.all?.pageInfo.totalCount}
                    itemData={data?.chapter?.all?.edges}
                >
                    {({ style, data, index }) => {
                        const chapter = data[index].node;

                        return (
                            <Group wrap="nowrap" key={chapter?.id} style={style}>
                                <Button
                                    fullWidth
                                    variant={activeChapter === chapter.number ? 'light' : 'subtle'}
                                    color={
                                        activeChapter === chapter.number
                                            ? undefined
                                            : 'var(--mantine-color-text)'
                                    }
                                    leftSection={
                                        chapter?.usersReadHistory?.id ? (
                                            <IconEye size={16} />
                                        ) : (
                                            <IconEyeClosed size={16} />
                                        )
                                    }
                                    size="sm"
                                    justify="flex-start"
                                    component={Link}
                                    href={`/comic/${comic.id}/ch/${chapter.volume}/${chapter.number}`}
                                >
                                    <Group wrap="nowrap">
                                        <Text>{`${chapter.volume} - ${chapter.number}.`}</Text>
                                        {chapter.title && (
                                            <Text component="span">{chapter.title}</Text>
                                        )}
                                        {chapter?.publishDate && (
                                            <Tooltip
                                                label={dayjs(chapter.publishDate).format(
                                                    'YYYY-MM-DD HH:mm'
                                                )}
                                            >
                                                <Text size="xs" c="dimmed">
                                                    {dayjs().to(chapter.publishDate)}
                                                </Text>
                                            </Tooltip>
                                        )}
                                    </Group>
                                </Button>
                                {typeof Actions === 'function' && (
                                    <Actions chapterId={chapter.id} />
                                )}
                            </Group>
                        );
                    }}
                </FixedSizeList>
            )}
            {!(loading || data?.chapter?.all?.pageInfo.totalCount) && (
                <NoChaptersPublished lng={lng} startDate={new Date().toDateString()} />
            )}
        </Paper>
    );
};

// NoChaptersPublished компонент остается без изменений
