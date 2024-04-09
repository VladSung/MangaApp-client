import { graphql } from "@/app/shared/api/graphql";
import { useMutation } from "@apollo/client";
import { Group, Avatar, Stack, Textarea, ActionIcon } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { useState } from "react";
import { getCommentsQuery } from "./api/queries";


const addCommentMutation = graphql(`
    mutation AddCommentToComic($input:CommentInput!){
        addComment(input:$input){
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
`)

export const Add = ({ comicId, chapterId, parentCommentId }: { comicId: string, chapterId?: string, parentCommentId?: string }) => {
    const [addComment, { loading }] = useMutation(addCommentMutation)
    const [commentContent, setCommentContent] = useState('');

    const addCommentHandler = async () => {
        await addComment({
            variables: { input: { content: commentContent, comicId, chapterId, parentCommentId } },
            update: (cache, { data: addComment }) => {
                cache.updateQuery({ query: getCommentsQuery, variables: { comicId } }, (data) => {
                    console.log('data', [...data?.commentsByComic.comments!, addComment?.addComment!])
                    return ({
                        commentsByComic: {
                            count: data?.commentsByComic.count! + 1,
                            comments: [addComment?.addComment!, ...data?.commentsByComic.comments!]
                        }
                    })
                })
            }
        })
        setCommentContent('')
    }

    return (
        <Group align='flex-start'>
            <Avatar src={''} size='md' alt='' style={{ alignSelf: 'flex-start' }} />
            <Stack style={{ flexGrow: 1 }}>
                <Textarea
                    minLength={2}
                    autosize
                    minRows={1}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder='Введите комментарий'
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) addCommentHandler() }}
                    rightSection={<ActionIcon mb={3} onClick={addCommentHandler} disabled={loading || commentContent.length < 2} style={{ alignSelf: 'flex-end' }}><IconSend2 size={16} /></ActionIcon>}
                />
            </Stack>
        </Group>
    )
}