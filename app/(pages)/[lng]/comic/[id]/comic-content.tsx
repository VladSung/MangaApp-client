'use client'
import { useQuery } from '@apollo/client';
import { Box, Button, Center, Divider, Group, Loader, Spoiler, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core';
import { IconEye, IconEyeClosed, IconSortAscendingNumbers, IconSortDescendingNumbers } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense, useState } from "react";

import { dayjsRelativeTime } from '@/app/shared/api/dayjs';
import { OrderBy } from '@/app/shared/api/graphql';
import { getComicChapters } from '@/app/shared/api/queries';
import { useTranslation } from '@/app/shared/lib/i18n/client';
import dynamic from 'next/dynamic';

const CommentList = dynamic(() => import('@/app/widgets/comment/list'), { suspense: true })

type ComicContentProps = {
    lng: string
    comic: {
        id: string;
        description?: string | null;
        genres?: { id: number; title: string }[] | null;
        tags?: { id: number; title: string }[] | null;
        chapters?:
        | {
            createdAt: string | null;
            id: string | null;
            number: number | null;
            volume: number | null;
            title?: string | null;
            usersReadHistory?: {
                id: string | null;
            } | null,
        }[]
        | null;
    };
};

export const ComicContent = ({ comic, lng }: ComicContentProps) => {

    const [sortOrder, setSortOrder] = useState<"Asc" | "Desc">('Desc')

    const chaptersData = useQuery(getComicChapters, {
        variables: {
            comicId: comic.id, order: OrderBy[sortOrder], paginate: {
                take: 10,
            }
        }
    })

    const { t } = useTranslation(lng, 'comic/id')

    return (
        <Tabs defaultValue='chapters' style={{ width: '100%' }}>
            <Divider mb='sm' />
            <Box pb='lg'>
                <Spoiler maxHeight={96} showLabel="Show more" hideLabel="Hide">
                    <Text component='pre' style={{ textWrap: 'balance', whiteSpace: 'pre-wrap', fontFamily: 'var(--mantine-font-family)' }}>{comic.description}</Text>
                </Spoiler>
            </Box>
            <Box mb='md'>
                {comic.genres?.map((g) => (
                    <Button
                        key={g.id}
                        href={`/comic?genre=${g.id}`}
                        size='compact-xs'
                        component={Link}
                        style={{ cursor: 'pointer', margin: 4 }}
                        variant='default'
                    >{g.title}</Button>

                ))}
                {comic.tags?.map((g) => (
                    <Button
                        key={g.id}
                        href={`/comic?tag=${g.id}`}
                        size='compact-xs'
                        component={Link}
                        style={{ cursor: 'pointer', margin: 4 }}
                        variant='default'
                    >{g.title}</Button>

                ))}
            </Box>

            <TabsList defaultValue='chapters'>
                <TabsTab
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value='chapters'
                >
                    {t('chapter-list')}
                </TabsTab>
                <TabsTab
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value='comments'
                >
                    {t('comments')}
                </TabsTab>

            </TabsList>
            <TabsPanel value='chapters' py='xs'>
                {!!chaptersData.data?.chapters?.length && <Group mb={16} align='center'>
                    <Button variant='transparent' onClick={() => setSortOrder((prev) => prev === 'Asc' ? 'Desc' : 'Asc')} rightSection={sortOrder === 'Asc' ? <IconSortAscendingNumbers size={18} /> : <IconSortDescendingNumbers size={18} />} size='sm' radius='sm'>
                        {sortOrder === "Asc" ? t('chapter-sort.ascending') : t('chapter-sort.descending')}
                    </Button>
                </Group>}
                {chaptersData.loading && <Center><Loader variant='bars' /></Center>}
                {chaptersData.data?.chapters?.map((ch) => (
                    <Box mb={8} key={ch.id}>
                        <Button
                            size='sm'
                            variant='default'
                            radius='sm'
                            styles={
                                {

                                    label: {
                                        flexGrow: 1
                                    }
                                }
                            }
                            justify='space-between'
                            component={Link}
                            fullWidth
                            href={`${comic.id}/ch/${ch.volume}/${ch.number}`}
                            leftSection={ch?.usersReadHistory?.id ? <IconEye size={18} /> : <IconEyeClosed size={18} />}
                            rightSection={<span>{ch.createdAt && dayjsRelativeTime().to(ch.createdAt as string)}</span>}
                        >
                            <Text>
                                <span style={{ marginRight: '8px' }}>
                                    {ch.volume} - {ch.number}
                                </span>
                                <span>{ch.title}</span>

                            </Text>
                        </Button>
                    </Box>
                ))}
                {!chaptersData.loading && !chaptersData.data?.chapters?.length && <Text>{t('publish-not-started')}</Text>}
            </TabsPanel>
            <TabsPanel value='comments'>
                <Suspense fallback={<Loader />}>
                    <CommentList comicId={comic.id} />
                </Suspense>
            </TabsPanel>
        </Tabs >
    );
};
