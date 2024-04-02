import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon,Group, Stack, Textarea, Title } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';

import { Comment } from '@/app/entities/comment';
import { graphql } from '@/app/shared/api/graphql';
import { Avatar } from '@/app/shared/ui/Avatar';

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

export const List = ({ comicId }: { comicId: string }) => {
    const { data: commentsData } = useQuery(getCommentsQuery, { variables: { comicId } })

    return (
        <>
            <Title order={2} mt={24} mb={8} size='h4'>{commentsData?.commentsByComic?.count} comments</Title>
            <Stack gap={16}>
                <Group align='flex-start'>
                    {/* ! Fix this */}
                    <Avatar src='' size='md' alt='' style={{ alignSelf: 'flex-start' }} />
                    <Stack style={{ flexGrow: 1 }}>
                        <Textarea
                            minLength={3}
                            autosize
                            minRows={1}
                            placeholder='Введите комментарий'
                            rightSection={<ActionIcon><IconSend2 size={16} /></ActionIcon>}
                        />
                    </Stack>
                </Group>
                {commentsData?.commentsByComic?.comments?.map(c => (<Comment depth={0} key={c.id} comment={c} />))}
            </Stack>
        </>
    )
}
