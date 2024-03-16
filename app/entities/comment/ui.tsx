import { graphql } from "@/app/shared/api/graphql";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ActionIcon, Avatar, Text, Button, Collapse, Group, Stack, Loader, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPinFilled, IconDotsVertical, IconHeart, IconMessageReply, IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

type CommentBase = { id?: string, createdAt?: Date, _count?: { replies: number | null } | null, pinned?: boolean, replies?: CommentBase[], content?: string, author: { avatar: string | null, username: string | null } | null };

type CommentProps = {
    comment: CommentBase,
    depth: number
}

export const Comment = ({ comment, depth = 0 }: CommentProps) => {
    const [opened, { toggle }] = useDisclosure(false);
    return (
        <Stack gap={depth ? 0 : 'md'} style={{ borderRadius: depth ? 0 : 16, borderLeft: `${comment?.pinned || depth > 0 ? 2 : 0}px solid var(--mantine-color-blue-6)` }} py={8} pl={4}>
            <Group wrap='nowrap' key={comment?.id} align='flex-start'>
                <Avatar src={comment?.author?.avatar} />
                <Stack gap={0} style={{ flexGrow: 1 }}>
                    <Group>
                        <Text component='h3' fw='bold' size='xs'>{comment?.author?.username}</Text>
                        <Text size='xs'>{(dayjs(comment?.createdAt) as any).fromNow()}</Text>
                        {comment?.pinned && <IconPinFilled size={16} />}
                        <ActionIcon ml='auto' color='gray' variant='transparent'>
                            <IconDotsVertical size={18} />
                        </ActionIcon>
                    </Group>
                    <Text size='md'>{comment?.content}</Text>
                    <Group gap='md'>
                        <Group gap={0}>
                            <ActionIcon size='md' autoContrast variant='subtle'><IconHeart size={20} /></ActionIcon>
                            <Text size='sm'>16</Text>
                        </Group>
                        <ActionIcon size='md' variant='subtle'><IconMessageReply size={20} /></ActionIcon>
                    </Group>

                    {comment?._count?.replies ? <Group>
                        <Button onClick={toggle} size='sm' variant='subtle' leftSection={opened ? <IconCaretUpFilled size={16} /> : <IconCaretDownFilled size={16} />}>{comment?._count?.replies} replies</Button>
                    </Group> : <></>}
                </Stack>
            </Group>
            <Collapse in={opened}>
                {comment?.id && opened && <Replies depth={depth + 1} commentId={comment.id} />}
            </Collapse>
        </Stack>
    )
}

const getCommentRepliesQuery = graphql(`
    query getCommentReplies($commentId: ID!){
        repliesOnCommentByCommentId(commentId:$commentId){
            content
            createdAt
            id
            author{
            username
            avatar
        }
            _count{
            replies
        }
        }
    }
`)

export const Replies = ({ commentId, depth = 0 }: { commentId: string, depth: number }) => {

    const { data, loading } = useQuery(getCommentRepliesQuery, { variables: { commentId: commentId } })

    if (loading) return <Center><Loader size='sm' /></Center>

    return data?.repliesOnCommentByCommentId?.map((r: CommentBase) => (<Comment depth={depth + 1} key={r.id} comment={r} />))
}