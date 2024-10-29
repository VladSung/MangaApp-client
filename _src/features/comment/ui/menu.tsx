'use client';
import { useMutation } from '@apollo/client';
import { ActionIcon, Menu } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { CommentMenuComponent } from '@src/entities/comment';
import { IconDotsVertical } from '@tabler/icons-react';

import {
    commentRepliesQuery,
    commentsByChapterQuery,
    commentsByComicQuery,
    deleteCommentMutation,
    pinCommentMutation,
    unpinCommentMutation,
} from '../api';

export const CommentMenu: CommentMenuComponent = ({
    commentId,
    enableEditCommentHandler,
    authUserIsAuthor,
    authUserIsCreator,
    isPinned,
}) => {
    const [deleteComment] = useMutation(deleteCommentMutation);
    const [pinComment] = useMutation(pinCommentMutation, {
        refetchQueries: [commentsByComicQuery, commentsByChapterQuery, commentRepliesQuery],
    });

    const [unpinComment] = useMutation(unpinCommentMutation, {
        refetchQueries: [commentsByComicQuery, commentsByChapterQuery, commentRepliesQuery],
    });

    const pinOrUnpinCommentHandler = () => {
        isPinned
            ? unpinComment({
                  variables: {
                      commentId,
                  },
              }).then((data) => {
                  data.data?.comment.unpin.issue &&
                      notifications.show({
                          message: data.data?.comment.unpin.issue.message,
                          color: 'red',
                      });
              })
            : pinComment({
                  variables: {
                      commentId,
                  },
              }).then((data) => {
                  data.data?.comment.pin.issue &&
                      notifications.show({
                          message: data.data?.comment.pin.issue.message,
                          color: 'red',
                      });
              });
    };

    const deleteCommentHandler = () => {
        deleteComment({
            variables: { commentId },
            update: (cache) => {
                cache.evict({
                    id: `Comment:${commentId}`,
                });

                cache.gc();

                cache.updateQuery(
                    {
                        query: commentsByComicQuery,
                    },
                    (data) => {
                        return (
                            data?.comment.allByComic?.pageInfo && {
                                comment: {
                                    allByComic: {
                                        ...data?.comment.allByComic,
                                        pageInfo: {
                                            ...data?.comment.allByComic?.pageInfo,
                                            totalCount:
                                                (data?.comment.allByComic?.pageInfo?.totalCount ||
                                                    1) - 1,
                                        },
                                    },
                                },
                            }
                        );
                    }
                );

                cache.updateQuery(
                    {
                        query: commentsByChapterQuery,
                    },
                    (data) => {
                        return (
                            data?.comment.allByChapter?.pageInfo && {
                                comment: {
                                    allByChapter: {
                                        ...data?.comment.allByChapter,
                                        pageInfo: {
                                            ...data?.comment.allByChapter?.pageInfo,
                                            totalCount:
                                                (data?.comment.allByChapter?.pageInfo?.totalCount ||
                                                    1) - 1,
                                        },
                                    },
                                },
                            }
                        );
                    }
                );
            },
        });
    };

    const CreatorMenuItems = (
        <>
            {isPinned ? (
                <Menu.Item onClick={pinOrUnpinCommentHandler}>Unpin</Menu.Item>
            ) : (
                <Menu.Item onClick={pinOrUnpinCommentHandler}>Pin</Menu.Item>
            )}
        </>
    );

    return (
        <Menu shadow="md" width={128}>
            <Menu.Target>
                <ActionIcon ml="auto" color="gray" variant="subtle">
                    <IconDotsVertical size={16} />
                </ActionIcon>
            </Menu.Target>

            {authUserIsAuthor ? (
                <Menu.Dropdown>
                    {authUserIsCreator && CreatorMenuItems}
                    <Menu.Item onClick={enableEditCommentHandler}>Edit</Menu.Item>
                    <Menu.Item color="red" onClick={deleteCommentHandler}>
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            ) : (
                <Menu.Dropdown>
                    {authUserIsCreator && CreatorMenuItems}
                    <Menu.Item color="red" onClick={deleteCommentHandler}>
                        Report
                    </Menu.Item>
                </Menu.Dropdown>
            )}
        </Menu>
    );
};
