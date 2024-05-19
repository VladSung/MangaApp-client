'use client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Box, Stack, Title, Text, Loader } from '@mantine/core';

import { Comment } from '@src/entities/comment';

import { Add } from './add';
import { getComicCommentsQuery, getChapterCommentsQuery } from './api/queries';
import CommentMenu from './menu';
import Replies from './replies';

const List = ({ comicId, chapterId }: { comicId: string, chapterId?: string }) => {

    if (chapterId) {
        const { data: commentsData, loading } = useQuery(getChapterCommentsQuery, { variables: { id: chapterId } })

        return (
            <Box mih={180}>
                <Title order={2} mt={24} mb={8} size='h4'>{commentsData?.commentsByChapter?.count || 0} comments</Title>
                <Stack gap='md'>
                    <Add comicId={comicId} chapterId={chapterId} />
                    {loading
                        ? <Loader />
                        : commentsData?.commentsByChapter?.comments
                            ? commentsData?.commentsByChapter?.comments?.map(c => (<Comment Menu={CommentMenu} comicId={comicId!} AddReplyWidget={Add} Replies={Replies} depth={0} key={c.id} comment={c} />))
                            : <Text>Нет ни одного комментария</Text>
                    }
                </Stack>
            </Box>
        )
    }
    const { data: commentsData } = useQuery(chapterId ? getChapterCommentsQuery : getComicCommentsQuery, { variables: { id: chapterId ?? comicId } })

    return (
        <Box mih={180}>
            <Title order={2} mt={24} mb={8} size='h4'>{commentsData?.commentsByComic?.count || 0} comments</Title>
            <Stack gap='md'>
                <Add comicId={comicId} chapterId={chapterId} />
                {!commentsData?.commentsByComic?.comments && <Box>
                    <Text>Нет ни одного комментария</Text>
                </Box>}
                {commentsData?.commentsByComic?.comments?.map(c => (<Comment Menu={CommentMenu} comicId={comicId!} AddReplyWidget={Add} Replies={Replies} depth={0} key={c.id} comment={c} />))}
            </Stack>
        </Box>
    )
}

export default List
