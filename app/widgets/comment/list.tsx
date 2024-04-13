'use client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Stack, Title } from '@mantine/core';

import { Comment } from '@/app/entities/comment';

import { Add } from './add';
import { getCommentsQuery } from './api/queries';
import CommentMenu from './menu';
import Replies from './replies';

const List = ({ comicId }: { comicId: string }) => {
    const { data: commentsData } = useQuery(getCommentsQuery, { variables: { comicId } })

    return (
        <>
            <Title order={2} mt={24} mb={8} size='h4'>{commentsData?.commentsByComic?.count} comments</Title>
            <Stack gap={16}>
                <Add comicId={comicId} />
                {commentsData?.commentsByComic?.comments?.map(c => (<Comment Menu={CommentMenu} comicId={comicId} AddReplyWidget={Add} Replies={Replies} depth={0} key={c.id} comment={c} />))}
            </Stack>
        </>
    )
}

export default List
