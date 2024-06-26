import { Box, Button, Divider, Loader, Spoiler, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from "react";

import { useTranslation } from '@/app/shared/lib/i18n';

const CommentList = dynamic(() => import('@/app/widgets/comment/list'), { suspense: true })
const ChaptersList = dynamic(() => import('./chapter-list'), { suspense: true })

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

export const ComicContent = async ({ comic, lng }: ComicContentProps) => {


    const { t } = await useTranslation(lng, 'comic/id')

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
                <Suspense fallback={<Loader />}>
                    <ChaptersList lng={lng} comic={comic} />
                </Suspense>
            </TabsPanel>
            <TabsPanel value='comments'>
                <Suspense fallback={<Loader />}>
                    <CommentList comicId={comic.id} />
                </Suspense>
            </TabsPanel>
        </Tabs >
    );
};
