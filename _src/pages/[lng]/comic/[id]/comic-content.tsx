import { Avatar, Box, Button, Divider, Group, Spoiler, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

import { useTranslation } from '@src/shared/lib/i18n';
import { CommentList } from '@src/widgets/comment'
import ChaptersList from './chapter-list'
import classes from './styles.module.css'
import { Comic, Team, Chapter } from '@src/shared/api/graphql';
// const CommentList = dynamic(() => import('@src/widgets/comment/list'), { suspense: true })
// const ChaptersList = dynamic(() => import('./chapter-list'), { suspense: true })

type ComicContentProps = {
    lng: string;
    comic: Partial<Pick<Comic, 'description' | 'genres' | 'tags'>>
    & Partial<{
        team: Pick<Team, 'id' | 'name' | 'avatar'> | null,
        chapters: Pick<Chapter, 'createdAt' | 'id' | 'number' | 'volume' | 'title' | 'usersReadHistory'>
    }> & {
        id: string
    }

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
            <Box className={classes.creators} mb='md'>
                <Title order={2} size="h5" mb='sm'>
                    {t('creators')}
                </Title>
                <Stack>
                    {(
                        <UnstyledButton
                            className='mantine-active'
                            key={comic?.team?.id}
                            component={Link}
                            href={`/team/${comic?.team?.id}`}
                        >
                            <Group align="center" gap='xs'>
                                <Avatar src={comic?.team?.avatar} size='md' />
                                <div>
                                    <Text size='md'>{comic?.team?.name}</Text>
                                </div>
                            </Group>
                        </UnstyledButton>
                    )}
                </Stack>
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
                <ChaptersList lng={lng} comic={comic} />
            </TabsPanel>
            <TabsPanel value='comments'>
                <CommentList comicId={comic.id} />
            </TabsPanel>
        </Tabs >
    );
};
