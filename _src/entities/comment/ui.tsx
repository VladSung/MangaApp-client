import { ActionIcon, Button, Collapse, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretDownFilled, IconCaretUpFilled, IconHeart, IconMessageReply, IconPinFilled } from "@tabler/icons-react";

import { dayjsRelativeTime } from "@src/shared/api/dayjs";
import { Avatar } from "@src/shared/ui/Avatar";

type CommentBase = { id?: string, createdAt?: Date, _count?: { replies?: number | null } | null, pinned?: boolean, replies?: CommentBase[], content?: string, author?: { avatar?: string | null, name?: string | null } | null };

type AddReplyWidget = ({ comicId, chapterId, parentCommentId }: { comicId: string, chapterId?: string, parentCommentId?: string }) => React.JSX.Element
type Menu = ({ commentId }: { commentId: string }) => React.JSX.Element
type CommentProps = {
    comment: CommentBase
    depth: number
    comicId: string
    chapterId?: string
    Menu: Menu
    AddReplyWidget: AddReplyWidget
    Replies?: ({ depth, Menu, AddReplyWidget, commentId }: { Menu: Menu, depth: number, AddReplyWidget: AddReplyWidget, comicId: string, commentId: string }) => undefined | React.JSX.Element | React.JSX.Element[]
}

export const Comment = ({ comment, comicId, AddReplyWidget, Menu, Replies, depth = 0 }: CommentProps) => {
    const [opened, { toggle }] = useDisclosure(false);
    const [openedAddReplyWidget, { toggle: toggleAddReplyWidget }] = useDisclosure(false);

    const RepliesList = () => {
        if (Replies && comment?.id && opened) {
            return <Replies Menu={Menu} AddReplyWidget={AddReplyWidget} comicId={comicId} depth={depth + 1} commentId={comment.id} />
        }

        return <></>
    }

    return (
        <Stack gap={depth ? 0 : 'md'} style={{ borderRadius: depth ? 0 : 16, borderLeft: `${comment?.pinned || depth > 0 ? 2 : 0}px solid var(--mantine-color-blue-6)` }} py={8} pl={4}>
            <Group wrap='nowrap' key={comment?.id} align='flex-start'>
                <Avatar src={comment?.author?.avatar} />
                <Stack gap={0} style={{ flexGrow: 1 }}>
                    <Group>
                        <Text component='h3' fw='bold' size='xs'>{comment?.author?.name}</Text>
                        <Text size='xs'>{(dayjsRelativeTime(comment?.createdAt)).fromNow()}</Text>
                        {comment?.pinned && <IconPinFilled size={16} />}
                        {comment.id && <Menu commentId={comment?.id} />}
                    </Group>
                    <Text size='md'>{comment?.content}</Text>
                    <Group gap='md'>
                        <Group gap={0}>
                            <ActionIcon size='md' autoContrast variant='subtle'><IconHeart size={20} /></ActionIcon>
                            <Text size='sm'>16</Text>
                        </Group>
                        <ActionIcon size='md' onClick={toggleAddReplyWidget} variant='subtle'><IconMessageReply size={20} /></ActionIcon>
                    </Group>

                    {comment?._count?.replies ? <Group>
                        <Button onClick={toggle} size='sm' variant='subtle' leftSection={opened ? <IconCaretUpFilled size={16} /> : <IconCaretDownFilled size={16} />}>{opened ? 'Hide' : 'Show'} replies</Button>
                    </Group> : <></>}
                </Stack>
            </Group>
            {openedAddReplyWidget && <Stack pl={4} style={{ borderLeft: `${openedAddReplyWidget ? 2 : 0}px solid var(--mantine-color-blue-6)` }}>
                {AddReplyWidget ? <AddReplyWidget comicId={comicId} parentCommentId={comment.id} /> : null}
            </Stack>}
            <Collapse in={opened}>
                <RepliesList />
            </Collapse>
        </Stack>
    )
}
