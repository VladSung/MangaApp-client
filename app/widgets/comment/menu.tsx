'use client'
import { graphql } from "@/app/shared/api/graphql";
import { gql, useMutation } from "@apollo/client";
import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { getCommentsQuery } from "./api/queries";

const deleteCommentMutation = graphql(`
    mutation DeleteComment($commentId:ID!){
        deleteComment(id:$commentId){
            id
        }
    }
`)

const CommentMenu = ({ commentId }: { commentId: string }) => {
    const [deleteComment] = useMutation(deleteCommentMutation);

    const deleteCommentHandler = () => {
        deleteComment({
            variables: { commentId },
            update: (cache, { data }) => {
                cache.evict({
                    id: `Comment:${commentId}`
                });
                cache.gc();
                cache.updateQuery({
                    query: getCommentsQuery,
                }, data => {
                    return {
                        commentsByComic: {
                            count: (data?.commentsByComic?.count || 1) - 1,
                            ...data?.commentsByComic,
                        }
                    }
                })
            }
        })
    }

    return (
        <Menu shadow="md" width={128}>
            <Menu.Target>
                <ActionIcon ml='auto' color='gray' variant='subtle'>
                    <IconDotsVertical size={16} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={deleteCommentHandler}>
                    Edit
                </Menu.Item>
                <Menu.Item color='red' onClick={deleteCommentHandler}>
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default CommentMenu;