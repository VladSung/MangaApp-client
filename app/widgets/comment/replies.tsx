import { graphql } from "@/app/shared/api/graphql"
import { useQuery } from "@apollo/client"
import { Center, Loader } from "@mantine/core"
import { Comment } from '@/app/entities/comment'
import { useDisclosure } from "@mantine/hooks"

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


type AddReplyWidget = ({ comicId, chapterId, parentCommentId }: { comicId: string, chapterId?: string, parentCommentId?: string }) => React.JSX.Element


const Replies = ({ commentId, AddReplyWidget, comicId, depth = 0 }: {
    commentId: string,
    AddReplyWidget: AddReplyWidget, comicId: string, depth: number
}) => {

    const { data, loading } = useQuery(getCommentRepliesQuery, { variables: { commentId: commentId } })

    if (loading) {
        return <Center><Loader size='sm' /></Center>
    }

    return data?.repliesOnCommentByCommentId?.map((r) => {
        console.log('count', r._count)
        return (<Comment AddReplyWidget={AddReplyWidget} Replies={Replies} comicId={comicId} depth={depth + 1} key={r.id} comment={r} />)
    })
}

export default Replies