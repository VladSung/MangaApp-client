'use client'
import { useMutation } from "@apollo/client";
import { ActionIcon, Avatar, Group, Stack, Textarea } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { KeyboardEvent, useState } from "react";

import { graphql } from "@src/shared/api/graphql";

import { getCommentRepliesQuery } from "./api/mutations";
import { getChapterCommentsQuery, getComicCommentsQuery } from "./api/queries";

const addCommentMutation = graphql(`
    mutation AddCommentToComic($input:CommentInput!){
      addComment(input:$input){
          content
            createdAt
            id
            author {
                id
                name
                avatar
            }
            _count {
                replies
            }
      }
  }
`)

export const Add = ({ comicId, chapterId, parentCommentId }: { comicId: string, chapterId?: string, parentCommentId?: string }) => {
    const [addComment, { loading }] = useMutation(addCommentMutation)
    const [commentContent, setCommentContent] = useState('');

    const addCommentHandler = () => {
        addComment({

            variables: { input: { content: commentContent, comicId, chapterId, parentCommentId } },
            update: (cache, { data: addComment }) => {
                setCommentContent('')

                if (addComment?.addComment && parentCommentId) {
                    const data = cache.readQuery({
                        query: getCommentRepliesQuery, variables: {
                            commentId: parentCommentId
                        }
                    })

                    if (data?.repliesOnCommentByCommentId) {
                        cache.writeQuery({
                            query: getCommentRepliesQuery,
                            variables: {
                                commentId: parentCommentId
                            },
                            data: { repliesOnCommentByCommentId: [...data.repliesOnCommentByCommentId, addComment.addComment] }
                        })
                    }

                    cache.writeQuery({
                        query: getCommentRepliesQuery,
                        variables: {
                            commentId: parentCommentId
                        },
                        data: { repliesOnCommentByCommentId: [addComment.addComment] }
                    })

                    cache.updateFragment({
                        id: `Comment:${parentCommentId}`,
                        fragment: graphql(`
                            fragment _Comment on Comment {
                            _count {
                                replies
                            }
                        }`)
                    }, (data) => {
                        return ({
                            _count: {
                                replies: (data?._count?.replies || 0) + 1
                            }
                        })
                    })

                } else {

                    chapterId && cache.updateQuery({
                        query: getChapterCommentsQuery,
                        variables: { id: chapterId },
                    }, (data) => {
                        if (data?.commentsByChapter?.comments && addComment?.addComment) {
                            return ({
                                commentsByChapter: {
                                    count: (data?.commentsByChapter?.count || 0) + 1,
                                    comments: [...data.commentsByChapter.comments, addComment.addComment]
                                }
                            })
                        }

                        return data;
                    })
                    cache.updateQuery({
                        query: getComicCommentsQuery,
                        variables: { id: comicId },
                    }, (data) => {
                        if (data?.commentsByComic?.comments && addComment?.addComment) {
                            return ({
                                commentsByComic: {
                                    count: (data?.commentsByComic?.count || 0) + 1,
                                    comments: [...data.commentsByComic.comments, addComment.addComment]
                                }
                            })
                        }

                        return data;
                    })
                }
            }
        })
    }

    const addCommentKeyboardHandler = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addCommentHandler();

            if (e?.currentTarget?.value) {
                e.currentTarget.value = '';
            }
        }
    }

    return (
        <Group align='flex-start' >
            <Stack style={{ flexGrow: 1 }}>
                <Textarea
                    minLength={2}
                    autosize
                    minRows={1}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder='Введите комментарий'
                    onKeyDown={addCommentKeyboardHandler}
                    rightSection={<ActionIcon mb={3} onClick={addCommentHandler} loading={loading} disabled={loading || commentContent.length < 2} style={{ alignSelf: 'flex-end' }}><IconSend2 size={16} /></ActionIcon>}
                />
            </Stack>
        </Group >
    )
}
