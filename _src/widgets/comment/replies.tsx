import { useQuery } from "@apollo/client"
import { Center, Loader } from "@mantine/core"

import { Comment } from '@src/entities/comment'

import { getCommentRepliesQuery } from "./api/mutations"



type AddReplyWidget = ({ comicId, chapterId, parentCommentId }: { comicId: string, chapterId?: string, parentCommentId?: string }) => React.JSX.Element
type Menu = ({ commentId }: { commentId: string }) => React.JSX.Element

const Replies = ({ commentId, AddReplyWidget, Menu, comicId, depth = 0 }: {
    commentId: string,
    Menu: Menu,
    AddReplyWidget: AddReplyWidget, comicId: string, depth: number
}) => {

    const { data, loading } = useQuery(getCommentRepliesQuery, { variables: { commentId: commentId } })

    if (loading) {
        return <Center><Loader size='sm' /></Center>
    }

    return data?.repliesOnCommentByCommentId?.map((r) => {
        return (<Comment Menu={Menu} AddReplyWidget={AddReplyWidget} Replies={Replies} comicId={comicId} depth={depth + 1} key={r.id} comment={r} />)
    })
}

export default Replies
