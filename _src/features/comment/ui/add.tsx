'use client';
import { useMutation } from '@apollo/client';
import { ActionIcon, Group, Stack, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSend2 } from '@tabler/icons-react';
import { KeyboardEvent, useState } from 'react';

import { addCommentMutation, commentsByChapterQuery, commentsByComicQuery } from '../api';
import { CommentSort } from '@src/shared/api';

export const Add = ({
    comicId,
    chapterId,
    parentCommentId,
    mentionedUserId,
}: {
    parentCommentId?: string;
    mentionedUserId?: string;
    comicId: string;
    chapterId?: string;
}) => {
    const [addComment, { data, loading }] = useMutation(addCommentMutation);
    const [commentContent, setCommentContent] = useState('');

    const addCommentHandler = () => {
        addComment({
            variables: {
                input: {
                    content: commentContent,
                    parentCommentId,
                    mentionedUserId,
                    comicId,
                    chapterId,
                },
            },
            update: (cache, { data: addComment }, { variables }) => {
                setCommentContent('');

                const newCommentNode = addComment?.comment.create.record
                    ? {
                          node: addComment?.comment.create.record,
                          cursor: {
                              id: addComment?.comment.create.record?.id,
                          },
                      }
                    : null;

                variables?.input.comicId &&
                    console.log(
                        cache.readQuery({
                            query: commentsByComicQuery,
                            variables: {
                                sort: CommentSort.Popular,
                                id: variables?.input.comicId,
                                paginate: { first: 10, after: null },
                            },
                        })
                    );

                if (addComment?.comment.create.record && newCommentNode) {
                    chapterId &&
                        cache.updateQuery(
                            {
                                query: commentsByChapterQuery,
                                variables: {
                                    sort: CommentSort.Popular,
                                    id: chapterId,
                                    paginate: { first: 10, after: null },
                                },
                            },
                            (data) => {
                                if (
                                    data?.comment.allByChapter?.edges?.length &&
                                    addComment?.comment.create.record
                                ) {
                                    return {
                                        comment: {
                                            allByChapter: {
                                                pageInfo: {
                                                    ...data?.comment.allByChapter?.pageInfo,
                                                    totalCount:
                                                        (data?.comment.allByChapter?.pageInfo
                                                            ?.totalCount || 0) + 1,
                                                },
                                                edges: [
                                                    ...data.comment.allByChapter.edges,
                                                    newCommentNode,
                                                ],
                                            },
                                        },
                                    };
                                }

                                return data;
                            }
                        );

                    !chapterId &&
                        cache.updateQuery(
                            {
                                query: commentsByComicQuery,
                                variables: {
                                    sort: CommentSort.Popular,
                                    id: comicId,
                                    paginate: { first: 10, after: null },
                                },
                            },
                            (data) => {
                                if (data?.comment.allByComic.edges?.length && newCommentNode) {
                                    return {
                                        comment: {
                                            allByComic: {
                                                pageInfo: {
                                                    ...data.comment.allByComic.pageInfo,
                                                    totalCount:
                                                        (data.comment.allByComic.pageInfo
                                                            .totalCount || 0) + 1,
                                                },
                                                edges: [
                                                    ...data.comment.allByComic.edges,
                                                    newCommentNode,
                                                ],
                                            },
                                        },
                                    };
                                }

                                return data;
                            }
                        );
                }
            },
        }).then((data) => {
            data.data?.comment.create.issue &&
                notifications.show({
                    color: 'red',
                    message: data.data?.comment.create.issue.message,
                });
        });
    };

    const addCommentKeyboardHandler = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addCommentHandler();

            if (e?.currentTarget?.value) {
                e.currentTarget.value = '';
            }
        }
    };

    return (
        <Group align="flex-start">
            <Stack style={{ flexGrow: 1 }}>
                <Textarea
                    minLength={2}
                    autosize
                    minRows={1}
                    defaultValue={mentionedUserId ? `${mentionedUserId}, ` : undefined}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Введите комментарий"
                    onKeyDown={addCommentKeyboardHandler}
                    rightSection={
                        <ActionIcon
                            mb={3}
                            onClick={addCommentHandler}
                            loading={loading}
                            disabled={loading || commentContent.length < 2}
                            style={{ alignSelf: 'flex-end' }}
                        >
                            <IconSend2 size={16} />
                        </ActionIcon>
                    }
                />
            </Stack>
        </Group>
    );
};
