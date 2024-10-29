'use client';

import {
    ActionIcon,
    Box,
    Button,
    Collapse,
    darken,
    Divider,
    Group,
    lighten,
    Paper,
    Stack,
    Text,
    TextInput,
    Tooltip,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import { useColorScheme, useDisclosure } from '@mantine/hooks';
import { dayjsRelativeTime } from '@src/shared/api/dayjs';
import { Avatar } from '@src/shared/ui';
import { CommentReactions } from '@src/widgets/comment/ui/list/reactions';
import {
    IconChevronDown,
    IconChevronUp,
    IconHeart,
    IconMessageCircle,
    IconPinFilled,
} from '@tabler/icons-react';
import React, { memo, PropsWithChildren, useRef } from 'react';

import { AddReplyWidget, CommentBase, CommentMenuComponent } from './types';

type CommentProps = {
    comment: CommentBase;
    authUserId?: string | null;
    authUserIsCreator: boolean;
    comicId: string;
    chapterId?: string;
    Menu: CommentMenuComponent;
    AddReplyWidget: AddReplyWidget;
    Replies?: React.ReactNode;
    isReply?: boolean;
    parentCommentId?: string;
    UpdateCommentWidget: ({
        id,
        content,
        onClose,
    }: {
        id: string;
        content: string;
        onClose: () => void;
    }) => React.ReactNode;
};

export const Comment: React.FC<CommentProps> = memo(
    ({
        comment,
        comicId,
        authUserIsCreator,
        chapterId,
        UpdateCommentWidget,
        AddReplyWidget,
        Menu,
        Replies,
        parentCommentId,
        authUserId,
        isReply = false,
    }) => {
        const [repliesOpened, { toggle: toggleReplies }] = useDisclosure(false);
        const [editMode, { toggle: toggleEditMode }] = useDisclosure(false);
        const [replyWidgetOpened, { toggle: toggleReplyWidget }] = useDisclosure(false);
        const theme = useMantineTheme();

        const { colorScheme } = useMantineColorScheme();

        const CommentWrapper = ({ children }: PropsWithChildren) => (
            <Paper
                withBorder
                p="xs"
                mb="sm"
                style={(theme) => ({
                    'backgroundColor': comment.isPinned
                        ? 'color-mix(in srgb, var(--mantine-primary-color-filled) 15%, var(--mantine-color-body) 100%)'
                        : (colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.white),
                    '&:hover': {
                        backgroundColor:
                            colorScheme === 'dark'
                                ? lighten(theme.colors.dark[6], 0.05)
                                : darken(theme.white, 0.05),
                    },
                })}
            >
                {children}
            </Paper>
        );

        return (
            <>
                <CommentWrapper>
                    <Box>
                        <Group justify="flex-start" align="flex-start" mb="xs">
                            <Group gap="sm">
                                <Avatar src={comment?.author?.avatar} size="md" radius="xl" />
                                <Stack gap={0}>
                                    <Group gap="xs">
                                        <Text fw={600} size="sm">
                                            {comment?.author?.publicId}
                                        </Text>
                                        {comment?.isPinned && (
                                            <Tooltip label="Закрепленный комментарий">
                                                <IconPinFilled size={16} stroke={1.5} />
                                            </Tooltip>
                                        )}
                                    </Group>
                                    <Text size="xs" c="dimmed">
                                        {dayjsRelativeTime(comment?.createdAt).fromNow()}
                                    </Text>
                                </Stack>
                            </Group>
                            {comment.id && (
                                <Menu
                                    isPinned={comment.isPinned}
                                    commentId={comment?.id}
                                    authUserIsCreator={authUserIsCreator}
                                    authUserIsAuthor={Boolean(
                                        comment.author?.publicId &&
                                            comment.author?.publicId === authUserId
                                    )}
                                    enableEditCommentHandler={toggleEditMode}
                                />
                            )}
                        </Group>

                        {editMode ? (
                            <UpdateCommentWidget
                                id={comment.id}
                                content={comment.content}
                                onClose={toggleEditMode}
                            />
                        ) : (
                            <Text size="sm" mb="md">
                                {comment?.content}
                            </Text>
                        )}

                        {!editMode && (
                            <Group gap="md">
                                <CommentReactions
                                    reactions={comment.reactions}
                                    commentId={comment.id}
                                />

                                <Button
                                    size="compact-xs"
                                    variant="subtle"
                                    color="gray"
                                    onClick={toggleReplyWidget}
                                >
                                    Reply
                                </Button>

                                {!isReply && Boolean(comment?.repliesCount) && (
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        size="compact-xs"
                                        rightSection={
                                            repliesOpened ? (
                                                <IconChevronUp size={14} />
                                            ) : (
                                                <IconChevronDown size={14} />
                                            )
                                        }
                                        onClick={toggleReplies}
                                    >
                                        {repliesOpened
                                            ? 'Скрыть ответы'
                                            : `Показать ответы (${comment.repliesCount})`}
                                    </Button>
                                )}
                            </Group>
                        )}

                        <Collapse in={replyWidgetOpened}>
                            <Box mt="md">
                                {AddReplyWidget && (
                                    <AddReplyWidget
                                        comicId={comicId}
                                        chapterId={chapterId}
                                        parentCommentId={
                                            isReply && parentCommentId
                                                ? parentCommentId
                                                : comment.id
                                        }
                                        mentionedUserId={comment.author?.publicId}
                                    />
                                )}
                            </Box>
                        </Collapse>
                    </Box>
                </CommentWrapper>
                {!isReply && (
                    <Collapse in={repliesOpened}>
                        <Box ml={theme.spacing.xl}>{repliesOpened && Replies}</Box>
                    </Collapse>
                )}
            </>
        );
    },
    (prevProps, nextProps) => {
        const prevComment = JSON.stringify(prevProps.comment);
        const nextComment = JSON.stringify(nextProps.comment);

        return prevComment === nextComment;
    }
);
