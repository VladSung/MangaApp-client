import { Box, Button, Tabs, List, Text, Title, Group, TextInput, Stack, ActionIcon } from '@mantine/core';
import { IconEye, IconSortAscendingNumbers } from '@tabler/icons-react';
import Link from 'next/link';
import { Comment } from '@/app/entities/comment';
import { graphql } from '@/app/shared/api/graphql';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Avatar } from '@/app/shared/ui/Avatar';
import { dayjsRelativeTime } from '@/app/shared/api/dayjs';

const getCommentsQuery = graphql(`
    query CommentsByComic($comicId:ID!){
        commentsByComic(comicId:$comicId){
            count
            comments{
                createdAt
                content
                id
                _count{
                    replies
                }
                author{
                    id
                    avatar
                    username
                }
            }
        }
    }
`)

export const ComicContent = ({
    comic,
    comicId,
}: {
    comicId: string;
    comic: {
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
}) => {
    const { data: commentsData } = useQuery(getCommentsQuery, { variables: { comicId } })
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
                    Список глав
                </Tabs.Tab>
                <Tabs.Tab
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value='comments'
                >Комментарии</Tabs.Tab>

            </Tabs.List>
            <Tabs.Panel value='chapters' py={24}>
                <Group mb={16} align='center'>
                    <Title order={3}>Главы</Title>
                    <Button ml='auto' variant='transparent' rightSection={<IconSortAscendingNumbers size={18} />} size='sm' radius='sm' aria-label='по возрастанию'>
                        По возрастанию
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
                            href={`${comicId}/ch/${ch.volume}/${ch.number}`}
                            leftSection={<IconEye size={18} />}
                            rightSection={<span>{ch.createdAt && dayjsRelativeTime().to(ch.createdAt)}</span>}
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
                {!comic.chapters && <Text>Публикация начнется</Text>}
            </Tabs.Panel>
            <Tabs.Panel value='comments'>
                <Title order={2} mt={24} mb={8} size='h4'>{commentsData?.commentsByComic?.count} comments</Title>
                <Stack gap={16}>
                    <Group align='flex-start'>
                        {/* ! Fix this */}
                        <Avatar src='' size='md' alt='' style={{ alignSelf: 'flex-start' }} />
                        <Stack style={{ flexGrow: 1 }}>
                            <TextInput placeholder='Введите комментарий' />
                        </Stack>
                    </Group>
                    {commentsData?.commentsByComic?.comments?.map(c => (<Comment depth={0} key={c.id} comment={c} />))}
                </Stack>
            </Tabs.Panel>
        </Tabs >
    );
};
