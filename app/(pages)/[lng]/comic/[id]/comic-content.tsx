import { Box, Button, Tabs, Text, Title, Group } from '@mantine/core';
import { IconEye, IconSortAscendingNumbers } from '@tabler/icons-react';
import Link from 'next/link';
import { dayjsRelativeTime } from '@/app/shared/api/dayjs';
import { CommentList } from '@/app/widgets/comment';

type ComicContentProps = {
    t: (key: string | string[]) => string
    comic: {
        id: string;
        description: string | null;
        genres: { id: number; title: string }[] | null;
        tags: { id: number; title: string }[] | null;
        chapters:
        | {
            createdAt: string | null;
            id: string | null;
            number: number | null;
            volume: number | null;
            title: string | null;
        }[]
        | null;
    };
};

export const ComicContent = ({ comic, t }: ComicContentProps) => {
    return (
        <Tabs defaultValue='chapters' style={{ width: '100%' }}>
            <Text component='pre' style={{ textWrap: 'balance', marginBottom: 2 * 8, whiteSpace: 'pre-wrap', fontFamily: 'var(--mantine-font-family)' }}>{comic.description}</Text>
            <Box style={{ marginBottom: 16 }}>
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

            <Tabs.List defaultValue='chapters'>
                <Tabs.Tab
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value='chapters'
                >
                    {t('chapter-list')}
                </Tabs.Tab>
                <Tabs.Tab
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value='comments'
                >
                    {t('comments')}
                </Tabs.Tab>

            </Tabs.List>
            <Tabs.Panel value='chapters' py={24}>
                <Group mb={16} align='center'>
                    <Title order={3}>{t('chapters')}</Title>
                    <Button ml='auto' variant='transparent' rightSection={<IconSortAscendingNumbers size={18} />} size='sm' radius='sm'>
                        {t('chapter-sort.ascending')}
                    </Button>
                </Group>
                {comic.chapters?.map((ch) => (
                    <Box mb={8} key={ch.id}>
                        <Button
                            size='sm'
                            variant='default'
                            radius='sm'
                            justify='flex-start'
                            component={Link}
                            fullWidth
                            href={`${comic.id}/ch/${ch.volume}/${ch.number}`}
                            leftSection={<IconEye size={18} />}
                            rightSection={<span style={{ marginLeft: 'auto' }}>{ch.createdAt && dayjsRelativeTime().to(ch.createdAt)}</span>}
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
                {!comic.chapters?.length && <Text>{t('publish-not-started')}</Text>}
            </Tabs.Panel>
            <Tabs.Panel value='comments'>
                <CommentList comicId={comic.id} />
            </Tabs.Panel>
        </Tabs >
    );
};
